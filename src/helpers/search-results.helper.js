export const getVideoIds = (searchResults) => {
    return searchResults.map((searchResult) => searchResult.videoId);
}

export const mapSearchRequestResults = (searchRequestData) => {
    const { nextPageToken, pageInfo, items, prevPageToken } = searchRequestData;
    const result = items.map((listItem) => {
        const {title, description, thumbnails } = listItem.snippet;

        return {
            videoId: listItem.id.videoId,
            imageUrl: thumbnails.medium.url,
            title: decodeHtml(title),
            description: decodeHtml(description)
        }
    })

    return {
        nextPageToken: nextPageToken || null,
        prevPageToken: prevPageToken || null,
        totalPages: Math.ceil(pageInfo.totalResults / pageInfo.resultsPerPage).toLocaleString(),  
        items: result
    }
}; 

export const mapVideoStatResults = (searchRequestList) => 
    searchRequestList.map((listItem) => ({
        videoId: listItem.id,
        viewCount: listItem.statistics.viewCount,
        commentCount: Number(listItem.statistics.commentCount || 0).toLocaleString()
    }));

export const mapSearchResultsToStats = (searchResults, videoStatResults) => {
    const result = searchResults.items.map((searchResult) => {
        const videoResult = videoStatResults.find((statResult) => statResult.videoId === searchResult.videoId);

        return {...searchResult, ...videoResult}
    });
    return { ...searchResults, items:result };

}

const decodeHtml = (html = '') => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}