# LinkedIn-Mini

A lightweight LinkedIn-style social app built with **React (Vite)**, **Firebase (Auth + Firestore)**, and **Tailwind CSS**.  
Create an account, post updates, and view profiles all in a fast, responsive UI.

> **Live Demo:** [linkedin-mini-beta.vercel.app](https://linkedin-mini-beta.vercel.app/)

---

## Features

- Email & password **login/signup** (Firebase Authentication)
- **Public post feed** — real-time create/read with Firestore
- **Profile pages** — basic info with avatar placeholder
- **Responsive UI** using Tailwind CSS
- Clean folder structure with reusable components & hooks

---

## Technologies Used

- **Frontend:** React (Vite), JavaScript (JSX)
- **Backend-as-a-Service:** Firebase (Authentication, Firestore)
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

---

## Getting Started

### Clone & Install
```bash
git clone https://github.com/Jaswanth113/Linkedin-mini.git
cd Linkedin-mini
npm install
```

### Environment Variables

Create a `.env` file in the project root and add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Development Server
```bash
npm run dev
```