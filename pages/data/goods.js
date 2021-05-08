import { withRouter } from 'next/router'

import { Button, Divider, Pagination } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import '../../styles/goods.css'
import GoodItem from '../../components/good-item/GoodItem'
import { Component } from 'react'

const numEachPage = 8

class Goods extends Component{

  state = {
    goods: [],
    currentPage: 1,
  }

  //创建
  handleAdd = (e) => {
    e.preventDefault()
    this.props.router.push('/data/goods/create')
  }

  //删除与更新
  handleDeleteOrUpdate = (goods) => {
    this.setState({ goods })
  }

  onChange = page => {
    this.setState({
      currentPage: page
    })
  }

  componentDidMount() {
    const goods = JSON.parse(localStorage.getItem('goods'))
    if(goods) {
      this.setState({ goods })
    }
  }

  render() {
    const {goods, currentPage} = this.state
    const min = (currentPage - 1) * numEachPage
    const max = currentPage * numEachPage
    const total = goods.length

    return (
      <div className="container">
        <span className="title">Design goods</span>
        <Divider style={{margin: '15px 0 15px'}} />
        <Button 
            type="primary"
            onClick={this.handleAdd}  
            icon={<PlusOutlined />}
            style={{borderRadius: 6}}
          >创建商品</Button>
        <div className="cards">
          {goods && total > 0 &&
            goods.slice(min, max).map(good => (
              <GoodItem key={good.itemId} good={good} onDelete={this.handleDeleteOrUpdate} onUpdate={this.handleDeleteOrUpdate} />
            ))
          }
        </div>
        <Pagination 
          defaultCurrent={1} 
          hideOnSinglePage 
          onChange={this.onChange}
          pageSize={numEachPage}
          total={total} 
        />
      </div>
    )
  }
}

export default withRouter(Goods)