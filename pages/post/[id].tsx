import { NextPage } from 'next'
import { getPosts, getPost } from '../api/api'
import styles from '../../styles/Post.module.scss'

import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import type { Post, PostList } from '../api/types'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Page: NextPage<Props> = ({ post }) => {
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  if (params?.id) {
    const response = await getPost<Post>('post', String(params.id))
    if (response) {
      return { props: { post: response }, revalidate: 1 }
    }
  }
  return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getPosts<PostList>('post')
  const paths = response.contents.map((post) => `/post/${post.id}`)
  return { paths, fallback: false }
}

export default Page
