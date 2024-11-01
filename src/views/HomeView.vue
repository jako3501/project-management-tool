<script setup>
import { ref }  from 'vue'
import AddTask from '../components/AddTodo.vue'
import KanbanBoard from '../components/KanbanBoard.vue'


const showAddTask = ref(false)
// Toggle add task form
const toggleAddTask = () => {
  showAddTask.value = !showAddTask.value;
}

</script>

<template>
  <main>
    <button @click="toggleAddTask">
      {{ showAddTask ? 'Hide' : 'Show' }} New task
    </button>
    <AddTask v-if="showAddTask" />
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
