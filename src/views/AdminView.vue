<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const users = ref([])
const errMsg = ref('')

const db = getFirestore()

const fetchUsers = async () => {
    // Get data from users collection from firebase
    try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        users.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        // Error stuff
    } catch (error) {
        console.error('Error fetching users:', error)
        errMsg.value = 'Failed to load users'
    }
}

// Delete user function
const deleteUser = async (userId) => {
    try {
        await deleteDoc(doc(db, 'users', userId))
        users.value = users.value.filter(user => user.id !== userId)
    } catch (error) {
        console.error('Error deleting user:', error)
        errMsg.value = 'Failed to delete user'
    }
}

// Toggle edit mode and save new user role
const toggleEdit = async (user) => {
    if (user.isEditing) {
        // Update role
        try {
            await updateDoc(doc(db, 'users', user.id), {
                role: user.newRole
            })
            user.role = user.newRole
            // Error stuff
        } catch (error) {
            console.error('Error updating user role:', error)
            errMsg.value = 'Failed to update role'
        }
    }
    user.isEditing = !user.isEditing // Toggle edit mode
}

onMounted(fetchUsers)


</script>


<template>
    <section>
        <h1>Hello Admin!</h1>
        <p>Here you can grant your employees access to edit and delete tasks.</p>

        <div class="user-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.firstName }} {{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <template v-if="user.isEditing">
                                <select v-model="user.newRole">
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </template>
                            <template v-else>
                                {{ user.role }}
                            </template>
                        </td>
                        <td>
                            <button @click="toggleEdit(user)">{{ user.isEditing ? 'Save' : 'Edit' }}</button>
                            <button @click="deleteUser(user.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-if="errMsg">{{ errMsg }}</p>
        </div>

    </section>
</template>


<style scoped>

table {
    width: 100%;
    border-collapse: collapse;

}

table thead {
    background-color: #f2f2f239;
}

table th,
table td {
    border: 1px solid #dddddd53;
    padding: 10px;
    text-align: left;
    min-width: 200px;
    
}

button {
    padding: 5px 15px;
    border: none;
    margin: 0 5px;
    border-radius: 5px;
    background-color: #50505096;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #505050;
}

select {
    padding: 5px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: #50505096;
    color: white;
}
</style>