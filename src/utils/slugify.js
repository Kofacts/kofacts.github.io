export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove non-word characters
		.replace(/\-\-+/g, '-') // Replace multiple dashes with single dash
		.replace(/^-+|-+$/g, ''); // Trim dashes from start & end
}
