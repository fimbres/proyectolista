import React, { useRef } from 'react';
import "./styles.css";

interface Props{
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

function InputField({ task, setTask, handleAdd }:Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
        }}>
        <input type='input' placeholder='Enter a Task' className='input_box' onChange={
            (e) => { setTask(e.target.value); }
        }></input>
        <button className = "input_submit" type="submit">Add</button>
    </form>
  )
}

export default InputField