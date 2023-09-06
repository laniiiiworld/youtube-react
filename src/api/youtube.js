export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    const response = await this.apiClient.search({
      part: 'snippet',
      maxResults: 25,
      q: keyword,
      regionCode: 'kr',
      type: 'video',
      videoSyndicated: true,
      safeSearch: 'strict',
    });
    const data = response.data.items;
    return data.map((item) => ({ ...item, id: item.id.videoId }));
  }

  async #mostPopular() {
    const response = await this.apiClient.videos({
      part: 'snippet',
      maxResults: 25,
      chart: 'mostPopular',
      regionCode: 'kr',
      videoSyndicated: true,
    });
    const data = response.data.items;
    return data;
  }
}
