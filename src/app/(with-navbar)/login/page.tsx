'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/shared/Container';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const loginFormSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    const userInfo = {
      email,
      password,
    };

    try {
      await axiosInstance.post('/users/login', userInfo);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(`An unexpected error occurred`, error);
      }
    }
  };

  return (
    <section className="bg-[linear-gradient(180deg,#fff_0%,#fff7fb_100%)] py-8 md:py-10 lg:py-12">
      <Container>
        <div className="overflow-hidden rounded-4xl border border-rose-100/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="grid min-h-190 grid-cols-1 lg:grid-cols-2">
            {/* LEFT — image panel */}
            <div className="relative hidden lg:block">
              <Image src="/assets/images/login_image.webp" alt="Giftly login visual" fill sizes="120" priority className="object-cover" />

              {/* overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.10)_0%,rgba(15,23,42,0.30)_45%,rgba(15,23,42,0.70)_100%)]" />

              {/* subtle glow */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(236,72,153,0.16),transparent)]" />

              {/* caption */}
              <div className="absolute bottom-10 left-10 right-10">
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                  Welcome Back
                </p>

                <h2 className="mt-5 text-4xl font-bold leading-tight text-white drop-shadow-lg xl:text-5xl">
                  Sign in and keep gifting smarter.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-white/75 xl:text-base">
                  Pick up where you left off and discover thoughtful gifts for every moment that matters.
                </p>
              </div>
            </div>

            {/* RIGHT — form panel */}
            <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-8 md:px-10 lg:px-14">
              <div className="w-full max-w-md">
                {/* logo */}
                <Link href="/" className="inline-block">
                  <Image src="/assets/logo/logo-dark.svg" alt="Giftly" width={118} height={42} className="w-24 h-auto mb-8" />
                </Link>

                {/* heading */}
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">Sign in</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Welcome back</h1>
                  <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                    Sign in to your Giftly account and continue your gifting journey.
                  </p>
                </div>

                {/* Google button */}
                <button
                  type="button"
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-rose-200 hover:bg-rose-50/50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* divider */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium text-slate-400">or continue with</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* form */}
                <form onSubmit={handleSubmit(loginFormSubmit)} className="space-y-4">
                  {/* email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register('email', { required: 'Email is required' })}
                      className={`w-full rounded-2xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* password */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                          },
                        })}
                        className={`w-full rounded-2xl border bg-slate-50 px-4 py-3.5 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 ${
                          errors.password ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* remember me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30" />
                      Remember me
                    </label>
                  </div>

                  {/* submit */}
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(236,72,153,0.22)] transition-all duration-200 hover:brightness-95 cursor-pointer"
                  >
                    Log In
                  </button>
                </form>

                {/* register link */}
                <p className="mt-6 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="font-semibold text-primary hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
