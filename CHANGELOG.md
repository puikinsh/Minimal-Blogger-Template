# Changelog

All notable changes to the Minimal Blogger Template are documented in this file.

## [2.1.0] - 2026-06-11

### Changed

- **Font Awesome 4.7 + Ionicons 2.0.1 consolidated into Font Awesome 7.2.0** — one icon library instead of two 2014-era ones; every icon class and CSS glyph migrated
- **Social icons modernized** — Google+ and Vine defaults replaced with TikTok, Threads, Pinterest, and X (Twitter); the social bar gains TikTok, Threads, Telegram, and WhatsApp support; the legacy Twitter bird gives way to the X glyph
- Search submit buttons carry an explicit `type='submit'`

## [2.0.0] - 2026-06-11

Major modernization release: zero frameworks, zero render-blocking external assets, structured data, and a full accessibility pass.

### Performance

- **jQuery 1.11.0 removed entirely** — every script rewritten in modular vanilla JavaScript; feeds use same-origin `fetch()` instead of JSONP
- **Bootstrap 4.0.0-beta.2 removed** — replaced by ~25 lines of custom CSS covering the handful of classes actually used
- **Owl Carousel replaced by Swiper 11**, loaded on demand only when a gallery widget exists; **Sticky-kit replaced by CSS `position: sticky`**
- Right-sized images everywhere: post cards use Blogger's `resizeImage()` server-side and feed widgets request `s400`–`s1200` variants instead of full-size originals; native lazy loading on below-the-fold images
- Featured grid reserves its height (no layout shift), preloads the hero with `fetchPriority=high`, and skips its feed request off the homepage
- Facebook SDK (v2.0 → v21.0) was loaded twice globally; now loads once, lazily, only when facebook comments are configured and near the viewport
- Preconnect hints; Font Awesome and Ionicons on pinned https jsDelivr URLs; Google Fonts with `display=swap`; Blogger's widget CSS bundle suppressed via `b:css='false'`

### SEO

- Removed the site-wide `index,nofollow` robots meta
- JSON-LD structured data (`WebSite` + `SearchAction` sitewide, `BlogPosting` on posts), Open Graph and Twitter card meta
- Single `h1` per page; `html lang` from the blog locale; alt text no longer overwritten with filenames

### Accessibility

- Skip-to-content link, main landmark, labeled search/close controls, keyboard-focusable search trigger with Escape support
- ARIA `tablist`/`tab`/`tabpanel` roles on sidebar and comment tabs; labeled form fields and archive dropdown; screen-reader text on icon-only pager arrows; valid Profile widget markup

### Fixed / Removed

- Mega menu linked to the original demo blog (`mino-blossom.blogspot.com`); mixed-content http:// URLs; Blossom Themes branding and dead `blossomtheme.com` ad links; hardcoded "Posts by Diago"
- FollowByEmail widget (FeedBurner shut down in 2021), hidden Navbar Google+ scripts, Google+ share/follow buttons, dead Owl CSS, obsolete vendor prefixes

## [1.0.0] - 2020

- Initial release, previously distributed via colorlib.com (now published on GitHub)
