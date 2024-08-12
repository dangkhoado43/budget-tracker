import Swal from "sweetalert2";
import { useState, useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const AddExpenseForm = (props) => {
    const { dispatch } = useContext(AppContext);
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [title, setTitle] = useState("Add Expense");
    const [popupTitle, setPopupTitle] = useState("add new");
    const [confirmTitle, setConfirmTitle] = useState("Created successfully");
    const modalRef = useRef(null);
    /* 
        Create a reference to the modal element with initial state is null 
        when component hasn't yet been mounted or created
    */

    useEffect(() => {
        if (props.date) {
            setDate(formatDate(props.date));
            // Format the date when the component mounts or props change
        }
    }, [props.date]);

    const formatDate = (date) => {
        const d = new Date(date);
        let day = "" + d.getDate();
        let month = "" + (d.getMonth() + 1);
        /* 
            Because value of month when getMonth returns 0 to 11. 
            Therefore, we need to add 1 to values from 1 to 12
        */
        const year = d.getFullYear();

        if (day.length < 2) day = "0" + day;
        if (month.length < 2) month = "0" + month;

        return `${year}-${month}-${day}`;
        // return [year, month, day].join('-');
    };

    useEffect(() => {
        if (props.id) {
            setTitle("Update Expense");
            setName(props.name || "");
            setCost(props.cost || "");
            setDate(props.date ? formatDate(props.date) : "");
            setDescription(props.description || "");
            setPopupTitle("update");
            setConfirmTitle("Updated successfully");
        } else {
            resetForm();
        }
    }, [props.id, props.name, props.cost, props.date, props.description]);

    const resetForm = () => {
        setTitle("Add Expense");
        setName("");
        setCost("");
        setDate("");
        setDescription("");
        setPopupTitle("add new");
        setConfirmTitle("Created successfully");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const expense = {
            id: props.id || uuidv4(),
            name,
            cost: parseFloat(cost),
            date,
            description,
        };

        Swal.fire({
            title: `Are you sure to ${popupTitle}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                if (props.id) {
                    dispatch({ type: "UPDATE_EXPENSE", payload: expense });
                } else {
                    dispatch({ type: "ADD_EXPENSE", payload: expense });
                }

                Swal.fire({
                    title: `${confirmTitle}!`,
                    icon: "success",
                }).then(() => {
                    // Use Bootstrap's JavaScript API to hide the modal or control Bootstrap components
                    const modalElement = modalRef.current;
                    const bootstrapModal =
                        bootstrap.Modal.getInstance(modalElement);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                    resetForm();
                });
            }
        });
    };

    return (
        <div
            className="modal fade"
            id="update-expense-modal"
            tabIndex="-1"
            aria-labelledby="modal-label"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-label">
                                {title}
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
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="Name..."
                                            name="name"
                                            required
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label
                                            htmlFor="cost"
                                            className="form-label"
                                        >
                                            Cost
                                        </label>
                                        <input
                                            type="text"
                                            id="cost"
                                            className="form-control"
                                            placeholder="Cost..."
                                            name="cost"
                                            required="required"
                                            value={cost}
                                            onChange={(e) =>
                                                setCost(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12 col-sm-12 mb-3">
                                        <label
                                            htmlFor="date"
                                            className="form-label"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            className="form-control"
                                            placeholder="Date..."
                                            name="date"
                                            required="required"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            name="description"
                                            placeholder="Description..."
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseForm;
