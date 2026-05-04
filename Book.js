import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this book.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author for this book.'],
  },
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);