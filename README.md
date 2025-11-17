# 🛡️ PassFort - Secure Password Manager

> A professional frontend showcase project demonstrating advanced JavaScript, modern CSS, semantic HTML, and practical cybersecurity implementation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-blue.svg)](https://www.w3.org/Style/CSS/)
[![Security](https://img.shields.io/badge/Security-AES--GCM-green.svg)](https://www.w3.org/TR/WebCryptoAPI/)

---

## 📋 Project Overview

**PassFort** is a complete, production-ready password management system built entirely with vanilla JavaScript, showcasing advanced frontend development skills and practical cybersecurity knowledge. This project demonstrates:

- ✅ **Advanced JavaScript:** ES6+ modules, async/await, Web Crypto API, IndexedDB
- ✅ **Modern CSS:** CSS Variables, Flexbox/Grid, responsive design, animations
- ✅ **Semantic HTML5:** Accessibility (ARIA), semantic structure, SEO-friendly
- ✅ **Cybersecurity:** AES-GCM encryption, SHA-256 hashing, entropy analysis, pattern detection
- ✅ **Professional Architecture:** Modular code, separation of concerns, scalable structure

---

## 🎯 Key Features

### 🔐 **1. Password Generator**
- **Cryptographically secure** random generation using `window.crypto.getRandomValues()`
- Customizable length (5-30 characters) and character sets (uppercase, numbers, symbols)
- **Real-time strength analysis** with entropy calculation (bits)
- Pattern detection (sequential numbers, repeated chars, common words, keyboard patterns)
- Visual strength meter with detailed feedback
- Show/hide password toggle for security
- One-click copy to clipboard with visual feedback

### 🗂️ **2. Password Manager (CRUD Operations)**
- **AES-GCM 256-bit encryption** for all stored passwords
- PIN-based authentication with SHA-256 key derivation
- Secure local storage using **IndexedDB** (browser-native database)
- Create, Read, Update, Delete operations for password entries
- Metadata tracking (site, username, notes, timestamps)
- Export to CSV with encrypted data decryption
- XSS protection with HTML escaping

### 🌓 **3. Modern UI/UX**
- **Fully responsive** design (mobile-first approach)
- Light/Dark theme toggle with localStorage persistence
- Smooth animations and transitions
- Professional color scheme with visual hierarchy
- Accessible design (ARIA labels, semantic HTML, keyboard navigation)
- Custom background images with overlay effects

---

## 🛠️ Technologies & Skills Demonstrated

### **Frontend Core**
| Technology | Implementation |
|------------|----------------|
| **JavaScript ES6+** | Modules, async/await, destructuring, arrow functions, template literals |
| **HTML5** | Semantic elements, ARIA attributes, form validation, accessibility |
| **CSS3** | Variables, Grid/Flexbox, animations, media queries, responsive design |

### **Advanced JavaScript**
| Feature | Usage |
|---------|-------|
| **Web Crypto API** | AES-GCM encryption, SHA-256 hashing, CSPRNG |
| **IndexedDB** | Local database for encrypted password storage |
| **ES6 Modules** | `import/export` for modular architecture |
| **Async Programming** | Promises, async/await for encryption operations |
| **DOM Manipulation** | Dynamic UI updates, event handling |

### **Cybersecurity Implementation**
| Security Feature | Details |
|------------------|---------|
| **Encryption** | AES-GCM 256-bit (Web Crypto API standard) |
| **Key Derivation** | SHA-256 hash from user PIN |
| **Random Generation** | `crypto.getRandomValues()` (CSPRNG) |
| **Entropy Analysis** | Mathematical calculation of password strength |
| **Pattern Detection** | Regex-based detection of weak patterns |
| **XSS Protection** | HTML escaping for user inputs |
| **Local-First** | No server transmission, all data stays in browser |

---

## 📁 Project Architect

```
passfort/
├── public/                   # Static HTML files and assets
│   ├── index.html
│   ├── generator.html
│   └── images/
├── src/
│   ├── styles/               # CSS files (global and per page)
│   ├── scripts/              # JS files (per page/component)
│   └── ...
├── README.md
```

---

## 🌐 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/passfort.git
   cd passfort
   ```

2. **Open the frontend:**
   - Open `public/index.html` in your browser for the main page.

---

## 🛠️ Technologies

- HTML5, CSS3 (custom properties, flex/grid, transitions, keyframes, **responsive design**)
- JavaScript (ES6+, modular, accessible)
- [Planned] React (for future migration)

---

## 🧑‍💻 Code Style & Best Practices

- **All code is commented** for clarity and maintainability.
- CSS and JS are modular, grouped by feature/page.
- **Responsive, mobile-first design** is prioritized throughout.
- Accessibility is considered (semantic HTML, ARIA, keyboard navigation).
- Uses CSS variables for easy theming and customization.
- Follows best practices for security and code organization.
- Professional file/folder structure for scalability and easy migration to frameworks.

---

## 📝 How It Works

*Custom Generator*
- Choose your options (length, uppercase, numbers, symbols).
- Click "Create password" to generate a secure password.
- Use the "Copy to clipboard" button to copy the password.

---

## 📸 Screenshots

- ![Main Page](screenshots/main_page.png)
- ![Password Generator](screenshots/generator.png)

---

## 🚀 Demo

- [Live Preview](https://example.com/passfort)

---

## 📝 Security Notes

- PassFort generates strong, unique passwords to protect your accounts.
- The password generator uses a combination of random and cryptographic methods.
- The password strength indicator provides professional color feedback.
- The copy-to-clipboard functionality is instant and secure.

---

## 🤝 Contributing

Contributions are welcome!  
- Fork the repo and create a feature branch.
- Add clear comments and follow the existing code style.
- Open a pull request with a clear description of your changes.

---

## 📜 License

MIT License

---

## 📧 Contact

For questions or suggestions, contact:  
**prosaleslzn@gmail.com** or **rosales.pablo1@icloud.com**
