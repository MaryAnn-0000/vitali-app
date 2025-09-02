# Vitali — BMI Health Web App

A full-stack BMI tracking application built with React, Node.js, Express, and MySQL. Track your BMI over time and get personalized health recommendations.

## Features

- 🔐 **User Authentication**: Secure registration and login with JWT
- 📊 **BMI Calculator**: Calculate and store BMI measurements
- 📈 **BMI History**: Visualize your BMI trends over time with charts
- 💡 **Health Tips**: Personalized recommendations based on your BMI category
- 🎨 **Modern UI**: Clean, responsive design with TailwindCSS
- 🔒 **Protected Routes**: Secure access to user data

## Tech Stack

### Frontend
- React 19
- React Router DOM
- TailwindCSS
- Recharts (for data visualization)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (authentication)
- Bcrypt (password hashing)
- Express Validator

### Database
- MySQL

## Project Structure

```
vitali-app/
├── client/                 # React frontend
│   └── client/
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── contexts/   # React contexts
│       │   ├── services/   # API services
│       │   └── ...
│       └── ...
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── ...
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client/client
npm install
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE vitali;
```

2. Run the database schema:
```bash
cd server
mysql -u your_username -p vitali < database.sql
```

### 3. Environment Configuration

1. Create `.env` file in the `server` directory:
```bash
cd server
cp env.example .env
```

2. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=vitali
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client/client
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### BMI Management
- `POST /api/bmi` - Calculate and store BMI (protected)
- `GET /api/bmi/latest` - Get latest BMI (protected)
- `GET /api/bmi/history` - Get BMI history (protected)

## BMI Categories & Tips

- **Underweight** (BMI < 18.5): Focus on healthy weight gain
- **Healthy** (18.5 ≤ BMI < 25): Maintain current lifestyle
- **Overweight** (25 ≤ BMI < 30): Focus on weight management
- **Obese** (BMI ≥ 30): Seek professional guidance

## Demo Account

For testing purposes, you can use the demo account:
- Email: `demo@vitali.com`
- Password: `test123`

## Development

### Backend Development
```bash
cd server
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd client/client
npm run dev  # Start Vite dev server
```

### Building for Production
```bash
# Build frontend
cd client/client
npm run build

# Start production server
cd server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the repository.
