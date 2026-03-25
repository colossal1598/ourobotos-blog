import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum(['tutorial', 'opinion', 'news', 'analysis']).default('opinion'),
		tags: z.array(z.string()).default([]),
		readingTime: z.number().optional(),
		featured: z.boolean().default(false),
		summary: z.string().optional(),
		keyPoints: z.array(z.string()).optional(),
		sponsor: z.string().optional(),
		affiliateLinks: z.boolean().default(false),
	}),
});

export const collections = { blog };
