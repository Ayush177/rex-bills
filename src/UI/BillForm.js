import React, { useState, useEffect } from "react";
import { Form, Card, Button, Accordion } from "react-bootstrap";
import ItemForm from "../components/ItemForm";
import Axios from "../utils/Axios";
import { navigate } from "@reach/router";

const BillForm = (props) => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState(today);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [isDelhi, setIsDelhi] = useState(false);

  useEffect(() => {
    if (props.items.length <= 0) setSubmitDisable(true);
    else setSubmitDisable(false);
  }, [props.items]);

  useEffect(() => {
    console.log(date);
    if (props.id)
      Axios.get(`/bills/${props.id}.json`).then((res) => {
        console.log("res data", res.data);
        setUserName(res.data.userName);
        setDate(res.data.date);
        setIsDelhi(res.data.isDelhi);
        props.setItems(res.data.items);
      });
  }, []);

  const disableSubmitAll = () => {
    if (props.items.length <= 0 || userName === "" || date === "") return true;
    return false;
  };

  const submitAllItems = (e) => {
    e.preventDefault();
    setSubmitDisable(true);

    if (!props.id) {
      Axios.post("/bills.json", {
        userName,
        date,
        items: props.items,
        isDelhi,
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
    } else {
      Axios.put(`/bills/${props.id}.json`, {
        userName,
        date,
        items: props.items,
        isDelhi,
      })
        .then((res) => {
          console.log(res);
          setSubmitDisable(false);
          navigate(`/bill-detail/${props.id}`);
        })
        .catch((err) => {
          console.error(err);
          setSubmitDisable(false);
        });
    }
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
            {props.items
              ? props.items.map((item, i) => (
                  <ItemForm
                    index={i}
                    setItems={props.setItems}
                    items={props.items}
                    key={i}
                    item={item}
                  />
                ))
              : ""}
          </Accordion>
          <div>
            <Button
              onClick={() =>
                props.setItems([
                  ...props.items,
                  { name: "", price: 0, quantity: 0, total: 0 },
                ])
              }
            >
              Add item
            </Button>
          </div>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Delhi Bill"
              checked={isDelhi}
              onChange={() => setIsDelhi(!isDelhi)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={submitAllItems}
            disabled={submitDisable}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BillForm;
