import { useCallback, useEffect, useState } from "react";

type Stringable = string | number | boolean | object;

type GetParam = {
  (): URLSearchParams;
  <T extends Stringable>(key: string): T | null;
};

// if key is provided, return the value, otherwise return the params object
export const getParam: GetParam = (key?: string) => {
  const params = new URLSearchParams(window.location.search);

  if (!key) return params;

  const value = params.get(key);

  try {
    return JSON.parse(value ?? "");
  } catch (_) {
    return value;
  }
};

// keep search param in sync with React state
export const useQueryState = <T extends Stringable>(
  key: string,
  initalValue: T
) => {
  const [value, setValue] = useState<T>(() => getParam<T>(key) ?? initalValue);

  const setValueFromParam = useCallback((key: string) => {
    const param = getParam<T>(key);

    if (param) {
      setValue(param);
    }
  }, []);

  const dispatch = (newValue: T) => {
    if (newValue === value) return;

    const params = getParam();
    params.set(key, newValue.toString());

    window.dispatchEvent(
      new CustomEvent("paramchange", {
        detail: { key, value: newValue, params },
      })
    );
  };

  // if key changes, update the value
  useEffect(() => {
    setValueFromParam(key);
  }, [key, setValueFromParam]);

  // listen to forward/back navigation
  useEffect(() => {
    const listener = (_: PopStateEvent) => setValueFromParam(key);

    window.addEventListener("popstate", listener);

    return () => {
      window.removeEventListener("popstate", listener);
    };
  }, [key, setValueFromParam]);

  // handle custom paramchange event
  useEffect(() => {
    const listener = ((
      e: CustomEvent<{ key: string; value: T; params: URLSearchParams }>
    ) => {
      if (e.detail.key !== key) return;

      setValue(e.detail.value);
      history.pushState(null, "", `?${e.detail.params.toString()}`);
    }) as EventListenerOrEventListenerObject;

    window.addEventListener("paramchange", listener);

    return () => {
      window.removeEventListener("paramchange", listener);
    };
  }, [key, setValue]);

  return [value, dispatch] as const;
};
