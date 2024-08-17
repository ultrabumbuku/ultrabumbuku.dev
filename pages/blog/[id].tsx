import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import convertMarkdownToHtml from '../../lib/markdownToHtml';
import { formatDate } from '../../lib/date';  // 新しく追加

interface PostProps {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

const Post: React.FC<PostProps> = ({ postData }) => {
  return (
    <Layout title={postData.title}>
      <article>
        <h1>{postData.title}</h1>
        <div>{formatDate(postData.date)}</div>  {/* ここを変更 */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const postData = await getPostData(params?.id as string);
    const contentHtml = await convertMarkdownToHtml(postData.content);
    return {
      props: {
        postData: {
          ...postData,
          contentHtml,
          date: postData.date instanceof Date ? postData.date.toISOString() : postData.date
        }
      }
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true // 記事が見つからない場合は404ページを表示
    }
  }
}


export default Post;


