"use client";

import { BookOpen, Cpu, FlaskConical, Library } from "lucide-react";

const categories = [
  { id: "All", name: "All Categories", icon: Library },
  { id: "Story", name: "Story Books", icon: BookOpen },
  { id: "Tech", name: "Technology", icon: Cpu },
  { id: "Science", name: "Science", icon: FlaskConical },
];

export default function CategorySidebar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Categories</h2>
        <ul className="menu menu-vertical gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <li key={category.id}>
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex items-center gap-3 ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
