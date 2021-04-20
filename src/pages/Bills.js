import { navigate } from "@reach/router";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import Axios from "../utils/Axios";
import Analytics from "../components/Analytics";

const Bills = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  const [bills, setBills] = useState();
  const [date, setDate] = useState(today);

  useEffect(() => {
    Axios.get(`/bills.json?orderBy="date"&equalTo="${date}"`).then((res) => {
      setBills(res.data);
    });
  }, [date]);

  return (
    <>
      <Analytics />
      <h2 className="m-3 text-center">Recent Bills</h2>
      <div className="m-3 text-center">
        <Form.Group controlId="formBasicDate">
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
      </div>
      {bills
        ? Object.values(bills).map((bill, i) => (
            <Card
              className="m-3"
              onClick={() => navigate(`/bill-detail/${Object.keys(bills)[i]}`)}
            >
              <Card.Body>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>{bill.userName}</h5>
                  <p>{bill.date}</p>
                </div>
                <div>
                  <p>
                    <strong>Items: </strong>
                    {bill.items.map((item) => item.name + ", ")}
                  </p>
                  {bill.isDelhi ? (
                    <strong style={{ color: "red" }}>Delhi Bill</strong>
                  ) : (
                    ""
                  )}
                </div>
              </Card.Body>
            </Card>
          ))
        : ""}
    </>
  );
};

export default Bills;
