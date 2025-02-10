import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { applyFilters, sortItems } from "../utils/expenseHelpers";

const expense = createSlice({
  name: "expense",
  initialState: {
    data: localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [],
    filterData: localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [],
    sortField: null,
    sortDirection: "asc",
    currentCategory: sessionStorage.getItem("filter")
      ? sessionStorage.getItem("filter")
      : "all",
    searchTerm: "",
  },
  reducers: {
    addExpense: (state, action) => {
      state.data.push(action.payload);
      state.filterData = applyFilters(
        state.data,
        state.currentCategory,
        state.searchTerm,
      );
      localStorage.setItem("expenses", JSON.stringify(state.data));
      toast.success("Expense added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    },
    deleteExpense: (state, action) => {
      state.data = state.data.filter((item) => item.id != action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.data));
      state.filterData = applyFilters(
        state.data,
        state.currentCategory,
        state.searchTerm,
      );
      toast.success("Expense removed successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    },
    filterByCategory: (state, action) => {
      state.currentCategory = action.payload;
      state.filterData = applyFilters(
        state.data,
        action.payload,
        state.searchTerm,
      );
      if (state.sortField) {
        state.filterData = sortItems(
          state.filterData,
          state.sortField,
          state.sortDirection,
        );
      }
    },
    searchByName: (state, action) => {
      state.searchTerm = action.payload;
      state.filterData = applyFilters(
        state.data,
        state.currentCategory,
        action.payload,
      );
      if (state.sortField) {
        state.filterData = sortItems(
          state.filterData,
          state.sortField,
          state.sortDirection,
        );
      }
    },
    sortExpenses: (state, action) => {
      if (state.sortField === action.payload) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortField = action.payload;
        state.sortDirection = "asc";
      }
      state.filterData = sortItems(
        state.filterData,
        action.payload,
        state.sortDirection,
      );
    },
  },
});

export default expense.reducer;
export const {
  addExpense,
  deleteExpense,
  sortExpenses,
  filterByCategory,
  searchByName,
} = expense.actions;
