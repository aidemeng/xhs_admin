import App from 'next/app'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import 'antd/dist/antd.css'

import '../styles/globals.css'
import Layout from '../components/layout/Layout'

class MyApp extends App {
  //对于所有组件，如果有定义getInitialProps则执行
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps}
  }

  render () {
    const {Component, pageProps, router} = this.props
    return (
      <>
        <Head>
          <title>商品后台</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {router.pathname !== '/_error' ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Error statusCode="404" />
        )}
      </>
    )
  }
}

export default withRouter(MyApp)