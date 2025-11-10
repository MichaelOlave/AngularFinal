# Repository Guidelines

## Project Structure & Module Organization
This Angular CLI workspace keeps all runnable code under `src`. `src/app/app.ts` hosts the root standalone component, while routing lives in `src/app/app.routes.ts` so new feature modules (for example `src/app/home`, `src/app/oskar`, `src/app/yeskey`) can stay isolated. Shared UI such as the header lives in `src/app/components/header`. Global styles and theming belong in `src/styles.css` and `src/custom-theme.scss`, and any static files that should bypass Angular’s builder go in `public`. Tests sit next to their targets as `*.spec.ts` files to keep fixtures close to the implementation.

## Build, Test, and Development Commands
- `npm install` – install workspace dependencies before any other command.
- `npm run start` – launch `ng serve` with live reload against `http://localhost:4200`.
- `npm run build` – produce an optimized production bundle in `dist/angular-final`.
- `npm run watch` – incremental rebuild loop that mirrors the development configuration for quick visual checks.
- `npm run test` – execute the Karma/Jasmine suite in a browser; append `-- --code-coverage` when you need updated coverage reports under `coverage/angular-final`.

## Coding Style & Naming Conventions
TypeScript runs in strict mode (`tsconfig.json`), so fix all type errors before opening a PR. Components, directives, and pipes should follow Angular casing (`HeaderComponent`, `home.routes.ts`). New SCSS or CSS files need two-space indentation and use CSS custom properties when possible to integrate with `custom-theme.scss`. Prettier is configured with 100-character line width and single quotes; run `npx prettier "src/**/*.{ts,html,scss}" --write` before committing to avoid formatting churn.

## Testing Guidelines
Write or update a companion `*.spec.ts` whenever you add logic that can regress. Prefer shallow tests using Angular’s `TestBed`, and stub external modules (e.g., CDK, Material) so unit tests remain deterministic. Keep description strings imperative (`it('renders the hero CTA')`) and group related expectations with `describe`. Target at least statement-level coverage of new logic; if coverage drops, run `npm run test -- --code-coverage` and inspect `coverage/angular-final/index.html`.

## Commit & Pull Request Guidelines
The log uses Conventional Commits (`feat:`, `fix:`, `refactor:`), so continue that format with short imperatives and optional scopes (`feat(header): add CTA`). Each PR should summarize the change, link any assignment or issue, and include screenshots or GIFs when visual components change. Call out testing steps (commands run, browsers checked) and any follow-up work so reviewers can merge confidently.
