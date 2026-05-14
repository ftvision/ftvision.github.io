import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

// Explicit allow-list for AI / answer-engine crawlers. A blanket `*` allow
// also covers them in theory, but several of these bots default to "no
// matching rule = stay out". Naming them removes the ambiguity. To opt
// out of training-data ingestion while staying indexed for search, flip
// the training bots (GPTBot, ClaudeBot, CCBot, Google-Extended,
// Applebot-Extended, Bytespider, Meta-ExternalAgent, cohere-ai) to
// `disallow: '/'` and keep the *-SearchBot / *-User agents on allow.
const AI_BOTS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Apple
  'Google-Extended',
  'Applebot-Extended',
  // Common Crawl / others
  'CCBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'cohere-ai',
  'DuckAssistBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
