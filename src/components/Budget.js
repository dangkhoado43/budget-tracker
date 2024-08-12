import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import EditBudget from "./EditBudget";
import ViewBudget from "./ViewBudget";

const Budget = () => {
    const { budget, dispatch } = useContext(AppContext);

    const [isUpdating, setIsUpdating] = useState(false); // set isUpdating is false when user is viewing and true when user is updating

    const handleUpdateClicked = () => {
        setIsUpdating(true); // set isUpdating is true when user want to update
    };

    const handleCancelClicked = () => {
        setIsUpdating(false); // set isUpdating is false when user cancels editing changes
    };

    const handleSaveClicked = (newBudget) => {
        dispatch({
            type: "UPDATE_BUDGET",
            payload: newBudget,
        });

        setIsUpdating(false); // set isUpdating is false when user saves changes
    };

    return (
        <div className="alert alert-secondary d-flex justify-content-between align-items-center">
            {isUpdating ? (
                <EditBudget
                    handleSaveClicked={handleSaveClicked}
                    handleCancelClicked={handleCancelClicked}
                    budget={budget}
                />
            ) : (
                <ViewBudget
                    handleUpdateClicked={handleUpdateClicked}
                    budget={budget}
                />
            )}
        </div>
    );
};

export default Budget;
