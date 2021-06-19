import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { getPosts } from './api/api'

import type { GetStaticProps } from 'next'

type Post = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  body: string
}

type PostList = {
  contents: Array<Post>
  totalCount: number
  offset: number
  limit: number
}

export default function Home({ postList }: { postList: PostList }) {
  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="nextjs-microcms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Sample Blog</h1>

      <main className={styles.main}>
        {postList.contents.map((post) => {
          return (
            <div key={post.id}>
              <div>{post.title}</div>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          )
        })}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getPosts<PostList>('post')
  if (!response) {
    return { notFound: true }
  }
  return { props: { postList: response } }
}
