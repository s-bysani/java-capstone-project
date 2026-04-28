<template>
  <div class="login-wrapper">
    <!-- Theme Toggle Button -->
    <v-btn icon @click="toggleTheme" class="theme-toggle-login" variant="text">
      <v-icon :class="{'rotate-180': !isDark}" class="theme-icon">
        {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
      </v-icon>
    </v-btn>

    <!-- Interactive Gravity Canvas -->
    <canvas ref="canvasRef" class="gravity-canvas"></canvas>

    <v-container fluid class="fill-height position-relative z-1">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" lg="4">
          <v-card class="glass-login-card pa-8 text-center" rounded="xl" elevation="0">
            <div class="logo-container mb-6">
              <v-icon icon="mdi-anvil" color="primary" size="64" class="glow-icon"></v-icon>
            </div>
            
            <h1 class="text-h3 font-weight-black text-primary mb-2 glowing-text">Forge</h1>
            <h2 class="text-subtitle-1 font-weight-medium mb-8 text-white">AI-Native Workforce Intelligence</h2>
            
            <p class="text-body-1 mb-8 text-grey-lighten-1">
              Authenticate to access real-time project metrics, workforce allocation, and team composition boards.
            </p>
            
            <v-alert v-if="authStore.error" type="error" variant="tonal" class="mb-6 rounded-lg text-left" density="compact">
              {{ authStore.error }}
            </v-alert>

            <v-btn
              color="primary"
              size="x-large"
              block
              rounded="pill"
              class="auth-btn font-weight-bold"
              @click="handleLogin"
              :loading="loading"
              elevation="4"
            >
              <v-icon start class="mr-2">mdi-google</v-icon>
              Sign In with Google
            </v-btn>
            
            <div class="mt-8 text-caption text-grey d-flex align-center justify-center">
              <v-icon size="small" class="mr-1">mdi-lock-outline</v-icon>
              Secure enterprise authentication
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const authStore = useAuthStore()
const router = useRouter()
const theme = useTheme()
const loading = ref(false)

const isDark = computed(() => theme.global.name.value === 'dark')

const toggleTheme = (event) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const willBeDark = !isDark.value

  if (!document.startViewTransition) {
    theme.global.name.value = willBeDark ? 'dark' : 'light'
    localStorage.setItem('forge-theme', theme.global.name.value)
    return
  }

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
      { clipPath: clipPath },
      { duration: 500, easing: 'ease-in', pseudoElement: '::view-transition-new(root)' }
    )
  })
}

const canvasRef = ref(null)
let animationFrameId = null
let particles = []
const mouse = { x: -1000, y: -1000 } // Start off-screen

