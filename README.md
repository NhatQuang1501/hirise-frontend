# HiRise - Tech Job Platform Frontend

A modern job platform specifically designed for the tech industry, built with React, TypeScript, and Vite.

## 🚀 Features

- Job posting and management
- Company profiles and verification
- Advanced job search and filtering
- Real-time notifications
- Responsive design for all devices

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** TanStack Query
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Authentication:** JWT
- **Testing:** Vitest + Testing Library

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/NhatQuang1501/hirise-frontend.git
cd hirise-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run coverage` - Run tests with coverage report

### Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── services/         # API services
├── store/            # State management
├── types/            # TypeScript types
├── utils/            # Utility functions
├── styles/           # Global styles
└── lib/             # Third-party library configurations
```

## 🧪 Testing

We use Vitest and React Testing Library for testing. Run tests with:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Developed by [NhatQuang1501](https://github.com/NhatQuang1501)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
