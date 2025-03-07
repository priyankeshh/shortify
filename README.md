# ShortiFY - Modern URL Shortener

ShortiFY is a modern, fast, and user-friendly URL shortening service built with React, Express, and PostgreSQL. Create memorable short URLs and track their performance with built-in analytics.

![ShortiFY Screenshot](generated-icon.png)

## Features

- 🔗 Instant URL shortening
- 📊 Real-time click tracking and analytics
- 🎯 Custom alias support
- 📱 Responsive modern UI
- 🚀 Fast and reliable redirects
- 📋 One-click copy to clipboard
- ⚡ Built with modern tech stack

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadcn/UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Type Safety**: TypeScript
- **Validation**: Zod
- **State Management**: TanStack Query

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/priyankeshh/shortify.git
   cd shortify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL:
   - Install PostgreSQL on your machine
   - Create a new database:
     ```bash
     psql -U postgres
     CREATE DATABASE urlalchemy;
     ```

4. Create a `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/urlalchemy"
   ```

5. Push the database schema:
   ```bash
   npm run db:push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5000`

## Deployment to Render

### 1. Database Setup

1. Create a new PostgreSQL database on Render:
   - Go to Render Dashboard → "New +" → "PostgreSQL"
   - Choose a name (e.g., "shortify-db")
   - Select your region
   - Click "Create Database"
   - Copy the "External Database URL"

### 2. Web Service Setup

1. Push your code to GitHub

2. Create a new Web Service on Render:
   - Go to Render Dashboard → "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose a name (e.g., "shortify")
   - The following settings will be automatically configured from `render.yaml`:
     - Environment: Node
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

3. Configure environment variables:
   - `DATABASE_URL`: Paste the External Database URL from step 1
   - `NODE_ENV`: This is automatically set to "production"
   - `PORT`: This is automatically set to "10000"

4. Click "Create Web Service"

Your app will be available at `https://shortify.onrender.com` (or your custom domain)

## Usage

1. Enter a long URL in the input field
2. (Optional) Add a custom alias
3. Click "Shorten URL"
4. Copy and share your shortened URL
5. Track clicks and analytics in the Analytics page

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Shadcn/UI](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Powered by [React](https://reactjs.org/) and [Express](https://expressjs.com/)
