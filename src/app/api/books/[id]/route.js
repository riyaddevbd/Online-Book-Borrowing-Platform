import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Book from '@/models/Book';

// GET /api/books/[id] - Get a single book
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    const book = await Book.findOne({ id });
    
    if (!book) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, book });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

// PUT /api/books/[id] - Update book (borrow functionality)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const { action } = await request.json();
    
    const book = await Book.findOne({ id });
    
    if (!book) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }
    
    if (action === 'borrow') {
      if (book.available_quantity <= 0) {
        return NextResponse.json(
          { success: false, message: 'Book is not available' },
          { status: 400 }
        );
      }
      
      book.available_quantity -= 1;
      await book.save();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Book borrowed successfully',
        book 
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update book' },
      { status: 500 }
    );
  }
}