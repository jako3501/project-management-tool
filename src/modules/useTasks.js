import { ref, onMounted } from 'vue';
import { tasksCollection, tasksFirebaseCollectionRef, db } from './firebase';
import { onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';

export const useTasks = () => {

  // Step 1: Create a new movie title and store it in a ref
  const newTaskTitle = ref('');
  const newTaskDescription = ref('');
  const newTaskEstimatedTime = ref('');
  const newTaskStatus = ref('');

  // Step 2: Create a list of movies and store it in a ref
  const tasks = ref([]);

  // Step 3: Create a function to retrieve a new movie to the list
  onMounted(() => {
    onSnapshot(tasksCollection, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // spread operator
        /* title: doc.data().title,
        director: doc.data().director */
      }))
    })
  })

  const addTask = async () => {
    if (newTaskTitle.value.trim() === '' || 
        newTaskDescription.value.trim() === '' || 
        newTaskEstimatedTime.value.trim() === '' || 
        newTaskStatus.value.trim() === '') 
        return;
    // check if the input is empty, if input is empty, return (stop function)

    await addDoc(tasksCollection, {
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      estimatedTime: newTaskEstimatedTime.value,
      status: newTaskStatus.value,

    })

    newTaskTitle.value = '';
    newTaskDescription.value = '';
    newTaskEstimatedTime.value = '';
    newTaskStatus.value = '';
  }

  // step 5: Create a function to delete a movie from the list
  const deleteTask = async (id) => {
    console.log("deleting task with id: ", id)
    await deleteDoc(doc(db, tasksFirebaseCollectionRef, id))
  }

  // filter tasks by status
  const filteredTasks = (status) => {
    return tasks.value.filter(task => task.status === status);
  };

  return {
    newTaskTitle,
    newTaskDescription,
    newTaskEstimatedTime,
    newTaskStatus,
    tasks,
    addTask,
    deleteTask,
    filteredTasks
  }

}