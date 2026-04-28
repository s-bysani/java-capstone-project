# Forge
## AI-Native Workforce Intelligence Platform
### Product Engineering Specification · v2.0 · 6-Team Location Structure · Grid Dynamics Engineering Program · 2026

---

| Field | Details |
|---|---|
| Document | Product Engineering Specification (PES) v2.0 |
| Platform | Forge — AI-Native Workforce Intelligence Platform |
| Tagline | Engineering the talent supply chain — intelligently. |
| Status | Approved — 6-Team Location-Based Structure |
| Date | April 24, 2026 |
| Delivery | 8 Weeks — Grid Dynamics Engineering Internship Sprint |
| Team Structure | 6 Location-Pure Teams · Chennai 2 · Bangalore 2 · Hyderabad 2 |
| Headcount | Chennai 13 (7+6) · Bangalore 9 (5+4) · Hyderabad 8 (5+3) |
| Stack | Java 17 + Spring Boot 3 · React/Angular 17 · PostgreSQL + pgvector · Kafka · K8s |
| AI Stack | GPT-4o · Claude 3.5 · OpenAI Embeddings · RAG · Spring AI |
| Classification | Internal · Grid Dynamics Engineering Program · Confidential |

> Forge replaces Grid Dynamics' fragmented staffing process — built to the same engineering standards the company delivers to clients, applied inward to one of its most operationally critical problems. All 30 engineers are peers; mentors hold the authority layer.

---

## Table of Contents

