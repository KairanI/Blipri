import { useEffect, useRef } from "react";
import { dataChart, timerTyping, words } from "../../../shared/lib/constant";
import { IfocusSettings } from "../../../shared/Types/interface";
import { calculationWPM } from "../../../features/calculationWPM";

export const useTimer = ({ focusSettings } : { focusSettings: IfocusSettings | null}) => {
	const lastFrameTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTimer = (currentTime: number) => {
      if (focusSettings?.activeTest) {
        if (lastFrameTimeRef.current !== null) {
          const deltaTime = currentTime - lastFrameTimeRef.current;
          if (deltaTime >= 1000) {
            timerTyping.second += 1;
            const [wpm, raw]: [number, number] = calculationWPM('wpm');
            dataChart.push({
              second: timerTyping.second,
              wpm: wpm,
              raw: raw,
              errors: {
                  error: dataChart.length == 0 ? words.errors : 0,
                  raw: 0,
              }
            });
            lastFrameTimeRef.current = currentTime;
          }
        } else {
          lastFrameTimeRef.current = currentTime;
        }

        animationFrameIdRef.current = requestAnimationFrame(updateTimer);
      }
    };

    if (focusSettings?.activeTest) animationFrameIdRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameIdRef.current !== null) cancelAnimationFrame(animationFrameIdRef.current);
      lastFrameTimeRef.current = null;
    };
  }, [focusSettings?.activeTest]);
}