import axios from 'axios';

export default class FakeYoutubeClient {
  async search() {
    return await axios.get(`/videos/search.json`);
  }

  async related() {
    return await axios.get(`/videos/related.json`);
  }

  async videos() {
    return await axios.get(`/videos/popular.json`);
  }

  async channel() {
    return await axios.get(`/videos/channel.json`);
  }
}
