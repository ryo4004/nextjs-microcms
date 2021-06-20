import { NextLink } from '../../components/Link'
import { getPost, fetchAllPosts } from '../api/api'
import styles from '../../styles/Post.module.scss'

import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../utilities/types'

export const Page = ({ post }: { post: Post }) => {
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <div key={tag.id} className={styles.tag}>
            {tag.tag}
          </div>
        ))}
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.body }} />
      <footer>
        <NextLink to="/">ホーム</NextLink>
      </footer>
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
  const allPosts = await fetchAllPosts()
  const paths = allPosts.map((post) => `/post/${post.id}`)
  return { paths, fallback: false }
}

export default Page
