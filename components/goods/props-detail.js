import React, { Component } from 'react'
import { List, Button, Modal } from 'antd'

import PropsUpdate from './props-update'
import emitter from '../../util/eventBus'

export default class PropsDetail extends Component {

  state = {
    visible: false
  }

  updateProps = () => {
    //validateFields验证
    this.form.current.validateFields().then(values => {
      const { newProps } = values
      const newValue = {}
      for(let i in newProps) {
        newValue[newProps[i].key] = newProps[i].value
      }
      delete values.newProps
      emitter.emit('changeData', {...values, ...newValue})

      this.setState({ visible: false })
    })
    .catch(errorInfo => {
      console.log('Failed:', errorInfo);
    })
  }

  render() {
    const { visible } = this.state
    const { block } = this.props

    return (
      <div>
        <List >
          {
            Object.keys(block).map(item => {
              return (
                <List.Item key={item}>
                  <span className="left">{item}:</span>
                  <span>{block[item]}</span>
                </List.Item>
              )
            })
          }
        </List>
        <Button 
          block
          style={{marginTop: 30}}
          type="primary" 
          onClick={() => {
            this.setState({ visible: true })
          }} 
        >
          Add or Update
        </Button>
        {visible &&
          <Modal
            title="修改属性"
            visible={visible}
            onOk={this.updateProps} 
            onCancel={() => {
              this.setState({ visible: false })
            }}
          >
            
            <PropsUpdate 
              block={block}
              setForm = {form => this.form = form}
            />
            
          </Modal>
        }
        <style jsx>{`
          .left { 
            margin-right: 10px; 
            font-weight: bold; 
          }
        `}</style>
      </div>
      
    )
  }
}


