/* 전역으로 관리할 데이터가 저장될 전역 객체를 생성 */

import { createStore } from 'redux';
import reducers from './reducer';

// store 공간을 생성한 후 reducer가 반환한 전역 데이터를 저장
const store = createStore(reducers);
export default store;
