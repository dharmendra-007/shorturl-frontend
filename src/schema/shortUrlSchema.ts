import { z } from 'zod';

export const ShortUrlSchema = z.object({
  url: z
    .string()
    .url({ message: 'Enter a valid URL' })
    .min(1, { message: 'URL is required' }),
});

export type ShortUrlSchemaType = z.infer<typeof ShortUrlSchema>;