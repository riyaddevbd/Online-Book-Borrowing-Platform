import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Story', 'Tech', 'Science'],
  },
  available_quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  image_url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
