export interface City {
  readonly id: string;
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
}

export const CITIES: readonly City[] = [
  { id: 'poznan', name: 'Poznań',
    latitude: 52.4064, longitude: 16.9252 },
  { id: 'szczecin', name: 'Szczecin',
    latitude: 53.4285, longitude: 14.5528 },
];
