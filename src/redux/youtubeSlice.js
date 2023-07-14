/*
	- 외부 데이터 Fetching함수 정의 및 export
	- 외부 데이터 함수의 결과값에 따라 전역상태를 변경하는 함수
*/

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 비동기 서버통신으로 데이터를 전달받아서 내부적으로 action type을 자동 생성하고 action객체 생성까지 완료
export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const list = 'PLuYjs7JL1VFCBJV6rASuppjv0wuF4iTR7';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
