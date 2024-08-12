const ViewBudget = (props) => {
    return (
        <>
            <span>Budget: ${props.budget}</span>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleUpdateClicked}
            >
                Edit
            </button>
        </>
    );
};

export default ViewBudget;
