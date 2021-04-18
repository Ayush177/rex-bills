import { navigate } from "@reach/router";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Axios from "../utils/Axios";

const Bills = () => {
  const [bills, setBills] = useState();
  useEffect(() => {
    Axios.get('/bills.json?orderBy="date"&limitToLast=100').then((res) => {
      console.log(Object.keys(res.data)[0]);
      setBills(res.data);
    });
  }, []);
  return (
    <>
      <h2 className="m-3 text-center">Recent Bills</h2>
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
