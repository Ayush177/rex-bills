import React, { useState, useEffect } from "react";
import { Card, Accordion, Button, Form } from "react-bootstrap";

const Items = (props) => {
  const [itemName, setItemName] = useState(
    props.item.name ? props.item.name : ""
  );
  const [itemPrice, setItemPrice] = useState(
    props.item.price ? props.item.price : 0
  );
  const [itemQuantity, setItemQuantity] = useState(
    props.item.quantity ? props.item.quantity : 0
  );
  const [itemTotal, setItemTotal] = useState(
    props.item.total ? props.item.total : 0
  );

  useEffect(() => {
    setItemName(props.item.name ? props.item.name : "");
    setItemPrice(props.item.price ? props.item.price : "");
    setItemQuantity(props.item.quantity ? props.item.quantity : "");
    setItemTotal(props.item.total ? props.item.total : "");
  }, [props.items]);

  useEffect(() => {
    if (itemQuantity >= 0)
      setItemTotal(parseInt(itemPrice) * parseInt(itemQuantity));
  }, [itemPrice, itemQuantity]);

  const isDuplicate = (curItem) => {
    for (const item of props.items) {
      if (
        item.name === curItem.name &&
        item.price === curItem.price &&
        item.quantity === curItem.quantity
      )
        return true;
    }
    return false;
  };

  const submitItem = (e) => {
    e.preventDefault();
    const curItem = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
      total: itemTotal,
    };
    if (!isDuplicate(curItem)) {
      props.setItems((items) =>
        items.map((item, i) => {
          if (i === props.index) {
            return (item = curItem);
          }
          return item;
        })
      );
    }
  };

  const calculate = (e) => {
    setItemQuantity(parseInt(e.target.value), () => {});
  };

  const disableSubmit = () => {
    if (itemName === "" || itemPrice <= 0 || itemQuantity <= 0) return true;
    return false;
  };

  const deleteItem = () => {
    props.setItems((items) => items.filter((item, i) => i !== props.index));
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
          <Form>
            <Form.Group controlId="formBasicItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                isInvalid={itemName === ""}
                isValid={itemName !== ""}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicItemPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter item price"
                value={itemPrice}
                onChange={(e) => setItemPrice(parseInt(e.target.value))}
                isInvalid={itemPrice <= 0}
                isValid={itemPrice > 0}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicItemQuantity">
              <Form.Label>Item Quantity</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter item quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                isInvalid={itemQuantity <= 0}
                isValid={itemQuantity > 0}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid quantity.
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <h5>Item Total</h5>
              <p>{itemTotal}</p>
            </div>
            <Button disabled={disableSubmit()} onClick={submitItem}>
              Submit Item
            </Button>
            <Button onClick={deleteItem}>Delete Item</Button>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Items;
