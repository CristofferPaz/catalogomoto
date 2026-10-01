export const categories = ['Todas', 'Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'] as const;
export type Category = (typeof categories)[number];

export type Moto = {
  identificador: number;
  modelo: string;
  marca: string;
  categoria: Exclude<Category, 'Todas'>;
  cilindrada: number;
  precio: number;
  imagenLink: string;
  stock: number;
  descripcion: string;
};

export type MotoPayload = Omit<Moto, 'identificador'>;

export const officialImages: Record<string, string> = {
  'BROZZ-250': '/images/motos/brozz-250.webp',
  'FOX RS-250': '/images/motos/fox-rs-250-1.webp',
  'NXR-250': '/images/motos/nxr-250.webp',
  'LIBERTY-200': '/images/motos/liberty-200.webp',
  'BIT-150': '/images/motos/bit-150.webp',
  'CGL-150': '/images/motos/cgl-150.webp',
  'CGL-150E': '/images/motos/cgl-150-e-1.webp',
  'CB1-150': '/images/motos/cb1-150.webp',
  'BLITZ-135': '/images/motos/blitz-135.webp',
  'BIS-135': '/images/motos/bis-135.webp',
  'SAB-INO150': '/images/motos/SAB-INO150.webp',
};

export function imageFor(moto: Pick<Moto, 'modelo' | 'imagenLink'>) {
  return officialImages[moto.modelo] ?? moto.imagenLink;
}

export function displayCategory(category: string) {
  return { Automaticas: 'Automáticas', Deportiva: 'Deportivas', Scoter: 'Scooter', utilitarias: 'Utilitarias' }[category] ?? category;
}
