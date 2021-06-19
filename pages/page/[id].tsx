import Link from 'next/link'
import { Pagination } from '../../components/Pagination'
import { getPosts } from '../api/api'
import { PER_PAGE, range } from '../api/pagination'

import type { GetStaticProps, GetStaticPaths } from 'next'
import type { PostList } from '../api/types'

export default function BlogPageId({ postList }: { postList: PostList }) {
  return (
    <div>
      <ul>
        {postList.contents.map((post) => (
          <li key={post.id}>
            <Link href={'/post/' + post.id}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={postList.totalCount} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  if (params?.id) {
    const response = await getPosts<PostList>({ offset: (Number(params.id) - 1) * 5, limit: 5 })
    return { props: { postList: response } }
  }
  return { notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getPosts<PostList>()
  const paths = range(1, Math.ceil(response.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`)
  return { paths, fallback: false }
}
