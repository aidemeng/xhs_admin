const menuList = [
  {
    title: 'Application',  //标题
    key: '/application',   //path
    icon: 'MailOutlined',
    children: [            //子菜单列表
      {
        title: 'Goods',  
        key: '/application/goods',
      },
      {
        title: 'Cart',  
        key: '/application/cart',
      },
      {
        title: 'Order',  
        key: '/application/order',
      },
      {
        title: 'OrderList',  
        key: '/application/order-list',
      },
    ]
  },
  {
    title: 'DataFactory',  //标题
    key: '/data',   //path
    children: [            //子菜单列表
      {
        title: 'Goods',  
        key: '/data/goods',
      },
      {
        title: 'Cart',  
        key: '/data/cart',
      },
      {
        title: 'Order',  
        key: '/data/order',
      },
      {
        title: 'OrderList',  
        key: '/data/order-list',
      },
    ]
  }
]

export default menuList