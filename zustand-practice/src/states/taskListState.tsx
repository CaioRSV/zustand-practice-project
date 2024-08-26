import { create } from 'zustand';

interface Task {
    id: number
    name?: string
    description?: string
    color?: string
    startDate?: Date
    endDate?: Date
    done: boolean
};


interface TaskList{
    tasks: Task[];
}

interface TaskListState{
    data: TaskList;
    changeTaskList: (to: TaskList) => void; 
}

export const useTaskList = create<TaskListState>( (set)=>({
    data : {
        tasks: []
    },
    changeTaskList: (to: TaskList) => set((state) => ({
        data: {
            tasks: to.tasks
        }
    }))
})
)