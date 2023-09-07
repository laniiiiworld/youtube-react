import { createContext, useContext } from 'react';
import FakeYoutubeClient from '../api/fakeYoutubeClient';
import YoutubeClient from '../api/youtubeClient';
import Youtube from '../api/youtube';

export const YoutubeApiContext = createContext();

const clientTypes = Object.freeze({ real: 'REAL', fake: 'FAKE' });
const client = createClient(clientTypes.real);
const youtube = new Youtube(client);

function createClient(type) {
  if (type === clientTypes.real) {
    return new YoutubeClient();
  }
  return new FakeYoutubeClient();
}

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{ youtube }}>{children}</YoutubeApiContext.Provider>;
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
