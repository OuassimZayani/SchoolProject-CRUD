import React from 'react';
import "./dashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import { useAbsences } from '../../AbsencesContext';

import { Table } from "antd";
function Dashboard() {
  const { absences } = useAbsences();

  // Map over the absences data and format it for the table
  const dataSource = absences.map((absence, index) => ({
    key: index.toString(), // Assuming each absence has a unique identifier, you can use it here
    module: absence.moduleName,
    teacher: absence.instructor,
    absence: absence.totalAbsences,
  }));
      
  const columns = [
    {
      title: 'Module name',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Number of absences',
      dataIndex: 'absence',
      key: 'absence',
    },
  ];
  return (
      <div className="home">
          <Sidebar />
          <div className="homeContainer">
              <Navbar />
              <h3>Dashboard</h3>
              <p>Welcome to your dashboard</p>
              <div className="widgets">
                  <Widget type="module" />
                  <Widget type="class" />
                  <Widget type="exam" />
                  <Widget type="result" />
              </div>
              <p>Your absence tallies</p>
              <Table dataSource={dataSource} columns={columns} />
          </div>
      </div>
  );
}

export default Dashboard;
