import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <BookOpen className="w-6 h-6 text-primary" />
              <span>Online Book Borrowing Platform</span>
            </Link>
            <p className="text-sm opacity-80">
              Your digital gateway to endless knowledge. Discover, borrow, and explore 
              thousands of books from the comfort of your home.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-primary transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@libraryhub.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Library Street, Book City, BC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-content/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Online Book Borrowing Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
