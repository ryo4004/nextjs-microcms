import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_ID } from '../utilities/gtag'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {GA_ID !== '' && (
            <>
              <script async src={'https://www.googletagmanager.com/gtag/js?id=' + GA_ID}></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
