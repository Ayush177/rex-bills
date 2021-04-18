import { Table, Card } from "react-bootstrap";

const BillTable = (props) => {
  let grandTotal = 0;
  for (let item of props.items) {
    grandTotal += parseInt(item.total);
  }
  return (
    <Card>
      <Table striped bordered hover size="sm" className="m-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <strong>Grand Total</strong>
            </td>
            <td>
              <strong>{grandTotal}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default BillTable;
