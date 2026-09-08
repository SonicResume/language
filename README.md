# Noah Language

**AI-Powered Translation, Writing & Accessibility Platform**

Noah Language is an AI-powered language and writing platform designed to help users translate, improve, summarize, and transform written content across multiple languages.

The platform also includes accessibility-focused features such as Braille text conversion and voice interaction.

## 🌐 Live Application

**Website:** https://language.sonicresume.com

## ✨ Features

* 🌍 Multilingual translation
* ✍️ AI writing and rewriting
* 📝 Grammar improvement
* 📖 Text summarization
* 🎯 Tone adjustment
* 🔊 Voice input and output
* ⠿ Braille text conversion
* 🌎 Support for multiple languages
* ⚡ Modern React interface
* ☁️ Cloud-hosted backend
* 🔐 API-based AI processing

## 🛠️ Technology

### Frontend

* React
* TypeScript
* Vite
* React Router

### Backend

* Node.js
* Express
* Axios
* REST API

### AI

Noah Language connects to an AI language-processing backend for translation and writing assistance.

## ♿ Accessibility

Noah Language includes accessibility-oriented functionality, including Braille text conversion.

The current Braille feature converts text into Unicode Braille characters that can be displayed digitally and can serve as a foundation for compatibility with accessibility technologies and refreshable Braille displays.

## 📂 Project Structure

```text
noah-language/
├── src/
│   └── react-app/
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production application:

```bash
npm run build
```

## 🔌 API

The application communicates with a Node.js/Express backend.

Example AI request:

```http
POST /api/ai
Content-Type: application/json
```

Example request:

```json
{
  "text": "Hello",
  "tool": "translate",
  "language": "Spanish",
  "contentType": "translation"
}
```

## 🔒 Security

Do not commit:

* API keys
* Passwords
* Authentication tokens
* Private environment variables
* User data
* Production secrets

Use environment variables for sensitive configuration.

## 📜 License

**SonicResume Group Proprietary License**

Copyright © 2026 SonicResume Group. All rights reserved.

This repository is proprietary software. Viewing the source code does not grant permission to copy, modify, redistribute, resell, or commercially exploit the software without written permission from SonicResume Group.

See the `LICENSE` file for the complete terms.

## 💼 Commercial & Acquisition Inquiries

Noah Language is a proprietary software platform developed by **SonicResume Group**.

For commercial licensing, partnerships, investment, or acquisition inquiries, please contact SonicResume Group.

---

**© 2026 SonicResume Group. All rights reserved.**
