# Blog RESTful API

This is a RESTful API for a blogging platform that allows users to create, read, update, and delete blog posts. It also supports user authentication, comments, and likes on both posts and comments.

---

## 📌 Posts

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/posts`                  | Retrieve all posts             |
| POST   | `/posts`                  | Create a new post              |
| PATCH  | `/posts/:postId`          | Partially update a post        |
| DELETE | `/posts/:postId`          | Delete a post                  |
| GET    | `/posts/:postId`          | Get a single post   |

---

## 🔐 Authentication

| Method | Endpoint                          | Description                   |
|--------|-----------------------------------|-------------------------------|
| POST   | `/auth/users/register`            | Register a user               |
| POST   | `/auth/users/login`               | Login a user                  |
| POST   | `/auth/users/logout`              | Logout a user                 |
| GET    | `/auth/users/me`                  | Get current authenticated user's info |

---

## 💬 Comments

| Method | Endpoint                                             | Description                  |
|--------|------------------------------------------------------|------------------------------|
| POST   | `/posts/:postId/comments`                            | Create a comment on a post   |
| PUT    | `/posts/:postId/comments/:commentId`                 | Update a comment             |
| DELETE | `/posts/:postId/comments/:commentId`                 | Delete a comment             |
| GET    | `/posts/:postId/comments`                            | (Optional) Get all comments on a post |

---

## ❤️ Likes on Posts

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | `/posts/:postId/likes`      | Like a post                  |
| DELETE | `/posts/:postId/likes`      | Remove like from a post      |
| GET    | `/posts/:postId/likes`      | (Optional) Get all likes on a post |

---

## 👍 Likes on Comments

| Method | Endpoint                                                    | Description                  |
|--------|-------------------------------------------------------------|------------------------------|
| POST   | `/posts/:postId/comments/:commentId/likes`                  | Like a comment               |
| DELETE | `/posts/:postId/comments/:commentId/likes`                  | Remove like from a comment   |
| GET    | `/posts/:postId/comments/:commentId/likes`                  | (Optional) Get likes on a comment |

