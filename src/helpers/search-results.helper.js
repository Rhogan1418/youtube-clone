export const getVideoIds = (searchResults) => {
    return searchResults.map((searchResult) => searchResult.videoId);
}

export const mapSearchRequestResults = (searchRequestList) => 
    searchRequestList.map((listItem) => {
        const {title, description, thumbnails } = listItem.snippet;

        return {
            videoId: listItem.id.videoId,
            imageUrl: thumbnails.medium.url,
            title: decodeHtml(title),
            description: decodeHtml(description)
        }
    }); 

export const mapVideoStatResults = (searchRequestList) => 
    searchRequestList.map((listItem) => ({
        videoId: listItem.id,
        viewCount: listItem.statistics.viewCount,
        commentCount: Number(listItem.statistics.commentCount || 0).toLocaleString()
    }));

export const mapSearchResultsToStats = (searchResults, videoStatResults) => 
    searchResults.map((searchResult) => {
        const videoResult = videoStatResults.find((statResult) => statResult.videoId === searchResult.videoId);

        return {...searchResult, ...videoResult}
});

const decodeHtml = (html = '') => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}