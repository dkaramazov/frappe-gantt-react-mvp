import { useState } from "react";
import "./App.css";
import FrappeGantt from "./components/FrappeGantt.jsx";
import FrappeGanttControls from "./components/FrappeGanttControls";
import TaskForm from "./components/TaskForm";
import moment from "moment";
import TaskList from "./components/TaskList";

const taskList = [
  {
    id: "Task 1",
    name: "Redesign website",
    start: "2023-06-28",
    end: "2023-07-05",
    progress: 10,
    dependencies: "",
  },
  {
    id: "Task 2",
    name: "Create Home Page",
    start: "2023-07-06",
    end: "2023-07-10",
    progress: 20,
    dependencies: "Task 1",
  },
  {
    id: "Task 3",
    name: "Create About Page",
    start: "2023-07-12",
    end: "2023-07-16",
    progress: 15,
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [mode, setMode] = useState(() => ViewMode.Day);

  function handleTaskSubmitted(newTask) {
    let found = tasks.find((t) => t.id === newTask.id);
    if (found) {
      found = {
        ...found,
        ...newTask,
      };
      // setTasks([...tasks]);
      const other = tasks.filter((t) => t.id !== found.id);
      setTasks([...other, found].sort((a, b) => a._index - b._index));
    } else {
      setTasks([...tasks, newTask]);
    }
  }

  function handleModeChanged(updatedMode) {
    setMode(updatedMode);
  }

  function handleTaskClicked(task) {
    console.log("task clicked", task);
    setSelectedTask(task);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleUpdateDate(updatedTask, start, end) {
    const task = tasks.find((t) => updatedTask.id === t.id);
    task.start = new moment(start).format("YYYY-MM-DD");
    task.end = new moment(end).format("YYYY-MM-DD");
    setTasks([...tasks]);
  }

  function handleUpdateProgress(updatedTask, progress) {
    const task = tasks.find((t) => t.id === updatedTask.id);
    task.progress = progress;
    setTasks([...tasks]);
  }

  function handleUpdateTasks(updatedTasks) {
    console.log("tasks updated");
    console.table(updatedTasks);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <FrappeGanttControls
          onModeChanged={handleModeChanged}
          defaultMode={ViewMode.Day}
          ViewMode={ViewMode}
        />
        <TaskForm
          tasks={tasks}
          selectedTask={selectedTask}
          onTaskSubmitted={handleTaskSubmitted}
        />
      </div>
      <div>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
      <div>
        <FrappeGantt
          tasks={tasks}
          viewMode={ViewMode[mode]}
          onClick={handleTaskClicked}
          onDateChange={(task, start, end) =>
            handleUpdateDate(task, start, end)
          }
          onProgressChange={(task, progress) =>
            handleUpdateProgress(task, progress)
          }
          onTasksChange={(tasks) => handleUpdateTasks(tasks)}
        />
      </div>
    </>
  );
}

export default App;
