import { withRouter } from 'next/router'

import { Button, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import '../../styles/goods.css'
import GoodItem from '../../components/good-item/good-item'
import { Component } from 'react'

class Goods extends Component{

  state = {
    goods: []
  }

  handleAdd = (e) => {
    e.preventDefault()
    this.props.router.push('/data/goods/create')
  }

  handleDelete = (goods) => {
    this.setState({ goods })
  }

  componentDidMount() {
    const goods = JSON.parse(localStorage.getItem('goods'))
    if(goods) {
      console.log(goods)
      this.setState({ goods })
    }
  }

  render() {
    const {goods} = this.state

    return (
      <div className="container">
        <span className="title">Design goods</span>
        <Divider style={{margin: '15px 0 15px'}} />
        <Button 
            type="primary"
            onClick={this.handleAdd}  
            icon={<PlusOutlined />}
            style={{borderRadius: 5, borderColor: '#1da57a', background: '#1da57a'}}
          >创建商品</Button>
        <div className="cards">
        {
          goods.map(good => (
            <GoodItem key={good.itemId} good={good} onDelete={this.handleDelete} />
          ))
        }
        </div>
      </div>
    )
  }
}

export default withRouter(Goods)