export default ({ env }) => ({
	url: env('RENDER_EXTERNAL_URL'),
	dirs: {
		public: '/opt/render/project/src/data/public'
	}
});