// Physics Constants
class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.z = Math.random() * 0.6 + 0.4 // Depth: 0.4 (far) to 1.0 (near) - keeps them visible
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    
    // Base speeds affected by depth (closer moves faster)
    this.vx = (Math.random() - 0.5) * 1.5 * this.z
    this.vy = (Math.random() * 1.5 + 0.5) * this.z
    
    // Increased base size for better visibility
    this.radius = (Math.random() * 3 + 1.5) * this.z
    this.color = Math.random() > 0.5 ? '#6366F1' : '#06B6D4' // Indigo or Cyan
    
    // For organic swaying
    this.angle = Math.random() * Math.PI * 2
    this.spin = (Math.random() - 0.5) * 0.05
  }
  
  update() {
    this.angle += this.spin
    
    // Add organic sway to horizontal movement
    const sway = Math.sin(this.angle) * 0.8 * this.z
    this.x += this.vx + sway
    this.y += this.vy
    
    // Seamless wrap-around
    if (this.y > this.canvas.height + 50) {
      this.y = -50
      this.x = Math.random() * this.canvas.width
    }
    if (this.x > this.canvas.width + 50) this.x = -50
    if (this.x < -50) this.x = this.canvas.width + 50
    
    // Mouse Interaction (Fluid Parallax Dodge)
    const dx = this.x - mouse.x
    const dy = this.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    const REPEL_RADIUS = 250
    if (dist < REPEL_RADIUS) {
      const force = Math.pow((REPEL_RADIUS - dist) / REPEL_RADIUS, 2) // Smoother exponential falloff
      this.x += (dx / dist) * force * 2 * this.z
      this.y += (dy / dist) * force * 2 * this.z
    }
  }
  
  draw(ctx, isLightMode) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    
    // Fainter opacity for farther particles
    ctx.globalAlpha = this.z
    ctx.fillStyle = this.color
    
    // Glow effect
    if (!isLightMode) {
      ctx.shadowBlur = 20 * this.z
      ctx.shadowColor = this.color
    } else {
      ctx.shadowBlur = 8 * this.z
      ctx.shadowColor = 'rgba(0,0,0,0.15)'
    }
    
    ctx.fill()
    ctx.closePath()
    ctx.shadowBlur = 0 // Reset
    ctx.globalAlpha = 1
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  
  // Create Particles
  const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000)
  particles = []
  for (let i = 0; i < Math.min(numParticles, 150); i++) {
    particles.push(new Particle(canvas))
  }
  
  // Mouse Trackers
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  window.addEventListener('mouseout', () => {
    mouse.x = -1000
    mouse.y = -1000
  })
  // Touch support
  window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  })
  window.addEventListener('touchend', () => {
    mouse.x = -1000
    mouse.y = -1000
  })

  const animate = () => {
    const isLightMode = theme.global.name.value === 'light'
    
    // Clear canvas with trail effect
    ctx.fillStyle = isLightMode ? 'rgba(241, 245, 249, 0.2)' : 'rgba(11, 15, 25, 0.2)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        // Prevent lines from crossing major depth planes
        if (Math.abs(particles[i].z - particles[j].z) > 0.3) continue
        
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const maxDist = 120
        if (dist < maxDist) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          
          // Smooth exponential fade based on distance AND depth
          const alpha = Math.pow(1 - dist / maxDist, 2) * Math.min(particles[i].z, particles[j].z)
          
          ctx.strokeStyle = isLightMode 
            ? `rgba(79, 70, 229, ${alpha * 0.3})` 
            : `rgba(99, 102, 241, ${alpha * 0.5})`
          ctx.lineWidth = 0.5
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
    
    // Update and draw particles
    particles.forEach(p => {
      p.update()
      p.draw(ctx, isLightMode)
    })
    
    animationFrameId = requestAnimationFrame(animate)
  }
  
  animate()
}

onMounted(() => {
  initCanvas()
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  // Cleanup event listeners implicitly handled if component unmounts, but good practice
  window.removeEventListener('resize', () => {})
})

const handleLogin = async () => {
  loading.value = true
  try {
    await authStore.loginWithGoogle()
    router.push('/')
  } catch (error) {
    // Error handled in store
  } finally {
    loading.value = false
  }
}
</script>

<style>
.login-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: rgb(var(--v-theme-background));
}

.gravity-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: auto;
}

.theme-toggle-login {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
  transition: transform 0.3s ease;
}

.theme-toggle-login:hover {
  transform: scale(1.1);
}

.theme-icon {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-180 {
  transform: rotate(180deg) scale(1.1);
  color: #EA580C !important;
}

.z-1 {
  z-index: 1;
  pointer-events: none;
}

.glass-login-card {
  pointer-events: auto;
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
  transition: all 0.5s ease;
}

.v-theme--light .glass-login-card {
  background: rgba(255, 255, 255, 0.8) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
}

.logo-container {
  display: inline-flex;
  padding: 16px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
}

.v-theme--light .logo-container {
  background: rgba(99, 102, 241, 0.05);
  border-color: rgba(99, 102, 241, 0.2);
}

.glow-icon {
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
}

.glowing-text {
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  letter-spacing: -1px;
}

.auth-btn {
  letter-spacing: 0.5px;
  text-transform: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4) !important;
}
</style>
