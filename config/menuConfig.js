const menuList = [
  {
    title: 'Application',  //标题
    key: '/application',   //path
    icon: 'MailOutlined',
    children: [            //子菜单列表
      {
        title: 'Goods',  
        key: '/goods',
      },
      {
        title: 'Cart',  
        key: '/cart',
      },
      {
        title: 'Order',  
        key: '/order',
      },
      {
        title: 'OrderList',  
        key: '/order-list',
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