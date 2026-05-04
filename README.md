# Online Book Borrowing Platform

A seamless and modern web application designed to digitize the traditional library experience. Users can explore a vast collection of books, filter by categories, and borrow titles digitally.

## Live URL

Local Development: http://localhost:3000

## Project Purpose

Online Book Borrowing Platform provides a digital platform for book enthusiasts to:
- Browse and search through a curated collection of books
- Filter books by categories (Story, Tech, Science)
- Borrow books digitally with real-time availability tracking
- Manage user profiles and preferences
- Enjoy a responsive, modern UI across all devices

## Key Features

- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Authentication**: Secure user authentication with BetterAuth
  - Email/Password login and registration
  - Google OAuth integration
  - Protected private routes
- **Book Management**: 
  - Browse all books with search functionality
  - Category filtering sidebar
  - Detailed book information pages
  - Real-time availability tracking
  - Borrow functionality with quantity management
- **User Profile**:
  - View personal information
  - Update profile (name and photo)
  - Secure logout
- **Home Page**:
  - Hero banner with call-to-action
  - Animated marquee for announcements
  - Featured books section
  - Why Choose Us features section
  - Testimonials carousel with SwiperJS
- **Modern UI**: Built with Tailwind CSS and DaisyUI components

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **UI Components**: DaisyUI
- **Authentication**: BetterAuth with MongoDB adapter
- **Database**: MongoDB with Mongoose
- **Animation**: SwiperJS for carousels
- **Icons**: Lucide React
- **Notifications**: React Hot Toast



## Notes

- The application auto-seeds 12 sample books on first API request if database is empty
- Authentication routes redirect unauthenticated users to login page
- BetterAuth handles session management and social login callbacks automatically


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev