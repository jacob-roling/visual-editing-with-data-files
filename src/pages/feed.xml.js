import site from '../../data/site.json';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

const posts = await getCollection('blog');

/**
 * @type {import("astro").APIRoute}
 */
export async function GET(context) {
  return rss({
    title: site.site_title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      link: `/blog/${post.slug}`,
      title: post.data.title,
      pubDate: post.data.date,
    })),
    customData: `<language>en-us</language>`,
  });
}
