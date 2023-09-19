// HTML 엔티티를 특수 기호로 변환
export function unescapeSpecialCharacters(text) {
  if (!text) return text;

  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}
