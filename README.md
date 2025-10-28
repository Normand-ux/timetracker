# Time Tracking Application 

A simple, browser-based time tracking tool designed for freelancers and professionals to log working hours across multiple projects. The app uses the browser's `localStorage` to persist data, so your entries remain intact even after closing the browser.

## Live Demo

Try it out directly in your browser:  
[https://normand-ux.github.io/timetracker/](https://normand-ux.github.io/timetracker/)

## Features

- **Time Measurement**  
  Start, stop, pause, and resume tracking with a clean, intuitive interface.

- **Project-Based Logging**  
  Assign each tracked session to a specific project name.

- **Automatic Logging**  
  When you stop the timer, the elapsed time is automatically added to the log with the given project name.

- **Log Management**  
  - View all previous entries  
  - Edit project names and durations  
  - Delete individual entries  
  - Clear all logs at once

- **Summary & Cost Calculation**  
  - Calculate total time and cost per project  
  - Generate detailed summaries by project and overall  
  - Hourly rate is configurable in the code

- **Clipboard Export**  
  Copy the generated summary to your clipboard with one click.

## How to Use

1. **Open `index.html`** in a modern browser.
2. **Start Tracking**  
   - Enter a project name  
   - Click **Start** to begin timing
3. **Manage Tracking**  
   - Use **Pause** to temporarily stop the timer. It switches to **Resume** to continue.  
   - Click **Stop** to end tracking and log the session.  
   - Use **Reset** to clear the timer without logging.
4. **Manage Logs**  
   - Each log entry includes **Edit** and **Delete** buttons  
   - Edit allows you to change the project name and duration  
   - Save or cancel changes as needed  
   - Use **Clear All Logs** to delete all entries
5. **Generate Summary**  
   - Leave the project name empty and click **Generate Summary** to view totals for all projects  
   - Enter a specific project name to filter the summary  
   - Use **Copy to Clipboard** to export the results

## Configuration

To set your hourly rate, edit the following line in `script.js`:

```javascript
const HOURLY_RATE = 15000; // HUF/hour
