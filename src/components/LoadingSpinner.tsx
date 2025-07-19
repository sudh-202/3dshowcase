'use client';

export default function LoadingSpinner() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0, 0, 0]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  );
}