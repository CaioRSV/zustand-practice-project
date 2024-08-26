import React, {useState, useEffect} from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './taskCard'

interface Task {
    id: number
    name?: string
    description?: string
    color?: string
    startDate?: Date
    endDate?: Date
    done: boolean
};

interface TaskColumnProps{
  tasks: Task[]
}


const TaskColumn: React.FC<TaskColumnProps> = ({tasks}) => {
  return (
    <div className={`p-4 bg-slate-100 rounded-md flex flex-col gap-2`}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {
          tasks.map((task)=>(
            <>
              <TaskCard task={task} key={task.id}></TaskCard>
            </>
          ))
        }
      </SortableContext>
    </div>
  )
}

export default TaskColumn