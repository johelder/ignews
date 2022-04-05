import { GetServerSideProps } from "next";
import Head from "next/head";

import { createClient } from "../../../prismicio";

import styles from "./styles.module.scss";

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a href="#" key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async ({ previewData }) => {

  const client = createClient({ previewData });

  const response = await client.getAllByType('post');

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  });

  return {
    props: {
      posts,
    },
  }
} 
