# LearnHub – Online Learning Platform

A full-stack Learning Management System (LMS) built for real-time 
student-teacher interaction.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL
- **Auth:** Django Authentication System

## Features
- User registration and role-based authentication (Student / Teacher)
- Course creation and management
- Assignment submission and tracking
- Real-time communication between students and teachers
- Responsive UI for seamless experience across devices

## Project Structure
 LearnHub/

├── backend/       # Django app – models, views, APIs

├── frontend/      # HTML/CSS/JS UI

└── Documentation/ # Project docs and diagrams

## Setup Instructions
1. Clone the repo
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start server: `python manage.py runserver`
