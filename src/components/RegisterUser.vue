<script setup>
import { useSignUp } from '../modules/useSignUp';

const {
    email,
    password,
    firstName,
    lastName,
    errMsg,
    signUp
} = useSignUp();
</script>


<template>
    <main>
        <h1>Register User</h1>
        <form id="register-form" @submit.prevent="signUp">
            <input type="text" placeholder="First name" v-model="firstName" required>
            <input type="text" placeholder="Last name" v-model="lastName" required>
            <input type="text" placeholder="E-mail" v-model="email" required>
            <input type="password" placeholder="Password" v-model="password" required>
            <p v-if="errMsg">{{ errMsg }}</p>
            <button type="submit">Submit</button>
        </form>
    </main>
</template>


<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#register-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 50px;

}


#register-form input {
    margin: 10px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
}

/* Status dropdown menu */
#register-form select {
    margin: 10px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    border: none;
    outline: none;
    color: #000000;
}

/* hide placeholder "Status" */
#register-form select::invalid {
    color: #a3a3a3;
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