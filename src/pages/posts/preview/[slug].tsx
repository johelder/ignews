import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { createClient } from "../../../../prismicio";

import styles from '../post.module.scss';

interface RouteProps extends ParsedUrlQuery {
  slug: string;
}

interface PostPreview {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

const PostPreview = ({ post }: PostPreview) => {
  const { data: session } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      route.push(`/posts/${post.slug}`);
    }
  }, [session, route, post.slug]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`}>
            <p>{post.content}</p>
          </div>

          <div className={styles.continueReading}>
            wanna continue reading? {' '}

            <Link href="/">
              <a>subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
  const client = createClient({ previewData });

  const { slug } = params as RouteProps;

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
    },
    revalidate: 60 * 30,
  }
}