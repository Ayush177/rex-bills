import React, { useState } from "react";
import BillForm from "../UI/BillForm";
import BillTable from "../components/BillTable";

const Bill = (props) => {
  const [items, setItems] = useState([]);
  const [lastBalance, setLastBalance] = useState([]);
  return (
    <div className="m-3">
      <BillForm
        setItems={setItems}
        items={items}
        id={props.id}
        setLastBalance={setLastBalance}
      />
      {items.length ? (
        <BillTable items={items} lastBalance={parseFloat(lastBalance)} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Bill;
