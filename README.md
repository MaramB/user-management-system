# User Management System

This project is a simple role-based user management system built using **Angular**. It allows users to log in as either an **Admin** or a **User** and provides different functionality and views based on their role. The project also implements **localization** to support English and Arabic, allowing users to switch between the two languages dynamically.

## Features

- **Role-based access**: Admins can manage users (view, add, edit, delete) while users can view and update their profile.
- **Authentication**: Simple login system using static credentials with session-based authentication.
- **Dynamic Navigation**: Navigation changes based on the user's role.
- **Localization**: Support for English and Arabic languages, with the ability to switch between them.
- **Responsive Design**: The application is styled using **Bootstrap 5** to ensure a user-friendly and responsive UI.
- **Global Error Handling**: Errors are caught and handled globally to provide a smoother user experience.

## Installation

### Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Angular CLI](https://angular.io/cli)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/MaramB/user-management-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd user-management-system
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To run the project locally, use the following command:

```bash
ng serve
```

## Credentials

For testing the application, you can use the following static credentials:

### Admin Credentials
```bash
Email: admin@example.com
Password: admin123
```

### User Credentials
```bash
Email: user@example.com
Password: user123
```
