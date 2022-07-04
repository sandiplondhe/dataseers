import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/`,
        values,
        config
      );
      message.success(res.data.success);
      localStorage.setItem("access_token", res.data.token);
      navigate("/addtotask");
    } catch (error) {
      console.error(error);
    }
  };
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
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>
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
        name="contact"
        rules={[
          {
            required: true,
            message: "Please input your contact!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Contact"
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register Now
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
