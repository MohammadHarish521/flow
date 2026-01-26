# Sirius

**irk where colorful ideas find their home.**

Sirius is a beautiful, modern note-taking application designed to help you organize your thoughts, ideas, and tasks with style. Built with performance and user experience in mind, it features a clean, two-row header layout, vibrant category-based color coding, and seamless authentication.

![Sirius Banner](/public/banner-placeholder.png) 
*(Add a screenshot of your dashboard here)*

## ✨ Features

- **🎨 Beautiful UI/UX**: Premium design using *Instrument Serif* for typography and a carefully curated color palette.
- **🔐 Secure Authentication**: Powered by Supabase, supporting Email/Password and Google Sign-in.
- **📝 Complete Note Management**: Create, Read, Update, and Delete (CRUD) notes effortlessly.
- **🏷️ Smart Categorization**: Organize notes into categories like Work, Personal, Ideas, Projects, Travel, Finance, and Education.
- **🌈 Dynamic Theming**: The interface adapts to the selected category, changing colors for a more immersive experience.
- **⭐ Favorites**: Quickly access your most important notes by starring them.
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices.
- **🔍 Search & Filter**: Easily find what you're looking for (UI implementations).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Icons**: Custom SVGs & Heroicons
- **Notifications**: React Hot Toast

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Supabase account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MohammadHarish521/sirius.git
    cd sirius
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    *You can find these in your Supabase Dashboard under Settings > API.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```bash
sirius/
├── app/                # Next.js App Router pages
│   ├── globals.css     # Global styles & Tailwind config
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main dashboard
├── components/         # Reusable React components
│   ├── Header.tsx      # Top search & auth bar
│   ├── Sidebar.tsx     # Navigation & Categories
│   ├── NoteModal.tsx   # Create/Edit Note Modal
│   ├── NoteCard.tsx    # Individual note display
│   └── ...
├── lib/                # Utilities & Configuration
│   ├── supabase/       # Supabase client config
│   ├── notes.ts        # Note types & mapping logic
│   └── mock-data.ts    # Demo data for guest view
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
