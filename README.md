# 📊 Expense Tracker  

A simple and efficient expense tracking application built with React 19 and Vite. This app allows users to manage and track expenses seamlessly by adding, sorting, filtering, and searching data while dynamically updating the total expense amount.  

---

## 🚀 Project Overview  

The Expense Tracker provides a user-friendly interface for:  
- Adding expense records through a form in a modal.  
- Sorting expenses by name, amount, and category.  
- Filtering expenses by category.  
- Searching for expenses by name.  
- Deleting individual expense entries.  
- Dynamically calculating the total expense amount based on the current data view.  

---

## 🛠 Tech Stack  

- **Frontend:** React 19, Vite, Tailwind CSS V.4  
- **State Management:** Redux Toolkit  
- **Form Handling & Validation:** Formik, Yup  
- **Utilities:** UUID, React Icons, React Toastify  

---


📚 Features
➕ Add Expense
Enter expense details (name, amount, category) through a modal form.
Pushes data objects to an array stored in local storage.
📋 Table Display
Displays all expense entries from the data array.
🔍 Search & Filter
Search: Quickly find expenses by name.
Filter: View expenses by category.
🔄 Sorting
Sort expenses by name, amount, or category.
🗑 Delete Expense
Remove individual expense records from the list.
💰 Dynamic Total Expense
The total expense amount is dynamically calculated based on the current search or filter results.

🔧 Project Structure
src
├── components
│   ├── ExpenseForm.jsx
│   └── ExpenseList.jsx
├── Redux
│   └── store.js
│   └── expense.js
├── App.jsx
└── index.css


## 📋 Installation Instructions  

1. **Clone the Repository:**  
```bash
git clone https://github.com/Omran950/Expense-tracker
cd expense-tracker
npm install
npm run dev
Open the app at http://localhost:3000.
