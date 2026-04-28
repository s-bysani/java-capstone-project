<template>
  <v-container fluid class="px-6 pb-6">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold">Team Composition</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Map engineers to their respective teams via drag and drop.</p>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-file-input
          v-model="csvFile"
          accept=".csv"
          label="Upload Members CSV"
          prepend-icon="mdi-file-delimited"
          variant="outlined"
          density="compact"
          hide-details
          @update:modelValue="handleFileUpload"
        ></v-file-input>
      </v-col>
    </v-row>

    <!-- Unassigned Pool -->
    <v-row class="pb-4">
      <v-col cols="12">
        <v-expansion-panels v-model="unassignedPanel">
          <v-expansion-panel class="glass-panel" elevation="0" rounded="xl">
            <v-expansion-panel-title class="py-4 text-h6 font-weight-bold text-white">
              <div>
                <v-icon start>mdi-account-question</v-icon> 
                Unassigned ({{ getEngineersByTeam(null).length }})
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pt-3 list-container">
            <draggable
              :list="getEngineersByTeam(null)"
              item-key="id"
              group="engineers"
              @change="onChange($event, null, 'member')"
              class="d-flex flex-wrap align-center"
              style="gap: 8px; min-height: 60px; padding-bottom: 4px;"
            >
              <template #item="{ element }">
                <v-card class="cursor-move flex-shrink-0 engineer-pill" rounded="xl" elevation="0" width="200">
                  <div class="pill-glow"></div>
                  <v-card-item class="py-1 px-2 position-relative z-1">
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex align-center">
                        <v-avatar size="28" color="primary" class="mr-2">
                          <span class="text-caption font-weight-bold">{{ element.name.charAt(0) }}</span>
                        </v-avatar>
                        <div>
                          <div class="text-caption font-weight-bold lh-sm">{{ element.name }}</div>
                          <div v-if="element.location" class="text-grey-lighten-1 d-flex align-center mt-1" style="font-size: 0.65rem; line-height: 1;">
                            <v-icon size="8" class="mr-1">mdi-map-marker</v-icon> {{ element.location }}
                          </div>
                        </div>
                      </div>
                      <v-btn icon="mdi-close-circle" variant="text" size="x-small" color="error" class="ml-1" @click.stop="deleteMember(element.id)"></v-btn>
                    </div>
                  </v-card-item>
                </v-card>
              </template>
            </draggable>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Teams -->
    <v-row class="pb-4 flex-wrap list-container">
      <v-col v-for="teamId in 6" :key="teamId" cols="12" sm="6" md="4" lg="2">
        <v-card class="glass-column d-flex flex-column drop-zone h-100" :style="`--team-color: ${getTeamColor(teamId)}`" elevation="0" rounded="lg">
          <v-card-title class="py-2 px-3 d-flex justify-space-between align-center" style="min-height: 40px;">
            <div class="d-flex align-center">
              <div class="status-dot mr-2" :style="`background-color: ${getTeamColor(teamId)}; box-shadow: 0 0 6px ${getTeamColor(teamId)}; width: 6px; height: 6px;`"></div>
              <span class="text-body-2 font-weight-bold text-white letter-spacing-1">Team {{ teamId }}</span>
            </div>
            <div class="d-flex align-center gap-1">
              <v-chip size="x-small" variant="tonal" :color="getTeamColor(teamId)" class="font-weight-bold px-2">{{ getEngineersByTeam(teamId).length + getEngineersByTeamAndRole(teamId, 'mentor').length }}</v-chip>
              <v-btn
                icon="mdi-restore"
                variant="text"
                size="x-small"
                color="grey-lighten-1"
                class="ml-1 opacity-60 hover-opacity-100"
                style="width: 22px; height: 22px;"
                @click.stop="resetTeam(teamId)"
              ></v-btn>
            </div>
          </v-card-title>
          <v-card-text class="flex-grow-1 pa-2 list-container" style="overflow: visible;">
            <!-- Mentors Zone -->
            <div class="text-overline font-weight-bold text-secondary mb-1 d-flex align-center lh-sm" style="line-height: 1;">
              <v-icon size="x-small" class="mr-1">mdi-shield-star</v-icon> Mentors
            </div>
            <draggable
              :list="getEngineersByTeamAndRole(teamId, 'mentor')"
              item-key="id"
              group="engineers"
              @change="onChange($event, teamId, 'mentor')"
              class="mb-2"
              style="min-height: 40px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 6px; padding: 2px;"
            >
              <template #item="{ element }">
                <v-card class="mb-1 cursor-move engineer-pill" rounded="pill" elevation="0" style="border: 1px solid #9C27B0">
                  <div class="pill-glow" :style="`background: linear-gradient(90deg, transparent, #9C27B033)`"></div>
                  <v-card-item class="pa-1 px-2 position-relative z-1">
                    <div class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center">
                        <v-avatar size="20" color="secondary" class="mr-2">
                          <v-icon size="12" color="white">mdi-shield-star</v-icon>
                        </v-avatar>
                        <div>
                          <div class="text-caption font-weight-bold lh-sm" style="font-size: 0.7rem !important;">{{ element.name }}</div>
                        </div>
                      </div>
                      <v-btn icon="mdi-undo-variant" variant="text" size="x-small" color="grey-lighten-1" class="ml-1" @click.stop="revertMember(element.id)" style="width: 20px; height: 20px;"></v-btn>
                    </div>
                  </v-card-item>
                </v-card>
              </template>
            </draggable>

            <!-- Members Zone -->
            <div class="text-overline font-weight-bold text-grey-lighten-1 mb-1 d-flex align-center lh-sm" style="line-height: 1;">
              <v-icon size="x-small" class="mr-1">mdi-account-group</v-icon> Members
            </div>
            <draggable
              :list="getEngineersByTeamAndRole(teamId, 'member')"
              item-key="id"
              group="engineers"
              @change="onChange($event, teamId, 'member')"
              class="h-100 min-h-100px"
              style="min-height: 60px;"
            >
              <template #item="{ element }">
                <v-card class="mb-2 cursor-move engineer-pill" rounded="xl" elevation="0">
                  <div class="pill-glow" :style="`background: linear-gradient(90deg, transparent, ${getTeamColor(teamId)}33)`"></div>
                  <v-card-item class="py-1 px-2 position-relative z-1">
                    <div class="d-flex justify-space-between align-center">
                      <div class="d-flex align-center">
                        <v-avatar size="28" :color="getTeamColor(teamId)" class="mr-2">
                          <span class="text-caption font-weight-bold text-white">{{ element.name.charAt(0) }}</span>
                        </v-avatar>
                        <div>
                          <div class="text-caption font-weight-bold lh-sm">{{ element.name }}</div>
                          <div v-if="element.location" class="text-grey-lighten-1 d-flex align-center mt-1" style="font-size: 0.65rem; line-height: 1;">
                            <v-icon size="8" class="mr-1">mdi-map-marker</v-icon> {{ element.location }}
                          </div>
                        </div>
                      </div>
                      <v-btn icon="mdi-undo-variant" variant="text" size="x-small" color="grey-lighten-1" class="ml-1" @click.stop="revertMember(element.id)" style="width: 24px; height: 24px;"></v-btn>
                    </div>
                  </v-card-item>
                </v-card>
              </template>
            </draggable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'
