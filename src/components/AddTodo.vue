<script setup>
import { useTasks } from '../modules/useTasks';

const {
    newTaskTitle,
    newTaskDescription,
    newTaskEstimatedTime,
    newTaskStatus,
    addTask
} = useTasks();
</script>

<template>
    <div class="add-todo">
        <input type="text" v-model="newTaskTitle" placeholder="Task title here" />
        <textarea type="text" v-model="newTaskDescription" placeholder="Add a new task description" class="description"/>
        <input type="text" v-model="newTaskEstimatedTime" placeholder="fx. 1h 30m" />

        <select v-model="newTaskStatus" required name="status" id="status">
            <option value="" selected disabled hidden>Status</option>
            <option value="todo">Todo</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
        </select>

        <button @click="addTask">Add Task</button>
    </div>
</template>

<style scoped>
.add-todo {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 50px;

}


.add-todo input {
    margin: 10px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
}

.add-todo textarea {
    margin: 10px;
    padding: 10px 10px;
    border-radius: 20px;
    border: none;
    outline: none;
    height: 100px;
    font-family: sans-serif;

}

/* Status dropdown menu */
.add-todo select {
    margin: 10px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
    color: #000000;
}

/* hide placeholder "Status" */
.add-todo select::invalid {
    color: #a3a3a3;
}

button {
    margin: 5px;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: var(--color-border);
    color: white;
    border: none;
}

button:hover {
    scale: 1.1;
}
</style>