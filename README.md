# 思算｜ Thinking as Algorithm

A modern Hugo static site with Tailwind CSS for clean, responsive design.

## 🚀 Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.100+)
- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ftvision.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   npm run css:build
   ```

## 🛠️ Development

### Start the development server

```bash
# Option 1: Use npm script (recommended for development)
npm run dev
# This starts both Tailwind CSS watching and Hugo server

# Option 2: Manual approach
# Terminal 1: Watch CSS changes
npm run css:watch

# Terminal 2: Start Hugo server
hugo serve --buildDrafts
```

### Available Commands

| Command                                | Description                                |
| -------------------------------------- | ------------------------------------------ |
| `npm run dev`                          | Start development server with CSS watching |
| `npm run build`                        | Build for production                       |
| `npm run css:build`                    | Build Tailwind CSS (one-time)              |
| `npm run css:watch`                    | Watch Tailwind CSS changes                 |
| `npm run serve`                        | Start Hugo server only                     |
| `hugo serve --buildDrafts`             | Start Hugo with draft posts                |
| `hugo serve --buildDrafts --port 1314` | Start on custom port                       |

## 📁 Project Structure

```
├── content/                 # Markdown content files
│   ├── blog/               # Blog posts
│   ├── digest/             # Digest entries
│   ├── collection/         # Collections
│   └── about/              # About pages
├── themes/ft_personal/     # Custom Hugo theme
│   ├── layouts/            # HTML templates
│   ├── static/             # Static assets
│   └── assets/css/         # Tailwind CSS source
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Node.js dependencies
└── config.yml              # Hugo configuration
```

## 🎨 Styling with Tailwind CSS

### Customizing Styles

1. Edit `themes/ft_personal/assets/css/input.css` for custom styles
2. Modify `tailwind.config.js` for theme configuration
3. Run `npm run css:build` to compile changes

### Adding Custom Components

Add new component classes in the `@layer components` section of `input.css`:

```css
@layer components {
  .my-custom-component {
    @apply bg-blue-500 text-white p-4 rounded-lg;
  }
}
```

## 🌍 Multi-language Support

The site supports both Chinese (zh) and English (en):

- Default language: Chinese
- English pages: Add `.en.md` suffix
- Access via language switcher in navigation

## 📝 Content Management

### Creating New Posts

1. **Blog post**

   ```bash
   hugo new blog/my-new-post.md
   ```

2. **Digest entry**
   ```bash
   hugo new digest/digest-XXX.md
   ```

### Draft Posts

- Add `draft: true` to front matter for draft posts
- View drafts with `--buildDrafts` flag
- Remove `draft: true` to publish

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This will:

1. Build and minify Tailwind CSS
2. Generate optimized Hugo site in `docs/` directory

### GitHub Pages

The site is configured to publish from the `docs/` directory. After building, commit and push to deploy.

## 🔧 Configuration

### Hugo Configuration (`config.yml`)

- Site title, description, and metadata
- Navigation menus
- Multi-language settings
- Theme configuration

### Tailwind Configuration (`tailwind.config.js`)

- Custom colors and fonts
- Typography plugin settings
- Content paths for purging unused CSS

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   hugo serve --buildDrafts --port 1314
   ```

2. **CSS not updating**

   ```bash
   npm run css:build
   ```

3. **Missing dependencies**

   ```bash
   npm install
   ```

4. **Hugo version compatibility**
   - Ensure Hugo v0.100+ is installed
   - Check with `hugo version`

### Development Tips

- Use `npm run dev` for the best development experience
- CSS changes are automatically rebuilt and live-reloaded
- Hugo templates support hot reloading
- Check browser console for any JavaScript errors

## 📚 Additional Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Theme Customization Guide](https://gohugo.io/themes/customizing/)

---

Built with ❤️ using [Hugo](https://gohugo.io/) and [Tailwind CSS](https://tailwindcss.com/)"
