
# Carousel Image Generator

A beautiful web application for creating social media carousel slides with an intuitive editor and PDF export functionality.

## Features

- **Visual Slide Editor**: Create and edit slides with a user-friendly interface
- **Two Slide Types**: 
  - Header slides (title only)
  - Content slides (title + description)
- **Live Preview**: See your slides in real-time as you edit
- **Navigation**: Browse through your slides with keyboard shortcuts or navigation buttons
- **PDF Export**: Export your entire carousel as a high-quality PDF
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Running the Application

1. This app runs as a static web application
2. Click the "Run" button in Replit to start the server
3. Open the preview to see your carousel generator

### Creating Your First Carousel

1. **Add Slides**: Click the "+ Add Slide" button to create new slides
2. **Edit Content**: 
   - Choose between "Header Slide" or "Content Slide" types
   - Fill in the title and content (for content slides)
3. **Preview**: Use the navigation arrows or click on slides to preview them
4. **Export**: Click "Export as PDF" to download your carousel

## Usage

### Slide Types

- **Header Slide**: Perfect for cover slides or section dividers with just a title
- **Content Slide**: Includes both title and content text for detailed information

### Navigation

- **Mouse**: Click on any slide in the editor to preview it
- **Keyboard Shortcuts**:
  - `←` / `→` Arrow keys: Navigate between slides
  - `Ctrl/Cmd + N`: Add new slide
  - `Ctrl/Cmd + E`: Export to PDF

### Customization

The slides use a beautiful gradient background (`carousel_bg.png`) and are optimized for social media sharing with:
- 1:1 aspect ratio (square format)
- High contrast white text with shadows
- Professional typography
- 800x800px export resolution

## Technical Details

### Built With

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No framework dependencies
- **jsPDF**: PDF generation
- **html2canvas**: HTML to image conversion

### File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Styles and responsive design
├── script.js           # Application logic
├── carousel_bg.png     # Background image for slides
└── favicon.svg         # App icon
```

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### PDF Export
- High-quality 300 DPI export
- Maintains design fidelity
- Each slide becomes a separate PDF page
- Automatic filename: `carousel-slides.pdf`

### Responsive Design
- Adapts to different screen sizes
- Mobile-optimized interface
- Touch-friendly navigation

### User Experience
- Auto-save functionality (edits are preserved during session)
- Visual feedback for active slides
- Smooth animations and transitions
- Keyboard accessibility

## Deployment

This app is designed to run on Replit's static hosting:

1. The app automatically serves on port 80
2. All assets are included in the repository
3. No build process required
4. Instant deployment with Replit's hosting

## Contributing

Feel free to enhance this carousel generator by:
- Adding more slide templates
- Implementing custom background options
- Adding image upload functionality
- Creating additional export formats

## License

This project is open source and available for educational and personal use.
