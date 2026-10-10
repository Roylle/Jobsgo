import metadata from '../asset-metadata.json';
import type { CSSProperties } from 'react';
export const assetPath = (section: string, file: string) => `${import.meta.env.BASE_URL}assets/${section}-${file}`;
export function DesignImage({ section, file, x, y, width, height, className = '', opacity = 1 }: { section: string; file: string; x: number; y: number; width: number; height: number; className?: string; opacity?: number }) {
  const size = (metadata as Record<string, { width: number; height: number }>)[`${section}-${file}`];
  const svg = file.endsWith('.svg');
  const style: CSSProperties = svg ? { transform: `scale(${width / size.width},${height / size.height})`, transformOrigin: '0 0', maxWidth: 'none' } : { width, height, objectFit: 'contain', maxWidth: 'none' };
  return <span className={`design-image ${className}`} style={{ position: 'absolute', left: x, top: y, width, height, opacity, pointerEvents: 'none' }} aria-hidden="true"><img src={assetPath(section, file)} alt="" style={style} /></span>;
}
