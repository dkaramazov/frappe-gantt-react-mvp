import { useEffect, useState } from "react";
import "./App.css";
import FrappeGantt from "./components/FrappeGantt.jsx";
import FrappeGanttControls from "./components/FrappeGanttControls";
import TaskForm from "./components/TaskForm";

const taskList = [
  {
    id: "Task 1",
    name: "Redesign website",
    start: "2023-6-28",
    end: "2023-6-31",
    progress: 10,
    dependencies: "",
  },
  {
    id: "Task 2",
    name: "Create Home Page",
    start: "2023-6-28",
    end: "2023-6-31",
    progress: 20,
    dependencies: "Task 1",
  },
  {
    id: "Task 3",
    name: "Create About Page",
    start: "2023-6-28",
    end: "2023-6-31",
    progress: 0,
    dependencies: "Task 2, Task 1",
  },
];

const ViewMode = {
  QuarterDay: "Quarter Day",
  HalfDay: "Half Day",
  Day: "Day",
  Week: "Week",
  Month: "Month",
};

function App() {
  const [tasks, setTasks] = useState(() => taskList);
  const [mode, setMode] = useState(() => ViewMode.Day);

  function onTaskSubmitted(newTask) {
    console.log("task submitted", newTask);
    setTasks([...tasks, newTask]);
  }

  function onModeChanged(updatedMode) {
    setMode(updatedMode);
  }

  function onTaskClicked(task) {
    return task;
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <FrappeGanttControls
          onModeChanged={onModeChanged}
          defaultMode={ViewMode.Day}
          ViewMode={ViewMode}
        />
        <TaskForm
          tasks={tasks}
          onTaskSelected={onTaskClicked}
          onTaskSubmitted={onTaskSubmitted}
        />
      </div>
      <div>
        <FrappeGantt
          tasks={tasks}
          viewMode={mode}
          onClick={(task) => onTaskClicked(task)}
          onDateChange={(task, start, end) =>
            console.log("date changed", task, start, end)
          }
          onProgressChange={(task, progress) =>
            console.log("progress changed", task, progress)
          }
          onTasksChange={(tasks) => console.log("tasks changed", tasks)}
        />
      </div>
    </>
  );
}

export default App;
