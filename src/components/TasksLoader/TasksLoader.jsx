import TaskGroup from "../TaskGroup/TaskGroup";
import PropTypes from "prop-types";
import { calculateCompletedTasksPercentage, updateTaskInArray } from "./utils";
import "./styles.css";

export default function TasksLoader({ taskGroups, updateTasks }) {
  const handleTaskUpdate = (taskGroupIndex, taskIndex, taskNewValue) => {
    const updatedArray = updateTaskInArray(
      taskGroupIndex,
      taskIndex,
      taskNewValue,
      taskGroups
    );
    updateTasks(updatedArray);
  };

  const completionPercentage = calculateCompletedTasksPercentage(taskGroups);

  const completedBarStyles = {
    width: `${completionPercentage}%`,
  };

  return (
    <div className="container" data-testid="tasks-loader">
      <div className="loader">
        <h2 className="loader--label">Lodgify Grouped Tasks</h2>
        <div className="loader--bar">
          <div className="completed" style={completedBarStyles} data-testid="loader-bar">
            <span>{completionPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="task-groups-container">
        {taskGroups.length > 0
          ? taskGroups.map((item, groupIndex) => (
              <TaskGroup
                key={groupIndex}
                {...item}
                isOpen={false}
                groupIndex={groupIndex}
                updateTask={(taskIndex, checked) =>
                  handleTaskUpdate(groupIndex, taskIndex, checked)
                }
              />
            ))
          : "No tasks"}
      </div>
    </div>
  );
}

TasksLoader.propTypes = {
  taskGroups: PropTypes.array.isRequired,
  updateTasks: PropTypes.func.isRequired,
};
