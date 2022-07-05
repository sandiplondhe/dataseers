import React, { useEffect } from "react";
import { Form, Input, Button, message, Upload, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;

const AddTask = () => {
  const token = localStorage && localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      message.warning("Please log in to add task");
    }
    return () => console.log("Unmount");
  });

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let start_time = moment(values.time[0]._d).format(
      "MMMM Do YYYY, h:mm:ss a"
    );

    let end_time = moment(values.time[1]._d).format("MMMM Do YYYY, h:mm:ss a");
    const formData = {
      task_name: values.name,
      token: token,
      description: values.description,
      start_time,
      end_time,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/tasks`,
        formData,
        config
      );
      message.success(res.data.success);
      form.resetFields();
    } catch (error) {
      message.error(error.data.error);
    }
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
            placeholder="Description"
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
          <RangePicker showTime />
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
