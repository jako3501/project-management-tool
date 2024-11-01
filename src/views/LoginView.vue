<script setup>
import { useAuth } from '../modules/useAuth'

const { email, password, errMsg, login } = useAuth()
</script>

<template>
  <h1>Login</h1>
  <div> <!-- Show form only if not logged in -->
    <form id="login-form" @submit="login">
      <input type="text" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <p v-if="errMsg">{{ errMsg }}</p>
      <button type="submit">Submit</button>
    </form>
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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form input {
  margin: 5px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
}

form button {
  margin: 5px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: var(--color-border);
  color: white;
  border: none;
}

form button:hover {
  scale: 1.1;
}
</style>
