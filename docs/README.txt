NOAH COMMERCE

========================
SETUP
========================

1. Install dependencies

npm install


========================
BACKEND (API)
========================

Start backend (port 3002)

cd backend
node server.js

OR with PM2:

pm2 start server.js --name backend-commerce


========================
FRONTEND (DEV)
========================

Start frontend

npm run dev

Local:
http://localhost:5175


========================
FRONTEND (PRODUCTION)
========================

Build frontend

npm run build

Serve frontend

npx serve -s dist -l 4176

OR with PM2:

pm2 start "npx serve -s dist -l 4176" --name commerce


========================
PM2 COMMANDS
========================

Start:
pm2 start server.js --name backend-commerce
pm2 start "npx serve -s dist -l 4176" --name commerce

Restart:
pm2 restart all

Stop:
pm2 delete backend-commerce
pm2 delete commerce

List:
pm2 list


========================
API ENDPOINTS
========================

Health:
GET http://localhost:3002/api/health

Stripe Checkout:
POST http://localhost:3002/api/pay

Contact:
POST http://localhost:3002/api/contact


========================
PORTS
========================

Frontend (dev): 5175
Frontend (prod): 4176
Backend: 3002


========================
NOTES
========================

- Stripe payments enabled
- Backend must run before frontend
- Use http://localhost:3002 for ALL API calls
- Only ONE PM2 process per frontend

========================
DONE
========================