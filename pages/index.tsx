import Head from 'next/head'
import { NextLink } from '../components/Link'
import { getPosts } from './api/api'
import styles from '../styles/Home.module.scss'

import type { GetStaticProps } from 'next'
import type { PostList } from './api/types'

export default function Home({ postList }: { postList: PostList }) {
  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="nextjs-microcms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Sample Blog</h1>
      <NextLink to="/about">About</NextLink>

      <main className={styles.main}>
        {postList.contents.map((post) => {
          return (
            <div key={post.id}>
              <NextLink to={'/post/' + post.id}>{post.title}</NextLink>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          )
        })}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getPosts<PostList>()
  if (!response) {
    return { notFound: true }
  }
  return { props: { postList: response } }
}
