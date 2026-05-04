import Link from "next/link";
import Image from "next/image";
import { BookOpen, Eye } from "lucide-react";

export default function BookCard({ book }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-64 overflow-hidden">
        <Image
          src={book?.image_url || "/placeholder-book.jpg"}
          alt={book?.title || "Book Image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <span className={`badge ${
            book?.category === 'Tech' ? 'badge-primary' :
            book?.category === 'Science' ? 'badge-secondary' :
            'badge-accent'
          }`}>
            {book.category}
          </span>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg line-clamp-1">{book?.title}</h2>
        <p className="text-sm text-gray-500">by {book?.author}</p>
        <p className="text-sm line-clamp-2 mt-2">{book?.description}</p>
        
        <div className="flex items-center gap-2 mt-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className={`text-sm ${
            book?.available_quantity > 0 ? 'text-success' : 'text-error'
          }`}>
            {book?.available_quantity > 0 
              ? `${book.available_quantity} copies available` 
              : 'Out of stock'}
          </span>
        </div>

        <div className="card-actions justify-end mt-4">
          {book?.id && (
            <Link 
              href={`/book/${book.id}`} 
              className="btn btn-primary btn-sm"
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
