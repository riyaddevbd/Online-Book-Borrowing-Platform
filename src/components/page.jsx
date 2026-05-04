"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Settings, Calendar, Loader2 } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";

function ProfileContent() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/get-session', { credentials: 'include', cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          {/* Profile Header Background */}
          <div className="h-32 bg-primary w-full opacity-80"></div>
          
          <div className="card-body -mt-16 items-center text-center">
            {/* Avatar Section */}
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-2xl bg-base-100">
                {user.image ? (
                  <Image src={user.image} alt={user.name} width={128} height={128} className="object-cover" />
                ) : (
                  <div className="bg-primary/10 w-full h-full flex items-center justify-center text-primary">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mt-4 space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">{user.name || "Anonymous User"}</h1>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="divider my-6">Account Overview</div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl text-left">
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-lg text-primary"><User className="w-6 h-6" /></div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wider">Full Name</p><p className="font-semibold">{user.name}</p></div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                <div className="p-3 bg-primary/10 rounded-lg text-primary"><Mail className="w-6 h-6" /></div>
                <div><p className="text-xs text-gray-400 uppercase tracking-wider">Email Address</p><p className="font-semibold">{user.email}</p></div>
              </div>
            </div>

            {/* Actions */}
            <div className="card-actions mt-10">
              <Link href="/update-profile" className="btn btn-primary rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <PrivateRoute><ProfileContent /></PrivateRoute>;
}