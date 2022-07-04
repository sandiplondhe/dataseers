import React from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const AddTask = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      {" "}
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
              message: "Please input task name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Task Name"
          />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input task description!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="description"
          />
        </Form.Item>
        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: "Please input required time",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Required Time"
          />
        </Form.Item>

        <Form.Item>
          <Upload
            className="upload-show-remove-button"
            accept="image/png, image/jpeg, application/pdf"
          >
            <Button>Upload Doc</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;
