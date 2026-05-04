"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";

function UpdateProfileContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/get-session', {
          credentials: 'include',
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            setFormData({
              name: data.user.name || "",
              image: data.user.image || "",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Update user using BetterAuth API
      const res = await fetch('/api/auth/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
        }),
      });

      if (res.ok) {
        toast.success('Profile updated successfully!');
        router.refresh();
        router.push('/profile');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Back Button */}
        <Link href="/profile" className="btn btn-ghost mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Update Profile</h1>
              <p className="text-gray-500 mt-2">Update your personal information</p>
            </div>

            {/* Update Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo URL</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Enter your photo URL"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="btn btn-primary w-full"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Information"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <PrivateRoute>
      <UpdateProfileContent />
    </PrivateRoute>
  );
}
