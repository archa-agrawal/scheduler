import React from "react";

// Returns component for add button on empty appointment
const Empty = ({ onAdd }) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
};

export default Empty;
