import { useEffect, useState } from "react";

const emptyTask = {
  id: "",
  name: "",
  start: "",
  end: "",
  progress: 0,
  dependencies: "",
};

const TaskForm = ({ onTaskSubmitted, selectedTask, tasks }) => {
  const [tempTask, setTempTask] = useState(() => {
    return { ...selectedTask } || emptyTask;
  });

  useEffect(() => {
    if (selectedTask) {
      setTempTask(selectedTask);
    }
    console.log("selected task updated");
  }, [selectedTask]);

  function onTaskUpdated(name, value) {
    setTempTask({
      ...tempTask,
      [name]: value,
    });
  }

  function handleClearForm() {
    setTempTask(emptyTask);
  }

  return (
    <form
      style={{
        border: "3px solid gray",
        padding: "10px",

        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div className="flex">
          <label htmlFor="id">ID:</label>
          <input
            value={tempTask.id}
            onChange={(e) => onTaskUpdated("id", e.target.value)}
            type="text"
            name="id"
          />
        </div>
        <div className="flex">
          <label htmlFor="name">Name:</label>
          <input
            value={tempTask.name}
            onChange={(e) => onTaskUpdated("name", e.target.value)}
            type="text"
            name="name"
          />
        </div>
      </div>
      <div>
        <div className="flex">
          <label htmlFor="start">Start:</label>
          <input
            value={tempTask.start}
            onChange={(e) => onTaskUpdated("start", e.target.value)}
            type="date"
            name="start"
          />
        </div>
        <div className="flex">
          <label htmlFor="end">End:</label>
          <input
            value={tempTask.end}
            onChange={(e) => onTaskUpdated("end", e.target.value)}
            type="date"
            name="end"
          />
        </div>
      </div>
      <div>
        <label htmlFor="progress">Progress:</label>
        <input
          value={tempTask.progress}
          onChange={(e) => onTaskUpdated("progress", Number(e.target.value))}
          type="number"
          name="progress"
        />
      </div>
      <div>
        <label htmlFor="dependencies">Dependencies:</label>
        <select
          value={tempTask.dependencies}
          onChange={(e) => {
            onTaskUpdated(
              "dependencies",
              Array.from(e.target.selectedOptions).map((o) => o.value)
            );
          }}
          multiple
          name="dependencies"
        >
          {tasks
            .filter((t) => t.id !== tempTask.id)
            .map((t) => {
              return (
                <option key={t.id} value={t.id}>
                  {t.id}
                </option>
              );
            })}
        </select>
      </div>
      <button onClick={() => handleClearForm()} type="button">
        Clear Form
      </button>
      <button
        onClick={() => {
          handleClearForm();
          onTaskSubmitted(tempTask);
        }}
        type="button"
      >
        {selectedTask ? "Update" : "Create"} Task
      </button>
      <button
        onClick={() =>
          onTaskSubmitted({
            id: "Task RANDOM",
            name: "RANDOM TASK",
            start: "2023-06-13",
            end: "2023-06-31",
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
