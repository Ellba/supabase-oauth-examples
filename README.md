# Supabase OAuth Login Demo

A simple React application demonstrating Supabase OAuth login with various providers.

User info is displayed after login (.auth.getUser() response).

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Supabase Configuration

To enable OAuth providers, you need to:

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Sign In / Providers
3. Enable and configure the providers you want to use
4. Add callback URLs for your application

## Adding New Provider Icons

To add new provider icons:

1. Create SVG icons for your providers in `src/assets/icons/`
2. The icons should be named after the provider ID (e.g., `github.svg`, `google.svg`)
3. Add the provider to the `authProviders` array in `src/data/authProviders.ts`

## License

MIT
