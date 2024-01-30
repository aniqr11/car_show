import { CarProps, filterProps } from "@/types";

export async function fetchCars(filters: filterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "6d0e9d0314mshcc9f51806b63320p185f6cjsn09bbaacdb8c1",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const res = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await res.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  const idr = rentalRatePerDay * 15775;
  const formattedIdr = idr.toLocaleString("id-ID");

  return formattedIdr;
};

export const generateCarImageUrl = (car: CarProps, angle?: string): any => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery" || "");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
