import React, { useContext, useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";

const ExpenseList = (props) => {
    const { expenses } = useContext(AppContext);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]); // Using to keep track of expenses when delete expenses, update or add new expenses

    const handleSearch = (e) => {
        const searchResults = expenses.filter((filteredExpense) => {
            return filteredExpense.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });

        setFilteredExpenses(searchResults); // update and render components to DOM
    };

    return (
        <>
            <input
                className="form-control"
                type="text"
                placeholder="Type to search..."
                onChange={handleSearch}
            />
            <ul className="list-group my-3">
                {filteredExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        date={expense.date}
                        description={expense.description}
                        cost={expense.cost}
                        onEditExpense={props.onEditExpense}
                        onViewInfo={props.onViewInfo}
                    />
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;
