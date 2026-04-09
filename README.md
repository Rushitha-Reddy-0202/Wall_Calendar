# Wall Calendar – Interactive React Component

This project is a responsive wall calendar built using React + Tailwind CSS (Vite).
The goal was to recreate a physical wall calendar experience with modern UI and interactive features.

---

## 🚀 Features

* 📅 Custom calendar (no external libraries)
* 🔄 Month navigation with page flip animation
* 🎯 Day range selection (start → end)
* 📝 Notes system

  * Add notes for selected date range
  * Delete notes
  * Notes persist using localStorage
  * Supports overlapping and cross-month notes
* 🎨 Theme changes based on month (12 colors + 12 images)
* 📱 Fully responsive layout

  * Desktop → Image (left), Calendar (top right), Notes (bottom right)
  * Mobile → Image (top), Notes + Calendar side by side
* 📍 Current date highlighted
* 🔘 Floating navigation buttons (mobile friendly)

---

## 🧠 Approach

* Built calendar logic manually using JavaScript Date object
* Used a 35/42 cell grid system to handle 5-row and 6-row months
* Managed state using React hooks (`useState`, `useEffect`)
* Used Tailwind CSS for styling and responsiveness
* Created separate layout handling for mobile and desktop
* Implemented page flip animation using CSS keyframes

---

## 🛠 Tech Stack

* React (Vite)
* Tailwind CSS
* JavaScript (ES6)
* LocalStorage (for persistence)

---

## 📦 Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/wall-calendar.git
```

2. Navigate to project folder

```bash
cd wall-calendar
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

5. Open in browser

```bash
http://localhost:5173
```

---

## 🎥 Demo

👉 Add your Loom / YouTube link here

---

## 🌐 Live Demo (Optional)

👉 Add your Vercel / Netlify link here

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Layout.jsx
│   ├── Calendar.jsx
│   ├── Notes.jsx
│   ├── Image.jsx
│
├── themes.js
├── App.jsx
└── main.jsx
```

---

## ✨ Extra Features

* Smooth page flip animation for month change
* Theme-based UI color system
* Mobile-first interaction design
* Click outside to reset selection

---

## 🧩 Challenges Faced

* Handling correct calendar alignment for all months
* Managing 5-row vs 6-row layouts
* Making Tailwind work with dynamic theme classes (fixed using safelist)
* Creating realistic page flip animation
* Maintaining consistent UI across screen sizes

---

## 📌 Future Improvements

* Add holidays and events
* Drag selection for date range
* Dark mode
* Export notes

---

## 🙌 Author

* Name: Your Name
* GitHub: https://github.com/
