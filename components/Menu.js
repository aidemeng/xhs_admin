import React, { Component } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from 'antd'

import menuList from '../config/menuConfig'

const SubMenu = Menu.SubMenu

const getMenuNodes = (menuList) => {
  return menuList.map(item => {
    if(!item.children) {
      return (
        <Menu.Item 
          key={item.key}
        >
          <Link href={item.key}>
            <a>
              <text></text>
              <span>{item.title}</span>
            </a>
          </Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu 
          key={item.key} 
          title={ 
            <span> 
              <span>{item.title}</span> 
            </span> 
          } 
        > 
          {getMenuNodes(item.children)} 
        </SubMenu>
      )
    }
  })
}

/*
菜单组件
*/
function MyMenu(props) {
  const router = useRouter()
  const currentPath = router.route
  let openKey
  menuList.forEach(item => {
    if(item.children) {
      if(item.children.find(cItem => currentPath.indexOf(cItem.key)===0)) {
        openKey = item.key
      }
    }
  })
  console.log(openKey)

  return (
    <Menu
      theme='dark'
      mode="inline"
      selectedKeys={[currentPath]}
      defaultOpenKeys={[openKey]}
      style={{marginTop: '30px'}}
    >
      {getMenuNodes(menuList)}
    </Menu>
  )
}

export default MyMenu