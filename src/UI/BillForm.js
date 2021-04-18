import React, { useState, useEffect } from "react";
import { Form, Card, Button, Accordion } from "react-bootstrap";
import ItemForm from "../components/ItemForm";
import Axios from "../utils/Axios";
import { navigate } from "@reach/router";

const BillForm = (props) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [itemCount, setItemCount] = useState(1);
  // const [itemName, setItemName] = useState("");
  // const [itemPrice, setItemPrice] = useState(0);
  // const [itemQuantity, setItemQuantity] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  const [submitDisable, setSubmitDisable] = useState(true);
  // const [billTotal, setBillTotal] = useState("");

  // const calculate = (e) => {
  //   setItemQuantity(parseInt(e.target.value), () => {});
  // };

  useEffect(() => {
    if (props.items.length <= 0) setSubmitDisable(true);
    else setSubmitDisable(false);
  }, [props.items]);

  const disableSubmitAll = () => {
    if (props.items.length <= 0 || userName === "" || date === "") return true;
    return false;
  };

  const submitAllItems = (e) => {
    e.preventDefault();
    setSubmitDisable(true);
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330; // IST offset UTC +5:30
    const ISTTime = new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );

    Axios.post("/bills.json", {
      userName,
      date,
      items: props.items,
    })
      .then((res) => {
        console.log(res);
        setSubmitDisable(false);
        navigate(`bill-detail/${res.data.name}`);
      })
      .catch((err) => {
        console.error(err);
        setSubmitDisable(false);
      });
  };

  return (
    <Card className="mb-3">
      <Card.Title className="text-center mt-3">Bill Details</Card.Title>
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              <ItemForm
                index={i}
                setItems={props.setItems}
                items={props.items}
              />
            ))}
          </Accordion>
          <div>
            <Button onClick={() => setItemCount(itemCount + 1)}>
              Add item
            </Button>
          </div>
          <p>{itemTotal}</p>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={submitAllItems}
            disabled={disableSubmitAll()}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BillForm;
