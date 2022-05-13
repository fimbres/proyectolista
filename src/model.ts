import { useReducer } from 'react';

export interface Task{
    id: number;
    task: string;
    isCompleted: boolean;
}

type Actions = 
    | { type: 'add', payload: string }
    | { type: 'remove', payload: number }
    | { type: 'done', payload: number }

const TaskReducer = (state: Task[], action: Actions) => {

}

const ReducerExample = () => {
    //const [state, dispatch] = useReducer(TaskReducer, []);

}