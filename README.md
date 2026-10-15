# Educational Visual Novels — AI-Powered Learning Stories

> **Status:** In development · **Project type:** Personal portfolio project  
> **Target Audience:** Teachers creating interactive revision materials from text, links and PDF chapters  
> **Initial language:** English

This is a teacher-controlled learning tool that turns source material into a linear, visual-novel-style revision experience. A teacher uploads a text, link or PDF, reviews an AI-generated draft, edits questions and feedback, and approves a version for students to play.

The aim is to make revision more engaging without treating AI-generated content as automatically correct. Teachers remain responsible for the final educational material.

> **Current scope note:** This README describes the intended project.

## Problem

Reading and reviewing course material can be passive. Teachers may want a more engaging way for students to practise recalling important dates, events, relationships, sequences, and cause-and-effect explanations.

Generating questions automatically can save preparation time, but AI can make mistakes or omit facts that matter for an exam. StoryForge is designed around teacher review, source evidence, and editable questions rather than fully automated publication.

## Goals

- Turn pasted text, links and text-based PDFs into editable, source-grounded story drafts.
- Present knowledge-testing questions through character dialogue and playful feedback.
- Let teachers edit questions, choices, answer keys, explanations, and wrong-answer reactions.
- Help teachers identify important source facts that the draft did not cover.
- Record attempts and results against the exact approved story version.
- Build a maintainable, testable application that can be extended later.

## Non-goals for the first version

- Replacing a teacher or textbook.
- Guaranteeing that AI-generated content is always correct.
- Training a machine-learning model from scratch.
- Supporting every input format, including scanned documents, immediately.
- Branching narratives or unrestricted open-ended answer evaluation.
- Public sharing, school-wide administration, or complex classroom management.
- Full Kazakh and Russian generation before the English workflow is reliable.
- AI-generated illustrations or a sophisticated animation system.

## Planned user journey

1. A teacher uploads a text in a supported format.
2. The application validates the file and extracts text with page references.
3. AI proposes important facts, characters, events, learning points, questions, choices, and feedback.
4. The application validates the generated structure and checks that questions link to source evidence.
5. The teacher reviews the coverage list, edits the draft, adds omitted facts/questions, and previews the story.
6. The teacher approves a version.
7. A student plays the approved, linear story.
8. The application records answers and presents results for the relevant story version.

## Initial feature scope

### Teacher authoring

- Upload a text, a link or a text-based PDF with size/page limits.
- Show processing status and useful errors.
- Review extracted text and page references.
- Generate an editable draft.
- Edit questions, choices, correct answers, explanations, and per-choice feedback.
- Add, remove, and reorder questions.
- Review a source-fact/learning-objective coverage list.
- Preview the story before approval.
- Keep drafts separate from approved versions.

### Student experience

- Display character dialogue and one knowledge question at a time.
- Offer multiple-choice answers.
- Show character feedback and an explanation after answering.
- Finish with a score and review of answers.
- Record an attempt against the version that was played.

### AI and quality safeguards

- Use a defined internal story schema rather than provider-specific output in the UI.
- Require evidence references for factual questions.
- Validate schema, IDs, choice references, and scene order.
- Make the teacher the final reviewer of educational correctness.
- Keep API keys on the server and out of source control.
- Treat uploaded document text as untrusted input, not as instructions for the AI.
- Apply limits to file uploads and AI generation to control cost and abuse.

## Planned technology stack

The stack is provisional and may change as the MVP is built.

| Area | Initial choice | Purpose |
|---|---|---|
| Frontend | React, Next.js, TypeScript | Teacher editor, story player, navigation, typed application code |
| Styling | CSS Modules or straightforward CSS | Responsive layout without unnecessary UI complexity |
| Database and authentication | Supabase / PostgreSQL | Stories, facts, versions, attempts, accounts, access policies |
| File storage | Private Supabase Storage bucket or equivalent | Original PDFs and controlled access |
| PDF extraction | Python and PyMuPDF | Extract text page by page |
| AI generation | One hosted LLM API | Extract facts and propose structured drafts |
| Schema validation | Zod in TypeScript; optionally JSON Schema | Validate data before saving or rendering |
| Version control | Git and GitHub | History, issues, project planning |
| Testing | Vitest and Playwright, or equivalent | Unit and end-to-end tests |
| Deployment | A Next.js-compatible host plus a Python-capable host if needed | Public demo |


## AI quality and evaluation

The application must not assume that model-generated facts or answers are correct.

For each factual question, it is aimed to preserve:

- A source-fact identifier.
- The page number and supporting source passage.
- The intended correct answer.
- A clear explanation.
- A question type, such as recall, sequence, cause/effect, or decision recall.
- Teacher review status.

## Security, privacy, and copyright considerations

- Keep uploaded PDFs private by default.
- Validate file contents and apply file-size/page-count limits.
- Do not expose API keys, service-role keys, or correct answer keys to the client.
- Enforce ownership checks on every relevant server-side operation.
- Treat PDF content as untrusted data; do not let document text override system instructions or grant tools access.
- Limit AI calls and implement safe retry behaviour to control cost.
- Provide clear deletion/retention behaviour for uploaded documents.
- Do not publicly distribute copyrighted source material without permission.
- For public sharing, consider whether the user has rights to share both the original source and the generated content.
- Collect only the student information needed for the feature and avoid exposing individual results to unauthorised users.

## Internationalisation roadmap

Starting with English.

Later support may include:

- English, Kazakh, and Russian interface translations.
- A story output language independent of the PDF's source language.
- Review of translated technical terms and names.
- Separate quality evaluation for each supported language.

## Initial repository and documentation

Initial repository structure:

```text
storyforge/
├── frontend/
├── backend/
├── database/
│   └── migrations/
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── database.md
│   ├── evaluation.md
│   └── decisions/
├── tests/
├── .env.example
├── .gitignore
└── README.md
```

## Known limitations and future work

Potential future work—not MVP promises:

- Scanned PDF support through OCR.
- Kazakh and Russian interface and story generation.
- Class assignments, shareable links, and teacher analytics.
- More detailed learning-objective coverage tools.
- Improved branching or narrative-only choices.
- Alternative model providers and comparative evaluation.
- Accessible visual themes and optional character artwork.
- Adaptive revision based on previous attempts.

## Project status

- [ In progress ]  Stage 1: Playable sample story
- [ ] Stage 2: Teacher editor
- [ ] Stage 3: PDF extraction and AI draft
- [ ] Stage 4: Persistence and approval workflow
- [ ] Stage 5: Results, evaluation, and portfolio preparation

## Contributing and feedback

This is currently a personal learning project. Feedback on usability, source-grounded question generation, accessibility, and educational usefulness is welcome.

## License

MIT licensing
