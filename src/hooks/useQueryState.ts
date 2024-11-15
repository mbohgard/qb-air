import { useCallback, useEffect, useRef, useState } from "react";

type Stringable = string | number | boolean;

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

const validate = <T extends Stringable>(value: T, pattern?: string) =>
  pattern ? new RegExp(pattern).test(value.toString()) : true;

// make TS infer "string" instead of "a" for ex
type Widen<T> = T extends string ? string : T;

type ParamChangeData<T> = {
  key: string;
  value: T;
  params: URLSearchParams;
} | null;

// keep search param in sync with React state
export const useQueryState = <T extends Stringable>(
  key: string,
  initalValue: T,
  options?: {
    pattern?: string;
  }
) => {
  // save initial value in ref to avoid re-registering listeners when having initialValie in dep arrays
  const initialValueRef = useRef(initalValue);
  const [value, setValue] = useState<T>(() => {
    const param = getParam<T>(key) ?? initalValue;

    return validate(param, options?.pattern) ? param : initalValue;
  });

  const setValueFromParam = useCallback(
    (key: string) => {
      const param = getParam<T>(key);

      if (param && validate(param, options?.pattern)) {
        setValue(param);
      }
    },
    [options?.pattern]
  );

  const dispatch = (newValue: T) => {
    if (newValue === value) return;

    const newParams = getParam();
    newParams.set(key, newValue.toString());

    // there is no "onstatechange" or similar event to listen for search param changes
    // so we'll dispatch a custom event to trigger a react state sync
    window.dispatchEvent(
      new CustomEvent<ParamChangeData<T>>("paramchange", {
        detail: { key, value: newValue, params: newParams },
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
    const listener = ((e: CustomEvent<ParamChangeData<T>>) => {
      if (e.detail && e.detail.key !== key) return;

      // set new value for param key or fallback to initial value
      setValue(e.detail?.value ?? initialValueRef.current);

      // set new search params
      history.pushState(null, "", `?${e.detail?.params.toString() ?? ""}`);
    }) as EventListenerOrEventListenerObject;

    window.addEventListener("paramchange", listener);

    return () => {
      window.removeEventListener("paramchange", listener);
    };
  }, [key, setValue]);

  return [value as Widen<T>, dispatch as (val: Widen<T>) => void] as const;
};

export const clearParams = () => {
  window.dispatchEvent(new CustomEvent("paramchange"));
};
