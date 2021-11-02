import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import Input from '../components/UI/Input';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import axiosInstance from "../helpers/axios"

function SignUp(props) {
  const auth = useSelector(state => state.auth)
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [resStatus, setResStatus] = useState()

  const registerHandler = (event) => {
    event.preventDefault()
    const user = { userName, email, password }
    console.log(user)
    postData('/signup', user)
      .then(res => {
        console.log("res of axiosIntance post call", res)
        if (res.status === 201) {
          setResStatus(true)
          console.log("res.status:", res.status)
        }
        else if (res.status === 400) {
          setResStatus(false)
          console.log("res.status:", res.status)
        }
      })
    console.log("call complete")
  }
  console.log("call complete sala,dsla,dsals,ald,sa")

  async function postData(url, data) {
    const res = await axiosInstance.post(url, {
      ...data
    })
    return res
  }

  if (resStatus == true) {
    return <Redirect to="/signin" />
  }
  else if (resStatus == false) {
    alert("signup fail")
  }

  if (auth.authenticate) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Container style={{ margin: "5rem" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={registerHandler}>
              <Input label="User Name" type="text" placeholder="enter  username" value={userName} onChange={(event) => setUserName(event.target.value)} />
              <Input label="Email Address" type="email" placeholder="enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Input label="Password" type="password" placeholder="enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignUp;