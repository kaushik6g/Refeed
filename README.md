# TaskFlow - Task Management App

A modern, full-featured task management application built with Next.js 14, Redux Toolkit, and shadcn/ui components.

## ✨ Features

### Core Functionality
- 📝 **Create, Read, Update, Delete (CRUD)** operations for tasks
- 🔄 **Real-time state management** with Redux Toolkit
- 📊 **Task statistics dashboard** showing pending, in-progress, and completed tasks
- 🎨 **Modern UI** with shadcn/ui components and Tailwind CSS
- 🌓 **Dark mode support** (via next-themes)

### User Experience
- 🎯 **Intuitive navigation** with sticky header
- 📱 **Fully responsive** design for mobile, tablet, and desktop
- ⚡ **Loading states** with skeleton screens
- 🎉 **Toast notifications** for user feedback
- 🎭 **Smooth animations** and transitions
- 🎨 **Color-coded task statuses** (pending, in-progress, completed)

### Developer Experience
- 📁 **Clean project structure** with organized components
- 🔒 **Type-safe** with TypeScript
- ✅ **Form validation** using React Hook Form and Yup
- 🧪 **Testing setup** with Jest
- 🚀 **Mock API** for development (easily replaceable with real backend)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Refeed-main/Refeed-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
Refeed-main/
├── app/                      # Next.js 14 App Router
│   ├── api/                  # API routes
│   │   └── tasks/           # Task CRUD endpoints
│   ├── tasks/               # Task pages
│   │   ├── [id]/           # Task detail & edit page
│   │   └── new/            # Create task page
│   ├── globals.css         # Global styles & theme
│   ├── layout.tsx          # Root layout with header
│   └── page.tsx            # Home page with task list
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── Header.tsx          # Navigation header
│   ├── TaskForm.tsx        # Task create/edit form
│   └── providers.tsx       # Redux & theme providers
├── store/                   # Redux store
│   ├── features/
│   │   └── taskSlice.ts    # Task state management
│   └── store.ts            # Store configuration
├── lib/                     # Utilities
│   ├── validations/
│   │   └── task.ts         # Task validation schema
│   ├── axios.ts            # API client
│   └── utils.ts            # Helper functions
└── hooks/                   # Custom React hooks
    └── use-toast.ts        # Toast notification hook
```

## 🎨 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Yup](https://github.com/jquense/yup)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## 🎯 Task Status Types

- **Pending**: Tasks waiting to be started (Yellow)
- **In Progress**: Currently active tasks (Blue)
- **Completed**: Finished tasks (Green)

## 🔄 State Management

The app uses Redux Toolkit for state management with the following async thunks:

- `fetchTasks()` - Get all tasks
- `getTaskById(id)` - Get a single task
- `addTask(data)` - Create a new task
- `updateTask({ id, data })` - Update an existing task
- `deleteTask(id)` - Delete a task

## 🎨 Customization

### Update Theme Colors

Edit [app/globals.css](app/globals.css) to customize the color scheme. The app uses CSS variables for theming:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... more variables */
}
```

### Add New Task Fields

1. Update the `Task` interface in [store/features/taskSlice.ts](store/features/taskSlice.ts)
2. Update validation schema in [lib/validations/task.ts](lib/validations/task.ts)
3. Add fields to [components/TaskForm.tsx](components/TaskForm.tsx)

## 🔌 API Integration

The app currently uses a mock API with in-memory storage. To connect to a real backend:

1. Update the `baseURL` in [lib/axios.ts](lib/axios.ts)
2. Remove the mock API routes in `app/api/tasks/`
3. Ensure your backend follows the same REST API structure

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

Build the app and follow your platform's deployment guide:

```bash
npm run build
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js and React


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
