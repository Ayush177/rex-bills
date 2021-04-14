import React, { useState, useEffect } from "react";
import { Card, Accordion, Button, Form } from "react-bootstrap";

const Items = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    // if(itemQuantity>=0)
    setItemTotal(parseInt(itemPrice) * parseInt(itemQuantity));
    // console.log(itemQuantity, itemPrice);
    // console.log(itemTotal);
  }, [itemPrice, itemQuantity]);

  const calculate = (e) => {
    setItemQuantity(parseInt(e.target.value), () => {});
  };

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          as={Button}
          variant="link"
          eventKey={String(props.index)}
        >
          {itemName ? itemName : "Item " + (props.index + 1)}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={String(props.index)}>
        <Card.Body>
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
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Items;
