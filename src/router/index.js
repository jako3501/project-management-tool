import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      meta: { requiresVisitor: true}
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAdmin: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue') ,
      meta: { requiresVisitor: true}
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue') ,
      meta: { requiresAuth: true}
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser // Get current user
  const db = getFirestore();

  let userRole = null
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      userRole = userDoc.data().role // Get user role
      
    } 
  }

  // Check for admin role
  if (to.meta.requiresAdmin && (!user || userRole !== 'admin')) {
    return next({ name: 'login' }); // Redirect if not admin
  }

  // Check for routes requiring authentication
  if (to.meta.requiresAuth && !user) {
    return next({ name: 'login' });
  }

  // Check for routes that should be accessible only by visitors
  if (to.meta.requiresVisitor && user) {
    return next({ name: 'home' });
  }

  // Proceed if user meets the requirements
  next();
})

export default router
