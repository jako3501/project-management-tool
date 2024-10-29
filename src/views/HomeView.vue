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

</style>
