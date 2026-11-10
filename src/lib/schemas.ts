import { z } from "zod";

export const ENQUIRY_TYPES = [
  "Property advisory",
  "Investment guidance",
  "Property search assistance",
  "Diaspora buyer guidance",
  "A specific property",
  "Something else",
] as const;

export const BUDGETS = [
  "Under ₦20m",
  "₦20m – ₦50m",
  "₦50m – ₦100m",
  "₦100m – ₦250m",
  "₦250m+",
  "Not sure yet",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  type: z.string().trim().max(60).default("General"),
  location: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10, "A few more words please (10+ characters)").max(4000),
  propertyId: z.string().trim().max(40).optional().nullable(),
  website: z.string().max(0).optional().default(""), // honeypot
  t: z.coerce.number().optional().default(0), // render timestamp
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().max(0).optional().default(""),
});
