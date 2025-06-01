  
import {mapSearchRequestResults, mapVideoStatResults} from '../helpers/search-results.helper.js'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export const getSearchResults = async (query, sortBy, signal) => {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&maxResults=25&key=${API_KEY}&part=snippet&order=${sortBy}&type=video`, { signal });
    const data = await res.json();

    if (data.error) {
        throw new Error(data.error.errors?.[0]?.reason || 'unknownError');
    }

    console.log(data)
    return mapSearchRequestResults(data.items);
}

export const getVideoStatisticResults = async (videoIdList, signal) => {
    const res = await fetch(`${API_BASE}/videos?id=${videoIdList.join(',')}&part=statistics&key=${API_KEY}`, { signal });
    const data = await res.json();

    if (data.error) {
        throw new Error(data.error.errors?.[0]?.reason || 'unknownError');
    }

    return mapVideoStatResults(data.items);
}

  