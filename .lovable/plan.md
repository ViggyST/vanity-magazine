

# Update Seed Data + Add POC Status

## Files to Change

### 1. `src/data/seedData.ts`

**Status type** (line 40): Add `'POC'` to the union:
```typescript
status: 'WIP' | 'Dream' | 'Live' | 'Paused' | 'POC';
```

**Remove** projects: ID 9, 14, 15

**Status changes**:
- ID 3 (Approval Mock MCP): WIP → POC
- ID 8 (KQL Streaming): Live → POC
- ID 11 (Campaign Mgmt): Live → POC
- ID 12 (RAG Project): WIP → Live

**Featured changes**:
- ID 1 (Vanity Magazine): true → false
- ID 2 (Prompt Refiner): true → false
- ID 7 (Time Capsule): false → true
- ID 12 (RAG Project): false → true

**Add** new project (ID 16): Sambhar Logistic Regression, WIP, `Idea / Research`, oneLiner = "Logistic regression project exploring ML classification fundamentals with scikit-learn."

### 2. `src/pages/Projects.tsx`

Add `const pocProjects = getProjectsByStatus('POC');` and render a "POCs & Demos" section after Live, before Dream. Same grid layout as the other sections.

### 3. `src/data/siteConfig.ts`

Add `'POC'` to the statuses array.

### 4. `src/components/projects/ProjectCard.tsx`

Add POC to the `statusColors` map (use a blue-ish or teal pill to distinguish from Live green).

## Result

| Status | Projects | Count |
|--------|----------|-------|
| WIP | Vanity Magazine, Prompt Refiner, Sambhar Logistic Regression | 3 |
| Live | Game Archive, Time Capsule, Temple Landing, Paper Trail, RAG Project | 5 |
| POC | Approval Mock MCP, KQL Streaming, Campaign Mgmt POC | 3 |
| Dream | Dream11, Online Board Game | 2 |
| **Featured** | Game Archive, Time Capsule, RAG Project | 3 |
| **Total** | | **13** |

