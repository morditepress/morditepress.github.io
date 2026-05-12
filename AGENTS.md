# AI Agent Guide for Astro Modular Theme

This document contains essential information for AI agents working with this Astro-based blog theme. It combines development practices, folder-based content organization, technical implementation details, and the project's vision for seamless Obsidian-to-web publishing.

## 🚨 CRITICAL: Primary Information Sources

**⚠️ AI AGENTS MUST READ THIS SECTION FIRST ⚠️**

**The most up-to-date and accurate information is found in these blog posts:**

1. **[Getting Started Guide](src/content/posts/getting-started.md)** - Complete setup, configuration, and workflow information
2. **[Astro Suite Vault Guide](src/content/posts/obsidian-vault-guide.md)** - Obsidian vault configuration and usage

**These blog posts should be treated as the authoritative source of truth.** Use the information in this AGENTS.md file as supplementary technical documentation, but always reference the blog posts for the most current and accurate user-facing information.

**When in doubt, check the blog posts first.**

## 🚨 CRITICAL: Most Common AI Agent Mistakes

**⚠️ READ THESE FIRST - These are the #1 issues that keep coming up:**

1. **🚨 NEVER EDIT MARKDOWN CONTENT** - NEVER edit markdown files in `src/content/` without explicit user permission
2. **🚨 USE `id` NOT `slug`** - `slug` is deprecated in Astro v6. ALWAYS use `entry.id` instead. [See detailed solution](#-critical-use-id-not-slug)
3. **🚨 SWUP BREAKS JAVASCRIPT** - Interactive elements stop working after page transitions. [See detailed solution](#-critical-javascript-re-initialization-after-page-transitions)
4. **🚨 MATH RENDERING DUPLICATION** - Math appears twice due to wrong CSS. [See solution](#1--math-rendering-duplication-most-critical)
5. **🚨 PRODUCTION LOGGING** - Never use raw `console.log()` in production code
6. **🚨 IMAGE SYSTEM CONFUSION** - Post cards vs post content images are separate systems
7. **🚨 URL MAPPING SYSTEM CONFUSION** - URL mapping is for rendering only, doesn't affect linked mentions/graph view
8. **🚨 FOLDER-BASED CONTENT ASSUMPTIONS** - ALL content types support folder-based organization, not just posts
9. **🚨 FOLDER-BASED POST ID DETECTION** - Astro v6 folder-based posts have IDs like 'folder-name', NOT 'folder-name/index'
10. **🚨 PLUGIN ORDER AND EMBED HANDLING** - Plugins execute sequentially - changes affect subsequent plugins. [See detailed solution](#12--plugin-order-and-embed-handling-critical)
11. **🚨 NEVER DISABLE ASTRO DEV TOOLBAR** - The dev toolbar must remain enabled (`devToolbar.enabled: true`) - do NOT disable it to resolve module loading errors

**These issues are documented in detail in the [Common AI Agent Mistakes](#common-ai-agent-mistakes) section.**

## 🚨 CRITICAL: Use `id` Not `slug` (Astro v6)

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**The `slug` property is DEPRECATED in Astro v6 and MUST NOT be used.**

### **The Breaking Change**

According to the [Astro v6 Upgrade Guide](https://deploy-preview-12322--astro-docs-2.netlify.app/en/guides/upgrade-to/v6/#upgrade-astro), the `slug` property on collection entries has been removed in favor of `id`:

- **Old (WRONG)**: `post.slug` - This is deprecated and will cause "undefined" URLs
- **New (CORRECT)**: `post.id` - This is the modern API and always works correctly

### **Why This Matters**

Previously, Astro used:
- `id` - Based on the filename (e.g., `getting-started/index.md` → `"getting-started/index"`)
- `slug` - A URL-friendly version (e.g., `"getting-started"`)

Now in Astro v5/v6:
- `id` - IS the slug (e.g., `"getting-started"`)
- `slug` - REMOVED/DEPRECATED (causes undefined values)

### **Common Mistakes**

**❌ WRONG - Using `slug`:**
```typescript
// DON'T DO THIS - slug is deprecated
const posts = await getCollection('posts');
posts.map(post => ({
  url: `/posts/${post.slug}`,  // ❌ Will be undefined!
  id: post.slug                 // ❌ Will be undefined!
}));
```

**✅ CORRECT - Using `id`:**
```typescript
// DO THIS - id is the modern API
const posts = await getCollection('posts');
posts.map(post => ({
  url: `/posts/${post.id}`,    // ✅ Works correctly
  id: post.id                   // ✅ Works correctly
}));
```

### **Where to Check**

Search your codebase for these patterns and replace `slug` with `id`:
- API endpoints: `src/pages/api/*.json.ts`
- Dynamic routes: `src/pages/[...slug].astro`
- Component props: Any component receiving collection entries
- URL generation: Anywhere constructing URLs from collection entries

### **Files Already Fixed**

These files have been updated to use `id` instead of `slug`:
- ✅ `src/pages/api/posts.json.ts`
- ✅ `src/pages/api/pages.json.ts`
- ✅ `src/pages/api/projects.json.ts`
- ✅ `src/pages/api/docs.json.ts`

**This is CRITICAL for command palette search, navigation, and all URL generation.**

## 🚨 CRITICAL: Astro v6 Compatibility Status

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**This theme is FULLY PREPARED for Astro v6 compatibility.** All legacy v4 patterns have been removed and the theme uses modern v5/v6 APIs.

### **Current Status (January 2025)**
- **Astro Version**: 5.15.1 (current stable)
- **v6 Readiness**: ✅ **Fully prepared** - no breaking changes expected
- **Content Collections**: ✅ Using modern v5/v6 API
- **Config Location**: ✅ `src/content.config.ts` (v6 requirement)
- **Legacy Patterns**: ✅ All removed
- **Using `id` not `slug`**: ✅ All files updated

### **What Was Fixed for v6 Compatibility**
1. **Config File Location**: Moved from `src/content/config.ts` to `src/content.config.ts`
2. **Collection Definitions**: Removed `type: 'content'` from all collections
3. **ViewTransitions Import**: Removed unused import (v6 breaking change)
4. **Image Field Safety**: Added type checking for `null` image fields
5. **Legacy API Usage**: Verified no deprecated APIs are used
6. **Slug to ID Migration**: All references to `entry.slug` replaced with `entry.id`

### **Verified Clean (No Issues Found)**
- ✅ No experimental flags in use
- ✅ No legacy collection patterns
- ✅ No deprecated APIs (`Astro.glob`, `emitESMImage`, etc.)
- ✅ No `handleForms` prop on ClientRouter
- ✅ No legacy collection methods
- ✅ All integrations v6 compatible
- ✅ Using `id` instead of deprecated `slug`

### **When Astro v6 Releases**
- **No action required** - theme will work immediately
- **No breaking changes** expected
- **All features** will continue to work
- **Build process** will remain unchanged

**This theme is future-proof and ready for Astro v6.**

## Table of Contents

1. [Project Vision & Philosophy](#project-vision--philosophy)
2. [Development Environment](#development-environment)
3. [Content Organization](#content-organization)
4. [Obsidian Integration](#obsidian-integration)
5. [Image Handling](#image-handling)
6. [Mathematical Notation Support](#mathematical-notation-support)
7. [Mermaid Diagram Support](#mermaid-diagram-support)
8. [Interactive Force-Graph Implementation](#interactive-force-graph-implementation)
9. [Command Palette Theme Switcher](#command-palette-theme-switcher)
10. [Build Process](#build-process)
   - [RSS and Atom Feeds](#rss-and-atom-feeds)
11. [Version Management](#version-management)
12. [Configuration & Customization](#configuration--customization)
   - [Typography Configuration](#typography-configuration)
13. [Troubleshooting](#troubleshooting)
14. [Best Practices](#best-practices)
15. [Common AI Agent Mistakes](#common-ai-agent-mistakes)

## Project Vision & Philosophy

### Core Mission
Astro Modular is an Astro blog theme template designed for **Obsidian users**, created by [David V. Kimball](https://davidvkimball.com). This theme turns Obsidian into a powerful CMS for instant blog publishing, bridging the gap between your Obsidian vault and a production-ready blog.

The theme is built on four core principles:

#### **Clarity First**
Content should be the star, not the design. Every element is carefully crafted to enhance readability and focus attention on what matters most - your ideas and writing.

#### **Highly Performant**
Fast loading times and smooth interactions are not optional. Every aspect of this theme has been optimized to deliver exceptional performance across all devices.

#### **Works with Obsidian**
If you use Obsidian, this theme is a natural extension of your workflow. All rich markdown and extended markdown features, including Wikilinks, callouts, and other embedded features, display seamlessly between your vault and published site.

#### **Modular Design**
Every feature can be toggled on or off through a single configuration file. Enable only what you need, keeping your site fast and focused on your specific use case.

### Key Design Principles

#### 1. **Built for Obsidian Users**
- **Direct Obsidian integration** - Write in a dedicated vault, publish to your blog
- **Wikilinks support** - `[[Internal Links]]` and `[[Link|Custom Text]]` work seamlessly
- **Obsidian callouts** - Full support for `> [!note]`, `> [!tip]`, `> [!warning]` and more
- **Tag compatibility** - Your Obsidian tags become blog tags automatically
- **Frontmatter sync** - Compatible metadata structure between Obsidian and Astro
- **Folder-based organization** - Keep content and assets together in dedicated folders
- **Obsidian bracket syntax** - Support for `[[image.jpg]]` syntax in image references
- **[Astro Suite Obsidian Vault](https://github.com/davidvkimball/obsidian-astro-suite) built-in** - Includes Obsidian vault configuration for streamlined publishing

#### 2. **Flexible & Customizable**
- **Modular design** - Each feature can be enabled/disabled independently
- **Multiple color options** - Select from a variety of prebuilt themes (Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, and Things)
- **Custom typography** - Separate font configuration for headings and body text with 20+ supported fonts
- **TypeScript throughout** for type safety and better development experience
- **Command palette** - Press `Ctrl+K` (or custom hotkey) for instant navigation and search
- **Responsive image grids** - Automatic layouts for multiple consecutive images
- **Dark/light themes** - System preference detection with manual toggle
- **SEO ready** - Automatic sitemaps, RSS feeds, and Open Graph images

#### 3. **Content Management Excellence**
- **Markdown-first** with enhanced processing and reading time estimation
- **Folder-based posts** - Organize content and assets in dedicated folders
- **Draft support** - Show drafts in development, hide in preview and production (works for posts, pages, projects, and docs)
- **Image optimization** with WebP format priority and responsive layouts
- **Table of contents** auto-generation from headings

#### 4. **Navigation & Discovery**
- **Fuzzy search** through all content via command palette
- **Linked mentions** - See which posts reference each other
- **Tag filtering** and next/previous navigation between posts

### Target Audience
- **Obsidian power users** who want to publish their notes
- **Content creators** who prefer markdown-first workflows
- **Developers** who want a customizable, performant blog
- **Writers** who value seamless editing and publishing experience

## Development Environment

### Package Management
- **Package Manager**: This project uses `pnpm` instead of `npm` for all package and script commands
- **Scripts**: All commands should use `pnpm run <script-name>`

### Development Server
- **Command**: `pnpm run dev`
- **Port**: 5000 (with fallback to 5001 if occupied)
- **Host**: localhost
- **Hot Reload**: Enabled with file watching

### 🚨 CRITICAL: Vite File System Security

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**NEVER disable `vite.server.fs.strict`** in the Astro configuration. This is a **CRITICAL security requirement**.

#### **Why This Matters**
- **Security**: `fs.strict: false` allows access to files outside the project directory
- **Network Exposure**: Files on your machine become accessible on your network
- **Best Practice**: Vite's strict mode is the default for good security reasons
- **Professional Standards**: Production sites should maintain proper file system boundaries

#### **What NOT to Do**
```javascript
// ❌ WRONG - Never disable Vite strict mode
vite: {
  server: {
    fs: {
      strict: false,  // NEVER DO THIS
      allow: ['..']   // NEVER DO THIS
    }
  }
}
```

#### **What to Do Instead**
- **Keep Vite strict mode enabled** (default behavior)
- **Use proper file paths** within the project directory
- **Handle file system errors gracefully** without compromising security
- **Use environment variables** for development-specific configurations

**This is CRITICAL for maintaining security and professional development standards.**

### 🚨 CRITICAL: Production Logging Guidelines

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**NEVER use raw `console.log()` statements in production code.** This project maintains clean console output for professional deployments.

#### **Why This Matters**
- **Production Performance**: Console logs slow down production sites
- **User Experience**: Console spam degrades user experience
- **Professional Standards**: Production sites should have clean console output

#### **Simple Rule**
- **Development**: Console logs are acceptable for debugging
- **Production**: No console output should appear in the final build
- **Use the project's logger utility** (`src/utils/logger.ts`) for any logging needs

### 🎨 CRITICAL: Color Usage Guidelines

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

This project uses a **dynamic theming system** where colors are defined in theme variables, not hardcoded values. This is **CRITICAL** for maintaining theme consistency and allowing users to switch between different color schemes.

#### **Why This Matters**
- **Theme Consistency**: All colors should work across all 17+ available themes
- **User Experience**: Users can switch themes and colors should adapt automatically
- **Maintainability**: Color changes only need to be made in one place (theme definitions)
- **Professional Standards**: Hardcoded colors break the theming system

#### **How to Use Theme Colors**

**✅ CORRECT - Use theme variables from Tailwind config**
```typescript
// Use Tailwind classes that reference theme variables
@apply bg-primary-50 dark:bg-primary-800
@apply text-primary-900 dark:text-primary-100
@apply border-primary-200 dark:border-primary-600
@apply text-highlight-600 dark:text-highlight-400
```

**❌ WRONG - Never use hardcoded color values**
```typescript
// BAD - Hardcoded colors break theming
background: white;
color: #1f2937;
border: 1px solid #e5e7eb;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

#### **Available Theme Color Variables**

**Primary Colors** (defined in `src/themes/index.ts`):
- `primary-50` through `primary-950` - Main theme colors
- `primary-100` - Light backgrounds, subtle elements
- `primary-200` - Borders, dividers, table headers
- `primary-300` - Muted text, secondary elements
- `primary-400` - Medium emphasis text
- `primary-500` - Default text color
- `primary-600` - High emphasis text
- `primary-700` - Dark backgrounds, strong elements
- `primary-800` - Darker backgrounds, headers
- `primary-900` - Darkest backgrounds, high contrast text

**Highlight Colors** (accent colors):
- `highlight-50` through `highlight-950` - Accent colors
- `highlight-400` - Links, interactive elements (light mode)
- `highlight-600` - Links, interactive elements (dark mode)
- `highlight-500` - Default highlight color

#### **Theme Color Usage Patterns**

**Backgrounds:**
```typescript
// Light backgrounds
@apply bg-primary-50 dark:bg-primary-800
@apply bg-primary-100 dark:bg-primary-700

// Dark backgrounds
@apply bg-primary-900 dark:bg-primary-50
@apply bg-primary-800 dark:bg-primary-100
```

**Text Colors:**
```typescript
// High contrast text
@apply text-primary-900 dark:text-primary-50
@apply text-primary-800 dark:text-primary-100

// Medium emphasis text
@apply text-primary-600 dark:text-primary-300
@apply text-primary-500 dark:text-primary-400

// Muted text
@apply text-primary-400 dark:text-primary-500
```

**Borders and Dividers:**
```typescript
// Subtle borders
@apply border-primary-200 dark:border-primary-600
@apply border-primary-300 dark:border-primary-500

// Strong borders
@apply border-primary-400 dark:border-primary-400
```

**Interactive Elements:**
```typescript
// Links and buttons
@apply text-highlight-600 dark:text-highlight-400
@apply hover:text-highlight-700 dark:hover:text-highlight-300

// Focus states
@apply focus:ring-highlight-500 dark:focus:ring-highlight-400
```

#### **Where to Find Theme Definitions**

1. **Main Theme Config**: `src/themes/index.ts` - Contains all theme definitions
2. **Tailwind Config**: `tailwind.config.mjs` - Maps theme variables to Tailwind classes
3. **Current Theme**: `src/config.ts` - Shows which theme is currently active

#### **Action Required for AI Agents**

1. **ALWAYS** use Tailwind classes that reference theme variables
2. **NEVER** use hardcoded color values like `#ffffff`, `rgb(255, 255, 255)`, or `white`
3. **CHECK** existing code for hardcoded colors and replace them
4. **USE** the dark mode variants (`dark:`) for all color definitions
5. **REFERENCE** the theme files to understand available color scales

#### **Example Conversion**

```typescript
// Before (BAD - hardcoded colors)
.table-wrapper {
  background: white;
  border: 1px solid #e5e7eb;
  color: #1f2937;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.dark .table-wrapper {
  background: #1e293b;
  border-color: #475569;
  color: #f1f5f9;
}

// After (GOOD - theme variables)
.table-wrapper {
  @apply bg-white dark:bg-primary-800;
  @apply border border-primary-200 dark:border-primary-600;
  @apply text-primary-900 dark:text-primary-100;
  @apply shadow-sm;
}
```

**This is CRITICAL for maintaining the theming system and user experience across all themes.**

### Key Scripts
```bash
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run check-images     # Check for missing images
pnpm run sync-images      # Sync images from content to public
pnpm run process-aliases  # Process content aliases
pnpm run generate-deployment-config # Generate deployment configs
```


## Content Organization

### Folder-Based Posts Structure

The theme supports both traditional single-file posts and folder-based posts for better asset organization.

#### Traditional Posts
```
src/content/posts/
├── traditional-post.md
└── another-post.md
```

#### Folder-Based Posts
```
src/content/posts/
├── traditional-post.md
├── folder-based-post/
│   ├── index.md          # Main content file
│   ├── hero-image.jpg    # Assets co-located
│   ├── attachments/      # Optional: Obsidian subfolder setting
│   │   ├── cover.png
│   │   └── diagram.svg
│   ├── gallery-1.jpg
│   ├── diagram.png
│   └── document.pdf
└── another-folder-post/
    ├── index.md
    └── cover.jpg
```

### URL Generation
- **Folder name becomes the slug**: `folder-based-post` → `/posts/folder-based-post/`
- **index.md contains the content**: Main content goes in the `index.md` file
- **Assets are co-located**: All related files stay in the same folder

### Folder-Based Content Support

**All content types support folder-based organization:**

#### **Posts** (`src/content/posts/`)
- **Folder-based**: `folder-based-post/index.md` → `/posts/folder-based-post/`
- **Single-file**: `traditional-post.md` → `/posts/traditional-post/`

#### **Pages** (`src/content/pages/`)
- **Folder-based**: `folder-based-page/index.md` → `/folder-based-page/`
- **Single-file**: `about.md` → `/about/`

#### **Projects** (`src/content/projects/`)
- **Folder-based**: `project-name/index.md` → `/projects/project-name/`
- **Single-file**: `project.md` → `/projects/project/`

#### **Documentation** (`src/content/docs/`)
- **Folder-based**: `guide-name/index.md` → `/docs/guide-name/`
- **Single-file**: `guide.md` → `/docs/guide/`

**Key Benefits:**
- **Asset Co-location**: Images, PDFs, and other files stay with content
- **Obsidian Compatibility**: Works seamlessly with Obsidian's folder-based organization
- **Clean URLs**: Folder name becomes the URL slug automatically
- **Flexible Organization**: Mix single-file and folder-based content as needed

**Technical Implementation:**
- **Astro Content Collections**: Automatically handles folder-based content
- **Asset Syncing**: `scripts/sync-images.js` copies assets to public directory
- **URL Generation**: Folder name becomes slug, `index.md` provides content
- **Image Processing**: Co-located images work with both `[[image.jpg]]` and `![image](image.jpg)` syntax

### Obsidian Subfolder Support
The theme supports Obsidian's "subfolder" setting where attachments are stored in an `attachments/` subfolder within folder-based content:

```
src/content/posts/my-post/
├── index.md
├── attachments/      # Obsidian subfolder setting
│   ├── cover.png
│   └── diagram.svg
└── other-file.jpg    # Co-located assets still work
```

**How it works:**
- Images in `attachments/` subfolders are automatically processed
- They're copied to the public directory without the `attachments/` prefix
- Both `attachments/image.png` and `image.png` references work seamlessly
- This prevents breaking when users switch between Obsidian's subfolder settings

### Content Types

The theme supports multiple content types for different purposes:

#### Posts (`src/content/posts/`)
- **Purpose**: Blog posts and articles
- **URL Structure**: `/posts/post-slug`
- **Features**: Tags, reading time, linked mentions, comments
- **Organization**: Single files or folder-based with co-located assets

#### Pages (`src/content/pages/`)
- **Purpose**: Static pages (About, Contact, etc.)
- **URL Structure**: `/page-slug`
- **Features**: Simple content without blog-specific features
- **Organization**: Single files or folder-based with co-located assets

#### Projects (`src/content/projects/`)
- **Purpose**: Portfolio items, side projects, work showcases
- **URL Structure**: `/projects/project-slug`
- **Features**: Categories, status, repository/demo links, featured flag
- **Organization**: Single files or folder-based with co-located assets
- **Frontmatter**: `title`, `description`, `date`, `categories`, `repositoryUrl`, `demoUrl`, `status`, `image`, `imageAlt`, `hideCoverImage`, `draft`, `noIndex`, `featured`

#### Documentation (`src/content/docs/`)
- **Purpose**: Technical documentation, guides, API references
- **URL Structure**: `/docs/doc-slug`
- **Features**: Categories, version control, table of contents, featured flag
- **Organization**: Single files or folder-based with co-located assets
- **Frontmatter**: `title`, `description`, `category`, `order`, `lastModified`, `version`, `image`, `imageAlt`, `hideCoverImage`, `hideTOC`, `draft`, `noIndex`, `showTOC`, `featured`

### Category Logic

The theme includes intelligent category handling that adapts based on your content:

#### Projects Categories
- **If NO projects have categories**: Hide the entire category system
  - Remove category display from project cards
  - Remove category display from individual project pages
  - Remove the category filtering block from the projects index page
- **If SOME projects have categories**: Show categories normally

#### Documentation Categories
- **If NO docs have categories**: Remove category system entirely
  - Remove category headings and TOC-like structure on the docs index page
  - Just list docs by their `order` number
- **If SOME docs have categories**:
  - Docs with categories go to their assigned category
  - Docs without categories go to a new "Unsorted" category
  - Keep the category structure

#### Individual Documentation TOC Control
- **`hideTOC` field**: Each doc can hide its table of contents with `hideTOC: true` in frontmatter
- **Separate from global setting**: This is independent of the global posts TOC setting
- **Default behavior**: TOC shows unless explicitly hidden

### Content Schema

#### Posts Collection
```typescript
{
  title: string;
  description: string;
  date: Date;
  tags?: string[];
  draft?: boolean;
  image?: string;
  imageOG?: boolean;
  imageAlt?: string;
  hideCoverImage?: boolean;
  targetKeyword?: string;
  // Note: author is global via siteConfig.author, not per-post
  // Note: noIndex is available but typically used for pages only
}
```

#### Pages Collection
```typescript
{
  title: string;
  description: string;
  draft?: boolean;
  lastModified?: Date;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  noIndex?: boolean;  // Commonly used for pages
}
```

#### Projects Collection
```typescript
{
  title: string;
  description: string;
  date: Date;
  categories?: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  status?: 'in-progress' | 'released';
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  draft?: boolean;
  noIndex?: boolean;
  featured?: boolean;
}
```

#### Documentation Collection
```typescript
{
  title: string;
  description: string;
  category: string;
  order: number;
  lastModified?: Date;
  version?: string;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  draft?: boolean;
  noIndex?: boolean;
  showTOC?: boolean;
  featured?: boolean;
}
```

### H1 Title Handling - CRITICAL DISTINCTION

**IMPORTANT**: Both Posts and Pages now handle H1 titles the same way:

#### Posts (PostLayout)
- **H1 is HARDCODED** in the layout using `{post.data.title}` from frontmatter
- **NO H1 in markdown content** - posts should NOT have `# Title` in their markdown
- **Layout controls styling** - H1 styling is handled by the PostLayout component
- **Example**: Post frontmatter has `title: "My Post"` → Layout renders `<h1>My Post</h1>`

#### Pages (PageLayout)
- **H1 is HARDCODED** in the layout using `{page.data.title}` from frontmatter
- **NO H1 in markdown content** - pages should NOT have `# Title` in their markdown
- **Layout controls styling** - H1 styling is handled by the PageLayout component
- **Example**: Page frontmatter has `title: "About"` → Layout renders `<h1>About</h1>`

#### Why This Matters
- **Both Posts and Pages**: Title comes from frontmatter, layout handles presentation
- **Content starts with H2**: Since H1 is hardcoded in the layout, all content should start with `##` headings
- **Consistency**: Both use the same approach for titles and content structure
- **AI Agents**: NEVER add H1 to any markdown content - both posts and pages have hardcoded H1s from frontmatter

### Table of Contents (TOC) Behavior - CRITICAL DISTINCTION

**IMPORTANT**: Posts have different TOC behavior than other content types:

#### Posts (PostLayout)
- **Uses global setting**: Controlled by `siteConfig.postOptions.tableOfContents` in `config.ts`
- **Can be overridden**: Use `hideTOC: true` in post frontmatter to hide TOC
- **Global control**: All posts respect the global setting unless individually overridden
- **Example**: If `tableOfContents: true` in config, all posts show TOC unless `hideTOC: true` in frontmatter
- **Override behavior**: Posts can only opt-out when global setting is enabled, cannot opt-in when global setting is disabled

#### Pages, Projects, Documentation (PageLayout, ProjectLayout, DocumentationLayout)
- **Independent TOC logic**: NOT affected by global `postOptions.tableOfContents` setting
- **Default behavior**: TOC shows by default (equivalent to `true`)
- **Frontmatter control**: Use `hideTOC: true` to hide TOC, `showTOC: false` to hide TOC
- **Per-content control**: Each content type has its own TOC behavior independent of posts

#### Why This Matters
- **Posts**: Global setting controls all posts, individual posts can override with `hideTOC: true`
- **Other content types**: Each has independent TOC behavior, not affected by posts setting
- **AI Agents**: Don't assume all content types use the same TOC logic - posts are different
- **Configuration**: Only `postOptions.tableOfContents` affects posts, not other content types

## Obsidian Integration

For complete Obsidian setup and usage instructions, see the [Astro Suite Vault Guide](src/content/posts/astro-suite-vault-modular-guide.md).

### Astro Suite Vault Philosophy
The included Obsidian vault follows three core principles:
1. **Plug-and-play Astro blogging experience**
2. **Emphasis on modularity**
3. **Customize your experience to get it just right**

### Vault Setup & Configuration

#### Obsidian Settings for Best Compatibility

**Critical Settings:**
- **Files & Links → New link format**: Set to **"Absolute path in Vault"** - This ensures paths like `bases/home.base` or `attachments/image.jpg` work correctly with the theme's image processing logic
- **Files & Links → Default location for new attachments**: `./attachments` (as configured in vault)
- **Files & Links → Use `[[]]` style links**: Can be enabled if you prefer wikilinks, but standard markdown links work better for cross-content-type linking

**Why "Absolute path in Vault" is Recommended:**
- Matches the theme's path processing logic which expects paths like `bases/home.base` (not `../bases/home.base` or just `home.base`)
- Prevents issues with relative path resolution (`../` patterns aren't explicitly handled)
- Maintains consistent paths when moving files around in Obsidian
- Works seamlessly with the theme's image optimization functions

**Path Format Examples:**
- ✅ **Absolute path in Vault**: `bases/home.base` → Processes correctly
- ❌ **Relative paths**: `../bases/home.base` → May cause resolution issues
- ❌ **Shortest path possible**: `home.base` → Loses folder context

#### Theme & Visual Experience
- **Minimal Theme** - Understated color scheme with high contrast options
- **Minimal Theme Settings** - Complete control over your experience
- **Hider Plugin** - Remove distracting UI elements
- **Style Settings** - Fine-tune visual appearance
- **Custom CSS Snippets** - Optional enhancements for window management and mobile interface
  - `astro-modular-styling` - Gives embedded HTML elements similar look to frontend
  - `custom-draggable-top-area.css` - Makes window moving easier when frame is hidden
  - `hide-properties-heading-and-add-properties-button.css` - Alternative to Style Settings plugin
  - `hide-tabs-icon-mobile.css` - Removes tabs icon in mobile version
  - `hide-longpress-flair-mobile.css` - Simplifies mobile interface
  - `hide-header-title-mobile.css` - Simplifies mobile interface

#### Essential Hotkeys for AI Agents
When working with the Obsidian vault, these hotkeys are crucial:
- **Toggle left side panel**: `CTRL + ALT + Z`
- **Toggle right side panel**: `CTRL + ALT + X`
- **Toggle tab bar**: `CTRL + ALT + S`
- **Navigate back**: `ALT + ←`
- **Navigate forward**: `ALT + →`
- **Open homepage**: `CTRL + M`
- **Add property**: `CTRL + ;`
- **Toggle reading view**: `CTRL + E`
- **Toggle Zen mode**: `CTRL + SHIFT + Z`
- **Insert image**: `CTRL + '`
- **Insert callout**: `CTRL + SHIFT + C`
- **Rename note**: `CTRL + R`
- **Start Terminal**: `CTRL + SHIFT + D`
- **Open config file**: `CTRL + SHIFT + ,`
- **Git Commit and Sync**: `CTRL + SHIFT + S`

*Note: On Mac, `CTRL` = `CMD`*

### Key Plugins for Content Creation

#### Astro Composer
- **Purpose**: Easily create new notes as Astro blog posts
- **Functionality**:
  - Creates kebab-case filenames from titles automatically
  - Supports `CTRL + R` for easy renaming
  - Generates default properties automatically
  - Works with both wikilinks and standard markdown links
  - Supports "Standardize properties" command for organizing properties
  - Allows copying heading links by right-clicking headings
- **Critical**: Unlike other themes, this theme supports **any internal link that works with Obsidian** without conversion

#### Homepage and Default New Tab Page
- **Home Base**: Default screen shows a `.base` file with all blog posts in reverse-chronological order
- **Location**: Nested in `bases` folder
- **Customization**: Note properties in views can be customized

#### Content Management Plugins
- **Paste Image Rename**: Quickly rename images with kebab-case, SEO-friendly names
- **Image Inserter**: Pull images from Unsplash with `CTRL + '`
- **Title-Only Tab**: Uses `title` property instead of filename for tabs
- **Property Over Filename**: Use `title` property as primary identifier for linking/searching
- **Alias Filename History**: Stores old filenames as aliases for URL redirects
  - Automatically stores old filenames when renaming posts/pages
  - Configurable regex for ignoring names (like `Untitled` or `_` prefix)
  - Adjustable timeout and parent folder name tracking

#### Focus & Productivity
- **ProZen**: Full-screen writing mode with `CTRL + SHIFT + Z`
- **Disable Tabs**: Optional - new tabs replace current ones (great with hidden tab bar)
- **Shell Commands**: Quick access to terminal and config file
- **BRAT (Temporary)**: Used temporarily to load plugins before they're available in the official directory

### Git Integration
- **Git Plugin**: Publish to Astro blog without leaving Obsidian
- **Command**: `CTRL + SHIFT + S` for commit and sync
- **Configuration**: Requires git setup to enable

### Content Workflow
1. **Write in Obsidian** using the configured vault
2. **Use wikilinks** for internal connections (`[[Post Title]]` or `[[Post Title|Custom Text]]`)
3. **Add images** with `CTRL + '` and automatic SEO-friendly naming
4. **Create callouts** with `CTRL + SHIFT + C`
5. **Publish** with `CTRL + SHIFT + S` (git commit and sync)
6. **Content appears** on your Astro blog automatically

### Linking Behavior: Wikilinks vs Standard Links

This theme supports two distinct linking behaviors, each with specific use cases:

#### **Wikilinks (Obsidian-style) - Posts Only**
- **Syntax**: `[[Post Title]]` or `[[Post Title|Custom Text]]`
- **Purpose**: Obsidian's special linking syntax for seamless vault-to-blog publishing
- **Scope**: **ONLY works with posts collection**
- **Examples**:
  - `[[Getting Started]]` → `/posts/getting-started`
  - `[[My Post|Custom Link Text]]` → `/posts/my-post` with custom display text
  - `![[image.jpg]]` → Image reference (works in any content type)
- **Why posts only**: Maintains simplicity and matches Obsidian's primary use case for blog content

#### **Standard Markdown Links - All Content Types**
- **Syntax**: `[text](url)`
- **Purpose**: Standard markdown linking that works everywhere
- **Scope**: **Works with ALL content types** (posts, pages, projects, docs)
- **Examples**:
  - `[Post Title](posts/post-slug)` or `[Post Title](post-slug)` → Posts
  - `[Page Title](pages/page-slug)` or `[Page Title](page-slug)` → Pages
  - `[Project Title](projects/project-slug)` → Projects
  - `[Doc Title](docs/doc-slug)` → Documentation
  - `[Home](special/home)` or `[Home](homepage)` → Special pages

#### **When to Use Which**
- **Use Standard Markdown Links** (`[text](url)`) for linking between different content types - this is the most ideal approach if you care about cross-content-type linking
- **Use Wikilinks** (`[[Post Title]]`) only if you exclusively link between posts and want the Obsidian-native feel - they work seamlessly for posts but don't support other content types
- **Best Practice**: If you plan to link between posts, pages, projects, or docs, use standard markdown links for maximum flexibility
- **Both work together** - you can mix wikilinks and standard links in the same document

#### **Technical Implementation**
- **File**: `src/utils/internallinks.ts` (renamed from `wikilinks.ts` for clarity)
- **Wikilink Processing**: `remarkWikilinks()` - handles `[[...]]` syntax (posts only)
- **Standard Link Processing**: `remarkStandardLinks()` - handles `[text](url)` syntax (all content types)
- **Combined Processing**: `remarkInternalLinks()` - combines both for Astro configuration

### URL Mapping System for Obsidian Compatibility

The theme includes a sophisticated URL mapping system that ensures Obsidian-style relative links work seamlessly on the live website while maintaining full Obsidian compatibility.

#### **Purpose**
- **Obsidian Compatibility**: Links written in Obsidian work naturally without conversion
- **Live Site Functionality**: Relative links resolve correctly on the published website
- **Seamless Publishing**: Write in Obsidian, publish to blog with identical link behavior

#### **Supported URL Mappings**

**Pages Collection Mapping:**
- `[About](/pages/about)` → `/about` (removes `/pages` prefix)
- `[About](/pages/about/)` → `/about` (handles trailing slashes)
- `[Contact](pages/contact)` → `/contact` (handles both leading slash variants)

**Special Pages Mapping:**
- `[Home](/special/home)` → `/` (homepage)
- `[Home](/special/home/)` → `/` (handles trailing slashes)
- `[404 Page](/special/404)` → `/404` (404 error page)
- `[Projects](/special/projects)` → `/projects` (projects index)
- `[Docs](/special/docs)` → `/docs` (documentation index)

**Direct Index Mapping:**
- `[Home](/index)` → `/` (homepage)
- `[Home](/index/)` → `/` (handles trailing slashes)

#### **Technical Implementation**

**Core Functions:**
- **`mapRelativeUrlToSiteUrl()`**: Main URL mapping function in `src/utils/internallinks.ts`
- **`extractLinkTextFromUrlWithAnchor()`**: Processes URLs and extracts link text
- **`remarkStandardLinks()`**: Applies URL mapping during markdown processing

**Processing Flow:**
1. **Link Detection**: `isInternalLink()` identifies relative links
2. **URL Mapping**: `mapRelativeUrlToSiteUrl()` transforms Obsidian paths to site URLs
3. **Rendering**: `remarkStandardLinks()` applies mappings during HTML generation
4. **Anchor Handling**: Anchors (`#section`) are preserved and properly formatted

#### **Linked Mentions & Graph View Integration**

**Important Distinction**: URL mapping is applied for **rendering only**. The linked mentions and graph view features maintain their **posts-only** filtering:

- **URL Mapping**: Applied to all content types for proper rendering
- **Linked Mentions**: Only includes posts (filtered by `isPostLink` logic)
- **Graph View**: Only includes posts (filtered by `isPostLink` logic)

**Why This Design:**
- **Rendering**: All links work correctly on the live site
- **Features**: Linked mentions and graph view remain focused on blog content
- **Performance**: No unnecessary processing of non-post content for these features

#### **Edge Cases Handled**

**Trailing Slashes:**
- `/pages/about/` → `/about`
- `/special/home/` → `/`
- `/index/` → `/`

**Mixed Formats:**
- Both `/pages/about` and `pages/about` work identically
- Both `/special/home` and `special/home` work identically
- Obsidian's flexible linking is fully supported

**Anchor Preservation:**
- `[About](/pages/about#section)` → `/about#section`
- `[Home](/special/home#top)` → `/#top`
- Anchors are properly slugified for web compatibility

#### **Best Practices for AI Agents**

**URL Mapping Implementation:**
- **Always use `mapRelativeUrlToSiteUrl()`** for URL transformations
- **Test both leading slash variants** (`/pages/about` and `pages/about`)
- **Handle trailing slashes** in all mapping logic
- **Preserve anchors** during URL transformation

**Content Creation:**
- **Use Obsidian-style links** - they work seamlessly on the live site
- **Test URL mappings** with various link formats
- **Don't manually convert links** - the system handles it automatically
- **Include examples** in documentation for all supported formats

**Performance Considerations:**
- **URL mapping is lightweight** - minimal performance impact
- **Caching friendly** - mappings are applied during build time
- **No runtime overhead** - all processing happens during markdown compilation

### Automatic Aliases & Redirects
When you rename a post or page in Obsidian, the old filename is automatically stored as an alias. Astro processes these aliases and creates redirect rules, so old URLs continue to work. You don't need to add aliases manually - they appear automatically when you use Obsidian's rename functionality.

### Content Collections Structure

The theme uses Astro's content collections system with predefined collections:

#### **Standard Collections**
```
src/content/
├── posts/                   # Blog posts collection
│   ├── attachments/           # Shared post images
│   ├── getting-started.md   # File-based post
│   ├── sample-folder-post/  # Folder-based post
│   │   ├── index.md         # Main content file
│   │   ├── hero-image.jpg   # Post-specific assets
│   │   ├── diagram.png
│   │   └── document.pdf
│   └── another-post/        # Another folder-based post
│       ├── index.md
│       └── cover.jpg
├── pages/                   # Static pages collection
│   ├── attachments/           # Shared page images
│   ├── about.md
│   ├── contact.md
│   └── privacy.md
├── projects/                # Projects collection
│   ├── attachments/           # Shared project images
│   ├── project-1.md
│   └── project-2/
│       ├── index.md
│       └── screenshot.png
├── docs/                    # Documentation collection
│   ├── attachments/           # Shared doc images
│   ├── guide-1.md
│   └── guide-2/
│       ├── index.md
│       └── diagram.png
└── special/                 # Special pages collection
    ├── home.md             # Homepage blurb content
    ├── 404.md               # 404 page content
    ├── projects.md          # Projects index page content
    └── docs.md              # Docs index page content
```

#### **Special Collection**

The `special` collection contains content for specific pages that have special routing logic:

**Purpose**: Provides content for pages that need custom behavior or fixed URLs

**Files and Their Uses**:
- **`home.md`** - Homepage blurb content (controlled by `homeOptions.blurb.placement`)
- **`404.md`** - 404 error page content
- **`posts.md`** - Posts index page content (meta title, description, H1 heading)
- **`projects.md`** - Projects index page content (if `homeOptions.projects.enabled: true`)
- **`docs.md`** - Documentation index page content (if `homeOptions.docs.enabled: true`)

**URL Mapping**:
- `special/home.md` → `/` (homepage blurb)
- `special/404.md` → `/404` (404 error page)
- `special/posts.md` → `/posts` (posts index page)
- `special/projects.md` → `/projects` (projects index)
- `special/docs.md` → `/docs` (documentation index)

**Important Notes**:
- These files have **fixed URLs** determined by their filename, not frontmatter
- They use a simplified schema (title, description, hideTOC only)
- They're processed by the `[...slug].astro` catch-all route
- They're excluded from the main pages collection to avoid conflicts

#### **Special Pages Detailed Behavior**

**Homepage (`special/home.md`)**:
- **Purpose**: Controls homepage blurb content
- **Usage**: Content appears when `homeOptions.blurb.placement` is not "none"
- **Content**: Markdown content below frontmatter is rendered as the blurb
- **Fallback**: If file doesn't exist, no blurb is shown
- **Schema**: `title`, `description`, `hideTOC`

**404 Page (`special/404.md`)**:
- **Purpose**: Controls 404 error page content
- **Usage**: Content appears on any "not found" page
- **Content**: Markdown content below frontmatter is rendered
- **Fallback**: If file doesn't exist, uses default 404 page
- **Schema**: `title`, `description`, `hideTOC`

**Posts Index (`special/posts.md`)**:
- **Purpose**: Controls posts index page meta data and heading
- **Usage**: `title` field becomes H1 heading and meta title, `description` becomes meta description
- **Content**: Only frontmatter is used, content below is ignored
- **Fallback**: If file doesn't exist, uses "All Posts" title and dynamic description
- **Schema**: `title`, `description` (no content below frontmatter)
- **Dynamic Behavior**: When tag filtering is active, uses dynamic title/description logic

**Projects Index (`special/projects.md`)**:
- **Purpose**: Controls projects index page content
- **Usage**: Content appears when `homeOptions.projects.enabled: true`
- **Content**: Markdown content below frontmatter is rendered
- **Fallback**: If file doesn't exist, uses default projects page
- **Schema**: `title`, `description`, `hideTOC`

**Documentation Index (`special/docs.md`)**:
- **Purpose**: Controls documentation index page content
- **Usage**: Content appears when `homeOptions.docs.enabled: true`
- **Content**: Markdown content below frontmatter is rendered
- **Fallback**: If file doesn't exist, uses default docs page
- **Schema**: `title`, `description`, `hideTOC`

#### **Special Pages Implementation Details**

**Content Loading Pattern**:
```typescript
// Example from posts/index.astro
let postsPageContent;
try {
  postsPageContent = await getCollection('special', ({ slug }) => slug === 'posts');
} catch (error) {
  postsPageContent = [];
}
const postsPageData = postsPageContent.length > 0 ? postsPageContent[0] : null;
```

**Fallback Logic**:
- **Title**: `postsPageData?.data.title || 'Default Title'`
- **Description**: `postsPageData?.data.description || 'Dynamic Description'`
- **Content**: Only used for pages that support content (home, 404, projects, docs)

**Schema Differences**:
- **Posts**: Only uses frontmatter (`title`, `description`)
- **Others**: Use frontmatter + content below frontmatter
- **All**: Support `hideTOC` field for table of contents control

**URL Generation**:
- **Fixed URLs**: Special pages have predetermined URLs based on filename
- **No Slug Processing**: URLs are not generated from frontmatter titles
- **Catch-all Route**: All special pages are handled by `[...slug].astro`

**Error Handling**:
- **Graceful Fallbacks**: All special pages have fallback behavior if files don't exist
- **Try-Catch Blocks**: Content loading is wrapped in try-catch for robustness
- **Empty Collections**: Handles cases where special collection doesn't exist

#### **Custom Collections**

**Recommended Approach: Use Subfolders Within Pages Collection**

Instead of creating custom collections at the content level (which triggers Astro's auto-generation warnings), use subfolders within the existing `pages` collection:

**Example Structure**:
```
src/content/pages/
├── about.md
├── contact.md
├── services/
│   ├── web-development.md
│   ├── consulting.md
│   └── design.md
└── products/
    ├── software-solutions.md
    └── consulting-services.md
```

**URL Generation**:
- `src/content/pages/services/web-development.md` → `/services/web-development`
- `src/content/pages/services/consulting.md` → `/services/consulting`
- `src/content/pages/products/software-solutions.md` → `/products/software-solutions`

**Alternative: Nested Folders with index.md**:
```
src/content/pages/services/
├── web-development/
│   └── index.md
└── consulting/
    └── index.md
```

**Same URL Results**:
- `src/content/pages/services/web-development/index.md` → `/services/web-development`
- `src/content/pages/services/consulting/index.md` → `/services/consulting`

**Benefits of This Approach**:
- **No Astro warnings** - works within existing pages collection
- **No configuration needed** - uses standard Astro folder-based routing
- **Same URL structure** - creates the same `/services/...` URLs you want
- **Easy linking** - all internal links work automatically
- **Standard frontmatter** - uses the same schema as regular pages

**Linking to Custom Pages**:
- **From other pages**: `[Web Development](/services/web-development)`
- **From posts**: `[Our Services](/services/consulting)`
- **From any content**: Standard markdown links work out of the box

**Why This Design**:
- **Avoids Astro auto-generation** - no deprecation warnings
- **Maximum flexibility** - create any URL structure you want
- **Zero configuration** - works out of the box
- **Clean and simple** - leverages Astro's built-in folder routing

### Vault Structure
```
src/content/
├── posts/                   # Blog posts
├── pages/                   # Static pages
├── projects/                # Projects
├── docs/                    # Documentation
├── special/                 # Special pages
└── .obsidian/               # Obsidian vault setup
    ├── plugins/             # Configured plugins
    ├── themes/              # Minimal theme
    └── snippets/            # Custom CSS snippets
```

## Page Transitions with Swup

### Swup Integration

This project uses **Swup** for client-side page transitions to provide a smooth, app-like navigation experience.

#### Configuration
- **Location**: `astro.config.mjs` - Swup is configured as an Astro integration
- **Accessibility**: Currently disabled (`accessibility: false`) to prevent invalid `tabindex` attributes on body elements
- **Containers**: Uses `#swup-container` as the main content container
- **Smooth Scrolling**: Disabled (handled by custom implementation)
- **Caching**: Enabled for better performance
- **Preloading**: Enabled for faster navigation
- **Back/Forward Navigation**: Completely disabled for Swup (`skipPopStateHandling: true`) to let browser handle naturally

#### 🚨 CRITICAL: Scroll Behavior Issues

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**The most common and frustrating issue with Swup is scroll behavior during back/forward navigation.** This section documents the exact cause and solution.

#### **The Problem: "Dumb Little Scroll Thing"**

When users navigate back/forward using browser buttons, they experience:
- Page jumps to top, then slowly scrolls down
- Unnatural scroll behavior that feels broken
- Loss of scroll position restoration

#### **Root Cause: `handleInitialHashScroll()` Function**

The issue is caused by the `handleInitialHashScroll()` function in `BaseLayout.astro` being called in the `visit:end` hook:

```javascript
// ❌ WRONG - This causes scroll issues
swup.hooks.on('visit:end', () => {
  // ... other code ...
  handleInitialHashScroll(); // ← THIS IS THE CULPRIT
});
```

**What `handleInitialHashScroll()` does:**
1. Calls `window.scrollTo(0, 0)` - Forces scroll to top
2. Performs custom smooth scroll animation
3. Interferes with browser's natural scroll restoration

#### **The Solution: Remove from `visit:end` Hook**

**✅ CORRECT - Fixed version:**
```javascript
swup.hooks.on('visit:end', () => {
  // Update navigation highlighting after page transition is complete
  updateNavigationHighlighting();
  // Initialize linked mentions after page transition is complete
  if (window.initializeLinkedMentions) {
    window.initializeLinkedMentions();
  }
  // Don't call handleInitialHashScroll() here - it interferes with back/forward navigation
});
```

#### **Why This Works**

1. **Browser handles scroll naturally** - No JavaScript interference
2. **Back/forward navigation preserved** - Browser's scroll restoration works
3. **No forced scrolling** - No `window.scrollTo(0, 0)` calls
4. **No custom animations** - No interference with natural behavior

#### **Additional Swup Scroll Configuration**

The project also uses these Swup configurations to prevent scroll issues:

```javascript
// In astro.config.mjs
swup({
  smoothScrolling: false,           // Disable Swup's smooth scrolling
  plugins: [],                      // Disable all plugins including scroll
  skipPopStateHandling: (event) => {
    // ALWAYS skip Swup handling for back/forward navigation
    return true;
  }
})
```

#### **🚨 CRITICAL: JavaScript Re-initialization After Page Transitions**

**⚠️ AI AGENTS MUST READ THIS SECTION CAREFULLY ⚠️**

**The #1 most common issue with Swup is that JavaScript stops working after page transitions.** This is because Swup replaces DOM content without triggering `DOMContentLoaded`, so event listeners and component initialization are lost.

#### **The Problem: "It works on first load but not after navigation"**

When users navigate between pages, they experience:
- Interactive elements stop responding to clicks
- Event listeners are lost after page transitions
- Components appear but don't function
- "It works on first load but not after navigation"

#### **Root Cause: DOM Content Replacement**

Swup replaces the content inside `#swup-container` without triggering `DOMContentLoaded`, so:
1. **Event listeners are lost** - They're attached to DOM elements that no longer exist
2. **Component initialization is skipped** - `DOMContentLoaded` doesn't fire again
3. **JavaScript state is lost** - Any component state is reset

#### **The Solution: Re-initialize After Every Page Transition**

**✅ CORRECT - Component Pattern:**
```javascript
// In component files (e.g., TableOfContents.astro, CommandPalette.astro)
function initializeMyComponent() {
  // Remove existing event listeners to prevent duplicates
  const existingElement = document.querySelector('.my-component');
  if (existingElement) {
    const newElement = existingElement.cloneNode(true);
    existingElement.parentNode?.replaceChild(newElement, existingElement);
  }

  // Get fresh references after cloning
  const element = document.querySelector('.my-component');
  if (element) {
    element.addEventListener('click', handleClick);
    // ... other initialization
  }
}

// Make function globally available
window.initializeMyComponent = initializeMyComponent;

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeMyComponent);
```

**✅ CORRECT - BaseLayout.astro Integration:**
```javascript
// In BaseLayout.astro - add to BOTH hooks
window.swup.hooks.on('page:view', () => {
  // ... other code ...
  if (window.initializeMyComponent) {
    window.initializeMyComponent();
  }
});

window.swup.hooks.on('visit:end', () => {
  // ... other code ...
  if (window.initializeMyComponent) {
    window.initializeMyComponent();
  }
});
```

#### **Why This Works**

1. **Global functions** - Available to Swup hooks from any component
2. **Event listener cleanup** - Prevents duplicate listeners by cloning elements
3. **Fresh DOM references** - Gets new elements after content replacement
4. **Both hooks** - Ensures initialization happens regardless of transition timing

#### **Common Components That Need This Pattern**

- **Table of Contents** - Collapse/expand functionality
- **Command Palette** - Search and navigation
- **Theme Toggle** - Dark/light mode switching
- **Mobile Menu** - Navigation menu interactions
- **Image Galleries** - Lightbox and gallery controls
- **Mermaid Diagrams** - Diagram rendering and interactions
- **Linked Mentions** - Post connection highlighting

#### **Important Notes for AI Agents**
- **NEVER call `handleInitialHashScroll()` in Swup hooks** - It breaks back/forward navigation
- **ALWAYS re-initialize JavaScript after page transitions** - Use the pattern above
- **Let browser handle scroll restoration** - Don't interfere with natural behavior
- **Accessibility Warnings**: Swup can add `tabindex` attributes to body elements, causing accessibility warnings. This is why `accessibility: false` is set in the config.
- **Container Structure**: All page content must be wrapped in `#swup-container` for transitions to work
- **Image Loading**: Swup doesn't interfere with image loading attributes - these are handled by the PostCard and ImageWrapper components
- **Navigation**: Internal links automatically use Swup transitions when available

#### **Swup Hooks and Custom Behavior**
The project includes custom Swup behavior in `BaseLayout.astro`:
- **Scroll Management**: Custom scroll behavior to prevent unwanted scrolling during transitions
- **Content Replacement**: Handles content updates after page transitions
- **Mobile Menu**: Closes mobile menu on navigation
- **NO scroll interference**: Back/forward navigation is handled entirely by the browser

## Image Handling

### Critical Distinction: Post Cards vs Post Content Images

**IMPORTANT**: There are two completely separate image systems in this project:

#### 1. Post Card Images (Listings, Homepage, Tag Pages)
- **Controlled by**: `siteConfig.postOptions.showPostCardCoverImages` in `config.ts`
- **Options**: `"all"`, `"featured"`, `"home"`, `"posts"`, `"featured-and-posts"`, `"none"`
- **Current Setting**: `"featured-and-posts"` (shows on featured posts and posts/tags pages)
- **Frontmatter**: The `image` field in post frontmatter is used for card images
- **NOT affected by**: `hideCoverImage` frontmatter field
- **Loading**: Uses `eager` loading for first post on pages, `lazy` for others
- **Scope**: **ONLY affects post cards** - projects and documentation cards are not controlled by this setting

#### 2. Post Content Images (Inside Individual Posts)
- **Controlled by**: `hideCoverImage` frontmatter field
- **Purpose**: Controls whether the main post image appears in the post content
- **Loading**: Always uses `eager` loading and `fetchpriority="high"`
- **Location**: Rendered by `PostContent.astro` component

#### 3. Project Card Images
- **Controlled by**: Always show when available (not controlled by postOptions)
- **Purpose**: Project cards always display cover images when present
- **Frontmatter**: Controlled by `hideCoverImage` frontmatter field
- **Loading**: Uses `eager` loading for first project, `lazy` for others

#### 4. Documentation Card Images
- **Controlled by**: Always show when available (not controlled by postOptions)
- **Purpose**: Documentation cards always display cover images when present
- **Frontmatter**: Controlled by `hideCoverImage` frontmatter field
- **Loading**: Uses `eager` loading for first doc, `lazy` for others
- **Homepage Exception**: Hidden on homepage for cleaner look

#### Key Rules for AI Agents
- **Never confuse these two systems** - they are completely independent
- **Post card visibility** is controlled by `showPostCardCoverImages` config, not frontmatter
- **Post content visibility** is controlled by `hideCoverImage` frontmatter
- **Performance warnings** about "unoptimized loading" typically refer to post card images
- **Accessibility warnings** about "redundant alt text" can affect both systems

### Development Mode Graceful Error Handling

When working with Obsidian and actively editing content, missing image errors are handled gracefully:

1. **Graceful Fallbacks**: Missing images are automatically replaced with placeholder images
2. **Development Warnings**: Console warnings help identify missing images (only in dev mode)
3. **Continued Development**: The build process continues even with missing images
4. **Visual Indicators**: Placeholder images clearly indicate missing assets

### Placeholder Images

The system automatically uses placeholder images when assets are missing:
- **Posts**: `/posts/attachments/placeholder.jpg`
- **Pages**: `/pages/attachments/placeholder.jpg`
- **Default**: `/posts/attachments/placeholder.jpg`

### Image Reference Formats

#### Relative Paths (Recommended)
```markdown
![Image](image.jpg)
![Another Image](subfolder/image.png)
```

#### Obsidian Bracket Syntax
```markdown
![Image]([[image.jpg]])
![Another Image]([[subfolder/image.png]])
```

#### Frontmatter Images
```yaml
---
image: cover.jpg
imageAlt: Cover image description
---
```

Or with Obsidian bracket syntax:
```yaml
---
image: "[[cover.jpg]]"
imageAlt: Cover image description
---
```

### Image Resolution Logic

The theme automatically handles image resolution for folder-based posts:
- **Relative paths** (`image.jpg`) → `/posts/post-slug/image.jpg`
- **Absolute paths** (`/attachments/image.jpg`) → `/attachments/image.jpg`
- **External URLs** (`https://...`) → Used as-is

### Development Tools

#### Check Missing Images
```bash
pnpm run check-images
```

This script will:
- Scan all markdown files for image references
- Check if referenced images exist
- Report missing images with file locations and line numbers
- Provide helpful tips for fixing issues

#### Development Configuration

Located in `src/config/dev.ts`:

```typescript
export const devConfig = {
  images: {
    showPlaceholders: true,        // Show placeholder images
    logMissingImages: true,        // Log missing images to console
    fallbacks: {
      posts: '/posts/attachments/placeholder.jpg',
      pages: '/pages/attachments/placeholder.jpg',
      default: '/posts/attachments/placeholder.jpg'
    }
  },
  content: {
    continueOnMissingAssets: true, // Continue processing with missing assets
    logWarnings: true              // Log content processing warnings
  }
};
```

## Build Process

### Asset Sync

The build process automatically syncs folder-based assets to the public directory:

```
src/content/posts/my-post/
├── index.md
├── image.jpg
├── audio.wav
├── video.mp4
└── document.pdf

↓ (build process) ↓

public/posts/my-post/
├── image.jpg
├── audio.wav
├── video.mp4
└── document.pdf
```

**Supported Media Types:**
- **Images**: JPG, JPEG, PNG, GIF, WEBP, SVG, BMP, TIFF, TIF, ICO
- **Audio**: MP3, WAV, OGG, M4A, 3GP, FLAC, AAC
- **Video**: MP4, WEBM, OGV, MOV, MKV, AVI
- **Documents**: PDF

### Build Scripts

The build process includes several pre-build steps:
1. **Sync Media Files**: Copy images, audio, video, and PDF files from content to public directory
2. **Process Aliases**: Convert content aliases to redirects
3. **Generate Redirects**: Create redirect rules for deployment platforms
4. **Build Astro**: Compile the site

### RSS and Atom Feeds

The theme automatically generates both RSS and Atom feeds for content syndication:

#### Feed Generation
- **RSS Feed**: Available at `/rss.xml` - Uses `@astrojs/rss` integration
- **Atom Feed**: Available at `/feed.xml` - Custom implementation in `src/pages/feed.xml.ts`
- **Auto-generated**: Both feeds are automatically generated during the build process
- **Content Source**: Feeds include all published posts (excludes drafts in production)

#### Feed Features
- **Post Filtering**: Only includes non-draft posts in production builds
- **Sorting**: Posts are sorted by date (newest first)
- **Metadata**: Includes post title, description, publication date, and tags
- **Image Support**: RSS feed includes post images when `imageOG: true` is set
- **Categories**: Post tags are included as RSS categories and Atom categories
- **Author Information**: Uses global author from `siteConfig.author`

#### Feed Buttons
Both RSS and Atom feed buttons are available on all post listing pages:
- **Posts Index** (`/posts`) - Main posts listing
- **Paginated Posts** (`/posts/[page]`) - Paginated post listings
- **Tag Pages** (`/posts/tag/[...tag]`) - Posts filtered by tag
- **Paginated Tag Pages** (`/posts/tag/[...tag]/[page]`) - Paginated tag listings

#### Feed Button Styling
- **Consistent Design**: Both buttons use identical styling with theme-aware colors
- **Icons**: RSS uses Lucide RSS icon, Atom uses Lucide atom icon
- **Accessibility**: Proper `title` attributes and `data-no-swup` for Swup compatibility
- **Responsive**: Buttons adapt to different screen sizes and themes

#### Technical Implementation
- **RSS**: Uses `@astrojs/rss` with custom data processing for images and metadata
- **Atom**: Custom XML generation with proper Atom 1.0 specification compliance
- **Caching**: Both feeds include appropriate cache headers (1 hour cache, 1 day s-maxage)
- **Content Type**: RSS serves as `application/rss+xml`, Atom as `application/xml`

### Deployment Platforms

The theme supports deployment to all major platforms with an elegant configuration system:

#### Platform Selection
Set your deployment platform once in `src/config.ts`:
```typescript
deployment: {
  platform: "netlify", // "netlify" | "vercel" | "github-pages" | "cloudflare-workers"
}
```

#### Supported Platforms
- **Netlify**: Generates `netlify.toml` with redirects and build settings
- **Vercel**: Generates `vercel.json` with redirects and headers
- **GitHub Pages**: Generates `public/_redirects` and `public/_headers` for GitHub Pages
- **Cloudflare Workers** (recommended): Generates `wrangler.toml` (Workers-compatible configuration) and `public/_redirects`/`public/_headers` (redirects and headers)

**Note:** Cloudflare recommends using Workers instead of Pages. Workers supports static assets with the same features as Pages, plus additional capabilities. The script generates Workers-compatible `wrangler.toml` configuration using `assets.directory` instead of the old `pages_build_output_dir` format. See the [Cloudflare migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) for details.

#### Build Process
The build process automatically detects your chosen platform and generates the correct configuration files:
```bash
pnpm run build  # Works for all platforms - no environment variables needed!
```

#### Platform-Specific Features
- **Netlify**: Includes `netlify.toml` with redirects, build settings, and 404 handling
- **Vercel**: Generates `vercel.json` with redirects and cache headers for assets
- **GitHub Pages**: Creates `public/_redirects` and `public/_headers` in the format required by GitHub Pages
- **Cloudflare Workers**: Creates `wrangler.toml` (Workers-compatible config with name, compatibility_date, assets.directory) and `public/_redirects`/`public/_headers` (redirects and headers)

#### Platform Headers for PDF Embeds and Twitter Widgets

To make PDF embeds and Twitter widgets work correctly, specific HTTP headers must be configured on each deployment platform:

**Required Headers:**
1. **X-Frame-Options: SAMEORIGIN** - Allows PDFs to be embedded in iframes on your own site
2. **Content-Security-Policy** - Allows Twitter widgets script and iframes to load

**Netlify (Default)**
Headers are configured in `netlify.toml`. The following headers are automatically applied:
- PDF files: `X-Frame-Options: SAMEORIGIN`
- All pages: CSP with Twitter (`https://platform.twitter.com`) and other required domains

**Vercel**
Headers are generated automatically in `vercel.json` when you run the build command. The `scripts/generate-deployment-config.js` script:
- PDF iframe permissions (`X-Frame-Options: SAMEORIGIN`)
- Twitter CSP rules in the Content-Security-Policy header
- **Preserves existing custom settings** (serverless functions, environment variables, etc.)

To generate/update the config:
```bash
pnpm run build
```

**Important:** The script merges new redirects/headers with existing `vercel.json` settings, so custom configurations won't be lost.

**GitHub Pages**
Headers are generated automatically in `public/_headers` when you run the build command. The script creates:
- `public/_redirects` - Redirect rules for GitHub Pages
- `public/_headers` - Custom headers

**Important:** These files are auto-generated during build and are ignored by git (see `.gitignore`). They are:
- Only created when `platform: "github-pages"` is selected
- Automatically cleaned up when switching to other platforms
- Build artifacts (similar to `dist/`) that should not be committed

**GitHub Pages Notes:**
- Custom headers require GitHub Pages on a paid plan or GitHub Enterprise. Free GitHub Pages users won't have these headers applied.
- For free GitHub Pages users: PDF embeds may show security warnings in some browsers, but Twitter widgets should still work as the script is included directly in the page

**Cloudflare Workers (Recommended)**
**Note:** Cloudflare recommends using Workers instead of Pages. See the [migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) for details.

The script creates:
- `public/_redirects` - Redirect rules (same format as GitHub Pages)
- `public/_headers` - Custom headers (same format as GitHub Pages)
- `wrangler.toml` - Workers-compatible configuration (uses `assets.directory` instead of `pages_build_output_dir`)

**Important:**
- `wrangler.toml` is automatically generated with Workers-compatible format
- Uses `assets.directory = "./dist"` (Workers format) instead of `pages_build_output_dir` (Pages format)
- If you need bindings (KV, D1, vars, etc.), they can be added to `wrangler.toml` manually
- `public/_redirects` and `public/_headers` are auto-generated and cleaned up when switching away from Cloudflare
- Both `_redirects` and `_headers` files work natively with Workers static assets

**Cloudflare Workers Notes:**
- Workers supports static assets with the same features as Pages (redirects, headers, etc.)
- Workers has more features than Pages (Durable Objects, Cron Triggers, better observability)
- Workers uses `wrangler deploy` instead of `wrangler pages deploy`
- Both `_redirects` and `_headers` files work out of the box with Workers static assets

**Common Issues:**
- **PDF shows "Firefox Can't Open This Page"**: The server is blocking iframe embeds. Check that `X-Frame-Options: SAMEORIGIN` is set for PDF files.
- **Twitter widgets not loading**: Check browser console for CSP errors. Ensure `https://platform.twitter.com` is in both `script-src` and `frame-src` directives.

#### Platform Switching Behavior

When you change `deployment.platform` in `src/config.ts` and run `pnpm run build`, the system automatically:

**1. Cleans Up Platform-Specific Files:**
- **`public/_redirects` and `public/_headers`**: Automatically removed when switching away from `github-pages` or `cloudflare-workers`
  - These files are only needed for GitHub Pages and Cloudflare Workers
  - They're cleaned up when switching to Netlify or Vercel (which use their own config files)

**2. Preserves Custom Configuration Files:**
- **`netlify.toml`**: Never removed (may contain custom build settings, serverless functions, etc.)
- **`vercel.json`**: Never removed (may contain serverless functions, environment variables, etc.)
- **`wrangler.toml`**: Never removed (may contain bindings like KV, D1, environment variables, etc.)

**3. Generates New Platform Files:**
- **Netlify**: Creates/updates `netlify.toml` with redirects and build settings
- **Vercel**: Creates/updates `vercel.json` with redirects and headers (preserves existing custom settings)
- **GitHub Pages**: Creates `public/_redirects` and `public/_headers` (auto-generated, gitignored)
- **Cloudflare Workers**: Creates/updates `wrangler.toml` (Workers format) and `public/_redirects`/`_headers`

**Example Platform Switches:**

**Netlify → Vercel:**
- ✅ Removes `public/_redirects` and `public/_headers` (if they exist)
- ✅ Creates/updates `vercel.json` with redirects and headers
- ✅ Preserves `netlify.toml` (in case you switch back)
- ✅ Preserves `wrangler.toml` (if it exists)

**Vercel → GitHub Pages:**
- ✅ Removes `public/_redirects` and `public/_headers` (if they exist from previous switch)
- ✅ Creates new `public/_redirects` and `public/_headers` for GitHub Pages
- ✅ Preserves `vercel.json` and `netlify.toml` (in case you switch back)

**GitHub Pages → Cloudflare Workers:**
- ✅ Keeps `public/_redirects` and `public/_headers` (same format, just updates content)
- ✅ Creates/updates `wrangler.toml` with Workers-compatible format
- ✅ Copies `.assetsignore` to `dist/` (if template exists)

**Cloudflare Workers → Netlify:**
- ✅ Removes `public/_redirects` and `public/_headers`
- ✅ Creates/updates `netlify.toml` with redirects
- ✅ Preserves `wrangler.toml` (may contain custom bindings)

**Important Notes:**
- **No manual cleanup needed** - the script handles everything automatically
- **Custom settings preserved** - Your custom config in `netlify.toml`, `vercel.json`, or `wrangler.toml` won't be lost
- **Redirects always updated** - Redirect rules are regenerated for the new platform
- **Astro config redirects** - Only active in dev mode (instant HTTP redirects), empty in production builds

#### Migration from Environment Variables
The old environment variable approach is still supported for backward compatibility:
```bash
# Old way (still works)
DEPLOYMENT_PLATFORM=vercel pnpm run build

# New way (recommended)
# Just set platform in config.ts and run:
pnpm run build
```


## Version Management

### Theme Version System

The Astro Modular theme includes a comprehensive version management system that tracks the current theme version and displays it consistently across all build and development commands.

#### Version Display

**All pnpm commands now show the theme version:**
```bash
> astro-modular@0.1.0 dev C:\Users\david\Development\astro-modular
> astro-modular@0.1.0 build C:\Users\david\Development\astro-modular
> astro-modular@0.1.0 version C:\Users\david\Development\astro-modular
```

**Instead of the generic workspace version:**
```bash
# Old (generic)
> workspace@1.0.0 dev

# New (theme-specific)
> astro-modular@0.1.0 dev
```

#### Version Files

The version system uses multiple files to maintain consistency:

**Primary Version File:**
- **`VERSION`** - Contains the current version number (e.g., `0.1.0`)

**Package Configuration:**
- **`package.json`** - Updated with theme name (`astro-modular`) and version (`0.1.0`)

**Version Utility:**
- **`scripts/get-version.js`** - Provides version management functions

#### Version Commands

**Get Current Version:**
```bash
pnpm run version
# Output: 0.1.0
```

**Get Theme Identifier:**
```bash
node scripts/get-version.js
# Output: 0.1.0
```

#### Version Management Functions

The `scripts/get-version.js` utility provides several functions:

**`getThemeVersion()`** - Get current version from VERSION file or package.json
**`getThemeName()`** - Get theme name from package.json
**`getThemeIdentifier()`** - Get full identifier (name@version)
**`updateVersion(newVersion)`** - Update both VERSION file and package.json

#### Release Process

**For Maintainers (Creating Releases):**

1. **Update Version Files (Manual Process):**
   ```bash
   # Step 1: Update VERSION file
   echo "0.2.0" > VERSION

   # Step 2: Update package.json manually
   # Change "version": "0.1.0" to "version": "0.2.0"
   ```

   **Important**: Both files must be updated manually. The VERSION file is the source of truth, but package.json controls the terminal display.

2. **Create GitHub Release:**
   - Go to GitHub repository
   - Click "Releases" → "Create a new release"
   - Tag version: `v0.2.0` (with 'v' prefix)
   - Release title: `v0.2.0`
   - Description: List of changes
   - **Important**: Use "Source code (zip)" as the release asset (automatic)

3. **Publish Release:**
   - Click "Publish release"
   - GitHub automatically creates the source code zip
   - No additional files needed

#### Template vs Fork Detection

**Template Users:**
- See `astro-modular@0.1.0` in all commands
- Version stays at template version

**Fork Users:**
- See `astro-modular@0.1.0` in all commands
- Version can be updated manually via git

#### Version Display Examples

**Development Server:**
```bash
> astro-modular@0.1.0 dev C:\Users\david\Development\astro-modular
> cross-env ASTRO_CONTENT_COLLECTION_CACHE=false node scripts/setup-dev.mjs && node scripts/sync-images.js && node scripts/process-aliases.js && node scripts/generate-deployment-config.js && astro dev --host localhost --port 5000
```

**Build Process:**
```bash
> astro-modular@0.1.0 build C:\Users\david\Development\astro-modular
> node scripts/sync-images.js && node scripts/process-aliases.js && node scripts/generate-deployment-config.js && astro build
```

**Version Check:**
```bash
> astro-modular@0.1.0 version C:\Users\david\Development\astro-modular
> node scripts/get-version.js
0.1.0
```

#### Best Practices for AI Agents

**Version Management:**
- **Always check current version** before making changes
- **Use version commands** to verify theme version
- **Don't hardcode version numbers** - use the utility functions
- **Test version display** after making changes

**Release Process:**
- **Update VERSION file first** - this is the source of truth
- **Update package.json manually** - both files must be updated separately
- **Use semantic versioning** - follow semver conventions
- **Test version commands** before creating releases
- **No automatic sync** - version files don't sync automatically during dev/build

**User Experience:**
- **Version display is consistent** across all commands
- **Theme identification is clear** - users know which version they're using
- **Update process is transparent** - users see version changes
- **No confusion** between workspace and theme versions

## Configuration & Customization

### Core Configuration (`src/config.ts`)

The configuration is organized in logical sections for easy customization. For detailed setup instructions, see the [Getting Started Guide](src/content/posts/getting-started.md).

#### Site Information
```typescript
export const siteConfig = {
  site: 'https://yourdomain.com',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  language: 'en',
}
```

#### Theme & Layout Options
```typescript
theme: "oxygen",  // Available: Oxygen, Minimal, Atom, Ayu, Catppuccin, Charcoal, Dracula, Everforest, Flexoki, Gruvbox, macOS, Nord, Obsidian, Rosé Pine, Sky, Solarized, Things
availableThemes: "all",  // "all" or array like ["oxygen", "minimal", "nord"] to limit user choices
layout: {
  contentWidth: "45rem",
},
postsPerPage: 5,
```

#### Deployment Platform Configuration
```typescript
deployment: {
  platform: "netlify", // "netlify" | "vercel" | "github-pages" | "cloudflare-workers" - set once and forget!
}
```

**Deployment Platform Options:**
- **`"netlify"`** (default) - Generates `netlify.toml` with redirects and build settings
- **`"vercel"`** - Generates `vercel.json` with redirects and cache headers
- **`"github-pages"`** - Generates `public/_redirects` and `public/_headers` for GitHub Pages
- **`"cloudflare-workers"`** - Generates `wrangler.toml` (Workers-compatible config) and `public/_redirects`/`public/_headers` (redirects and headers)

**Note:** Cloudflare Workers uses `wrangler.toml` for deployment configuration, in addition to `_redirects` and `_headers` files. Workers supports static assets with the same features as Pages, plus additional capabilities like Durable Objects and Cron Triggers.

**Important:** Set this once in your config and the build process automatically generates the correct platform-specific configuration files. No environment variables needed!

#### Modular Features Configuration
```typescript
features: {
  readingTime: true,
  wordCount: true,
  tableOfContents: true,
  tags: true,
  linkedMentions: true,
  linkedMentionsCompact: false,
  scrollToTop: true,
  darkModeToggleButton: true,
  commandPalette: true,
  postNavigation: true,
  showSocialIconsInFooter: true,
  showPostCardCoverImages: "featured-and-posts", // See cover image options below
}
```

**Linked Mentions Features:**
- `linkedMentions: true` - Enable linked mentions section at the end of the page showing which posts reference the current post
- `linkedMentionsCompact: false` - Choose between detailed view (default) or compact view for linked mentions

#### Linked Mentions Excerpt Extraction Logic

**🚨 CRITICAL: Structural-Only Approach**

The Linked Mentions excerpt extraction logic uses **purely structural/syntax-based patterns** - **NEVER word or phrase matching**.

**Key Principles:**

1. **Markdown Cleanup (Structural Only)**:
   - Remove markdown syntax: code blocks (`` ``` ``), inline code (`` ` ``), bold (`**`), italic (`*`), headers (`#`), blockquotes (`>`), callouts (`> [!TYPE]`), horizontal rules (`---`), list markers (`-`, `1.`)
   - Remove structural patterns: orphaned labels ending with `:` (e.g., `Label:` at end), trailing colons/dashes
   - **NEVER match specific words or phrases** like "Further reading", "See also", "Start lines with", etc.
   - **ONLY use structural patterns** like `([A-Z][a-z]+):` to match any capitalized label, not specific label names

2. **Ellipsis Placement (Structural Detection)**:
   - **Detects natural endings** using structural patterns only:
     - Links as endings: `]]` (wikilink), `)` (markdown link), `</mark>` (processed link HTML)
     - Sentence endings: `.`, `!`, `?` (complete sentences)
     - Incomplete punctuation: `,`, `:`, `-`, `;` (suggesting truncation)
     - Letter endings: Ends with letter/word but no sentence punctuation (e.g., "or", "and" - detected structurally, not word-specific)
   - **NEVER check for specific phrases** like "Further reading", "See also", etc.
   - **NEVER match specific conjunctions** like "or", "and", "but" - instead check for letter endings without punctuation

3. **Link Processing**:
   - Processes standard markdown links FIRST, then wikilinks (prevents double-processing)
   - Handles incomplete/truncated links (e.g., `[Obsidian Vault...`) by detecting structural patterns
   - Highlights relevant links (matching target post) using slug comparison, not word matching

4. **Semantic HTML**:
   - Uses `div` elements for "Linked Mentions" heading and individual post titles (NOT `h2`/`h3` headings)
   - Maintains proper visual hierarchy without interfering with post heading structure

**Common Mistakes to Avoid:**
- ❌ **NEVER hardcode word/phrase patterns** like `/\bFurther reading|See also\b/i`
- ❌ **NEVER match specific words** like `/\b(or|and|but)\b/` - use structural letter-ending detection instead
- ❌ **NEVER remove specific phrases** like "Start lines with", "separate columns" - use structural label patterns
- ✅ **ALWAYS use structural patterns** like `/[.!?]\s*$/` (sentence endings), `/<\/mark>/i` (link endings)
- ✅ **ALWAYS check for syntax artifacts** like code blocks, markdown formatting, not content-specific text

#### Cover Image Options
- `"all"` - Show cover images everywhere
- `"featured"` - Show only on the featured post section and featured posts
- `"home"` - Show on homepage sections (featured and recent)
- `"posts"` - Show only on posts pages, tag pages, and post listings
- `"featured-and-posts"` - Show on featured post section AND posts pages/tags (but not recent posts section)
- `"none"` - Never show cover images

#### Homepage Content Options
The homepage content is now organized under the `homeOptions` section for better clarity and control:

```typescript
homeOptions: {
  featuredPost: {
    enabled: true,           // Show featured post on homepage
    type: "latest",          // "latest" or "featured"
    slug: "getting-started", // Only used when type is "featured"
  },
  recentPosts: {
    enabled: true,           // Show recent posts on homepage
    count: 7,                // Number of recent posts to show
  },
  projects: {
    enabled: false,          // Show featured projects on homepage
    count: 2,                // Number of projects to show
  },
  docs: {
    enabled: false,          // Show featured docs on homepage
    count: 3,                // Number of docs to show
  },
  blurb: {
    placement: "below",      // "above", "below", or "none"
  },
}
```

**Featured Post Configuration:**
- `enabled: true` - Show featured post section
- `type: "latest"` - Show the most recent post
- `type: "featured"` - Show a specific post by slug
- `slug: "post-name"` - Post slug (without `/posts/` prefix) when type is "featured"
- **Flexible Setup**: Slug can be present even when `type: "latest"` - it will be ignored until you switch to "featured"

**Recent Posts Configuration:**
- `enabled: true` - Show recent posts section
- `count: 7` - Number of recent posts to display
- **Smart Logic**: If featured post is shown, recent posts start from the second post

**Projects Configuration:**
- `enabled: true` - Show featured projects on homepage
- `count: 2` - Number of projects to display
- **Priority**: First tries to show projects with `featured: true` in frontmatter (up to count)
- **Fallback**: If no featured projects exist, shows the most recent projects (up to count)
- **No Content**: If no projects exist at all, shows nothing
- Includes "View all projects →" link

**Documentation Configuration:**
- `enabled: true` - Show featured docs on homepage
- `count: 3` - Number of docs to display
- **Priority**: First tries to show docs with `featured: true` in frontmatter (up to count)
- **Fallback**: If no featured docs exist, shows the most recent docs (up to count)
- **No Content**: If no docs exist at all, shows nothing
- Includes "View all docs →" link

**Home Blurb Configuration:**
- `placement: "above"` - Show at top of homepage
- `placement: "below"` - Show after content (default)
- `placement: "none"` - Disable completely
- **Blurb-Only Mode**: When no other content is enabled, blurb becomes the main page content with H1 title and page-like styling

**Homepage Order:**
1. Featured Post (if enabled)
2. Recent Posts (if enabled)
3. Featured Projects (if enabled)
4. Featured Documentation (if enabled)
5. Home Blurb (if enabled)

**Special Layout Logic:**
- **Single Content Type**: When only one content type is displayed, it gets special treatment with centered "View all" links instead of section titles
- **Blurb-Only Mode**: When only blurb content is shown, it displays as a proper page with H1 title and rounded container styling

**Homepage Layout Examples:**

**Show only recent posts:**
```typescript
homeOptions: {
  featuredPost: { enabled: false, type: "latest", slug: undefined },
  recentPosts: { enabled: true, count: 7 },
  projects: { enabled: false },
  docs: { enabled: false },
  blurb: { placement: "none" },
}
// Result: Special treatment - no "Recent Posts" title, centered "View all posts →"
```

**Show only projects:**
```typescript
homeOptions: {
  featuredPost: { enabled: false, type: "latest", slug: undefined },
  recentPosts: { enabled: false, count: 7 },
  projects: { enabled: true },
  docs: { enabled: false },
  blurb: { placement: "none" },
}
// Result: Special treatment - no "Projects" title, centered "View all projects →"
```

**Show only blurb content:**
```typescript
homeOptions: {
  featuredPost: { enabled: false, type: "latest", slug: undefined },
  recentPosts: { enabled: false, count: 7 },
  projects: { enabled: false },
  docs: { enabled: false },
  blurb: { placement: "below" },
}
// Result: Page-like layout with H1 title and rounded container
```

**Show multiple content types:**
```typescript
homeOptions: {
  featuredPost: { enabled: true, type: "latest", slug: undefined },
  recentPosts: { enabled: true, count: 7 },
  projects: { enabled: true },
  docs: { enabled: false },
  blurb: { placement: "below" },
}
// Result: Normal layout with section titles and right-aligned "View all" links
```

#### Post Card Aspect Ratio Configuration
Configure the aspect ratio for post card cover images:

```typescript
features: {
  postCardAspectRatio: "og", // Default: OpenGraph standard
  customAspectRatio: undefined, // For custom ratios
}
```

**Aspect Ratio Options:**
- `"og"` (1.91:1) - OpenGraph standard (default)
- `"16:9"` (1.78:1) - Standard widescreen
- `"4:3"` (1.33:1) - Traditional
- `"3:2"` (1.5:1) - Classic photography
- `"square"` (1:1) - Square
- `"golden"` (1.618:1) - Golden ratio
- `"custom"` - Use your own ratio

**Custom Aspect Ratio Example:**
```typescript
postCardAspectRatio: "custom",
customAspectRatio: "2.5/1" // Custom 2.5:1 ratio
```

**Important Notes for AI Agents:**
- This **only affects post cards** (listings, homepage, tag pages)
- **Individual post cover images** maintain their original aspect ratio
- The aspect ratio is applied via CSS `aspect-ratio` property
- Use the `getPostCardAspectRatio()` utility function to get the current ratio value

#### Navigation Configuration
```typescript
navigation: {
  showNavigation: true,
  style: 'traditional', // or 'minimal'
  showMobileMenu: true,
  pages: [
    { title: 'Posts', url: '/posts' },
    { title: 'About', url: '/about' }
  ],
  social: [
    { title: 'GitHub', url: 'https://github.com/username', icon: 'github' }
  ],
}
```

#### SEO Configuration
```typescript
seo: {
  defaultOgImageAlt: "Astro Modular logo.",
},
footer: {
  enabled: true,  // Set to false for minimal footer
  content: `© 2025 {author}. Built with Astro Modular.`,
}
```

#### Profile Picture Configuration
```typescript
profilePicture: {
  enabled: true,
  image: "/profile.jpg",        // Path to your image (place in public/ directory)
  alt: "Profile picture",       // Alt text for accessibility
  size: "md",                   // "sm" (32px), "md" (48px), or "lg" (64px)
  url: "/about",                // Optional URL to link to when clicked
  placement: "footer",          // "footer" or "header"
  style: "circle",              // "circle", "square", or "none"
}
```

**Profile Picture Features:**
- **Placement Options**: Header (replaces text logo) or Footer (above or aligned with content)
- **Style Options**: Circle (profile photos), Square (logo squares), None (horizontal logos/banners)
- **Footer Control**: When `footer.enabled: false`, profile picture aligns with social icons
- **Responsive**: Different layouts for mobile and desktop
- **Theme-Aware**: Styling adapts to all available themes

### Content Frontmatter Schemas

#### Posts Frontmatter
```yaml
---
title: "{{title}}"
date: {{date}}
description: ""
tags: []
image: ""
imageAlt: ""
imageOG: false
hideCoverImage: false
hideTOC: false
targetKeyword: ""
draft: true
---
```

#### Pages Frontmatter
```yaml
---
title: "{{title}}"
description: ""
hideCoverImage: false
hideTOC: false
noIndex: false
draft: false
---
```

### Projects

```yaml
---
title: "Cool Thing"
description: ""
date: 2025-01-15
categories: ["Web Development"]
repositoryUrl: "https://github.com/..."
demoUrl: "https://..."
status: "completed"         # any string — "completed", "in-progress", "On Hold", etc.
image: "cover.jpg"
imageAlt: ""
hideCoverImage: false
hideTOC: false
draft: false
featured: true              # show on homepage if homeOptions.projects.enabled
---
```

### Docs

```yaml
---
title: "Getting Started"
description: ""
category: "Setup"           # optional — missing categories fall into "Unsorted"
order: 1                    # sort order within category
lastModified: 2025-01-15
version: "1.0.0"
image: "hero.jpg"
hideCoverImage: false
hideTOC: false
draft: false
featured: true
---
```

---

## When in doubt

- **Read the existing pattern first.** Search the codebase before inventing.
- **Consult this file before guessing.** If something isn't documented here, that's
  a bug in this file — fix it after you figure it out.
- **Ask before doing anything destructive or large-scale.**
- **Test after Swup navigation.** Initial load is not enough. Navigate to a page,
  then to another, then back — confirm the feature still works.
- **Don't break the Obsidian-native experience.** Wikilinks, standard links,
  embeds, callouts, and tags must look and behave the same in Obsidian and on the
  live site.
- **Prefer configurability over hardcoding.** Astro Modular is a template — users
  customize everything.
