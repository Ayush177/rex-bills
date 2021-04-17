import { Router, Link } from "@reach/router";
import EditBill from "../pages/EditBill";

const App = () => {
  return (
    <Router>
      <EditBill path="/" />
    </Router>
  );
};
export default App;
