  
import {mapSearchRequestResults, mapVideoStatResults} from '../helpers/search-results.helper.js'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export const getSearchResults = async (query, sortBy, pageToken, signal) => {
    let url = `${API_BASE}/search?q=${encodeURIComponent(query)}&maxResults=25&key=${API_KEY}&part=snippet&order=${sortBy}&type=video`;
    if (pageToken) {
        url = url + '&pageToken=' + pageToken;
    }
    const res = await fetch(url, { signal });
   
    const data = await res.json();

    if (data.error) {
        handleErrors(data.error);
    }

    return mapSearchRequestResults(data);
}

export const getVideoStatisticResults = async (videoIdList, signal) => {
    const res = await fetch(`${API_BASE}/videos?id=${videoIdList.join(',')}&part=statistics&key=${API_KEY}`, { signal });

    const data = await res.json();

    if (data.error) {
        handleErrors(data.error);
    }

    return mapVideoStatResults(data.items);
}

const handleErrors = (error) => {
  const reasonsFromErrors = error?.errors?.map((e) => e.reason) || [];
  const reasonsFromDetails = error?.details?.map((d) => d.reason ) || [];
  throw [...reasonsFromErrors, ...reasonsFromDetails];
};

  