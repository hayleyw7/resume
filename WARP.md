# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a static personal resume/portfolio website built using the Photon template from HTML5 UP. The site is a single-page application showcasing professional experience, skills, and public recognition.

### Tech Stack
- **Frontend**: HTML5, CSS3/Sass, JavaScript (jQuery)
- **Template**: Photon by HTML5 UP (CCA 3.0 license)
- **Libraries**: jQuery, jQuery.scrolly, Font Awesome, Responsive Tools
- **Hosting**: Static site (likely GitHub Pages based on CNAME file)

## Development Commands

### Viewing the Site
```bash
# Open in default browser (macOS)
open index.html

# Or use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Testing Changes
No build process is required. Simply refresh the browser after making changes to HTML, CSS, or JS files.

## Code Architecture

### File Structure
```
├── index.html           # Main HTML file (entire site in one file)
├── assets/
│   ├── css/            # Compiled CSS
│   │   ├── main.css
│   │   ├── noscript.css
│   │   └── fontawesome-all.min.css
│   ├── sass/           # Sass source files (if modifying styles)
│   ├── js/             # JavaScript files
│   │   ├── main.js     # Custom responsive behavior
│   │   └── *.min.js    # Third-party libraries
│   └── webfonts/       # Font Awesome fonts
├── images/             # Profile images and social previews
└── CNAME               # Custom domain configuration
```

### Key Components

#### index.html
The entire site is contained in a single HTML file with these main sections:
- **Header** (`#header`): Hero section with name, title, and animated cloud/rain icons
- **Section One** (`#one`): Introduction and avatar
- **Section Two-B** (`#two-b`): Skills list (JavaScript, React, HTML/Sass, Ruby on Rails)
- **Section Two** (`#two`): Professional background and community impact
- **Section Three** (`#three`): Public recognition (awards, panels, interviews)
- **Footer** (`#footer`): Social media links (Twitter, GitHub, LinkedIn, Email)

#### assets/js/main.js
Handles responsive behavior and dynamic content:
- **Breakpoint definitions**: xlarge, large, medium, small, xsmall, xxsmall
- **Dynamic mobile styling**: Changes tagline text based on viewport size
- **Heading transformation**: On xsmall screens, merges h4 headings into paragraph text for better mobile readability
- **Smooth scrolling**: Uses scrolly plugin for navigation
- **Preload animation**: Removes 'is-preload' class after page load

### Responsive Design Philosophy
The site adapts content dynamically based on screen size:
- **xsmall (≤480px)**: Simplified tagline ("Full-Stack Software Engineer" only), h4 headings merged into paragraphs
- **small (481-736px)**: Simplified tagline only
- **medium+ (≥737px)**: Full tagline with all three roles separated by pipes

## Styling Guidelines

### CSS Organization
- Main styles are in `assets/css/main.css` (compiled from Sass)
- `noscript.css` provides fallback styling when JavaScript is disabled
- Custom styles follow the HTML5 UP Photon template conventions
- Font Awesome is used for all icons

### Sass Source
If modifying styles, work with files in `assets/sass/` and recompile to `assets/css/main.css` (Sass compilation setup not included in repo).

## Content Management

### Updating Text Content
All text lives in `index.html`. Key areas to update:
- **Name/Title**: Line 42-49 (header section)
- **Professional description**: Lines 66-67
- **Skills**: Lines 85-89
- **Background**: Lines 117-119
- **Recognition items**: Lines 136-241

### Adding New Recognition Items
Follow the existing pattern in section `#three`:
- Use Bootstrap-style grid classes (`col-4`, `col-6`, `col-12-medium`)
- Include h4 title, paragraph description, and button link
- Maintain semantic structure for accessibility

### Image Management
- Profile images: `images/me*.png`
- Favicon: `images/favicon.ico`
- Social preview: `images/preview4.png` (used in OpenGraph/Twitter meta tags)

## Testing Checklist

When making changes, test:
1. Desktop view (1920px+)
2. Tablet view (737-980px)
3. Mobile view (320-736px)
4. Mobile xsmall view (≤480px) - verify h4 heading transformation
5. Smooth scroll functionality on "Embark" button
6. All external links open in new tabs
7. Social media links in footer work correctly
8. Meta tags (OpenGraph, Twitter cards) for social sharing

## Accessibility Considerations

- All icon links include `aria-label` attributes
- Images use descriptive `alt` text
- Semantic HTML structure maintained
- Focus on mobile responsiveness for better UX
- No JavaScript fallback styles via `noscript.css`

## Deployment

This is a static site hosted via the custom domain specified in `CNAME` file. To deploy:
1. Make changes locally
2. Test in browser
3. Commit and push to repository
4. Changes automatically deploy (if using GitHub Pages or similar)

## Common Modifications

### Updating Social Links
Edit footer section (lines 246-251) to update or add social media profiles.

### Changing Skills List
Modify the unordered list at lines 85-89 in the `#two-b` section.

### Adjusting Breakpoints
Edit `assets/js/main.js` lines 8-15 to change responsive breakpoint definitions.

### Modifying Mobile Tagline Logic
Update the dynamic tagline logic in `assets/js/main.js` lines 28-67.
