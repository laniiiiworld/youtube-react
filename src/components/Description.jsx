import React, { useEffect, useRef, useState } from 'react';
import { checkOverflow } from '../util/element';
import { unescapeSpecialCharacters } from '../util/string';
import DescriptionToggleButton from './ui/DescriptionToggleButton';

export default function Description({ h2Ref, description }) {
  const preRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const handleMoreClick = () => {
    if (!isOverflowing) return;
    setIsMore(true);
  };
  const handleShortClick = (e) => {
    e.stopPropagation();
    setIsMore(false);
    h2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    setIsOverflowing(checkOverflow(preRef));
    setIsMore(false);
  }, [preRef, description]);

  return (
    <div
      onClick={handleMoreClick}
      className={`mb-8 bg-description rounded-xl p-4 ${!isMore && 'cursor-pointer hover:bg-zinc-700'}`}
    >
      <pre ref={preRef} className={`whitespace-pre-line h-24 ${isMore ? 'h-auto' : 'line-clamp-5'}`}>
        {unescapeSpecialCharacters(description)}
      </pre>
      {isOverflowing && !isMore && <DescriptionToggleButton name='...더보기' handleClick={() => {}} />}
      {isMore && <DescriptionToggleButton name='간략히' handleClick={handleShortClick} />}
    </div>
  );
}
