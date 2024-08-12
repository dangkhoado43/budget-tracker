const ViewExpenseDetail = (props) => {
    const formatDate = (date) => {
        const d = new Date(date);
        let day = "" + d.getDate();
        let month = "" + (d.getMonth() + 1);
        const year = d.getFullYear();

        if (day.length < 2) day = "0" + day;
        if (month.length < 2) month = "0" + month;

        return `${year}-${month}-${day}`;
    };

    const formattedDate = props.date ? formatDate(props.date) : "";

    return (
        <>
            <div
                className="modal fade"
                id="view-expense-detail"
                tabindex="-1"
                aria-labelledby="view-expense-detail-modal"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4
                                className="modal-title"
                                id="view-expense-detail-modal"
                            >
                                Expense Details
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm row">
                                    <div className="mb-4">
                                        <p className="mb-2">Name:</p>
                                        <span className="fw-bold">
                                            {props.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <p className="mb-2">Cost:</p>
                                        <span className="fw-bold">
                                            {props.cost}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        <p className="mb-2">Date:</p>
                                        <p className="fw-bold">
                                            {formattedDate}
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="mb-2">Description:</p>
                                        <p className="fw-bold">
                                            {props.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewExpenseDetail;
