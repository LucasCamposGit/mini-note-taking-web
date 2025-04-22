# Mini Note-Taking App

A minimalist note-taking application for those tired of noise and overload. Post short notes, reply to yourself, and keep it simple.

## Table of Contents
- Overview
- Tech Stack & Architecture
- Features
- Installation & Setup
- Usage
- Payment Integration
- Authentication
- Project Structure
- License

## Overview

Mini Note-Taking is a lightweight, focused note-taking platform built to eliminate the noise and complexity found in many productivity tools. It allows users to capture thoughts in short note format (up to 280 characters in the free tier) and organize them with replies, creating simple threads of thought.

The application offers both free and premium tiers:
- **Free Plan**: Up to 280 characters per note. Basic functionality.
- **Premium Plan**: $2/month for expanded 560 character limit.

## Tech Stack & Architecture

### Core Technologies
- **Frontend Framework**: Next.js 14.2
- **Language**: TypeScript
- **UI Styling**: TailwindCSS
- **State Management**: Custom React Context API with Reducers
- **Authentication**: Google OAuth (@react-oauth/google)
- **Payment Processing**: Stripe

### Architecture

This application follows a modern React architecture using the Next.js App Router pattern:

- **Context-based State Management**: Uses a reducer pattern to manage application state across different domains (notes, UI, authentication)
- **Custom Hooks**: Encapsulates logic for note visibility, data fetching, and authentication
- **Component Composition**: Uses a component composition pattern (especially in card components) for flexible and reusable UI elements

## Features

- **Minimalist Note Creation**: Simple interface to create short-form notes
- **Threaded Replies**: Reply to your own notes to create thought threads
- **Note Management**: Edit and delete capabilities for notes and replies
- **Character Counter**: Displays remaining character count based on your subscription tier
- **Responsive Design**: Works on both mobile and desktop devices

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://your-repository-url/note-taking-app.git
cd note-taking-app
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Set up environment variables:
Create a .env.local file with the following:
```
# Authentication
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Visit `http://localhost:3000` to see the application

## Usage

### Creating Notes
1. Navigate to the Mini Notes page after signing in
2. Enter your note text in the main input field (character count displayed)
3. Click "Post" to create your note

### Managing Notes
- **Reply**: Click the reply button on a note to add a threaded response
- **Edit**: Use the menu (three dots) to access the edit option
- **Delete**: Use the menu (three dots) to access the delete option

### Viewing Notes
- Notes are displayed in chronological order
- Replies are nested under their parent notes

## Payment Integration

The application uses Stripe for payment processing. Users can upgrade to the premium plan by:

1. Clicking "Upgrade Now" on the homepage
2. Following the Stripe checkout process
3. Upon successful payment, user accounts are automatically upgraded to premium status

## Authentication

Authentication is implemented using Google OAuth:

1. Users can sign up/log in using their Google accounts
2. Authentication state is managed throughout the application
3. Protected routes require authentication

## Project Structure

```
src/
├── app/                    # Next.js App Router structure
│   ├── page.tsx            # Homepage
│   ├── mini-notes/         # Main note-taking functionality
│   │   ├── components/     # Reusable note components
│   │   ├── context/        # State management
│   │   ├── hooks/          # Custom hooks for notes 
│   │   └── page.tsx        # Notes main page
│   ├── payment/            # Stripe payment integration
│   └── signup/             # User authentication components
├── context/                # Global app contexts
├── hooks/                  # Global custom hooks
├── lib/                    # Utility libraries
├── store/                  # State management reducers
│   ├── auth/               # Authentication state
│   ├── notes/              # Notes data state
│   └── ui/                 # UI state
└── types/                  # TypeScript type definitions
```

## License

This project is proprietary and confidential. All rights reserved.

© 2025 Quiet Notes
