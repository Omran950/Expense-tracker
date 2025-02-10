import { FaTrash } from "react-icons/fa";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { IoCreateOutline, IoFilter } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  filterByCategory,
  searchByName,
  sortExpenses,
} from "../Redux/expense";

export default function ExpenseTable({ closeModal }) {
  const dispatch = useDispatch();

  //get required data from the redux store
  const { data, sortField, sortDirection, filterData } = useSelector(
    (store) => store.expense,
  );

  //count the total expense amount
  const totalExpense = filterData.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  //get categories from the main data array
  const categories = ["all", ...new Set(data.map((item) => item.category))];

  //handle sort icons change for the table head (asc and desc)
  const getSortIcon = (field) => {
    if (sortField !== field)
      return <FaSort className="me-0.5 mb-1 inline-block" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="me-0.5 mb-1 inline-block" />
    ) : (
      <FaSortDown className="me-0.5 mb-1 inline-block" />
    );
  };

  return (
    <div className="mx-auto mt-8 mb-12 w-11/12 text-amber-500 md:w-4/5 lg:w-2/3">
      <h1 className="animate-pulse text-center text-4xl font-bold lg:text-6xl">
        Expense Tracker
      </h1>
      <div className="mt-10 mb-3 flex flex-col justify-between gap-x-3 gap-y-2 sm:flex-row sm:items-center">
        <p className="rounded-xl bg-amber-500 px-2 py-3 text-center text-white md:text-sm lg:w-3/12">
          {totalExpense == 0 ? (
            "No expenses"
          ) : (
            <>
              Total Expense:
              <span className="mx-1 font-bold">{totalExpense}</span>$
            </>
          )}
        </p>

        <div className="flex grow flex-row-reverse items-center gap-x-4 sm:flex-row">
          <input
            id="search"
            type="text"
            placeholder="Search by name"
            className="w-3 grow rounded-md border p-2 text-gray-700 focus:border-amber-400 focus:ring-amber-400"
            onChange={(e) => {
              dispatch(searchByName(e.target.value));
            }}
          />
          <div className="vibration flex items-center gap-x-1 rounded-xl bg-amber-500 p-2 text-white hover:bg-amber-600">
            <IoFilter size={24} className="animate-vibration-2" />
            <select
              disabled={data.length <= 0}
              onChange={(e) => {
                dispatch(filterByCategory(e.target.value));
                sessionStorage.setItem("filter", e.target.value);
              }}
              className="cursor-pointer border-none bg-transparent outline-none"
            >
              {categories.map((category) => (
                <option
                  className="text-xs text-amber-500 md:text-sm"
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => closeModal(true)}
            className="vibration flex cursor-pointer items-center gap-x-1 rounded-xl bg-amber-500 p-2 text-sm text-white hover:bg-amber-600"
          >
            <IoCreateOutline size={24} className="animate-vibration-2" />
            Add
          </button>
        </div>
      </div>
      <div className="no-scrollbar overflow-x-auto rounded-xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="to-amber-40000 bg-amber-500 bg-gradient-to-r from-amber-600 text-white">
            <tr>
              <th className="table-head">
                <AiOutlineFieldNumber size={24} />
              </th>
              <th
                className="table-head"
                onClick={() => {
                  dispatch(sortExpenses("name"));
                  dispatch(filterByCategory(sessionStorage.getItem("filter")));
                }}
              >
                <FiUser
                  size={15}
                  className="me-0.5 mb-1 hidden sm:inline-block"
                />
                <span> Name {getSortIcon("name")}</span>
              </th>
              <th
                className="table-head"
                onClick={() => {
                  dispatch(sortExpenses("category"));
                  dispatch(filterByCategory(sessionStorage.getItem("filter")));
                }}
              >
                <BiCategory
                  size={15}
                  className="me-0.5 mb-1 hidden sm:inline-block"
                />
                <span> Category {getSortIcon("category")}</span>
              </th>
              <th
                className="table-head"
                onClick={() => {
                  dispatch(sortExpenses("amount"));
                  dispatch(filterByCategory(sessionStorage.getItem("filter")));
                }}
              >
                <TbMoneybag
                  size={15}
                  className="me-0.5 mb-1 hidden sm:inline-block"
                />
                Amount {getSortIcon("amount")}
              </th>
              <th className="table-head">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filterData.length > 0 ? (
              filterData.map((item, index) => (
                <tr key={index} className="hover:bg-amber-50">
                  <td className="px-0.5 py-3 text-sm text-gray-700 sm:px-1.5 md:px-6">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.category}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-700">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="vibration cursor-pointer rounded-md bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
                      onClick={() => {
                        dispatch(deleteExpense(item.id));
                        dispatch(
                          filterByCategory(sessionStorage.getItem("filter")),
                        );
                      }}
                    >
                      <FaTrash className="animate-vibration-2" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="h-32 px-6 py-3 text-center text-gray-500"
                >
                  No expenses to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
