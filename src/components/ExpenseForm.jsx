import { useFormik } from "formik";
import * as Yup from "yup";
import { addExpense, filterByCategory } from "../Redux/expense";
import { useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({ closeModal }) {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    amount: "",
    category: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .matches(/[A-Za-z]/, "Name must contain at least one letter"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be greater than zero")
      .typeError("Please enter a valid number"),
    category: Yup.string()
      .required("Category is required")
      .min(3, "Category must be at least 3 characters long"),
  });

  function onSubmit(values, { resetForm }) {
    const expense = { id: uuidv4(), ...values };
    dispatch(addExpense(expense));
    dispatch(filterByCategory(sessionStorage.getItem("filter") || "all"));
    resetForm();
    closeModal();
  }

  const expenseFormik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div
      className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => closeModal()}
    >
      <div
        className="mx-auto w-4/5 rounded-xl bg-white p-8 shadow-2xl sm:w-3/5 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between text-2xl font-bold text-gray-700">
          <h2>Add Expense</h2>

          <AiOutlineCloseCircle
            className="cursor-pointer hover:animate-pulse"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={expenseFormik.handleSubmit}>
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-x-1.5">
              <FiUser size={18} />

              <label className="text-sm font-medium text-gray-600">Name</label>
            </div>

            <input
              id="name"
              type="text"
              placeholder="Enter expense name"
              className={`w-full rounded-md border p-3 text-gray-700 focus:border-amber-400 focus:ring-amber-400 ${
                expenseFormik.touched.name && expenseFormik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...expenseFormik.getFieldProps("name")}
            />
            {expenseFormik.touched.name && expenseFormik.errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {expenseFormik.errors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center gap-x-1.5">
              <TbMoneybag size={18} />
              <label className="block text-sm font-medium text-gray-600">
                Amount
              </label>
            </div>

            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className={`w-full rounded-md border p-3 ${
                expenseFormik.touched.amount && expenseFormik.errors.amount
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...expenseFormik.getFieldProps("amount")}
            />
            {expenseFormik.touched.amount && expenseFormik.errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {expenseFormik.errors.amount}
              </p>
            )}
          </div>
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-x-1.5">
              <BiCategory size={18} />
              <label className="block text-sm font-medium text-gray-600">
                Category
              </label>
            </div>
            <input
              id="category"
              placeholder="Enter category"
              className={`w-full rounded-md border p-3 ${
                expenseFormik.touched.category && expenseFormik.errors.category
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              {...expenseFormik.getFieldProps("category")}
            />
            {expenseFormik.touched.category &&
              expenseFormik.errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {expenseFormik.errors.category}
                </p>
              )}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
