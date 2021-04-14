import React from 'react'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'

import './styles/header.css'
const { Header } = Layout

// 头部组件
export default function MyHeader(props) {
  const {collapsed, handleToggle} = props

  return (
    <Header 
      style={{
        backgroundColor: '#fff',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: handleToggle
      })}
    </Header>
  )
}