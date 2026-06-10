import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __JUCE__?: {
      backend: {
        addEventListener: (
          event: string,
          callback: (data: unknown) => void,
        ) => () => void;
        emitEvent: (event: string, data: unknown) => void;
      };
    };
  }
}

export function useJuceSlider(
  id: string,
  defaultValue: number = 0,
): [number, (value: number) => void] {
  const [value, setValue] = useState<number>(defaultValue);
  const isUpdatingFromJuce = useRef(false);

  useEffect(() => {
    const backend = window.__JUCE__?.backend;
    if (!backend?.addEventListener) return;

    const unsubscribe = backend.addEventListener(id, (data) => {
      const eventData = data as { scaledValue?: number };
      if (eventData.scaledValue !== undefined) {
        isUpdatingFromJuce.current = true;
        setValue(eventData.scaledValue);
        isUpdatingFromJuce.current = false;
      }
    });

    return () => unsubscribe?.();
  }, [id]);

  const setValueFromUI = useCallback(
    (newValue: number) => {
      setValue(newValue);
      if (isUpdatingFromJuce.current) return;

      window.__JUCE__?.backend?.emitEvent(id, { value: newValue });
    },
    [id],
  );

  return [value, setValueFromUI];
}
