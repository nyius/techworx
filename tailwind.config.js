module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui', 'tailwind-scrollbar')],
	variants: {
		scrollbar: ['dark'],
	},
};
