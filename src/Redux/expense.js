import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
  },
  reducers: {
    addExpense: (state, action) => {
      state.data.push(action.payload);
      state.filterData = state.data;
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
      state.filterData = state.data;
      localStorage.setItem("expenses", JSON.stringify(state.data));
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
      action.payload == "all"
        ? (state.filterData = state.data)
        : (state.filterData = state.data.filter(
            (item) => item.category == action.payload,
          ));
    },
    searchByName: (state, action) => {
      state.filterData = state.data.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    sortExpenses: (state, action) => {
      if (state.sortField === action.payload) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortField = action.payload;
        state.sortDirection = "asc";
      }
      state.data.sort((a, b) => {
        let comparison = 0;
        if (action.payload === "amount") {
          comparison = Number(a[action.payload]) - Number(b[action.payload]);
        } else {
          comparison = a[action.payload].localeCompare(b[action.payload]);
        }
        return state.sortDirection === "asc" ? comparison : -comparison;
      });
      state.filterData = state.data;
      localStorage.setItem("expenses", JSON.stringify(state.data));
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
