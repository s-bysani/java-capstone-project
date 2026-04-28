export const teamsInfo = [
  { 
    id: 1, 
    name: 'Platform Core + Demand Intelligence', 
    description: 'Auth, API gateway, Kafka event bus, design system, plus full lifecycle of workforce demand.',
    features: ['API Gateway & Auth', 'Kafka Event Bus', 'Demand Creation & Approval', 'State machine validation', 'AI auto-suggest skills'],
    requirements: ['Java 17 + Spring Boot 3', 'Kafka cluster setup', 'OpenTelemetry instrumentation', 'K8s orchestration'],
    functionalRequirements: [
      'PLAT-01 to 06: Shared platform foundation (Auth, Gateway, Kafka, DB, Notifications, Design System)', 
      'REQ-DM-01 to 09: Demand Intelligence (Creation, Workflow, State Machine, E2E view, Dashboard)',
      'REQ-DM-10: AI auto-suggest required skills',
      'REQ-DM-11: Demand split',
      'REQ-DM-12: AI predict time-to-fill',
      'REQ-DM-13: Analytics API'
    ],
    outcome: 'Shared platform foundation and complete demand lifecycle management.',
    dependencies: [
      'Provides canonical DDL, Kafka topics, Auth, and Design System to all other teams.',
      'Blocks all teams if delayed.'
    ]
  },
  { 
    id: 2, 
    name: 'Talent Acquisition Engine', 
    description: 'Automate external hiring pipeline — resume parsing, candidate scoring, interview orchestration, offer management, GDPR compliance.',
    features: ['AI Resume Parsing', 'GDPR Consent & Deletion', 'Google Calendar Sync', 'Candidate Deduplication', 'DocuSign Integration'],
    requirements: ['LLM inference integration', 'GDPR consent recording', 'Google Calendar API', 'DocuSign API'],
    functionalRequirements: [
      'REQ-ER-01 to 05: Candidate Management (Profiles, Deduplication, Tags, GDPR)',
      'REQ-ER-06 to 11: Pipeline, Interviews & Offers (Scheduling, Scorecards, Templates)',
      'REQ-ER-12: AI candidate scoring 0-100 vs demand skills',
      'REQ-ER-13: AI personalized rejection email drafts',
      'REQ-ER-14: AI follow-up interview questions'
    ],
    outcome: 'AI-powered talent acquisition engine and GDPR compliance.',
    dependencies: [
      'Consumes DB/Auth/Kafka from Team 1.',
      'Receives applicants from Team 3 (Careers Portal).',
      'Receives external demands from Team 1.'
    ]
  },
  { 
    id: 3, 
    name: 'Market Presence — Core Portal', 
    description: 'Manage external talent supply chain — job board publishing and public careers portal.',
    features: ['One-click publish to LinkedIn/Indeed', 'Public careers portal', 'Applicant submission', 'SEO Optimization'],
    requirements: ['External Job API integration', 'SEO generation logic', 'WCAG 2.1 AA Compliance', 'Responsive Design'],
    functionalRequirements: [
      'REQ-JP-01 to 05: Job Posting & Publishing (Editor, LinkedIn/Indeed Integration, Expiry)',
      'REQ-JP-06 to 11: Careers Portal (Public UI, Application flow, SEO, Employer Branding, Referrals)'
    ],
    outcome: 'Seamless multi-channel job publishing and a high-converting careers portal.',
    dependencies: [
      'Consumes DB/Auth/Kafka from Team 1.',
      'Publishes applicants into Team 2 pipeline.'
    ]
  },
  { 
    id: 4, 
    name: 'Market Presence — AI + Analytics', 
    description: 'AI content generation, RAG chatbots, and cross-cutting analytics dashboards.',
    features: ['AI JD Generation', 'RAG FAQ Chatbot', 'Channel Recommendations', 'Analytics Dashboards'],
    requirements: ['RAG architecture', 'AI guardrail library', 'Kafka analytics consumer', 'Grafana/Loki integration'],
    functionalRequirements: [
      'REQ-AI-01 to 03: AI Features (JD Generation, RAG Chatbot, Channel Recs)',
      'REQ-AI-04 to 05: Shared AI Infrastructure (Logging, Guardrail library)',
      'REQ-AN-01 to 03: Analytics Dashboards (RMG, Hiring Pipeline, AI Usage)'
    ],
    outcome: 'Intelligent job marketing and real-time cross-platform visibility.',
    dependencies: [
      'Consumes APIs from all other teams for analytics dashboards.',
      'Provides AI guardrail library to all other teams.'
    ]
  },
  { 
    id: 5, 
    name: 'Workforce Allocation — Services', 
    description: 'Bench visibility and AI-powered semantic matching using pgvector embeddings.',
    features: ['Engineer Profile APIs', 'Bench Report APIs', 'AI semantic pgvector matching', 'HRIS CSV Import'],
    requirements: ['Vector embedding of profiles', 'Semantic search queries in pgvector', 'Cosine similarity logic', 'CSV Parsing'],
    functionalRequirements: [
      'REQ-IT-01 to 06: Engineer & Bench Services (Profiles, Search, Import, Utilisation)',
      'REQ-IT-07 to 10: Nomination Workflow (Notifications, Matches)',
      'REQ-IT-11 to 13: AI Semantic Matching (pgvector embeddings, top-5 ranking, Analytics API)'
    ],
    outcome: 'Vector-powered semantic workforce allocation and bench management APIs.',
    dependencies: [
      'Consumes DB/Auth/Kafka from Team 1.',
      'Handles employee skill pgvector embeddings.'
    ]
  },
  { 
    id: 6, 
    name: 'Workforce Allocation — UI + Skills', 
    description: 'RMG Dashboard interfaces and AI upskilling paths.',
    features: ['Bench dashboard UI', 'Skills gap heatmap', 'Nomination UI', 'AI Upskilling Path generation'],
    requirements: ['Complex UI/UX visualization', 'Heatmap matrix', 'Upskilling AI logic', 'Self-service portals'],
    functionalRequirements: [
      'REQ-UI-01 to 05: RMG UI (Bench dashboard, Heatmap, Nominations, Self-service)',
      'REQ-UI-06: AI Upskilling (Learning paths for unmatched engineers)'
    ],
    outcome: 'Intuitive workforce allocation interfaces and actionable skill gap insights.',
    dependencies: [
      'Consumes APIs from Team 5.'
    ]
  }
];

