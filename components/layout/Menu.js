import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from 'antd'

import { 
  RocketOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  BarsOutlined,
  RobotOutlined
} from '@ant-design/icons'

const SubMenu = Menu.SubMenu

const keys = [
  '/application',   //path  
  '/application/goods',
  '/application/cart',
  '/application/order',
  '/application/order-list',
  '/data', 
  '/data/goods',
  '/data/cart',
  '/data/order',
  '/data/order-list',
]

const menu = [
  <SubMenu key={keys[0]} icon={<RocketOutlined />} title="Application">
    <Menu.Item key={keys[1]} icon={<ShoppingOutlined />}>
      <Link href={keys[1]}>
        <a>
          <span>Goods</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[2]} icon={<ShoppingCartOutlined />}>
      <Link href={keys[2]}>
        <a>
          <span>Cart</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[3]} icon={<ProfileOutlined />}>
      <Link href={keys[3]}>
        <a>
          <span>Order</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[4]} icon={<BarsOutlined />}>
      <Link href={keys[4]}>
        <a>
          <span>OrderList</span>
        </a>
      </Link>
    </Menu.Item>
  </SubMenu>,
  <SubMenu key={keys[5]} icon={<RobotOutlined />} title="DataFactory">
    <Menu.Item key={keys[6]} icon={<ShoppingOutlined />}>
      <Link href={keys[6]}>
        <a>
          <span>Goods</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[7]} icon={<ShoppingCartOutlined />}>
      <Link href={keys[7]}>
        <a>
          <span>Cart</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[8]} icon={<ProfileOutlined />}>
      <Link href={keys[8]}>
        <a>
          <span>Order</span>
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item key={keys[9]} icon={<BarsOutlined />}>
      <Link href={keys[9]}>
        <a>
          <span>OrderList</span>
        </a>
      </Link>
    </Menu.Item>
  </SubMenu>
]

/*
菜单组件
*/
const MyMenu = () => {
  const [openKeys, setOpenKeys] = React.useState([keys[0]])

  const router = useRouter()
  const currentPath = router.route
  const openKey = currentPath.split('/')[1]
  
  let selectedKeys = []
  for (let i = keys.length - 1; i >= 0; i--) {
    if (currentPath.includes(keys[i])) {
      selectedKeys = [keys[i]]
      break
    }
  }

  const handleOpenChange = keys => {
    setOpenKeys(keys)
  }

  return (
    <Menu
      theme='dark'
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={[`/${openKey}`]}
      onOpenChange={handleOpenChange}
      style={{marginTop: '30px'}}
    >
      {menu}
    </Menu>
  )
}

export default MyMenu