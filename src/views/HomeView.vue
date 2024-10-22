<script setup>
import { ref } from 'vue'
import { useTasks } from '../modules/useTasks'


const { tasks,
  addTask,
  deleteTask,
  filteredTasks,
  newTaskTitle,
  newTaskDescription,
  newTaskEstimatedTime,
  newTaskStatus, } = useTasks()
</script>

<template>
  <main>

    <div class="add-todo">

      <input type="text" v-model="newTaskTitle" placeholder="Add a new task" />
      <input type="text" v-model="newTaskDescription" placeholder="Add a new task description" />
      <input type="text" v-model="newTaskEstimatedTime" placeholder="Add time estimate" />

      <select v-model="newTaskStatus" required name="status" id="status">
        <option value="" selected disabled hidden>Status</option>
        <option value="todo">Todo</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button @click="addTask">Add Task</button>
    </div>


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
        <button @click="deleteTask(task.id)">Delete me</button>
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
        <button @click="deleteTask(task.id)">Delete me</button>
      </div>
    </div>
  </div>
    


  </main>
</template>

<style scoped>

/* Kanban board */
.kanban-container {
  display: flex;
}
.todo-container, .in-progress-container, .completed-container {
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


/* New todo */

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

.add-todo button {
  height: 30px;
  margin: 10px;
  padding: 0 10px;
  border-radius: 20px;
  border: none;
  outline: none;
}
</style>
