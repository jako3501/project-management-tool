import { ref, onMounted } from 'vue';
import { tasksCollection, tasksFirebaseCollectionRef, db } from './firebase';
import { onSnapshot, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const useTasks = () => {

  // Create a new task and store it in a ref
  const newTaskTitle = ref('');
  const newTaskDescription = ref('');
  const newTaskEstimatedTime = ref('');
  const newTaskStatus = ref('');
  const newTaskStartedAt = ref('');
  const newTaskCompletedAt = ref('');

  // List of tasks and store it in a ref
  const tasks = ref([]);

  // Function to retrieve a new movie to the list
  onMounted(() => {
    onSnapshot(tasksCollection, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // ... = spread operator
        // Alternative way to write the above line
        /* title: doc.data().title,
        director: doc.data().director */
      }))
    })
  })

  const addTask = async () => {
    // check if the input is empty, if input is empty, return (stop function)
    if (newTaskTitle.value.trim() === '' || 
        newTaskDescription.value.trim() === '' || 
        newTaskEstimatedTime.value.trim() === '' || 
        newTaskStatus.value.trim() === '') 
        return;

    // Adding task to firebase
    await addDoc(tasksCollection, {
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      estimatedTime: newTaskEstimatedTime.value,
      status: newTaskStatus.value,
      startedAt: newTaskStartedAt.value,
      completedAt: newTaskCompletedAt.value

    })

    // Clear the input fields
    newTaskTitle.value = '';
    newTaskDescription.value = '';
    newTaskEstimatedTime.value = '';
    newTaskStatus.value = '';
  }

  // Create a function to delete a movie from the list
  const deleteTask = async (id) => {
    console.log("deleting task with id: ", id)
    await deleteDoc(doc(db, tasksFirebaseCollectionRef, id))
  }

  // filter tasks by status
  const filteredTasks = (status) => {
    return tasks.value.filter(task => task.status === status);
  };

  // Change tast status
  const changeTaskStatus = async (id, newStatus) => {
    const taskDoc = doc(tasksCollection, id);
    
  
    // Time meassurements for task
    const updateData = {status: newStatus}
    // Fetching date when task is moved from todo -> in progress
    if (newStatus === 'inProgress') {
      updateData.startedAt = serverTimestamp();
    }

    // Fetching date when task is moved from in progress -> completed
    if (newStatus === 'completed') {
      updateData.completedAt = serverTimestamp();
    }

    // Clearing startedAt and completedAt when task is reset to todo
    if (newStatus === 'todo') {
      updateData.startedAt = '';
      updateData.completedAt = '';
    }

    await updateDoc(taskDoc, updateData);
  }

  // Calculate time spent on a task from the time set to "In Progress" to the time set to "Completed"
  const calculateTimeSpent = (startedAt, completedAt) => {
    if (startedAt && completedAt) {
      // Convert timestamps to date (in milliseconds)
      const start = startedAt.toDate();
      const end = completedAt.toDate();

      // Calculate the difference in milliseconds
      const differenceInMs = end - start;

      // Convert milliseconds to minutes
      const totalMinutes = Math.floor(differenceInMs / 1000 / 60);

      // Calculate hours and remaining minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // return the result
      return `${hours}h ${minutes}m`;
    }
  }



  return {
    newTaskTitle,
    newTaskDescription,
    newTaskEstimatedTime,
    newTaskStatus,
    tasks,
    addTask,
    deleteTask,
    filteredTasks,
    changeTaskStatus,
    calculateTimeSpent
  }

}