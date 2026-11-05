# Upgrading Minimal to 2.3.0

Back up the installed theme through Blogger **Theme → menu → Backup** before upgrading. Also record Layout widget contents, logo, colors, menu links, comment configuration, ad placements and posts per page. Theme XML and post-content exports are separate backups.

Install the complete `Minimal-Blogger-Template.xml` through **Theme → Edit HTML** or restore the theme XML. Do not import it as post content. Reapply your saved settings; a fresh theme installation can replace widget defaults. Choose **Desktop** in Blogger's mobile theme settings to use this responsive layout.

## Navigation behavior

Native Older/Newer URLs remain the reliable navigation and the no-JavaScript fallback. Optional numbers appear within that bar only when the feed and visible post count support them. Duplicate timestamps, shortened pages, searches and unrecognized cursor URLs use native links. Never change post dates merely to enable numbers.

Themes with infinite loading enhance the existing bar with a keyboard-operable button. Failed or invalid responses restore Older Posts at the last successfully loaded cursor. Automatic modes load at most three pages before requiring a click, keeping the footer reachable. Shutter's infinite mode remains manual. Existing Shutter mode settings remain supported.

## Verify and roll back

Check home, post, static, label, search and older/newer pages on desktop and a phone. Test a label containing spaces or `&`, posts with and without images, widgets, keyboard focus and comments. Inspect rendered JSON-LD on a post and check the browser console. Do not submit contact forms just to test layout.

To roll back, restore the theme backup and reapply the recorded Layout settings. Published posts do not need to change. Feed-dependent features require public Blogger feeds; native navigation still works if feeds are disabled.
