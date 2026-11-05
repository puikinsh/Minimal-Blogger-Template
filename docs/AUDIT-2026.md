# Minimal maintenance audit — November 2026

## Changes in 2.3.0

- Numbered pagination keeps native Older/Newer links in one bar and falls back for ambiguous dates, short pages, invalid data or failed requests. Search and native cursor URLs retain server navigation.
- JSON-LD values use Blogger JSON escaping; article schema is shared by desktop and mobile post renderers, with optional modification dates.
- Blogger supplies Open Graph metadata without duplicate template tags; image-only logos retain a listing-page heading.
- Label page-size links preserve existing query strings, fragments and explicit limits. Feed titles/authors are escaped when rendered as HTML.
- Wide images, embeds, tables, code and long words stay within narrow post columns; navigation wraps and respects reduced-motion preferences.
- Escape and validate Disqus configuration; load the HTTPS embed only when its discussion container exists and becomes visible.

## Validation and practical limits

The automated checks cover both XML exports when present, standalone inline JavaScript, JSON-LD with quoted/Unicode text and optional image/date fields, label query preservation and production navigation in Chrome fixtures at 320px and 1200px. Shutter exercises both numbered and infinite modes. Blogger import and public-demo smoke tests supplement those fixtures; they cannot prove compatibility with every third-party widget, ad or custom post body.

Back up themes and widget settings before installation. Blogger generates canonical/Open Graph metadata through `all-head-content`; avoid adding duplicate tags. Its robots settings, feeds, consent/ads and third-party comment accounts remain blog-owner configuration. Search eligibility is not guaranteed by markup. Google's [sitelinks search box retirement](https://developers.google.com/search/blog/2024/10/sitelinks-search-box) means `SearchAction` is not a promised Google search feature; `WebSite` and `BlogPosting` remain the relevant schema types here.

## Ongoing checks

Before each release, run the documented checks and the Blogger smoke matrix. Recheck pinned CDN assets, browser console errors and image fallbacks when dependencies change. Check Colorlib's download links against the correct Blogger XML rather than similarly named HTML templates. Use the GitHub release for a versioned download; this audit does not assert that Colorlib's website has been edited.

## Completed live checks

The complete 2.3.0 theme saved successfully in Blogger. The demo home and a published post rendered, article JSON-LD parsed, and native Older/Newer or enhanced load-more navigation worked. The home page fit a 375px phone viewport without horizontal scrolling. Demo widget settings and theme colors were retained, and the previous installed XML was backed up separately. The automated suite passed with Chrome available (no skipped browser fixtures). These are smoke checks, not a guarantee for every custom widget or post.
