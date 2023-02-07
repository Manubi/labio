# Labio

This is the application's repository for Labio. For links to the application and smart contracts repo, check below.
<br />

![Architecture](./public/labio.png)

## Description

Labio offers researchers of institutions an alternative data storage, access and maintenance. With Labio's DataDao, important data can be storage perpetually by enabling storage to an open-sourced marketplace letting funders and storage providers decide what information is important to keep for the long run. Data is such that it is encrypted only for peer reviewers to see yet they can be stored by anyone preserving the data.

This is enabled by a storage marketplace where members belonging to institutions offer storage data for storage to Storage Providers.

This process first involves members to propose data for storage to their respective institution. Admins of those institutions can vote to accept a data proposal. Once a vote threshold is achieved by admins of their respective institutions, the data is posted on the root DaoManager Contract. Storage Providers can browse through approved data and become a provider storage provider for that data.

Once data is storaged on filecoin, storage providers may come back and validate by claiming a bounty on Labio DAO. The DAO keeps track of the storage providers deal term of the data and which institution such data came from. During reward claims, these providers may claim the reward for their bounty only for the time data has been stored by them. Funds are awarded to the storage provider from each institution to storage providers through Labio DAO. Anyone can fund each institution to keep important information forever.

<br />

## Direct Links

#### Application link: [https://labio.vercel.app/](https://labio.vercel.app/)

#### Smart Contracts Repository: [https://github.com/DuhCompuder/DataDao](https://github.com/DuhCompuder/DataDao)

<br />

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
