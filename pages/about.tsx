import { NextPage } from 'next'
import { getAbout } from './api/api'
import { NextLink } from '../components/Link'
import styles from '../styles/About.module.scss'

import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import type { About } from '../utilities/types'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const Page: NextPage<Props> = ({ about }) => {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <div dangerouslySetInnerHTML={{ __html: about.body }} />
      <NextLink to="/">ホーム</NextLink>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getAbout<About>()
  if (response) {
    return { props: { about: response } }
  }
  return { notFound: true }
}

export default Page
