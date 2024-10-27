import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';


export const useAuth = () => {

    
    const email = ref('');
    const password = ref('');
    const errMsg = ref('');
    const isLoggedIn = ref(false);
    const router = useRouter();
    const auth = getAuth();

    // Check if user is logged in
    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user
    });

    

    // Login function
    const login = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log(data)
                console.log(auth.currentUser)
            })

            // Error message
            .catch((error) => {
                console.log(error.code)

                switch (error.code) {
                    case 'auth/invalid-email':
                        errMsg.value = 'Invalid email address';
                        break;
                    case 'auth/user-not-found':
                        errMsg.value = 'User not found';
                        break;
                    case 'auth/wrong-password':
                        errMsg.value = 'Incorrect password';
                        break;
                }

                alert(error.message)
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                router.push({ name: 'login' }); // Redirect to login or any other page
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    }

    return { email, password, errMsg, login, logout, isLoggedIn }
}