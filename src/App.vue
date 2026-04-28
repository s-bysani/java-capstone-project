<template>
  <v-app>
    <v-app-bar v-if="authStore.user" elevation="0" class="glass-nav px-2">
      <v-toolbar-title class="font-weight-bold text-primary brand-title mr-6">
        <v-icon start icon="mdi-anvil" color="primary" class="mr-2"></v-icon>
        Forge
      </v-toolbar-title>
      
      <v-btn to="/" variant="text" rounded="pill" class="mx-1 nav-btn" active-class="nav-btn-active">
        <v-icon start size="small">mdi-home-variant</v-icon>Overview
      </v-btn>
      <v-btn v-if="authStore.userRole === 'admin'" to="/composition" variant="text" rounded="pill" class="mx-1 nav-btn" active-class="nav-btn-active">
        <v-icon start size="small">mdi-account-group</v-icon>Team Comp
      </v-btn>
      
      <v-divider vertical class="mx-3 my-3 opacity-50"></v-divider>

      <div class="d-none d-md-flex">
        <v-btn v-for="team in teams" :key="team.id" :to="'/team/' + team.id" variant="text" rounded="pill" class="mx-1 nav-btn" active-class="nav-btn-active" size="small">
          Team {{ team.id }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      
      <v-divider vertical class="mx-3 my-3 opacity-50"></v-divider>
      
      <!-- Theme Toggle Button -->
      <v-btn icon @click="toggleTheme" class="theme-toggle-btn mx-2" variant="text">
        <v-icon class="theme-icon" :class="{'rotate-180': !isDark}">
          {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
        </v-icon>
      </v-btn>
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="profile-btn">
            <v-avatar color="primary" size="36">
              <v-img v-if="authStore.user.photoURL" :src="authStore.user.photoURL" alt="Profile"></v-img>
              <span v-else class="text-subtitle-1 font-weight-bold">{{ authStore.user.displayName?.charAt(0) || 'U' }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list bg-color="surface" elevation="8" rounded="xl" class="mt-2">
          <v-list-item @click="logout" prepend-icon="mdi-logout" class="text-error">
            <v-list-item-title class="font-weight-medium">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="animated-bg" :class="{'light-mode': !isDark}">
      <div class="bg-mesh"></div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { teamsInfo as teams } from './data/teams'
import { useAuthStore } from './store/authStore'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import { useTheme } from 'vuetify'

const authStore = useAuthStore()
const router = useRouter()
const theme = useTheme()

const isDark = computed(() => theme.global.name.value === 'dark')

const toggleTheme = (event) => {
  const willBeDark = !isDark.value
  
  // Fallback for browsers without View Transitions API
  if (!document.startViewTransition) {
    theme.global.name.value = willBeDark ? 'dark' : 'light'
    localStorage.setItem('forge-theme', theme.global.name.value)
    return
  }

  // Get click coordinates
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    theme.global.name.value = willBeDark ? 'dark' : 'light'
    localStorage.setItem('forge-theme', theme.global.name.value)
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    
    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}


onMounted(() => {
  authStore.initAuth()
  const savedTheme = localStorage.getItem('forge-theme')
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
})

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style>
/* Global Font & Scaffolding */
html, body, .v-application {
  font-family: 'Outfit', sans-serif !important;
  -webkit-font-smoothing: antialiased;
}

html {
  overflow-y: auto;
}

/* Theme Transition Globals */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2;
}

/* Glassmorphism Navbar */
.glass-nav {
  background: rgba(var(--v-theme-surface), 0.7) !important;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(128, 128, 128, 0.15) !important;
}

/* Navbar Buttons */
.nav-btn {
  letter-spacing: 0.5px;
  text-transform: none !important;
  font-weight: 500 !important;
  color: inherit !important;
  opacity: 0.7;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  opacity: 1;
  background: rgba(128, 128, 128, 0.1) !important;
}
.nav-btn-active {
  color: #06B6D4 !important;
  background: rgba(6, 182, 212, 0.1) !important;
  font-weight: 600 !important;
  opacity: 1;
}
.brand-title {
  letter-spacing: 1px !important;
  font-size: 1.4rem !important;
}

/* Theme Toggle Button Animation */
.theme-toggle-btn {
  transition: transform 0.3s ease;
}
.theme-toggle-btn:hover {
  transform: scale(1.1);
}
.theme-icon {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.rotate-180 {
  transform: rotate(180deg) scale(1.1);
  color: #EA580C !important; /* High contrast orange for white background */
}

/* Animated Mesh Background */
.animated-bg {
  position: relative;
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
  transition: background-color 0s; /* Handled by View Transitions */
}
.bg-mesh {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.bg-mesh::before, .bg-mesh::after {
  content: '';
  position: absolute;
  width: 60vw;
  height: 60vw;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  animation: float 20s infinite ease-in-out alternate;
}
.bg-mesh::before {
  top: -10vw;
  left: -10vw;
  background: radial-gradient(circle, #6366F1 0%, transparent 70%);
}
.bg-mesh::after {
  bottom: -20vw;
  right: -10vw;
  background: radial-gradient(circle, #06B6D4 0%, transparent 70%);
  animation-delay: -10s;
}

/* Light Mode specific overrides */
.light-mode .bg-mesh::before {
  opacity: 0.3;
}
.light-mode .bg-mesh::after {
  opacity: 0.3;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(5vw, 5vw) scale(1.1); }
}

/* Ensure content sits above mesh */
.v-container {
  position: relative;
  z-index: 1;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Universal Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}

/* Universal Light Theme Text Overrides */
.v-theme--light .text-white {
  color: rgba(0, 0, 0, 0.87) !important;
}
.v-theme--light .text-grey-lighten-1,
.v-theme--light .text-grey-lighten-2,
.v-theme--light .text-grey {
  color: rgba(0, 0, 0, 0.6) !important;
}
.v-theme--light .text-success-lighten-2 {
  color: #059669 !important; /* Tailwind green-600 */
}
.v-theme--light .bg-surface-variant {
  background-color: rgba(0, 0, 0, 0.05) !important;
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
