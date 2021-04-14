import React, { Component } from 'react'
import { Layout } from 'antd'
import Router from 'next/router'

import Header from './Header'
import Menu from './Menu'

const { Sider, Content } = Layout

export default class MyLayout extends Component {

  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  componentDidMount() {
    const {pathname} = Router
    if(pathname == '/' ){
       Router.push('/goods')
    }
  }

  render() {
    const {collapsed} = this.state
    const {children} = this.props

    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Menu></Menu>
        </Sider>
        <Layout>
          <Header collapsed={collapsed} handleToggle={this.toggle} />
          <Content style={{padding: '24px'}}>
            <div 
              style={{
                padding: 24,
                minHeight: '100%',
                background: '#fff',
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
