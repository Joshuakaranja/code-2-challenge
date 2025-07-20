import React, { useState } from "react";

function AddGoalForm({ addGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      name: name,
      targetAmount: Number(targetAmount),
      category: category,
      deadline: deadline,
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    addGoal(newGoal);

    // Clear the form
    setName("");
    setTargetAmount("");
    setCategory("");
    setDeadline("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>

      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;
