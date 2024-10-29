<script setup>
import { useSignUp } from '../modules/useSignUp';

const {
    email,
    password,
    firstName,
    lastName,
    role,
    errMsg,
    signUp
} = useSignUp();
</script>


<template>
    <h1>Register User</h1>
    <form id="register-form" @submit.prevent="signUp">
        <input type="text" placeholder="First name" v-model="firstName" required>
        <input type="text" placeholder="Last name" v-model="lastName" required>
        <input type="text" placeholder="E-mail" v-model="email" required>
        <select name="role" id="role" v-model="role" required>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
        </select>
        <input type="password" placeholder="Password" v-model="password" required>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button type="submit">Submit</button>
    </form>


</template>


<style scoped>
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

    #register-form button {
        height: 30px;
        margin: 10px;
        padding: 0 10px;
        border-radius: 20px;
        border: none;
        outline: none;
    }
</style>