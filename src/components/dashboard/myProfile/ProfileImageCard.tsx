import { User } from '@/hooks/useAuth';
import { axiosInstance } from '@/lib/axios';
import { uploadImageToImgbb } from '@/lib/imgbb';
import { Camera, ShieldCheck, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type ProfileImageCardProps = {
  user: User | null;
};

const ProfileImageCard = ({ user }: ProfileImageCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleProfileImageUpdate = async () => {
    if (!selectedImageFile) {
      toast.error('Please select an image first.');
      return;
    }

    const loadingToast = toast.loading('Updating profile image...');

    try {
      const profileImage = await uploadImageToImgbb(selectedImageFile);

      await axiosInstance.patch('/users/me/profile-image', { profileImage });

      toast.success('Profile image updated successfully!', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to update profile image. Please try again.', { id: loadingToast });
    }
  };
  return (
    <>
      {/* profile image */}
      <div className="relative">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-primary via-secondary to-accent text-3xl font-bold text-white shadow-lg shadow-rose-200/50 md:h-32 md:w-32">
          {previewImage ? (
            <Image src={previewImage} alt="Preview Image" width={128} height={128} className="h-full w-full object-cover" />
          ) : user?.profileImage ? (
            <Image src={user.profileImage} alt="Profile Image" width={128} height={128} className="h-full w-full object-cover" />
          ) : (
            <span>{user?.name?.charAt(0)}</span>
          )}
        </div>

        <label
          htmlFor="profile-image"
          className="absolute -bottom-1 -right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-secondary bg-white text-primary shadow-md transition hover:bg-rose-50"
        >
          <Camera className="h-4 w-4" />
        </label>

        <input
          id="profile-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setSelectedImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
          }}
        />
      </div>

      {/* user info */}
      <h2 className="mt-4 text-xl font-semibold text-slate-900">{user?.name}</h2>
      <p className="mt-1 text-sm text-slate-500">Giftly Account</p>

      {/* image update */}
      <button
        type="button"
        onClick={handleProfileImageUpdate}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200/50 transition hover:scale-[1.01] cursor-pointer"
      >
        <UploadCloud className="h-4 w-4" />
        Update Profile Image
      </button>

      {/* account status */}
      <div className="mt-6 w-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Account Status</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>

          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>
      </div>

      {/* stats */}
      <div className="mt-4 grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Orders</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">12</h3>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Member Since</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">2026</h3>
        </div>
      </div>
    </>
  );
};

export default ProfileImageCard;
