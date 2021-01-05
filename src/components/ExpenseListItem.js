import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeExpense } from "../actions/expenses";

export const ExpenseListItem = ({
  description,
  amount,
  note,
  createdAt,
  id,
  remove
}) => {
  const handleRemoveExpense = () => {
    remove(id);
  };
  let editLink = `/edit/${id}`;
  return (
    <div>
      <h3> {description} </h3>
      <p>
        Your {description} was worth {amount} ₺.
      </p>
      {note.length === 0 ? <p>You did not take any notes</p> : <p>Your noted {note} .</p>}
      <p> You made this expense at {new Date(createdAt).toDateString()}</p>
      <Link className="edit-todo" to={editLink}>
        Edit
      </Link>
      <button className="remove-todo" onClick={handleRemoveExpense}>
        Remove
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch(removeExpense({ id }))
  };
};

export default connect(null, mapDispatchToProps)(ExpenseListItem);
