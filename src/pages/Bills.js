import { navigate } from "@reach/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Axios from "../utils/Axios";

const Bills = () => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    Axios.get("/bills.json").then((res) => {
      console.log(Object.keys(res.data)[0]);
      setBills(res.data);
    });
  }, []);
  return (
    <>
      <h2 className="m-3">Recent Bills</h2>
      {bills
        ? Object.values(bills).map((bill, i) => (
            <Card
              className="m-3"
              onClick={() => navigate(`/bill-detail/${Object.keys(bills)[i]}`)}
            >
              <Card.Body>
                <p>{bill.userName}</p>
                <p>{bill.date}</p>
                <p>[{bill.items.map((item) => item.name + ", ")}]</p>
              </Card.Body>
            </Card>
          ))
        : ""}
    </>
  );
};

export default Bills;
