import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();
  const login = () => {
    navigate("/");
    localStorage.setItem("user", true);
    setIsAuth(true);
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      login()
    }

    setValidated(true);
  };
  return (
    <Form
      className="mini-container mt-5"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <Form.Group as={Col} sm="12" controlId="validationCustom01">
          <Form.Label>Full name <span className="text-danger">*</span></Form.Label>
          <Form.Control required type="text" placeholder="Full name" />
          <Form.Control.Feedback type="invalid">
            Enter your Full Name
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          sm="12"
          controlId="validationCustomUsername"
        >
          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
          <br />
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <InputGroup.Text id="inputGroupPrepend">@gmail.com</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              Enter your email
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} sm="12" controlId="validationCustom01">
          <Form.Label>Password <span className="text-danger">*</span></Form.Label>
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback type="invalid">
            Enter your Password
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <center>
        <Button variant="outline-primary" type="submit" className="py-2 px-5 fs-5">
          Login
        </Button>
      </center>
    </Form>
  );
}

export default LoginPage;
