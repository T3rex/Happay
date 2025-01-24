
# Happay User CSV Importer

## Overview

A Node.js script to import users from a CSV file to Happay's user management system.
Prerequisites

1) Node.js
2) npm packages:
- uuid
- axios
- csv-parser

## Configuration

Replace dataLink with your CSV source URL
Update PostURL with the target Happay API endpoint
Set your token for API authentication

## Setup 
1. Clone the repository
2. Navigate to the project directory and install dependencies using following command in the terminal 
```
npm install
```
3. Configure `index.js`
- Update `dataLink` with CSV source URL
- Set `PostURL` to Happay API endpoint
- Replace `token`with authentication token

## Running the Script

```
# Navigate to project directory
cd your-project-directory

# Execute the script
node index.js
```


## Features

1) Fetches users from CSV
2) Transforms data to Happay API format
3) Generates unique user IDs
4) Sends bulk user registration requests

## Data Transformation

- Converts CSV columns to camelCase
- Generates email if not provided
- Adds title based on gender
- Extracts additional user fields

## Error Handling

- Logs successful and failed requests
- Handles CSV parsing errors

## Troubleshooting

- Verify CSV format matches expected structure
- Check network connectivity
- Ensure valid Happay API credentials

## Required Packages

- uuid: Generate unique identifiers
- axios: HTTP requests
- csv-parser: Parse CSV files
