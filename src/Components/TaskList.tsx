import React from 'react'
import "./styles.css";
import { Task } from "../model";
import TaskSingle from "./TaskSingle";
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    completedTasks: Task[];
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TaskList({tasks, setTasks, completedTasks, setCompletedTasks}: Props) {
  return (
    <div className="container">
        <Droppable droppableId='TaskList'>
            {
                (provided, snapshot) => (
                    <div className={snapshot.isDraggingOver ? 'tasks Active' : 'tasks'} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="tasks-heading">
                            Active Tasks
                        </span>
                        {tasks.map((task, index) => (
                            <TaskSingle index={index} task={task} key={task.id} tasks={tasks} setTasks={setTasks}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
        <Droppable droppableId='TaskRemove'>
            {
                (provided, snapshot) => (
                    <div className={snapshot.isDraggingOver ? 'tasks-remove ActiveD' : 'tasks-remove'} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="tasks-heading">
                            Completed Tasks
                        </span>
                        {completedTasks.map((task, index) => (
                            <TaskSingle index={index} task={task} key={task.id} tasks={completedTasks} setTasks={setCompletedTasks}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    </div>
  )
}
