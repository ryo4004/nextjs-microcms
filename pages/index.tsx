import Head from 'next/head'
import { NextLink } from '../components/Link'
import { Pagination } from '../components/Pagination'
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

      <div className={styles.title}>
        <h1>
          <NextLink to="/">Sample Blog</NextLink>
        </h1>
        <NextLink to="/about">About</NextLink>
      </div>

      <Pagination totalCount={postList.totalCount} activePage={1} />

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

      <Pagination totalCount={postList.totalCount} activePage={1} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getPosts<PostList>({ offset: 0, limit: 5 })
  if (!response) {
    return { notFound: true }
  }
  return { props: { postList: response } }
}
