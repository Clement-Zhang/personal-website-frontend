---
name: new-website-tab
description: Scaffold a new main-site page + navbar tab (page, tab entry, route). Use when the user asks to add a new page/tab to the main website. Args: page name, optional tab label.
---

Scaffold main-site tab <name> (lowercase route seg; PascalCase component; label = given tab label else Pascal).

1. src/views/pages/<Pascal>.page.jsx: export default fn <Pascal>() → <h1><Pascal></h1>.
2. src/configs/tabs/website.config.js: append {label: '<label>', path: '/<name>'}.
3. src/App.jsx: import page; add <Route path="<name>" element={<Pascal />} /> inside Default-layout group, before the path="*" route.
4. NO config file. Report: files created/modified, left to user: page contents.
