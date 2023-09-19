export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  search(keyword, pageToken) {
    return keyword ? this.#searchByKeyword(keyword, pageToken) : this.#mostPopular(pageToken);
  }

  async channelImageUrl(channelId) {
    const response = await this.apiClient.channel({
      part: 'snippet, statistics',
      id: channelId,
    });
    return response.data.items[0].snippet.thumbnails.default.url;
  }

  async relatedVideos(keyword) {
    const response = await this.apiClient.related({
      part: 'snippet',
      maxResults: 50,
      q: keyword,
      regionCode: 'kr',
      type: 'video',
      videoSyndicated: true,
      safeSearch: 'strict',
    });
    const data = response.data.items;
    return data.map((item) => ({ ...item, id: item.id.videoId }));
  }

  async #searchByKeyword(keyword, pageToken = null) {
    const response = await this.apiClient.search({
      part: 'snippet',
      maxResults: 10,
      q: keyword,
      regionCode: 'kr',
      type: 'video',
      videoSyndicated: true,
      safeSearch: 'strict',
      pageToken,
    });
    const data = response.data.items;
    return {
      data: data.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: response.data.nextPageToken,
    };
  }

  async #mostPopular(pageToken = null) {
    const param = {
      part: 'snippet',
      maxResults: 10,
      chart: 'mostPopular',
      regionCode: 'kr',
      videoSyndicated: true,
      pageToken,
    };
    const response = await this.apiClient.videos(param);
    const data = response.data.items;
    return { data, nextPageToken: response.data.nextPageToken };
  }
}
