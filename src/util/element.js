export function checkOverflow(preRef) {
  if (!preRef.current) return false;
  const contentHeight = preRef.current.scrollHeight; // 내용의 높이
  const elementHeight = preRef.current.clientHeight; // 요소의 높이
  return contentHeight > elementHeight || preRef.current.textContent.split('\n').length >= 5;
}
