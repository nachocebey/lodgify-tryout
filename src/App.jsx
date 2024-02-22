import { useEffect, useState } from "react";
import TasksLoader from "./components/TasksLoader/TasksLoader";
import "./App.css";

function App() {
  /**
   * For this small-scale project, I've chosen to employ a standard fetch call.
   * In more extensive scenarios, opting for an external service could be advantageous.
   * Utilizing tools like axios or even integrating React Query could significantly enhance the overall performance of the application.
   */
  const API_URL =
    "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress";
  const [taskGroups, setTaskGroups] = useState([]);

  const updateTasks = (tasksUpdated) => {
    setTaskGroups(tasksUpdated);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTaskGroups(data))
      .catch((error) => console.error(error));
  }, []);

  /**
   * On the other hand, I have chosen to pass the parent component's update function to its children,
   * always striving to keep everything as simple as possible. In larger scenarios, we would consider using React Context or even Redux to
   * facilitate information transfer between different components or sections of the app.
   */
  return (
    <>
      <TasksLoader taskGroups={taskGroups} updateTasks={updateTasks} />
    </>
  );
}

export default App;
