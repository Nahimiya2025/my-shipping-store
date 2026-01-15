'use server'

import { z } from 'zod';
import { ActionState } from '@/types';

// Define the validation schema using Zod
const ContactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendContactEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // Validate form data
  const validatedFields = ContactSchema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate Email Sending (Replace with Resend or SendGrid API)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Email sent to:", validatedFields.data.email);

  return {
    message: "Success! Your message has been received.",
  };
}