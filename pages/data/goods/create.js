import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

import formateDate from '../../../utils/dateUtils'

export default function BlockForm() {
  const router = useRouter()

  const onFinish = (value) => {
    const values = JSON.parse(localStorage.getItem('goods'))
    const goods = values ? values : []

    //设置创建时间
    value.itemId = Date.now().toString()
    value.createTime = formateDate(Date.now())
    value.updateTime = 'none'

    goods.push(value)
    localStorage.setItem('goods', JSON.stringify(goods))
    router.push('/data/goods')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const back = () => {
    router.back()
  }

  return (
    <div className="container">
      <Button 
        type="link"
        onClick={back}
        icon={<ArrowLeftOutlined />}
        style={{fontSize: 16, color: '#1da57a', position: 'absolute'}}
      >back</Button>
      <div className="left">
        <div className="good-form">
          <div className="title">Create a good</div>
          <Form
            layout="vertical"
            name="basic"
            labelAlign="left"
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
              <Input style={{height: 45, borderRadius: 10}} placeholder="Enter good name"/>
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
              <Input style={{height: 45, borderRadius: 10}} placeholder="Enter good key"/>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit"
                style={{height: 50, borderRadius: 10, marginTop: 25, fontSize: 18}}
              >Save</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
        
      <style jsx>{`
        .container {
          height: 100%;
          //margin-top: -20px;
          position: relative;
        }
        .left {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .good-form {
          width: 50%;
          margin-top: -50px;
        }
        .good-form .title {
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 50px;
        }
      `}</style>
      
    </div>
  )
}