1. [Platform Identity](#1-platform-identity)
2. [Engineering the Talent Supply Chain](#2-engineering-the-talent-supply-chain)
3. [Engineering Program Structure](#3-engineering-program-structure)
4. [Role-Based Access Control](#4-role-based-access-control)
5. [Functional Requirements by Team](#5-functional-requirements-by-team)
6. [Acceptance Criteria](#6-acceptance-criteria)
7. [Data Model](#7-data-model)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Integration Landscape](#9-integration-landscape)
10. [Eight-Week Engineering Timeline](#10-eight-week-engineering-timeline)
11. [Risks and Mitigation](#11-risks-and-mitigation)
- [Appendix A — AI Integration Specification](#appendix-a-ai-integration-specification)
- [Appendix B — Team Formation](#appendix-b-team-formation)
- [Glossary](#glossary)

---

## 1. Platform Identity

Forge replaces Grid Dynamics' fragmented staffing process — not by building a better form, but by treating workforce allocation as a first-class engineering problem: event-driven, semantically matched, and AI-augmented from the ground up.

| What Forge Does | How It Differs from Conventional Staffing Tools |
|---|---|
| Replaces Grid Dynamics' spreadsheet-driven staffing process — demand creation, internal matching, external hiring, and job marketing in one platform | Built AI-native from the ground up — semantic matching, LLM inference, and vector search are architectural decisions, not features bolted on after the fact |
| Manages the full workforce demand lifecycle from creation through internal bench search, external candidate sourcing, offer, and closure | Event-driven microservices on Kafka — the same architecture Grid Dynamics delivers to Fortune 500 clients |
| Gives RMG, Talent Acquisition, and leadership a real-time unified view of demand, bench availability, and candidate pipeline | Sub-minute data freshness via Kafka-driven analytics — not a T+5 day report from a spreadsheet export |
| Publishes job postings to LinkedIn, Indeed, and the careers portal with AI-generated job descriptions in one click | AI reduces recruiter admin from ~40% of working time to under 20% — a workflow transformation, not a UI improvement |
| Built by 30 Grid Dynamics engineers across 3 cities under the same standards applied to client engagements | Production-grade: OTel observability, pgvector semantic search, GDPR-compliant data handling, 60% test coverage in CI |

### 1.1 The v2.0 Change — Location-Based Team Structure

Version 2.0 restructures delivery from 5 cross-city teams to 6 location-pure teams. Each city owns complete module(s). No team has members from more than one city.

| City | Teams | Engineers | Modules Owned |
|---|---|---|---|
| Chennai | Team 1 + Team 2 | 7 + 6 = 13 | Platform Core + Demand Intelligence (T1) · Talent Acquisition Engine (T2) |
| Bangalore | Team 3 + Team 4 | 5 + 4 = 9 | Market Presence — Core Portal (T3) · Market Presence AI + Analytics (T4) |
| Hyderabad | Team 5 + Team 6 | 5 + 3 = 8 | Workforce Allocation — Services (T5) · Workforce Allocation UI + Skills (T6) |

---

## 2. Engineering the Talent Supply Chain

### 2.1 Why This Problem Exists

| Signal | Current State | Consequence | Forge's Solution |
|---|---|---|---|
| Demand for a role | Created in a spreadsheet; no approval trail | Duplicate positions opened; budget misallocated | Chennai T1 — Demand Intelligence vertical |
| Bench engineer availability | Known only to individual RMs; no system of record | Engineers sit idle; unnecessary external hiring | Hyderabad T5/T6 — Workforce Allocation vertical |
| External candidate pipeline | Managed per-recruiter in email; no unified view | Same candidate contacted twice; no pipeline analytics | Chennai T2 — Talent Acquisition Engine |
| Job market presence | Manual posting per channel; 5–7 day lag | Talent lost to faster competitors | Bangalore T3/T4 — Market Presence vertical |
| Cross-function visibility | Leadership gets T+5 day reports from manual exports | Capacity planning on stale data | Bangalore T4 — Cross-cutting Analytics dashboards |

### 2.2 The Engineering Decisions That Separate Forge

- **Semantic matching over keyword search:** Engineer skills and demand requirements embedded as vectors in pgvector. Matching is cosine similarity — not a SQL LIKE query. Owned by Hyderabad Team 5.
- **Event-driven state propagation:** Every demand state change, pipeline move, and allocation decision is a Kafka event. Downstream systems react — no polling. Kafka cluster owned by Chennai Team 1.
- **LLM inference as first-class service:** Resume parsing, candidate scoring, JD generation, and RAG chatbot are LLM API calls with token budgets, retry logic, caching, and structured output schemas.
- **Observability from Week 2:** OTel traces, structured JSON logs to Loki, and Grafana dashboards instrumented in Week 2 — not added in Week 7. Analytics dashboards owned by Bangalore Team 4.

---

## 3. Engineering Program Structure

> **All 30 engineers are peers — no hierarchy within teams.** Mentors hold the authority layer. Decisions within a team are made collaboratively; escalations go to the mentor.

### 3.1 6-Team Location Structure

| Team | City | Module | Engineers | Roles | Mentors |
|---|---|---|---|---|---|
| Team 1 | Chennai | Platform Core + Demand Intelligence | 7 | BE×3 · FE×2 · DevOps×1 · AI×1 | 2 (critical) |
| Team 2 | Chennai | Talent Acquisition Engine | 6 | BE×2 · FE×2 · DevOps×1 · AI×1 | 1 |
| Team 3 | Bangalore | Market Presence — Core Portal | 5 | BE×2 · FE×2 · DevOps×1 | 1 |
| Team 4 | Bangalore | Market Presence — AI + Analytics | 4 | AI×1 · FE×2 · Analytics×1 | 1 (AI/ML specialist) |
| Team 5 | Hyderabad | Workforce Allocation — Services | 5 | BE×3 · FE×1 · DevOps×1 | 1 (ML/embeddings) |
| Team 6 | Hyderabad | Workforce Allocation — UI + Skills | 3 | FE×2 · BE×1 | 1 (AI specialist) |

### 3.2 Mandatory Engineering Stack

| Layer | Technology | Standard |
|---|---|---|
| Backend | Java 17 + Spring Boot 3.x | Spring Data JPA, Spring Security OAuth2, Maven/Gradle, OpenAPI 3.0 spec per service |
| Frontend | React 18 or Angular 17 | TypeScript mandatory. Uniform within team. Design system components from Chennai T1. |
| Database | PostgreSQL 15 + pgvector | Schema conventions + DDL owned by Chennai T1. Each team adds migrations in `/db/migrations/{team}/`. |
| Message bus | Apache Kafka | Chennai T1 provisions cluster. All inter-service async events go through Kafka. |
| Containerisation | Docker + Docker Compose | All services containerised. Multi-stage Dockerfiles mandatory. |
| Orchestration | Kubernetes (K8s) | Deployed to shared Grid Dynamics intern cluster. Readiness + liveness probes on every service. |
| CI/CD | GitHub Actions | Each team owns their pipeline. Merge to main triggers compile → test → Docker build → push → K8s deploy. |
| API contract | OpenAPI 3.0 | Specs in `/contracts/{team}/` in monorepo. Frozen by Week 1 Day 2. Spring Cloud Contract tests in CI. |
| AI / LLM | OpenAI GPT-4o · Anthropic Claude 3.5 · Embeddings | Official Java SDKs. API keys from GitHub Secrets — never in source. All calls logged to AIInteraction table. |
| Observability | OpenTelemetry + Grafana + Loki + Tempo | OTel traces to Tempo. JSON logs to Loki. Grafana dashboards live by Week 3. Owned by BL Team 4. |
| Vector store | pgvector (PostgreSQL extension) | Used by HY Team 5 for semantic skill embeddings. Enabled in shared schema by CH Team 1 Week 1. |

### 3.3 Non-Negotiable Engineering Standards

- **Test coverage:** Minimum 60% line coverage per service (JaCoCo). Minimum 3 integration tests per cross-team API contract (Spring Cloud Contract).
- **No secrets in source:** Zero tolerance. API keys, DB passwords, JWT secrets in GitHub Actions Secrets or K8s Secrets only. GitHub secret scanning enabled from Day 1.
- **OpenAPI specs before code:** No service implementation begins without a committed spec. Code follows the spec.
- **Structured logging:** JSON logs only. No PII in any log line. CI lint rule enforced from Week 1.
- **Immutable infrastructure:** No SSH into running containers. All changes go through CI/CD.

---

## 4. Role-Based Access Control

> Chennai Team 1 implements this matrix in the auth service using Spring Security method-level security. All other teams enforce it in their service layer and UI route guards. **Admin has unrestricted access** and is omitted for brevity.
>
> **Legend:** `Y` = full access · `Own` = own records only · `Read` = read-only · `—` = no access

| Action | Recruiter | RM / RMG | Hiring Manager | Interviewer | Candidate |
|---|---|---|---|---|---|
| Create / edit Demand | — | Read | Own | — | — |
| Approve Demand | — | — | Lead role only | — | — |
| View all Demands | Y | Y | Own BU only | — | — |
| Create Candidate profile | Y | — | — | — | Self |
| Move application pipeline stage | Y | — | — | — | — |
| Schedule interview | Y | — | — | — | — |
| Submit interview scorecard | — | — | — | Own | — |
| View all scorecards for a demand | Y | — | Own demand | — | — |
| Generate and send offer | Y | — | — | — | — |
| Nominate bench engineer for demand | — | Y | — | — | — |
| Accept or reject internal match | — | — | Own demand | — | — |
| View bench / employee list | Read | Y (full) | Read | — | — |
| Edit employee profile | — | Own team | — | — | Self skills |
| Create and publish job posting | Y | — | — | — | — |
| Apply for a job | — | — | — | — | Y |
| View analytics dashboards | Recruiting | Talent | Own BU | — | — |
| Manage users and roles | — | — | — | — | — |

---

## 5. Functional Requirements by Team

> **Priority:** `Must` = required for Week 8 demo. `Should` = implement if schedule permits. `Could` = stretch goal. `AI` = requires LLM API integration.

---

### 5.1 Chennai — Team 1: Platform Core + Demand Intelligence

**7 engineers · BE×3 · FE×2 · DevOps×1 · AI×1 · 2 Mentors**

> Team 1 owns the shared infrastructure all other teams depend on AND the demand lifecycle module. Auth stubs, Kafka, API gateway, and design system must all be live by Week 1 Day 3 or every other team is blocked.

#### Platform Foundation

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| PLAT-01 | Auth service: JWT + OAuth2 via Spring Security. Token validation library consumed by all teams. Stubs delivered Week 1 Day 3. | Must | — |
| PLAT-02 | API Gateway: routing, rate limiting, RBAC enforcement, HTTPS at ingress. | Must | — |
| PLAT-03 | Kafka cluster: topic provisioning, event schema catalog, consumer group conventions. All inter-service async events route through Kafka. | Must | — |
| PLAT-04 | Shared PostgreSQL schema conventions + DDL. pgvector extension enabled. AuditLog append-only table. AuditLogClient shared library. | Must | — |
| PLAT-05 | Notification service: in-app + email delivery consumed by all teams via Kafka `notification.send` events. | Must | — |
| PLAT-06 | Design system v0: token file, 10 core components, app shell with auth-aware routing. npm package published by Week 1 Day 3. | Must | — |

#### Demand Intelligence — Module 1

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-DM-01 | Any authorised user (HM, Delivery Lead) can create a Demand via a validated form. All fields type-checked server-side before persistence. | Must | — |
| REQ-DM-02 | Demand fields: title, seniority level, skills[] (multi-select), location, start date, priority, client/project, headcount, budget ceiling, contract type. | Must | — |
| REQ-DM-03 | Approval workflow: Creator → Department Lead → Finance. 72-hour SLA per stage. Auto-escalate expired approvals. Full audit trail via AuditLog. | Must | — |
| REQ-DM-04 | Internal-first gate: OPEN_EXTERNAL status locked until RMG has had 5 business days from APPROVED to nominate an internal engineer. | Must | — |
| REQ-DM-05 | Demand state machine: DRAFT → PENDING_APPROVAL → APPROVED → INTERNAL_SEARCH → OPEN_EXTERNAL → FILLED or CANCELLED or ON_HOLD. Illegal transitions return HTTP 400. | Must | — |
| REQ-DM-06 | E2E pipeline view per demand: internal nominations from HY teams and external candidates from Chennai T2 in one unified view. | Must | — |
| REQ-DM-07 | Demand dashboard: status, age in days, source breakdown. Filter by status/priority/BU. Sort by age and priority. Loads under 2s with 500 records. | Must | — |
| REQ-DM-08 | Demand closure requires reason code: FILLED_INTERNAL · FILLED_EXTERNAL · CANCELLED · ON_HOLD · DUPLICATE | Must | — |
| REQ-DM-09 | Each demand linked to project and client entity for capacity reporting consumed by BL Team 4 analytics pipeline. | Must | — |
| REQ-DM-10 | AI: Auto-suggest required skills when recruiter enters role title and seniority. Selectable chips. Response under 3s. Cache by (title, level) in Redis. | Must | AI |
| REQ-DM-11 | Demand split: one demand can be partially filled internally and partially externally. Both tracks tracked independently on the same demand record. | Should | — |
| REQ-DM-12 | AI: Predict estimated time-to-fill in days (with confidence range) using few-shot inference over similar historical demands and current bench depth. | Should | AI |
| REQ-DM-13 | Analytics API: demand fill rate, avg time-to-fill, internal vs external split — exposed as REST endpoint consumed by BL Team 4 dashboards. | Must | — |

---

### 5.2 Chennai — Team 2: Talent Acquisition Engine

**6 engineers · BE×2 · FE×2 · DevOps×1 · AI×1 · 1 Mentor**

> Highest third-party integration count of all teams. Register Google Calendar, DocuSign, and Affinda developer accounts on Week 1 Day 1.

#### Candidate Management

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-ER-01 | Recruiters see all demands in OPEN_EXTERNAL state with title, required skills, seniority, priority, and age. Sorted by priority descending by default. | Must | — |
| REQ-ER-02 | External candidate profiles: manual entry, resume upload (PDF/DOCX up to 10 MB), AI-powered parsing into structured fields. | Must | AI |
| REQ-ER-03 | Candidate deduplication by email and phone. On conflict, show a field-level merge prompt before creating a new record. | Must | — |
| REQ-ER-04 | Per-candidate and per-application: freetext notes, custom tags, source tracking (LINKEDIN · INDEED · CAREERS_PORTAL · REFERRAL · MANUAL) | Must | — |
| REQ-ER-05 | GDPR: consent at application. Hard delete of all PII from PostgreSQL and S3 within 72 hours, confirmed by AuditLog entry action=PII_DELETED. Data export as JSON within 10 seconds. | Must | — |

#### Pipeline, Interviews & Offers

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-ER-06 | Application pipeline per demand: Applied → Screening → Technical → Interview → Final Round → Offer → Hired or Rejected. Every stage move written to AuditLog. | Must | — |
| REQ-ER-07 | Interview scheduling: check interviewer calendar via Google Calendar OAuth2, generate auto-invite with video link, store calendarEventId on Interview record. | Must | — |
| REQ-ER-08 | Structured scorecard per interview type (Technical, Behavioural, Cultural Fit). Ratings stored as JSONB per competency. Aggregate recommendation computed by service. | Must | — |
| REQ-ER-09 | Offer generation from configurable templates: base salary, bonus, equity, start date, role title. Multi-step approval chain as ordered JSONB array. DocuSign e-signature. | Must | — |
| REQ-ER-10 | Bulk actions: bulk reject, bulk move stage, bulk export to CSV. All bulk operations write individual AuditLog entries. | Should | — |
| REQ-ER-11 | Candidate communication: send templated emails (interview invite, rejection, offer summary) from platform with variable substitution. Recruiter previews before send. | Should | — |

#### AI Features

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-ER-12 | AI: Score and rank candidates 0–100 against demand required skills. Return score, matched skills, missing skills, and minimum 3-sentence written rationale. Response under 5 seconds. | Must | AI |
| REQ-ER-13 | AI: Generate personalised rejection email draft for recruiter review. Recruiter must confirm before send — never auto-send. | Should | AI |
| REQ-ER-14 | AI: Suggest 5–8 targeted follow-up interview questions from resume content and prior scorecard competency gaps. Label each with intent. | Should | AI |
| REQ-ER-15 | Analytics API: pipeline conversion rates, avg time-per-stage, offer acceptance rate — exposed as REST endpoint consumed by BL Team 4 dashboards. | Must | — |

---

### 5.3 Bangalore — Team 3: Market Presence — Core Portal

**5 engineers · BE×2 · FE×2 · DevOps×1 · 1 Mentor**

> Register LinkedIn Jobs API developer app on Week 1 Day 1 — approval can take 5–10 business days. Implement Indeed XML feed first as the primary fallback.

#### Job Posting & Publishing

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-JP-01 | Job Posting creation pre-filled from demand data when demand moves to OPEN_EXTERNAL. No manual copy-paste required. | Must | — |
| REQ-JP-02 | Rich text posting editor: role summary, key responsibilities, requirements, salary range (optional), benefits, location, remote policy, application deadline. | Must | — |
| REQ-JP-03 | One-click publish to LinkedIn Jobs (REST API) and Indeed (XML feed). Channel status (live/pending/failed) shown per posting. Auto-unpublish on expiry or demand closure. | Must | — |
| REQ-JP-04 | Auto-publish to careers portal on posting approval. Careers portal always reflects live posting state in real time. | Must | — |
| REQ-JP-05 | Job posting analytics: views, clicks, apply-starts, apply-completions per posting per channel. Exposed to BL Team 4 analytics API. | Should | — |

#### Careers Portal

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-JP-06 | Public careers portal: filterable listing by location, seniority, and keyword. Company culture section. Mobile-responsive. WCAG 2.1 AA. axe-core zero critical violations. | Must | — |
| REQ-JP-07 | Apply Now: candidate submits name, email, phone, resume (PDF or DOCX). Confirmation email sent within 2 minutes. Duplicate application blocked with a friendly message. | Must | — |
| REQ-JP-08 | Applicant appears in Chennai T2 Talent Acquisition Engine as Candidate + Application within 30 seconds of form submit. Source = CAREERS_PORTAL. Verifiable in CH T2 UI. | Must | — |
| REQ-JP-09 | SEO: /careers/{slug} URL structure, JSON-LD structured data (JobPosting schema), meta description auto-generated from role summary. | Should | — |
| REQ-JP-10 | Employer branding section: editable About Us, culture values, benefits, employee story cards. Managed by admin/HR users only. | Should | — |
| REQ-JP-11 | Referral links: authenticated engineers generate a unique referral URL per posting. Source tracked as REFERRAL through to hire outcome. | Should | — |

---

### 5.4 Bangalore — Team 4: Market Presence — AI + Analytics

**4 engineers · AI×1 · FE×2 · Analytics×1 · 1 Mentor (AI/ML specialist)**

> Team of 4 — zero slack. All items are Must. The AI guardrail library (REQ-AI-05) is the highest-priority deliverable because all other teams consume it. If behind on RAG chatbot by Week 4, immediately scope to static FAQ page.

#### AI Features — Market Presence

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-AI-01 | AI: One-click JD generation from demand fields. Output: 4 labelled sections (Summary, Responsibilities, Requirements, Benefits), min 3 bullets each. Response under 5s. Recruiter edits before publish. | Must | AI |
| REQ-AI-02 | AI: FAQ chatbot on careers portal grounded via RAG on live job postings + FAQ document. Streams responses. Falls back to contact form when confidence < 0.7. Clearly labelled AI-assisted. | Must | AI |
| REQ-AI-03 | AI: Channel recommendation — classify role type and suggest optimal publishing channels ranked by historical apply-to-interview conversion rate. | Must | AI |

#### Shared AI Infrastructure

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-AI-04 | AIInteraction logging table: every LLM call from all 6 teams logged with featureType, inputHash (SHA-256), model, tokens, latencyMs, errorCode. No raw PII. Schema owned by Chennai T1. | Must | — |
| REQ-AI-05 | AI guardrail library: shared Spring @Component consumed by all teams. Enforces: human-in-loop validation, PII stripping before API calls, bias field blocklist, graceful fallback trigger on API error. Published to shared Maven repo by Week 2. | Must | — |

#### Cross-cutting Analytics Dashboards

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-AN-01 | RMG dashboard: bench size trend (30-day chart), upcoming availability count, internal match success rate, demand coverage %. Sub-minute Kafka-driven freshness. Consumes HY Team 5 analytics API. | Must | — |
| REQ-AN-02 | Hiring pipeline dashboard: demand fill rate, avg time-to-fill, internal vs external split, pipeline conversion rates per stage. Consumes CH Team 1 + CH Team 2 analytics APIs. | Must | — |
| REQ-AN-03 | AI usage dashboard: call count, total tokens, estimated cost, avg latency, error rate per feature type. Sourced from AIInteraction table via Kafka pipeline. | Must | — |

---

### 5.5 Hyderabad — Team 5: Workforce Allocation — Services

**5 engineers · BE×3 · FE×1 · DevOps×1 · 1 Mentor (ML/embeddings)**

> Owns the most technically novel AI feature — cosine similarity-based engineer-to-demand matching using pgvector. Review embedding architecture with mentor at Week 3 checkpoint before Week 4 feature completion begins.

#### Engineer & Bench Services

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-IT-01 | Engineer profile: name, employeeId, level, skills[] (vectorised), currentProject, availabilityDate, location, contractType, utilisationPct, managerId. | Must | — |
| REQ-IT-02 | Bench report API: engineers grouped by availability window (under 30 days, 30–60 days, 60–90 days). Auto-refreshes daily at 06:00 UTC. | Must | — |
| REQ-IT-03 | RMG search API: filter by skill, availability, location, seniority, contractType. Multi-criteria AND logic. Results ranked by availabilityDate ascending. | Must | — |
| REQ-IT-04 | Bulk HRIS CSV import: validate on upload, row-level error report before commit, 1,000 rows/batch, publish employee.imported Kafka event on success. | Must | — |
| REQ-IT-05 | Engineer self-service API: authenticated engineers update own skills[] and availabilityDate only. All other fields RMG or admin only. | Should | — |
| REQ-IT-06 | Utilisation tracking: allocation % per engineer per project. Flags over-allocation >100% and under-utilisation <50% via Kafka event. | Should | — |

#### Nomination Workflow

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-IT-07 | When demand reaches APPROVED, Kafka consumer triggers RMG notification (in-app + email) within 5 minutes via Chennai T1 notification service. | Must | — |
| REQ-IT-08 | RMG nominates engineer against demand. Creates InternalMatch record with status=PENDING_REVIEW. Engineer notified of their nomination. | Must | — |
| REQ-IT-09 | Nomination workflow: RMG nominates → HM reviews → ACCEPTED or REJECTED with mandatory written reason (min 20 characters). Full workflow visible in Chennai T1 Demand E2E view. | Must | — |
| REQ-IT-10 | On acceptance: demand status updated, engineer assignment updated, internal_match.accepted Kafka event published, both RMG and engineer notified within 5 minutes. | Must | — |

#### AI — Semantic Matching

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-IT-11 | Store engineer skills[] as vector(1536) in pgvector column alongside text[] column. Embedding refresh job fires on employee.skills_updated Kafka event. Track staleness via last_embedded_at field. | Must | AI |
| REQ-IT-12 | AI: For each open demand, cosine similarity search in pgvector returns top-5 engineers ranked by fit score with fit %, missing skills[], and one-paragraph rationale. Response under 5 seconds. Graceful fallback to manual search if AI unavailable. | Must | AI |
| REQ-IT-13 | Analytics API: bench size by availability window, internal match success rate, avg nomination-to-decision time — consumed by BL Team 4 RMG dashboard. | Must | — |

---

### 5.6 Hyderabad — Team 6: Workforce Allocation — UI + Skills

**3 engineers · FE×2 · BE×1 · 1 Mentor (AI specialist)**

> Team of 3 — minimum viable. Zero Should items. Assign the most technically confident Hyderabad intern to the AI upskilling feature. Mentor check-ins begin Week 1, not Week 4.

#### RMG UI (consumes Hyderabad Team 5 APIs)

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-UI-01 | Bench dashboard UI: engineers grouped by availability window with filter/search. CSV export under 3 seconds for 500 records. | Must | — |
| REQ-UI-02 | Skills gap heatmap: required skills across all open demands vs skills available on bench — sortable, colour-coded matrix. Refreshes on demand. | Must | — |
| REQ-UI-03 | Nomination UI: RMG nominates engineer against demand. HM review workflow with mandatory rejection reason (min 20 chars). Status visible in Chennai T1 Demand E2E view. | Must | — |
| REQ-UI-04 | AI match results UI: top-5 engineers per demand with fit %, missing skills, rationale paragraph. AI-generated badge on all results. Fallback message if HY Team 5 AI service unavailable. | Must | AI |
| REQ-UI-05 | Engineer self-service portal: authenticated engineers update own skills and availability date. Changes trigger employee.skills_updated Kafka event to refresh pgvector embeddings in HY Team 5. | Must | — |

#### AI — Upskilling

| REQ ID | Requirement | Priority | AI? |
|---|---|---|---|
| REQ-UI-06 | AI: For bench engineers whose skills[] do not match any open demand via pgvector search, suggest 3–5 upskilling learning paths — course title, platform, estimated hours, and rationale per suggestion. Results surface in bench dashboard alongside engineer record. | Must | AI |

---

## 6. Acceptance Criteria

> A requirement is Done only when all criteria below pass during the Week 7 UAT session. Mentor leads act as stakeholders. No requirement is marked complete based on code alone.

### 6.1 Chennai Team 1 — Platform Core + Demand Intelligence

| REQ | Acceptance Criteria |
|---|---|
| PLAT-01 to 06 | Auth stub (JWT), API gateway config, Kafka cluster, PostgreSQL DDL, notification service, and design system v0 npm package all committed to shared repo by Week 1 Day 3. All teams can build against stubs from Day 4. |
| REQ-DM-03 | Approval notification delivered within 2 minutes of state change. AuditLog entry with before/after JSONB. Auto-escalation fires within 72 hours — demonstrated with time-accelerated test. |
| REQ-DM-05 | POST with illegal state transition returns HTTP 400 with descriptive error naming the illegal transition. State machine diagram committed to /docs/. |
| REQ-DM-07 | Dashboard with 500 seeded demands loads under 2 seconds in browser DevTools Network tab on shared demo environment. |
| REQ-DM-10 | AI skill suggestions return within 3 seconds. Identical (title, level) input returns cached result — verified by AIInteraction table: no second row created for same inputHash. |

### 6.2 Chennai Team 2 — Talent Acquisition Engine

| REQ | Acceptance Criteria |
|---|---|
| REQ-ER-02 | Resume upload accepts PDF and DOCX up to 10 MB. Parsed fields pre-populate candidate form within 5 seconds. Invalid file type returns HTTP 400 with user-readable message — not a stack trace. |
| REQ-ER-06 | Every stage move creates AuditLog record with actorId, timestamp, previousStage, newStage. Attempt to skip stages returns HTTP 400. Candidate receives email when template configured. |
| REQ-ER-05 | GDPR deletion removes all PII from PostgreSQL and S3 within 72 hours. AuditLog entry action=PII_DELETED exists. JSON export downloads in under 10 seconds. |
| REQ-ER-12 | AI match score returned within 5 seconds. Score is 0–100 integer. Rationale contains minimum 3 sentences. Score re-renders automatically when demand required skills are edited. |

### 6.3 Bangalore Team 3 — Market Presence Core

| REQ | Acceptance Criteria |
|---|---|
| REQ-JP-03 | LinkedIn publish succeeds or returns actionable error (not a stack trace). Posting visible on LinkedIn within 15 minutes. Unpublish removes it within 60 minutes. Channel status shown with last-updated timestamp. |
| REQ-JP-07 | Application confirmation email delivered within 2 minutes — verified with a live email inbox in the demo. Duplicate application blocked with user-readable message, not a 500 error. |
| REQ-JP-08 | Applicant appears as Candidate + Application in Chennai T2 Talent Acquisition Engine within 30 seconds of form submit. Application.source equals CAREERS_PORTAL. Verifiable in CH T2 UI without any manual step. |
| REQ-JP-06 | Careers portal passes axe-core automated scan with zero critical violations. Results documented in /qa/accessibility/ by Week 7. |

### 6.4 Bangalore Team 4 — Market Presence AI + Analytics

| REQ | Acceptance Criteria |
|---|---|
| REQ-AI-01 | AI JD generation completes within 5 seconds. Output contains four labelled sections each with minimum 3 bullet points. All sections editable inline. Final saved content reflects recruiter edits. |
| REQ-AI-02 | RAG chatbot returns a grounded response within 8 seconds. Falls back to "contact us" prompt when confidence < 0.7. AI-assisted badge visible at all times. Demonstrated live with 3 different candidate questions. |
| REQ-AI-05 | AI guardrail library deployed to shared Maven repo by Week 2. All other teams import it — verified by checking each team's pom.xml in shared monorepo. PII stripping test: send a prompt with candidate email, confirm it is stripped before API call. |
| REQ-AN-02 | Hiring pipeline dashboard shows live data from CH T1 and T2 analytics APIs. Data freshness under 60 seconds. Demonstrated live with a real demand state change during demo. |

### 6.5 Hyderabad Team 5 — Workforce Allocation Services

| REQ | Acceptance Criteria |
|---|---|
| REQ-IT-04 | CSV import of 1,000 rows produces a row-level validation report before any rows are committed. Successful import publishes employee.imported Kafka event visible in Grafana within 30 seconds. |
| REQ-IT-09 | HM receives in-app notification within 5 minutes of RMG nomination. Rejection form requires reason field — submit with fewer than 20 characters returns validation error. Workflow visible in Chennai T1 Demand E2E view. |
| REQ-IT-12 | AI returns top-5 engineers ranked by cosine similarity. Each result shows fit %, missing skills, and minimum one-paragraph rationale. Total response under 5 seconds. If AI API unavailable, shows "AI matching unavailable — use manual search" and does not block the page. |
| REQ-IT-13 | Bench analytics API returns data consumed and rendered by BL Team 4 RMG dashboard within 30 seconds of an engineer availability date change. |

### 6.6 Hyderabad Team 6 — Workforce Allocation UI + Skills

| REQ | Acceptance Criteria |
|---|---|
| REQ-UI-02 | Skills gap heatmap renders with data from HY Team 5 APIs. Sorting works on all columns. Colour coding correct: red for large gaps, green for coverage. Refreshes without page reload. |
| REQ-UI-04 | AI match results rendered correctly from HY Team 5 pgvector API. AI-generated badge visible. Fallback message renders when HY Team 5 AI service returns an error — demonstrated by error injection test. |
| REQ-UI-05 | Engineer self-service skill update triggers employee.skills_updated Kafka event within 30 seconds. pgvector embedding refresh job fires within 60 seconds — verified in Grafana Kafka consumer lag dashboard. |
| REQ-UI-06 | Upskilling suggestions return for at least 1 bench engineer with no open demand match. Each suggestion includes course title, platform, estimated hours, and rationale. Response under 5 seconds. AI badge visible. |

---

## 7. Data Model

> Chennai Team 1 publishes the canonical DDL and schema conventions to /db/schema/ in the monorepo by end of Week 1 Day 3. Teams add their own migrations under /db/migrations/{team}/. No team modifies another team's migrations.

| Entity | Key Fields | Owner | Engineering Notes |
|---|---|---|---|
| Demand | id, title, level, skills[], location, projectId, budget, headcount, status (enum), createdBy, assignedRecruiter, assignedRM, priority, targetDate, closureReason | CH Team 1 | Central anchor entity. Status enum must exactly match REQ-DM-05 state machine. All entities reference demand.id. |
| ExternalCandidate | id, firstName, lastName, email, phone, source (enum), resumeUrl, skills[], gdprConsentAt, deletedAt | CH Team 2 | Unique constraint on email with soft-delete awareness. Hard PII deletion async job within 72h of request. |
| Application | id, candidateId, demandId, stage (enum), source (enum), appliedAt, rejectedAt, rejectionReason, referralCode | CH Team 2 | Stage enum must match REQ-ER-06 pipeline. Source enum: LINKEDIN, INDEED, CAREERS_PORTAL, REFERRAL, MANUAL. |
| Interview | id, applicationId, type (enum), scheduledAt, durationMins, interviewers[] (userId[]), status, calendarEventId | CH Team 2 | calendarEventId stores Google Calendar event ID. type: TECHNICAL, BEHAVIOURAL, CULTURAL_FIT, FINAL. |
| Scorecard | id, interviewId, interviewerId, ratings (JSONB), strengths, concerns, recommendation (enum), submittedAt | CH Team 2 | JSONB ratings keyed by competency. Unique constraint on (interviewId, interviewerId). |
| Offer | id, applicationId, baseSalary, bonus, equity, currency, startDate, status, approvalChain (JSONB), sentAt, signedAt, expiresAt, docuSignEnvelopeId | CH Team 2 | approvalChain: ordered array of {userId, status, decidedAt}. Full compensation structure mandatory. |
| JobPosting | id, demandId, title, description (text), channels[] (enum[]), publishedAt, expiryAt, status, slug (unique), linkedInPostId, indeedJobId | BL Team 3 | Slug must be URL-safe, lowercase, hyphenated, globally unique. Collision handling at service layer. |
| InternalEmployee | id, employeeId, name, email, level, skills[] (text[]), skillsVector (vector(1536)), currentProject, availabilityDate, location, contractType, utilisationPct, managerId, lastEmbeddedAt | HY Team 5 | skills[] stored as both text[] (display) and vector(1536) (pgvector semantic match). HY T5 owns embedding refresh. |
| InternalMatch | id, employeeId, demandId, nominatedBy, nominatedAt, status (enum), reviewedBy, reviewedAt, rejectionReason, notes | HY Team 5 | rejectionReason required when status=REJECTED. DB check: char_length(rejectionReason) >= 20. |
| User | id, email, name, role (enum), ssoId, createdAt, lastLoginAt, isActive | CH Team 1 | role enum: ADMIN, RECRUITER, RM, HIRING_MANAGER, INTERVIEWER, CANDIDATE. |
| Notification | id, userId, type, title, body, entityType, entityId, readAt, createdAt | CH Team 1 | entityType + entityId form a polymorphic deep-link reference. All teams publish via CH T1 Notification service. |
| AuditLog | id, entityType, entityId, action, actorId, timestamp, before (JSONB), after (JSONB), ipAddress | CH Team 1 | Append-only — no UPDATE or DELETE ever. CH T1 provides shared AuditLogClient library. |
| AIInteraction | id, featureType (enum), inputHash (SHA-256), modelUsed, promptTokens, completionTokens, latencyMs, entityId, entityType, errorCode, createdAt | BL Team 4 | Every LLM API call logged here. No raw PII. BL T4 owns schema, all teams write via guardrail library. |

---

## 8. Non-Functional Requirements

| Category | Requirement | Verification |
|---|---|---|
| Performance | API p95 under 500ms (excluding AI). AI endpoints under 5s p95. Careers portal LCP under 2s. | k6 load test Week 7. Lighthouse for LCP. Results in /perf/results/. |
| Scalability | 500 concurrent users. 5,000 engineer records. 20,000 candidate records. | k6 stress test. Seed scripts provided by CH Team 1 by Week 3. |
| Availability | 99% uptime during demo week. Readiness + liveness probes. Restart policy: Always. | Grafana uptime dashboard. K8s probe config reviewed at Week 4 checkpoint. |
| Security | JWT on all endpoints except /health and public careers routes. HTTPS enforced. No PII in logs. No API keys in Git. | Manual security checklist Week 7. GitHub secret scanning reviewed. |
| GDPR | Consent at apply. Deletion within 72h with AuditLog confirmation. JSON export within 10s. | GDPR checklist walkthrough with mentor Week 6. |
| Test coverage | Min 60% line coverage (JaCoCo). Min 3 integration tests per cross-team API contract. | JaCoCo report as GitHub Actions artefact on every PR merge. |
| CI/CD | GitHub Actions: compile → test → Docker build → push → K8s deploy on every merge to main. Zero manual steps. | Pipeline demo as part of Week 8 DevOps segment. |
| Observability | OTel traces to Tempo. JSON logs to Loki. Grafana dashboard per team showing request rate, error rate, p95 latency. | Grafana dashboards live and populated during Week 8 demo. |
| Accessibility | WCAG 2.1 AA for all UI. Careers portal passes axe-core with zero critical violations. | axe scan results in /qa/accessibility/ by Week 7. |
| AI reliability | All AI features have working fallback mode. AI errors logged in AIInteraction. No AI failure blocks core workflow. | Error injection test: disable API key, verify fallback, verify AIInteraction entry. |
| AI cost | USD 50 per team for 8 weeks. Deterministic AI calls cached in Redis 24h TTL. BL T4 monitors via AIInteraction. | Slack alert to mentor when projected spend reaches USD 40. |

---

## 9. Integration Landscape

> API credentials provided by Engineering Program Manager by end of Week 1. Store all secrets in **GitHub Actions Secrets or K8s Secrets** — never in source code or committed .env files.

| System | Integration | Owner | Week | Fallback |
|---|---|---|---|---|
| SSO (Okta / Azure AD) | OIDC / SAML via Spring Security OAuth2 | CH Team 1 | Week 1 | Local JWT auth with seeded test users for dev |
| OpenAI API (GPT-4o, Embeddings) | REST · Official OpenAI Java SDK | All teams per module | Week 2 | Static mock JSON responses from local fixture files |
| Anthropic API (Claude 3.5) | REST · Anthropic Java SDK | All teams (alternative) | Week 2 | Static mock JSON responses |
| pgvector (PostgreSQL extension) | SQL · Spring Data JPA custom query | HY Team 5 | Week 1 (schema) · Week 3 (feature) | Store embeddings as float[] column if extension unavailable |
| Apache Kafka | Spring Kafka producer/consumer | CH Team 1 (cluster) · All teams | Week 1 (cluster) · Week 2 (events) | In-process Spring ApplicationEvent for local dev |
| Google Calendar | OAuth2 · Google Calendar Events API v3 | CH Team 2 | Week 3 | Manual scheduling: display interviewer emails for self-scheduling |
| Slack Webhooks | Incoming webhook for platform notifications | CH Team 1 | Week 3 | In-app notifications only |
| LinkedIn Jobs API | REST · LinkedIn Job Postings API | BL Team 3 | Week 3 | Copy-to-clipboard job URL. XML feed as secondary fallback. |
| Indeed | XML job feed submission | BL Team 3 | Week 4 | Manual posting. Share link copy as demo fallback. |
| DocuSign E-Signature | REST API + Webhook callbacks | CH Team 2 | Week 4 | PDF download + email sign outside platform |
| HRIS (BambooHR or CSV) | REST API or CSV bulk import | HY Team 5 | Week 4 | CSV import is always available — primary path |
| Affinda Resume Parser | REST API · JSON response | CH Team 2 | Week 2 | GPT-4o vision prompt as primary fallback |

---

## 10. Eight-Week Engineering Timeline

> Scope freeze after Week 2. New ideas go to /backlog in the monorepo. Mentor leads review progress every Friday.

| Week | Phase | CH Team 1 | CH Team 2 | BL Team 3 | BL Team 4 | HY Team 5 | HY Team 6 |
|---|---|---|---|---|---|---|---|
| W1 | Foundation | Auth stub · Kafka · DDL · pgvector · Gateway · DS v0 · Event catalog — ALL by Day 3 | Domain model · OpenAPI spec · Docker Compose · All dev accounts registered | Domain model · OpenAPI spec · LinkedIn dev app registered | Domain model · AI SDK wired · Guardrail lib scaffold · Grafana + Loki stack | Domain model · OpenAPI spec · pgvector schema confirmed with CH T1 | Domain model · Consume HY T5 API contracts · Design system setup |
| W2 | Core Build | Notification svc · File svc · AuditLog svc + client lib · DS v1 · OTel + Grafana/Loki/Tempo | Candidate CRUD · Resume parse · Pipeline API · Basic recruiter UI | Job posting CRUD · Careers page static + apply flow · Indeed XML feed | AI guardrail lib v1 published to Maven · JD gen wired · AIInteraction logging | Employee CRUD · Bench API · CSV import validator · Embedding setup | Bench dashboard UI · Nomination UI scaffold · HY T5 mock API consumer |
| W3 | Integrations | RBAC in gateway · Rate limiting · Slack webhooks · Analytics API endpoints | Interview scheduling (Google Calendar) · Scorecard workflow · AI scoring live · Kafka events | LinkedIn publish live · Apply flow → CH T2 API · Posting expiry · Kafka events | RAG chatbot wired · Channel recommender · Analytics dashboards v1 | Nomination workflow · pgvector cosine search live · Embedding refresh job · Analytics API | Skills gap heatmap · AI match results UI · Self-service portal · Upskilling AI wired |
| W4 | Feature Complete | OTel trace hardening · K8s ingress + TLS · Blue-green deploy config | Offer + DocuSign · Bulk actions · Email templates · AI rejection drafts | Employer branding · Referral links · SEO JSON-LD · Job analytics API | RMG dashboard · Hiring pipeline dashboard · AI usage dashboard · Cost alert setup | Utilisation tracking · Self-service API · HRIS REST sync · Analytics API polished | All 6 Must requirements coded and passing unit tests |
| W5 | Integration | E2E event flow tests · Auth edge cases · K8s autoscaling verified | Full apply-to-hire E2E test · GDPR deletion · AI fallback test | Full apply flow E2E · axe accessibility scan · LinkedIn unpublish test | Dashboard live data verified from all 4 real analytics APIs · RAG chatbot stress test | Full internal match E2E · Embedding drift test · 1000-row CSV test · AI fallback test | Full RMG workflow E2E · pgvector match accuracy test · Upskilling fallback test |
| W6 | Hardening | Pen test checklist · HTTPS · Secret scanning · 60% JaCoCo | GDPR UAT · 60% JaCoCo · DocuSign sandbox→prod | Lighthouse perf · axe zero critical confirmed · 60% JaCoCo | Dashboard QA · AI cost report verified · 60% JaCoCo | 60% JaCoCo · Embedding refresh verified · Bench report accuracy UAT | 60% JaCoCo · Skills gap heatmap QA · Upskilling response time verified |
| W7 | UAT | Auth + audit log UAT · GDPR deletion · Security sign-off | Recruiter workflow UAT · GDPR flow · Scorecard + offer UAT | Careers portal apply flow UAT · Accessibility sign-off | Dashboard and analytics UAT · Guardrail library verified across all teams | RMG workflow UAT · pgvector match UAT · CSV import UAT | Bench UI UAT · Skills gap heatmap UAT · Upskilling AI UAT |
| W8 | Demo | Platform reliability during all 6 team demos · Runbook + arch doc handoff | Candidate pipeline demo · AI scoring live · GDPR deletion walkthrough · DocuSign offer | Careers portal live demo · Apply flow demo · LinkedIn channel status shown | JD gen live · RAG chatbot demo · All 3 dashboards on real data · AIInteraction cost report | Semantic match demo · pgvector cosine walkthrough · Internal match E2E | Bench dashboard demo · Skills gap heatmap · Upskilling suggestions live |

### 10.1 Week 1 — Non-Negotiable Protocol

- **Day 1–2:** All 6 teams define and commit OpenAPI 3.0 specs to `/contracts/{team}/` in monorepo. No spec changes after Day 2 without an RFC.
- **Day 3:** Chennai Team 1 delivers to shared repo — auth service stub, API gateway routing config, canonical DDL, Kafka topic list, event schema catalog, pgvector enabled, AuditLogClient library v0, design system v0 npm package.
- **Day 4+:** All teams build features against stubs. No team waits for another team's real implementation.
- **Day 5:** Each team presents their domain data model in a shared 30-minute session to detect conflicts before Week 2 migrations run.

### 10.2 Definition of Done — Key Milestones

| Milestone | Done means... |
|---|---|
| End of Week 2 | Each team's primary entity CRUD works end-to-end: created via UI, persisted in PostgreSQL, returned via REST API, deployed to K8s dev namespace. At least one AI SDK call returning a real model response logged in AIInteraction table. |
| End of Week 4 | All Must-priority requirements for the team's module are implemented and passing unit tests at minimum 60% JaCoCo line coverage. AI feature producing real output in staging environment. Mentor mid-sprint sign-off received and documented. |
| End of Week 6 | All cross-team API integrations working on shared staging. k6 load test passing. GDPR deletion flow verified. AI fallback modes tested by error injection. Zero P1 bugs open. Contract tests all green in CI. |
| End of Week 8 | Live demo of full E2E flow: demand created → approved → internal match attempted and resolved → external candidate sourced via careers portal → AI-scored → offer generated and sent via DocuSign. All AI features demonstrable with fallback modes shown. AIInteraction cost report presented. |

---

## 11. Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| API contract drift across 6 teams | High | High | OpenAPI specs frozen by Week 1 Day 2. Spring Cloud Contract tests in CI on every PR. RFC required for any post-freeze change. |
| Chennai Team 1 delays blocking all 5 other teams | Medium | Critical | CH T1 delivers all stubs by Day 3 — no exceptions. Teams build against stubs from Day 4. Dual mentors to prevent bottleneck. |
| Hyderabad Team 6 (3 engineers) falls behind | High | High | Zero Should items in scope. Mentor is AI/ML specialist with weekly check-ins from Week 1. If RAG chatbot falls behind by Week 4, descope to static FAQ and focus on guardrail library + upskilling. |
| Bangalore Team 4 (4 engineers) dashboard dependency on 4 teams | Medium | High | BL T4 builds against mock analytics API responses in Weeks 2–3. Real API integration in Week 4. If any team misses their analytics API, BL T4 continues with mock data for that module. |
| AI API rate limits or cost overrun | Medium | Medium | Per-feature max_tokens in application.properties. Redis cache for deterministic AI calls (24h TTL). USD 50 per-team budget. BL T4 monitors all teams via AIInteraction table. Alert at USD 40. |
| pgvector embedding drift (stale as skills update) | Medium | Medium | HY T5 implements embedding refresh job triggered by employee.skills_updated Kafka event. Staleness tracked via last_embedded_at. Verified in Week 5 E2E test. |
| LinkedIn Jobs API approval delay | Medium | Low | Register developer app Week 1 Day 1. XML feed fallback for Indeed. Copy-to-clipboard link as demo fallback for LinkedIn. |
| GDPR non-compliance in candidate data | Low | Critical | GDPR checklist with mentor Week 1. No PII in logs — CI lint rule from Day 1. DPO walkthrough Week 6. Synthetic seed data only in all environments. |
| Location-only teams reduce cross-module knowledge sharing | Medium | Low | Wednesday 30-minute all-hands sync across all 6 teams. ADRs in /decisions/ in shared monorepo within 24h of any cross-team architectural decision. |

---

## Appendix A: AI Integration Specification

AI is a first-class architectural decision in Forge — not a feature layer. It shapes the data model (pgvector), NFRs (5s p95 for AI endpoints vs 500ms standard), and integration landscape.

> **Privacy rule:** Never send raw PII (candidate name, email, phone) to any external LLM API. Strip or pseudonymise before any API call. CI lint rule enforced from Week 1.

### A.1 AI Feature Map by Team

| Team | Feature | Model | Priority |
|---|---|---|---|
| CH Team 1 | Auto-suggest required skills from role title + level. Redis cache by (title, level). | Claude 3.5 Haiku / GPT-3.5 Turbo | Must |
| CH Team 1 | Predict time-to-fill (days + confidence) via few-shot inference. | GPT-4o few-shot | Should |
| CH Team 2 | Resume parsing — PDF/DOCX to structured profile. Strip PII before API call. | GPT-4o Vision / Affinda | Must |
| CH Team 2 | Candidate scoring 0–100 vs demand skills. Score + matched/missing skills + rationale. | Claude 3.5 Sonnet / GPT-4o | Must |
| CH Team 2 | Personalised rejection email draft. Recruiter confirms before send. | Claude 3.5 Haiku / GPT-3.5 | Should |
| CH Team 2 | 5–8 follow-up interview questions from resume + scorecard gaps. | Claude 3.5 Sonnet / GPT-4o | Should |
| BL Team 4 | JD generation — 4 labelled sections, min 3 bullets each. Recruiter edits before publish. | Claude 3.5 Sonnet / GPT-4o | Must |
| BL Team 4 | FAQ chatbot via RAG on live job postings + FAQ doc. Streams. Fallback at confidence < 0.7. | GPT-4o + pgvector RAG | Must |
| BL Team 4 | Channel recommendation — classify role type, rank channels by conversion rate. | LLM classification + rules | Must |
| HY Team 5 | pgvector cosine similarity — top-5 engineers per demand with fit %, gaps, rationale. | OpenAI text-embedding-3-small | Must |
| HY Team 6 | Upskilling paths for bench engineers with no demand match — 3–5 courses with rationale. | GPT-4o / Claude 3.5 Sonnet | Must |

### A.2 Token Budget Reference

| Feature | Input Tokens (avg) | Output Tokens (max) | Recommended Model | Approx / 1k calls |
|---|---|---|---|---|
| Skill suggestion | ~200 | 300 | Claude Haiku / GPT-3.5 | < $0.10 |
| Resume parsing (2-page) | ~1,500 | 500 | GPT-4o / Claude Sonnet | ~$1.50 |
| Candidate scoring | ~800 | 400 | GPT-4o / Claude Sonnet | ~$0.80 |
| JD generation | ~400 | 800 | GPT-4o / Claude Sonnet | ~$0.80 |
| Rejection email draft | ~200 | 300 | Claude Haiku / GPT-3.5 | < $0.10 |
| Interview questions | ~1,200 | 500 | GPT-4o / Claude Sonnet | ~$1.20 |
| Upskilling paths | ~600 | 600 | GPT-4o / Claude Sonnet | ~$0.80 |
| Embedding per engineer | ~300 | N/A | text-embedding-3-small | < $0.01 |
| Chatbot per turn (RAG) | ~2,000 | 400 | GPT-4o / Claude Haiku | ~$1.00 |

> Each team's total AI API budget for the 8-week sprint is **USD 50**. Monitor spend via the AIInteraction table. Mentor lead receives an automated Slack alert when projected spend reaches USD 40.

### A.3 Implementation Standards — All Teams

- Create an `AIService` Spring `@Service` component in each team's backend. Methods named per feature: `suggestSkills()`, `scoreCandidate()`, `generateJobDescription()`, `matchEngineers()` etc.
- Inject the official OpenAI Java SDK or Anthropic Java SDK. API key from `@Value("${ai.api.key}")` bound to `application.properties` — value sourced from K8s Secret. **Never hardcoded.**
- Implement exponential backoff with jitter on 429 (rate limit) and 5xx responses. Maximum 3 retries.
- Set `max_tokens` per feature from `application.properties` so it can be tuned without a redeploy.
- **Log every call** to AIInteraction table before returning to caller.
- **Cache all deterministic AI calls** in Redis: key = `SHA-256(featureType + prompt)`, value = serialised response, TTL = 24 hours.
- Commit all prompt versions to `/ai/prompts/{team}/{feature}/v{n}.txt` in the monorepo. **A prompt change is a deployment.**

### A.4 Mandatory AI Guardrails

- **Human in the loop:** No AI output triggers a system action automatically. All scores, rankings, drafts require human confirmation before any state change.
- **Bias awareness:** Scoring inputs limited to `skills[]`, experience, and role requirements. No age, gender, location, nationality, or university name. Enforced in system prompt AND service layer by BL T4 guardrail library.
- **Transparency:** Every AI-generated UI element carries a visible badge — `AI-generated` for content, `AI-assisted` for scored/ranked results.
- **Graceful degradation:** If AI API returns an error, feature renders "AI unavailable — please complete manually". No core hiring workflow is ever blocked. **Fallback demonstrated live in Week 8 demo.**
- **No raw PII to external APIs:** Strip `candidate.firstName`, `lastName`, `email`, `phone` before any LLM call. Enforced by BL T4 guardrail library.
- **Cost discipline:** USD 50 per team for 8 weeks. Cache deterministic calls in Redis. BL T4 monitors all teams. AIInteraction cost report presented in Week 8 demo.

---

## Appendix B: Team Formation

30 engineers organised into 6 location-pure teams. All engineers are peers — no hierarchy within teams.

### B.1 Complete Team Roster

| Team | City | Module | Size | Engineers | Focus Split | Mentor |
|---|---|---|---|---|---|---|
| Team 1 | Chennai | Platform Core + Demand Intelligence | 7 | Interns 1–7 | BE×3 · FE×2 · DevOps×1 · AI×1 | 2 mentors: Platform architect + Observability specialist |
| Team 2 | Chennai | Talent Acquisition Engine | 6 | Interns 8–13 | BE×2 · FE×2 · DevOps×1 · AI×1 | 1 mentor: Full-stack + integrations (DocuSign, Google Calendar, GDPR) |
| Team 3 | Bangalore | Market Presence — Core Portal | 5 | Interns 14–18 | BE×2 · FE×2 · DevOps×1 | 1 mentor: Frontend + SEO + accessibility (WCAG 2.1 AA) |
| Team 4 | Bangalore | Market Presence — AI + Analytics | 4 | Interns 19–22 | AI×1 · FE×2 · Analytics×1 | 1 mentor: AI/ML + data pipeline (RAG, pgvector retrieval) |
| Team 5 | Hyderabad | Workforce Allocation — Services | 5 | Interns 23–27 | BE×3 · FE×1 · DevOps×1 | 1 mentor: Data + ML/embeddings (pgvector, cosine similarity) |
| Team 6 | Hyderabad | Workforce Allocation — UI + Skills | 3 | Interns 28–30 | FE×2 · BE×1 | 1 mentor: AI specialist — weekly check-ins from Week 1 |

### B.2 Mentor Assignment Rationale

| Team | Mentor Profile | Critical Responsibility |
|---|---|---|
| Team 1 — Mentor A | Senior platform engineer: Kafka, Spring Security, K8s production experience | Delivers all stubs by Week 1 Day 3. Available daily in Week 1 with 2h Slack SLA. |
| Team 1 — Mentor B (2nd) | Observability + analytics engineer: Grafana, Loki, Tempo, data pipeline | Owns design system v0 and observability stack in parallel with Mentor A. Prevents Day 3 bottleneck. |
| Team 2 — Mentor C | Full-stack engineer: DocuSign, Google Calendar, GDPR compliance experience | Team 2 has highest third-party integration count. Register all developer accounts Week 1 Day 1. |
| Team 3 — Mentor D | Frontend engineer: SEO, WCAG 2.1 AA, LinkedIn/Indeed job board API experience | Careers portal is the external face of Forge. Accessibility sign-off required in Week 7. |
| Team 4 — Mentor E | AI/ML engineer: RAG architecture, pgvector retrieval, Grafana + Kafka data pipelines | BL T4 has the most complex AI architecture and the most cross-team dependencies. |
| Team 5 — Mentor F | Data/ML engineer: pgvector, cosine similarity, embedding drift, PostgreSQL performance | Review embedding architecture at Week 3 checkpoint before Week 4 feature completion begins. |
| Team 6 — Mentor G | AI specialist with LLM prompt engineering and Spring AI / LangChain4j experience | Team of 3. Weekly check-ins from Week 1. If behind by Week 4 on RAG chatbot, immediately scope to static FAQ. |

### B.3 Cross-Team Coordination Norms

- **Async-first by default:** Decisions affecting only one team are made in that team's Slack channel. Decisions affecting a cross-team API contract require an RFC posted to `#forge-contracts` with 24-hour comment window before merging.
- **Wednesday all-hands sync (30 minutes):** One engineer per team attends. Agenda: blocked items, contract change requests, integration test status.
- **ADRs as mandatory deliverables:** Every cross-team architectural decision documented in `/decisions/ADR-{n}.md` within 24 hours.
- **HY Team 6 async norms (3 engineers):** Mentor enforces Slack-first, written-first norms from Day 1. No decision resolved verbally without a follow-up written summary in the team Slack channel within 2 hours.

---

## Glossary

| Term | Definition |
|---|---|
| ADR | Architecture Decision Record — short document capturing a significant engineering decision, its context, and consequences |
| AIInteraction | Platform table logging every LLM API call — featureType, model, tokens, latency, cost, error. Primary tool for AI cost governance. |
| Bench | Internal Grid Dynamics engineers currently unallocated or whose project ends within 90 days |
| Demand | Formal workforce requirement created by a Hiring Manager or Delivery Lead, tracked through full lifecycle in Forge |
| Forge | The platform name. AI-native workforce intelligence platform that replaces Grid Dynamics' staffing process. |
| GDPR | General Data Protection Regulation — EU data privacy law governing candidate PII handling, deletion, and export |
| HRIS | Human Resource Information System — source of truth for employee records (e.g. BambooHR, Workday) |
| Internal Match | Allocation of a bench engineer to an open demand — tracked as InternalMatch record through nomination, review, and decision |
| K8s | Kubernetes — container orchestration platform hosting all Forge microservices on the shared Grid Dynamics intern cluster |
| LLM | Large Language Model — AI model used for text generation, classification, and semantic understanding |
| PES | Product Engineering Specification — this document. Authoritative engineering requirements reference for Forge v2.0. |
| pgvector | Open-source PostgreSQL extension enabling storage and cosine-similarity search over embedding vectors |
| RAG | Retrieval-Augmented Generation — AI technique grounding LLM responses in retrieved documents to reduce hallucination |
| RBAC | Role-Based Access Control — permission system mapping user roles to allowed actions across the platform |
| RFC | Request for Comments — mandatory cross-team change proposal for any OpenAPI contract modification after Week 1 Day 2 |
| RMG | Resource Management Group — Grid Dynamics team responsible for bench visibility and engineer allocation decisions |
| SSO | Single Sign-On — centralised authentication via Okta or Azure AD using OIDC/SAML, implemented by CH Team 1 |
| Vertical | One of four independently deployable engineering domains in Forge: Demand Intelligence, Talent Acquisition Engine, Workforce Allocation, Market Presence |

---

*Forge · PES v2.0 · 6-Team Location Structure · Grid Dynamics Engineering Program · 2026 · Confidential*

**All cross-team OpenAPI contracts must be committed to `/contracts/` by end of Week 1, Day 2. No exceptions.**

*Next Review: Friday May 1, 2026 · Owner: Engineering Program Manager*