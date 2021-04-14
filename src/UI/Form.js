import React, { useState, useEffect } from "react";
import { Form, Card, Button, Accordion } from "react-bootstrap";
import Items from "../components/ItemForm";

const BillForm = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [itemCount, setItemCount] = useState(1);
  // const [itemName, setItemName] = useState("");
  // const [itemPrice, setItemPrice] = useState(0);
  // const [itemQuantity, setItemQuantity] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  // const [billTotal, setBillTotal] = useState("");

  // const calculate = (e) => {
  //   setItemQuantity(parseInt(e.target.value), () => {});
  // };

  // useEffect(() => {
  //   // if(itemQuantity>=0)
  //   setItemTotal(parseInt(itemPrice) * parseInt(itemQuantity));
  //   console.log(itemQuantity, itemPrice);
  //   console.log(itemTotal);
  // })

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
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Accordion defaultActiveKey="0">
            {[...Array(itemCount)].map((e, i) => (
              <Items index={i} />
            ))}
          </Accordion>
          <Button onClick={() => setItemCount(itemCount + 1)}>Add item</Button>

          <p>{itemTotal}</p>

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
};

export default BillForm;
