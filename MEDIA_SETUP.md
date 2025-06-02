# Media Slideshow Setup Guide

Your Sun Rot Studios website now includes a dynamic media slideshow that randomly cycles through images and videos in the center of your page.

## How to Add Your Own Media

### 1. Add Media Files

Place your images and videos in the `src/assets/media/` folder:

```
src/assets/media/
├── image1.jpg
├── image2.png
├── video1.mp4
├── video2.webm
└── ...
```

### 2. Update the Media Array

Edit the `mediaItems` array in `src/App.tsx`:

```typescript
const mediaItems = [
  // Images
  {
    src: "/src/assets/media/your-image1.jpg",
    type: "image",
    alt: "Description",
  },
  {
    src: "/src/assets/media/your-image2.png",
    type: "image",
    alt: "Description",
  },

  // Videos
  { src: "/src/assets/media/your-video1.mp4", type: "video" },
  { src: "/src/assets/media/your-video2.webm", type: "video" },

  // You can also use external URLs
  {
    src: "https://example.com/image.jpg",
    type: "image",
    alt: "External image",
  },
];
```

### 3. Supported Formats

**Images:**

- JPG/JPEG
- PNG
- WebP
- GIF
- SVG

**Videos:**

- MP4 (recommended)
- WebM
- OGV
- MOV (may have browser compatibility issues)

### 4. Customization Options

You can customize the slideshow behavior by modifying the props in `src/App.tsx`:

```typescript
<MediaSlideshow
  mediaItems={mediaItems}
  intervalMs={2000} // Change speed (milliseconds)
  className="w-full h-full"
/>
```

**Available options:**

- `intervalMs`: Time between transitions (default: 3000ms)
- `className`: CSS classes for styling

### 5. Tips for Best Results

- **File sizes:** Keep videos under 10MB for better performance
- **Dimensions:** Use consistent aspect ratios (the current container is 320x208px)
- **Video format:** MP4 with H.264 codec works best across browsers
- **Image optimization:** Compress images to reduce load times

### 6. Video Considerations

- Videos are automatically muted and set to loop
- Videos will auto-play when they appear in the slideshow
- For mobile compatibility, ensure videos are optimized

### 7. File Paths

When referencing files in the `src/assets/media/` folder, use the path:

```
/src/assets/media/filename.ext
```

The slideshow will:

- Randomly select the next media item
- Smoothly transition between items
- Show a small counter in the bottom-right corner
- Handle both images and videos seamlessly

## Example Setup

```typescript
const mediaItems = [
  {
    src: "/src/assets/media/studio-photo1.jpg",
    type: "image",
    alt: "Studio space",
  },
  { src: "/src/assets/media/event-video1.mp4", type: "video" },
  {
    src: "/src/assets/media/artwork1.png",
    type: "image",
    alt: "Digital art piece",
  },
  { src: "/src/assets/media/performance.mp4", type: "video" },
  {
    src: "/src/assets/media/underground-scene.jpg",
    type: "image",
    alt: "Underground event",
  },
];
```

This will create a dynamic, engaging background that reflects the experimental and artistic nature of Sun Rot Studios!
