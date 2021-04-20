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
  const [isLastBalance, setIsLastBalance] = useState(false);
  const [lastBalance, setLastBalance] = useState(0);

  useEffect(() => {
    if (props.items.length <= 0) setSubmitDisable(true);
    else setSubmitDisable(false);
  }, [props.items]);

  useEffect(() => {
    props.setLastBalance(lastBalance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastBalance]);

  useEffect(() => {
    if (props.id)
      Axios.get(`/bills/${props.id}.json`).then((res) => {
        setUserName(res.data.userName);
        setDate(res.data.date);
        setIsDelhi(res.data.isDelhi);
        props.setItems(res.data.items);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disableSubmitAll = () => {
    if (
      submitDisable ||
      props.items.length <= 0 ||
      userName === "" ||
      date === ""
    )
      return true;
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
        isLastBalance,
        lastBalance,
      })
        .then((res) => {
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
          <div className="text-center">
            <Button
              onClick={() =>
                props.setItems([
                  ...props.items,
                  { name: "", price: 0, quantity: 0, total: 0 },
                ])
              }
              className="my-4"
              variant="secondary"
            >
              Add item
            </Button>
          </div>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Last Balance"
              checked={isLastBalance}
              onChange={() => setIsLastBalance(!isLastBalance)}
            />
          </Form.Group>
          {isLastBalance ? (
            <Form.Control
              type="text"
              className="my-3"
              placeholder="Enter item name"
              value={lastBalance}
              onChange={(e) => setLastBalance(e.target.value)}
            />
          ) : (
            ""
          )}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Delhi Bill"
              checked={isDelhi}
              onChange={() => setIsDelhi(!isDelhi)}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              type="submit"
              onClick={submitAllItems}
              disabled={disableSubmitAll()}
              variant="success"
            >
              Calculate Bill
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BillForm;
