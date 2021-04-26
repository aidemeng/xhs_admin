import React, { Component } from 'react'

import DragBlock from '../../components/goods/drag-block'
import DropBlock from '../../components/goods/drop-block'
import PhoneView from '../../components/goods/phone-view'
import BlockProps from '../../components/goods/block-props'
import emitter from '../../util/eventBus'
import { withRouter } from 'next/router'


const goodsList = [
  {
    data: 'Image',
    itemId: '12345',
    stockStatus: 1
  },
  {
    data: 'Image',
    itemId: '23456',
    stockStatus: 2
  },
  {
    data: 'Video',
    itemId: '34567',
    stockStatus: 3
  },
]
let block = {}


class Goods extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      block: this.initBlock(props.router.query.id),
    }
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener('changeData', (values) => {
      this.setState({block: values})
    })
  }

  // 组件将要销毁时取消事件监听
  componentWillUnmount(){
    this.eventEmitter.remove()
  }
  
  initBlock = selectId => goodsList.find(item => item.itemId === selectId)

  handleSelect = (selectId) => {
    for(let i in goodsList) {
      if(goodsList[i].itemId === selectId) {
        block = goodsList[i]
      }
    }
    this.setState({ block })
  }
  
  render() {
    const selectId = this.props.router.query.id
    const { block } = this.state 

    return (
      <div className="goods-wrapper">
        <div className="left">
          <div className="drag-blocks">
            {
              goodsList.map(item => { 
                return (
                  <DragBlock id={item.itemId} key={item.itemId} size={item.itemId === selectId ? "big" : 'normal'}/>
                )
              })
            }
          </div>
          <PhoneView> 
          {
            goodsList.map(item => { 
              return (
                <DropBlock id={item.itemId} key={item.itemId} onSelect={this.handleSelect} size={item.itemId === selectId ? "big" : 'normal'}/>
              )
            })
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