import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../components/Layout/Layout"
import { Link } from "react-router-dom"
import "./ViewRecipe.css"
import { MDBDataTableV5 } from 'mdbreact';

function ViewRecipe(props) {
  const food = JSON.parse(localStorage.getItem('foodTarget'))

  const goBackHandler = () => {
    localStorage.removeItem("foodTarget")
  }

  const tableRows = []
  {
    food.ingridiants?.map((item, index) => {
      tableRows.push({
        sno: index + 1,
        ingridiant_name: item.name,
        ingridiant_quantity: item.quantity
      })
    })
  }

  const dataTable = {
    columns: [
      {
        label: 'S.No',
        field: 'sno',
        width: 50,
      },
      {
        label: 'Ingridiant Name',
        field: 'ingridiant_name',
        width: 150,
      },
      {
        label: 'Ingridiant Quantity',
        field: 'ingridiant_quantity',
        width: 150,
      }
    ],
    rows: tableRows
  }
  return (
    <Layout>
      <Container fluid>
        <Row className="viewRecipeHeader justify-content-start align-items-center">
          <Col md="1"><Link to="/"><Button onClick={goBackHandler}>Back</Button></Link></Col>
          <Col><h1 className="dishTitle">{food.dishName}</h1></Col>
        </Row>
        <br />
        <Row className="">
          <Col md="5"><img className="dishImage" src={food.foodPictures[0].img} alt="dish image" /></Col>
          <Col>
            <Row><h3 style={{ textAlign: "left" }}>About the dish</h3></Row>
            <Row><h5 className="dishDescription">{food.description}</h5></Row>
            <br />
            <Row className="justify-content-center">
              <Col md="4"><h5 className="dishCategory" >Category: {food.category}</h5></Col>
              <Col md="4"><h5 className="dishCategory" >Time Required: {food.time_required}</h5></Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row className="align-items-center">
          <Col md="5" style={{ border: "2px" }}>
            <MDBDataTableV5
              small
              hover
              striped
              fullPagination
              entriesOptions={[10, 20, 25]}
              entries={10}
              bordered
              scrollX
              searchBottom={false}
              data={dataTable}
            />
          </Col>
          <Col>
            <h5>{food.reciepe}</h5>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ViewRecipe;