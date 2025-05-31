  
import {mapSearchRequestResults, mapVideoStatResults} from '../helpers/search-results.helper.js'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export const getSearchResults = async (query, signal) => {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&maxResults=25&key=${API_KEY}&part=snippet&order=relevance&type=video`, { signal });
    const data = await res.json();
    return mapSearchRequestResults(data.items);
}

export const getVideoStatisticResults = async (videoIdList, signal) => {
    const res = await fetch(`${API_BASE}/videos?id=${videoIdList.join(',')}&part=statistics&key=${API_KEY}`, { signal });
    const data = await res.json();
    return mapVideoStatResults(data.items);
}

  