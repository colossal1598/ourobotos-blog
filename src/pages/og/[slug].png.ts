import { readFileSync } from 'node:fs';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';

// Resolve font paths relative to the project root, not the bundled chunk location.
// import.meta.env.BASE_URL is always '/' in static builds; we use process.cwd()
// which is the project root during `astro build`.
const fontRegularData = readFileSync(
	new URL('src/assets/fonts/dm-sans-400.ttf', `file://${process.cwd()}/`),
);
const fontBoldData = readFileSync(
	new URL('src/assets/fonts/dm-sans-700.ttf', `file://${process.cwd()}/`),
);

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			title: post.data.title,
			category: post.data.category,
		},
	}));
}

const CATEGORY_COLORS: Record<string, string> = {
	tutorial:  '#3b8fd4',
	opinion:   '#c9900c',
	news:      '#4caf50',
	analysis:  '#d4a843',
};

interface Props {
	title: string;
	category: string;
}

export async function GET({ props }: { props: Props }) {
	const { title, category } = props;
	const accentColor = CATEGORY_COLORS[category] ?? '#3b8fd4';

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#0a0d12',
					padding: '72px 80px',
					fontFamily: '"DM Sans"',
				},
				children: [
					// Top: category label
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											color: accentColor,
											fontSize: '18px',
											fontWeight: 400,
											letterSpacing: '0.01em',
										},
										children: `[${category}]`,
									},
								},
							],
						},
					},
					// Middle: post title
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flex: 1,
								alignItems: 'center',
							},
							children: [
								{
									type: 'h1',
									props: {
										style: {
											color: '#e8eaed',
											fontSize: title.length > 60 ? '52px' : '64px',
											fontWeight: 700,
											lineHeight: 1.1,
											letterSpacing: '-0.02em',
											margin: 0,
											maxWidth: '960px',
										},
										children: title,
									},
								},
							],
						},
					},
					// Bottom: wordmark + accent bar
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							},
							children: [
								{
									type: 'span',
									props: {
										style: {
											color: '#484f58',
											fontSize: '20px',
											fontWeight: 400,
											letterSpacing: '-0.02em',
										},
										children: 'ourobotos',
									},
								},
								{
									type: 'div',
									props: {
										style: {
											width: '48px',
											height: '3px',
											backgroundColor: accentColor,
											borderRadius: '2px',
										},
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'DM Sans', data: fontRegularData, weight: 400, style: 'normal' },
				{ name: 'DM Sans', data: fontBoldData, weight: 700, style: 'normal' },
			],
		},
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
}
