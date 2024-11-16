# Contact Management CRM

A modern, full-stack contact management system built with React, Node.js, and MongoDB. This application provides a clean, intuitive interface for managing contacts with features like sorting, pagination, and real-time validation.


## Features

- ✨ Beautiful, responsive UI built with Tailwind CSS
- 📱 Mobile-friendly design
- 🔍 Sortable columns for easy data organization
- 📄 Pagination for handling large contact lists
- ✏️ Real-time form validation
- 🚀 Fast and reliable MongoDB backend
- 🛡️ Type-safe with TypeScript
- 🎯 Zod validation for API endpoints

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - Vite

- **Backend:**
  - Node.js
  - Express
  - MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/contact-management-crm.git
cd contact-management-crm
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory:
\`\`\`env
MONGODB_URI="mongodb://localhost:27017/contact_crm"
PORT=3000
\`\`\`

4. Start the development server:
\`\`\`bash
# Start the backend server
npm run server

# In a new terminal, start the frontend
npm run dev
\`\`\`

## API Endpoints

- \`GET /api/contacts\`: Fetch all contacts
- \`POST /api/contacts\`: Create a new contact
- \`PUT /api/contacts/:id\`: Update an existing contact
- \`DELETE /api/contacts/:id\`: Delete a contact

## Features

### Contact Management

- Create new contacts with validation
- View all contacts in a sortable table
- Update existing contact information
- Delete unwanted contacts
- Pagination for large contact lists


## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev) for beautiful icons
- [MongoDB](https://www.mongodb.com) for the database
- [Vite](https://vitejs.dev) for the build tool
