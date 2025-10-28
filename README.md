# Time Tracking Application

A simple, browser-based time tracking tool designed for freelancers and professionals to log working hours across multiple projects. The app uses the browser's `localStorage` to persist data, so your entries remain intact even after closing the browser.

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

## Why I Built This

As a developer and consultant working with freelancers and small businesses, I often noticed how time tracking tools are either too complex or locked behind subscriptions.
I wanted to create a lightweight, browser-based solution that’s easy to use, requires no login, and stores data locally — perfect for quick tracking without distractions.
This project also served as a fun way to explore pure HTML/CSS/JS development, and to experiment with user-friendly UI and localStorage-based persistence.

## Future Plans
I’m considering expanding the app with:
- Optional password protection or export/import features
- Visual charts for time distribution across projects
- Multi-language support (Hungarian and English)
- Data export to CSV or JSON
- Mobile-first UI improvements
- Modular code structure for easier maintenance
If you have ideas or feedback, feel free to open an issue or fork the project!

