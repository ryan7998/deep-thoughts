# Deep Thoughts

A modern social media application built with the MERN stack (MongoDB, Express.js, React, Node.js) and GraphQL. Users can share their thoughts, interact with others, and build their social network.

## Features

- 🔐 User Authentication

  - Secure login/signup with JWT
  - Protected routes
  - User profiles

- 💭 Thought Management

  - Create and share thoughts
  - Delete your own thoughts
  - View thoughts from other users
  - Real-time updates

- 💬 Social Features

  - Add friends
  - React to thoughts
  - View friend connections
  - Profile customization

- 🎨 Modern UI
  - Responsive design
  - Clean and intuitive interface
  - Tailwind CSS styling
  - Material UI components

## Tech Stack

### Frontend

- React
- Apollo Client
- GraphQL
- Tailwind CSS
- Material UI
- React Router

### Backend

- Node.js
- Express.js
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- JWT Authentication

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ryan7998/deep-thoughts.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

4. Seed the database (optional):

```bash
npm run seed
```

## Live Demo

Visit the live application: [Deep Thoughts](https://deepthoughts.onthis.website)

Demo credentials:

- Email: ryan7998@gmail.com
- Password: user1234

## Project Structure

```
deep-thoughts/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── App.js        # Main app component
│   └── public/           # Static files
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── models/           # Mongoose models
│   ├── schemas/          # GraphQL schemas
│   └── utils/            # Utility functions
└── package.json          # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contact

Ryan - [@ryan7998](https://github.com/ryan7998)

Project Link: [https://github.com/ryan7998/deep-thoughts](https://github.com/ryan7998/deep-thoughts)
