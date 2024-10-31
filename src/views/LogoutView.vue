<script setup>
import { useAuth } from '../modules/useAuth'

const { logout, } = useAuth()
</script>

<template>
    <h1>Log out</h1>
    <div>
        <p>Click the button below to log out.</p>
        <button @click="logout">Logout</button>
    </div>

</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin: 20px;
}
</style>