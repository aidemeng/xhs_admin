import App from 'next/app'
import Head from 'next/head'
import 'antd/dist/antd.css'

import '../styles/globals.css'
import Layout from '../components/layout/Layout'

export default class MyApp extends App {
  //对于所有组件，如果有定义getInitialProps则执行
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps}
  }

  render () {
    const {Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>商品后台</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
