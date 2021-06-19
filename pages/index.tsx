import Head from 'next/head'
import { NextLink } from '../components/Link'
import { getPosts } from './api/api'
import styles from '../styles/Home.module.scss'

import type { GetStaticProps } from 'next'
import type { PostList } from './api/types'

export default function Home({ postList }: { postList: PostList }) {
  console.log(postList)
  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="nextjs-microcms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.title}>
        <h1>Sample Blog</h1>
        <NextLink to="/about">About</NextLink>
      </div>

      <main className={styles.main}>
        {postList.contents.map((post) => {
          return (
            <div className={styles.post} key={post.id}>
              <NextLink to={'/post/' + post.id}>
                <h2>{post.title}</h2>
              </NextLink>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <div key={tag.id} className={styles.tag}>
                    {tag.tag}
                  </div>
                ))}
              </div>
              <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.body }} />
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
