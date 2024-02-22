export const calculateCompletedTasksPercentage = (data) => {
  let completedTasks = 0;
  let totalTasks = 0;

  data.forEach((category) => {
    category.tasks.forEach((task) => {
      totalTasks++;
      if (task.checked) {
        completedTasks++;
      }
    });
  });

  if (totalTasks === 0) {
    return 0;
  }

  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  return completionPercentage;
};

export const updateTaskInArray = (
  groupIndex,
  taskId,
  taskNewValue,
  taskGroups
) => {
  const updatedTaskGroups = [...taskGroups];
  updatedTaskGroups[groupIndex].tasks[taskId].checked = taskNewValue;
  return updatedTaskGroups;
};
