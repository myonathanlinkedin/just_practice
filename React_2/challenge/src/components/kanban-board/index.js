import React from "react";
import "./index.css";

export default function KanbanBoard(props) {
  const [tasks, setTasks] = React.useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },
  ]);

  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  const [taskName, setTaskName] = React.useState('');

  // Create task stages arrays
  const stagesTasks = Array(stagesNames.length).fill([]).map(() => []);
  
  // Distribute tasks into stages
  tasks.forEach(task => {
    const stageId = task.stage;
    if (stageId >= 0 && stageId < stagesNames.length) {
      stagesTasks[stageId].push(task);
    }
  });

  const createTask = () => {
    if (taskName.trim() === '') return;
    
    setTasks([...tasks, { name: taskName, stage: 0 }]);
    setTaskName('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.name !== taskId));
  };

  const moveTask = (taskId, direction) => {
    setTasks(tasks.map(task => {
      if (task.name === taskId) {
        const newStage = task.stage + direction;
        if (newStage >= 0 && newStage < stagesNames.length) {
          return { ...task, stage: newStage };
        }
      }
      return task;
    }));
  };

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input 
          id="create-task-input" 
          type="text" 
          className="large" 
          placeholder="New task name" 
          data-testid="create-task-input"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} 
        />
        <button 
          type="submit" 
          className="ml-30" 
          data-testid="create-task-button"
          onClick={createTask}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => (
          <div className="card outlined ml-20 mt-0" key={`stage-${i}`}>
            <div className="card-text">
              <h4>{stagesNames[i]}</h4>
              <ul className="styled mt-50" data-testid={`stage-${i}`}>
                {tasks.map((task, index) => (
                  <li className="slide-up-fade-in" key={`${task.name}-${index}`}>
                    <div className="li-content layout-row justify-content-between align-items-center">
                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                      <div className="icons">
                        <button 
                          className="icon-only x-small mx-2" 
                          data-testid={`${task.name.split(' ').join('-')}-back`}
                          disabled={i === 0}
                          onClick={() => moveTask(task.name, -1)}
                        >
                          <i className="material-icons">arrow_back</i>
                        </button>
                        <button 
                          className="icon-only x-small mx-2" 
                          data-testid={`${task.name.split(' ').join('-')}-forward`}
                          disabled={i === stagesNames.length - 1}
                          onClick={() => moveTask(task.name, 1)}
                        >
                          <i className="material-icons">arrow_forward</i>
                        </button>
                        <button 
                          className="icon-only danger x-small mx-2" 
                          data-testid={`${task.name.split(' ').join('-')}-delete`}
                          onClick={() => deleteTask(task.name)}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 