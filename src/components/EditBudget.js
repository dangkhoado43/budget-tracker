import { useState } from "react";

const EditBudget = (props) => {
    const [currentBudget, setCurrentBudget] = useState(props.budget);

    return (
        <>
            <input
                required="required"
                type="number"
                className="form-control me-3"
                name="budget"
                onChange={(e) => setCurrentBudget(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-success me-2"
                onClick={() => props.handleSaveClicked(currentBudget)}
            >
                Save
            </button>
            <button
                type="button"
                className="btn btn-danger"
                onClick={props.handleCancelClicked}
            >
                Cancel
            </button>
        </>
    );
};

export default EditBudget;
