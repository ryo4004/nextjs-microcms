import { NextLink } from '../../components/Link'
import { getPost, fetchAllPosts } from '../api/api'
import styles from '../../styles/Post.module.scss'
import parse, { DOMNode } from 'html-react-parser'
import { Element } from 'domhandler/lib/node'

import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../utilities/types'
import React from 'react'

const replace = (node: DOMNode) => {
  if (node instanceof Element && node.name === 'img') {
    const onClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      console.log(e.currentTarget.src)
    }
    return <img {...node.attribs} onClick={(e) => onClick(e)} />
  }
}

export const Page = ({ post }: { post: Post }) => {
  const element = parse(post.body, { replace })
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
      <div className={styles.body}>{element}</div>
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
