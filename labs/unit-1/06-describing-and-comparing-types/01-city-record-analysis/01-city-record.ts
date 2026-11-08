export type City = {
  area: number;
  population: number;
  country: string;
}

function inspect(record: Record<string, unknown>) {
  console.log(Object.keys(record));
}

const city: City = {
  area: 415, population: 2_000_000, country: 'Austria'
};

inspect(city);
