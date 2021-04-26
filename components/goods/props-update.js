import React, { Component } from 'react'
import { Form, Input, Button, Popconfirm, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import Bus from '../../util/eventBus'

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 14,
  },
}

export default class PropsUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.form = React.createRef()
  }

  showPopconfirm = () => {
    this.setState({ visible: true })
  }

  confirm = (item) => {
    const newValue = this.props.block
    delete newValue[item]
    Bus.emit('changeData', newValue)
    message.success('delete success');
  }
  
  cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }
  

  componentDidMount() {
    this.props.setForm(this.form)
  }

  render() {
    const { block } = this.props
    return (
      <Form
        ref={this.form}
        labelAlign='left'
        name="basic"
        initialValues={block}
        onFinish={this.onFinish}
      >
        {
          Object.keys(block).map(item => {
            return (
              <div key={item} style={{position: 'relative'}}>
                <Form.Item
                  {...layout}
                  label={item}
                  name={item}
                >
                  <Input />
                </Form.Item>
                {/* <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={this.confirm.bind(this, item)}
                  onCancel={this.cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <MinusCircleOutlined 
                    style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}
                    onClick={this.showPopconfirm} 
                  />
                </Popconfirm> */}
              </div>
            )
          }) 
        }
        <Form.List name="newProps">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{display: 'flex', alignItems: 'baseline'}} >
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    style={{flex: 1, marginRight: 39}}
                    rules={[{ required: true, message: 'Missing name' }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    style={{flex: 2, marginRight: 6}}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button block
                  type="dashed" 
                  onClick={() => add()}  
                  icon={<PlusOutlined />}
                  style={{width: 452}}
                >
                  Add props
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    )
  }
}

