<template>
  <v-container class="pt-6" style="max-width: 1200px;">
    <!-- Header -->
    <v-row class="mb-6 align-center">
      <v-col>
        <div class="d-flex align-center">
          <v-icon size="x-large" color="primary" class="mr-3">mdi-security</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold tracking-tight text-white mb-1">Admin Panel</h1>
            <p class="text-subtitle-1 text-grey-lighten-1 mb-0">Manage global settings, feature flags, and user roles.</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="glass-card" rounded="lg" elevation="0">
          <v-tabs v-model="tab" color="primary" align-tabs="start" class="border-b-sm" style="border-color: rgba(255,255,255,0.05) !important;">
            <v-tab value="features" class="text-caption font-weight-bold text-uppercase">
              <v-icon start size="x-small">mdi-toggle-switch</v-icon> Feature Flags
            </v-tab>
            <v-tab value="users" class="text-caption font-weight-bold text-uppercase">
              <v-icon start size="x-small">mdi-account-group</v-icon> User Management
            </v-tab>
          </v-tabs>

          <v-card-text class="pa-6">
            <v-window v-model="tab">
              
              <!-- Features Tab -->
              <v-window-item value="features">
                <v-row>
                  <v-col cols="12" md="8">
                    <h3 class="text-h6 font-weight-bold mb-4">Application Features</h3>
                    <v-list bg-color="transparent" class="pa-0">
                      
                      <!-- Email Notifications -->
                      <v-list-item class="mb-4 pa-4 glass-card rounded-lg border" style="border-color: rgba(255,255,255,0.1) !important;">
                        <template v-slot:prepend>
                          <v-avatar color="primary" variant="tonal" rounded="lg" class="mr-4">
                            <v-icon>mdi-email-outline</v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-bold text-body-1 mb-1">Email Notifications</v-list-item-title>
                        <v-list-item-subtitle class="text-caption text-grey-lighten-1" style="white-space: normal;">
                          Send automated emails on task updates and assignments (requires Firebase Extension / EmailJS setup).
                        </v-list-item-subtitle>
                        <template v-slot:append>
                          <v-switch
                            v-model="adminStore.features.emailNotifications"
                            color="success"
                            hide-details
                            inset
                            @change="toggleFeature('emailNotifications', $event.target.checked)"
                            :loading="adminStore.loading"
                          ></v-switch>
                        </template>
                      </v-list-item>

                      <!-- Sprint Management -->
                      <v-list-item class="mb-4 pa-4 glass-card rounded-lg border" style="border-color: rgba(255,255,255,0.1) !important;">
                        <template v-slot:prepend>
                          <v-avatar color="warning" variant="tonal" rounded="lg" class="mr-4">
                            <v-icon>mdi-lightning-bolt</v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-bold text-body-1 mb-1">Sprint Management</v-list-item-title>
                        <v-list-item-subtitle class="text-caption text-grey-lighten-1" style="white-space: normal;">
                          Enable the Sprints tab and sprint assignments on tasks across all team boards.
                        </v-list-item-subtitle>
                        <template v-slot:append>
                          <v-switch
                            v-model="adminStore.features.sprintManagement"
                            color="success"
                            hide-details
                            inset
                            @change="toggleFeature('sprintManagement', $event.target.checked)"
                            :loading="adminStore.loading"
                          ></v-switch>
                        </template>
                      </v-list-item>

                      <!-- Guest Access -->
                      <v-list-item class="mb-4 pa-4 glass-card rounded-lg border" style="border-color: rgba(255,255,255,0.1) !important;">
                        <template v-slot:prepend>
                          <v-avatar color="info" variant="tonal" rounded="lg" class="mr-4">
                            <v-icon>mdi-account-eye</v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-bold text-body-1 mb-1">Guest Read-Only Access</v-list-item-title>
                        <v-list-item-subtitle class="text-caption text-grey-lighten-1" style="white-space: normal;">
                          Allow users with 'guest' role to view team boards (they still cannot edit). If disabled, guests see an access denied message.
                        </v-list-item-subtitle>
                        <template v-slot:append>
                          <v-switch
                            v-model="adminStore.features.guestAccess"
                            color="success"
                            hide-details
                            inset
                            @change="toggleFeature('guestAccess', $event.target.checked)"
                            :loading="adminStore.loading"
                          ></v-switch>
                        </template>
                      </v-list-item>

                    </v-list>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Users Tab -->
              <v-window-item value="users">
                <v-row class="mb-4 align-center">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="userSearch"
                      prepend-inner-icon="mdi-magnify"
                      placeholder="Search users..."
                      variant="solo"
                      flat
                      bg-color="rgba(0,0,0,0.2)"
                      rounded="lg"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-chip color="primary" variant="flat" class="font-weight-bold">
                      Total Users: {{ filteredUsers.length }}
                    </v-chip>
                  </v-col>
                </v-row>

                <v-table class="glass-table bg-transparent" hover>
                  <thead>
                    <tr>
                      <th class="text-left text-uppercase text-caption font-weight-bold text-grey-lighten-1">User</th>
                      <th class="text-left text-uppercase text-caption font-weight-bold text-grey-lighten-1">Role</th>
                      <th class="text-left text-uppercase text-caption font-weight-bold text-grey-lighten-1">Teams</th>
                      <th class="text-left text-uppercase text-caption font-weight-bold text-grey-lighten-1">Joined</th>
                      <th class="text-center text-uppercase text-caption font-weight-bold text-grey-lighten-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="u in filteredUsers" :key="u.uid" class="border-b" style="border-color: rgba(255,255,255,0.05) !important;">
                      <td class="py-3">
                        <div class="d-flex align-center">
                          <v-avatar color="primary" size="32" class="mr-3">
                            <span class="text-caption font-weight-bold">{{ u.displayName?.charAt(0) || 'U' }}</span>
                          </v-avatar>
                          <div>
                            <div class="font-weight-bold text-body-2">{{ u.displayName }}</div>
                            <div class="text-caption text-grey-lighten-1">{{ u.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <v-select
                          v-model="u.role"
                          :items="roleOptions"
                          item-title="title"
                          item-value="value"
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="rgba(0,0,0,0.1)"
                          class="role-select min-w-150px"
                          @update:model-value="updateUserRole(u.uid, $event)"
                          :disabled="u.uid === authStore.user?.uid"
                        >
                          <template v-slot:selection="{ item }">
                            <v-chip size="small" :color="getRoleColor(item.value)" variant="flat" class="font-weight-bold w-100 justify-center">
                              {{ item.title }}
                            </v-chip>
                          </template>
                        </v-select>
                      </td>
                      <td>
                        <v-select
                          v-model="u.teamIds"
                          :items="teamOptions"
                          multiple
                          chips
                          closable-chips
                          variant="outlined"
                          density="compact"
                          hide-details
                          bg-color="rgba(0,0,0,0.1)"
                          class="team-select min-w-200px"
                          placeholder="No Teams"
                          @update:model-value="updateUserTeams(u.uid, $event)"
                          :disabled="u.role === 'admin' || u.role === 'guest'"
                        >
                          <template v-slot:chip="{ item, props }">
                            <v-chip v-bind="props" size="small" color="primary" variant="tonal" class="font-weight-bold">
                              Team {{ item.value }}
                            </v-chip>
                          </template>
                        </v-select>
                      </td>
                      <td>
                        <div class="text-caption text-grey-lighten-1">
                          {{ u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Unknown' }}
                        </div>
                      </td>
                      <td class="text-center">
                        <v-btn
                          icon="mdi-delete"
                          variant="text"
                          color="error"
                          size="small"
                          :disabled="u.uid === authStore.user?.uid"
                          @click="deleteUser(u.uid)"
                        ></v-btn>
                      </td>
                    </tr>
                    <tr v-if="filteredUsers.length === 0">
                      <td colspan="5" class="text-center py-8 text-grey-lighten-1">
                        No users found matching "{{ userSearch }}"
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-window-item>

            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" icon="mdi-close" @click="snackbar.show = false"></v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { useAdminStore } from '../store/adminStore'
import { teamsInfo } from '../data/teams'

const router = useRouter()
const authStore = useAuthStore()
const adminStore = useAdminStore()

const tab = ref('features')
const userSearch = ref('')
const snackbar = ref({ show: false, text: '', color: 'success' })

// Verify Admin Role
onMounted(async () => {
  // Wait for auth to be fully ready if not already
  if (!authStore.isAuthReady) {
    const unwatch = watch(() => authStore.isAuthReady, (ready) => {
      if (ready) {
        checkAccess()
        unwatch()
      }
    })
  } else {
    checkAccess()
  }
})

const checkAccess = () => {
  if (authStore.userRole !== 'admin') {
    router.push('/')
    return
  }
  adminStore.subscribeFeatures()
  authStore.fetchAllUsers()
}

onUnmounted(() => {
  adminStore.unsubscribeFeatures()
})

// --- Features Tab Logic ---
const toggleFeature = async (featureKey, value) => {
  try {
    await adminStore.toggleFeature(featureKey, value)
    showSnackbar(`Feature updated successfully.`, 'success')
  } catch (error) {
    console.error(error)
    showSnackbar('Failed to update feature.', 'error')
    // Revert local state
    adminStore.features[featureKey] = !value
  }
}

// --- Users Tab Logic ---
const roleOptions = [
  { title: 'Admin', value: 'admin' },
  { title: 'Mentor', value: 'mentor' },
  { title: 'Team Member', value: 'member' },
  { title: 'Guest', value: 'guest' }
]

const teamOptions = teamsInfo.map(t => t.id)

const getRoleColor = (role) => {
  switch (role) {
    case 'admin': return 'error'
    case 'mentor': return 'warning'
    case 'member': return 'success'
    case 'guest': return 'grey'
    default: return 'primary'
  }
}

const filteredUsers = computed(() => {
  let users = authStore.allUsers || []
  if (userSearch.value) {
    const query = userSearch.value.toLowerCase()
    users = users.filter(u => 
      (u.displayName && u.displayName.toLowerCase().includes(query)) ||
      (u.email && u.email.toLowerCase().includes(query))
    )
  }
  return users.sort((a, b) => {
    // Admins first
    if (a.role === 'admin' && b.role !== 'admin') return -1
    if (a.role !== 'admin' && b.role === 'admin') return 1
    return 0
  })
})

const updateUserRole = async (uid, newRole) => {
  try {
    // If role is admin or guest, they shouldn't have specific teams assigned typically, 
    // but we can leave that logic to the user. For simplicity, just update role.
    await authStore.updateUserPermissions(uid, { role: newRole })
    showSnackbar(`Role updated successfully.`, 'success')
  } catch (err) {
    showSnackbar('Failed to update role.', 'error')
  }
}

const updateUserTeams = async (uid, newTeams) => {
  try {
    await authStore.updateUserPermissions(uid, { teamIds: newTeams })
    showSnackbar(`Teams updated successfully.`, 'success')
  } catch (err) {
    showSnackbar('Failed to update teams.', 'error')
  }
}

const deleteUser = async (uid) => {
  if (!confirm('Are you sure you want to delete this user? They will be removed from the system.')) return
  try {
    await authStore.deleteUserDoc(uid)
    showSnackbar('User deleted successfully.', 'success')
  } catch (err) {
    showSnackbar('Failed to delete user.', 'error')
  }
}

const showSnackbar = (text, color = 'success') => {
  snackbar.value = { show: true, text, color }
}
</script>

<style scoped>
.glass-card {
  background: rgba(var(--v-theme-surface), 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.glass-table {
  background: transparent !important;
}
.glass-table th {
  background: rgba(0,0,0,0.2) !important;
  border-bottom: 2px solid rgba(255,255,255,0.05) !important;
}
.min-w-150px {
  min-width: 150px;
}
.min-w-200px {
  min-width: 200px;
}
</style>
