# Spid2Prop

A modern web application for backing up real estate data from external websites.

## Overview

Spid2Prop is a tool designed to help users back up real estate agent data from specified URLs. The application sends a request to a scraping service, monitors the progress of the backup job, and provides download links for the extracted data when complete.

## Features

- Start backup jobs by providing an agent URL
- Real-time monitoring of backup progress with 10-second polling intervals
- Visual progress indicators showing the number of properties being extracted
- Download Excel files and images once the backup is complete
- History of all backup jobs with their current status

## Technologies Used

- React.js
- Material UI for modern UI components
- Zustand for state management
- Axios for API requests

## Installation

1. Clone the repository:
```
git clone https://github.com/arasors/spid2prop
cd spid-2-prop
```

2. Install dependencies:
```
npm install
or
pnpm install
```

3. Start the development server:
```
npm start
or
pnpm start
```

The application will be available at http://localhost:3000

## Usage

1. Enter the URL of the agent's page you want to backup in the input field
   - Example: `https://www.spitogatos.gr/en/find-agents/Greek-Living-Real-Estate/10301?portfolio=true`

2. Click "Start Backup" to begin the extraction process

3. The application will automatically check the status of your backup job every 10 seconds

4. Once completed, you'll see "Download Excel" and "Download Images" buttons to access your data

## API Endpoints

The application uses the following API endpoints:

- `POST /start-scraping` - Start a new backup job
  - Request body: `{ "url": "https://example.com/agent-page" }`
  - Response: `{ "check_status_url": "/status/task-id", "message": "Task started", "status": "started", "task_id": "task-id" }`

- `GET /status/:taskId` - Check the status of a backup job
  - Response (running): `{ "progress": 1, "status": "running" }`
  - Response (completed): `{ "download_links": { "excel": "/download/excel/task-id", "images": "/download/images/task-id" }, "progress": 9, "status": "completed" }`

## Project Structure

- `src/store/backupStore.js` - Zustand store for managing backup jobs and API interactions
- `src/components/Header.jsx` - Application header component
- `src/components/BackupForm.jsx` - Form for starting new backup jobs
- `src/components/BackupJobsList.jsx` - Component displaying all backup jobs and their status
- `src/theme.js` - Material UI theme configuration
- `src/App.js` - Main application component