export const projectDetails = {
    cohort: '30 Engineers — Java 17 + Spring Boot 3 · React/Angular 17 · PostgreSQL + pgvector · Kafka · K8s',
    structure: '6 Location-Pure Teams · Chennai 2 · Bangalore 2 · Hyderabad 2',
    architecture: 'Event-driven microservices · pgvector semantic search · REST/OpenAPI',
    aiStack: 'GPT-4o · Claude 3.5 · OpenAI Embeddings · RAG · Spring AI',
    timeline: '8 Weeks — Grid Dynamics Engineering Internship Sprint'
}

export const projectFeatures = [
  {
    id: 1,
    icon: 'mdi-brain',
    title: 'AI-Augmented Workflows',
    description: 'LLM inference for resume parsing, candidate scoring, JD generation, and upskilling paths.',
    highlight: 'GPT-4o & Claude 3.5'
  },
  {
    id: 2,
    icon: 'mdi-vector-polyline',
    title: 'Semantic Matching',
    description: 'Vector-based engineer-to-demand matching using cosine similarity, bypassing rigid keyword search.',
    highlight: 'PostgreSQL + pgvector'
  },
  {
    id: 3,
    icon: 'mdi-apache-kafka',
    title: 'Event-Driven Architecture',
    description: 'Real-time state propagation across microservices without polling or stale data.',
    highlight: 'Apache Kafka'
  },
  {
    id: 4,
    icon: 'mdi-chart-timeline-variant',
    title: 'Real-Time Observability',
    description: 'Sub-minute analytics freshness with distributed tracing and structured logging.',
    highlight: 'OTel, Grafana, Loki'
  },
  {
    id: 5,
    icon: 'mdi-infinity',
    title: 'E2E Workforce Lifecycle',
    description: 'Unified view of demand creation, internal matching, external sourcing, and closure.',
    highlight: 'Single source of truth'
  },
  {
    id: 6,
    icon: 'mdi-shield-check',
    title: 'GDPR Compliant',
    description: 'Automated consent tracking and 72-hour right-to-deletion execution pipeline.',
    highlight: 'Privacy by design'
  }
]

export const engineeringStack = [
  { category: 'Backend', tech: 'Java 17 + Spring Boot 3.x', icon: 'mdi-language-java' },
  { category: 'Frontend', tech: 'React 18 / Angular 17', icon: 'mdi-react' },
  { category: 'Database', tech: 'PostgreSQL 15 + pgvector', icon: 'mdi-database' },
  { category: 'Message Bus', tech: 'Apache Kafka', icon: 'mdi-apache-kafka' },
  { category: 'Containerization', tech: 'Docker + K8s', icon: 'mdi-docker' },
  { category: 'CI/CD', tech: 'GitHub Actions', icon: 'mdi-github' },
  { category: 'AI / LLM', tech: 'GPT-4o, Claude 3.5, Spring AI', icon: 'mdi-brain' },
  { category: 'Observability', tech: 'OpenTelemetry, Grafana, Loki', icon: 'mdi-chart-line' }
]

export const engineeringStandards = [
  { title: 'Test coverage', description: 'Minimum 60% line coverage per service (JaCoCo).' },
  { title: 'No secrets in source', description: 'Zero tolerance. API keys in GitHub/K8s Secrets only.' },
  { title: 'OpenAPI specs before code', description: 'No service implementation begins without a committed spec.' },
  { title: 'Structured logging', description: 'JSON logs only. No PII in any log line.' },
  { title: 'Immutable infrastructure', description: 'No SSH into containers. All changes go through CI/CD.' }
]

