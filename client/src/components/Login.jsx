import React from "react";
import "antd/dist/antd.min.css";
import "./style.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/user/login`,
        values
      );
      message.success(res.data.success);
      localStorage.setItem("access_token", res.data.token);
      navigate("/addtask");
    } catch (error) {
      console.error(error);
    }
  };
  const FormPage = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    );
  };
  const token = localStorage && localStorage.getItem("access_token");

  const StartScreen = () => {
    return <h2>Welcome to task manager</h2>;
  };

  if (token) {
    return <StartScreen />;
  }
  return <FormPage />;
};

export default Login;
