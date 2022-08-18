import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// Returns form component for adding, editing, and deleting appointment
const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewerId, setInterviewerId] = useState(
    props.interviewerId || null
  );
  const [error, setError] = useState("");
  const reset = () => {
    setStudent("");
    setInterviewerId(null);
    setError("");
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // Function to validate response on save apppintment button
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewerId === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewerId);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewerId}
          currentInterviewerId={interviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
export default Form;
