import { useState, useRef } from 'react';

export const useDebounce = (value) => {
	const [Debounce, setDebounce] = useState(value);
	const eventBlocker = useRef(null);

	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebounce(value);
	}, 500);
	// 0.5초동안 입력을 멈추지 않는다면 함수가 호출되지 않는다.
	// 입력을 멈춘 후 0.5초가 지나면 함수가 호출된다.

	return Debounce;
};
