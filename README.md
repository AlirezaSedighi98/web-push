Web Push Notifications Demo

This repository demonstrates a simple implementation of the web-push npm package with both frontend and backend components.

The project shows how to:
	•	Request notification permission in the browser
	•	Subscribe users to push notifications
	•	Store and manage push subscriptions on the server
	•	Send push notifications from the backend to the client

⸻

Tech Stack

Frontend
	•	JavaScript / TypeScript
	•	Service Workers
	•	Web Push API

Backend
	•	Node.js
	•	Express
	•	web-push (npm package)

⸻

Project Structure

root/              # Backend API for push notifications
├── client/        # Frontend application
├── README.md


⸻

Setup

1. Clone the repository

git clone https://github.com/AlirezaSedighi98/web-push.git
cd your-repo-name

2. Install dependencies

npm install


⸻

Configuration

Generate VAPID Keys

Generate VAPID keys using the web-push CLI:

npx web-push generate-vapid-keys

This will output a public key and a private key.

⸻

Environment Variables

Create a .env file in the project root and add the generated keys:

VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key


⸻

Frontend Configuration

Copy the VAPID public key and place it in the frontend utilities file. This key is required to create the push subscription in the browser.

⸻

Backend Configuration

The backend does not use a folder-based routing structure. All push notification logic is handled directly in the root.

The backend reads the VAPID keys directly from the .env file and uses them to:
	•	Configure the web-push library
	•	Send notifications to subscribed clients

Ensure your environment variables are loaded correctly before starting the server.

⸻

Make sure the public key is shared with the frontend and the private key remains only on the backend.

⸻

Running the Project

Start the backend

node index.js

Start the frontend

http://localhost:3000

Open the frontend in your browser and allow notifications when prompted.

⸻

Notes
	•	Push notifications require HTTPS (except for localhost).
	•	Service workers must be correctly registered for notifications to work.
	•	This project is intended for learning and demonstration purposes.

⸻

License

MIT