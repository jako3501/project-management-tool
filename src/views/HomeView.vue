<script setup>
import { ref } from 'vue'
import { useTasks } from '../modules/useTasks'

const { tasks,
        addTask,
        deleteTask,
        newTaskTitle,
        newTaskDescription,
        newTaskEstimatedTime,
        newTaskStatus, } = useTasks()
</script>

<template>
  <main>

    <div class="todo">

      <input type="text" v-model="newTaskTitle" placeholder="Add a new task" />
      <input type="text" v-model="newTaskDescription" placeholder="Add a new task description" />
      <input type="text" v-model="newTaskEstimatedTime" placeholder="Add time estimate" />
      <input type="text" v-model="newTaskStatus" placeholder="Add a task status" />
      <button @click="addTask">Add Task</button>

      <ul>
        <li v-for="task in tasks" :key="task">
          id: {{ task.id }}
          title: {{ task.title }}
          description: {{ task.description }}
          estimatedTime: {{ task.estimatedTime }}
          status: {{ task.status }}
          <button @click="deleteTask(task.id)">Delete me</button>
        </li>
      </ul>

    </div>

  </main>
</template>
