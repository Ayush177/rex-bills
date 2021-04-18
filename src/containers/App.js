import { Router } from "@reach/router";
import EditBill from "../pages/EditBill";
import BillDetail from "../pages/BillDetail";
import Bills from "../pages/Bills";
import TheNavbar from "../components/TheNavbar/TheNavbar";

const App = () => {
  return (
    <>
      <TheNavbar />
      <Router>
        <EditBill path="/bill" />
        <EditBill path="/bill/:id" />
        <BillDetail path="/bill-detail/:id" />
        <Bills path="/bills" />
      </Router>
    </>
  );
};
export default App;
