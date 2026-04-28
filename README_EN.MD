# QA App
[中文](./README.MD) | [English](./README_EN.MD)

A Taro (React) H5 app with curated interview questions across multiple tech stacks (JavaScript, React, TypeScript, HTML, CSS, Java, Go, Vue, Angular).

This project follows SDD (Spec Driven Development) and is implemented with AI assistance. See the detailed specs in [`specs`](./specs).

## Getting Started

- Prerequisites
  - Node.js 18+ recommended
  - npm 9+

- Install dependencies
  - `npm install`

- Start H5 dev server
  - `npm run dev:h5`
  - Open the URL printed in the console (default: `http://localhost:10086`)

- Build (optional)
  - `npm run build:h5`

## UI

Below are screenshots of the main flows. Images are stored under `imgs/`.

- Stack selection page

  <img src="./imgs/1.png" alt="Stack Selection" width="200" />

- Questions session page (question view)

  <img src="./imgs/3.png" alt="Question View" width="200" />

- Questions session page (answer revealed)

  <img src="./imgs/2.png" alt="Answer Revealed" width="200" />

## Notes

- Select a stack on the landing page to start a session of 10 randomized questions.
- New stacks and questions live under `src/data/*.json` and are wired via `src/utils/questionManager.ts` and `src/utils/constants.ts`.

## Deploy

Taro supports multiple platforms. Use the following commands for deployment:

- WeChat Mini Program
  - Build: `npm run build:weapp`
  - Upload via WeChat DevTools

- H5 (Web)
  - Build: `npm run build:h5`
  - Deploy the `dist` folder to any static hosting (Vercel, Netlify, Nginx, etc.)

- Alipay Mini Program
  - Build: `npm run build:alipay`
  - Upload via Alipay DevTools

- ByteDance Mini Program
  - Build: `npm run build:tt`
  - Upload via ByteDance DevTools

- Baidu Smart Program
  - Build: `npm run build:swan`
  - Upload via Baidu DevTools

Tips:
- Always test locally with `dev:*` commands before building for production
- Check platform-specific API compatibility before deploying
- Use environment variables (`.env.production`) for production builds
- The `dist/` folder contains the built output for the selected platform

## License

This project is licensed under the MIT License.
