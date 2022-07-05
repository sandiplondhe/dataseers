import React, { useState, useEffect } from "react";
import { Space, Table, message, Button } from "antd";
import "./style.css";
import axios from "axios";
const { Column, ColumnGroup } = Table;

const token = localStorage && localStorage.getItem("access_token");

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

  return (
    <div className="task_data">
      <Table dataSource={taskData} pagination={false}>
        <ColumnGroup title="Tasks">
          <Column title="Task Name" dataIndex="task_name" key="task_name" />
          <Column
            title="Task description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Start Time/Date"
            dataIndex="start_time"
            key="start_time"
          />
          <Column title="End Time/Date" dataIndex="end_time" key="end_time" />
        </ColumnGroup>

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => deleteItem(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ShowTask;