export const BRD = {
  purpose: 'This document defines the business requirements, scope, stakeholders, and success criteria for Forge v2.0 — an AI-native workforce intelligence platform developed as part of the Grid Dynamics Q1 2026 internship programme. It serves as the authoritative reference for all six engineering teams throughout the 8-week delivery sprint. v2.0 restructures the programme into six location-pure teams across Chennai, Bangalore, and Hyderabad to eliminate cross-location coordination overhead and enable independently deployable verticals.',
  problem: 'Grid Dynamics currently manages talent supply chain processes — demand creation, bench allocation, external hiring, and job publishing — across disconnected tools with no unified visibility. Demand signals are lost in email threads, internal bench engineers are overlooked in favour of external hires, resume screening is manual and inconsistent, and job postings require copy-paste across multiple portals. Cross-location team structures in v1.0 also created coordination overhead that slowed delivery. Forge v2.0 replaces this fragmentation with a single, AI-augmented platform built by six location-pure teams, each owning a clearly bounded vertical from API contract through UI.',
  inScope: [
    'Demand lifecycle management: creation, multi-stage approval, internal-first gate, state machine, closure',
    'Shared platform services owned by Chennai T1: auth (JWT+OAuth2), API gateway, Kafka cluster, PostgreSQL DDL+pgvector, design system, notification service, observability stack',
    'External candidate pipeline owned by Chennai T2: AI resume parsing, scoring, interview scheduling, DocuSign offers, GDPR compliance',
    'Job posting automation owned by Bangalore T3: LinkedIn Jobs API, Indeed XML feed, WCAG 2.1 AA careers portal, Apply Now → CH T2 within 30 s',
    'AI features + analytics dashboards owned by Bangalore T4: JD generation, RAG careers chatbot, candidate channel recommender, shared AI guardrail library (Maven), cross-cutting RMG + hiring + AI-usage dashboards',
    'Workforce allocation backend owned by Hyderabad T5: pgvector semantic matching, bench API, nomination workflow, HRIS bulk import',
    'Workforce allocation UI owned by Hyderabad T6: bench dashboard, skills gap heatmap, AI match results UI, upskilling path suggestions',
    'Role-based access: Admin, Resource Manager, Recruiter, Hiring Manager, Interviewer, Candidate (public)',
    'GDPR-compliant candidate data: consent capture, hard delete within 72 h, JSON export, AuditLog confirmation',
    'Production-grade CI/CD: GitHub Actions → Docker → shared intern K8s cluster for all six teams'
  ],
  outOfScope: [
    'Payroll, compensation benchmarking, or offer negotiation tooling',
    'Integration with existing legacy ATS or HRIS beyond CSV bulk-import for seed data',
    'Mobile native apps — responsive web only',
    'Multi-tenant / multi-organisation support',
    'Production go-live or SLA commitments beyond the 8-week programme demo',
    'Real calendar invites to external candidates — Google Calendar integration scoped to internal interviews only'
  ],
  stakeholders: [
    { role: 'Programme Sponsor', name: 'Grid Dynamics Leadership', responsibility: 'Executive sign-off, demo audience, final evaluation' },
    { role: 'Engineering Teams', name: '6 Teams · Chennai (T1+T2), Bangalore (T3+T4), Hyderabad (T5+T6) · 30 interns', responsibility: 'Design, build, test, and demo all six verticals within 8 weeks' },
    { role: 'Primary Users', name: 'Resource Managers, Recruiters, Hiring Managers', responsibility: 'UAT participants in Week 7 stakeholder role-play across all six verticals' }
  ],
  metrics: [
    { kpi: 'Internal-first fill rate', target: '≥ 20% of approved demands resolved internally before OPEN_EXTERNAL' },
    { kpi: 'AI resume parse accuracy', target: '≥ 85% field extraction accuracy on standardised test resume set' },
    { kpi: 'Demand dashboard load time', target: '< 2 s with 500 records under k6 load test at 500 concurrent users' },
    { kpi: 'Candidate portal → TA latency', target: 'Apply Now applicant appears in CH T2 pipeline within 30 s' },
    { kpi: 'Unit test coverage', target: '≥ 60% JaCoCo line coverage across all six services by Week 4' },
    { kpi: 'AI spend guard', target: 'Slack alert fires before projected monthly LLM cost exceeds $40' },
    { kpi: 'GDPR deletion SLA', target: 'PII deleted within 72 h; AuditLog entry confirmed' },
    { kpi: 'CI pipeline health', target: 'Green build on every merge to main; zero manual steps' },
    { kpi: 'pgvector match time', target: 'Top-5 engineer cosine similarity results returned under 5 s' },
    { kpi: 'AI guardrail adoption', target: 'BL T4 guardrail library consumed by all 6 teams by Week 3' }
  ],
  assumptions: [
    'Chennai T1 delivers auth stub, Kafka cluster, PostgreSQL DDL, pgvector, and design system v0 by Week 1 Day 3.',
    'OpenAPI 3.0 contracts are frozen after Week 1 Day 2.',
    'Each team builds against stubs in Weeks 1–2.',
    'API keys provided via GitHub Secrets before Week 2 Day 1.',
    'Shared intern Kubernetes cluster is provisioned and accessible from Week 1.',
    'LinkedIn Jobs API developer app approval initiated by Bangalore T3 on Week 1 Day 1.',
    'AI guardrail library published to shared Maven repo by Week 2.'
  ],
  constraints: [
    'Eight-week fixed delivery window — no scope additions after Week 2.',
    'Java 17 + Spring Boot 3.x mandatory for all backend services. TypeScript mandatory on frontends.',
    'All inter-service async communication routes through Kafka.',
    'No cross-team direct DB writes; access via REST APIs only.',
    'Every LLM call logged to AIInteraction table. No raw PII in log entries.',
    'All AI features pass through guardrail library.',
    'Teams are location-pure — no cross-location team splits.'
  ]
};

