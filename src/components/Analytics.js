import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Axios from "../utils/Axios";

const Analytics = () => {
  const [curMonthTotal, setCurMonthTotal] = useState(0);
  const [curMonthDelhiTotal, setCurMonthDelhiTotal] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [lastMonthDelhiTotal, setLastMonthDelhiTotal] = useState(0);

  const pad = (d) => {
    return d < 10 ? "0" + d.toString() : d.toString();
  };

  useEffect(() => {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth();
    let cur = 0,
      curDelhi = 0,
      last = 0,
      lastDelhi = 0;
    Axios.get(
      `/bills.json?orderBy="date"&estartAt="${curYear}-${pad(
        curMonth + 1
      )}-01"&endAt="${curYear}-${pad(curMonth + 1)}-30"`
    ).then((res) => {
      console.log(res.data);
      Object.values(res.data).forEach((entry) => {
        let grandTotal = 0;
        entry.items.forEach((item) => (grandTotal += item.total));
        if (entry.isDelhi) curDelhi += grandTotal;
        else cur += grandTotal;
      });
        console.log(cur, curDelhi);
      setCurMonthTotal(parseFloat(cur).toFixed(2));
      setCurMonthDelhiTotal(parseFloat(curDelhi).toFixed(2));
    });
    Axios.get(
      `/bills.json?orderBy="date"&estartAt="/bills.json?orderBy="date"&estartAt="${curYear}-${pad(
        curMonth
      )}-01"&endAt="${curYear}-${pad(curMonth)}-30""`
    ).then((res) => {
      console.log(res.data);
      Object.values(res.data).forEach((entry) => {
        let grandTotal = 0;
        entry.items.forEach((item) => (grandTotal += item.total));
        if (entry.isDelhi) lastDelhi += grandTotal;
        else last += grandTotal;
      });
      setLastMonthTotal(last);
      setLastMonthDelhiTotal(lastDelhi);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="text-center">
      <h3 style={{ color: "gray" }}>This month</h3>
      <div style={{ width: "50%", display: "inline-block" }}>
        <Card className="m-2" style={{ background: "lightgreen" }}>
          <h5 style={{ color: "green" }}>Non Delhi Sale</h5>
          <strong style={{ color: "#120321" }}>{curMonthTotal}</strong>
        </Card>
      </div>
      <div style={{ width: "50%", display: "inline-block" }}>
        <Card className="m-2" style={{ background: "lightgreen" }}>
          <h5 style={{ color: "red" }}>Delhi Sale</h5>
          <strong style={{ color: "#120321" }}>{curMonthDelhiTotal}</strong>
        </Card>
      </div>
      <h3 style={{ color: "gray" }}>Last month</h3>
      <div style={{ width: "50%", display: "inline-block" }}>
        <Card className="m-2" style={{ background: "lightgreen" }}>
          <h5 style={{ color: "green" }}>Non Delhi Sale</h5>
          <strong style={{ color: "#120321" }}>{lastMonthTotal}</strong>
        </Card>
      </div>
      <div style={{ width: "50%", display: "inline-block" }}>
        <Card className="m-2" style={{ background: "lightgreen" }}>
          <h5 style={{ color: "red" }}>Delhi Sale</h5>
          <strong style={{ color: "#120321" }}>{lastMonthDelhiTotal}</strong>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
