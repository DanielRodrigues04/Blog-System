# Modern Blog System

A full-featured blog platform built with React, TypeScript, and Supabase, featuring user authentication, post management, and a commenting system.

![Modern Blog System](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

### User Management
- 📝 User registration and login
- 👤 User profiles with unique usernames
- 🔒 Secure authentication via Supabase

### Blog Features
- ✍️ Create and publish blog posts
- 💬 Comment system on posts
- 📱 Fully responsive design
- 📊 Post listing with metadata
- 🔍 Detailed post views

### Technical Features
- ⚡ Built with Vite for fast development
- 🎨 Styled with Tailwind CSS
- 🔐 Row Level Security (RLS) for data protection
- 🌐 Real-time data with Supabase
- 📦 TypeScript for type safety

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Lucide React (icons)
  - React Router DOM
  - date-fns

- **Backend:**
  - Supabase (Database & Authentication)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-blog-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Database Setup

The application uses Supabase as its backend and requires the following tables:

- `profiles`: User profile information
- `posts`: Blog posts
- `comments`: Post comments

The schema includes proper relationships and Row Level Security policies for data protection.

## Usage

1. **Register/Login:**
   - Create a new account or login with existing credentials
   - Each user gets a unique profile

2. **Creating Posts:**
   - Click "New Post" in the navigation bar
   - Fill in the title and content
   - Click "Publish Post"

3. **Interacting with Posts:**
   - View all posts on the home page
   - Click on a post to view details
   - Add comments on posts
   - See post metadata (author, date, comment count)

## Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication flow
- Protected routes and actions
- Data validation and sanitization

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code

### Project Structure

```
modern-blog-system/
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts
│   ├── lib/          # Utility functions and configurations
│   ├── pages/        # Page components
│   └── main.tsx      # Application entry point
├── public/           # Static assets
└── supabase/        # Database migrations and configurations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [React Router](https://reactrouter.com/) for routing