export const teamMeta = {
  1: {
    color: '#f5a623',
    num: 'T1',
    name: 'Platform Core + Demand Intelligence',
    city: 'Chennai',
    size: 7,
    roles: 'BE×3 · FE×2 · DevOps×1 · AI×1',
    mission: 'Own the shared infrastructure every other team depends on, AND the full demand lifecycle module. You are the backbone of Forge — auth stubs, Kafka cluster, API gateway, PostgreSQL DDL, and design system must all be live by Week 1 Day 3 or every other team is blocked.',
    provides: [
      { to: 'All Teams', what: 'Auth + JWT token validation library' },
      { to: 'All Teams', what: 'AuditLogClient shared library' },
      { to: 'All Teams', what: 'Kafka cluster + event schema catalog' },
      { to: 'All Teams', what: 'PostgreSQL schema conventions + DDL' },
      { to: 'All Teams', what: 'Design system v0 npm package' },
      { to: 'All Teams', what: 'Notification service (Kafka-driven)' },
      { to: 'BL T4', what: 'Demand analytics REST API' },
      { to: 'All Teams', what: 'Seed data: 5k engineers, 20k candidates, 500 demands' }
    ],
    needs: [
      { from: 'CH Team 2', what: 'Kafka: candidate.created, application.stage_changed' },
      { from: 'BL Team 3', what: 'Kafka: job_posting.published, application.submitted' },
      { from: 'HY Team 5', what: 'Kafka: match.nominated/accepted/rejected, employee.imported' },
      { from: 'HY Team 6', what: 'employee.skills_updated events for embedding refresh' }
    ],
    entities: ['Demand', 'User', 'Notification', 'AuditLog'],
    integrations: [
      'SSO (Okta / Azure AD) — OIDC/SAML via Spring Security',
      'Apache Kafka — CH T1 provisions cluster',
      'Slack Webhooks — platform notifications',
      'Redis — AI response cache (24h TTL)'
    ]
  },
  2: {
    color: '#4fc3f7',
    num: 'T2',
    name: 'Talent Acquisition Engine',
    city: 'Chennai',
    size: 6,
    roles: 'BE×2 · FE×2 · DevOps×1 · AI×1',
    mission: 'Automate the external hiring pipeline end-to-end — resume parsing, AI-assisted scoring, interview orchestration, GDPR-compliant data handling, and DocuSign offer management. Highest third-party integration count — register Google Calendar, DocuSign, and Affinda accounts on Day 1.',
    provides: [
      { to: 'CH Team 1', what: 'Application + stage data for Demand E2E view' },
      { to: 'CH Team 1', what: 'Kafka: candidate.created, application.stage_changed' },
      { to: 'CH Team 1', what: 'Analytics API: pipeline conversion, time-per-stage, offer acceptance' },
      { to: 'BL Team 3', what: 'Confirms portal applications arrive within 30s' }
    ],
    needs: [
      { from: 'CH Team 1', what: 'Auth, AuditLogClient, Notification service, File service' },
      { from: 'CH Team 1', what: 'Demand records in OPEN_EXTERNAL state' },
      { from: 'BL Team 3', what: 'Candidate + Application within 30s of careers portal submit' }
    ],
    entities: ['ExternalCandidate', 'Application', 'Interview', 'Scorecard', 'Offer'],
    integrations: [
      'OpenAI GPT-4o / Affinda — AI resume parsing',
      'Claude 3.5 Sonnet / GPT-4o — candidate scoring + interview questions',
      'Google Calendar API v3 — interview scheduling',
      'DocuSign REST API — offer e-signature'
    ]
  },
  3: {
    color: '#81c784',
    num: 'T3',
    name: 'Market Presence — Core Portal',
    city: 'Bangalore',
    size: 5,
    roles: 'BE×2 · FE×2 · DevOps×1',
    mission: 'Own the external job publishing pipeline and public careers portal — one-click publish to LinkedIn and Indeed, WCAG 2.1 AA careers portal, and Apply Now flow that routes candidates into Chennai Team 2 within 30 seconds. Register the LinkedIn Jobs API developer app on Week 1 Day 1 — approval takes 5–10 business days.',
    provides: [
      { to: 'CH Team 2', what: 'Candidate + Application within 30s. source=CAREERS_PORTAL' },
      { to: 'BL Team 4', what: 'Job posting analytics: views, clicks, apply-starts, completions' },
      { to: 'BL Team 4', what: 'Kafka: job_posting.published/unpublished, application.submitted' }
    ],
    needs: [
      { from: 'CH Team 1', what: 'Auth (internal portal), AuditLogClient, Notification service' },
      { from: 'CH Team 1', what: 'Demand records in OPEN_EXTERNAL for posting pre-fill' },
      { from: 'BL Team 4', what: 'AI JD generation and channel recommendation' }
    ],
    entities: ['JobPosting'],
    integrations: [
      'LinkedIn Jobs REST API — one-click publish (register Day 1)',
      'Indeed XML feed — primary fallback for LinkedIn',
      'axe-core — WCAG 2.1 AA accessibility scanning'
    ]
  },
  4: {
    color: '#ce93d8',
    num: 'T4',
    name: 'Market Presence — AI + Analytics',
    city: 'Bangalore',
    size: 4,
    roles: 'AI×1 · FE×2 · Analytics×1',
    mission: 'Own AI-powered job description generation, the RAG careers chatbot, cross-cutting analytics dashboards for all three other verticals, and the shared AI guardrail library consumed by all 6 teams. Most complex AI architecture and most cross-team dependencies — guardrail library must be in Maven repo by Week 2.',
    provides: [
      { to: 'All Teams', what: 'AI guardrail library (Maven) — PII strip, bias block, fallback' },
      { to: 'All Teams', what: 'AIInteraction logging (every LLM call from all 6 teams)' },
      { to: 'BL Team 3', what: 'AI JD generation API + channel recommendation' },
      { to: 'All stakeholders', what: 'RMG dashboard, Hiring Pipeline dashboard, AI usage dashboard' }
    ],
    needs: [
      { from: 'CH Team 1', what: 'Demand analytics API + AIInteraction table schema' },
      { from: 'CH Team 2', what: 'Pipeline analytics API (conversion, time-per-stage)' },
      { from: 'BL Team 3', what: 'Job posting analytics (views, clicks, apply)' },
      { from: 'HY Team 5', what: 'Bench analytics API (size, match rate, nomination time)' }
    ],
    entities: ['AIInteraction'],
    integrations: [
      'OpenAI GPT-4o — JD generation, channel recommender',
      'GPT-4o + pgvector RAG — careers portal FAQ chatbot',
      'Apache Kafka — analytics pipeline, AIInteraction events',
      'Grafana + Loki + Tempo — observability dashboards (BL T4 owned)'
    ]
  },
  5: {
    color: '#ffb74d',
    num: 'T5',
    name: 'Workforce Allocation — Services',
    city: 'Hyderabad',
    size: 5,
    roles: 'BE×3 · FE×1 · DevOps×1',
    mission: 'Own the workforce allocation services backend — engineer profiles, bench reports, semantic pgvector matching, nomination workflow, and HRIS bulk import. Most technically novel AI feature in Forge: cosine similarity matching via pgvector. Review embedding architecture with mentor at Week 3 checkpoint before Week 4 feature completion begins.',
    provides: [
      { to: 'CH Team 1', what: 'InternalMatch nominations for Demand E2E view' },
      { to: 'CH Team 1', what: 'Kafka: match.nominated/accepted/rejected, employee.imported' },
      { to: 'HY Team 6', what: 'All workforce allocation REST APIs' },
      { to: 'BL Team 4', what: 'Bench analytics API (bench size, match rate, nomination time)' }
    ],
    needs: [
      { from: 'CH Team 1', what: 'Auth, AuditLogClient, Notification service, Kafka cluster, pgvector' },
      { from: 'CH Team 1', what: 'demand.approved Kafka event to trigger RMG notification' },
      { from: 'CH Team 1', what: 'Seed data: 5,000 engineer records' }
    ],
    entities: ['InternalEmployee', 'InternalMatch'],
    integrations: [
      'OpenAI text-embedding-3-small — vectorise engineer skills for pgvector',
      'pgvector — cosine similarity top-5 match',
      'BambooHR REST API or CSV — HRIS bulk import',
      'Apache Kafka — demand.approved consumer, skills_updated producer'
    ]
  },
  6: {
    color: '#f06292',
    num: 'T6',
    name: 'Workforce Allocation — UI + Skills',
    city: 'Hyderabad',
    size: 3,
    roles: 'FE×2 · BE×1',
    mission: 'Own the RMG-facing UI and the AI upskilling feature — consuming Hyderabad Team 5 APIs to render the bench dashboard, skills gap heatmap, nomination workflow, and AI match results. Team of 3 — zero Should items. Mentor check-ins begin Week 1, not Week 4.',
    provides: [
      { to: 'HY Team 5', what: 'employee.skills_updated Kafka event (triggers pgvector refresh)' },
      { to: 'CH Team 1', what: 'RMG nomination actions visible in Demand E2E view' }
    ],
    needs: [
      { from: 'HY Team 5', what: 'All workforce allocation REST APIs (bench, search, nomination, AI match)' },
      { from: 'CH Team 1', what: 'Auth, design system components' },
      { from: 'BL Team 4', what: 'AI guardrail library' }
    ],
    entities: ['(UI layer — no owned tables)'],
    integrations: [
      'HY Team 5 REST APIs — bench, search, nomination, AI match',
      'GPT-4o / Claude 3.5 Sonnet — upskilling path suggestions'
    ]
  }
};

