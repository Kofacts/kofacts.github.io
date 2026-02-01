// Fetch currently reading books from Goodreads RSS
export async function fetchGoodreadsCurrentlyReading(userId = '183340682') {
    const RSS_URL = `https://www.goodreads.com/review/list_rss/${userId}?shelf=currently-reading`;

    try {
        const response = await fetch(RSS_URL);
        const text = await response.text();

        const books = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(text)) !== null) {
            const item = match[1];

            const getTag = (tag) => {
                const regex = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`);
                const m = item.match(regex);
                return m ? m[1].trim() : '';
            };

            books.push({
                title: getTag('title'),
                author: getTag('author_name'),
                link: getTag('link').replace(/&amp;/g, '&'),
                imageUrl: getTag('book_large_image_url') || getTag('book_image_url'),
            });
        }

        return books;
    } catch (error) {
        console.error('[Goodreads] Error fetching reading list:', error);
        return [];
    }
}
