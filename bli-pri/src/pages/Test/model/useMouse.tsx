import { useCallback, useRef } from "react";

export const useMouse = (callback: () => void, delay: number) => {
	const isThrottled = useRef<boolean | null>(null);

	const throttledCallback = useCallback(() => {
		if (isThrottled.current) return

		callback();
		isThrottled.current = true;
		setTimeout(() => isThrottled.current = false, delay)
	}, [callback, delay])

	return throttledCallback
}