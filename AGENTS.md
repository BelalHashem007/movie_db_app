# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this movie database application repository.

## Project Overview

**Type**: React 19.2 + TypeScript movie database web application  
**Build Tool**: Vite 7.2.4  
**State Management**: Redux Toolkit with RTK Query  
**Styling**: Tailwind CSS 4.1.18  
**External API**: TMDB (The Movie Database)

## Available Commands

```bash
# Development
npm run dev          # Start Vite development server

# Build & Quality
npm run build        # TypeScript compilation + Vite build
npm run lint         # ESLint check (no auto-fix configured)
npm run preview      # Preview production build locally

# Testing (NOT CONFIGURED)
# This project does not have a testing framework set up
# Add Vitest/Jest if single test execution is needed
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled** with comprehensive linting
- **Target**: ES2022, **Module**: ESNext
- **JSX**: React JSX transform
- **No unused locals/parameters** enforced
- **No fallthrough cases in switch** enforced

### Import Organization
```typescript
// 1. External libraries (React, Redux, etc.)
import React from 'react'
import { useSelector } from 'react-redux'

// 2. Internal modules (absolute paths)
import { useAppDispatch, useAppSelector } from './app/hooks'

// 3. Relative imports (components, utilities)
import { MovieCard } from './components/Movie'
import { formatDate } from '../utility/helperFunctions'
```

### Component Conventions
- **Functional components only** - no class components
- **PascalCase** for component names
- **TypeScript interfaces** for all props
- **Default exports** for components, named exports for utilities

```typescript
interface MovieCardProps {
  movie: Movie
  onWatchlistToggle?: (movieId: number) => void
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onWatchlistToggle }) => {
  // Component logic
}

export default MovieCard
```

### Redux/State Management
- **Redux Toolkit** with `createSlice` for state
- **RTK Query** for API calls with caching
- **Typed hooks** using `withTypes()`

```typescript
// In app/hooks.ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// In components
const dispatch = useAppDispatch()
const { data, error, isLoading } = useGetMoviesQuery({ category: 'popular' })
```

### Styling with Tailwind CSS
- **Utility-first approach** - no CSS modules
- **Responsive design** with mobile-first breakpoints
- **Dark mode support** via CSS custom properties

```typescript
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
    {movie.title}
  </h2>
</div>
```

### Error Handling
- **Type guards** for API responses
- **Error boundaries** not implemented (consider adding)
- **Loading states** with skeleton animations

```typescript
// API response type guard
const isMovieResponse = (data: unknown): data is MovieResponse => {
  return typeof data === 'object' && data !== null && 'results' in data
}

// Loading state handling
if (isLoading) return <MovieSkeleton />
if (error) return <ErrorMessage message="Failed to load movies" />
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `MovieCard.tsx`)
- **Pages/Containers**: PascalCase (e.g., `MovieDetailsPage.tsx`)
- **Utilities**: camelCase (e.g., `helperFunctions.ts`)
- **Redux slices**: camelCase with Slice suffix (e.g., `authSlice.ts`)

### Directory Structure
```
src/
├── app/                    # Redux store, slices, typed hooks
├── components/            # Reusable UI components
├── pages/                 # Route-level components
├── routes/               # React Router configuration
├── utility/              # Helper functions and utilities
└── [App.tsx, main.tsx, index.css]
```

## API Integration Guidelines

- **TMDB API** for all movie data
- **Bearer token authentication** stored in environment variables
- **RTK Query** for API calls with automatic caching
- **Error handling** with proper TypeScript typing

```typescript
// Environment variables (VITE_ prefix required)
const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN

// RTK Query API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${API_TOKEN}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieResponse, { category: string }>({
      query: ({ category }) => `movie/${category}`,
    }),
  }),
})
```

## Development Workflow

1. **Start development**: `npm run dev`
2. **Lint before committing**: `npm run lint`
3. **Test build**: `npm run build`
4. **TypeScript compilation** is part of build process

## Missing Configurations (Consider Adding)

- **Testing framework** (Vitest recommended for Vite projects)
- **Code formatter** (Prettier with Tailwind plugin)
- **Pre-commit hooks** (Husky + lint-staged)
- **EditorConfig** for consistent editor settings
- **AI assistant rules** (.cursorrules or .github/copilot-instructions.md)

## Key Dependencies

- **React 19.2** - Latest with concurrent features
- **Redux Toolkit** - Modern Redux with RTK Query
- **Tailwind CSS 4.1** - Latest with Vite integration
- **React Router 7.11** - Latest routing solution
- **date-fns 4.1** - Date manipulation utilities

## Common Patterns

- **Custom hooks** for complex state logic
- **Skeleton loading** states for better UX
- **Image fallbacks** for missing movie posters
- **Pagination** for large movie lists
- **Dark mode** support throughout the application

## Security Notes

- **API tokens** should be in .env files (never commit)
- **No user authentication** implemented yet (token-based API only)
- **CORS** handled by TMDB API configuration