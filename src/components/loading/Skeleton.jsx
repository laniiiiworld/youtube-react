import SkeletonInner from './SkeletonInner';

export default function Skeleton({ type }) {
  const isList = type === 'list';
  return (
    <li className={`animate-pulse flex ${isList ? 'flex-row mb-2' : 'flex-col'}`} data-testid='skeleton'>
      <SkeletonInner type={type} />
    </li>
  );
}
