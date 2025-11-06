# Café Fausse - Restaurant Website

A full-stack web application for Café Fausse, an authentic French bistro restaurant. Built with React frontend, Flask backend, and PostgreSQL database.

## 🍽️ Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Modern UI/UX**: Clean, elegant design with French bistro aesthetics
- **Navigation**: Smooth routing between pages with React Router
- **Interactive Components**: 
  - Reservation form with real-time validation
  - Newsletter signup with backend integration
  - Image gallery with lightbox functionality
  - Responsive navigation with mobile menu

### Backend (Flask)
- **RESTful API**: Clean API endpoints for all functionality
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **Reservation System**: Table management with availability checking
- **Newsletter Management**: Email subscription handling
- **Error Handling**: Comprehensive error responses and validation

### Pages
1. **Home**: Welcome page with restaurant overview and hero section
2. **Menu**: Categorized menu items with descriptions and prices
3. **Reservations**: Online booking system with form validation
4. **About Us**: Restaurant history, mission, and chef information
5. **Gallery**: Photo gallery with lightbox and customer reviews

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **CSS3**: Custom styling with Grid and Flexbox
- **Axios**: HTTP client for API calls

### Backend
- **Flask**: Python web framework
- **Flask-SQLAlchemy**: Database ORM
- **Flask-CORS**: Cross-origin resource sharing
- **PostgreSQL**: Relational database
- **Python-dotenv**: Environment variable management

### Development Tools
- **Git**: Version control
- **npm**: Package management for React
- **pip**: Python package management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Cafe_Fausse
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb cafe_fausse

# Run the schema
psql cafe_fausse < database/schema.sql
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from env_example.txt)
cp env_example.txt .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://username:password@localhost/cafe_fausse
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Quick Start (Recommended)

Use the startup scripts to launch both servers automatically:

**Windows:**
```bash
# CMD
scripts\start_dev.bat

# PowerShell
.\scripts\start_dev.ps1
```

**Linux/Mac:**
```bash
./scripts/start_dev.sh
```

### Manual Start

#### Start the Backend Server
```bash
cd backend
python app.py
```
The Flask server will start on `http://localhost:5000`

#### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The React app will start on `http://localhost:3000`

## 📊 Database Schema

### Customers Table
```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reservations Table
```sql
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number >= 1 AND table_number <= 30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Reservations
- **POST** `/api/reservations` - Create a new reservation
- **GET** `/api/reservations/check?time_slot=<timestamp>` - Check availability

### Newsletter
- **POST** `/api/newsletter` - Subscribe to newsletter

### Restaurant Info
- **GET** `/api/restaurant-info` - Get restaurant information
- **GET** `/api/menu` - Get menu items

### Example API Usage

#### Create Reservation
```javascript
const reservationData = {
  customer_name: "John Doe",
  email: "john@example.com",
  phone: "(202) 555-1234",
  time_slot: "2024-12-01T19:00:00Z",
  number_of_guests: 2,
  newsletter_signup: true
};

fetch('http://localhost:5000/api/reservations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(reservationData)
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🎨 Design Features

### Color Scheme
- **Primary Brown**: #8B4513 (Saddle Brown)
- **Secondary Brown**: #A0522D (Sienna)
- **Background**: #FAFAFA (Light Gray)
- **Text**: #333333 (Dark Gray)

### Typography
- **Primary Font**: Georgia, Times New Roman (serif)
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast ratios and readable fonts

### Components
- **Responsive Navigation**: Collapsible mobile menu
- **Form Validation**: Real-time client-side validation
- **Image Gallery**: Lightbox with navigation
- **Loading States**: User feedback during API calls

## 🧪 Testing

### Manual Testing Checklist
- [ ] Navigation works on all pages
- [ ] Forms validate input correctly
- [ ] Reservation system processes bookings
- [ ] Newsletter signup functions properly
- [ ] Responsive design works on mobile/tablet
- [ ] Images load correctly
- [ ] API endpoints respond properly

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
DATABASE_URL=postgresql://username:password@localhost/cafe_fausse
SECRET_KEY=your-secret-key-here
FLASK_ENV=development
FLASK_DEBUG=True
```

### Restaurant Configuration
Update restaurant information in `backend/app.py`:
- Restaurant name and address
- Business hours
- Contact information
- Menu items

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URLs to production endpoints

### Backend Deployment (Heroku/Railway)
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy Flask application
4. Run database migrations

## 📝 Project Structure

```
Cafe_Fausse/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.js          # Main app component
│   │   └── App.css         # Global styles
│   └── package.json
├── backend/                 # Flask application
│   ├── app.py              # Main Flask app
│   ├── models.py           # Database models
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   └── env_example.txt     # Environment variables template
├── database/               # Database files
│   └── schema.sql          # Database schema
├── Docs/                   # Documentation and images
└── README.md              # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the MSEE Web Application and Interface Design course.

## 👥 Team

- **Developer**: [Your Name]
- **Course**: MSEE Web Application and Interface Design
- **Institution**: [Your Institution]

## 📞 Support

For support or questions, please contact:
- Email: [your-email@example.com]
- Phone: (202) 555-4567

---

**Café Fausse** - Experience the timeless charm of authentic French bistro dining.
