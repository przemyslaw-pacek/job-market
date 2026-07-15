# Job Marketplace

Job Marketplace is a web application built with **SvelteKit** and **TypeScript** that connects job seekers with employers. It allows users to browse job offers, apply for positions, and manage applications, while HR users can create companies, manage branches, publish job offers, and review candidates.

## Features

### Authentication
- User registration and login
- Session stored in localStorage
- Logout functionality

### Companies
- Create and manage companies
- Add and remove company branches
- Branch-specific HR email addresses
- Company ownership management

### Job Offers
- Create job offers
- Assign offers to companies and branches
- Salary and job description support
- Only authorized company owners or HR users can publish offers

### Applications
- Apply for job offers
- Track application status
- View personal application history
- Multiple users can apply for the same job

### HR Panel
- Review applications for company job offers
- Update application status (Pending, Reviewed, Accepted, Rejected)
- View applicant information
- Company-specific HR management

## Technologies:

- SvelteKit
- TypeScript
- Svelte Stores
- LocalStorage
- CSS

## Purpose

This project was created as a learning project to explore modern frontend development with SvelteKit while implementing features commonly found in real-world recruitment platforms.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --install npm ./
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
