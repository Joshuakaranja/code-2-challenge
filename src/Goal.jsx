import { useState, useEffect } from 'react'

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

function Goal() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = "https://json-server-books-1.onrender.com/goals"

  // Fetch goals from db.json on component mount
  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      // Add timeout to prevent long waits
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch(API_URL, { 
        signal: controller.signal 
      })
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error('Failed to fetch goals')
      }
      const data = await response.json()
      setGoals(data)
      setError(null)
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. The server might be starting up, please try again.')
      } else {
        setError('Error loading goals. Please try again later.')
      }
      console.error('Error fetching goals:', err)
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGoal)
      })
      
      if (!response.ok) {
        throw new Error('Failed to add goal')
      }
      
      const createdGoal = await response.json()
      setGoals(prevGoals => [...prevGoals, createdGoal])
      setError(null)
    } catch (err) {
      setError('Error adding goal. Please try again later.')
      console.error('Error adding goal:', err)
    }
  }

  const updateGoal = async (goalId, updatedGoal) => {
    try {
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGoal)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update goal')
      }
      
      const updated = await response.json()
      setGoals(prevGoals => 
        prevGoals.map(goal => goal.id === goalId ? updated : goal)
      )
      setError(null)
    } catch (err) {
      setError('Error updating goal. Please try again.')
      console.error('Error updating goal:', err)
    }
  }

  const deleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) {
      return
    }
    
    try {
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete goal')
      }
      
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId))
      setError(null)
    } catch (err) {
      setError('Error deleting goal. Please try again.')
      console.error('Error deleting goal:', err)
    }
  }

  const updateSavedAmount = async (goalId, newAmount) => {
    const goal = goals.find(g => g.id === goalId)
    if (goal && newAmount >= 0 && newAmount <= goal.targetAmount) {
      await updateGoal(goalId, { ...goal, savedAmount: newAmount })
    }
  }

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading goals...</div>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Financial Goals Tracker</h1>
      
      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchGoals}>Retry</button>
        </div>
      )}
      
      <AddGoalForm addGoal={addGoal} />
      
      {/* Display existing goals */}
      <div className="goals-list">
        <h2>Your Goals ({goals.length})</h2>
        {goals.length === 0 && !loading ? (
          <p>No goals found. Add your first goal above!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="goal-item">
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <button 
                  className="delete-btn"
                  onClick={() => deleteGoal(goal.id)}
                  title="Delete Goal"
                >
                  ×
                </button>
              </div>
              
              <div className="goal-details">
                <p><strong>Target:</strong> ${goal.targetAmount}</p>
                <p><strong>Category:</strong> {goal.category}</p>
                <p><strong>Deadline:</strong> {goal.deadline}</p>
                <p><strong>Created:</strong> {goal.createdAt}</p>
              </div>
              
              <div className="progress-section">
                <div className="progress-info">
                  <span>Progress: ${goal.savedAmount} / ${goal.targetAmount}</span>
                  <span>{Math.round((goal.savedAmount / goal.targetAmount) * 100)}%</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
                  ></div>
                </div>
                
                <div className="amount-controls">
                  <label>Update saved amount:</label>
                  <input 
                    type="number" 
                    min="0" 
                    max={goal.targetAmount}
                    defaultValue={goal.savedAmount}
                    onBlur={(e) => {
                      const newAmount = Number(e.target.value)
                      if (newAmount !== goal.savedAmount) {
                        updateSavedAmount(goal.id, newAmount)
                      }
                    }}
                    className="amount-input"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Goal
