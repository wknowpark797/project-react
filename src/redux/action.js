/* reducer로 전달되는 action객체 생성함수 */

// 인수로 전달된 값을 payload에 담아서 action객체를 반환하는 함수를 export
// 해당 action 생성함수는 컴포넌트에서 호출될 예정
// action객체는 컴포넌트에서 사용자가 생성하게 된다.

/* Members */
export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

/* Youtube */
export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	};
};

/*
  1. action.js -> action객체를 생성 후 리턴
  2. reducer.js -> action객체를 받아서 전역 데이터를 변형한 뒤 리턴
  3. store.js -> reducer가 반환한 객체를 전역 store 공간에 저장 후 export
  4. index.js -> store 전역 데이터 객체를 App 컴포넌트에 Provider로 전달
  5. 원하는 컴포넌트 어디에서든 useSelector로 store 데이터 호출 가능
*/
