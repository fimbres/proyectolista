import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
}

export default function TaskSingle({index, task, tasks, setTasks} : Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTasks(tasks.map((task) => task.id === id?{...task, isDone: !task.isCompleted}:task));
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id ));
  };

  const handleEdit = (e:React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, task:editTask } : task)
    );
    setEdit(false);
  };
  
  return (
    <Draggable draggableId = {task.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form className={snapshot.isDragging?'task drag':'task'} onSubmit={(e)=>handleEdit(e,task.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {edit ? (
              <input ref={inputRef} value={editTask} onChange={(e) => setEditTask(e.target.value)} className="task-text"/>
            ) : (
              task.isCompleted ? (
                <s className="task-text">{task.task}</s>
              ) : (
                <span className="task-text">{task.task}</span>
              )
            )}
            <div>
              <span className="icon" onClick={()=>setEdit(true)}>
                <AiFillEdit/>
              </span>
              <span className="icon" onClick={()=>handleDelete(task.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={()=>handleDone(task.id)}>
                <MdDone />
              </span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}
