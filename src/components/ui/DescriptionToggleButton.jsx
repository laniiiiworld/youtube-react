import React from 'react';

export default function DescriptionToggleButton({ name, handleClick }) {
  const beforeCSS = `
                      before:absolute
                      before:content-['']
                      before:z-[-1]
                      before:top-0
                      before:left-0
                      before:w-full
                      before:h-full
                      before:bg-zinc-400
                      before:dark:bg-zinc-500
                      before:rounded-sm
                      before:scale-x-0
                      before:duration-150
                    `;

  return (
    <button className={`z-[1] relative mt-2 px-1 ${beforeCSS} active:before:scale-x-100`} onClick={handleClick}>
      {name}
    </button>
  );
}
