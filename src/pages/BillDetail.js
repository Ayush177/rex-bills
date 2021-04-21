import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import BillTable from "../components/BillTable";
import { Card, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import { navigate } from "@reach/router";

const BillDetail = (props) => {
  const [detail, setDetail] = useState();
  useEffect(() => {
    Axios.get(`/bills/${props.id}.json`).then((res) => {
      setDetail(res.data);
    });
    console.log(detail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert this js code to more react looking code by using ref and React.createElement
  const printDocument = (e) => {
    const canvas = document.getElementById("bill-sanpshot");
    html2canvas(canvas, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((res) => {
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
          <h2 className="text-center">Estimate</h2>
          {detail ? (
            <div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="px-2 mt-3 mb-2"
              >
                <h6>
                  <strong>Name:</strong> {detail.userName}
                </h6>
                <h6>{detail.date.split("-").reverse().join("-")}</h6>
              </div>
              <BillTable
                items={detail.items}
                lastBalance={parseFloat(detail.lastBalance)}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <Button onClick={printDocument} className="my-3">
          Print
        </Button>
        <Button
          onClick={() => navigate(`/bill/${props.id}`)}
          variant="secondary"
        >
          Edit
        </Button>
      </Card>
    </div>
  );
};

export default BillDetail;
