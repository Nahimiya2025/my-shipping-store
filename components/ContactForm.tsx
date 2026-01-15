'use client'

import { useActionState } from 'react'; // Updated import for Next.js 16/React 19
import { sendContactEmail } from '@/actions/contact';
import { motion } from 'framer-motion';

export function ContactForm() {
  // New Hook Syntax: [state, action, isPending]
  const [state, dispatch, isPending] = useActionState(sendContactEmail, null);

  return (
    <motion.form 
      action={dispatch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        {state?.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-400"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
      
      {state?.message && (
        <p className="text-green-600 font-medium text-center bg-green-50 p-2 rounded">{state.message}</p>
      )}
    </motion.form>
  );
}