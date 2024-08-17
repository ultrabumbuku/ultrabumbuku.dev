import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getSortedPostsData } from '../../lib/posts'
import { formatDate } from '../../lib/date'
import styles from '../../styles/BlogIndex.module.css'

interface BlogPost {
  id: string
  date: string
  title: string
}

interface BlogIndexProps {
  allPostsData: BlogPost[]
}

export default function BlogIndex({ allPostsData }: BlogIndexProps) {
  return (
    <Layout title="Blog">
      <h1>Blog</h1>
      <ul className={styles.postList}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={styles.postItem} key={id}>
            <Link href={`/blog/${id}`}>
              <h2>{title}</h2>
              <small>{date ? formatDate(date) : 'No date'}</small>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog/new" className={styles.newPostButton}>
        新規記事作成
      </Link>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}