import { z } from "zod";
import { signUpSchema } from '@/lib/schema'


export type SignUpFormData = z.infer<typeof signUpSchema>;