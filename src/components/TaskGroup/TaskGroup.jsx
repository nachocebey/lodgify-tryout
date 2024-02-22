import { useState } from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";
import "./styles.css";

export default function TaskGroup({
  name,
  tasks,
  isOpen,
  updateTask,
  groupIndex,
}) {
  const [taskGroupOpen, setTaskGroupOpen] = useState(isOpen);

  const handleRowClick = () => {
    setTaskGroupOpen(!taskGroupOpen);
  };

  return (
    <div className="task-group" data-testid={`group-row-${groupIndex}`}>
      <div className="group-header" onClick={() => handleRowClick()}>
        <span className="group-header--icon material-symbols-outlined">
          note_stack_add
        </span>
        <div className="group-header--title ">{name}</div>
        <div className="group-header--show-container">
          {taskGroupOpen ? (
            <>
              Hide
              <span className="material-symbols-outlined">expand_less</span>
            </>
          ) : (
            <>
              Show
              <span className="material-symbols-outlined">expand_more</span>
            </>
          )}
        </div>
      </div>
      <div
        className={`tasks-container tasks-${taskGroupOpen ? "show" : "hide"}`}
      >
        <ul data-testid={`group-tasks-list-${groupIndex}`}>
          {tasks?.map((item, taskIndex) => (
            <li key={taskIndex}>
              <Task
                {...item}
                isOpen={false}
                taskIndex={taskIndex}
                groupIndex={groupIndex}
                updateTask={(checked) => updateTask(taskIndex, checked)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

TaskGroup.propTypes = {
  name: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  updateTask: PropTypes.func.isRequired,
  groupIndex: PropTypes.number.isRequired,
};
