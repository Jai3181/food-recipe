import React from 'react';
import "./FoodCard.css"
import { Row, Col, Button } from "react-bootstrap";
import { IoTime } from 'react-icons/io5';
import { MdOutlineFoodBank } from "react-icons/md";
import { Link } from "react-router-dom"

function FoodCard({ foodPictures, dishName, time_required, category, foodId, food }) {

  const viewRecipeHandler = (event) => {
    console.log(food)
    localStorage.setItem('foodTarget', JSON.stringify(food))
  }

  return (
    <Col className="foodCard">
      <Row className="justify-content-start">
        <Col className="food_title"><span >{dishName}</span></Col>
      </Row>
      <img className="foodPicture" src={foodPictures[0].img} alt="food-picture" />
      <Row>
        <Col md="6" className="bottom"><span className="time_required muted"><IoTime size="20px" />{time_required}</span></Col>
        <Col md="6" className="bottom"><span className="category"><MdOutlineFoodBank size="20px" />{category}</span></Col>
      </Row>
      <br />
      <Link to="/viewRecipe"><Button id={foodId} variant="success" onClick={viewRecipeHandler}>See Complete Recipe</Button></Link>
    </Col>
  );
}

export default FoodCard;