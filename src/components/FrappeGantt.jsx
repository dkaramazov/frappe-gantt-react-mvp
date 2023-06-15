import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const FrappeGantt = ({
  tasks,
  viewMode,
  onTasksChange,
  onClick,
  onDateChange,
  onProgressChange,
  onViewChange,
}) => {
  const _target = useRef();
  const _svg = useRef();
  const _gantt = useRef();

  useEffect(() => {
    if (_gantt.current) {
      _gantt.current.refresh(tasks);
      _gantt.current.change_view_mode(viewMode);
    }
  }, [_gantt, tasks, viewMode]);

  useEffect(() => {
    _gantt.current = new Gantt(_svg.current, tasks, {
      on_click: onClick,
      on_view_change: onViewChange,
      on_progress_change: (task, progress) => {
        onProgressChange(task, progress);
        onTasksChange(tasks);
      },
      on_date_change: (task, start, end) => {
        onDateChange(task, start, end);
        onTasksChange(tasks);
      },
    });

    if (_gantt.current) {
      _gantt.current.change_view_mode(viewMode);
    }

    const midOfSvg = _svg.current?.clientWidth * 0.5;
    _target.current.scrollLeft = midOfSvg;
  }, []);

  return (
    <div style={{ overflow: "scroll" }} ref={_target}>
      <svg
        ref={_svg}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    </div>
  );
};

export default FrappeGantt;
