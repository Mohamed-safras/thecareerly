# 🚀 TheCareerLy - Automated Job Hiring Agent

An intelligent, automated job hiring platform built with Next.js 15, featuring AI-powered candidate screening, team collaboration, and comprehensive job management capabilities.

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user authentication with JWT tokens
- Role-based access control (Admin, Organization, Team)
- Protected routes with middleware
- Session management with auto-refresh

### 👥 User Management

- Multi-role user system
- User profiles and settings
- Team collaboration features
- Organization management

### 💼 Job Management

- Create, edit, and manage job postings
- AI-powered candidate screening
- Application tracking and management
- Job search and filtering
- Drag-and-drop interfaces for organization

### 🤖 AI Integration

- Ollama integration for intelligent candidate analysis
- Automated resume screening
- Smart candidate matching
- AI-assisted decision making

### 🎨 Modern UI/UX

- Built with shadcn/ui components
- Responsive design with Tailwind CSS
- Dark mode support with next-themes
- Smooth animations with Framer Motion & GSAP
- Rich text editing with TipTap
- Interactive data tables with TanStack Table

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15.5.0 with React 19
- **Styling:** Tailwind CSS v4 with PostCSS
- **UI Components:** shadcn/ui, Radix UI
- **State Management:** Redux Toolkit with react-redux
- **Forms:** React Hook Form with Zod validation
- **Animations:** Framer Motion, GSAP
- **Rich Text:** TipTap Editor, MD Editor

### Backend & Data

- **API Client:** Axios with retry logic
- **Database:** Prisma (ORM)
- **Authentication:** JWT with bcryptjs
- **AI Integration:** Ollama

### Development Tools

- **Language:** TypeScript
- **Linting:** ESLint
- **Package Manager:** npm
- **Build Tool:** Next.js Turbopack

## 📋 Prerequisites

- **Node.js** (v20 or higher)
- **npm** (v11 or higher)
- **Ollama** (for AI features)
- **Database** (PostgreSQL, MySQL, or SQLite)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mohamed-safras/Automated-Job-Hiring-Agent.git
cd thecareerly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/thecareerly"

# Authentication
JWT_SECRET="your_jwt_secret_key"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Ollama AI
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama2"
```

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
thecareerly/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   ├── api/                 # API routes
│   ├── connect/             # Connection/onboarding pages
│   ├── forbidden/           # Access denied page
│   ├── organization/        # Organization dashboard
│   └── page.tsx             # Home page
├── components/              # Reusable UI components
├── constents/              # Application constants
├── features/               # Feature modules
│   ├── auth/               # Authentication feature
│   ├── jobs/               # Job management feature
│   ├── teams/              # Team collaboration feature
│   └── users/              # User management feature
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and helpers
│   ├── axios/              # Axios configuration
│   └── ...                 # Other utilities
├── store/                  # Redux store configuration
│   └── slice/              # Redux slices
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── middleware.ts           # Next.js middleware for auth/routing
```

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Secure password hashing with bcryptjs
- Protected API routes
- Role-based access control
- Middleware-based route protection
- CORS configuration

## 🎯 Key Features Implementation

### Authentication Flow

- Login/Signup with email and password
- Automatic token refresh on expiration
- Secure session management
- Protected client-side and server-side routes

### Job Workflow

1. Create job posting
2. AI-powered candidate screening
3. Application management
4. Candidate evaluation
5. Hiring decision

### Team Collaboration

- Multi-user organizations
- Team-based job management
- Role-based permissions
- Collaborative hiring decisions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Mohamed Safras**

- GitHub: [@Mohamed-safras](https://github.com/Mohamed-safras)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Ollama](https://ollama.ai/) - Local AI integration
- [Prisma](https://www.prisma.io/) - Next-generation ORM

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ using Next.js and AI**
