import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    tagline: z.string().optional(),
    description: z.string(),
    cover: z.string().optional(),
  }),
});

export const collections = { projects };
