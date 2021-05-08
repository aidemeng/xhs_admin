import React, { Component } from 'react'
import { Drawer, Modal, Statistic, Divider, Popconfirm } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { withRouter } from 'next/router'

import PropsDetail from '../goods/PropsDetail'
import PropsUpdate from '../goods/PropsUpdate'
import formateDate from '../../utils/dateUtils'
import '../../styles/goods.css'


/*
商品组件
*/

class GoodItem extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      modalVisible: false,
      drawerVisible: false
    }
    this.goodRef = React.createRef()
  }

  //查看商品
  showDrawer = (e) => {
    // if(e.target)
    console.log(e.target.className)
    this.setState({ 
      drawerVisible: true 
    })
  }

  //删除商品
  confirm = () => {
    const id = this.goodRef.current.id
    const values = JSON.parse(localStorage.getItem('goods'))
    const goods = values ? values : []

    const index = goods.findIndex(value => value.itemId === id)
    goods.splice(index, 1)
    
    localStorage.setItem('goods', JSON.stringify(goods))
    this.props.onDelete(goods)
  }

  //修改商品
  updateProps = () => {
    //validateFields验证
    this.form.current.validateFields().then(value => {
      //设置更新时间
      value.updateTime = formateDate(Date.now())

      const { newProps } = value
      const newValue = {}
      if(newProps) {
        for(let i in newProps) {
          newValue[newProps[i].key] = newProps[i].value
        }
      }
      delete value.newProps
      const good = {...value, ...newValue}   //得到修改后的good属性
      
      const values = JSON.parse(localStorage.getItem('goods'))
      const goods = values ? values : []

      const index = goods.findIndex(value => value.itemId === good.itemId)
      goods.splice(index, 1, good)   //把更新后的商品添加到数组里
      localStorage.setItem('goods', JSON.stringify(goods))
      this.props.onUpdate(goods)

      this.setState({ modalVisible: false })
    })
    .catch(errorInfo => {
      console.log('Failed:', errorInfo);
    })
  }

  render() {
    const { good } = this.props
    const { modalVisible, drawerVisible } = this.state

    return (
      <>
        <div className="good-card"
          ref={this.goodRef}
          id={good.itemId}
          onClick={this.showDrawer}
        >
          <div className="good-card-top">
            <Statistic
              title="Name"
              value={good.name}
              valueStyle={{ color: '#12864e' }}
            />
            <div onClick={e => e.stopPropagation()}>
              <EditTwoTone 
                twoToneColor="#9F6DCF" 
                style={{fontSize: 20, marginRight: 15}} 
                onClick={() => {
                  this.setState({ modalVisible: true })
                }}/>
              <Popconfirm
                title="Are you sure to delete this good?" 
                onConfirm={this.confirm} 
                okText="Yes" 
                cancelText="No"
              >
                <DeleteTwoTone style={{fontSize: 20}} twoToneColor="#E74C20"/>
              </Popconfirm>
            </div>
          </div>
          <div style={{display: 'flex', marginTop: 30}}>
            <Statistic
              title="createdAt"
              value={good.createTime}
              style={{flex: 1}}
              valueStyle={{ fontSize: 13, color: '#12864e' }}
            />
            <Divider type="vertical" style={{height: 50, margin: '0 20px'}} />
            <Statistic
              title="updatedAt"
              value={good.updateTime}
              style={{flex: 1}}
              valueStyle={{ fontSize: 13, color: '#12864e' }}
            />
          </div>
        </div>
        {modalVisible &&
          <Modal
            title="修改属性"
            visible={modalVisible}
            onOk={this.updateProps} 
            onCancel={() => {
              this.setState({ modalVisible: false })
            }}
          >
            <PropsUpdate 
              block={good}
              setForm = {form => this.form = form}
            />
            
          </Modal>
        }
        <Drawer
          width="400"
          title="Basic Drawer"
          placement="right"
          closable={false}
          visible={drawerVisible}
          onClose={() => {
            this.setState({ drawerVisible: false })
          }}
        >
          <PropsDetail 
            block={good}
          />
        </Drawer>
      </>
    )
  }
}

export default withRouter(GoodItem)