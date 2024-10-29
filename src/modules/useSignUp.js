import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { useRouter } from 'vue-router';

export const useSignUp = () => {


    const email = ref('');
    const password = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const role = ref('');
    const errMsg = ref('');
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();


    // Sign up function
    const signUp = async () => {
        console.log('Sign up initiated', email.value, password.value, firstName.value, lastName.value, role.value)
        try {
            const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
            
            // Create user document in Firestore
            await setDoc(doc(db, 'users', cred.user.uid), {
                firstName: firstName.value,
                lastName: lastName.value,
                role: role.value
            })
            console.log('User created:', cred.user.uid)
            router.push({  name: 'login' });

            // Error stuff
        } catch (error) {
            console.error('Sign up error:', error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errMsg.value = 'Email already in use';
                    break;
                case 'auth/weak-password':
                    errMsg.value = 'Password is too weak';
                    break;
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email address';
                    break;
                default:
                    errMsg.value = 'Sign up failed';
            }
            alert(errMsg.value)
        }
    }

    return { email, password, firstName, lastName, role, errMsg, signUp }
}