import _axios from "axios";

export default _axios.create({
  baseURL: "https://rex-bills-default-rtdb.firebaseio.com/",
});
