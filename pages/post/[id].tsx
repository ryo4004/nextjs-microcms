import { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { NextLink } from '../../components/Link'
import { getPost, fetchAllPosts } from '../api/api'
import parse, { DOMNode, domToReact } from 'html-react-parser'
import { Element } from 'domhandler/lib/node'
import styles from '../../styles/Post.module.scss'

import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Post } from '../../utilities/types'

// モーダルの設定
Modal.setAppElement('#__next')

export const Page = ({ post }: { post: Post }) => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [modalSrc, setModalSrc] = useState<string>('')
  const replace = (node: DOMNode) => {
    if (node instanceof Element && node.name === 'img') {
      const onClick = () => {
        setModalSrc(node.attribs.src)
        setModalState(true)
      }
      return (
        <span className={styles.image} onClick={() => onClick()}>
          <Image {...node.attribs} src={node.attribs.src} alt="post-image" layout="fill" objectFit="contain" />
        </span>
      )
    } else if (node instanceof Element && node.name === 'p') {
      return <span>{domToReact(node.children, { replace })}</span>
    }
  }
  const element = parse(post.body, { replace })
  return (
    <div className={styles.post}>
      <Modal
        isOpen={modalState}
        onRequestClose={() => setModalState(false)}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <span className={styles.modalimage} onClick={() => setModalState(false)}>
          <Image src={modalSrc} alt="modal-image" quality={100} layout="fill" objectFit="none" />
        </span>
      </Modal>
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
