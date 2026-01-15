// Strict typing for our Content
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: "code" | "server" | "search"; // Restrict to specific icon keys
}

export type ActionState = {
  errors?: {
    email?: string[];
    message?: string[];
  };
  message?: string;
} | null;