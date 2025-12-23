/**
 * useApi Hook
 * Custom React hook for handling API calls with loading and error states
 */

import { useState, useCallback } from 'react';
import { ApiError } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Custom hook for API calls with automatic state management
 * @param apiFunction - The API function to call
 * @returns Object with data, loading, error states and execute function
 * 
 * @example
 * const { data, loading, error, execute } = useApi(shipmentsService.getAll);
 * 
 * useEffect(() => {
 *   execute({ page: 1, limit: 10 });
 * }, []);
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred';
        
        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Custom hook for API mutations (POST, PUT, DELETE) with success callbacks
 * @param apiFunction - The API mutation function
 * @param onSuccess - Optional callback on successful mutation
 * @returns Object with loading, error states and mutate function
 * 
 * @example
 * const { loading, error, mutate } = useMutation(
 *   shipmentsService.create,
 *   () => {
 *     toast.success('Shipment created!');
 *     navigate('/shipments');
 *   }
 * );
 */
export function useMutation<T, Args extends any[] = any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  onSuccess?: (data: T) => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (...args: Args): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        setLoading(false);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : err instanceof Error 
          ? err.message 
          : 'An unexpected error occurred';
        
        setError(errorMessage);
        setLoading(false);
        return null;
      }
    },
    [apiFunction, onSuccess]
  );

  return {
    loading,
    error,
    mutate,
  };
}

export default useApi;
