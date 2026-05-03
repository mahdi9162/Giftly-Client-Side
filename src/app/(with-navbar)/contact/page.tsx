'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone, Send, Clock3, MessageSquareMore } from 'lucide-react';
import Container from '@/components/shared/Container';
import { useStoreSettings } from '@/hooks/useStoreSettings';

type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage = () => {
  const { store } = useStoreSettings();
  console.log(store);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    console.log('Contact Form Data:', data);

    toast.success('Your message has been sent successfully!');
    reset();
  };

  return (
    <section className="bg-linear-to-br from-rose-50 via-orange-50/40 to-violet-50/50">
      <Container>
        <div className="px-4 py-12 md:px-6 md:py-16">
          {/* Hero */}
          <div className="overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br from-primary/10 via-white to-accent/10 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
                  <MessageSquareMore className="size-4" />
                  Contact Giftly
                </div>

                <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                  Let’s talk about your next gift experience.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  Have a question, need support, or want to share an idea? Send us a message and we’ll get back to you as soon as possible.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                      <Mail className="size-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Email Us</p>
                    <p className="mt-1 text-sm text-slate-600">{store?.supportEmail}</p>
                  </div>

                  <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-secondary/12 text-secondary">
                      <Phone className="size-5" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">Call Us</p>
                    <p className="mt-1 text-sm text-slate-600">{store?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Quick Info</p>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Office Address</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{store?.address}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-secondary shadow-sm">
                      <Clock3 className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Working Hours</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-accent shadow-sm">
                      <MessageSquareMore className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Response Time</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">We usually respond within 24 hours on business days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)] backdrop-blur md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Why Contact Us</p>

              <h2 className="mt-4 text-2xl font-black text-slate-900 md:text-3xl">We’re here to help you make gifting easier.</h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                Whether you need support with orders, product questions, or personalized gifting guidance, our team is ready to assist.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="font-bold text-slate-900">Order Support</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Need help with your purchase, shipping, or delivery status? Reach out anytime.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="font-bold text-slate-900">Product Questions</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Want more details before buying? We can help you choose the perfect item.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="font-bold text-slate-900">Partnership & Ideas</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Have a collaboration idea or want to suggest something new? We’d love to hear it.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur md:p-8">
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Send Message</p>
                <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">Get in touch with us</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">Fill out the form below and we’ll reply as soon as we can.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: {
                        value: 3,
                        message: 'Name must be at least 3 characters',
                      },
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  />
                  {errors.fullName && <p className="mt-2 text-sm font-medium text-rose-500">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  />
                  {errors.email && <p className="mt-2 text-sm font-medium text-rose-500">{errors.email.message}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: {
                        value: 5,
                        message: 'Subject must be at least 5 characters',
                      },
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10"
                  />
                  {errors.subject && <p className="mt-2 text-sm font-medium text-rose-500">{errors.subject.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-800">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Write your message here..."
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Message must be at least 20 characters',
                      },
                    })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
                  />
                  {errors.message && <p className="mt-2 text-sm font-medium text-rose-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn h-13 w-full rounded-2xl border-0 bg-linear-to-r from-primary via-rose-500 to-fuchsia-600 text-sm font-bold text-white shadow-[0_16px_40px_rgba(236,72,153,0.25)] transition hover:scale-[1.01] hover:shadow-[0_20px_45px_rgba(236,72,153,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="size-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
