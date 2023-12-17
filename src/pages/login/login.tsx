import React, { useEffect, useState } from "react";
import "../../asserts/css/login.css";
import LogoMain from "../../asserts/imgs/main-logo.png";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { URLS } from "../../utils/constants";
import { showErrorMsg, showSuccessMsg } from "../../utils/notifications";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localstorage";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const checkUserStatus = () => {
    const token = getLocalStorageItem("token");
    if (token !== null && token !== "") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post(URLS.login, { email, password });
      setLocalStorageItem("user", JSON.stringify(response.data));
      setLocalStorageItem("token", response.data.accessToken);
      showSuccessMsg("Login Successfully");
      navigate("/dashboard");
    } catch (err) {
      showErrorMsg("Invalid Login");
    }
  };

  return (
    <div className="login_page">
      <div className="container">
        <div className="login_area">
          <img src={LogoMain} alt="" />

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Remember me"
                className="check_box"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
