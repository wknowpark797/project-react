import { useRef } from 'react';

export const useThrottle = (func) => {
	const eventBlocker = useRef(null);

	// HOC
	return () => {
		if (eventBlocker.current) return;
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 200); // 1초에 5번 실행
	};
};