export const teamDeliverables = {
  1: [
    { week: 1, items: ['Auth service stub (JWT + OAuth2) — all teams consume', 'API gateway routing config + RBAC enforcement', 'Canonical PostgreSQL DDL + pgvector enabled', 'Kafka cluster + topic catalog + event schema catalog', 'AuditLogClient library v0', 'Design system v0 — 10 components, npm package published', 'Demand domain model + OpenAPI spec /contracts/team1/'] },
    { week: 2, items: ['Notification service (Kafka-driven)', 'AuditLog service + client lib', 'Demand CRUD + state machine (DRAFT→FILLED)', 'Basic demand dashboard UI', 'AI skill suggestion wired (REQ-DM-10)', 'OTel + Grafana/Loki/Tempo stack live'] },
    { week: 3, items: ['RBAC in API gateway + rate limiting', 'Slack webhooks', 'Approval workflow 72h SLA + auto-escalation', 'Internal-first gate (5-day RMG window)', 'E2E pipeline view (nominations + candidates)', 'Analytics REST API endpoints'] },
    { week: 4, items: ['OTel trace hardening', 'K8s ingress + TLS + blue-green deploy', 'Demand split (partial internal/external)', 'AI time-to-fill prediction (REQ-DM-12)', 'Seed data: 5k engineers, 20k candidates, 500 demands', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection', 'Spring Cloud Contract tests green'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'Security checklist', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Platform reliability during all 6 team demos', 'Architecture doc + runbook handoff', 'Live analytics on real demo traffic', 'Full E2E demo participation'] }
  ],
  2: [
    { week: 1, items: ['Candidate + Application + Interview + Scorecard + Offer domain model', 'OpenAPI spec /contracts/team2/', 'Docker Compose local dev', 'Spring Boot scaffold', 'All dev accounts registered (Google Calendar, DocuSign, Affinda)'] },
    { week: 2, items: ['Candidate CRUD + resume upload (PDF/DOCX)', 'AI resume parsing via GPT-4o / Affinda (REQ-ER-02)', 'Application pipeline CRUD (Applied→Hired/Rejected)', 'Candidate deduplication (REQ-ER-03)'] },
    { week: 3, items: ['Interview scheduling via Google Calendar OAuth2', 'Scorecard submission per interview type', 'AI candidate scoring 0–100 (REQ-ER-12)', 'Every stage move written to AuditLog', 'Kafka events: candidate.created, application.stage_changed'] },
    { week: 4, items: ['Offer generation + DocuSign e-signature', 'Bulk actions (reject, move stage, export CSV)', 'GDPR deletion + JSON export (REQ-ER-05)', 'AI rejection email drafts (REQ-ER-13)', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection', 'GDPR deletion end-to-end', 'Spring Cloud Contract tests green'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'GDPR UAT', 'Security checklist', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Full E2E demo participation', 'Final documentation handoff'] }
  ],
  3: [
    { week: 1, items: ['JobPosting domain model', 'OpenAPI spec /contracts/team3/', 'Docker Compose + Spring Boot scaffold', 'LinkedIn Jobs API developer app registered (BL T3)', 'Indeed XML feed implementation started'] },
    { week: 2, items: ['Job posting CRUD + rich text editor', 'Careers portal static listing + Apply Now form', 'Indeed XML feed live', 'Job posting analytics API (views, clicks, apply-starts)'] },
    { week: 3, items: ['LinkedIn Jobs API publish live', 'Apply Now → CH Team 2 Talent Acquisition Engine within 30s', 'Posting expiry + auto-unpublish', 'Kafka: job_posting.published/unpublished, application.submitted'] },
    { week: 4, items: ['Employer branding section', 'Referral links (authenticated engineers)', 'SEO: /careers/{slug} + JSON-LD JobPosting schema', 'axe-core scan — zero critical violations', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection', 'Spring Cloud Contract tests green'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'Security checklist', 'axe-core zero critical', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Full E2E demo participation', 'Final documentation handoff'] }
  ],
  4: [
    { week: 1, items: ['AI SDK wired (OpenAI + Anthropic Java SDKs)', 'Guardrail library scaffold (PII stripping, bias blocklist, fallback trigger)', 'Grafana + Loki + Tempo stack setup', 'AIInteraction table schema with CH Team 1', 'Domain model for analytics data layer'] },
    { week: 2, items: ['AI guardrail library v1 published to shared Maven repo', 'JD generation wired — 4 sections, min 3 bullets (REQ-AI-01)', 'AIInteraction logging from all features', 'RAG chatbot scaffold — pgvector retrieval wired'] },
    { week: 3, items: ['RAG chatbot live — streams, fallback at confidence < 0.7 (REQ-AI-02)', 'Channel recommender (REQ-AI-03)', 'Analytics dashboards v1 — RMG + Hiring Pipeline', 'Consume CH T1, CH T2, HY T5 analytics APIs'] },
    { week: 4, items: ['RMG dashboard (bench trends, match rate)', 'Hiring pipeline dashboard (fill rate, time-to-fill, conversion)', 'AI usage dashboard (tokens, cost, error rate, latency)', 'Cost alert: Slack alert at $40 projected spend', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection', 'Spring Cloud Contract tests green'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'Security checklist', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Full E2E demo participation', 'AIInteraction cost report presented', 'Final documentation handoff'] }
  ],
  5: [
    { week: 1, items: ['InternalEmployee + InternalMatch domain model', 'OpenAPI spec /contracts/team5/', 'pgvector schema confirmed with CH Team 1', 'Docker Compose + Spring Boot scaffold'] },
    { week: 2, items: ['Engineer profile CRUD', 'Bench report API (grouped by availability window)', 'HRIS CSV bulk import with row-level validation', 'RMG multi-criteria search API'] },
    { week: 3, items: ['Nomination workflow (RMG nominates → HM reviews)', 'Kafka: demand.approved consumer → RMG notification within 5 min', 'pgvector cosine similarity search live (REQ-IT-12)', 'Embedding refresh job on employee.skills_updated Kafka event', 'Analytics API for bench data (consumed by BL Team 4)'] },
    { week: 4, items: ['Utilisation tracking (flags >100% and <50%)', 'Engineer self-service API (skills + availability update)', 'HRIS REST sync (BambooHR or CSV)', 'Analytics API polished — staleness tracking via last_embedded_at', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection', 'Spring Cloud Contract tests green'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'Security checklist', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Full E2E demo participation', 'Final documentation handoff'] }
  ],
  6: [
    { week: 1, items: ['Domain model aligned with HY Team 5', 'Consume HY T5 API contracts (build against stubs)', 'Design system components from CH Team 1 setup', 'Bench dashboard UI scaffold'] },
    { week: 2, items: ['Bench dashboard UI — engineers grouped by availability window', 'Nomination UI scaffold', 'HY T5 mock API consumer working end-to-end'] },
    { week: 3, items: ['Skills gap heatmap (required skills vs bench skills, colour-coded)', 'AI match results UI — top-5 engineers with fit %, missing skills, rationale', 'Self-service portal — engineers update skills + availability', 'AI upskilling wired (REQ-UI-06)'] },
    { week: 4, items: ['Nomination UI complete — HM review + mandatory rejection reason (20 chars)', 'Fallback UI: AI unavailable message when HY T5 AI service errors', 'All 6 Must requirements coded and passing unit tests', '60% JaCoCo + mentor sign-off'] },
    { week: 5, items: ['Full E2E flows tested', 'AI fallback modes verified by error injection'] },
    { week: 6, items: ['k6 load test at 500 concurrent users', 'Security checklist', '60% JaCoCo confirmed in CI'] },
    { week: 7, items: ['Mentor leads play stakeholder roles', 'Bug triage', 'All acceptance criteria verified'] },
    { week: 8, items: ['Full E2E demo participation', 'Final documentation handoff'] }
  ]
};

