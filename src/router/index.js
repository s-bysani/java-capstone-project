import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'overview',
      component: () => import('../views/Overview.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/composition',
      name: 'composition',
      component: () => import('../views/TeamComposition.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/team/:id',
      name: 'team-board',
      component: () => import('../views/TeamBoard.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Authentication guard
let isAuthReady = false;

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!isAuthReady) {
    await new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        isAuthReady = true;
        unsubscribe();
        resolve();
      })
    })
  }

  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (to.path === '/login' && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
