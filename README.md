# E-Commerce App for Clothes

## Introduction
This is a backend project for an e-commerce application focused on clothing. The app is built using **Node.js** and **Express**, and it incorporates several modern tools and libraries to enhance functionality, including authentication, payment integration, and file uploads.

## Features
- User authentication with JWT
- Secure password storage using bcrypt
- File uploads managed with Cloudinary and Multer
- Payment gateways integrated with Razorpay and Stripe
- Data validation using Validator
- Seamless integration with MongoDB via Mongoose

## Technologies Used
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database

## Dependencies
```json
{
  "bcrypt": "^5.1.1",
  "cloudinary": "^2.5.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.9.3",
  "multer": "^1.4.5-lts.1",
  "nodemon": "^3.1.9",
  "razorpay": "^2.9.5",
  "stripe": "^17.5.0",
  "validator": "^13.12.0"
}
```
## Installation Guide

### Prerequisites
Before starting, make sure you have the following installed:
- **Node.js**: Download and install it from [Node.js Official Website](https://nodejs.org/).
- **Express**: Install it via npm using the command below.

### Steps to Install and Run the Application
1. **Clone the repository**  
   Clone the project to your local machine using Git:  
   ```bash
   git clone https://github.com/MostafaDarwish93/E-commerce-app-MERN-stack.git
   ```
2. ** Navigate to the Project Directory **
  Go to the folder where the project is stored:
```bash
 cd <project_directory>
```
3. **Install Dependencies**
   Use npm to install all required dependencies:
   ```bash
   npm install
   ```
4. **Set Up Environment Variables**
   Create a .env file in the project root
   ```plaintext
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_URL=<your_cloudinary_url>
    STRIPE_SECRET_KEY=<your_stripe_secret_key>
    RAZORPAY_KEY=<your_razorpay_key>
   ```
5. **Run the Application**
   Start the development server using the following command:
   ```bash
   npm run server
   ```
   

