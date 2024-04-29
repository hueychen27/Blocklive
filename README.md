# How to add addon to Firefox
Go to about:addons
Install Addon-on From File -> Choose `Blocklive-for-Firefox/extension/web-ext-artifacts/Blocklive-for-Firefox.xpi`
# Differences between original
The original does not have a working layout on Firefox. This fixes the layout problems and also cleans the HTML. Along with that,
```json
"background": {
    "scripts": [
		"background.js"
	]
},
```
replaces 
```json
"background": {
    "service_worker": "background.js"
},
```
in `manifest.json` to fix the `background.service_worker` not supported error. Shell files also adhere to shellcheck.
# Version list
- v0.2: Major fixes for layout design and total improvement of Blocklive support on Firefox.
- v0.2.1: Updates link is added.