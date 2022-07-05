import React, { useState, useEffect } from "react";
import { Space, Table, message, Button, Form, Input } from "antd";
import "./style.css";
import axios from "axios";

const token = localStorage && localStorage.getItem("access-token");

const deleteItem = (item) => {
  try {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${item.id}`, {
        headers: {
          "access-token": `${token}`,
        },
      })
      .then((result) => console.log(result))
      .then(message.success("Task deleted"))
      .catch((error) => console.error(error));
  } catch (error) {}
};

const ShowTask = () => {
  const [taskData, setTaskData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios
        .patch(`${process.env.REACT_APP_API_ENDPOINT}/tasks/${editingRow}`, {
          values,
          headers: {
            "access-token": `${token}`,
          },
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
    setEditingRow(null);
  };

  useEffect(() => {
    if (!token) {
      message.warning("Please log in to view tasks");
    }
    try {
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/tasks`, {
          headers: {
            "access-token": `${token}`,
          },
        })
        .then((result) => setTaskData(result.data && result.data.success.rows))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  });
  const columns = [
    {
      title: "Task Name",
      dataIndex: "task_name",
      key: "task_name",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="task_name"
              rules={[
                {
                  required: true,
                  message: "Please enter task name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Task description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Start Date/Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Date/Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => deleteItem(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Edit",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.id);
                form.setFieldsValue({
                  task_name: record.task_name,
                  description: record.description,
                  id: record.id,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="task_data">
      <Form form={form} onFinish={onFinish}>
        <Table dataSource={taskData} pagination={false} columns={columns} />
      </Form>
    </div>
  );
};

export default ShowTask;
