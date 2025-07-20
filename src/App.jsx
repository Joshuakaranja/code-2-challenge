import { useState } from 'react'
import AddGoalForm from "./assets/Goal"

function App() {
  const [goals, setGoals] = useState([])

  const addGoal = (newGoal) => {
    const goalWithId = { ...newGoal, id: Date.now() }
    setGoals(prevGoals => [...prevGoals, goalWithId])
  }

  return (
    <div className="App">
      <h1>Financial Goals Tracker</h1>
      <AddGoalForm addGoal={addGoal} />
      
      {/* Display existing goals */}
      <div className="goals-list">
        <h2>Your Goals</h2>
        {goals.length === 0 ? (
          <p>No goals added yet.</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="goal-item">
              <h3>{goal.name}</h3>
              <p>Target: ${goal.targetAmount}</p>
              <p>Category: {goal.category}</p>
              <p>Deadline: {goal.deadline}</p>
              <p>Progress: ${goal.savedAmount} / ${goal.targetAmount}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
