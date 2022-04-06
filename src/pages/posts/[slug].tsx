import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { ParsedUrlQuery } from "querystring";
import { createClient } from "../../../prismicio";

import styles from './post.module.scss';

interface RouteProps extends ParsedUrlQuery {
  slug: string;
}

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent}>
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </>
  );
}

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ req, params, previewData }) => {
  const session = await getSession({ req });
  const { slug } = params as RouteProps;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const client = createClient({ previewData });
  const response = await client.getByUID('post', slug);

  const post = {
    slug,
    title: response.data.title,
    content: response.data.content[0].text,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    }
  }
}