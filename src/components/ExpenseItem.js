import { useContext } from "react";

import { TiDelete } from "react-icons/ti";
import { FaPenToSquare, FaCircleInfo } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const formatDate = (date) => {
        const d = new Date(date);
        let day = "" + d.getDate();
        let month = "" + (d.getMonth() + 1);
        const year = d.getFullYear();

        if (day.length < 2) day = "0" + day;
        if (month.length < 2) month = "0" + month;

        return `${year}-${month}-${day}`;
    };

    const formattedDate = props.date ? formatDate(props.date) : "No Date";

    const handleViewInfoClick = () => {
        props.onViewInfo({
            id: props.id,
            name: props.name,
            cost: props.cost,
            date: props.date,
            description: props.description,
        });
    };

    const handleEditClick = () => {
        props.onEditExpense({
            id: props.id,
            name: props.name,
            cost: props.cost,
            date: props.date,
            description: props.description,
        });
    };

    const handleDeleteExpense = () => {
        dispatch({
            type: "DELETE_EXPENSE",
            payload: props.id,
        });
    };

    return (
        <li
            key={props.id}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div
                type="button"
                className="link-dark link-opacity-75-hover"
                data-bs-toggle="modal"
                data-bs-target="#view-expense-detail"
                title={`${props.name}`}
                onClick={handleViewInfoClick}
            >
                {props.name}
            </div>
            <div>
                <span className="badge text-bg-warning me-3">
                    {formattedDate}
                </span>
                <span className="badge text-bg-primary rounded-pill me-3">
                    ${props.cost}
                </span>
                <button
                    type="button"
                    className="btn btn-light d-none d-lg-inline d-xl-inline"
                    data-bs-toggle="modal"
                    data-bs-target="#view-expense-detail"
                    onClick={handleViewInfoClick}
                >
                    <FaCircleInfo
                        size="1.2em"
                        className="text-primary d-flex justify-content-center align-items-center"
                    />
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#update-expense-modal"
                    onClick={handleEditClick}
                >
                    <FaPenToSquare
                        size="1.2em"
                        className="text-success d-flex justify-content-center align-items-center"
                    />
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleDeleteExpense}
                >
                    <TiDelete
                        size="1.5em"
                        className="text-danger d-flex justify-content-center align-items-center"
                    ></TiDelete>
                </button>
            </div>
        </li>
    );
};

export default ExpenseItem;
