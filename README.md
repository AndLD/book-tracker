# TS Node React Mongo Boilerplate

This is a full-stack boilerplate project using TypeScript, Node.js, React, and MongoDB. It includes a client-side application, a server-side rendered application, and an API.

## Structure

- `api`: The Node.js backend API.
- `client`: The React client-side application.
- `ssr`: The Next.js server-side rendered application.
- `lib`: Shared libraries and utilities.

## Installation

To create a new project using this boilerplate, run the following command:

```bash
npx i -g ts-node-react-mongo-boilerplate
npx ts-node-react-mongo-boilerplate your-project-name
```

## Development

To run the applications in development mode, navigate to the respective directories (first in project root, `api`, `client`, `ssr`) and run:

```bash
npm i
npm run dev
```

## Production

The `vps-setup.sh` script provides instructions for setting up a VPS for production. It includes steps for installing dependencies, configuring Nginx, and setting up SSL with Certbot. The `ecosystem.config.json` file is used by PM2 to manage the applications in a production environment.
