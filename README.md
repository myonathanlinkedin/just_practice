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