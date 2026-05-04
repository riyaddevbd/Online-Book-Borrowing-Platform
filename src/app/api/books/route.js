import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';
import { booksData } from '@/lib/books-data';

// GET /api/books - Get all books
export async function GET(request) {
  try {
    await connectDB();
    
    // Check if books exist, if not seed them
    const count = await Book.countDocuments();
    if (count === 0 && booksData.length > 0) {
      await Book.insertMany(booksData);
    }
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    let booksQuery = Book.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      booksQuery = booksQuery.limit(parseInt(limit));
    }
    
    const books = await booksQuery;
    
    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
