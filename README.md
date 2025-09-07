# Morning-Checklist

Morning checklist app that helps organize your family's start to the day.

## Features
- Weather forecast with caching for offline access
- Checklist and timeline of tasks
- Custom rules and schedules for multiple kids
- Installable Progressive Web App with service worker

## Installation
No build step or external dependencies are required. Any recent browser can run the app. Optional tools such as Node.js or Python can provide a local static server for service worker testing.

## Local Development
1. Clone the repository and change into the directory:
   ```bash
   git clone https://github.com/your-username/daily-command.git
   cd daily-command
   ```
2. Start a static file server from the project root (choose one):
   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```
3. Open `http://localhost:5000` or `http://localhost:8000` in your browser.

## Deployment
Since the app is static, you can deploy by copying these files to any static host (e.g., GitHub Pages, Netlify, S3). Ensure the root contains `index.html`, `styles.css`, and `sw.js` for service worker caching.

## Usage
- Add tasks or schedules through the interface to build a morning routine.
- Tap tasks to mark them complete and view upcoming items in the timeline.
- Weather data and cached content make it usable offline.

