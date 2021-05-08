import React, { useState } from 'react'
import { Card, Form, Input, Button } from 'antd'

import PropsDetail from './PropsDetail'

const tabList = [
  {
    key: 'blockProps',
    tab: 'blockProps',
  },
  {
    key: 'props',
    tab: 'Props',
  },
]


const BlockForm = () => {

  const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
}
  const onFinish = (values) => {
    console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      {...layout}
      name="basic"
      labelAlign='left'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Key"
        name="key"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}


export default function BlockProps(props) {
  const { block } = props
  
  const contentList = {
    blockProps: <BlockForm />,
    props: <PropsDetail block={block} />,
  }

  const [key, setKey] = useState('props')
  
  const onTabChange = (key) => {
    setKey(key)
  }

  return (
    <Card
      style={{width: 350, height: '100%', position: 'relative'}}
      tabList={tabList}
      tabProps={{tabBarGutter: 50}}
      activeTabKey={key}
      onTabChange={key => {
        onTabChange(key)
      }}
    >
      {contentList[key]}
    </Card>
  )
}
