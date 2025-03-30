import React, { useState } from "react";

const CreateAppointment = () => {
  const [formValue, setFormValue] = useState({});

  const onChangeValue = (e) => {
    console.log(e.target.value, e.target.name, "yfgbfhereiu");
    const { name, value } = e.target;
    const updateValue = { ...formValue, [name]: value };
    setFormValue(updateValue);
  };

  return (
    <div>
      <form onSubmit={() => {}}>
        <select name="timeLimit" onChange={(e) => onChangeValue(e)}>
          <option value={30}>30 min</option>
          <option value={45}>45 min</option>
          <option value={60}>1 hour</option>
        </select>
        <input name="date" type="date" onChange={(e) => onChangeValue(e)} />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(formValue);
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
