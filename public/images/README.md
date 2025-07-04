# Image Assets for Kelly For The Win

## Folder Structure

- **`hero/`** - Main section hero images and banners
- **`screenshots/`** - Tutorial screenshots and step-by-step images
- **`icons/`** - Custom icons and logos (supplement to Lucide React icons)
- **`backgrounds/`** - Background textures and patterns

## Image Optimization Guidelines

### File Size Recommendations:
- **Hero Images**: 200-500KB max (large, prominent images)
- **Screenshots**: 100-300KB max (detailed tutorial images)
- **Icons/Logos**: 10-50KB max (small, simple graphics)
- **Background Images**: 100-200KB max (subtle textures)

### Format Guidelines:
- **JPEG**: Best for photographs and complex images with many colors
- **PNG**: Best for images with transparency or simple graphics
- **WebP**: Modern format with better compression (30% smaller than JPEG)
- **SVG**: Vector graphics for icons and simple illustrations

### Size Guidelines:
- **Hero Images**: 1920x1080px or 1200x600px
- **Screenshots**: 1200x800px max (can be smaller for mobile steps)
- **Icons**: 32x32px, 64x64px, 128x128px (provide multiple sizes)
- **Background Patterns**: 800x600px max (will be tiled/repeated)

## Usage in Next.js

```jsx
import Image from 'next/image'

// Optimized image component
<Image 
  src="/images/hero/main-banner.jpg"
  alt="Kelly For The Win - Learn to code"
  width={1200}
  height={600}
  priority // Use for above-the-fold images
/>
```

## Optimization Tools

Before uploading images, optimize them with:
- **TinyPNG/TinyJPG** - Online compression
- **ImageOptim** - macOS app
- **Squoosh** - Google's web-based tool

## Naming Convention

Use descriptive, kebab-case names:
- `hero-welcome-section.jpg`
- `tutorial-vscode-setup.png`
- `icon-github-logo.svg`
- `background-earthen-texture.jpg`
