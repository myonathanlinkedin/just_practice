# Tree Properties (C# .NET 9 & TypeScript)

## Overview
This project provides solutions in both C# (.NET 9) and TypeScript for calculating the **height** and **number of leaf nodes** in a tree, given a parent array representation. It includes comprehensive unit tests for both implementations.

---

## Problem Statement
Given a tree represented as an array where each element is the parent of the node at that index (with the root marked as `-1`), compute:
- The **height** of the tree (the number of edges from the root to the deepest leaf)
- The **number of leaf nodes** (nodes with no children)

### Example
Given the parent array:
```
5 2 5 2 1 -1 5 0
```
This corresponds to the following tree:

```
        5
      / | \
     2  6  0
    / \    \
   1   3    7
  /
 4
```
- The height is **3** (longest path: 5-2-1-4, which has 3 edges)
- The number of leaves is **4** (nodes 6, 4, 3, 7)

**Output:**
```
3
4
```

---

## Requirements
- **Height:** Number of edges from the root to the deepest leaf. (A tree with only the root has height 0.)
- **Leaf nodes:** Nodes with no children.
- **Input:** An array of integers, where `array[N]` is the parent of node N, and the root is marked with `-1`.
- **Output:** Two numbers: height and number of leaves.
- **Constraints:** The tree can have up to 1500 nodes.

---

## Project Structure
- `TreeProperties/` - C# (.NET 9) implementation
- `TreePropertiesTypeScript/` - TypeScript implementation
- `TreePropertiesUnitTesting/` - C# xUnit test project

---

## How to Run (C# .NET 9)
1. **Build and Run:**
   ```sh
   cd TreeProperties/TreeProperties
   dotnet run
   ```
   Enter the parent array as space-separated numbers when prompted.

2. **Run Tests:**
   ```sh
   cd ../TreePropertiesUnitTesting
   dotnet test
   ```

---

## How to Run (TypeScript)
1. **Install dependencies:**
   ```sh
   cd TreePropertiesTypeScript
   npm install
   ```
2. **Run the program:**
   ```sh
   npm run build
   npm start
   ```
   (Or use `npm run dev` for ts-node.)

3. **Run Tests:**
   ```sh
   npm test
   ```

---

## Notes
- The logic for height and leaf count is consistent across both implementations and matches the requirements strictly.
- All test cases are designed to match the definition of height as the number of edges, not nodes.

---

## License
MIT

---

Developed by Mateus Yonathan 

---

# LinkedIn-Style Notes App (React + ASP.NET Core .NET 9)

This is a modern, professional notes application featuring:
- A **React + TypeScript** frontend with a LinkedIn-inspired UI, light/dark themes, and Material UI components.
- An **ASP.NET Core (.NET 9)** backend providing a RESTful API for notes.

## Features

- LinkedIn-Style UI: Sidebar, AppBar, card-based feed, and theme toggle.
- Light & Dark Themes: User can switch between light and dark modes.
- Responsive Design: Works on desktop and mobile.
- CRUD Notes: Create, read, update, and delete notes.
- Real-Time API Integration: React app connects to ASP.NET Core backend at `https://localhost:7036`.
- RTK Query: Efficient data fetching and caching in the frontend.

## Tech Stack

- **Frontend**: React, TypeScript, Material UI, Redux Toolkit, RTK Query, React Router
- **Backend**: ASP.NET Core Web API (.NET 9)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- **.NET 9 SDK** (for backend)

### 1. Backend Setup (ASP.NET Core .NET 9)
1. Navigate to the backend project directory (e.g., `AspNetApi/AspNetApi`).
2. Restore and run the API:
   ```sh
   dotnet restore
   dotnet run
   ```
3. The API should be running at `https://localhost:7036`.
   - Ensure CORS is enabled for `http://localhost:3000` (the React app).

### 2. Frontend Setup (React)
1. Navigate to the React app directory:
   ```sh
   cd React
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/notes` - List all notes
- `GET /api/notes/{id}` - Get a single note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

## UI Components

- App Shell: LinkedIn-style sidebar, AppBar, and main content area.
- Notes Feed: Card layout with avatars, titles, and actions.
- Note Form: For creating and editing notes.
- Theme Toggle: Switch between light and dark themes.

## Troubleshooting

- If you see errors about missing modules, run `npm install` in the `React` folder.
- If you see CORS errors, ensure your ASP.NET Core backend allows requests from `http://localhost:3000`.
- Make sure both frontend and backend are running at the correct ports.

--- 