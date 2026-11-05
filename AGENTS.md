# Repository Guidelines

## Project Structure & Module Organization

`Minimal-Blogger-Template.xml` contains the whole Minimal theme: metadata, CSS in `<b:skin>`, Blogger widgets and inline JavaScript. Demo-content XML, when present, imports posts rather than theme code. `README.md` covers installation; `CHANGELOG.md` records releases. Maintenance notes live in `docs/`; checks and regression fixtures live in `scripts/` and `tests/`.

## Build, Test, and Development Commands

There is no package manager, build step or local server. Use Python 3 and Node.js 22+.

- `python3 scripts/check_template.py`: validate XML, standalone JS syntax and JSON-LD substitutions.
- `node --test tests/*.test.cjs`: run URL, escaping, navigation and narrow-layout regressions. Chrome/Chromium enables browser fixtures; set `CHROME_BIN` when needed.
- `git diff --check`: catch whitespace errors.

Import the full XML into a test blog using **Theme → Edit HTML** for platform verification. Opening XML locally cannot render Blogger expressions.

## Coding Style & Naming Conventions

Match surrounding formatting; use two spaces for new expanded blocks. Keep JavaScript vanilla, reuse existing theme helpers, and preserve widget IDs, namespaces, theme variables and CDATA boundaries. Avoid unrelated reformatting. No formatter or linter is configured. Pin external dependencies. Use `colorlibText()` for feed text in HTML, `.jsonEscaped` in JSON-LD and `.jsEscaped` in quoted Blogger JavaScript values.

## Testing Guidelines

Name Node tests `tests/*.test.cjs`; no coverage threshold is configured. Cover observable failures, including tied dates, malformed/failed feeds, label URL parameters and mobile content overflow. Verify home, post, static, label/search and pagination views in Blogger, then inspect keyboard focus, widgets, comments and console errors. Keep native navigation usable when enhancements fail.

## Commit & Pull Request Guidelines

Follow the history's short imperative commit subjects, such as `Fix pagination fallback`. Explain the problem, resulting behavior and checks performed in PRs; link issues and include screenshots for UI changes. Update the changelog and relevant documentation. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the complete release validation checklist.
