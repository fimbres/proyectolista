import React, { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import { Task } from './model';
import TaskList from './Components/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App : React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(task){
      setTasks([...tasks, {id: Date.now(), task:task, isCompleted: false }]);
      setTask("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    let add, active = tasks, complete = completedTasks;
    const { source, destination } = result;
    if(destination){
      if(destination.droppableId === source.droppableId && destination.index === source.index){
        return;
      }
      else{
        if(source.droppableId === 'TaskList'){
          add = active[source.index];
          active.splice(source.index, 1);
        }
        else{
          add = complete[source.index];
          complete.splice(source.index, 1);
        }
        if(destination.droppableId === 'TaskList'){
          active.splice(destination.index,0,add);
        }
        else{
          complete.splice(destination.index,0,add);
        }
      }
    }
    else{
      return;
    }
    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header className="App-header">
          <span className="heading">Task.io</span>
          <InputField task={task} setTask={setTask} handleAdd={handleAdd}/>
        </header>
        <TaskList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}/>
      </div>
    </DragDropContext>
  );
}

export default App;
