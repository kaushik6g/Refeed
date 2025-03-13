# Task Management App

A simple task management application built with Next.js, Redux, and a mock API.

## Features

- View the list of tasks
- Create new tasks
- View task details
- Update and delete tasks

## Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd your-project-folder
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

To start the development server, run:

```sh
npm run dev
```

Then open http://localhost:3000 in your browser.

## Build and Deploy

To create a production build, run:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run start
```

## API Routes

This project uses Next.js API routes (`/app/api`) for backend functionality.

## Troubleshooting

- If you face module import issues, restart the Next.js server:
  ```sh
  rm -rf .next node_modules/.turbo
  npm install
  npm run dev
  ```
- Ensure `taskSlice.ts` is correctly placed in `store/features/`.

## Contributing

Feel free to open issues or submit pull requests to improve the project.

---

Happy Coding! 🚀
