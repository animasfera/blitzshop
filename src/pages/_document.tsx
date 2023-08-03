import Document, { Html, Main, NextScript, Head } from "next/document"
import i18n from "src/core/i18n"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }
  render() {
    return (
      <Html lang={i18n.resolvedLanguage?.toLowerCase() || "en"}>
        <Head>
          <link href="/dist/output.css" rel="stylesheet"></link>
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
