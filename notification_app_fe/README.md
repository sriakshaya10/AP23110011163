
# Notifications Frontend

This is a responsive Next.js application for displaying notifications, built with Material UI. It features:

- All Notifications page
- Priority Notifications page (with limit and notification type filter)
- Distinction between new and viewed notifications
- Responsive design for desktop and mobile
- Robust error handling and clean UI

## Getting Started

1. Install dependencies:
	```sh
	npm install
	```
2. Run the development server:
	```sh
	npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API

Notifications are fetched from:
http://20.207.122.201/evaluation-service/notifications

Query parameters supported:
- `limit`
- `page`
- `notification_type`

## Styling

Material UI is used for all styling. No other CSS libraries are used.

---

This project was bootstrapped with Next.js and TypeScript.
