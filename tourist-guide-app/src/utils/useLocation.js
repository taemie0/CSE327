import { useEffect, useState } from 'react';
import { getData } from '../models/asyncStorage'; 
/**
 * A custom React hook to fetch and manage the city name stored in async storage.
 *
 * @returns {Object} - An object containing the following property:
 *   @property {string|null} cityName - The name of the stored city, or `null` if not available.
 *
 * @example
 * import useLocation from './hooks/useLocation';
 *
 * const App = () => {
 *   const { cityName } = useLocation();
 *
 *   return (
 *     <div>
 *       <h1>Your City: {cityName || 'Loading...'}</h1>
 *     </div>
 *   );
 * };
 *
 * export default App;
 */
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