export const teamRequirements = {
  1: [
    {id:'PLAT-01', text:'Auth service: JWT + OAuth2 via Spring Security. Token validation library consumed by all teams. Stubs delivered Week 1 Day 3.', priority:'Must', ai:false},
    {id:'PLAT-02', text:'API Gateway: routing, rate limiting, RBAC enforcement, HTTPS at ingress.', priority:'Must', ai:false},
    {id:'PLAT-03', text:'Kafka cluster: topic provisioning, event schema catalog, consumer group conventions. All inter-service async events route through Kafka.', priority:'Must', ai:false},
    {id:'PLAT-04', text:'Shared PostgreSQL schema conventions + DDL. pgvector extension enabled. AuditLog append-only table. AuditLogClient shared library.', priority:'Must', ai:false},
    {id:'PLAT-05', text:'Notification service: in-app + email delivery consumed by all teams via Kafka notification.send events.', priority:'Must', ai:false},
    {id:'PLAT-06', text:'Design system v0: token file, 10 core components, app shell with auth-aware routing. npm package published by Week 1 Day 3.', priority:'Must', ai:false},
    {id:'REQ-DM-01', text:'Any authorised user (HM, Delivery Lead) can create a Demand via a validated form. All fields type-checked server-side before persistence.', priority:'Must', ai:false},
    {id:'REQ-DM-02', text:'Demand fields: title, seniority level, skills[] (multi-select), location, start date, priority, client/project, headcount, budget ceiling, contract type.', priority:'Must', ai:false},
    {id:'REQ-DM-03', text:'Approval workflow: Creator → Department Lead → Finance. 72-hour SLA per stage. Auto-escalate expired approvals. Full audit trail via AuditLog.', priority:'Must', ai:false},
    {id:'REQ-DM-04', text:'Internal-first gate: OPEN_EXTERNAL status locked until RMG has had 5 business days from APPROVED to nominate an internal engineer.', priority:'Must', ai:false},
    {id:'REQ-DM-05', text:'Demand state machine: DRAFT → PENDING_APPROVAL → APPROVED → INTERNAL_SEARCH → OPEN_EXTERNAL → FILLED | CANCELLED | ON_HOLD. Illegal transitions return HTTP 400.', priority:'Must', ai:false},
    {id:'REQ-DM-06', text:'E2E pipeline view per demand: internal nominations from HY teams and external candidates from Chennai T2 in one unified view.', priority:'Must', ai:false},
    {id:'REQ-DM-07', text:'Demand dashboard: status, age in days, source breakdown. Filter by status/priority/BU. Sort by age and priority. Loads under 2s with 500 records.', priority:'Must', ai:false},
    {id:'REQ-DM-08', text:'Demand closure requires reason code: FILLED_INTERNAL · FILLED_EXTERNAL · CANCELLED · ON_HOLD · DUPLICATE.', priority:'Must', ai:false},
    {id:'REQ-DM-09', text:'Each demand linked to project and client entity for capacity reporting consumed by BL Team 4 analytics pipeline.', priority:'Must', ai:false},
    {id:'REQ-DM-10', text:'AI: Auto-suggest required skills when recruiter enters role title and seniority. Selectable chips. Response under 3s. Cache by (title, level) in Redis.', priority:'Must', ai:true},
    {id:'REQ-DM-11', text:'Demand split: one demand can be partially filled internally and partially externally. Both tracks tracked independently on the same demand record.', priority:'Should', ai:false},
    {id:'REQ-DM-12', text:'AI: Predict estimated time-to-fill in days (with confidence range) using few-shot inference over similar historical demands and current bench depth.', priority:'Should', ai:true},
    {id:'REQ-DM-13', text:'Analytics API: demand fill rate, avg time-to-fill, internal vs external split — exposed as REST endpoint consumed by BL Team 4 dashboards.', priority:'Must', ai:false}
  ],
  2: [
    {id:'REQ-ER-01', text:'Recruiters see all demands in OPEN_EXTERNAL state with title, required skills, seniority, priority, and age. Sorted by priority descending by default.', priority:'Must', ai:false},
    {id:'REQ-ER-02', text:'External candidate profiles: manual entry, resume upload (PDF/DOCX up to 10 MB), AI-powered parsing into structured fields.', priority:'Must', ai:true},
    {id:'REQ-ER-03', text:'Candidate deduplication by email and phone. On conflict, show a field-level merge prompt before creating a new record.', priority:'Must', ai:false},
    {id:'REQ-ER-04', text:'Per-candidate and per-application: freetext notes, custom tags, source tracking (LINKEDIN · INDEED · CAREERS_PORTAL · REFERRAL · MANUAL).', priority:'Must', ai:false},
    {id:'REQ-ER-05', text:'GDPR: consent at application. Hard delete of all PII from PostgreSQL and S3 within 72 hours, confirmed by AuditLog entry action=PII_DELETED. Data export as JSON within 10 seconds.', priority:'Must', ai:false},
    {id:'REQ-ER-06', text:'Application pipeline per demand: Applied → Screening → Technical → Interview → Final Round → Offer → Hired | Rejected. Every stage move written to AuditLog.', priority:'Must', ai:false},
    {id:'REQ-ER-07', text:'Interview scheduling: check interviewer calendar via Google Calendar OAuth2, generate auto-invite with video link, store calendarEventId on Interview record.', priority:'Must', ai:false},
    {id:'REQ-ER-08', text:'Structured scorecard per interview type (Technical, Behavioural, Cultural Fit). Ratings stored as JSONB per competency. Aggregate recommendation computed by service.', priority:'Must', ai:false},
    {id:'REQ-ER-09', text:'Offer generation from configurable templates: base salary, bonus, equity, start date, role title. Multi-step approval chain as ordered JSONB array. DocuSign e-signature.', priority:'Must', ai:false},
    {id:'REQ-ER-10', text:'Bulk actions: bulk reject, bulk move stage, bulk export to CSV. All bulk operations write individual AuditLog entries.', priority:'Should', ai:false},
    {id:'REQ-ER-11', text:'Candidate communication: send templated emails (interview invite, rejection, offer summary) from platform with variable substitution. Recruiter previews before send.', priority:'Should', ai:false},
    {id:'REQ-ER-12', text:'AI: Score and rank candidates 0–100 against demand required skills. Return score, matched skills, missing skills, and minimum 3-sentence written rationale. Response under 5 seconds.', priority:'Must', ai:true},
    {id:'REQ-ER-13', text:'AI: Generate personalised rejection email draft for recruiter review. Recruiter must confirm before send — never auto-send.', priority:'Should', ai:true},
    {id:'REQ-ER-14', text:'AI: Suggest 5–8 targeted follow-up interview questions from resume content and prior scorecard competency gaps. Label each with intent.', priority:'Should', ai:true},
    {id:'REQ-ER-15', text:'Analytics API: pipeline conversion rates, avg time-per-stage, offer acceptance rate — exposed as REST endpoint consumed by BL Team 4 dashboards.', priority:'Must', ai:false}
  ],
  3: [
    {id:'REQ-JP-01', text:'Job Posting creation pre-filled from demand data when demand moves to OPEN_EXTERNAL. No manual copy-paste required.', priority:'Must', ai:false},
    {id:'REQ-JP-02', text:'Rich text posting editor: role summary, key responsibilities, requirements, salary range (optional), benefits, location, remote policy, application deadline.', priority:'Must', ai:false},
    {id:'REQ-JP-03', text:'One-click publish to LinkedIn Jobs (REST API) and Indeed (XML feed). Channel status (live/pending/failed) shown per posting. Auto-unpublish on expiry or demand closure.', priority:'Must', ai:false},
    {id:'REQ-JP-04', text:'Auto-publish to careers portal on posting approval. Careers portal always reflects live posting state in real time.', priority:'Must', ai:false},
    {id:'REQ-JP-05', text:'Job posting analytics: views, clicks, apply-starts, apply-completions per posting per channel. Exposed to BL Team 4 analytics API.', priority:'Should', ai:false},
    {id:'REQ-JP-06', text:'Public careers portal: filterable listing by location, seniority, and keyword. Company culture section. Mobile-responsive. WCAG 2.1 AA. axe-core zero critical violations.', priority:'Must', ai:false},
    {id:'REQ-JP-07', text:'Apply Now: candidate submits name, email, phone, resume (PDF or DOCX). Confirmation email sent within 2 minutes. Duplicate application blocked with a friendly message.', priority:'Must', ai:false},
    {id:'REQ-JP-08', text:'Applicant appears in Chennai T2 Talent Acquisition Engine as Candidate + Application within 30 seconds of form submit. Source = CAREERS_PORTAL. Verifiable in CH T2 UI.', priority:'Must', ai:false},
    {id:'REQ-JP-09', text:'SEO: /careers/{slug} URL structure, JSON-LD structured data (JobPosting schema), meta description auto-generated from role summary.', priority:'Should', ai:false},
    {id:'REQ-JP-10', text:'Employer branding section: editable About Us, culture values, benefits, employee story cards. Managed by admin/HR users only.', priority:'Should', ai:false},
    {id:'REQ-JP-11', text:'Referral links: authenticated engineers generate a unique referral URL per posting. Source tracked as REFERRAL through to hire outcome.', priority:'Should', ai:false}
  ],
  4: [
    {id:'REQ-AI-01', text:'AI: One-click JD generation from demand fields. Output: 4 labelled sections (Summary, Responsibilities, Requirements, Benefits), min 3 bullets each. Response under 5s. Recruiter edits before publish.', priority:'Must', ai:true},
    {id:'REQ-AI-02', text:'AI: FAQ chatbot on careers portal grounded via RAG on live job postings + FAQ document. Streams responses. Falls back to contact form when confidence < 0.7. Clearly labelled AI-assisted.', priority:'Must', ai:true},
    {id:'REQ-AI-03', text:'AI: Channel recommendation — classify role type and suggest optimal publishing channels ranked by historical apply-to-interview conversion rate.', priority:'Must', ai:true},
    {id:'REQ-AI-04', text:'AIInteraction logging table: every LLM call from all 6 teams logged with featureType, inputHash (SHA-256), model, tokens, latencyMs, errorCode. No raw PII.', priority:'Must', ai:false},
    {id:'REQ-AI-05', text:'AI guardrail library: shared Spring @Component consumed by all teams. Enforces: human-in-loop validation, PII stripping before API calls, bias field blocklist, graceful fallback trigger. Published to shared Maven repo by Week 2.', priority:'Must', ai:false},
    {id:'REQ-AN-01', text:'RMG dashboard: bench size trend (30-day chart), upcoming availability count, internal match success rate, demand coverage %. Sub-minute Kafka-driven freshness. Consumes HY Team 5 analytics API.', priority:'Must', ai:false},
    {id:'REQ-AN-02', text:'Hiring pipeline dashboard: demand fill rate, avg time-to-fill, internal vs external split, pipeline conversion rates per stage. Consumes CH Team 1 + CH Team 2 analytics APIs.', priority:'Must', ai:false},
    {id:'REQ-AN-03', text:'AI usage dashboard: call count, total tokens, estimated cost, avg latency, error rate per feature type. Sourced from AIInteraction table via Kafka pipeline.', priority:'Must', ai:false}
  ],
  5: [
    {id:'REQ-IT-01', text:'Engineer profile: name, employeeId, level, skills[] (vectorised), currentProject, availabilityDate, location, contractType, utilisationPct, managerId.', priority:'Must', ai:false},
    {id:'REQ-IT-02', text:'Bench report API: engineers grouped by availability window (under 30 days, 30–60 days, 60–90 days). Auto-refreshes daily at 06:00 UTC.', priority:'Must', ai:false},
    {id:'REQ-IT-03', text:'RMG search API: filter by skill, availability, location, seniority, contractType. Multi-criteria AND logic. Results ranked by availabilityDate ascending.', priority:'Must', ai:false},
    {id:'REQ-IT-04', text:'Bulk HRIS CSV import: validate on upload, row-level error report before commit, 1,000 rows/batch, publish employee.imported Kafka event on success.', priority:'Must', ai:false},
    {id:'REQ-IT-05', text:'Engineer self-service API: authenticated engineers update own skills[] and availabilityDate only. All other fields RMG or admin only.', priority:'Should', ai:false},
    {id:'REQ-IT-06', text:'Utilisation tracking: allocation % per engineer per project. Flags over-allocation >100% and under-utilisation <50% via Kafka event.', priority:'Should', ai:false},
    {id:'REQ-IT-07', text:'When demand reaches APPROVED, Kafka consumer triggers RMG notification (in-app + email) within 5 minutes via Chennai T1 notification service.', priority:'Must', ai:false},
    {id:'REQ-IT-08', text:'RMG nominates engineer against demand. Creates InternalMatch record with status=PENDING_REVIEW. Engineer notified of their nomination.', priority:'Must', ai:false},
    {id:'REQ-IT-09', text:'Nomination workflow: RMG nominates → HM reviews → ACCEPTED or REJECTED with mandatory written reason (min 20 characters). Full workflow visible in Chennai T1 Demand E2E view.', priority:'Must', ai:false},
    {id:'REQ-IT-10', text:'On acceptance: demand status updated, engineer assignment updated, internal_match.accepted Kafka event published, both RMG and engineer notified within 5 minutes.', priority:'Must', ai:false},
    {id:'REQ-IT-11', text:'Store engineer skills[] as vector(1536) in pgvector column alongside text[] column. Embedding refresh job fires on employee.skills_updated Kafka event. Track staleness via last_embedded_at.', priority:'Must', ai:true},
    {id:'REQ-IT-12', text:'AI: For each open demand, cosine similarity search in pgvector returns top-5 engineers ranked by fit score with fit %, missing skills[], and one-paragraph rationale. Response under 5 seconds. Graceful fallback to manual search if AI unavailable.', priority:'Must', ai:true},
    {id:'REQ-IT-13', text:'Analytics API: bench size by availability window, internal match success rate, avg nomination-to-decision time — consumed by BL Team 4 RMG dashboard.', priority:'Must', ai:false}
  ],
  6: [
    {id:'REQ-UI-01', text:'Bench dashboard UI: engineers grouped by availability window with filter/search. CSV export under 3 seconds for 500 records.', priority:'Must', ai:false},
    {id:'REQ-UI-02', text:'Skills gap heatmap: required skills across all open demands vs skills available on bench — sortable, colour-coded matrix. Refreshes on demand.', priority:'Must', ai:false},
    {id:'REQ-UI-03', text:'Nomination UI: RMG nominates engineer against demand. HM review workflow with mandatory rejection reason (min 20 chars). Status visible in Chennai T1 Demand E2E view.', priority:'Must', ai:false},
    {id:'REQ-UI-04', text:'AI match results UI: top-5 engineers per demand with fit %, missing skills, rationale paragraph. AI-generated badge on all results. Fallback message if HY Team 5 AI service unavailable.', priority:'Must', ai:true},
    {id:'REQ-UI-05', text:'Engineer self-service portal: authenticated engineers update own skills and availability date. Changes trigger employee.skills_updated Kafka event to refresh pgvector embeddings in HY Team 5.', priority:'Must', ai:false},
    {id:'REQ-UI-06', text:'AI: For bench engineers whose skills[] do not match any open demand via pgvector search, suggest 3–5 upskilling learning paths — course title, platform, estimated hours, and rationale per suggestion.', priority:'Must', ai:true}
  ]
};
