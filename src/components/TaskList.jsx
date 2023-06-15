import moment from "moment";

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <table style={{ width: "100%" }}>
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
        {tasks.map((t) => (
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
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
