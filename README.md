# Pickup Line Generator

<div align="center">
<img src="/public/logo.svg" alt="Logo" width="80" height="80">

<h3 align="center">Pickup Line Generator</h3>

<p align="center">
Generate creative pickup lines based on your crush's description and preferred style!
<br/>
<br/>
<a href="https://github.com/NemesisLW/pickup-line-generator"><strong>Explore the docs »</strong></a>
<br/>
<br/>
<a href="https://pickup-line-generator.vercel.app">View Demo</a> ·
<a href="https://github.com/NemesisLW/pickup-line-generator/issues">Report Bug</a> ·
<a href="https://github.com/NemesisLW/pickup-line-generator/issues">Request Feature</a>
</p>
</div>

## About The Project

![Product Screenshot](/public/screenshot.png)

Pickup Line Generator is a fun and creative web application that helps you craft the perfect pickup line for your crush. Simply input a description of your crush and choose a style, and our AI-powered generator will create two unique pickup lines tailored to your preferences.

Key features:

- User-friendly interface for inputting crush descriptions and selecting styles
- AI-powered generation of pickup lines using OpenAI API (or Mistral from Replicate)
- Responsive design for seamless use on desktop and mobile devices
- Secure authentication with Supabase and OAuth (Google)

## Built With

This project is built using modern web technologies and frameworks:

- Next.js [App Router](https://nextjs.org/docs/app) for framework
- [TypeScript](https://www.typescriptlang.org/) for type checking, safety, and code organization
- [Tailwind CSS](https://tailwindcss.com/) for styling and responsive design
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.io/) for authentication services
- [Anyscale](https://anyscale.com/) Inference for Mixtral (LLM)
- [OpenAI SDK](https://openai.com/) for API calls
- [Vercel](https://vercel.com/) (for deployment)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NemesisLW/pickup-line-generator.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up environment variables

   ```sh
   cp .env.example .env.local
   ```

   Then, fill in the necessary API keys and configuration in the `.env.local` file.

4. Run the development server
   ```sh
   npm run dev
   ```

## Usage

1. Open the application in your web browser
2. Sign in using your Google account
3. Enter a description of your crush in the provided text area
4. Eter the preferred style for your pickup lines in the input field
5. Click the "Generate" button
6. View and enjoy your two custom-generated pickup lines!

## Roadmap

- [ ] Implement user profiles and saved pickup lines
- [ ] Add social sharing features
- [ ] Expand language support for international users

See the [open issues](https://github.com/NemesisLW/pickup-line-generator/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Arghya Dutta - [@Arghyad18](https://twitter.com/Arghyad18) - arghyadutta119@gmail.com

Project Link: [https://github.com/NemesisLW/pickup-line-generator](https://github.com/NemesisLW/pickup-line-generator)

## Acknowledgments

- [1811 Labs](https://bento.me/1811labs) for the assignment
- [Vercel](https://vercel.com/) for hosting and deployment
- [Supabase](https://supabase.io/) for authentication services
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
