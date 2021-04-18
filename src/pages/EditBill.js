import React, { useState } from "react";
import BillForm from "../UI/BillForm";
import BillTable from "../components/BillTable";

const Bill = (props) => {
  const [items, setItems] = useState([]);
  return (
    <div className="m-3">
      <BillForm setItems={setItems} items={items} id={props.id} />
      {items.length ? <BillTable items={items} /> : ""}
    </div>
  );
};
export default Bill;
