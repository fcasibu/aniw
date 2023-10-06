import type { Maybe } from '@/types';
import { useCallback, useReducer } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFn = (...args: any[]) => Promise<Maybe<any>>;

type UseQueryReturnValue<T extends GenericFn> = {
  isLoading: boolean;
  isError: boolean;
  data?: Awaited<ReturnType<T>>;
  error?: Maybe<Error>;
  mutate: (...args: Parameters<T>) => Promise<void>;
};

type State<T extends GenericFn> = {
  isLoading: boolean;
  isError: boolean;
  data?: Awaited<ReturnType<T>>;
  error?: Maybe<Error>;
};

type LoadingAction = {
  type: 'loading';
};

type DoneAction<T extends GenericFn> = {
  type: 'done';
  payload: Awaited<ReturnType<T>>;
};

type ErrorAction = {
  type: 'error';
  payload: Error;
};

type Action<T extends GenericFn> = LoadingAction | DoneAction<T> | ErrorAction;

function reducer<T extends GenericFn>(
  state: State<T>,
  action: Action<T>,
): State<T> {
  switch (action.type) {
    case 'loading': {
      return {
        ...state,
        isLoading: !state.isLoading,
        isError: false,
      };
    }

    case 'done': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        error: undefined,
      };
    }

    case 'error': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: undefined,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}

export function useLazyQuery<T extends GenericFn>(
  queryFn: T,
): UseQueryReturnValue<T> {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    error: undefined,
    isError: false,
    isLoading: false,
  });

  const mutate = useCallback(
    async (...args: Parameters<T>) => {
      dispatch({ type: 'loading' });
      try {
        const data = await queryFn(...args);
        dispatch({ type: 'done', payload: data });
      } catch (e) {
        dispatch({ type: 'error', payload: e as Error });
      }
    },
    [queryFn],
  );

  return { ...state, mutate };
}
