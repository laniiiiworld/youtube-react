import axios from 'axios';

export default class FakeYoutubeClient {
  async search() {
    return await axios.get(`/videos/search.json`);
  }

  async videos() {
    return await axios.get(`/videos/popular.json`);
  }
}
