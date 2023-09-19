export default function SkeletonInner({ type }) {
  const isList = type === 'list';

  return (
    <>
      <div className={`bg-slate-200 rounded-xl ${isList ? 'w-5/12 mr-2 h-24' : 'w-full h-52'}`}></div>
      <div className={`mx-2 ${isList ? 'w-7/12' : ''}`}>
        <p className='bg-slate-200 mt-3 w-100 h-6'></p>
        <p className='bg-slate-200 my-2 w-60 h-5'></p>
      </div>
    </>
  );
}
