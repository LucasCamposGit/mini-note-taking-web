# Mini Note-Taking App

A minimalist note-taking application designed for those tired of noise and overload. Post short notes, reply to yourself, and keep your thoughts organized with a clean, distraction-free interface.

## 🌟 Features

- **Minimalist Design**: Focus on content with a clean, distraction-free interface
- **Character-Limited Notes**: Write concise thoughts with character limits (280 in free plan, 560 in premium)
- **Nested Replies**: Organize thoughts by replying to your own notes
- **User Authentication**: Secure login with email or Google authentication
- **Premium Subscription**: $2/month subscription for extended character limits using Stripe
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for responsive design
- **Authentication**: Custom login system with Google OAuth integration
- **State Management**: React Context API with custom reducers
- **Payment Processing**: Stripe integration
- **Icons**: Font Awesome

## 📋 Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn package manager
- Stripe account for payment processing
- Google OAuth credentials for authentication

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://your-repository-url/note-taking-app.git
   cd note-taking-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Project Structure

```
note-taking-app/
├── src/
│   ├── app/                   # Next.js app router directory
│   │   ├── globals.css        # Global styles
│   │   ├── mini-notes/        # Notes feature pages and components
│   │   ├── payment/           # Subscription payment pages
│   │   └── signup/            # User registration pages
│   ├── context/               # React context providers
│   │   ├── LoginContext.tsx   # Authentication state management
│   │   └── NoteCardContext.tsx # Notes state management
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and libraries
│   ├── reducers/              # State reducers
│   └── types/                 # TypeScript type definitions
├── public/                    # Static files
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Project dependencies and scripts
```

## 💰 Subscription Plans

- **Free Plan**:
  - Up to 280 characters per note
  - Basic usage
  - Minimalist experience

- **Premium Plan** ($2/month):
  - Up to 560 characters per note
  - Support for the project
  - Enhanced note-taking experience

## 🔒 Authentication

The app supports two authentication methods:
- Email/password authentication
- Google OAuth integration

## 🧩 Core Components

- **MiniNotes**: Main component that displays all user notes
- **MiniNotesInput**: Component for creating new notes with character limit enforcement
- **MiniNotesCard**: Component for displaying individual notes and their replies

## 🛠️ Development

### Building for production

```bash
npm run build
# or
yarn build
```

### Running in production mode

```bash
npm run start
# or
yarn start
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Font Awesome](https://fontawesome.com/)
- [React OAuth Google](https://github.com/MomenSherif/react-oauth-google)
