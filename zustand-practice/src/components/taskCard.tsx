import React, {useState, useEffect} from 'react'


import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

interface Task {
    id: number
    name?: string
    description?: string
    color?: string
    startDate?: Date
    endDate?: Date
    done: boolean
};

interface TaskCardProps{
    task: Task
}

const TaskCard: React.FC<TaskCardProps> = ({task}) => {
    const { attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

  return (
    <div ref={setNodeRef} 
        {...attributes} 
        {...listeners} 
        style={style}

        className={`flex-col bg-slate-200 rounded-md p-2`}
        >

        <p>{task.id}</p>
        <p>{task.color ?? ''}</p>
        <p>{task.description  ?? ''}</p>
        <p>{task.done}</p>
    </div>
  )
}

export default TaskCard