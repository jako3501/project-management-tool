<script setup>
import { useTasks } from '../modules/useTasks';

const {
    filteredTasks,
    deleteTask,
    changeTaskStatus,
    calculateTimeSpent
} = useTasks();
</script>

<template>
    <div class="kanban-container">
        <div class="todo-container">
            <h3>Todo</h3>
            <div v-for="task in filteredTasks('todo')" :key="task.id" class="task-item">
                <p>id: {{ task.id }}</p>
                <p>title: {{ task.title }}</p>
                <p>description: {{ task.description }}</p>
                <p>estimatedTime: {{ task.estimatedTime }}</p>
                <p>status: {{ task.status }}</p>
                <button @click="deleteTask(task.id)">Delete me</button>
                <button @click="changeTaskStatus(task.id, 'inProgress')">Start Task</button>
            </div>
        </div>

        <div class="in-progress-container">
            <h3>In Progress</h3>
            <div v-for="task in filteredTasks('inProgress')" :key="task.id" class="task-item">
                <p>id: {{ task.id }}</p>
                <p>title: {{ task.title }}</p>
                <p>description: {{ task.description }}</p>
                <p>estimatedTime: {{ task.estimatedTime }}</p>
                <p>status: {{ task.status }}</p>
                <p v-if="task.startedAt">Started at: {{ task.startedAt.toDate().toLocaleString() }}</p>
                <button @click="deleteTask(task.id)">Delete me</button>
                <button @click="changeTaskStatus(task.id, 'completed')">Complete Task</button>
            </div>
        </div>

        <div class="completed-container">
            <h3>Completed</h3>
            <div v-for="task in filteredTasks('completed')" :key="task.id" class="task-item">
                <p>id: {{ task.id }}</p>
                <p>title: {{ task.title }}</p>
                <p>description: {{ task.description }}</p>
                <p>estimatedTime: {{ task.estimatedTime }}</p>
                <p>status: {{ task.status }}</p>
                <p v-if="task.startedAt && task.completedAt">
                    Time Spent: {{ calculateTimeSpent(task.startedAt, task.completedAt) }}
                </p>
                <button @click="deleteTask(task.id)">Delete me</button>
                <button @click="changeTaskStatus(task.id, 'inProgress')">Undo Completed</button>
                <button @click="changeTaskStatus(task.id, 'todo')">Reset Todo</button>
            </div>
        </div>
    </div>
</template>



<style scoped>
    .kanban-container {
        display: flex;
    }

    .todo-container,
    .in-progress-container,
    .completed-container {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        width: 30%;
    }

    .task-item {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

</style>