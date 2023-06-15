import { useState } from "react";

const FrappeGanttControls = ({ onModeChanged, defaultMode, ViewMode }) => {
  const [mode, setMode] = useState(defaultMode);

  function onModeUpdated(e) {
    setMode(e.target.value);
    onModeChanged(e.target.value);
  }

  return (
    <form
      style={{
        border: "3px solid gray",
        padding: "10px",
        marginRight: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <label>MODE:</label>
      <select onChange={onModeUpdated} defaultValue={mode} type="select">
        {Object.keys(ViewMode).map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default FrappeGanttControls;
