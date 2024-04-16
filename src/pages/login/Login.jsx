import React, { useState } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAuth } from '../../AuthContext';
import { useUsers } from '../../UsersContext';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

function Login() {
  const { users } = useUsers();
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the useAuth hook to access authentication context

  const [error, setError] = useState(null);

  const onFinish = (values) => {
    // Check if the entered email and password match any user in the context data
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      // If a user is found, log them in and redirect to the appropriate page based on their role
      setError(null);
      login(user); // Set the user in the authentication context
      // Redirect logic based on user role
      navigate("/dashboard");
    } else {
      // If no user is found, display an error message
      setError("Invalid email or password");
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
  console.log(users);
  return (
    <section style={styles.section} className='loginSection'>
      <div style={styles.container}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img className="logo" src="/images/logo.png" alt="" />
            <Title style={styles.title}>Sign in</Title>
            <Text style={styles.text}>
              Welcome back to Tech University! Please enter your details below to
              sign in.
            </Text>
          </div>
          {/* Display error message if error state is not null */}
          {error && <Text type="danger">{error}</Text>}
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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
              <a style={styles.forgotPassword} href="">
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>{" "}
                <Link to="/signup">Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;
