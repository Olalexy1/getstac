# GetStac - POS Management Dashboard

A modern dashboard application for managing Point of Sale (POS) locations, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication** - Secure login
- **Dashboard** - Overview of key metrics and statistics
- **Location Management** - View and filter POS locations
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context + Local Storage
- **Form Handling**: React Hook Form + Zod
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/getstac.git
   cd getstac
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Demo Login

Use the following credentials to log in:

| Email | Password | Name |
|-------|----------|------|
| jane.doe@gmail.com | password123 | Jane Doe |
| john.smith@gmail.com | password456 | John Smith |

## 🏗️ Project Structure

```
/src
  /app               # App router pages and layouts
  /components        # Reusable UI components
  /lib               # Utility functions and config
  /store             # Global state management
  /types             # TypeScript type definitions
```

## 📝 Development Notes

### Key Decisions

1. **Authentication**
   - Client-side authentication stored in localStorage
   - Mock authentication for development

2. **State Management**
   - React Context for global state
   - Local Storage for persistence
   - Optimistic UI updates where applicable

3. **Styling**
   - Tailwind CSS for utility-first styling
   - CSS Modules for component-scoped styles
   - Responsive design with mobile-first approach

## 📦 Dependencies

- `next`: 14.0.0
- `react`: ^18.2.0
- `tailwindcss`: ^3.3.0
- `@radix-ui/react-dialog`: ^1.0.0
- `lucide-react`: ^0.260.0
- `sonner`: ^1.0.0
- `zod`: ^3.22.0

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
