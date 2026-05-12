<template>
  <v-container fluid class="px-6 pb-6 h-100 d-flex flex-column">
    <v-row class="flex-grow-0 mb-2" align="center">
      <v-col cols="12" md="6">
        <h1 class="text-h5 font-weight-bold d-flex align-center">
          Team {{ teamId }} Board
          <v-chip class="ml-3 font-weight-bold" color="primary" variant="flat" size="small">{{ teamName }}</v-chip>
        </h1>
      </v-col>
    </v-row>

    <!-- New Module Specifications Dashboard -->
    <v-row class="flex-grow-0 mb-4" v-if="teamMetaInfo">
      <v-col cols="12">
        <v-card class="glass-card mb-4 overflow-hidden" rounded="xl" elevation="0" style="position: relative;">
          <!-- Glowing background banner -->
          <div class="position-absolute top-0 left-0 w-100" style="height: 100%; opacity: 0.15; z-index: 0;" :style="`background: linear-gradient(135deg, ${teamMetaInfo.color}, transparent);`"></div>
          
          <v-card-text class="position-relative z-1 pa-6">
            <v-row>
              <!-- Left: Mission + chips -->
              <v-col cols="12" md="8">
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" :color="teamMetaInfo.color" class="mr-2">mdi-shield-check</v-icon>
                  <span class="text-caption font-weight-bold text-uppercase" :style="`color: ${teamMetaInfo.color}; letter-spacing: 0.1em;`">Team Mission</span>
                </div>
                <h2 class="text-h6 font-weight-bold text-white mb-3" style="line-height: 1.4;">{{ teamMetaInfo.mission }}</h2>
                <div class="d-flex align-center flex-wrap gap-2 text-caption">
                  <v-chip size="small" variant="flat" class="font-weight-medium text-white" style="background: rgba(0,0,0,0.35);">
                    <v-icon start size="x-small">mdi-map-marker</v-icon> {{ teamMetaInfo.city }}
                  </v-chip>
            <!--  <v-chip size="small" variant="flat" class="font-weight-medium text-white" style="background: rgba(0,0,0,0.35);">
                    <v-icon start size="x-small">mdi-account-group</v-icon> {{ teamMetaInfo.size }} Members
                  </v-chip>
                  <v-chip size="small" variant="flat" class="font-weight-medium text-white" style="background: rgba(0,0,0,0.35);">
                    <v-icon start size="x-small">mdi-account-hard-hat</v-icon> {{ teamMetaInfo.roles }}
                  </v-chip> -->
                </div>
              </v-col>
              <!-- Right: Stats -->
              <v-col cols="12" md="4" class="d-flex flex-column justify-center border-s-sm pl-md-6 mt-4 mt-md-0" style="border-color: rgba(255,255,255,0.1) !important;">
                <div class="d-flex flex-wrap gap-3">
                  <div class="bg-surface-variant pa-2 rounded text-center flex-grow-1" style="min-width: 40%;">
                    <div class="text-h5 font-weight-black text-white">{{ requirementsList.filter(r => r.priority === 'Must').length }}</div>
                    <div class="text-caption text-grey-lighten-1" style="font-size: 0.65rem !important;">Must-Haves</div>
                  </div>
                  <div class="bg-surface-variant pa-2 rounded text-center flex-grow-1" style="min-width: 40%;">
                    <div class="text-h5 font-weight-black text-white">{{ requirementsList.filter(r => r.ai).length }}</div>
                    <div class="text-caption text-grey-lighten-1" style="font-size: 0.65rem !important;">AI Features</div>
                  </div>
                  <div class="bg-surface-variant pa-2 rounded text-center flex-grow-1" style="min-width: 40%;">
                    <div class="text-h5 font-weight-black text-success">{{ teamMetaInfo.provides.length }}</div>
                    <div class="text-caption text-grey-lighten-1" style="font-size: 0.65rem !important;">Outputs</div>
                  </div>
                  <div class="bg-surface-variant pa-2 rounded text-center flex-grow-1" style="min-width: 40%;">
                    <div class="text-h5 font-weight-black text-error">{{ teamMetaInfo.needs.length }}</div>
                    <div class="text-caption text-grey-lighten-1" style="font-size: 0.65rem !important;">Inputs</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Detailed Tabs -->
        <v-card class="glass-card" rounded="lg" elevation="0">
          <v-tabs v-model="tab" color="primary" align-tabs="start" class="border-b-sm" style="border-color: rgba(255,255,255,0.05) !important;">
            <v-tab value="board" class="text-caption font-weight-bold text-uppercase">
              <v-icon start size="x-small">mdi-view-kanban</v-icon> Task Board
            </v-tab>
            <v-tab value="iterations" class="text-caption font-weight-bold text-uppercase">
              <v-icon start size="x-small">mdi-lightning-bolt</v-icon> Sprints
              <v-chip size="x-small" color="warning" variant="flat" class="ml-2 font-weight-bold" style="height: 16px; font-size: 0.6rem;">{{ teamIterations.length }}</v-chip>
            </v-tab>
            <v-tab value="deliverables" class="text-caption font-weight-bold text-uppercase">Deliverables</v-tab>
            <v-tab value="dependencies" class="text-caption font-weight-bold text-uppercase">Dependencies</v-tab>
            <v-tab value="data" class="text-caption font-weight-bold text-uppercase">Data &amp; Integrations</v-tab>
            <v-tab value="requirements" class="text-caption font-weight-bold text-uppercase">Requirements</v-tab>
            <v-tab value="roster" class="text-caption font-weight-bold text-uppercase">Team Roster</v-tab>
            <v-tab value="mockup" class="text-caption font-weight-bold text-uppercase">Module Preview</v-tab>
            <v-tab value="glossary" class="text-caption font-weight-bold text-uppercase">
              <v-icon start size="x-small">mdi-book-open-variant</v-icon> Glossary
              <v-chip size="x-small" color="primary" variant="flat" class="ml-2 font-weight-bold" style="height: 16px; font-size: 0.6rem;">{{ glossaryList.length }}</v-chip>
            </v-tab>
          </v-tabs>

          <v-card-text class="pa-0">
            <v-window v-model="tab">

              <!-- Board Tab (Task Tracker) -->
              <v-window-item value="board" class="pa-0">
                <div class="d-flex flex-column" style="min-height: 520px;">

                  <!-- Active Sprint Banner -->
                  <div v-if="activeIteration" class="pa-3 pb-0">
                    <v-card class="pa-3 sprint-banner" elevation="0" rounded="lg">
                      <div class="d-flex align-center flex-wrap gap-2">
                        <v-chip size="small" color="warning" variant="flat" class="font-weight-bold">
                          <v-icon start size="x-small">mdi-lightning-bolt</v-icon>
                          W{{ activeIteration.weekNumber }}
                        </v-chip>
                        <span class="text-body-2 font-weight-bold text-white">{{ activeIteration.name }}</span>
                        <span class="text-caption text-grey-lighten-1">{{ activeIteration.goal }}</span>
                        <v-spacer></v-spacer>
                        <div class="d-flex align-center gap-2 text-caption text-grey-lighten-1">
                          <v-icon size="x-small">mdi-calendar-range</v-icon>
                          {{ activeIteration.startDate }} &rarr; {{ activeIteration.endDate }}
                        </div>
                        <div class="d-flex align-center gap-1">
                          <span class="text-caption text-success font-weight-bold">{{ sprintDoneTasks }} done</span>
                          <span class="text-caption text-grey-lighten-1">/ {{ sprintTotalTasks }} tasks</span>
                        </div>
                        <v-progress-linear :model-value="sprintProgress" color="success" bg-color="rgba(255,255,255,0.1)" rounded height="6" style="width: 100px;"></v-progress-linear>
                      </div>
                    </v-card>
                  </div>

                  <!-- Sprint Filter + Add Task toolbar -->
                  <div class="px-3 pt-3 d-flex align-center flex-wrap gap-2">
                    <v-icon size="small" color="grey-lighten-1">mdi-filter-variant</v-icon>
                    <v-chip size="small" :variant="sprintFilter === null ? 'flat' : 'outlined'" :color="sprintFilter === null ? 'primary' : 'grey-lighten-1'" @click="sprintFilter = null" class="font-weight-bold">All</v-chip>
                    <v-chip size="small" :variant="sprintFilter === 'unassigned' ? 'flat' : 'outlined'" :color="sprintFilter === 'unassigned' ? 'grey' : 'grey-lighten-1'" @click="sprintFilter = 'unassigned'" class="font-weight-bold">Backlog</v-chip>
                    <v-chip v-for="iter in teamIterations" :key="iter.id" size="small" :variant="sprintFilter === iter.id ? 'flat' : 'outlined'" :color="sprintFilter === iter.id ? 'warning' : 'grey-lighten-1'" @click="sprintFilter = sprintFilter === iter.id ? null : iter.id" class="font-weight-bold">
                      <v-icon start size="x-small">mdi-lightning-bolt</v-icon> W{{ iter.weekNumber }}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn v-if="isAuthorized" color="primary" prepend-icon="mdi-plus" rounded="pill" elevation="2" class="font-weight-bold" size="small" @click="dialog = true">Add Task</v-btn>
                  </div>

                  <!-- Kanban Columns -->
                  <div class="d-flex flex-nowrap overflow-x-auto pa-3 align-stretch" style="min-height: 420px; gap: 12px;">
                    <div v-for="column in columns" :key="column.id" style="min-width: 250px; flex: 1;">
                      <v-card class="glass-column h-100 d-flex flex-column" elevation="0" rounded="lg">
                        <v-card-title class="py-2 px-3 d-flex justify-space-between align-center border-b" :class="`border-${column.color}`" style="border-bottom-width: 2px !important; border-bottom-color: rgba(255,255,255,0.1) !important; min-height: 40px;">
                          <div class="d-flex align-center">
                            <div class="status-dot mr-2" :class="`bg-${column.color}`" style="width: 6px; height: 6px;"></div>
                            <span class="text-body-2 font-weight-bold text-white letter-spacing-1">{{ column.title }}</span>
                          </div>
                          <v-chip size="x-small" variant="tonal" :color="column.color" class="font-weight-bold px-2">{{ getTasksByColumn(column.id).length }}</v-chip>
                        </v-card-title>
                        <v-card-text class="flex-grow-1 overflow-y-auto pa-2 list-container">
                          <draggable :list="getTasksByColumn(column.id)" item-key="id" group="tasks" :disabled="!isAuthorized" @change="onChange($event, column.id)" class="h-100 min-h-150px">
                            <template #item="{ element }">
                              <v-card class="mb-2 cursor-move task-card" elevation="0" @click="openTaskDetails(element)" rounded="md">
                                <div class="task-priority-bar" :style="`background-color: ${getPriorityColor(element.priority)}`"></div>
                                <v-card-item class="pa-3">
                                  <v-card-title class="text-body-2 font-weight-bold text-wrap lh-1-2 mb-1 d-flex justify-space-between align-start" style="line-height: 1.2;">
                                    <span class="mr-2">{{ element.title }}</span>
                                    <v-btn v-if="isAuthorized" icon="mdi-delete" variant="text" size="x-small" color="error" class="mt-n1 mr-n2 opacity-60 hover-opacity-100" @click.stop="trackerStore.deleteTask(element.id)" style="width: 20px; height: 20px;"></v-btn>
                                  </v-card-title>
                                  <v-card-subtitle class="text-caption d-flex align-center mt-2 flex-wrap" style="font-size: 0.7rem !important;">
                                    <div class="d-flex align-center mr-2 mb-1 bg-surface-variant px-1 py-0 rounded" style="font-size: 0.65rem;">
                                      <v-icon size="x-small" class="mr-1" style="font-size: 10px;">mdi-account</v-icon>
                                      <span class="font-weight-medium text-white">{{ element.assignee || 'Unassigned' }}</span>
                                    </div>
                                    <v-chip size="x-small" :color="getPriorityColor(element.priority)" variant="flat" class="mr-1 mb-1 font-weight-bold" style="font-size: 0.6rem; height: 16px;">{{ element.priority }}</v-chip>
                                    <v-chip v-if="element.storyPoints" size="x-small" color="secondary" variant="flat" class="mr-1 mb-1 font-weight-bold" style="font-size: 0.6rem; height: 16px;">
                                      <v-icon start size="x-small" style="font-size: 8px;">mdi-star</v-icon>{{ element.storyPoints }}
                                    </v-chip>
                                    <v-chip v-if="element.iterationId" size="x-small" color="warning" variant="tonal" class="mr-1 mb-1 font-weight-bold" style="font-size: 0.6rem; height: 16px;">
                                      <v-icon start size="x-small" style="font-size: 8px;">mdi-lightning-bolt</v-icon>
                                      W{{ getIterationWeek(element.iterationId) }}
                                    </v-chip>
                                    <v-spacer></v-spacer>
                                    <div v-if="element.comments && element.comments.length > 0" class="d-flex align-center text-secondary mb-1 font-weight-bold" style="font-size: 0.65rem;">
                                      <v-icon size="x-small" class="mr-1" style="font-size: 10px;">mdi-comment-text-multiple</v-icon>
                                      {{ element.comments.length }}
                                    </div>
                                  </v-card-subtitle>
                                </v-card-item>
                              </v-card>
                            </template>
                          </draggable>
                        </v-card-text>
                      </v-card>
                    </div>
                  </div>

                </div>
              </v-window-item>

              <!-- Deliverables Tab -->
              <v-window-item value="deliverables" class="pa-4">

                <v-row>
                  <v-col cols="12" sm="3" md="2">
                    <v-tabs v-model="weekTab" direction="vertical" color="primary">
                      <v-tab v-for="d in deliverablesList" :key="d.week" :value="d.week" class="justify-start px-3 py-2">
                        <span class="font-weight-bold">Week {{ d.week }}</span>
                      </v-tab>
                    </v-tabs>
                  </v-col>
                  <v-col cols="12" sm="9" md="10">
                    <v-window v-model="weekTab">
                      <v-window-item v-for="d in deliverablesList" :key="d.week" :value="d.week">
                        <v-list bg-color="transparent" density="compact">
                          <v-list-item v-for="(item, i) in d.items" :key="i" class="mb-2 px-0">
                            <template v-slot:prepend>
                              <v-icon color="success" size="small" class="mr-3 mt-1 align-self-start">mdi-check-circle-outline</v-icon>
                            </template>
                            <v-list-item-title class="text-body-2 text-white text-wrap" style="line-height: 1.4;">{{ item }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-window-item>
                    </v-window>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Dependencies Tab -->
              <v-window-item value="dependencies" class="pa-6">
                <div class="data-flow-container d-flex flex-column flex-md-row align-stretch justify-center w-100 position-relative" style="min-height: 300px; gap: 24px;">
                  
                  <!-- Left: Inputs -->
                  <div class="flow-column d-flex flex-column justify-center" style="flex: 1; z-index: 2;">
                    <div class="text-overline text-error font-weight-bold mb-4 text-center">
                      <v-icon size="small" class="mr-1">mdi-import</v-icon> Inputs (Needs)
                    </div>
                    <v-card v-for="(n, i) in teamMetaInfo.needs" :key="i" class="mb-3 pa-3 glass-card-dark position-relative node-card input-node" elevation="0" style="border-right: 3px solid var(--v-error-base, #f44336);">
                      <div class="text-caption font-weight-bold text-error mb-1 d-flex align-center">
                        <v-icon size="x-small" class="mr-1">mdi-arrow-right-bottom</v-icon> {{ n.from }}
                      </div>
                      <div class="text-body-2 text-white lh-sm" style="font-size: 0.8rem;">{{ n.what }}</div>
                    </v-card>
                    <div v-if="!teamMetaInfo.needs?.length" class="text-center text-grey-lighten-1 text-caption pa-4 border-dashed rounded-lg" style="border-color: rgba(255,255,255,0.1) !important;">No dependencies</div>
                  </div>

                  <!-- Flow Arrows Left -> Center -->
                  <div class="flow-connector hidden-sm-and-down d-flex flex-column justify-center align-center position-relative" style="width: 60px;">
                    <div class="flow-animated-line left-line"></div>
                    <v-icon color="error" class="position-absolute" style="right: -8px;">mdi-chevron-right</v-icon>
                  </div>

                  <!-- Center: Focal Team -->
                  <div class="flow-column d-flex flex-column justify-center align-center" style="flex: 0 0 auto; width: 220px; z-index: 3;">
                    <div class="focal-node-glow" :style="`background: ${teamMetaInfo.color};`"></div>
                    <v-card class="pa-5 w-100 text-center glass-card focal-node" :style="`border: 2px solid ${teamMetaInfo.color}; border-radius: 20px;`" elevation="10">
                      <v-avatar :color="teamMetaInfo.color" size="56" class="mb-3 elevation-4">
                        <v-icon size="large" color="white">mdi-shield-check</v-icon>
                      </v-avatar>
                      <h3 class="text-subtitle-1 font-weight-bold text-white lh-sm mb-1">Team {{ teamId }}</h3>
                      <v-chip size="x-small" variant="flat" :color="teamMetaInfo.color" class="font-weight-bold px-2">Core Processor</v-chip>
                    </v-card>
                  </div>

                  <!-- Flow Arrows Center -> Right -->
                  <div class="flow-connector hidden-sm-and-down d-flex flex-column justify-center align-center position-relative" style="width: 60px;">
                    <div class="flow-animated-line right-line"></div>
                    <v-icon color="success" class="position-absolute" style="right: -8px;">mdi-chevron-right</v-icon>
                  </div>

                  <!-- Right: Outputs -->
                  <div class="flow-column d-flex flex-column justify-center" style="flex: 1; z-index: 2;">
                    <div class="text-overline text-success font-weight-bold mb-4 text-center">
                      Outputs (Provides) <v-icon size="small" class="ml-1">mdi-export</v-icon>
                    </div>
                    <v-card v-for="(p, i) in teamMetaInfo.provides" :key="i" class="mb-3 pa-3 glass-card-dark position-relative node-card output-node" elevation="0" style="border-left: 3px solid var(--v-success-base, #4CAF50);">
                      <div class="text-caption font-weight-bold text-success mb-1 d-flex align-center">
                        {{ p.to }} <v-icon size="x-small" class="ml-1">mdi-arrow-top-right</v-icon>
                      </div>
                      <div class="text-body-2 text-white lh-sm" style="font-size: 0.8rem;">{{ p.what }}</div>
                    </v-card>
                    <div v-if="!teamMetaInfo.provides?.length" class="text-center text-grey-lighten-1 text-caption pa-4 border-dashed rounded-lg" style="border-color: rgba(255,255,255,0.1) !important;">No outputs</div>
                  </div>
                  
                </div>
              </v-window-item>

              <!-- Data & Integrations Tab -->
              <v-window-item value="data" class="pa-4">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="info" size="small" class="mr-2">mdi-database</v-icon>
                      <h3 class="text-subtitle-2 font-weight-bold text-info text-uppercase">Owned Data Entities</h3>
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip v-for="e in teamMetaInfo.entities" :key="e" color="info" variant="tonal" class="font-weight-bold">
                        <v-icon start size="small">mdi-table</v-icon>{{ e }}
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center mb-3 mt-4 mt-md-0">
                      <v-icon color="warning" size="small" class="mr-2">mdi-api</v-icon>
                      <h3 class="text-subtitle-2 font-weight-bold text-warning text-uppercase">External Integrations</h3>
                    </div>
                    <v-list bg-color="transparent" density="compact" class="pa-0">
                      <v-list-item v-for="int in teamMetaInfo.integrations" :key="int" class="px-0 min-h-0 mb-2">
                        <template v-slot:prepend>
                          <v-icon color="warning" size="small" class="mr-3 mt-1 align-self-start">mdi-connection</v-icon>
                        </template>
                        <v-list-item-title class="text-body-2 text-grey-lighten-1 text-wrap" style="line-height: 1.4;">{{ int }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Requirements Tab -->
              <v-window-item value="requirements" class="pa-0">
                <div class="bg-surface-variant pa-2 d-flex align-center flex-wrap gap-2 border-b-sm" style="border-color: rgba(255,255,255,0.05) !important;">
                  <span class="text-caption font-weight-bold text-grey-lighten-1 ml-2 mr-2">Filter:</span>
                  <v-chip size="small" :variant="reqFilter === 'All' ? 'flat' : 'outlined'" :color="reqFilter === 'All' ? 'primary' : 'grey-lighten-1'" @click="reqFilter = 'All'">All</v-chip>
                  <v-chip size="small" :variant="reqFilter === 'Must' ? 'flat' : 'outlined'" :color="reqFilter === 'Must' ? 'error' : 'grey-lighten-1'" @click="reqFilter = 'Must'">Must-Have</v-chip>
                  <v-chip size="small" :variant="reqFilter === 'Should' ? 'flat' : 'outlined'" :color="reqFilter === 'Should' ? 'warning' : 'grey-lighten-1'" @click="reqFilter = 'Should'">Should-Have</v-chip>
                  <v-chip size="small" :variant="reqFilter === 'AI' ? 'flat' : 'outlined'" :color="reqFilter === 'AI' ? 'secondary' : 'grey-lighten-1'" @click="reqFilter = 'AI'">
                    <v-icon start size="x-small">mdi-brain</v-icon> AI Features
                  </v-chip>
                </div>
                <div class="pa-4 overflow-y-auto list-container" style="max-height: 400px;">
                  <v-card v-for="r in filteredRequirements" :key="r.id" class="mb-3 glass-card-dark" rounded="lg" elevation="0" :style="`border-left: 3px solid ${r.priority === 'Must' ? 'var(--v-error-base, #f44336)' : 'var(--v-warning-base, #ff9800)'}`">
                    <v-card-text class="pa-3">
                      <div class="d-flex align-start">
                        <div class="flex-grow-1">
                          <div class="d-flex align-center flex-wrap gap-2 mb-2">
                            <span class="text-caption font-weight-black text-uppercase text-white" style="letter-spacing: 0.5px;">{{ r.id }}</span>
                            <v-chip size="x-small" :color="r.priority === 'Must' ? 'error' : 'warning'" variant="flat" class="font-weight-bold px-2" style="height: 18px; font-size: 0.6rem;">{{ r.priority }}</v-chip>
                            <v-chip v-if="r.ai" size="x-small" color="accent" variant="flat" class="font-weight-bold px-2" style="height: 18px; font-size: 0.6rem;">
                              <v-icon start size="x-small" style="font-size: 8px;">mdi-brain</v-icon> AI
                            </v-chip>
                          </div>
                          <p class="text-body-2 text-grey-lighten-1 mb-0" style="line-height: 1.5;">{{ r.text }}</p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                  <div v-if="filteredRequirements.length === 0" class="text-center pa-4 text-grey-lighten-1 text-body-2">
                    No requirements match the selected filter.
                  </div>
                </div>
              </v-window-item>

              <!-- Team Roster Tab -->
              <v-window-item value="roster" class="pa-4">
                <v-row>
                  <!-- Mentors Section -->
                  <v-col cols="12" md="4">
                    <div class="d-flex align-center mb-3">
                      <v-icon color="secondary" size="small" class="mr-2">mdi-shield-star</v-icon>
                      <h3 class="text-subtitle-2 font-weight-bold text-secondary text-uppercase">Mentors</h3>
                    </div>
                    <v-card v-for="mentor in rosterMentors" :key="mentor.id" class="mb-2 pa-3 glass-card-dark" elevation="0" style="border: 1px solid rgba(156, 39, 176, 0.3);">
                      <div class="d-flex align-center">
                        <v-avatar size="32" color="secondary" class="mr-3">
                          <v-icon size="16" color="white">mdi-shield-star</v-icon>
                        </v-avatar>
                        <div>
                          <div class="text-body-2 font-weight-bold text-white">{{ mentor.name }}</div>
                          <div v-if="mentor.location" class="text-grey-lighten-1 d-flex align-center mt-1" style="font-size: 0.65rem; line-height: 1;">
                            <v-icon size="8" class="mr-1">mdi-map-marker</v-icon> {{ mentor.location }}
                          </div>
                        </div>
                      </div>
                    </v-card>
                    <div v-if="!rosterMentors.length" class="text-caption text-grey-lighten-1 mb-4 pa-3 border-dashed rounded-lg" style="border-color: rgba(255,255,255,0.1) !important;">
                      No mentors assigned.
                    </div>
                  </v-col>

                  <!-- Engineers Section -->
                  <v-col cols="12" md="8">
                    <div class="d-flex align-center mb-3">
                      <v-icon :color="teamMetaInfo.color" size="small" class="mr-2">mdi-account-group</v-icon>
                      <h3 class="text-subtitle-2 font-weight-bold text-uppercase" :style="`color: ${teamMetaInfo.color};`">Engineers</h3>
                    </div>
                    <v-row dense>
                      <v-col v-for="member in rosterEngineers" :key="member.id" cols="12" sm="6" md="4">
                        <v-card class="pa-2 h-100" rounded="lg" elevation="0" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);">
                          <div class="d-flex align-center">
                            <v-avatar size="32" :color="teamMetaInfo.color" class="mr-3 flex-shrink-0">
                              <span class="text-caption font-weight-bold text-white">{{ member.name.charAt(0) }}</span>
                            </v-avatar>
                            <div class="overflow-hidden">
                              <div class="text-body-2 font-weight-bold text-white lh-sm text-truncate">{{ member.name }}</div>
                              <div v-if="member.location" class="text-grey-lighten-1 d-flex align-center mt-1" style="font-size: 0.65rem; line-height: 1;">
                                <v-icon size="8" class="mr-1">mdi-map-marker</v-icon> {{ member.location }}
                              </div>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                    <div v-if="!rosterEngineers.length" class="text-caption text-grey-lighten-1 mb-4 pa-3 border-dashed rounded-lg" style="border-color: rgba(255,255,255,0.1) !important;">
                      No engineers assigned.
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>

              <!-- Module Preview Tab -->
              <v-window-item value="mockup" class="pa-4">
                <div class="d-flex align-center mb-3">
                  <v-icon :color="teamMetaInfo.color" size="small" class="mr-2">mdi-monitor-screenshot</v-icon>
                  <h3 class="text-subtitle-2 font-weight-bold text-uppercase" :style="`color: ${teamMetaInfo.color};`">Module UI Mockup</h3>
                  <v-chip size="x-small" color="grey" variant="outlined" class="ml-3">Reference Design</v-chip>
                </div>
                <v-img
                  :src="`/java-capstone-project/images/mockups/t${teamId}.png`"
                  :alt="`Team ${teamId} module mockup`"
                  contain
                  class="w-100 rounded-lg"
                  style="width: 100%; aspect-ratio: 16/10; object-fit: contain;"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height" style="min-height: 300px;">
                      <div class="text-center">
                        <v-progress-circular :color="teamMetaInfo.color" indeterminate size="48" class="mb-4"></v-progress-circular>
                        <div class="text-caption text-grey">Loading mockup...</div>
                      </div>
                    </div>
                  </template>
                  <template v-slot:error>
                    <div class="d-flex align-center justify-center fill-height" style="min-height: 300px;">
                      <div class="text-center">
                        <v-icon color="grey" size="48" class="mb-3">mdi-image-off-outline</v-icon>
                        <div class="text-caption text-grey">Mockup not available</div>
                      </div>
                    </div>
                  </template>
                </v-img>
                <div class="text-caption text-grey-lighten-2 mt-2 text-center">
                  <v-icon size="x-small" class="mr-1">mdi-information-outline</v-icon>
                  Reference UI mockup for Team {{ teamId }} — {{ teamName }}
                </div>
              </v-window-item>

              <!-- Glossary Tab -->
              <v-window-item value="glossary" class="pa-0">
                <!-- Search + Filter Bar -->
                <div class="bg-surface-variant pa-3 d-flex align-center flex-wrap gap-2 border-b-sm" style="border-color: rgba(255,255,255,0.05) !important;">
                  <v-text-field
                    v-model="glossarySearch"
                    placeholder="Search terms or definitions..."
                    variant="solo" flat
                    density="compact"
                    bg-color="rgba(0,0,0,0.2)"
                    rounded="lg"
                    hide-details
                    clearable
                    class="modern-select flex-grow-1"
                    style="min-width: 200px; max-width: 320px;"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon size="small" color="grey-lighten-1" class="mr-1">mdi-magnify</v-icon>
                    </template>
                  </v-text-field>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip
                      v-for="cat in glossaryCategories"
                      :key="cat"
                      size="small"
                      :variant="glossaryCatFilter === cat ? 'flat' : 'outlined'"
                      :color="glossaryCatFilter === cat ? glossaryCategoryColor(cat) : 'grey-lighten-1'"
                      @click="glossaryCatFilter = glossaryCatFilter === cat ? null : cat"
                      class="font-weight-bold"
                    >{{ cat }}</v-chip>
                  </div>
                  <v-spacer></v-spacer>
                  <span class="text-caption text-grey-lighten-1 mr-2">{{ filteredGlossary.length }} terms</span>
                </div>

                <!-- Glossary Cards Grid -->
                <div class="pa-4 overflow-y-auto list-container" style="max-height: 440px;">
                  <v-row dense>
                    <v-col
                      v-for="entry in filteredGlossary"
                      :key="entry.term"
                      cols="12" sm="6" md="4"
                    >
                      <v-card
                        class="glossary-card h-100"
                        elevation="0"
                        rounded="lg"
                        :style="`border-left: 3px solid ${glossaryCategoryColorHex(entry.category)};`"
                      >
                        <v-card-text class="pa-3">
                          <div class="d-flex align-start justify-space-between mb-1">
                            <span class="text-body-2 font-weight-black text-white" style="letter-spacing: 0.3px; line-height: 1.2;">{{ entry.term }}</span>
                            <v-chip
                              size="x-small"
                              :color="glossaryCategoryColor(entry.category)"
                              variant="tonal"
                              class="ml-2 flex-shrink-0 font-weight-bold"
                              style="height: 18px; font-size: 0.58rem;"
                            >{{ entry.category }}</v-chip>
                          </div>
                          <p class="text-caption text-grey-lighten-1 mb-0" style="line-height: 1.5;">{{ entry.definition }}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <div v-if="filteredGlossary.length === 0" class="text-center pa-8 text-grey-lighten-1">
                    <v-icon size="48" color="grey-darken-1" class="mb-3">mdi-book-search-outline</v-icon>
                    <div class="text-body-2">No matching terms found.</div>
                  </div>
                </div>
              </v-window-item>

              <!-- Iterations Tab -->
              <v-window-item value="iterations" class="pa-0">
                <!-- Header toolbar -->
                <div class="bg-surface-variant pa-3 d-flex align-center flex-wrap gap-2 border-b-sm" style="border-color: rgba(255,255,255,0.05) !important;">
                  <v-icon size="small" color="warning">mdi-lightning-bolt</v-icon>
                  <span class="text-caption font-weight-bold text-uppercase text-grey-lighten-1">Sprint Management</span>
                  <v-spacer></v-spacer>
                  <v-btn v-if="isAuthorized" size="small" color="warning" variant="tonal" rounded="pill" prepend-icon="mdi-plus" @click="iterDialog = true" class="font-weight-bold">New Sprint</v-btn>
                </div>

                <!-- Sprint cards -->
                <div class="pa-4 overflow-y-auto list-container" style="max-height: 440px;">
                  <v-row dense v-if="teamIterations.length > 0">
                    <v-col v-for="iter in teamIterations" :key="iter.id" cols="12" md="6">
                      <v-card class="iteration-card h-100" elevation="0" rounded="lg"
                        :style="`border-left: 3px solid ${iterStatusColor(iter.status)};`"
                      >
                        <v-card-text class="pa-4">
                          <div class="d-flex align-center justify-space-between mb-2">
                            <div class="d-flex align-center gap-2">
                              <v-chip size="x-small" color="warning" variant="flat" class="font-weight-black">W{{ iter.weekNumber }}</v-chip>
                              <span class="text-body-2 font-weight-bold text-white">{{ iter.name }}</span>
                            </div>
                            <div class="d-flex align-center gap-1">
                              <v-chip size="x-small" :color="iterStatusChipColor(iter.status)" variant="tonal" class="font-weight-bold">{{ iterStatusLabel(iter.status) }}</v-chip>
                              <template v-if="isAuthorized">
                                <v-btn icon="mdi-pencil" size="x-small" variant="text" color="grey-lighten-1" @click="openEditIter(iter)"></v-btn>
                                <v-btn icon="mdi-delete" size="x-small" variant="text" color="error" @click="trackerStore.deleteIteration(iter.id)"></v-btn>
                              </template>
                            </div>
                          </div>
                          <p class="text-caption text-grey-lighten-1 mb-3" style="line-height: 1.5;">{{ iter.goal }}</p>
                          <div class="d-flex align-center justify-space-between text-caption text-grey-lighten-1 mb-3">
                            <span><v-icon size="x-small" class="mr-1">mdi-calendar-start</v-icon>{{ iter.startDate }}</span>
                            <span><v-icon size="x-small" class="mr-1">mdi-calendar-end</v-icon>{{ iter.endDate }}</span>
                          </div>
                          <!-- Task progress -->
                          <div class="d-flex align-center justify-space-between text-caption mb-1">
                            <span class="text-grey-lighten-1">{{ iterTasksDone(iter.id) }} / {{ iterTasksTotal(iter.id) }} tasks done</span>
                            <span class="text-success font-weight-bold">{{ iterProgress(iter.id) }}%</span>
                          </div>
                          <v-progress-linear :model-value="iterProgress(iter.id)" color="success" bg-color="rgba(255,255,255,0.1)" rounded height="4"></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <div v-else class="text-center pa-8 text-grey-lighten-1">
                    <v-icon size="48" color="grey-darken-1" class="mb-3">mdi-lightning-bolt-outline</v-icon>
                    <div class="text-body-2 mb-2">No sprints yet.</div>
                    <v-btn v-if="isAuthorized" size="small" color="warning" variant="tonal" rounded="pill" prepend-icon="mdi-plus" @click="iterDialog = true">Create First Sprint</v-btn>
                  </div>
                </div>
              </v-window-item>

            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Board Columns -->
    <!-- Dialogs are kept outside tabs -->

    <!-- Add Task Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card rounded="xl" class="glass-dialog">
        <v-card-title class="text-h5 pa-6 font-weight-bold d-flex align-center border-b" style="border-color: rgba(255,255,255,0.1) !important;">
          <v-icon color="primary" class="mr-3">mdi-plus-box</v-icon> Create New Task
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form ref="form" v-model="valid" @submit.prevent="submitTask">
            <v-text-field
              v-model="newTask.title"
              label="Task Title"
              variant="solo" flat
              bg-color="rgba(0,0,0,0.2)"
              rounded="lg"
              color="primary"
              :rules="[v => !!v || 'Title is required']"
              required
              class="mb-2"
            ></v-text-field>
            
            <v-textarea
              v-model="newTask.description"
              label="Description"
              variant="solo" flat
              bg-color="rgba(0,0,0,0.2)"
              rounded="lg"
              color="primary"
              rows="3"
              auto-grow
              class="mb-2 modern-textarea"
            ></v-textarea>
            
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="newTask.assignee"
                  :items="teamMembers"
                  item-title="name"
                  item-value="name"
                  label="Assignee"
                  variant="solo" flat
                  bg-color="rgba(0,0,0,0.2)"
                  rounded="lg"
                  color="primary"
                  clearable
                  class="modern-select"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="newTask.priority"
                  :items="['Low', 'Medium', 'High', 'Critical']"
                  label="Priority"
                  variant="solo" flat
                  bg-color="rgba(0,0,0,0.2)"
                  rounded="lg"
                  color="primary"
                  required
                  class="modern-select"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="newTask.storyPoints"
                  label="Story Points"
                  type="number"
                  variant="solo" flat
                  bg-color="rgba(0,0,0,0.2)"
                  rounded="lg"
                  color="secondary"
                  min="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="newTask.iterationId"
                  :items="iterationSelectItems"
                  item-title="label"
                  item-value="id"
                  label="Sprint (optional)"
                  variant="solo" flat
                  bg-color="rgba(0,0,0,0.2)"
                  rounded="lg"
                  color="warning"
                  clearable
                  class="modern-select"
                  prepend-inner-icon="mdi-lightning-bolt"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="grey-lighten-1" variant="text" rounded="pill" @click="dialog = false" class="px-4">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" rounded="pill" @click="submitTask" :disabled="!valid" class="px-6 font-weight-bold">Create Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Task Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="1200px" scrollable>
      <v-card rounded="xl" v-if="selectedTask" class="d-flex flex-column h-100 glass-dialog" style="max-height: 90vh;">
        <v-card-title class="pa-6 d-flex justify-space-between align-start border-b" style="border-color: rgba(255,255,255,0.05) !important;">
          <div class="flex-grow-1 mr-6">
            <div class="text-caption text-secondary font-weight-bold text-uppercase tracking-wide mb-1">Task-{{ selectedTask.id.toUpperCase() }}</div>
            <v-text-field
              v-model="editedTask.title"
              variant="plain"
              hide-details
              :readonly="!isAuthorized"
              class="text-h4 font-weight-bold task-title-input"
              @change="saveTaskDetails"
              placeholder="Task Title"
            ></v-text-field>
          </div>
          <v-btn icon="mdi-close" variant="tonal" color="grey" size="small" @click="closeTaskDetails"></v-btn>
        </v-card-title>
        
        <v-card-text class="pa-0 flex-grow-1 overflow-hidden d-flex flex-column flex-md-row">
          <!-- Main Content Area -->
          <div class="flex-grow-1 pa-6 overflow-y-auto list-container">
            <h3 class="text-h6 font-weight-bold mb-4 d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon> Description
            </h3>
            <v-textarea
              v-model="editedTask.description"
              variant="solo" flat
              bg-color="rgba(0,0,0,0.2)"
              rounded="lg"
              rows="4"
              auto-grow
              :readonly="!isAuthorized"
              hide-details
              class="mb-8 modern-textarea"
              placeholder="Add a more detailed description..."
              @change="saveTaskDetails"
            ></v-textarea>

            <v-divider class="mb-8 opacity-20"></v-divider>

            <h3 class="text-h6 font-weight-bold mb-6 d-flex align-center">
              <v-icon class="mr-2" color="secondary">mdi-forum</v-icon> Discussion
            </h3>
            
            <div class="comments-list mb-6">
              <v-card v-for="comment in selectedTask.comments" :key="comment.id" variant="flat" color="transparent" class="mb-6">
                <div class="d-flex">
                  <v-avatar size="36" color="primary" class="mr-4 mt-1 font-weight-bold text-subtitle-2 elevation-2">
                    {{ comment.author.charAt(0).toUpperCase() }}
                  </v-avatar>
                  <div class="flex-grow-1">
                    <div class="d-flex justify-space-between align-center mb-1">
                      <div class="d-flex align-center">
                        <strong class="text-white mr-3">{{ comment.author }}</strong>
                        <v-chip v-if="isMentor(comment.author)" size="x-small" color="secondary" variant="flat" class="mr-3 px-1 font-weight-bold tracking-wide" style="height: 18px; font-size: 10px;">
                          <v-icon start size="10" class="mr-1">mdi-shield-star</v-icon>MENTOR
                        </v-chip>
                        <span class="text-caption text-grey-lighten-1">{{ new Date(comment.timestamp).toLocaleString() }}</span>
                      </div>
                      <div class="comment-actions">
                        <v-btn v-if="isAuthorized || authStore.user?.displayName === comment.author" icon="mdi-pencil" variant="text" size="x-small" color="grey-lighten-1" class="hover-primary mr-1" @click="startEditComment(comment)"></v-btn>
                        <v-btn v-if="isAuthorized || authStore.user?.displayName === comment.author" icon="mdi-delete" variant="text" size="x-small" color="error" class="opacity-60 hover-opacity-100" @click="trackerStore.deleteTaskComment(selectedTask.id, comment.id)"></v-btn>
                      </div>
                    </div>
                    
                    <div v-if="editingCommentId === comment.id" class="mt-2">
                      <v-textarea
                        v-model="editingCommentText"
                        variant="solo" flat
                        bg-color="rgba(0,0,0,0.2)"
                        rounded="lg"
                        rows="2"
                        auto-grow
                        hide-details
                        class="mb-3 modern-textarea"
                      ></v-textarea>
                      <div class="text-right">
                        <v-btn color="grey" variant="text" size="small" class="mr-2" rounded="pill" @click="editingCommentId = null">Cancel</v-btn>
                        <v-btn color="primary" size="small" rounded="pill" @click="saveEditComment(comment.id)">Save</v-btn>
                      </div>
                    </div>
                    
                    <v-card v-else class="pa-3 text-body-1" rounded="lg" elevation="0" style="background: rgba(255,255,255,0.05) !important;">
                      {{ comment.text }}
                    </v-card>
                  </div>
                </div>
              </v-card>
              
              <div v-if="!selectedTask.comments || selectedTask.comments.length === 0" class="text-center pa-6 border-dashed rounded-lg" style="border-color: rgba(255,255,255,0.1) !important;">
                <v-icon size="large" color="grey-darken-1" class="mb-2">mdi-comment-outline</v-icon>
                <div class="text-grey">No comments yet. Start the discussion!</div>
              </div>
            </div>

            <div v-if="isAuthorized" class="d-flex mt-8">
              <v-avatar size="36" color="secondary" class="mr-4 font-weight-bold text-subtitle-2 elevation-2">
                {{ authStore.user?.displayName?.charAt(0) || 'U' }}
              </v-avatar>
              <div class="flex-grow-1">
                <v-textarea
                  v-model="newComment"
                  variant="solo" flat
                  bg-color="rgba(0,0,0,0.2)"
                  rounded="lg"
                  rows="2"
                  auto-grow
                  placeholder="Add a comment..."
                  hide-details
                  class="mb-3 modern-textarea"
                ></v-textarea>
                <div class="text-right">
                  <v-btn color="secondary" rounded="pill" elevation="2" class="font-weight-bold px-6" @click="submitComment" :disabled="!newComment.trim()">
                    <v-icon start>mdi-send</v-icon> Post
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="sidebar-panel pa-6 border-s" style="border-color: rgba(255,255,255,0.05) !important; width: 320px; background: rgba(0,0,0,0.15);">
            <h3 class="text-subtitle-1 font-weight-bold mb-5 text-grey-lighten-1 text-uppercase tracking-wide">Attributes</h3>
            
            <div class="mb-5">
              <div class="text-caption text-grey mb-2 font-weight-bold">STATUS</div>
              <v-select
                v-model="editedTask.status"
                :items="columns"
                item-title="title"
                item-value="id"
                variant="solo" flat
                rounded="lg"
                density="compact"
                bg-color="rgba(0,0,0,0.2)"
                :disabled="!isAuthorized"
                hide-details
                class="modern-select"
                @update:modelValue="saveTaskDetails"
              >
                <template v-slot:selection="{ item }">
                  <div class="d-flex align-center">
                    <div class="status-dot mr-2" :class="`bg-${item.raw.color}`"></div>
                    <span class="font-weight-medium">{{ item.title }}</span>
                  </div>
                </template>
              </v-select>
            </div>
            
            <div class="mb-5">
              <div class="text-caption text-grey mb-2 font-weight-bold">ASSIGNEE</div>
              <v-select
                v-model="editedTask.assignee"
                :items="teamMembers"
                item-title="name"
                item-value="name"
                variant="solo" flat
                rounded="lg"
                density="compact"
                bg-color="rgba(0,0,0,0.2)"
                :disabled="!isAuthorized"
                hide-details
                clearable
                class="modern-select"
                placeholder="Unassigned"
                @update:modelValue="saveTaskDetails"
              >
                <template v-slot:selection="{ item }">
                  <div class="d-flex align-center">
                    <v-avatar size="20" color="primary" class="mr-2 text-caption font-weight-bold">{{ item.title.charAt(0) }}</v-avatar>
                    <span class="font-weight-medium">{{ item.title }}</span>
                  </div>
                </template>
              </v-select>
            </div>

            <div class="mb-5">
              <div class="text-caption text-grey mb-2 font-weight-bold">PRIORITY</div>
              <v-select
                v-model="editedTask.priority"
                :items="['Low', 'Medium', 'High', 'Critical']"
                variant="solo" flat
                rounded="lg"
                density="compact"
                bg-color="rgba(0,0,0,0.2)"
                hide-details
                class="modern-select"
                @update:modelValue="saveTaskDetails"
              >
                <template v-slot:selection="{ item }">
                  <v-chip size="small" :color="getPriorityColor(item.title)" variant="flat" class="font-weight-bold">{{ item.title }}</v-chip>
                </template>
              </v-select>
            </div>
            
            <div class="mb-5">
              <div class="text-caption text-grey mb-2 font-weight-bold">STORY POINTS</div>
              <v-text-field
                v-model.number="editedTask.storyPoints"
                type="number"
                variant="solo" flat
                rounded="lg"
                density="compact"
                bg-color="rgba(0,0,0,0.2)"
                hide-details
                min="0"
                class="modern-select"
                @change="saveTaskDetails"
              >
                <template v-slot:prepend-inner>
                  <v-icon size="small" color="secondary" class="mr-1">mdi-star</v-icon>
                </template>
              </v-text-field>
            </div>

            <div class="mb-5">
              <div class="text-caption text-grey mb-2 font-weight-bold">SPRINT</div>
              <v-select
                v-model="editedTask.iterationId"
                :items="iterationSelectItems"
                item-title="label"
                item-value="id"
                variant="solo" flat
                rounded="lg"
                density="compact"
                bg-color="rgba(0,0,0,0.2)"
                hide-details
                clearable
                class="modern-select"
                :disabled="!isAuthorized"
                @update:modelValue="saveTaskDetails"
              >
                <template v-slot:prepend-inner>
                  <v-icon size="small" color="warning" class="mr-1">mdi-lightning-bolt</v-icon>
                </template>
                <template v-slot:selection="{ item }">
                  <v-chip size="small" color="warning" variant="tonal" class="font-weight-bold">{{ item.title }}</v-chip>
                </template>
              </v-select>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  <!-- Sprint dialog (add / edit) -->
  <v-dialog v-model="iterDialog" max-width="560px">
    <v-card rounded="xl" class="glass-dialog">
      <v-card-title class="text-h6 pa-5 font-weight-bold d-flex align-center border-b" style="border-color:rgba(255,255,255,0.1) !important;">
        <v-icon color="warning" class="mr-2">mdi-lightning-bolt</v-icon>
        {{ editingIter ? 'Edit Sprint' : 'New Sprint' }}
      </v-card-title>
      <v-card-text class="pa-5">
        <v-row dense>
          <v-col cols="12" sm="8">
            <v-text-field v-model="iterForm.name" label="Sprint Name" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" hide-details class="mb-3"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select v-model="iterForm.weekNumber" :items="[1,2,3,4,5,6,7,8]" label="Week" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" hide-details class="mb-3"></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="iterForm.goal" label="Sprint Goal" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" rows="2" auto-grow hide-details class="mb-3 modern-textarea"></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="iterForm.startDate" label="Start Date" type="date" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" hide-details class="mb-3"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="iterForm.endDate" label="End Date" type="date" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" hide-details class="mb-3"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select v-model="iterForm.status" :items="[{title:'Upcoming',value:'upcoming'},{title:'Active',value:'active'},{title:'Completed',value:'completed'}]" item-title="title" item-value="value" label="Status" variant="solo" flat bg-color="rgba(0,0,0,0.2)" rounded="lg" color="warning" hide-details></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-5 pt-0">
        <v-spacer></v-spacer>
        <v-btn color="grey-lighten-1" variant="text" rounded="pill" @click="closeIterDialog">Cancel</v-btn>
        <v-btn color="warning" variant="elevated" rounded="pill" @click="submitIter" class="font-weight-bold px-5">{{ editingIter ? 'Save' : 'Create' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import draggable from 'vuedraggable'
import { useTrackerStore } from '../store/trackerStore'
import { useAuthStore } from '../store/authStore'
import { teamsInfo, teamMeta, teamDeliverables, teamRequirements, teamGlossary } from '../data/teams'

const route = useRoute()
const trackerStore = useTrackerStore()
const authStore = useAuthStore()

const dialog = ref(false)
const valid = ref(false)
const form = ref(null)

const detailsDialog = ref(false)
const selectedTask = ref(null)
const editedTask = ref({})
const newComment = ref('')
const editingCommentId = ref(null)
const editingCommentText = ref('')

// Iteration dialog
const iterDialog = ref(false)
const editingIter = ref(null)
const iterForm = ref({ name: '', weekNumber: 1, goal: '', startDate: '', endDate: '', status: 'upcoming' })

const tab = ref('board')
const weekTab = ref(1)
const reqFilter = ref('All')
const glossarySearch = ref('')
const glossaryCatFilter = ref(null)
const sprintFilter = ref(null)

const teamId = computed(() => Number(route.params.id))
const isAuthorized = computed(() => {
  if (authStore.userRole === 'admin') return true
  if (['member', 'mentor'].includes(authStore.userRole)) {
    if (authStore.userTeamIds?.includes(teamId.value)) return true
    if (authStore.userTeamId === teamId.value) return true // Legacy fallback
  }
  return false
})

const teamMetaInfo = computed(() => teamMeta[teamId.value])
const deliverablesList = computed(() => teamDeliverables[teamId.value] || [])
const requirementsList = computed(() => teamRequirements[teamId.value] || [])

const filteredRequirements = computed(() => {
  if (reqFilter.value === 'All') return requirementsList.value
  if (reqFilter.value === 'Must') return requirementsList.value.filter(r => r.priority === 'Must')
  if (reqFilter.value === 'Should') return requirementsList.value.filter(r => r.priority === 'Should')
  if (reqFilter.value === 'AI') return requirementsList.value.filter(r => r.ai)
  return requirementsList.value
})

const glossaryList = computed(() => teamGlossary[teamId.value] || [])

const glossaryCategories = computed(() => {
  const cats = new Set(glossaryList.value.map(e => e.category))
  return Array.from(cats).sort()
})

const filteredGlossary = computed(() => {
  let list = glossaryList.value
  if (glossaryCatFilter.value) {
    list = list.filter(e => e.category === glossaryCatFilter.value)
  }
  const q = (glossarySearch.value || '').toLowerCase().trim()
  if (q) {
    list = list.filter(e =>
      e.term.toLowerCase().includes(q) ||
      e.definition.toLowerCase().includes(q)
    )
  }
  return list
})

const glossaryCategoryColor = (cat) => {
  const map = {
    'AI': 'secondary',
    'Platform': 'primary',
    'Role': 'info',
    'Compliance': 'warning',
    'DevOps': 'teal',
    'Integration': 'orange',
    'Quality': 'success',
    'Observability': 'purple',
    'Data Entity': 'cyan',
    'Domain': 'amber',
    'Requirements': 'deep-orange',
  }
  return map[cat] || 'grey'
}

const glossaryCategoryColorHex = (cat) => {
  const map = {
    'AI': '#9C27B0',
    'Platform': '#6366F1',
    'Role': '#2196F3',
    'Compliance': '#FF9800',
    'DevOps': '#009688',
    'Integration': '#FF5722',
    'Quality': '#4CAF50',
    'Observability': '#7E57C2',
    'Data Entity': '#00BCD4',
    'Domain': '#FFC107',
    'Requirements': '#FF7043',
  }
  return map[cat] || '#9E9E9E'
}

const teamMentors = computed(() => {
  return authStore.allUsers.filter(u => 
    u.role === 'mentor' && 
    (u.teamIds?.includes(teamId.value) || u.teamId === teamId.value)
  )
})

const isMentor = (displayName) => {
  return teamMentors.value.some(m => m.displayName === displayName)
}
const teamName = computed(() => {
  const names = {
    1: 'Platform Core + Demand Intelligence',
    2: 'Talent Acquisition Engine',
    3: 'Market Presence — Core Portal',
    4: 'Market Presence — AI + Analytics',
    5: 'Workforce Allocation — Services',
    6: 'Workforce Allocation — UI + Skills'
  }
  return names[teamId.value] || 'Unknown Team'
})

const teamInfo = computed(() => {
  return teamsInfo.find(t => t.id === teamId.value)
})

const columns = [
  { id: 'todo', title: 'To Do', color: 'grey' },
  { id: 'in-progress', title: 'In Progress', color: 'blue' },
  { id: 'review', title: 'Review', color: 'purple' },
  { id: 'done', title: 'Done', color: 'green' }
]

// ─── Iteration computeds ────────────────────────────────────────────────────
const teamIterations = computed(() =>
  trackerStore.iterations
    .filter(i => i.teamId === teamId.value)
    .sort((a, b) => a.weekNumber - b.weekNumber)
)

const activeIteration = computed(() => teamIterations.value.find(i => i.status === 'active') || null)

const iterationSelectItems = computed(() =>
  teamIterations.value.map(i => ({ id: i.id, label: `W${i.weekNumber} — ${i.name}` }))
)

const iterTasksTotal = (iterId) =>
  trackerStore.tasks.filter(t => t.teamId === teamId.value && t.iterationId === iterId).length

const iterTasksDone = (iterId) =>
  trackerStore.tasks.filter(t => t.teamId === teamId.value && t.iterationId === iterId && t.status === 'done').length

const iterProgress = (iterId) => {
  const total = iterTasksTotal(iterId)
  return total === 0 ? 0 : Math.round((iterTasksDone(iterId) / total) * 100)
}

const sprintTotalTasks = computed(() => activeIteration.value ? iterTasksTotal(activeIteration.value.id) : 0)
const sprintDoneTasks = computed(() => activeIteration.value ? iterTasksDone(activeIteration.value.id) : 0)
const sprintProgress = computed(() => activeIteration.value ? iterProgress(activeIteration.value.id) : 0)

const getIterationWeek = (iterId) => {
  const iter = trackerStore.iterations.find(i => i.id === iterId)
  return iter?.weekNumber ?? '?'
}

const iterStatusColor = (status) => {
  return { upcoming: '#9E9E9E', active: '#FF9800', completed: '#4CAF50' }[status] || '#9E9E9E'
}
const iterStatusChipColor = (status) => {
  return { upcoming: 'grey', active: 'warning', completed: 'success' }[status] || 'grey'
}
const iterStatusLabel = (status) => {
  return { upcoming: 'Upcoming', active: 'Active', completed: 'Completed' }[status] || status
}

// Sprint dialog helpers
const openEditIter = (iter) => {
  editingIter.value = iter
  iterForm.value = { name: iter.name, weekNumber: iter.weekNumber, goal: iter.goal, startDate: iter.startDate, endDate: iter.endDate, status: iter.status }
  iterDialog.value = true
}
const closeIterDialog = () => {
  iterDialog.value = false
  editingIter.value = null
  iterForm.value = { name: '', weekNumber: teamIterations.value.length + 1, goal: '', startDate: '', endDate: '', status: 'upcoming' }
}
const submitIter = async () => {
  const payload = { ...iterForm.value, teamId: teamId.value, weekNumber: Number(iterForm.value.weekNumber) }
  if (editingIter.value) {
    await trackerStore.updateIteration(editingIter.value.id, payload)
  } else {
    await trackerStore.addIteration(payload)
  }
  closeIterDialog()
}

const newTask = ref({
  title: '',
  description: '',
  assignee: null,
  priority: 'Medium',
  storyPoints: null,
  iterationId: null
})

// Filter team members for the dropdown
const teamMembers = computed(() => {
  return trackerStore.engineers.filter(e => e.teamId === teamId.value)
})

// Roster specific filters
const rosterEngineers = computed(() => {
  return trackerStore.engineers.filter(e => e.teamId === teamId.value && (e.role || 'member') !== 'mentor')
})

const rosterMentors = computed(() => {
  return trackerStore.engineers.filter(e => e.teamId === teamId.value && (e.role || 'member') === 'mentor')
})

onMounted(() => {
  trackerStore.subscribeTasks()
  trackerStore.subscribeEngineers()
  trackerStore.subscribeIterations()
  authStore.fetchAllUsers()
})

const getTasksByColumn = (status) => {
  let list = trackerStore.tasks.filter(t => t.teamId === teamId.value && t.status === status)
  if (sprintFilter.value === null) return list
  if (sprintFilter.value === 'unassigned') return list.filter(t => !t.iterationId)
  return list.filter(t => t.iterationId === sprintFilter.value)
}

const onChange = (evt, newStatus) => {
  if (evt.added) {
    trackerStore.updateTaskStatus(evt.added.element.id, newStatus)
  }
}

const submitTask = () => {
  if (valid.value) {
    trackerStore.addTask({
      ...newTask.value,
      iterationId: newTask.value.iterationId || null,
      teamId: teamId.value,
      status: 'todo',
      comments: [],
      createdAt: new Date().toISOString()
    })
    newTask.value = { title: '', description: '', assignee: null, priority: 'Medium', storyPoints: null, iterationId: null }
    dialog.value = false
  }
}

const openTaskDetails = (task) => {
  selectedTask.value = task
  editedTask.value = { 
    title: task.title || '',
    description: task.description || '',
    assignee: task.assignee,
    priority: task.priority,
    status: task.status,
    storyPoints: task.storyPoints,
    iterationId: task.iterationId || null
  }
  newComment.value = ''
  editingCommentId.value = null
  detailsDialog.value = true
}

const closeTaskDetails = () => {
  detailsDialog.value = false
  selectedTask.value = null
}

const saveTaskDetails = () => {
  if (selectedTask.value) {
    trackerStore.updateTaskDetails(selectedTask.value.id, {
      title: editedTask.value.title,
      description: editedTask.value.description,
      assignee: editedTask.value.assignee,
      priority: editedTask.value.priority,
      status: editedTask.value.status,
      storyPoints: editedTask.value.storyPoints,
      iterationId: editedTask.value.iterationId || null
    })
  }
}

const submitComment = async () => {
  if (newComment.value.trim() && selectedTask.value) {
    const authorName = authStore.user?.displayName || authStore.user?.email || 'User'
    await trackerStore.addTaskComment(selectedTask.value.id, newComment.value.trim(), authorName)
    newComment.value = ''
  }
}

const startEditComment = (comment) => {
  editingCommentId.value = comment.id
  editingCommentText.value = comment.text
}

const saveEditComment = async (commentId) => {
  if (editingCommentText.value.trim() && selectedTask.value) {
    await trackerStore.updateTaskComment(selectedTask.value.id, commentId, editingCommentText.value.trim())
    editingCommentId.value = null
  }
}

// Watch tasks array to update selectedTask if it is open (so comments refresh)
watch(() => trackerStore.tasks, (newTasks) => {
  if (selectedTask.value) {
    const updatedTask = newTasks.find(t => t.id === selectedTask.value.id)
    if (updatedTask) {
      selectedTask.value = updatedTask
    } else {
      // Task was deleted while dialog was open
      closeTaskDetails()
    }
  }
}, { deep: true })

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'Low': return '#4CAF50'
    case 'Medium': return '#FFC107'
    case 'High': return '#FF9800'
    case 'Critical': return '#F44336'
    default: return '#9E9E9E'
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.tracking-wide {
  letter-spacing: 0.1em;
}

.min-h-150px {
  min-height: 150px;
}
.cursor-move {
  cursor: grab;
}
.cursor-move:active {
  cursor: grabbing;
}
.lh-1-2 {
  line-height: 1.2;
}

.opacity-60 {
  opacity: 0.6;
}
.hover-opacity-100:hover {
  opacity: 1;
}
.hover-primary:hover {
  color: #6366F1 !important;
}

/* Data Flow Graph Styles */
.focal-node {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.focal-node:hover {
  transform: scale(1.05);
}
.focal-node-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.15;
  pointer-events: none;
}
.node-card {
  transition: transform 0.2s ease;
}
.node-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.05) !important;
}
.flow-animated-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transform: translateY(-50%);
}
.flow-animated-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  animation: flowAnim 1.5s infinite linear;
}
.left-line::after {
  background: linear-gradient(90deg, transparent, rgba(244, 67, 54, 0.8), transparent);
}
.right-line::after {
  background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.8), transparent);
}
@keyframes flowAnim {
  0% { left: -50%; }
  100% { left: 100%; }
}

