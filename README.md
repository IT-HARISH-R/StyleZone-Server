stylezone-backend/
│
├── 📁 config/                # Config files (DB, environment, etc.)
│   └── db.js                # MongoDB connection setup
│
├── 📁 controllers/          # Business logic for routes
│   └── bookingController.js
│
├── 📁 models/               # Mongoose schemas
│   └── Booking.js
│
├── 📁 routes/               # API route definitions
│   └── bookingRoutes.js
│
├── 📁 utils/                # Utility functions
│   └── sendWhatsapp.js     # WhatsApp message logic (Twilio/wa.me)
│
├── 📁 middlewares/          # Custom middleware (error handling, validation)
│   └── errorMiddleware.js
│
├── .env                     # Environment variables
├── .gitignore
├── server.js                # Main server file
├── package.json
