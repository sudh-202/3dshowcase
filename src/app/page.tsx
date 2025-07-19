'use client';

import dynamic from 'next/dynamic';

// Use dynamic import for the 3D components
// Note: In Next.js 13+ with app directory, we need to handle SSR differently
const ModelScene = dynamic(() => import('@/components/ModelScene'), {
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900">
      <div className="text-white text-xl font-bold">Loading 3D Experience...</div>
    </div>
  ),
});

export default function Home() {
  return <ModelScene initialModelType="shoes" />;
}
