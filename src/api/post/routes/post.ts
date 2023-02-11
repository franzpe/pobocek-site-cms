import { factories } from '@strapi/strapi';
import customRouter from '../../../utils/customRouter';

const defaultRouter = factories.createCoreRouter('api::post.post');

const customRoutes = [
	{
		method: 'GET',
		path: '/posts/slug/:slug',
		handler: 'post.findOneBySlug',
		config: { policies: [] }
	}
];

export default customRouter(defaultRouter, [], customRoutes);
