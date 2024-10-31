import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc} from 'firebase/firestore'


export const useAuth = () => {

    
    const email = ref('')
    const password = ref('')
    const errMsg = ref('')
    const isLoggedIn = ref(false)
    const userRole = ref(null)
    const router = useRouter()
    const auth = getAuth()
    const db = getFirestore()

    // Check if user is logged in
    onAuthStateChanged(auth, async (user) => {
        isLoggedIn.value = !!user
        if (user) {
            await fetchUserRoles(user.uid)
        }
        else {
            userRole.value = null
        }
    })

    const fetchUserRoles = async (uid) => {
        const userDoc = await getDoc(doc(db, 'users', uid))
        if (userDoc.exists()) {
            userRole.value = userDoc.data().role
        }
        else {
            console.log('User not found')
        }
    }
    

    // Login function
    const login = (event) => {
        event.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log(data)
                console.log(auth.currentUser)
                router.push({ name: 'home' }) 
            })

            // Error message
            .catch((error) => {
                console.log(error.code)

                switch (error.code) {
                    case 'auth/invalid-email':
                        errMsg.value = 'Invalid email address';
                        break
                    case 'auth/user-not-found':
                        errMsg.value = 'User not found';
                        break
                    case 'auth/wrong-password':
                        errMsg.value = 'Incorrect password';
                        break
                }

                alert(error.message)
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out')
                router.push({ name: 'login' }) // Redirect to login or any other page
            })
            .catch((error) => {
                console.error('Sign out error:', error)
            })
    }

    





    return { email, password, errMsg, isLoggedIn, userRole, login, logout }
}