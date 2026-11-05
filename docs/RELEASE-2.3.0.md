# Minimal 2.3.0 — navigation, SEO and mobile hardening

- Numbered pagination keeps native Older/Newer links in one bar and falls back for ambiguous dates, short pages, invalid data or failed requests. Search and native cursor URLs retain server navigation.
- JSON-LD values use Blogger JSON escaping; article schema is shared by desktop and mobile post renderers, with optional modification dates.
- Blogger supplies Open Graph metadata without duplicate template tags; image-only logos retain a listing-page heading.
- Label page-size links preserve existing query strings, fragments and explicit limits. Feed titles/authors are escaped when rendered as HTML.
- Wide images, embeds, tables, code and long words stay within narrow post columns; navigation wraps and respects reduced-motion preferences.
- Escape and validate Disqus configuration; load the HTTPS embed only when its discussion container exists and becomes visible.

Includes automated checks and contributor/upgrade documentation. Back up your theme and Layout settings before installing the complete XML; published posts need no changes. See [UPGRADING.md](https://github.com/puikinsh/Minimal-Blogger-Template/blob/v2.3.0/docs/UPGRADING.md) for verification and rollback.

Validation: 5 passing regression tests, including Chrome fixtures at 320px and 1200px; XML, inline JavaScript and JSON-LD checks; Blogger import and live home/post/pagination smoke checks. The public demo was also checked at 375px with no horizontal page overflow.