import Papa from 'papaparse'
import { useTrackerStore } from '../store/trackerStore'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'

const trackerStore = useTrackerStore()
const authStore = useAuthStore()
const router = useRouter()

const csvFile = ref(null)
const unassignedPanel = ref(0) // Default to open

const checkAccess = () => {
  if (authStore.isAuthReady && authStore.userRole !== 'admin') {
    router.push('/')
  }
}

// Initialize store listener
onMounted(() => {
  checkAccess()
  trackerStore.subscribeEngineers()
  if (authStore.userRole === 'admin') {
    authStore.fetchAllUsers()
  }
})

watch(() => authStore.isAuthReady, checkAccess)

const getEngineersByTeam = (teamId) => {
  return trackerStore.engineers.filter(e => e.teamId === teamId && (e.role || 'member') !== 'mentor')
}

const getEngineersByTeamAndRole = (teamId, role) => {
  return trackerStore.engineers.filter(e => e.teamId === teamId && (e.role || 'member') === role)
}

const onChange = (evt, newTeamId, role = 'member') => {
  if (evt.added) {
    trackerStore.updateEngineerTeam(evt.added.element.id, newTeamId, role)
  }
}

const deleteMember = (id) => {
  trackerStore.deleteEngineer(id)
}

const revertMember = (id) => {
  trackerStore.updateEngineerTeam(id, null, 'member')
}

const resetTeam = (teamId) => {
  const teamMembers = trackerStore.engineers.filter(e => e.teamId === teamId)
  teamMembers.forEach(e => trackerStore.updateEngineerTeam(e.id, null, 'member'))
}

const handleFileUpload = (file) => {
  if (!file) return;
  
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const parsedData = results.data.map(row => ({
        name: row.Name || row.name || 'Unknown Engineer',
        location: row.Location || row.location || '',
        email: row.Email || row.email || ''
      }));
      if (parsedData.length > 0) {
        trackerStore.addEngineersBulk(parsedData)
      }
      csvFile.value = null; // reset
    }
  });
}

const getTeamColor = (id) => {
  const colors = {
    1: '#E65D24', // Logo Orange
    2: '#006DB6', // Logo Blue
    3: '#A9B400', // Logo Green
    4: '#5AB2E6', // Logo Light Blue
    5: '#F59E0B', // Amber
    6: '#EF4444', // Red
  }
  return colors[id] || '#9E9E9E'
}
</script>

<style scoped>
.min-h-100px {
  min-height: 100px;
}
.cursor-move {
  cursor: grab;
}
.cursor-move:active {
  cursor: grabbing;
}

/* Glass Panels & Columns */
.glass-panel {
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-column {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.drop-zone {
  border: 2px dashed rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease;
}

.drop-zone:hover {
  border-color: var(--team-color) !important;
  box-shadow: inset 0 0 30px var(--team-color) !important;
  background: rgba(15, 23, 42, 0.7) !important;
}

/* Engineer Pills */
.engineer-pill {
  background: rgba(30, 41, 59, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.engineer-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px -4px rgba(0,0,0,0.4) !important;
}

.pill-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.engineer-pill:hover .pill-glow {
  opacity: 1;
}

.z-1 {
  z-index: 1;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.letter-spacing-1 {
  letter-spacing: 0.5px;
}

/* Scrollbars */
.list-container::-webkit-scrollbar {
  width: 6px;
}
.list-container::-webkit-scrollbar-track {
  background: transparent;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.table-transparent {
  background: transparent !important;
}
.table-transparent th, .table-transparent td {
  border-bottom: 1px solid rgba(255,255,255,0.05) !important;
}
</style>

<style>
/* Light Theme Overrides for TeamComposition */
.v-theme--light .glass-panel {
  background: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}
.v-theme--light .glass-column {
  background: rgba(255, 255, 255, 0.4) !important;
  border-color: rgba(0, 0, 0, 0.05) !important;
}
.v-theme--light .drop-zone {
  border-color: rgba(0, 0, 0, 0.1) !important;
}
.v-theme--light .drop-zone:hover {
  background: rgba(255, 255, 255, 0.8) !important;
}
.v-theme--light .engineer-pill {
  background: rgba(255, 255, 255, 0.9) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}
</style>
