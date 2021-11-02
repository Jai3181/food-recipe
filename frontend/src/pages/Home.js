import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import Layout from "../components/Layout/Layout"
import FoodCard from '../components/FoodCard/FoodCard';
import axiosInstance from "../helpers/axios"
import { useSelector } from 'react-redux';
import "./Home.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

function Home(props) {
  const auth = useSelector(state => state.auth)
  const [cFoodList, setCFoodList] = useState([])
  const [foodList, setFoodList] = useState([])
  const [filter, setFilter] = useState()
  const [food, setFood] = useState()
  const [search, setSearch] = useState()


  useEffect(() => {
    getData("/getFood")
      .then(data => {
        console.log(data.food)
        setCFoodList(data.food)
        setFoodList(data.food)
      })
  }, [])


  async function getData(url, data) {
    const res = await axiosInstance.get(url)
    return res.data
  }

  console.log(cFoodList)

  if (food) {
    return <Redirect to="/viewRecipe" exact />
  }

  const filterHandler = (event) => {
    setFilter(event.target.value)
    if (event.target.value == "all") {
      setFoodList(cFoodList)
    }
    else if (event.target.value == "me") {
      let list = cFoodList.filter((food) => food.createdBy == auth.user._id)
      setFoodList(list)
    }
    else {
      let list = cFoodList.filter((food) => food.createdBy != auth.user._id)
      setFoodList(list)
    }
  }
  console.log(foodList)

  const filterrHandler = (event) => {
    event.preventDefault()
    let list
    if (filter == "name") {
      list = cFoodList.filter((food) => food.dishName.toUpperCase().includes(search.toUpperCase()))
      console.log(list)
    }
    if (filter == "ingridiants") {
      list = cFoodList.filter((food) => {
        for (let i = 0; i < food.ingridiants.length; i++) {
          if (food.ingridiants[i].name.includes(search)) {
            return true
          }
        }
        return false
      })
      console.log(list)
    }
    setFoodList(list)
  }
  const clearHandler = () => {
    setFilter("")
    setSearch("")
    setFoodList(cFoodList)
  }

  return (
    <Layout>
      <Container>
        <h1 className="text-center" style={{ marginTop: "1rem", background: "ORANGE", padding: "3rem" }}>WELCOME TO FOOD RECIPE APP</h1>
        <Row>
          <span className="homeMade">homemade</span>
          <span className="homeMade2">RECIPES STRAIGHT FROM HOME</span>
        </Row>
        <br />
      </Container>
      <Container className="recipe_section">
        <h1>TASTY INDIAN RECIPES</h1>
        <Row className="filter justify-content-between">
          <Col>
            <Form onSubmit={filterrHandler}>
              <div className="mb-3 filterBar" >
                <Row className="align-item-center">
                  <Col md="1" className="col-sm-1 col-form-label align-items-center">
                    <h6><b>Search:</b></h6>
                  </Col>
                  <Col md={2}>
                    <Form.Select aria-label="Default select example" onChange={(event) => { setFilter(event.target.value) }}>
                      <option>Open this select menu</option>
                      <option value="name">Name</option>
                      <option value="ingridiants">Ingridiants</option>
                    </Form.Select>
                  </Col>
                  <Col md={5}>
                    <Form.Control type="text" onClick="{onClick}" value={search} onChange={(event) => { setSearch(event.target.value) }} />
                  </Col>
                  <Col md={1} className="searchBar">
                    <Button type="submit" variant="success">Search</Button>
                  </Col>
                  <Col md={1} className="searchBar">
                    <Button type="reset" onClick={clearHandler}>Clear</Button>
                  </Col>
                  <Col md={2}>
                    <Link to="/newRecipe"><Button type="success">+ Add New Recipe</Button></Link>
                  </Col>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          {foodList?.map(food => {
            console.log(food.createdBy)
            return (
              <Col lg="4" md="4">
                <FoodCard food={food} foodId={food._id} foodPictures={food.foodPictures} dishName={food.dishName} time_required={food.time_required} category={food.category} />
              </Col>
            )
          })}
        </Row>
      </Container>
    </Layout >
  );
}

export default Home;