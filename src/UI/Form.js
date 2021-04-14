import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const BillForm = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemTotal, setItemTotal] = useState(0);
    // const [billTotal, setBillTotal] = useState("");

    const calculate = (e) => {
        setItemQuantity(parseInt(e.target.value), () => {
            
        });
    }

    useEffect(() => {
      // if(itemQuantity>=0)
      setItemTotal(parseInt(itemPrice) * parseInt(itemQuantity));
      console.log(itemQuantity, itemPrice);
      console.log(itemTotal);
    })

    return (
      <Card className="m-3">
        <Card.Title className="text-center mt-3">Bill Details</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                        />
                <p></p>
            </Form.Group>

            <Form.Group controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicItemPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter item price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicItemQuantity">
              <Form.Label>Item Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter item quantity"
                value={itemQuantity}
                onChange={calculate}
              />
            </Form.Group>

            <p>{ itemTotal }</p>
                    
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
}

export default BillForm;