.border-dashed {
  border-style: dashed;
  border-width: 2px;
}

/* Scrollbars */
.list-container::-webkit-scrollbar {
  width: 6px;
}
.list-container::-webkit-scrollbar-track {
  background: transparent;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

/* Task Cards */
.task-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: rgba(30, 41, 59, 0.6) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.task-priority-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}
.task-card:hover {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.9) !important;
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 24px -8px rgba(0,0,0,0.5) !important;
  cursor: pointer;
}

/* Glass Panels */
.glass-module-panel {
  background: rgba(30, 41, 59, 0.5) !important;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-column {
  background: rgba(15, 23, 42, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.01);
}

.glass-dialog {
  background: rgba(15, 23, 42, 0.85) !important;
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.letter-spacing-1 {
  letter-spacing: 0.5px;
}

/* Form overrides for modern look */
.task-title-input :deep(.v-field__input) {
  padding: 0 !important;
  font-size: 1.75rem !important;
  line-height: 1.2 !important;
}

.modern-textarea :deep(.v-field) {
  border-radius: 12px !important;
  transition: all 0.2s ease;
}
.modern-textarea :deep(.v-field--focused) {
  background: rgba(0,0,0,0.4) !important;
  border-color: #6366F1 !important;
}

.modern-select :deep(.v-field) {
  border-radius: 8px !important;
}

/* Remove default underline from filled variant */
.modern-textarea :deep(.v-field::before),
.modern-textarea :deep(.v-field::after),
.modern-select :deep(.v-field::before),
.modern-select :deep(.v-field::after),
.modern-input :deep(.v-field::before),
.modern-input :deep(.v-field::after),
.task-title-input :deep(.v-field::before),
.task-title-input :deep(.v-field::after) {
  display: none !important;
}

.comment-actions {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.comments-list .v-card:hover .comment-actions {
  opacity: 1;
}

@media (max-width: 960px) {
  .sidebar-panel {
    width: 100% !important;
    border-left: none !important;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .v-theme--light .sidebar-panel {
    border-color: rgba(0,0,0,0.1) !important;
  }
}

/* Light Theme Overrides */
.v-theme--light .task-card {
  background: rgba(255, 255, 255, 0.6) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}
.v-theme--light .task-card:hover {
  background: rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15) !important;
}
.v-theme--light .glass-column {
  background: rgba(255, 255, 255, 0.4) !important;
  border-color: rgba(0, 0, 0, 0.05) !important;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.02) !important;
}
.v-theme--light .glass-dialog {
  background: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2) !important;
}
.v-theme--light .text-white {
  color: rgba(0, 0, 0, 0.87) !important;
}
.v-theme--light .text-grey-lighten-1 {
  color: rgba(0, 0, 0, 0.6) !important;
}
.v-theme--light .sidebar-panel {
  background: rgba(255, 255, 255, 0.5) !important;
  border-color: rgba(0,0,0,0.1) !important;
}
.v-theme--light .v-field {
  background: rgba(0, 0, 0, 0.05) !important;
}
.v-theme--light textarea,
.v-theme--light input {
  color: rgba(0, 0, 0, 0.87) !important;
}
.glass-module-panel {
  background: rgba(30, 41, 59, 0.5) !important;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.v-theme--light .glass-module-panel {
  background: rgba(255, 255, 255, 0.6) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}
.req-card {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.v-theme--light .req-card {
  background: rgba(0, 0, 0, 0.02) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

/* Glossary Cards */
.glossary-card {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.glossary-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.4) !important;
}
.v-theme--light .glossary-card {
  background: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.v-theme--light .glossary-card:hover {
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12) !important;
}

/* Sprint / Iteration Cards */
.sprint-banner {
  background: rgba(255, 152, 0, 0.08) !important;
  border: 1px solid rgba(255, 152, 0, 0.25);
  backdrop-filter: blur(10px);
}
.v-theme--light .sprint-banner {
  background: rgba(255, 152, 0, 0.06) !important;
  border-color: rgba(255, 152, 0, 0.3) !important;
}
.iteration-card {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.iteration-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.4) !important;
}
.v-theme--light .iteration-card {
  background: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.v-theme--light .iteration-card:hover {
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12) !important;
}

/* Enhanced Typography for Light Mode Module Specification */
.v-theme--light .glass-module-panel .text-white {
  color: #1E293B !important; /* Slate 800 for premium readability */
}
.v-theme--light .glass-module-panel .text-grey-lighten-1 {
  color: #475569 !important; /* Slate 600 for subtle text */
}
.v-theme--light .req-card .text-white {
  color: #334155 !important; /* Slate 700 */
}
</style>
