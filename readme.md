# Trade Parser

Trade Parser is a Node.js application for parsing cryptocurrency trade data from CSV files, storing it in a MongoDB database, and querying asset balances at specific timestamps.

## Features

- **CSV Parsing**: Parses cryptocurrency trade data from CSV files with UTC time, operation (buy/sell), market, buy/sell amount, and price columns.
- **Database Storage**: Stores parsed trade data in a MongoDB database with a schema that includes UTC time, operation, market, base coin, quote coin, amount, and price fields.
- **Balance Query**: Provides an API endpoint to query asset balances at specific timestamps, calculating the balance based on buy and sell trades.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. Set up MongoDB

   - Create a `.env` file in the root directory with the following content:

     ```env
     MONGODB_URI=<mongodb-uri>
     ```
   - Replace `<mongodb-uri>` with the connection URI for your MongoDB database.
4. Start the server:

   ```bash
   npm start
   ```
## Usage Routes
### Upload & Parse CSV
- **Route**: `POST /api/upload`
- **Description**: Uploads a CSV file with cryptocurrency trade data and parses it.
- **Request Body**:
  - `file`: CSV file with trade data
### Query Balances
- **Route**: `POST /api/balances`
- **Description**: Queries asset balances at specific timestamps.
- **Request Body**:
  - `timestamps`:timestamps to query balances 