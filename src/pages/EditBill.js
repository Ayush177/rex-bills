import React, { useState } from "react";
import BillForm from "../UI/BillForm";
import BillTable from "../components/BillTable";

const Bill = () => {
  const [items, setItems] = useState([]);

  return (
    <div className="m-3">
      <BillForm setItems={setItems} items={items} />
      {items.length ? <BillTable items={items} /> : ""}
    </div>
  );
};
export default Bill;
