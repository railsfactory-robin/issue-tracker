'use client'
import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Layout, Card, Row, Col } from 'antd';
const { Content } = Layout
import { register } from "@/actions/signup";

type FieldType = {
  name?: string;
  password?: string;
  email?: string;
};

const onFinish: FormProps<any>["onFinish"] = (values) => {
  console.log('Success:', values);
  register(values).then((data) => {
    console.log(data, "datadatadatadatadatadata111")
  }).catch((e) => console.log(e, "Something went wrong"));
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Signup: React.FC = () => (
  <Layout>
    <Content className='bg-blue-200 min-h-full' style={{
      padding: 24,
      minHeight: '100%',
    }}>
      <Row justify={'center'} className='mt-40'>
        <Col span={7}>
          <Card title="Register" bordered={true} className='w-full shadow-xl'>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>


    </Content>
  </Layout>
);

export default Signup;