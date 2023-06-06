import axios from 'axios';
// import cheerio from 'cheerio';

export async function scrapeFavicon(url: string): Promise<string | null> {
	try {
		//TODO Use a server-side solution

		// https://www.google.com/s2/favicons?domain=https://www.amazon.com/&sz=${size}
		const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
		const requestUrl = `${corsProxyUrl}${`https://www.google.com/s2/favicons?domain=${url}&sz=64`}`;
		const response = await axios.get(requestUrl);
		return response.data;
	} catch (error) {
		console.error(`Error scraping favicon for ${url}:`, error);
		return null;
	}
}
