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
| GET    | `/posts/:postId`          | Get a single post              |

---

## 🔐 Authentication

| Method | Endpoint                          | Description                   |
|--------|-----------------------------------|-------------------------------|
| POST   | `/auth/users/register`            | Register a user               |
| POST   | `/auth/users/login`               | Login a user                  |
| POST   | `/auth/users/logout`              | Logout a user                 |

---

## 👤 Users

| Method | Endpoint                          | Description                                     |
|--------|-----------------------------------|-------------------------------------------------|
| GET    | `/users/me`                       | Get information about the currently logged user |
| DELETE | `/users`                          | Delete the currectly logged user                |
| PATCH  | `/users/author`                   | Update the users's author status                |

---

## 💬 Comments

| Method | Endpoint                                             | Description                  |
|--------|------------------------------------------------------|------------------------------|
| POST   | `/posts/:postId/comments`                            | Create a comment on a post   |
| PUT    | `/posts/:postId/comments/:commentId`                 | Update a comment             |
| DELETE | `/posts/:postId/comments/:commentId`                 | Delete a comment             |

---

## ❤️ Likes on Posts

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | `/posts/:postId/likes`      | Like a post                  |
| DELETE | `/posts/:postId/likes`      | Remove like from a post      |

---

## 👍 Likes on Comments

| Method | Endpoint                                                    | Description                  |
|--------|-------------------------------------------------------------|------------------------------|
| POST   | `/posts/:postId/comments/:commentId/likes`                  | Like a comment               |
| DELETE | `/posts/:postId/comments/:commentId/likes`                  | Remove like from a comment   |

