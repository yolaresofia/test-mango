# Mango Technical Test

This repository contains the implementation of a technical test for Mango, consisting of two exercises focused on building custom range components using Next.js Typescript and unit tests with Jest and React Testing Library. Each exercise demonstrates specific functionalities related to fixed and dynamic ranges, with corresponding tests to ensure the components behave as expected.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Exercises](#exercises)
   - [Exercise 1](#exercise-1)
   - [Exercise 2](#exercise-2)
4. [Testing](#testing)
5. [Technologies](#technologies)
6. [How to Run](#how-to-run)

## Getting Started

To run this project locally, you need to have Node.js and npm installed.

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/test-mango.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd test-mango
   ```
   
3. Install the dependencies:
   ```bash
   npm install
   ```
   
4. Start the development server:
   ```bash
   npm run dev
   ```
   
5. Open your browser and go to http://localhost:8080 to view the project.



### Project Structure


```bash

src
├── app
│   ├── components
│   │   └── Range.tsx         # Range component used in both exercises
│   ├── exercise1
│   │   ├── page.tsx          # Page for Exercise 1
│   │   └── page.test.tsx     # Tests for Exercise 1
│   ├── exercise2
│   │   ├── page.tsx          # Page for Exercise 2
│   │   └── page.test.tsx     # Tests for Exercise 2
│   ├── hooks
│   │   └── useFetchValues.ts # Hook for fetching range values
│   └── types
│   │   └── index.ts          # Shared types
│   └── public
└── tests
    └── setup                 # Jest setup configuration

```


## Exercises

### Exercise 1

This exercise implements a **normal range slider** where users can adjust both the minimum and maximum values within a predefined range.

- **Dynamic Range**: Users can dynamically change the range between two values.
- **Validation**: The minimum value cannot exceed the maximum value and vice versa.
- **Editable Inputs**: Users can manually edit the min/max values through input fields.
- **Hover Effects**: Bullets enlarge on hover and the cursor changes to indicate draggable state.

#### Key Features:
- Dragging the min value bullet ensures it doesn’t surpass the max value bullet.
- Hovering on a bullet enlarges it and shows a draggable cursor.
- Tests ensure proper interactions and value constraints.

### Exercise 2

This exercise implements a **fixed value range** where users can only select specific, predefined values.

- **Fixed Range**: The component only allows predefined values, making it impossible to select any other value.
- **Non-editable Labels**: The range's labels are displayed as currency values and are not editable.

#### Key Features:
- Fixed steps for range bullets that snap to the nearest predefined value.
- Tests ensure users can only select from the allowed values.

## Testing

This project uses **Jest** and **React Testing Library** for unit testing.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## Test Coverage

The tests ensure that:

- Hover interactions work correctly (bullets enlarge, cursor changes).
- Min/max value validation prevents incorrect range selection.
- Only valid values can be selected in Exercise 2 (fixed range).
- Proper rendering of components after fetching values from the API.

## Technologies

The following technologies are used in this project:

- **Next.js 14** – React framework for production.
- **TypeScript** – Strongly-typed JavaScript.
- **TailwindCSS** – Utility-first CSS framework.
- **Jest** – Testing framework.
- **React Testing Library** – For component testing.

## How to Run

### Start the Development Server:

Run the following command to start the Next.js development server and view the project in your browser.

```bash
npm run dev
```

### Navigate to the Exercises:

- Go to [http://localhost:8080/exercise1](http://localhost:8080/exercise1) to view **Exercise 1**.
- Go to [http://localhost:8080/exercise2](http://localhost:8080/exercise2) to view **Exercise 2**.

