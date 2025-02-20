# MkBook

MkBook is a social media platform built using Laravel and Vue.js. The goal is to provide a platform for sharing thoughts, writing, and reading posts. Users can create their community, follow others, and share various types of content.

## Features
- **User Authentication**: Users can log in or register.
- **User Profiles**: Users can set up and update their profiles.
- **Post Management**: Users can create, edit, and delete their posts.
- **Follow System**: Allows users to follow other users and view their content.
- **Real-time Notifications**: Receive updates on activities in real time.
- **Responsive Design**: The website is user-friendly and accessible on both mobile and desktop.

## Tech Stack

- **Frontend**: Vue.js
- **Backend**: Laravel
- **Database**: MySQL
- **CSS Framework**: Tailwind CSS
- **Real-time Communication**: Laravel Echo (using Pusher)
- **Authentication**: Laravel Breeze

## Setup

1. **Clone the Project**:
   
  [ https://github.com/mikekwizera/mkbook-social-media-website.git ]
  

### 2.  Install Dependencies:

For PHP dependencies:
```bash
composer install
```
For JavaScript dependencies:
```bash
npm install
```
### 3.  Environment Configuration:

Copy .env.example to .env:
```bash
cp .env.example .env
```
Set up your database in the .env file.
Generate the application key:
```bash
php artisan key:generate
```

### 4.  Run Migrations:

```bash
php artisan migrate
```

### 5.   Development Server:

Start the backend server:
```bash
php artisan serve
```

Start the frontend server:
```bash
npm run dev
```

#### 6. Run migrations

```bash
php artisan migrate
```
