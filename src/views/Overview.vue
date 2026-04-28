<template>
  <v-container class="fade-up-stagger">
    <v-row class="mb-6">
      <v-col cols="12" md="7" class="anim-item">
        <v-card class="pa-5 h-100 glass-card gradient-border" rounded="lg">
          <v-card-title class="text-h3 font-weight-black text-primary mb-2 glowing-text">Forge</v-card-title>
          <v-card-subtitle class="text-h6 mb-4 font-weight-medium text-white">AI-Native Workforce Intelligence Platform</v-card-subtitle>
          <v-card-text>
            <p class="text-subtitle-1 mb-3 font-italic text-secondary">
              "Engineering the talent supply chain — intelligently."
            </p>
            <p class="text-body-2 text-grey-lighten-2 leading-relaxed">
              Forge replaces traditional spreadsheet-driven staffing processes. It manages the full workforce demand lifecycle from request through closure, providing a real-time unified view of demand, bench availability, and candidate pipelines. Built with event-driven microservices, Kafka, K8s, PostgreSQL with pgvector, and cutting-edge AI models.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="5" class="anim-item" style="animation-delay: 0.1s;">
        <v-card class="pa-4 h-100 glass-card-dark" rounded="lg">
          <v-card-title class="text-h6 font-weight-bold mb-3 d-flex align-center">
            <v-icon color="secondary" size="small" class="mr-2">mdi-rocket-launch</v-icon>
            Project Specs
          </v-card-title>
          <v-card-text class="pt-0">
            <v-list bg-color="transparent" density="compact" class="spec-list pa-0">
              <v-list-item class="mb-1 px-0 min-h-0">
                <template v-slot:prepend><v-icon color="primary" size="small" class="mr-3">mdi-account-group</v-icon></template>
                <v-list-item-title class="text-body-2 font-weight-bold text-white">Cohort</v-list-item-title>
                <v-list-item-subtitle class="text-caption text-grey-lighten-1">{{ projectDetails.cohort }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="mb-1 px-0 min-h-0">
                <template v-slot:prepend><v-icon color="secondary" size="small" class="mr-3">mdi-sitemap</v-icon></template>
                <v-list-item-title class="text-body-2 font-weight-bold text-white">Structure</v-list-item-title>
                <v-list-item-subtitle class="text-caption text-grey-lighten-1">{{ projectDetails.structure }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="mb-1 px-0 min-h-0">
                <template v-slot:prepend><v-icon color="accent" size="small" class="mr-3">mdi-server-network</v-icon></template>
                <v-list-item-title class="text-body-2 font-weight-bold text-white">Architecture</v-list-item-title>
                <v-list-item-subtitle class="text-caption text-grey-lighten-1">{{ projectDetails.architecture }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item class="mb-1 px-0 min-h-0">
                <template v-slot:prepend><v-icon color="warning" size="small" class="mr-3">mdi-brain</v-icon></template>
                <v-list-item-title class="text-body-2 font-weight-bold text-white">AI Stack</v-list-item-title>
                <v-list-item-subtitle class="text-caption text-grey-lighten-1">{{ projectDetails.aiStack }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Problem Statement -->
    <v-row class="mb-4">
      <v-col cols="12" class="anim-item" style="animation-delay: 0.15s;">
        <v-card class="pa-5 glass-card" rounded="lg" style="border-left: 3px solid var(--v-error-base, #f44336);">
          <div class="text-caption font-weight-bold text-uppercase text-error mb-2" style="letter-spacing: 0.1em;">Problem Statement</div>
          <p class="text-body-2 text-grey-lighten-1" style="line-height: 1.6;">{{ BRD.problem }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Scope -->
    <v-row class="mb-4">
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.2s;">
        <v-card class="pa-5 h-100 glass-card-dark" rounded="lg">
          <div class="d-flex align-center mb-4">
            <div class="rounded-circle bg-success mr-2" style="width: 8px; height: 8px;"></div>
            <div class="text-caption font-weight-bold text-uppercase text-grey-lighten-1" style="letter-spacing: 0.1em;">In Scope</div>
          </div>
          <div class="d-flex align-start mb-2" v-for="(item, i) in BRD.inScope" :key="i">
            <v-icon color="success" size="x-small" class="mr-2 mt-1 flex-shrink-0">mdi-check</v-icon>
            <span class="text-body-2 text-grey-lighten-1" style="line-height: 1.4;">{{ item }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.25s;">
        <v-card class="pa-5 h-100 glass-card-dark" rounded="lg">
          <div class="d-flex align-center mb-4">
            <div class="rounded-circle bg-error mr-2" style="width: 8px; height: 8px;"></div>
            <div class="text-caption font-weight-bold text-uppercase text-grey-lighten-1" style="letter-spacing: 0.1em;">Out of Scope</div>
          </div>
          <div class="d-flex align-start mb-2" v-for="(item, i) in BRD.outOfScope" :key="i">
            <v-icon color="error" size="x-small" class="mr-2 mt-1 flex-shrink-0">mdi-close</v-icon>
            <span class="text-body-2 text-grey-lighten-1" style="line-height: 1.4;">{{ item }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Stakeholders & Metrics -->
    <v-row class="mb-4">
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.3s;">
        <v-card class="pa-5 h-100 glass-card" rounded="lg">
          <div class="text-caption font-weight-bold text-uppercase text-secondary mb-4" style="letter-spacing: 0.1em;">Stakeholders</div>
          <v-table density="compact" class="bg-transparent text-body-2" style="background: transparent !important;">
            <tbody>
              <tr v-for="(s, i) in BRD.stakeholders" :key="i">
                <td class="font-weight-bold text-secondary px-0" style="width: 30%; border-bottom: none;">{{ s.role }}</td>
                <td class="px-2 font-weight-medium text-white" style="border-bottom: none;">{{ s.name }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.35s;">
        <v-card class="pa-5 h-100 glass-card" rounded="lg">
          <div class="text-caption font-weight-bold text-uppercase text-info mb-4" style="letter-spacing: 0.1em;">Top Success Metrics</div>
          <div class="d-flex flex-wrap" style="gap: 8px;">
             <div v-for="(m, i) in BRD.metrics.slice(0, 4)" :key="i" class="bg-surface-variant pa-2 rounded w-100 d-flex align-start">
               <v-chip size="x-small" color="info" variant="flat" class="mr-3 mt-1 flex-shrink-0 font-weight-bold">KPI</v-chip>
               <div>
                 <div class="font-weight-bold text-white" style="font-size: 0.8rem;">{{ m.kpi }}</div>
                 <div class="text-grey-lighten-1" style="font-size: 0.75rem; line-height: 1.4;">{{ m.target }}</div>
               </div>
             </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Assumptions & Constraints -->
    <v-row class="mb-6">
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.4s;">
        <v-card class="pa-5 h-100 glass-card-dark" rounded="lg">
          <div class="text-caption font-weight-bold text-uppercase text-grey-lighten-1 mb-4" style="letter-spacing: 0.1em;">Assumptions</div>
          <div class="d-flex align-start mb-3 pb-3 border-b-sm" v-for="(item, i) in BRD.assumptions" :key="i" style="border-color: rgba(255,255,255,0.05) !important;">
            <div class="text-caption font-weight-bold text-primary mr-3 mt-1">{{ String(i+1).padStart(2, '0') }}</div>
            <span class="text-body-2 text-grey-lighten-1" style="line-height: 1.4;">{{ item }}</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="anim-item" style="animation-delay: 0.45s;">
        <v-card class="pa-5 h-100 glass-card-dark" rounded="lg">
          <div class="text-caption font-weight-bold text-uppercase text-grey-lighten-1 mb-4" style="letter-spacing: 0.1em;">Constraints</div>
          <div class="d-flex align-start mb-3 pb-3 border-b-sm" v-for="(item, i) in BRD.constraints" :key="i" style="border-color: rgba(255,255,255,0.05) !important;">
            <div class="text-caption font-weight-bold text-warning mr-3 mt-1">{{ String(i+1).padStart(2, '0') }}</div>
            <span class="text-body-2 text-grey-lighten-1" style="line-height: 1.4;">{{ item }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="anim-item" style="animation-delay: 0.2s;">
        <h2 class="text-h4 font-weight-bold mb-4 d-flex align-center">
          Core Capabilities
          <v-chip color="accent" variant="flat" size="small" class="ml-4 font-weight-bold">6 Key Features</v-chip>
        </h2>
      </v-col>
      <v-col cols="12" md="6" lg="4" v-for="(feature, index) in projectFeatures" :key="feature.id" class="anim-item" :style="`animation-delay: ${0.3 + (index * 0.1)}s;`">
        <v-card class="h-100 d-flex flex-column glass-module-card module-hover" rounded="lg">
          <div class="card-glow" :style="`background: ${getGlowColor(index)};`"></div>
          <v-card-item class="pb-2 pt-5 px-5">
            <div class="d-flex align-center mb-1">
              <v-avatar :color="getGlowColor(index)" size="40" class="mr-4 text-white elevation-2">
                <v-icon size="small">{{ feature.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-white text-wrap lh-sm pa-0" style="line-height: 1.3;">{{ feature.title }}</v-card-title>
            </div>
          </v-card-item>
          
          <v-card-text class="pt-2 px-5 pb-5 text-caption flex-grow-1 position-relative z-1 d-flex flex-column">
            <p class="mb-4 text-grey-lighten-2 flex-grow-1" style="font-size: 0.85rem; line-height: 1.6;">{{ feature.description }}</p>
            
            <div class="d-flex align-center mt-auto bg-surface-variant pa-2 rounded">
              <v-icon :color="getGlowColor(index)" size="small" class="mr-2 flex-shrink-0">mdi-star-four-points</v-icon>
              <span class="text-white font-weight-medium">{{ feature.highlight }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Platform Preview -->
    <v-row class="mb-6">
      <v-col cols="12" class="anim-item" style="animation-delay: 0.4s;">
        <h2 class="text-h4 font-weight-bold mb-4 d-flex align-center">
          <v-icon color="secondary" class="mr-2">mdi-monitor-dashboard</v-icon>
          Platform Preview
        </h2>
        <v-card class="pa-2 glass-card rounded-xl overflow-hidden" elevation="24">
          <v-img src="/java-capstone-project/images/mockups/overview.png" cover class="rounded-lg" aspect-ratio="16/9"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Talent Supply Chain Flow -->
    <v-row class="mb-6">
      <v-col cols="12" class="anim-item" style="animation-delay: 0.5s;">
        <h2 class="text-h4 font-weight-bold mb-4 d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-transit-connection-variant</v-icon>
          Talent Supply Chain Flow
        </h2>
        <v-card class="pa-6 glass-card-dark overflow-x-auto" rounded="lg">
          <div class="d-flex align-center justify-space-between flex-nowrap" style="min-width: 800px; gap: 16px;">
            <!-- Demand -->
            <v-card class="pa-4 flex-grow-1 text-center glass-card" style="border: 1px solid #E65D24;">
              <v-icon color="#E65D24" size="large" class="mb-2">mdi-bullhorn</v-icon>
              <div class="text-subtitle-2 font-weight-bold">Demand Creation</div>
              <div class="text-caption text-grey">Team 1</div>
            </v-card>
            <v-icon color="grey-darken-1" size="large">mdi-arrow-right-thick</v-icon>
            
            <!-- Careers -->
            <v-card class="pa-4 flex-grow-1 text-center glass-card" style="border: 1px solid #A9B400;">
              <v-icon color="#A9B400" size="large" class="mb-2">mdi-web</v-icon>
              <div class="text-subtitle-2 font-weight-bold">Careers Portal</div>
              <div class="text-caption text-grey">Team 3</div>
            </v-card>
            <v-icon color="grey-darken-1" size="large">mdi-arrow-right-thick</v-icon>
            
            <!-- Recruitment -->
            <v-card class="pa-4 flex-grow-1 text-center glass-card" style="border: 1px solid #006DB6;">
              <v-icon color="#006DB6" size="large" class="mb-2">mdi-account-search</v-icon>
              <div class="text-subtitle-2 font-weight-bold">Recruitment ATS</div>
              <div class="text-caption text-grey">Team 2</div>
            </v-card>
            <v-icon color="grey-darken-1" size="large">mdi-arrow-right-thick</v-icon>
            
            <!-- Matching -->
            <v-card class="pa-4 flex-grow-1 text-center glass-card" style="border: 1px solid #F59E0B;">
              <v-icon color="#F59E0B" size="large" class="mb-2">mdi-brain</v-icon>
              <div class="text-subtitle-2 font-weight-bold">Semantic Matching</div>
              <div class="text-caption text-grey">Team 5</div>
            </v-card>
            <v-icon color="grey-darken-1" size="large">mdi-arrow-right-thick</v-icon>
            
            <!-- RMG -->
            <v-card class="pa-4 flex-grow-1 text-center glass-card" style="border: 1px solid #EF4444;">
              <v-icon color="#EF4444" size="large" class="mb-2">mdi-account-hard-hat</v-icon>
              <div class="text-subtitle-2 font-weight-bold">RMG Allocation</div>
              <div class="text-caption text-grey">Team 6</div>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Engineering Details Section -->
    <v-row class="mt-2 mb-4">
      <v-col cols="12" class="anim-item" style="animation-delay: 0.3s;">
        <v-card class="pa-5 glass-card-dark" rounded="lg">
          <v-row>
            <v-col cols="12" md="7">
              <h3 class="text-h5 font-weight-bold mb-4 text-white d-flex align-center">
                <v-icon color="primary" class="mr-2" size="small">mdi-layers</v-icon>
                Engineering Stack
              </h3>
              <v-row dense>
                <v-col cols="12" sm="6" v-for="item in engineeringStack" :key="item.category">
                  <v-card variant="tonal" class="pa-2 h-100 d-flex align-center bg-surface-variant" rounded="md" elevation="0">
                    <v-avatar color="rgba(255,255,255,0.05)" size="36" class="mr-3">
                      <v-icon size="small" color="secondary">{{ item.icon }}</v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-caption font-weight-bold text-grey-lighten-1 text-uppercase" style="font-size: 0.65rem !important; letter-spacing: 0.5px;">{{ item.category }}</div>
                      <div class="text-body-2 font-weight-medium text-white lh-sm">{{ item.tech }}</div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            
            <v-divider vertical class="mx-2 hidden-sm-and-down opacity-20"></v-divider>
            
            <v-col cols="12" md="4" class="d-flex flex-column ml-md-2 mt-4 mt-md-0">
              <h3 class="text-h5 font-weight-bold mb-4 text-white d-flex align-center">
                <v-icon color="warning" class="mr-2" size="small">mdi-gavel</v-icon>
                Engineering Standards
              </h3>
              <v-list bg-color="transparent" density="compact" class="pa-0 flex-grow-1">
                <v-list-item v-for="(std, index) in engineeringStandards" :key="index" class="px-0 mb-2 min-h-0">
                  <div class="d-flex align-start">
                    <v-icon color="success" size="x-small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle-outline</v-icon>
                    <div>
                      <div class="text-body-2 font-weight-bold text-white mb-1" style="line-height: 1.2;">{{ std.title }}</div>
                      <div class="text-caption text-grey-lighten-1" style="line-height: 1.3;">{{ std.description }}</div>
                    </div>
                  </div>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { projectFeatures, projectDetails, engineeringStack, engineeringStandards, BRD } from '../data/teams'

const getGlowColor = (index) => {
  const colors = ['#E65D24', '#006DB6', '#A9B400', '#5AB2E6', '#F59E0B']
  return colors[index % colors.length]
}
</script>

<style scoped>
/* Glassmorphism Styles */
.glass-card {
  background: rgba(30, 41, 59, 0.4) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.glass-card-dark {
  background: rgba(15, 23, 42, 0.6) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-module-card {
  background: rgba(30, 41, 59, 0.4) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  filter: blur(60px);
  transition: opacity 0.4s ease;
  z-index: 0;
  pointer-events: none;
}

.module-hover:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.module-hover:hover .card-glow {
  opacity: 0.15;
}

/* Typography & Layout */
.glowing-text {
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
}
.leading-relaxed {
  line-height: 1.7;
}
.lh-sm {
  line-height: 1.3;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.z-1 {
  z-index: 1;
}

.spec-list .v-list-item {
  padding-inline: 0 !important;
  min-height: 48px;
}

.go-btn {
  letter-spacing: 0.5px;
  text-transform: none;
  transition: transform 0.2s ease;
}
.module-hover:hover .go-btn {
  transform: scale(1.02);
}

/* Staggered Fade Up Animations */
.anim-item {
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style>
/* Light Theme Overrides */
.v-theme--light .glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}
.v-theme--light .glass-card-dark {
  background: rgba(255, 255, 255, 0.8) !important;
  border-color: rgba(0, 0, 0, 0.1);
}
.v-theme--light .glass-module-card {
  background: rgba(255, 255, 255, 0.6) !important;
  border-color: rgba(0, 0, 0, 0.05);
}
.v-theme--light .module-hover:hover {
  border-color: rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1) !important;
}
.v-theme--light .text-white {
  color: rgba(0, 0, 0, 0.87) !important;
}
.v-theme--light .text-grey-lighten-1 {
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
