/* reducer로 전달되는 action객체 생성함수 */

// 인수로 전달된 값을 payload에 담아서 action객체를 반환하는 함수 export
// 해당 action 생성함수는 추후 컴포넌트에서 호출될 예정
export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};
