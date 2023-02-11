/**
 * post controller
 */

import { factories } from '@strapi/strapi';

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
	}
}));
