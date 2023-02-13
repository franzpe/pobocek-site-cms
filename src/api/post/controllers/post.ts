/**
 * post controller
 */

import { factories } from '@strapi/strapi';
import RSS from 'rss';
import { marked } from 'marked';

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
	async findOneBySlug(ctx) {
		const { slug } = ctx.params;

		const query = {
			filters: { slug },
			...ctx.query
		};

		const post = await strapi.entityService.findMany('api::post.post', query);
		const sanitizedEntity = await this.sanitizeOutput(post, ctx);

		return this.transformResponse(sanitizedEntity[0]);
	},
	async getRssFeed(ctx) {
		const query = {
			filters: {},
			...ctx.query
		};

		ctx.set('Content-Type', 'application/xml');

		const posts = await strapi.entityService.findMany('api::post.post', query);
		const sanitizedEntity = await this.sanitizeOutput(posts, ctx);

		const feed = new RSS({
			title: 'The Blog by Frank Pobocek',
			description: 'Keep up with the latest news, tutorials and some other tech stories.',
			feed_url: 'https://pobocek.dev/blog/rss',
			site_url: 'https://pobocek.dev'
		});

		for (const [i, blog] of sanitizedEntity.entries()) {
			feed.item({
				...blog,
				author: 'Frank Pobocek',
				description: blog.description,
				date: blog.updatedAt,
				url: `https://pobocek.dev/blog/${blog.slug}`,
				custom_elements: [{ content: marked(blog.content) }]
			});
		}

		return feed.xml({ indent: true });
	}
}));
