import { useEffect, useState } from 'react';
import { getData } from '../models/asyncStorage'; 

const useLocation = () => {
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    const fetchCityName = async () => {
      const storedCity = await getData('city');
      console.log('Stored city:', storedCity);
      setCityName(storedCity);
    };

    fetchCityName();
  }, []);

  return { cityName };
};

export default useLocation;
