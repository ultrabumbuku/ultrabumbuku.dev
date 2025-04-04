import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import MarkdownEditor from '../../components/MarkdownEditor';
import styles from '../../styles/NewPost.module.css';

const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ページロード時に認証状態をチェック
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('パスワードが違います');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/blog/${data.slug}`);
      } else {
        throw new Error('記事の保存に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('記事の保存に失敗しました');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout title="管理者認証">
        <div className={styles.container}>
          <h1>管理者認証</h1>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              className={styles.passwordInput}
            />
            <button type="submit" className={styles.authButton}>
              認証
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="新規記事作成">
      <div className={styles.container}>
        <h1>新規記事作成</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className={styles.titleInput}
          />
          <MarkdownEditor
            initialValue={content}
            onChange={(value) => setContent(value)}
          />
          <button type="submit" className={styles.submitButton}>
            投稿
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewPost;