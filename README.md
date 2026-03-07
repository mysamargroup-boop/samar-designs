# 🎨 Sumegha Handmades

**Crafted With Love** — A premium e-commerce platform for unique handmade creations, from custom name plates to decorative hangings.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js) ![Sanity](https://img.shields.io/badge/Sanity_CMS-v3-red?logo=sanity) ![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-deployed-orange?logo=cloudflare)

## ✨ Features

- **Cinematic UI** — Glassmorphism header with scroll-based animations via Framer Motion
- **Sanity CMS** — Full content management for products, categories, blogs, and site settings
- **SEO Optimized** — Meta tags, structured data, semantic HTML, and clean slug-based URLs
- **Mobile First** — Responsive design with bottom navigation, horizontal sliders, and touch-optimized cart
- **Smart Product Pages** — Loading skeletons, image galleries, trust badges, WhatsApp sharing
- **Progressive Loading** — Pink gradient top-loading bar for seamless navigation

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Sanity v3 |
| UI Components | shadcn/ui (Radix) |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Hosting | Cloudflare Pages (OpenNext) |
| State | Zustand |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run pages:build
npm run pages:deploy
```

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:9002
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (site)/          # Public-facing pages
│   │   ├── collections/ # Category & product pages
│   │   ├── blog/        # Blog pages
│   │   └── ...
│   └── layout.tsx       # Root layout with TopLoader
├── components/          # Reusable UI components
├── lib/                 # Types, store, utilities
└── sanity/              # CMS schemas & queries
```

## 📝 Sanity Studio

Access the CMS at `/studio` to manage products, categories, blog posts, testimonials, and site settings.

---

Made with ❤️ by **Sumegha Handmades**
