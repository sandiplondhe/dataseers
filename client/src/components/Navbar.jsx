import React from "react";
import "antd/dist/antd.min.css";
import "./style.css";
import { Menu } from "antd";

const Navbar = () => {
  const items = [
    {
      label: <a href="/alltask">All Task</a>,
    },
    {
      label: <a href="/addtask">Add Task</a>,
      key: "Add Task",
    },
    {
      label: <a href="/register">Register</a>,
      key: "register",
    },
  ];
  return <Menu mode="horizontal" items={items} className="menu" />;
};

export default Navbar;
