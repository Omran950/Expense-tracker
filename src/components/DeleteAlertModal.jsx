import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteExpense, filterByCategory } from "../Redux/expense";
import { useDispatch } from "react-redux";
import { TbCancel } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";

export default function DeleteAlertModal({ closeModal, id }) {
  const dispatch = useDispatch();
  return (
    <div
      className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => closeModal(false)}
    >
      <div
        className="mx-auto w-4/5 rounded-xl bg-white p-8 shadow-2xl sm:w-3/5 lg:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between text-2xl font-bold text-gray-700">
          <h2>Delete Expense</h2>

          <AiOutlineCloseCircle
            className="cursor-pointer hover:animate-pulse"
            onClick={() => closeModal(false)}
          />
        </div>
        <p className="my-8 text-sm font-semibold">
          Are you sure you want to delete this expense?
        </p>
        <button
          className="vibration me-2 cursor-pointer rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
          onClick={() => {
            dispatch(deleteExpense(id));
            dispatch(filterByCategory(sessionStorage.getItem("filter")));
            closeModal(false);
          }}
        >
          <MdDeleteSweep
            className="animate-vibration-2 me-2 inline-block"
            size={24}
          />
          Delete
        </button>
        <button
          className="vibration cursor-pointer rounded-lg bg-gray-500 p-2 text-white hover:bg-gray-600"
          onClick={() => closeModal(false)}
        >
          <TbCancel
            className="animate-vibration-2 me-2 inline-block"
            size={24}
          />
          Cancel
        </button>
      </div>
    </div>
  );
}
