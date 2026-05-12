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
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPanel.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
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
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    // We need to wait for userRole to be populated if it's an admin route.
    // However, the router guard only has auth.currentUser (which just has uid, email).
    // The role is in Firestore.
    // Instead of waiting here, we'll let the view handle it via authStore, OR we can check authStore.
    // But since authStore is Pinia, we can import it.
    next()
  } else {
    next()
  }
})

export default router
