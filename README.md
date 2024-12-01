# Admin Panel

A full-stack admin panel application built with Vue 3 and Django, featuring PostgreSQL database management and Tailwind CSS for styling.

## Features

- View and manage database entries
- Search functionality
- Create, Read, Update, and Delete (CRUD) operations
- Responsive design with Tailwind CSS
- RESTful API backend
- PostgreSQL database integration

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- pip (Python package manager)
- npm (Node package manager)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
# Windows
python -m venv venv
source venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file in backend directory with your database credentials:
```env
PGDATABASE=your_database_name
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGHOST=localhost
PGPORT=5432
```

5. Apply migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Run the development server:
```bash
python manage.py runserver
```
Backend will be available at `http://localhost:8000`

### Backend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```
Frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/items/` - List all items
- `POST /api/items/` - Create a new item
- `GET /api/items/{id}/` - Retrieve an item
- `PUT /api/items/{id}/` - Update an item
- `DELETE /api/items/{id}/` - Delete an item

## Environment Variables

### Backend `.env`

```env
# Django settings
DEBUG=True
SECRET_KEY=your_django_secret_key
ALLOWED_HOSTS=localhost,127.0.0.1,.vercel.app

# CORS settings
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.vercel.app

# Database settings
PGDATABASE=your_database_name
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGHOST=localhost
PGPORT=5432
```
### Frontend `.env.production`
```bash
VITE_API_URL=https://your-api-url/api
```

## License

[MIT License](https://opensource.org/license/mit)