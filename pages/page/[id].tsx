import Head from 'next/head'
import { NextLink } from '../../components/Link'
import { Pagination } from '../../components/Pagination'
import { getPosts } from '../api/api'
import { PER_PAGE, range } from '../api/pagination'
import styles from '../../styles/Home.module.scss'

import type { GetStaticProps, GetStaticPaths } from 'next'
import type { PostList } from '../api/types'

export default function Page({ postList, page }: { postList: PostList; page: number }) {
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

      <Pagination totalCount={postList.totalCount} activePage={page} />

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

      <Pagination totalCount={postList.totalCount} activePage={page} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  if (params?.id) {
    const response = await getPosts<PostList>({ offset: (Number(params.id) - 1) * PER_PAGE, limit: PER_PAGE })
    return { props: { postList: response, page: Number(params.id) } }
  }
  return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getPosts<PostList>()
  const paths = range(1, Math.ceil(response.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`)
  return { paths, fallback: false }
}
