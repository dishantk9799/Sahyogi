# Sahyogi Backend Documentation

## Project Overview

Sahyogi is a developer/community platform backend built using the MERN
stack.

Backend architecture:

``` txt
Route → Controller → Service → Model
```

Current backend status:

✅ Authentication\
✅ User Profiles\
✅ Projects CRUD\
✅ Blogs CRUD\
✅ Follow / Unfollow\
✅ Like / Unlike\
✅ Save Projects\
✅ Dashboard APIs\
✅ Cloudinary Uploads\
✅ JWT Protected Routes\
✅ Validation Middleware

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT Authentication
-   Cloudinary
-   Multer
-   Cookie Parser

------------------------------------------------------------------------

## Folder Structure

``` txt
server/
└── src/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── service/
    ├── utils/
    ├── app.js
```

------------------------------------------------------------------------

## Setup

Install:

``` bash
npm install
```

Create `.env`

``` env
PORT=
MONGODB_URI=

JWT_SECRET=
CLIENT_URL=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run:

``` bash
npm run dev
```

------------------------------------------------------------------------

# Implemented APIs

## Auth APIs

``` txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Purpose: - Register user - Login user - Logout user - Get current user

------------------------------------------------------------------------

## User APIs

``` txt
GET  /api/user/profile/:username
PUT  /api/user/update-profile
POST /api/user/follow/:id
GET  /api/user/saved-projects
```

Features: - Update bio - Skills - Github - LinkedIn - Profile Image -
Banner Image - Follow users - Saved projects

------------------------------------------------------------------------

## Project APIs

``` txt
POST   /api/project/create
GET    /api/project/all
GET    /api/project/:id
PUT    /api/project/update/:id
DELETE /api/project/delete/:id
GET    /api/project/my-projects

POST   /api/project/like/:id
POST   /api/project/save/:id
```

Features: - Create project - Update project - Delete project - Like
project - Save project - Upload thumbnail

------------------------------------------------------------------------

## Blog APIs

``` txt
POST   /api/blog/create
GET    /api/blog/all
GET    /api/blog/:slug
PUT    /api/blog/update/:id
DELETE /api/blog/delete/:id

POST   /api/blog/like/:id
GET    /api/blog/my-blogs
```

Features: - Create blogs - Upload cover image - Like blogs -
Update/Delete blogs

------------------------------------------------------------------------

## Dashboard API

``` txt
GET /api/dashboard
```

Returns:

``` json
{
 "projects":0,
 "blogs":0,
 "followers":0,
 "following":0
}
```

------------------------------------------------------------------------

## Image Upload System

Cloudinary upload enabled for:

``` txt
User:
- profileImage
- bannerImage

Project:
- thumbnail

Blog:
- coverImage
```

Upload flow:

``` txt
Client
↓
multipart/form-data
↓
Multer
↓
Cloudinary
↓
MongoDB stores URL
```

------------------------------------------------------------------------

## Important Notes For Collaborators

1.  Use `form-data` for image uploads.
2.  Protected routes require JWT cookie.
3.  Follow architecture:

``` txt
Route → Controller → Service → Model
```

4.  Add new features using same structure.
5.  Never push `.env` to GitHub.

------------------------------------------------------------------------

## Current Backend Completion

Approx:

``` txt
Backend: ~90%
Frontend: Pending
```

Main remaining work: - Frontend integration - Notifications (optional) -
Testing - Deployment

------------------------------------------------------------------------

Maintainer: Dishant Kumawat
