
import { Statistic, Divider, Popconfirm } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

import '../../styles/goods.css'
import { useRef } from 'react'

/*
商品组件
*/

export default function GoodItem({ good, onDelete }) {

  const goodRef = useRef()

  //删除商品
  const confirm = () => {
    const id = goodRef.current.id
    const values = JSON.parse(localStorage.getItem('goods'))
    const goods = values ? values : []

    const index = goods.findIndex(value => value.itemId = id)
    goods.splice(index, 1)
    
    localStorage.setItem('goods', JSON.stringify(goods))
    onDelete(goods)
  }

  return (
    <div className="good-card"
      ref={goodRef}
      id={good.itemId}
    >
      <div className="good-card-top">
        <Statistic
          title="Name"
          value={good.name}
          valueStyle={{ color: '#3f8600' }}
        />
        <Popconfirm
          title="Are you sure to delete this good?" 
          onConfirm={confirm} 
          okText="Yes" 
          cancelText="No"
        >
          <DeleteTwoTone className="delete" style={{fontSize: 20}} twoToneColor="#cf1322"/>
        </Popconfirm>
      </div>
      <div style={{display: 'flex', marginTop: 30}}>
        <Statistic
          title="createdAt"
          value={good.createTime}
          style={{flex: 1}}
          valueStyle={{ fontSize: 12, color: '#3f8600' }}
        />
        <Divider type="vertical" style={{height: 48, margin: '0 15px'}} />
        <Statistic
          title="updatedAt"
          value={good.updateTime}
          style={{flex: 1}}
          valueStyle={{ fontSize: 12, color: '#3f8600' }}
        />
      </div>
      
    </div>
  )
}