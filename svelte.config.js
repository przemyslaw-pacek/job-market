import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Wymagane przez GitHub Pages dla tras SPA
			precompress: false,
			strict: true
		}),
		paths: {
			// Zastąp 'nazwa-repozytorium' dokładną nazwą swojego projektu na GitHubie
			base: dev ? '' : '/job-market-2'
		}
	}
};

export default config;
