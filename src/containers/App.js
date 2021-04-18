import { Router } from "@reach/router";
import EditBill from "../pages/EditBill";
import BillDetail from "../pages/BillDetail";
import Bills from "../pages/Bills";

const App = () => {
  return (
    <Router>
      <EditBill path="/bill" />
      <EditBill path="/bill/:id" />
      <BillDetail path="/bill-detail/:id" />
      <Bills path="/bills" />
    </Router>
  );
};
export default App;
