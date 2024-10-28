<script setup>
import AddTask from '../components/AddTodo.vue';
import KanbanBoard from '../components/KanbanBoard.vue';
</script>

<template>
  <main>
        <AddTask />
        <KanbanBoard />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Kanban board */
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
