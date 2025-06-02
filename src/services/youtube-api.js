  
import {mapSearchRequestResults, mapVideoStatResults} from '../helpers/search-results.helper.js'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export const getSearchResults = async (query, sortBy, pageToken, signal) => {
    let url;
    if (API_KEY) {
        const params = new URLSearchParams({
        q: query,
        maxResults: 25,
        key: API_KEY,
        part: 'snippet',
        order: sortBy,
        type: 'video',
    });

    if (pageToken) {
        params.set('pageToken', pageToken);
    }

        url = `${API_BASE}/search?${params.toString()}`;
    } else {
        url = `/mock-data/search-request-${sortBy}.json`
    }

    const res = await fetch(url, { signal });
    const data = await res.json();

    if (data.error) {
        throw generateSearchError(getReasons(data.error))
    }

    return mapSearchRequestResults(data, !API_KEY);
}

export const getVideoStatisticResults = async (videoIdList, signal) => {
    let url;
    if (API_KEY) {
        const params = new URLSearchParams({
            id: videoIdList.join(','),
            part: 'statistics',
            key: API_KEY
        });
        url = `${API_BASE}/videos?${params.toString()}`;
    } else {
        url = '/mock-data/video-stat-request.json'
    }
    
    const res = await fetch(url, { signal });

    const data = await res.json();

    if (data.error) {
        throw generateSearchError(getReasons(data.error))
    }

    return mapVideoStatResults(data.items);
}

const getReasons = (error) => {
  const reasonsFromErrors = error?.errors?.map((e) => e.reason) || [];
  const reasonsFromDetails = error?.details?.map((d) => d.reason ) || [];
  return [...reasonsFromErrors, ...reasonsFromDetails];
};

const generateSearchError = (reasons) => {
  let message = 'Something went wrong. Try again soon.';

  if (reasons.includes('quotaExceeded')) {
    message = 'YouTube API quota exceeded. Please try again later.';
  } else if (reasons.includes('API_KEY_INVALID')) {
    message = 'It looks like there is an issue with your API key.';
  }

  return new Error(message);
};

  