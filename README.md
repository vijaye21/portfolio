# Vijay E — QA Engineer Portfolio

A premium 3D interactive portfolio built with React, Three.js, and Framer Motion.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or download the project
cd Portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   └── Vijay_E_QA_Resume.pdf   ← Place your resume PDF here
├── src/
│   ├── components/
│   │   ├── three/
│   │   │   └── HeroCanvas.tsx  ← 3D hero scene
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Workflow.tsx
│   │   ├── Certifications.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── BackToTop.tsx
│   ├── data/
│   │   └── portfolioData.ts    ← ✏️ Edit all portfolio content here
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── package.json
```

---

## ✏️ How to Update Your Content

All portfolio content lives in **one file**: `src/data/portfolioData.ts`

### Update Personal Info
```ts
export const personalInfo = {
  name: "Vijay E",
  email: "your@email.com",
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  resumeUrl: "/Vijay_E_QA_Resume.pdf",  // must be in /public folder
};
```

### Add Your Resume
Place your resume PDF in the `public/` folder:
```
public/Vijay_E_QA_Resume.pdf
```

### Update Education (School Details)
Find the placeholder entries and replace them:
```ts
{
  degree: "Higher Secondary Certificate (HSC)",
  institution: "Your School Name",   // ← Edit this
  period: "2019 – 2021",             // ← Edit this
  grade: "Percentage: 85%",          // ← Edit this
},
```

### Add Certificate Verify Links
```ts
{
  title: "Software Testing",
  verifyUrl: "https://coursera.org/verify/YOUR_CERT_ID",
}
```

### Add Project Details
Replace the case study templates with your real project information in the `projects` array.

---

## 📧 Enable the Contact Form

The contact form currently validates but **does not send emails** (no backend configured). To enable email:

### Option 1 — Formspree (easiest, free)
1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. In `Contact.tsx`, replace the `handleSubmit` function with a fetch to Formspree:
```ts
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

### Option 2 — EmailJS (client-side, free tier)
See [emailjs.com/docs](https://www.emailjs.com/docs/) for setup.

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

### GitHub Pages
```bash
npm install gh-pages --save-dev
```
Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
Add to `vite.config.ts`:
```ts
base: '/your-repo-name/',
```
Then run:
```bash
npm run deploy
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + Vite 8 | UI framework and build tool |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility styling |
| Three.js + React Three Fiber | 3D rendering |
| @react-three/drei | 3D helpers (Stars, Float, etc.) |
| Framer Motion | UI animations |
| Lucide React | Icons |

---

## 📝 License

This portfolio is for personal use by Vijay E. Feel free to adapt it.
