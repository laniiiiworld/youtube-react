// HTML 엔티티를 특수 기호로 변환
export function unescapeSpecialCharacters(text) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

export function extractLinks(text) {
  const regexp = /(https:\/\/[^\s/$.?#].[^\s]*)/gi;
  return text.replace(
    regexp, //
    (url) => `<a href=${url} target='_blank' class='links'>${url}</a>`
  );
}

export function extractTags(text) {
  const regexp = /#([a-zA-Zㄱ-힣0-9]+)/g;
  return text.replace(
    regexp, //
    (tag) => `<a href='/videos/${tag.replace('#', '')}' class='tags'>${tag}</a>`
  );
}

export function extractTimes(text) {
  const regexp = /(\d{1}:\d{2}:\d{2})|(\d{2}:\d{2}:\d{2})|(\d{1}:\d{2})|(\d{2}:\d{2})/g; //00:00 형식의 시간

  return text.replace(
    regexp, //
    (time) => `<a href='javascript:void(0)' class='times'>${time}</a>`
  );
}
