export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  pressure: number;
  observedAt: string;
}

export interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    pressure_msl: number;
    time: string;
  };
}
