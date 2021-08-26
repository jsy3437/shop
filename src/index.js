import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let 초기값 = [
	{ id: 0, name: '멋진신발', quan: 2 },
	{ id: 1, name: '멋진신발2', quan: 1 },
];

function reducer(state = 초기값, 액션) {
	// 요청이 '수량증가' 이면
	if (액션.type === '수량증가' || 액션.type === '수량감소') {
		// 초기값을 복사해서
		let copy = [...state];
		// 복사본에 수량을 1더해주고
		액션.type === '수량증가' ? copy[0].quan++ : copy[0].quan--;

		// 복사본을 리턴해준다
		return copy;
		// 요청이 들어오지 않으면
	} else {
		// 초기값을 리턴해준다
		return state;
	}
}

let alret초기값 = true;

function reducer2(state = alret초기값, 액션) {
	if (액션.type === '창닫기') {
		state = false;
		return state;
	} else {
		return state;
	}
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
