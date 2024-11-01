<script setup>
import { useTasks } from '../modules/useTasks'
import { useAuth } from '../modules/useAuth'
import { watch } from 'vue';



const {
    filteredTasks,
    deleteTask,
    changeTaskStatus,
    calculateTimeSpent
} = useTasks()

const { userRole, isLoading } = useAuth()

watch(userRole, (newValue) => {
    console.log('User Role changed:', newValue);
    console.log('Current User Role:', userRole.value);
});



</script>

<template>
    <div class="kanban-container">
        <div class="todo-container" v-if="!isLoading">
            <h3>Todo</h3>
            <div v-for="task in filteredTasks('todo')" :key="task.id" class="task-item">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <p class="estimate">Estimated time: {{ task.estimatedTime }}</p>
                <button @click="deleteTask(task.id)">Delete me</button>


                <!--  USER ROLES NOT FUNCTIONING PROPERLY  -->

                <!-- <button v-if="userRole.value === 'admin' || userRole.value === 'manager'" 
                @click="deleteTask(task.id)">Delete me</button> -->
                <button @click="changeTaskStatus(task.id, 'inProgress')">Start Task</button>
            </div>

        </div>

        <div class="in-progress-container" v-if="!isLoading">
            <h3>In Progress</h3>
            <div v-for="task in filteredTasks('inProgress')" :key="task.id" class="task-item">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <p class="estimate">Estimated time: {{ task.estimatedTime }}</p>
                <p v-if="task.startedAt">Started at: {{ task.startedAt.toDate().toLocaleString() }}</p>
                <button @click="deleteTask(task.id)">Delete me</button>


                <!--  USER ROLES NOT FUNCTIONING PROPERLY  -->

                <!-- <button v-if="userRole.value === 'admin' || userRole.value === 'manager'" 
                @click="deleteTask(task.id)">Delete me</button> -->
                <button @click="changeTaskStatus(task.id, 'completed')">Complete Task</button>
            </div>
        </div>

        <div class="completed-container" v-if="!isLoading">
            <h3>Completed</h3>
            <div v-for="task in filteredTasks('completed')" :key="task.id" class="task-item">
                <h4>{{ task.title }}</h4>
                <p>{{ task.description }}</p>
                <p class="estimate">Estimated time: {{ task.estimatedTime }}</p>
                <p v-if="task.startedAt && task.completedAt">
                    Time Spent: {{ calculateTimeSpent(task.startedAt, task.completedAt) }}
                </p>
                <button @click="deleteTask(task.id)">Delete me</button>
                <button @click="changeTaskStatus(task.id, 'inProgress')">Undo Completed</button>
                <button @click="changeTaskStatus(task.id, 'todo')">Reset Todo</button>


                <!--  USER ROLES NOT FUNCTIONING PROPERLY  -->

                <!-- <button v-if="userRole.value === 'admin' || userRole.value === 'manager'" 
                @click="deleteTask(task.id)">Delete me</button>
                <button v-if="userRole.value === 'admin' || userRole.value === 'manager'" 
                @click="changeTaskStatus(task.id, 'inProgress')">Undo Completed</button>
                <button v-if="userRole.value === 'admin' || userRole.value === 'manager'" 
                @click="changeTaskStatus(task.id, 'todo')">Reset Todo</button> -->
            </div>
        </div>
    </div>
</template>



<style scoped>
h3 {
    color: hsla(160, 100%, 37%, 1);
    text-align: center;
    font-weight: 700;
}

h4 {
    color: rgb(219, 219, 219);
    font-size: 1.3rem;
}

.estimate {
    margin-top: 20px;
}

.kanban-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}

.todo-container {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
}

.in-progress-container {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
}

.completed-container {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
}

.task-item {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 5px 15px;
    border: none;
    margin: 0 5px 0 0;
    border-radius: 5px;
    background-color: #50505096;
    color: rgb(214, 214, 214);
    cursor: pointer;
}

button:hover {
    background-color: #505050;
}
</style>