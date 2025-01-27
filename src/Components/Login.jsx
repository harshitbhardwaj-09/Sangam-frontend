import React, { useState } from 'react';
import { Card, Row, Col, Typography, Form, Input, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from "../assets/login.png"; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (values) => {
    setLoading(true);
    setError('');

    try {
     
      console.log(values);
   
      setLoading(false);
    } catch (e) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card className='form-container'>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} md={12}>
          <Typography.Title level={3} strong className='title'>
            Login to Your Account
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Welcome back! Please login to continue.
          </Typography.Text>
          <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "The input is not a valid Email!" },
              ]}
            >
              <Input size='large' placeholder='Enter your Email' />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password size='large' placeholder='Enter your Password' />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type='error'
                showIcon
                closable
                className='alert'
                onClose={() => setError('')}
              />
            )}

            <Form.Item>
              <Button
                type={loading ? 'default' : 'primary'}
                htmlType='submit'
                size='large'
                className='btn'
                disabled={loading}
              >
                {loading ? <Spin /> : 'Login'}
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/register">
                <Button size='large' className='btn'>
                  Create Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <img src={loginImage} alt="Login" className='auth-image' />
        </Col>
      </Row>
    </Card>
  );
};

export default Login;
