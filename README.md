# Minimal — Free Clean & Minimal Blog Blogger Template

[![Version](https://img.shields.io/badge/Version-2.2.0-2942ee.svg)](CHANGELOG.md)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-zero_frameworks-F7DF1E?logo=javascript&logoColor=black)](http://vanilla-js.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-7-528DD7?logo=fontawesome&logoColor=white)](https://fontawesome.com/)

Minimal is a free clean and minimal Blogger template (Blogspot theme) for lifestyle blogs, fashion blogs, personal journals, and writers who want their content front and center. Generous whitespace, elegant typography, a featured post area, and a tabbed sidebar give it a premium magazine feel - with 100% vanilla JavaScript and zero render-blocking assets under the hood.

Created and maintained by [Colorlib](https://colorlib.com), Minimal is a sleek, distraction-free theme for lifestyle, fashion, and personal blogs — free for personal and commercial use.

[![Minimal — free clean & minimal blog Blogger template (Blogspot theme) by Colorlib](https://colorlib.com/wp/wp-content/uploads/sites/2/minimal-blogger-lifestyle-blog-theme.jpg)](https://minimal-preview.blogspot.com)

**[Live Demo](https://minimal-preview.blogspot.com)** | **[Download ZIP](https://github.com/puikinsh/Minimal-Blogger-Template/archive/refs/heads/master.zip)** | **[Changelog](CHANGELOG.md)**

## Features

- **Featured posts area** - a homepage hero with secondary tiles pulled from any post label
- **Mega menu navigation** - label-driven, image-rich mega menus with instant prefetched paging
- **Tabbed sidebar** - Recent, Popular, and Comments tabs with accessible switching
- **Custom list and gallery widgets** - label-fed homepage sections including a Swiper-powered gallery slider
- **AdSense-ready ad slots** - monetize without touching the layout
- **Clean typography** - Montserrat headings with a refined post-content type scale (headings, lists, blockquotes)
- **SEO-optimized markup** — exactly one `h1` per page, JSON-LD structured data (`WebSite`, `SearchAction`, `BlogPosting`), Open Graph and Twitter card meta tags, semantic landmarks
- **Fast page load** — zero jQuery, zero CSS frameworks, no render-blocking external assets, preconnect hints, native lazy loading, and right-sized images served by Blogger's CDN
- **Accessible** — skip-to-content link, labeled controls, ARIA tab roles, keyboard-friendly navigation, and no user-zoom blocking
- **Easy color customization** — change the color scheme from Blogger's theme editor, no code required
- **Font Awesome 7 icons** and Google Fonts, loaded without blocking the first paint
- **Self-updating copyright year** in the footer

## How to Install a Blogger Template

1. **Download** the [ZIP](https://github.com/puikinsh/Minimal-Blogger-Template/archive/refs/heads/master.zip) or clone this repository
2. **Sign in to Blogger** at [blogger.com](https://www.blogger.com) and pick your blog
3. **Open the theme editor** — *Theme* → *Customize* dropdown → **Edit HTML**
4. **Replace the code** — select everything, delete it, and paste the full contents of `Minimal-Blogger-Template.xml`
5. **Save** - if Blogger warns that the FollowByEmail (Newsletter) widget will be deleted, confirm it; that widget posted to FeedBurner email subscriptions, which Google shut down in 2021
6. **Set mobile to Desktop** — in *Theme*, click the gear icon under the Mobile preview and choose **Desktop**; the template is fully responsive and this removes Blogger's legacy `?m=1` mobile wrapper (and its extra redirect) for mobile visitors

### Import Demo Content (Optional)

To preview the template with sample posts before publishing your own:

1. Go to **Settings** > **Manage blog** > **Import content**
2. Upload `Minimal Demo Content.xml` from this repository

## Customization

- **Colors** — *Theme* → *Customize* → *Advanced* exposes the template's color variables (accent color, backgrounds, text) with live preview
- **Menus** — edit the navigation LinkList widgets in *Layout*; prefix an item with `_` for a dropdown level, or set a link to `[Mega Menu]`-style label syntax where supported
- **Homepage sections** — the label-driven widgets are configured from *Layout* by editing each widget's content (the label name and post count)
- **Ads** — paste your AdSense (or any) ad code into the advertisement widgets in *Layout*

## Tech Stack

| Library | Version | Loading |
| ------- | ------- | ------- |
| [Swiper](https://swiperjs.com/) | 11 (pinned) | On demand, only when a slider/carousel exists on the page |
| [Font Awesome](https://fontawesome.com/) | 7 | Non-blocking, pinned via jsDelivr |
| [Google Fonts](https://fonts.google.com/) | — | `display=swap`, non-blocking |

Everything else is hand-written CSS and vanilla JavaScript inside the single template file — no jQuery, no Bootstrap, no build step. Feeds load over same-origin `fetch()` with `alt=json`.

## FAQ

**Is Minimal really free?** Yes — free for personal and commercial use under GPL v3. Attribution to [Colorlib](https://colorlib.com) is appreciated but not required.

**Does it work with AdSense?** Yes. The layout includes dedicated ad widgets, and you can add more ad units through Blogger's Layout editor.

**Will it slow down my blog?** No — the template loads zero render-blocking external assets and removed all legacy frameworks (jQuery, Bootstrap, Owl Carousel) in version 2.0. See the [changelog](CHANGELOG.md) for the full performance work.

**Can I use it on multiple blogs?** Yes, on as many blogs as you like.

## More Free Blogger Templates by Colorlib

Minimal is one of nine free, open-source Blogger templates we maintain on GitHub - every one modernized with vanilla JavaScript, structured data, and an accessibility pass. Pick the design that fits your blog:

<table><tr><td align="center" width="33%"><a href="https://github.com/puikinsh/Pixel-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/pixel-free-news-adsense-blogger-template.jpg" alt="Pixel - free news & magazine Blogger template" width="260"/><br/><b>Pixel</b></a><br/>News & Magazine Blogger template</td><td align="center" width="33%"><a href="https://github.com/puikinsh/Simplify-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/simplify-free-fullscreen-blogger-template.jpg" alt="Simplify - free minimal personal blog Blogger template" width="260"/><br/><b>Simplify</b></a><br/>Minimal Personal Blog Blogger template</td><td align="center" width="33%"><a href="https://github.com/puikinsh/Ember-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/ember-simple-blogger-blog-theme.jpg" alt="Ember - free magazine Blogger template" width="260"/><br/><b>Ember</b></a><br/>Magazine Blogger template</td></tr><tr><td align="center" width="33%"><a href="https://github.com/puikinsh/Kaplan-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/kaplan-minimal-blogger-website-template.jpg" alt="Kaplan - free magazine Blogger template" width="260"/><br/><b>Kaplan</b></a><br/>Magazine Blogger template</td><td align="center" width="33%"><a href="https://github.com/puikinsh/Plasma-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/plasma-simple-trave-blogger-news-template.jpg" alt="Plasma - free travel & news magazine Blogger template" width="260"/><br/><b>Plasma</b></a><br/>Travel & News Magazine Blogger template</td><td align="center" width="33%"><a href="https://github.com/puikinsh/PhotoMag-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/photomag-fullscreen-website-template.jpg" alt="PhotoMag - free photography Blogger template" width="260"/><br/><b>PhotoMag</b></a><br/>Photography Blogger template</td></tr><tr><td align="center" width="33%"><a href="https://github.com/puikinsh/FutureMag-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/futuremag.jpg" alt="FutureMag - free news & magazine Blogger template" width="260"/><br/><b>FutureMag</b></a><br/>News & Magazine Blogger template</td><td align="center" width="33%"><a href="https://github.com/puikinsh/Shutter-Blogger-Template"><img src="https://colorlib.com/wp/wp-content/uploads/sites/2/shutter-creative-portfolio-blogger-template.jpg" alt="Shutter - free photography portfolio Blogger template" width="260"/><br/><b>Shutter</b></a><br/>Photography Portfolio Blogger template</td><td width="33%"></td></tr></table>

Looking for even more? Browse the full collection of [free Blogger templates](https://colorlib.com/wp/free-blogger-templates/) on Colorlib, or explore our [free WordPress themes](https://colorlib.com/wp/free-wordpress-themes/) and [free HTML website templates](https://colorlib.com/wp/templates/).

## License

Minimal is released under the [GPL v3 license](https://www.gnu.org/licenses/gpl-3.0). You are free to use, modify, and redistribute it for personal and commercial projects.

---

Made with care by [Colorlib](https://colorlib.com) — free website templates and WordPress themes since 2013.
