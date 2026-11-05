# Contributing to Minimal

The theme is one Blogger XML file; there is no npm install or build step. Use Python 3 and Node.js 22+:

```sh
python3 scripts/check_template.py
node --test tests/*.test.cjs
git diff --check
```

The Python check validates all repository XML, standalone JavaScript syntax and JSON-LD substitutions with optional fields present/absent. Blogger-dependent expressions still require live testing. The Node suite checks URL preservation and escaping, then runs the production navigation code with the theme CSS in Chrome at 320px and 1200px. It uses no network assets. Set `CHROME_BIN` if Chrome/Chromium is installed elsewhere; browser tests report a skip if unavailable. No coverage threshold is configured.

Keep changes focused and preserve widget IDs, namespaces, variables and CDATA boundaries. Match existing formatting and use two spaces for expanded code. Escape feed text at HTML output boundaries and Blogger values with `.jsonEscaped` in JSON-LD or `.jsEscaped` in quoted JavaScript. Avoid new dependencies; pin existing CDN versions.

Before a release, import the complete theme into Blogger and verify home/post/static/label/search views, Older/Newer, empty/disabled feeds, keyboard navigation, comments and a narrow screen. For infinite loading, verify every post in nested rows is retained and failed requests restore the latest native cursor. For numbered paging, test tied timestamps and Blogger-shortened pages. Check real post JSON-LD and console errors. Never describe fixtures as a full Blogger emulator.

Use short imperative commit subjects. PRs should describe the trigger, resulting behavior, validation and limitations, link relevant issues, and include screenshots for visual changes. Update the changelog and upgrade instructions when behavior changes.

Build versioned downloads with `python3 scripts/package_release.py --output /tmp/minimal-blogger-template-release`. The ZIP contains only the public source/docs/checks allowlist; the standalone XML and `SHA256SUMS` accompany it. Verify downloads against these checksums before publishing download links.
