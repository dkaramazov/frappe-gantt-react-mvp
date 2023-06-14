import { useState } from "react";

const TaskForm = ({ onTaskSubmitted, tasks }) => {
  const [tempTask, setTempTask] = useState({
    id: "",
    name: "",
    start: null,
    end: null,
    progress: 0,
    dependencies: "",
  });

  function onTaskUpdated(name, value) {
    setTempTask({
      ...tempTask,
      [name]: value,
    });
  }

  return (
    <form style={{ display: "flex" }}>
      <div className="input-item">
        <label htmlFor="id">ID:</label>
        <input
          onChange={(e) => onTaskUpdated("id", e.target.value)}
          type="text"
          name="id"
        />
      </div>
      <div className="input-item">
        <label htmlFor="name">Name:</label>
        <input
          onChange={(e) => onTaskUpdated("name", e.target.value)}
          type="text"
          name="name"
        />
      </div>
      <div style={{ alignContent: "flex-start" }}>
        <label htmlFor="start">Start Date:</label>
        <input
          onChange={(e) => onTaskUpdated("start", e.target.value)}
          type="date"
          name="start"
        />
        <label htmlFor="end">End Date:</label>
        <input
          onChange={(e) => onTaskUpdated("end", e.target.value)}
          type="date"
          name="end"
        />
      </div>
      <div>
        <label htmlFor="progress">Progress:</label>
        <input
          onChange={(e) => onTaskUpdated("progress", Number(e.target.value))}
          type="number"
          name="progress"
        />
      </div>
      <div>
        <label htmlFor="dependencies">Dependencies:</label>
        <select
          onChange={(e) => {
            onTaskUpdated(
              "dependencies",
              Array.from(e.target.selectedOptions).map((o) => o.value)
            );
          }}
          multiple
          name="dependencies"
        >
          {tasks.map((t) => {
            return (
              <option key={t.id} value={t.id}>
                {t.id}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={() => onTaskSubmitted(tempTask)} type="button">
        Create Task
      </button>
      <button
        onClick={() =>
          onTaskSubmitted({
            id: "Task RANDOM",
            name: "RANDOM TASK",
            start: "2023-6-13",
            end: "2023-6-31",
            progress: 67,
            dependencies: "Task 3",
          })
        }
        type="button"
      >
        Create Random Task
      </button>
    </form>
  );
};

export default TaskForm;
