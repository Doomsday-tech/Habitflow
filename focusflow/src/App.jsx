import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");

    return savedHabits
      ? JSON.parse(savedHabits)
      : [
          { text: "Drink Water", completed: false },
          { text: "Study 2 Hours", completed: false },
          { text: "Exercise", completed: false },
        ];
  });

  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;

    setHabits([
      ...habits,
      {
        text: newHabit,
        completed: false,
      },
    ]);

    setNewHabit("");
  };

  const toggleHabit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index
        ? { ...habit, completed: !habit.completed }
        : habit
    );

    setHabits(updatedHabits);
  };

  return (
    <div className="app">
      <header>
        <h1>🔥 HabitFlow</h1>
        <p>Build consistency one day at a time</p>
      </header>

      <div className="stats">
        <div className="stat-card">
          <h3>{habits.length}</h3>
          <p>Total Habits</p>
        </div>

        <div className="stat-card">
          <h3>{habits.filter((habit) => habit.completed).length}</h3>
          <p>Completed</p>
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />

        <button onClick={addHabit}>Add</button>
      </div>

      <div className="habit-list">
        {habits.map((habit, index) => (
          <div
            key={index}
            className={`habit-card ${
              habit.completed ? "completed" : ""
            }`}
          >
            <span>{habit.text}</span>

            <button
              className="complete-btn"
              onClick={() => toggleHabit(index)}
            >
              {habit.completed ? "Undo" : "Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;