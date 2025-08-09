import React, { Suspense } from 'react';

const Centroid = React.lazy(() => import('./centroid/CentroidView'));

const GamesHub: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading game…</div>}>
        <Centroid />
      </Suspense>
    </div>
  );
};

export default GamesHub;


