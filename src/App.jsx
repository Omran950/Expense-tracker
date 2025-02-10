import { ToastContainer } from "react-toastify";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { useState } from "react";

export default function App() {
  const [formModal, setFormModal] = useState(false);

  return (
    <Provider store={store}>
      <ToastContainer />
      <ExpenseList closeModal={setFormModal} />
      {formModal && <ExpenseForm closeModal={setFormModal} />}
    </Provider>
  );
}
