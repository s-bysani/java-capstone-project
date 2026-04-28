import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#E65D24', // Logo Orange
          secondary: '#006DB6', // Logo Dark Blue
          accent: '#A9B400', // Logo Olive Green
          background: '#121212', // Neutral dark
          surface: '#1E1E1E', // Elevated dark
          'surface-variant': '#2A2A2A',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#5AB2E6' // Logo Light Blue
        }
      },
      light: {
        colors: {
          primary: '#D34D18', // Slightly darker orange for light mode contrast
          secondary: '#005C9A', // Darker Blue for light mode
          accent: '#8A9600', // Darker Green for light mode
          background: '#F8F9FA', // Light neutral
          surface: '#FFFFFF', // White
          'surface-variant': '#E9ECEF', // Light grey
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
