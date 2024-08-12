import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaPlus } from "react-icons/fa6";
import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import { AppProvider } from "./context/AppContext";
import ViewExpenseDetail from "./components/ViewExpenseDetail";

const App = () => {
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleEditExpense = (expense) => {
        setSelectedExpense(expense); // set selected expense when user want to update expense
    };

    const handleClearSelectedExpense = () => {
        setSelectedExpense(null);
    };

    return (
        <AppProvider>
            <div className="container">
                <h1 className="mt-3">My Budget Planner</h1>
                <div className="row mt-3">
                    <div className="col-lg-4 col-sm-12">
                        <Budget />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <Remaining />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <ExpenseTotal />
                    </div>
                </div>
                <div className="mt-3 d-flex justify-content-between">
                    <h3>Expenses</h3>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#update-expense-modal"
                        onClick={handleClearSelectedExpense}
                    >
                        <FaPlus className="d-flex justify-content-center align-items-center" />
                    </button>
                </div>
                <div className="row mt-3">
                    <div className="col-sm">
                        <ExpenseList
                            onEditExpense={handleEditExpense}
                            onViewInfo={handleEditExpense}
                        />
                    </div>
                </div>

                <AddExpenseForm
                    id={selectedExpense ? selectedExpense.id : ""}
                    name={selectedExpense ? selectedExpense.name : ""}
                    cost={selectedExpense ? selectedExpense.cost : ""}
                    date={selectedExpense ? selectedExpense.date : ""}
                    description={
                        selectedExpense ? selectedExpense.description : ""
                    }
                />

                <ViewExpenseDetail
                    id={selectedExpense ? selectedExpense.id : ""}
                    name={selectedExpense ? selectedExpense.name : ""}
                    cost={selectedExpense ? selectedExpense.cost : ""}
                    date={selectedExpense ? selectedExpense.date : ""}
                    description={
                        selectedExpense ? selectedExpense.description : ""
                    }
                />
            </div>
        </AppProvider>
    );
};

export default App;
