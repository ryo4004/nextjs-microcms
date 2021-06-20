import usePageView from '../utilities/usePageView'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()
  return <Component {...pageProps} />
}
export default MyApp
