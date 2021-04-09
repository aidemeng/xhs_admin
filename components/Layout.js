import React, { Component } from 'react'
import { Layout } from 'antd'
import Router from 'next/router'

import Header from './Header'
import Menu from './Menu'
import * as Icon from '@ant-design/icons'

const { Sider, Content } = Layout

export default class MyLayout extends Component {

  componentDidMount() {
    const {pathname} = Router
    if(pathname == '/' ){
       Router.push('/goods')
    }
  }

  render() {
    const {children} = this.props

    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider>
          <Menu></Menu>
        </Sider>
        <Layout>
          <Header>
            <div>
              {React.createElement(Icon[StepBackwardOutlined])}
            </div>
          </Header>
          <Content style={{backgroundColor: '#fff'}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
