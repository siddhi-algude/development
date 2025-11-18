import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(asyncFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  const run = useCallback(async (...args) => {
    setLoading(true); setError(null);
    try {
      const result = await asyncFn(...args);
      if (mounted.current) setData(result);
      return result;
    } catch (e) {
      if (mounted.current) setError(e);
      throw e;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { mounted.current = false; }, []);
  return { data, loading, error, run };
}
