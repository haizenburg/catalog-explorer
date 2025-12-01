# Catalog Explorer

A modern, accessible product catalog application built with React, TypeScript, and Vite. Browse products, filter by various criteria, manage favorites, and explore detailed product information with a responsive, user-friendly interface.

## Features

### Core Functionality
- **Product Catalog**: Browse a comprehensive list of products with images, prices, and ratings
- **Advanced Filtering**: Filter products by category, availability, tags, and sort options
- **Real-time Search**: Debounced search functionality for instant results
- **Favorites Management**: Add/remove products to favorites with persistent storage
- **Product Details**: View detailed information including specifications and descriptions
- **URL State Management**: Shareable URLs that preserve search and filter states

### User Experience
- **Responsive Design**: Mobile-first design that works across all screen sizes
- **Accessibility**: WCAG compliant with keyboard navigation, ARIA labels, and screen reader support
- **Performance Optimized**:
  - Code splitting with lazy-loaded routes
  - Image lazy loading with IntersectionObserver
  - Debounced search (300ms)
  - Memoized computations
- **Error Handling**: Graceful error boundaries and user-friendly error messages
- **Professional Icons**: React Icons library for consistent UI elements

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS3 (CSS-in-JS free)
- **Icons**: React Icons
- **State Management**: React Context API + Local Storage

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)

You can verify your installations by running:
```bash
node --version
npm --version
```

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd explorer-assessm
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required dependencies including:
- React & React DOM
- React Router
- TypeScript
- Vite
- React Icons
- ESLint & Prettier

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR)

### Build for Production
```bash
npm run build
```
Compiles TypeScript and builds the optimized production bundle to the `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment

### Type Checking
```bash
npm run type-check
```
Runs TypeScript compiler to check for type errors without emitting files

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style issues

## Project Structure

```
explorer-assessm/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration layer
│   │   └── productsApi.ts # Product fetching and filtering logic
│   ├── components/        # Reusable components
│   │   ├── ErrorBoundary.tsx
│   │   ├── FilterBar.tsx
│   │   └── LazyImage.tsx  # Performance-optimized image loading
│   ├── contexts/          # React Context providers
│   │   └── FavoritesContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── useFavorites.ts
│   ├── pages/             # Route components (lazy-loaded)
│   │   ├── CatalogPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   └── ProductDetailPage.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── product.ts
│   ├── App.tsx            # Main app component with routing
│   ├── App.css            # Global styles
│   ├── index.css          # CSS reset and base styles
│   └── main.tsx           # Application entry point
├── .gitignore
├── package.json
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md
```

## Environment Configuration

### Development
No environment variables are required for local development. The application uses a mock API with sample product data.

### Production
For production deployment, you may need to configure:

1. **API Base URL**: Update `src/api/productsApi.ts` to point to your production API
2. **Build Output**: Configure in `vite.config.ts` if needed
3. **Base Path**: Set `base` in `vite.config.ts` for subdirectory deployments

Example production configuration:
```typescript
// vite.config.ts
export default defineConfig({
  base: '/your-app-path/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

## Key Features Explained

### 1. Favorites Management
- Uses React Context API for global state
- Persists to localStorage for data retention across sessions
- Real-time updates across all components

### 2. URL State Management
- All filters and search queries are synced to URL parameters
- Enables shareable links that preserve exact catalog views
- Browser back/forward navigation works seamlessly

### 3. Performance Optimizations

**Code Splitting**
```typescript
// Routes are lazy-loaded to reduce initial bundle size
const CatalogPage = lazy(() => import('./pages/CatalogPage'))
```

**Image Lazy Loading**
```typescript
// Images load only when entering viewport
<LazyImage src={product.imageUrl} alt={product.name} />
```

**Search Debouncing**
```typescript
// API calls delayed by 300ms to reduce server load
const debouncedSearch = useDebounce(searchQuery, 300)
```

### 4. Accessibility Features
- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Focus management
- Screen reader announcements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The application uses modern JavaScript features and may not work in older browsers without polyfills.

## Performance Metrics

Production build output:
- **Bundle Size**: ~231 KB (74 KB gzipped)
- **CSS**: 9.88 KB (2.47 KB gzipped)
- **Code Splitting**: Separate chunks for each route
  - CatalogPage: 6.09 KB
  - ProductDetailPage: 2.15 KB
  - FavoritesPage: 1.83 KB

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
1. Update `vite.config.ts` with your repo name as `base`
2. Build: `npm run build`
3. Deploy the `dist/` folder

## Troubleshooting

### Common Issues

**Issue**: Application won't start
```bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Type errors during build
```bash
# Solution: Check TypeScript version and configuration
npm run type-check
```

**Issue**: Images not loading
- Verify image URLs are accessible
- Check browser console for CORS errors
- Ensure LazyImage component is properly imported

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for assessment purposes.

## Author

Tshepang

## Acknowledgments

- Product data structure inspired by real-world e-commerce platforms
- Icons provided by React Icons library
- Built with Vite for optimal developer experience
