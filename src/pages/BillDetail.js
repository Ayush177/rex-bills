import React, { useEffect, useState, useRef } from "react";
import Axios from "../utils/Axios";
import BillTable from "../components/BillTable";
import { Card, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const BillDetail = (props) => {
  const [detail, setDetail] = useState();
  useEffect(() => {
    Axios.get(`/bills/${props.id}.json`).then((res) => {
      console.log(res.data);
      setDetail(res.data);
    });
  }, []);

  // Convert this js code to more react looking code by using ref and React.createElement
  const printDocument = (e) => {
    const canvas = document.getElementById("bill-sanpshot");
    html2canvas(canvas).then((res) => {
      console.log(res);
      const a = document.createElement("a");
      a.href = res.toDataURL();
      a.download = `${detail.userName}(${detail.date}).png`;
      a.click();
    });
  };
  return (
    <div className="m-3">
      <Card className="p-0" id="capture">
        <div id="bill-sanpshot">
          <h2>Estimate</h2>
          {detail ? (
            <div>
              <h5>{detail.userName}</h5>
              <h6>{detail.date}</h6>
              <BillTable items={detail.items} />
            </div>
          ) : (
            ""
          )}
        </div>
        <Button onClick={printDocument}>Print</Button>
      </Card>
    </div>
  );
};

export default BillDetail;
