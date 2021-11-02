import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout"
import Input from '../components/UI/Input';
import "./CreateRecipe.css"
import { useSelector } from 'react-redux';
import { api } from "../urlConfig"


function CreateRecipe(props) {
  const auth = useSelector(state => state.auth)
  const [dishName, setDishName] = useState()
  const [description, setDescription] = useState()
  const [reciepe, setReciepe] = useState()
  const [category, setCategory] = useState()
  const [time_required, setTimeRequired] = useState()
  const [foodPictures, setFoodPictures] = useState([])
  const [ingridiants, setIngridiants] = useState([])
  const [ingridiantName, setIngridiantName] = useState("")
  const [ingridiantQuantity, setIngridiantQuantity] = useState("")
  const [count, setCount] = useState(1);
  const token = `Bearer ${auth.token}`
  console.log(token)
  const api2 = api + "/createFood";
  console.log(api2)

  const FormSubmitHandler = (event) => {
    event.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("dishName", dishName);
    formdata.append("description", description);
    formdata.append("reciepe", reciepe);
    formdata.append("category", category);
    formdata.append("time_required", time_required);
    formdata.append("foodPicture", foodPictures[0]);
    console.log("foodPictures", foodPictures, foodPictures[0])
    formdata.append("ingridiants", JSON.stringify(ingridiants));
    console.log("ingridiants", ingridiants, ingridiants[0])
    console.log(formdata.getAll("ingridiants"))
    console.log(formdata.getAll("foodPicture"))
    for (var key of formdata.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(api2, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    event.reset()
  }

  const ingrediantIncrement = () => {
    if (ingridiantName.length > 0 && ingridiantQuantity.length > 0) {
      let myIngridiant = {
        name: ingridiantName,
        quantity: ingridiantQuantity
      }
      setIngridiants([...ingridiants, myIngridiant])
      setCount(count + 1)
      setIngridiantName("")
      setIngridiantQuantity("")
    }
  }

  const ingrediantDecrement = () => {
    let newIngrediants = [...ingridiants];
    const len = newIngrediants.length
    newIngrediants.splice(len - 1, 1);
    setIngridiants(newIngrediants)
    if (count != 0) {
      setCount(count - 1)
    }
  }

  return (
    <Layout>
      <h2>ADD NEW FOOD RECIEPE</h2>
      {/* <img src={image1} /> */}
      <Container style={{ margin: "2rem" }}>
        <div className="newRecipeForm">
          <Form onSubmit={FormSubmitHandler} className="newRecipeForm">
            <Row>
              <Col><Input label="Title of the dish" type="text" onChange={(event) => { setDishName(event.target.value) }} value={dishName} /></Col>
              <Col><Input label="Category of the dish" type="text" onChange={(event) => { setCategory(event.target.value) }} value={category} /></Col>
            </Row>
            <Row>
              <Col><Input label="Time Required to make the dish" type="text" onChange={(event) => { setTimeRequired(event.target.value) }} value={time_required} /></Col>
              <Col><Input label="Uplaod picture" type="file" onChange={(event) => {
                console.log(event.target, event.target.files[0])
                setFoodPictures([...foodPictures, event.target.files[0]])
              }} /></Col>
            </Row>
            <Row>
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>About the dish</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => { setDescription(event.target.value) }} />
              </Form.Group >
            </Row>
            <Row>
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>Reciepe of the dish</Form.Label>
                <Form.Control as="textarea" rows={3} value={reciepe} onChange={(event) => { setReciepe(event.target.value) }} />
              </Form.Group >
            </Row>
            <br />
            <h4>Ingridiants: </h4>
            {
              ingridiants.map((ingridiant, index) => {
                return (
                  <Row style={{ border: "1px solid black", padding: "2px" }}>
                    <Col md="2">{index + 1}</Col>
                    <Col md="4">Name: {ingridiant.name}</Col>
                    <Col md="4">Quantity: {ingridiant.quantity}</Col>
                  </Row>
                )
              })
            }
            {/* {
              Array(count).fill(null).map((value, index) => {
                return (
                  <Row key={index}>
                    <Col><Input label="Ingridiant Name" type="text" placeholder="name of ingridiant" onChange={(event) => { setIngridiantName(event.target.value) }} /></Col>
                    <Col><Input label="Ingridiant Quantity" type="text" placeholder="quantity of ingridiant" onChange={(event) => { setIngridiantQuantity(event.target.value) }} /></Col>
                  </Row>
                )
              })

            } */}
            <Row>
              <Col><Input label="Ingridiant Name" type="text" placeholder="name of ingridiant" onChange={(event) => { setIngridiantName(event.target.value) }} value={ingridiantName} /></Col>
              <Col><Input label="Ingridiant Quantity" type="text" placeholder="quantity of ingridiant" onChange={(event) => { setIngridiantQuantity(event.target.value) }} value={ingridiantQuantity} /></Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="2"><Button onClick={ingrediantIncrement}>Add new Ingridiant</Button></Col>
              <Col md="2"><Button onClick={ingrediantDecrement}>Remove Ingridiant</Button></Col>
            </Row>
            <br />
            <Row>
              <Button variant="primary" type="submit">Submit</Button>
            </Row>
          </Form>
        </div>
      </Container >
    </Layout >
  );
}

export default CreateRecipe;