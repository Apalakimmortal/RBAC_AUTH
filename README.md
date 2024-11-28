# Role-Based Authentication and Authorization Control (RBAC)

## Description

This project implements **Role-Based Authentication and Authorization Control (RBAC)**. It features three distinct roles: **Client**, **Moderator**, and **Admin**. The Admin is the only role authorized to manage user roles and profiles of Clients and Moderators. Each role has specific access levels and views. The application provides:

- **Role-based access control** with distinct views for each role.
- **Admin-only features** for changing user roles and managing user profiles.
- Features such as **Login**, **Logout**, and **Registration**.
- Password hashing for secure authentication.

This project is built using **Node.js**, **Express.js**, **EJS**, **Passport**, and **MongoDB**.

## Features

- **Login Page**: Allows users to log into the system securely.
- **Logout Page**: Ends the session for logged-in users.
- **Register Page**: Enables new users to register.
- **Profile Page**: Displays the user's profile information.
- **Manage Users Page**: Admin-only view to manage and update user roles.

## Screenshots

<table>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/Apalakimmortal/RBAC_AUTH/blob/main/public/image/login.jpeg" alt="Login Page" width="5000"/>
      <p>Login Page</p>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/Apalakimmortal/RBAC_AUTH/blob/main/public/image/home_page.jpeg" alt="Logout Page" width="200"/>
      <p>HomePage</p>
    </td>
    <td style="text-align: center;">
      <img src="https://example.com/register.jpg" alt="Register Page" width="200"/>
      <p>Register Page</p>
    </td>
  </tr>
  <tr>
    <td style="text-align: center;">
      <img src="https://example.com/profile.jpg" alt="Profile Page" width="200"/>
      <p>Profile Page</p>
    </td>
    <td style="text-align: center;">
      <img src="https://example.com/manage-users.jpg" alt="Manage Users Page" width="200"/>
      <p>Manage Users Page</p>
    </td>
  </tr>
</table>

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Apalakimmortal/role-based-auth.git
    cd role-based-auth
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<your-database-uri>
    DB_NAME=your-database-name
    SESSION_SECRET=your-session-secret
    ADMIN_EMAIL=admin@example.com
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Node.js**: For building the backend server.
- **Express.js**: As the web framework.
- **EJS**: For templating dynamic views.
- **MongoDB**: For the database.
- **Passport.js**: For authentication and session management.
- **BCrypt**: For hashing passwords.

## Configuration

- `.env` file contains the following keys:
  - `PORT`: The port where the application will run.
  - `MONGODB_URI`: The URI for connecting to your MongoDB database.
  - `DB_NAME`: The name of the database.
  - `SESSION_SECRET`: Secret key for session management.
  - `ADMIN_EMAIL`: Email of the default admin.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to reach out to me at **apalakrajesh@gmail.com**.

---

Thank you for checking out this RBAC project! 🚀
