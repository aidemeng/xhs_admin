import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'

import formateDate from '../../../utils/dateUtils'

export default function BlockForm() {
  const router = useRouter()

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
    offset: 7,
    span: 12,
  },
}
  const onFinish = (value) => {
    const values = JSON.parse(localStorage.getItem('goods'))
    const goods = values ? values : []

    //设置创建时间
    value.createTime = formateDate(Date.now())
    value.updateTime = 'none'

    goods.push(value)
    localStorage.setItem('goods', JSON.stringify(goods))
    router.push('/data/goods')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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

      <Form.Item
        label="itemId"
        name="itemId"
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
