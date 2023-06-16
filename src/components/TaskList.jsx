import moment from "moment";
import { useEffect, useState } from "react";

const TaskList = ({ tasks, onDeleteTask }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tasks);
  }, [tasks]);

  return (
    <table
      style={{
        width: "100%",
        border: "3px solid gray",
        margin: "10px 0",
        padding: "10px 0",
      }}
    >
      <thead style={{ color: "green" }}>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Start</th>
          <th>End</th>
          <th>Progress</th>
          <th>Actual Start</th>
          <th>Actual End</th>
          <th>Index</th>
        </tr>
      </thead>
      <tbody>
        {list.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.name}</td>
            <td>{t.start}</td>
            <td>{t.end}</td>
            <td>{t.progress}</td>
            <td>{new moment(t._start).format("YYYY-MM-DD")}</td>
            <td>{new moment(t._end).format("YYYY-MM-DD")}</td>
            <td>{t._index}</td>
            <td>
              <button onClick={() => onDeleteTask(t.id)} type="button">
                &#10005;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
