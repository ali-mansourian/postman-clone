"# postman-clone" 
```markdown
// README.md
```

# 📬 API Client

A lightweight, browser‑based API client inspired by Postman.  
Send HTTP requests, organize them into collections, save history, and work with multiple tabs – all in a clean, dark‑mode‑friendly interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.2.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/vite-5.0.8-646CFF?logo=vite)

---

## ✨ Features

1. **HTTP Method Selection** – GET, POST, PUT, PATCH, DELETE and more.
2. **URL Input & Validation** – Ensures valid HTTP/HTTPS URLs before sending.
3. **Query Parameters** – Add, edit, remove key‑value pairs; the URL updates automatically.
4. **Request Headers** – Full control over custom headers (e.g., `Authorization`, `Content-Type`).
5. **Raw Body Editor** – Write raw text or JSON for POST/PUT/PATCH requests.
6. **Response Display** – Clear status code, response body, and error messages.
7. **Error Management** – User‑friendly alerts for network issues, invalid URLs, or unreachable servers.
8. **Clear All Fields** – One click resets the entire request form.
9. **Multi‑Tab Support** – Create, rename, and close independent request tabs.
10. **History** – Every sent request is saved automatically (browser `localStorage`).
11. **Collections** – Save frequently used requests into named collections.
12. **Import / Export** – Export collections to a JSON file and import them back.

**Bonus**
- 🌙 Dark mode toggle (persisted in `localStorage`)
- 📱 Responsive design – works on desktops and tablets

---

## 🛠️ Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React 18, TypeScript                |
| Build Tool     | Vite 5                              |
| Styling        | CSS (plain, with dark mode)         |
| State/Persistence | React hooks + `localStorage`     |
| HTTP Engine    | Browser `fetch` API                 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) and **npm** installed.  
  Download from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository** (or download the ZIP and extract it).
2. Open a terminal in the project folder:
   ```bash
   cd postman-clone
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit **http://localhost:5173**.

### Production Build

To create an optimised production build:
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
postman-clone/
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── App.tsx
    ├── App.css
    ├── types/
    │   └── index.ts
    ├── hooks/
    │   └── useLocalStorage.ts
    ├── utils/
    │   ├── validation.ts
    │   └── httpClient.ts
    └── components/
        ├── TabBar.tsx
        ├── TabBar.css
        ├── RequestPanel.tsx
        ├── RequestPanel.css
        ├── ResponsePanel.tsx
        ├── ResponsePanel.css
        ├── CollectionsSidebar.tsx
        ├── CollectionsSidebar.css
        ├── KeyValueEditor.tsx
        ├── KeyValueEditor.css
        ├── RawBodyEditor.tsx
        ├── RawBodyEditor.css
        ├── Settings.tsx
        └── Settings.css
```

---

## 📖 How to Use

1. **Create a new tab** – click `+ New Tab` to start a fresh request.
2. **Choose a method** and type a URL.
3. Add **query parameters** and **headers** using the key‑value editors.
4. Write a **request body** in the text area (if needed).
5. Click **Send** – the response appears below with the status code.
6. **Save** the request to a collection using the sidebar.
7. **Export** your collections as JSON and **import** them later.

All tabs, collections, and history are automatically saved to your browser’s `localStorage` – they survive page reloads and browser restarts.

---

## 🖼️ Screenshots

![Light Mode Screenshot](screenshots/light-mode.png)  
*Light mode – request panel and response*

![Dark Mode Screenshot](screenshots/dark-mode.png)  
*Dark mode – collections sidebar and tabs*

> Add your own screenshots to a `screenshots/` folder and reference them here.

---

## 📜 License

This project is open‑source and available under the **MIT License**.  
Feel free to use, modify, and distribute it as you wish.

---

## 🙌 Acknowledgements

- Built with [Vite](https://vitejs.dev) and [React](https://react.dev)
- Inspired by the functionality of Postman and similar API testing tools

---

Happy API testing! 🚀