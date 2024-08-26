import React, { useState, useEffect } from 'react'

import { DndContext, closestCorners, 
    useSensor, useSensors, 
    PointerSensor, 
    TouchSensor, 
    KeyboardSensor
} from '@dnd-kit/core';

import TaskColumn from './taskColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

interface Task {
    id: number
    name?: string
    description?: string
    color?: string
    startDate?: Date
    endDate?: Date
    done: boolean
};

const TaskArea = () => {
    const [taskList, setTaskList] = useState<Task[]>([
        {
            id: 1,
            done: false,
            color: 'red',
            name: 'Test Task'
        },
        {
            id: 2,
            done: false,
            color: 'blue',
            name: 'Test Task'
        },
    ]);

    const getTaskId = (id: string): number => {
        return taskList.findIndex(task => task.id === Number(id));
    };

    const handleDragEnd = (event: any) => {
        const {active, over} = event;

        if(active.id === over.id) return;

        setTaskList( taskList => {
            const originalPos = getTaskId(active.id);
            const newPos = getTaskId(over.id);
        
            return arrayMove(taskList, originalPos, newPos);
        })
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div>taskArea</div>
        
        <TaskColumn tasks={taskList}></TaskColumn>
            
        </DndContext>
    )
}

export default TaskArea