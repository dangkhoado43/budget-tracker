import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case "DELETE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        case "UPDATE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.map((expense) =>
                    expense.id === action.payload.id ? action.payload : expense
                ),
            };
        case "UPDATE_BUDGET":
            return {
                ...state,
                budget: action.payload,
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: [
        {
            id: uuidv4(),
            name: "Shopping",
            description: "Groceries",
            date: new Date(1900, 2, 1),
            cost: 50,
        },
        {
            id: uuidv4(),
            name: "Holiday",
            description: null,
            date: new Date(1900, 2, 1),
            cost: 300,
        },
        {
            id: uuidv4(),
            name: "Transportation",
            description: null,
            date: new Date(1900, 2, 1),
            cost: 120,
        },
        {
            id: uuidv4(),
            name: "Child care",
            description: null,
            date: new Date(1900, 4, 3),
            cost: 500,
        },
        {
            id: uuidv4(),
            name: "Fuel",
            description: null,
            date: new Date(1900, 4, 3),
            cost: 40,
        },
    ],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider
            value={{ budget: state.budget, expenses: state.expenses, dispatch }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
