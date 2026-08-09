# Recruitment Pipeline Dashboard
**Developer:** Najith Nethwan

## Overview
This project is a full-stack recruitment pipeline interface that allows users to track and manage candidates across various application stages. It features a responsive Kanban-style React frontend and a RESTful Node.js/Express backend connected to a PostgreSQL database.

---

## Setup Instructions

### 1. Database Setup (PostgreSQL)
1. Open pgAdmin (or your preferred PostgreSQL client) and create a new database named `recruitment_db`.
2. Run the following SQL script in the query tool to create the necessary table and seed initial dummy data:
```sql
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    stage VARCHAR(50) NOT NULL CHECK (stage IN ('Applying Period', 'Screening', 'Interview', 'Test')),
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    overall_score DECIMAL(5,2),
    referral_status VARCHAR(10),
    assessment_status VARCHAR(50)
);

INSERT INTO candidates (name, stage, overall_score, referral_status, assessment_status)
VALUES 
    ('Jane Doe', 'Applying Period', 85.00, 'Yes', 'Pending'),
    ('John Smith', 'Interview', 92.50, 'No', 'Completed');
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend-app
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend-app` directory and add your database credentials:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=recruitment_db
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend-app
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## Instructions to Run Frontend and Backend Separately

To run this full-stack application, you must run both the backend and frontend servers concurrently in separate terminal environments. 

**Terminal 1 (The API):**
```bash
cd backend-app
npm start
```
*The backend API will listen for requests on `http://localhost:5000`.*

**Terminal 2 (The UI):**
```bash
cd frontend-app
npm run dev
```
*The frontend interface will be accessible via your browser, typically at `http://localhost:5173`.*

*(Note: Ensure your local PostgreSQL service is actively running in the background before starting the backend server so the database connection can be established.)*

---

## Notes on Assumptions and Decisions

* **Database Architecture:** PostgreSQL was chosen to demonstrate robust relational database modeling, real-world backend practices, and data integrity rather than relying on temporary in-memory arrays or lightweight alternatives.
* **Styling Strategy:** Standard CSS Modules were utilized for styling the React components. This strictly adheres to the assessment's requirements (which disallowed Tailwind CSS) while keeping styles cleanly scoped and preventing global class conflicts.
* **State Management:** Standard React hooks (`useState`, `useEffect`) were deemed sufficient and optimal for the complexity of this Kanban board, avoiding the over-engineering overhead of external libraries like Redux.
* **Primary Keys:** The database relies on `UUID`s instead of standard auto-incrementing integers for candidate IDs. This aligns with modern API security standards and prevents predictable endpoint enumeration.
