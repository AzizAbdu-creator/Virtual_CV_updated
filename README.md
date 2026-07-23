# Virtual CV / Personal Portfolio Website

A single-page, responsive personal portfolio site built with vanilla HTML, CSS, and JavaScript. It presents an interactive online résumé with a downloadable PDF version, smooth section navigation, and a light/dark theme toggle.

## ✨ Features

- **Single-page layout** with smooth-scroll navigation between sections: Home, About, Skills, Projects, Certificates, and Contact
- **Animated typewriter effect** on the hero/landing section
- **Light / dark mode toggle**, with the user's preference remembered between visits
- **Scroll-reveal animations** as sections enter the viewport
- **Downloadable CV**: a "Download CV" button that triggers an actual file download (rather than opening the PDF in-browser) using a Blob-based download method, with a graceful fallback
- **Modal pop-ups** for expanded project/certificate details
- **Responsive design** — adapts to desktop, tablet, and mobile screen sizes
- **Back-to-top button** and a toast notification component for lightweight UI feedback

## 🛠️ Built With

- HTML5
- CSS3 (custom properties for theming, Flexbox/Grid for layout)
- Vanilla JavaScript (no frameworks or build tools required)
- [Font Awesome](https://fontawesome.com/) for icons

## 🚀 Running Locally

Because the site uses a JavaScript-based download mechanism for the CV button, it needs to be served over `http://` rather than opened directly as a local `file://` page (browsers restrict forced downloads on file:// pages for security reasons).

**Option 1 — Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Option 2 — VS Code:**
Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

## 📦 Deployment

This is a static site, so it can be deployed to any static hosting provider, for example:
- GitHub Pages
- Netlify
- Vercel

Simply upload the project folder (or connect the repository) and the site will run as-is — no build step required.

## 📄 Customizing

To adapt this template for your own use:
1. Replace the content inside each `<section>` in `index.html` with your own information
2. Swap out the images in `Images/` with your own photos/logos
3. Replace `Aziz_Abdu_CV.pdf` with your own CV file, keeping the same filename or updating the `href`/`download` attributes on the Download CV button accordingly
4. Adjust colors and fonts via the CSS custom properties at the top of `style.css`

## 📜 License

This project is free to use and adapt for personal portfolio purposes.