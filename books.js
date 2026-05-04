// For Pages Router: src/pages/api/books.js
// For App Router: src/app/api/books/route.js

import dbConnect from '../../lib/dbConnect';
import Book from '../../models/Book'; // Assuming you have a Mongoose model for books

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const books = await Book.find({}); // Fetch all books
        res.status(200).json({ success: true, data: books });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}