import { useEffect, useRef, useState } from 'react';

const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  const fetchData = async (endPoint) => {
    setLoading(true);

    try {
      const response = await fetch(endPoint);

      const { results } = await response.json();

      if (mounted.current) {
        setData(results);
        setLoading(false);
      }
    } catch (err) {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    data,
    fetchData,
  };
};

export default useFetchData;
