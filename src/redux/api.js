// 외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리

import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const list = 'PLuYjs7JL1VFCBJV6rASuppjv0wuF4iTR7';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
	return await axios.get(url);
};

export const fetchMembers = async () => {
	return await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
};

/*
  [ 순수 함수 (Pure Function) ]
  - 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작 가능한 함수
  - 동일한 인수를 넣었을 때 동일한 값을 반환하는 함수
  - 컴포넌트 외부에서 독립적으로 동작하는 함수이므로 내부에 DOM 제어나 react hook 사용이 불가능

  [ 부수효과 (Side Effect) ]
  - 기존 컴포넌트 변경을 직접적으로 야기시키는 효과 (hook)
  - 컴포넌트 외부에서 사용할 수 없는 기능
*/
