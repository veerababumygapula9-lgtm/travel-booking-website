# Travel Booking Website

A responsive React + Vite travel booking demo with searchable destinations, package details, validated booking forms, live price totals, and localStorage-backed bookings.

## Requirements
- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Run locally
Open a terminal in this project folder and run:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Features
- Responsive Home page with popular destinations and featured packages
- Destinations search, category filter, budget filter, sort, reset, and empty state
- Package detail pages with itinerary and inclusions
- Booking form validation for name, email, phone, date, and terms
- Traveler quantity control and automatic total price calculation
- Confirmation screen with booking reference
- My Bookings page persisted in browser localStorage
- Remove saved booking with confirmation dialog
- React Router routes and mobile navigation
- No backend or payment integration (mock/demo only)

## Routes
- `/`
- `/destinations`
- `/packages/:id`
- `/book/:id`
- `/bookings`

## Manual verification checklist

After starting the app with `npm run dev`, test these flows in the browser:

1. Home: check the navigation, popular destination cards, featured packages, and footer.
2. Destinations: search for `Bali`, select an experience category, change the budget, sort by price, and reset filters.
3. Package details: open a package and check the itinerary, inclusions, and Book this trip button.
4. Booking: submit the form empty to check validation, then enter valid details, select a future date, change traveler count, accept the terms, and confirm.
5. My Bookings: check that the new booking appears, refresh the page, then verify it remains. Test Remove booking and its confirmation dialog.
6. Responsive layout: use browser device emulation at 360px, 375px, 390px, and 768px. Check for horizontal scrolling and clipped buttons.
7. Production build: run `npm run build` and confirm it completes without errors.

## Deploy to Netlify
1. Push this folder to a GitHub repository.
2. In Netlify choose **Add new site → Import an existing project**.
3. Connect the repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

`public/_redirects` is included so direct navigation to React Router pages works.

## Deploy to Vercel
1. Import the GitHub repository in Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

## GitHub
Create an empty repository on GitHub, then run these commands in the project folder (replace the URL with your own repository URL):

```bash
git init
git add .
git commit -m "Build Wayfarer travel booking website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Notes
- Package photos are loaded from Unsplash and require an internet connection.
- Bookings are saved only in the current browser's localStorage. They do not sync between devices or browsers.
- This is a portfolio/demo project; no actual payment or travel reservation is processed.
