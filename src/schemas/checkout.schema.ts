import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(11, 'Enter a valid phone number'),

  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),

  deliveryMethod: z.enum(['standard', 'express']),
  paymentMethod: z.enum(['cod', 'card']),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
