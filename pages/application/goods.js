import React, { Component } from 'react'

import DragBlock from '../../components/goods/drag-block'
import DropBlock from '../../components/goods/drop-block'
import PhoneView from '../../components/goods/phone-view'
import BlockProps from '../../components/goods/block-props'
import emitter from '../../utils/eventBus'
import { withRouter } from 'next/router'


class Goods extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      goodList: [],
      block: {} 
    }
  }

  componentDidMount() {
    const {id} = this.props.router.query
    const goodList = JSON.parse(localStorage.getItem('goods'))
    if(goodList) {
      const block = goodList.find(item => item.itemId === id)
      this.setState({ goodList, block })
    }

    this.eventEmitter = emitter.addListener('changeData', (value) => {
      const index = goodList.findIndex(item => item.itemId === value.itemId)
      const goods = JSON.parse(localStorage.getItem('goods'))

      goods.splice(index, 1, value)
      localStorage.setItem('goods', JSON.stringify(goods))
      this.setState({block: value})
    })
  }

  // 组件将要销毁时取消事件监听
  componentWillUnmount(){
    this.eventEmitter.remove()
  }
  
  handleSelect = (selectId) => {
    const { goodList } = this.state
    let block
    for(let i in goodList) {
      if(goodList[i].itemId === selectId) {
        block = goodList[i]
      }
    }
    this.setState({ block })
  }
  
  render() {
    const selectId = this.props.router.query.id
    const { block, goodList } = this.state 

    return (
      <div className="goods-wrapper">
        <div className="left">
          <div className="drag-blocks">
            {
              goodList.map(item => (
                <DragBlock 
                  id={item.itemId} 
                  key={item.itemId} 
                  size={item.itemId === selectId ? "big" : 'normal'}
                />
              ))
            }
          </div>
          <PhoneView> 
          {
            goodList.map(item => (
              <DropBlock 
                id={item.itemId} 
                key={item.itemId} 
                onSelect={this.handleSelect} 
                size={item.itemId === selectId ? "big" : 'normal'}
              />
            ))
          }
          </PhoneView>
        </div>
        
        {selectId ? <BlockProps block={block} /> : null}
        
        <style jsx>{`
          .goods-wrapper {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .left {
            width: 45%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .drag-blocks {
            padding: 0 10px;
            min-height: 420px;
            border: 1px solid #777;
          }
        `}</style>
      </div>
    )
  }
  
}

export default withRouter(Goods)