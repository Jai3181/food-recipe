import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import Input from '../components/UI/Input';
import { login } from "../actions/Actions"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

function SignIn(props) {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)


  const LoginHandler = (event) => {
    event.preventDefault()
    const user = {
      email, password
    }
    dispatch(login(user))
  }

  if (auth.authenticate) {
    return <Redirect to="/" />
  }


  return (
    <Layout>
      <Container style={{ margin: "5rem" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={LoginHandler}>
              <Input label="Email Address" type="email" placeholder="enter email" onChange={(event) => { setEmail(event.target.value) }} value={email} />
              <Input label="Email Password" type="password" placeholder="enter password" onChange={(event) => { setPassword(event.target.value) }} value={password} />
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignIn;