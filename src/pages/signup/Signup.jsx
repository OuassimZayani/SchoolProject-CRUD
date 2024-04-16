import React, { useState } from 'react';
import "./signup.css"
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useUsers } from '../../UsersContext';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;


export default function Signup() {
  const { users } = useUsers();
  const { addUser } = useUsers();
  console.log(users);
  const [success, setSuccess] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    // Retrieve existing users data from local storage
    const existingUsersData = localStorage.getItem('users');

    // Check if existing users data exists and is not empty
    if (existingUsersData) {
      // Parse existing users data into an array
      const existingUsers = JSON.parse(existingUsersData);

      // Check if existing users is an array and not empty
      if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        // Create a new user object
        const newUser = { id: existingUsers.length + 1, ...values };

        // Update the users context data with the new user
        addUser(newUser);


        // Set success state to true to display success message
        setSuccess(true);
      } else {
        // If existing users is not an array or is empty, initialize it with the new user
        const newUser = { id: 1, ...values };
        localStorage.setItem('users', JSON.stringify([newUser]));

        // Set success state to true to display success message
        setSuccess(true);
      }
    } else {
      // If existing users data does not exist, initialize it with the new user
      const newUser = { id: 1, ...values };
      localStorage.setItem('users', JSON.stringify([newUser]));

      // Set success state to true to display success message
      setSuccess(true);
    }
  };



  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section} className='SignupSection'>
      <div style={styles.container} className='container'>
        <div style={styles.header} className='header'>
          <img className="logo" src="/images/logo.png" alt="" />
          <Title style={styles.title}>Sign up</Title>
          <Text style={styles.text}>
            Get started with your personalized account today!
          </Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please select your role!",
              },
            ]}
          >
            <div className="custom-select">
              <select>
                <option value="student">Select role:</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
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
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className='forgotPassword' href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item>
            <Button className='signupButton' type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          {success && (
            <Text style={{ color: 'green' }}>Sign up successful! <Link to="/">Login now</Link></Text>
          )}
        </Form>
      </div>
    </section>
  );
}