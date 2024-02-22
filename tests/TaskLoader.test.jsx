import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  calculateCompletedTasksPercentage,
  updateTaskInArray,
} from "../src/components/TasksLoader/utils";
import TasksLoader from "../src/components/TasksLoader/TasksLoader";

let mockedData = [
  {
    name: "General Info",
    tasks: [
      {
        description: "Add name and surname",
        value: 10,
        checked: true,
      },
      {
        description: "Add email",
        value: 15,
        checked: false,
      },
    ],
  },
];

describe("TaskLoader Component", () => {
  test("Calculate completed tasks percentage", () => {
    expect(calculateCompletedTasksPercentage(mockedData)).toBe(50);
  });

  test("Update first task value", () => {
    const updatedData = updateTaskInArray(
      0,
      0,
      false,
      JSON.parse(JSON.stringify(mockedData))
    );

    expect(updatedData[0].tasks[0].checked).toBe(false);
  });

  test("Render TasksLoader component", () => {
    render(<TasksLoader taskGroups={mockedData} updateTasks={() => {}} />);
    const taskLoaderElement = screen.getByTestId("tasks-loader");
    expect(taskLoaderElement).toBeInTheDocument();
  });

  test("Render both tasks to render", () => {
    render(<TasksLoader taskGroups={mockedData} updateTasks={() => {}} />);
    const firstTask = screen.getByText("Add name and surname");
    const secondTask = screen.getByText("Add email");

    expect(firstTask).toBeInTheDocument();
    expect(secondTask).toBeInTheDocument();
  });

  test("Render progressive bar", () => {
    render(<TasksLoader taskGroups={mockedData} updateTasks={() => {}} />);
    const loaderBar = screen.getByTestId("loader-bar");
    expect(loaderBar).toBeInTheDocument();
  });
});
