import { useState, useEffect } from 'react';

type CarouselMap = Record<string, string[]>;

let _cache: CarouselMap | null = null;
let _promise: Promise<CarouselMap> | null = null;

function loadCarousels(): Promise<CarouselMap> {
  if (!_promise) {
    _promise = fetch('/carousels.json')
      .then(r => r.json())
      .then((data: CarouselMap) => {
        _cache = data;
        return data;
      });
  }
  return _promise;
}

function toPhotos(data: CarouselMap | null, key: string): string[] {
  return (data?.[key] ?? []).map(f => `/assets/${f}`);
}

/**
 * Returns the photo list for a carousel key defined in public/carousels.json.
 * Photos are returned as full paths: /assets/<filename>
 * The JSON is fetched once and cached for the lifetime of the page.
 */
export function useCarousel(key: string): string[] {
  const [photos, setPhotos] = useState<string[]>(() => toPhotos(_cache, key));

  useEffect(() => {
    if (_cache !== null) {
      setPhotos(toPhotos(_cache, key));
      return;
    }
    loadCarousels().then(data => setPhotos(toPhotos(data, key)));
  }, [key]);

  return photos;
}
