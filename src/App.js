/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import JumboTron from './Jumbotron';
import NavBar from './NavBar';
import Detail from './Detail';
import Data from './data';

import { Link, Route, Switch } from 'react-router-dom';

function App() {
	let [shoes, shoes변경] = useState(Data);
	let [재고, 재고변경] = useState([10, 11, 12]);

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/'>
					<NavBar />
					<JumboTron />
					<div className='container'>
						<div className='row'>
							{shoes.map((a, i) => {
								return <Card shoes={a} i={i} />;
							})}
						</div>
						<Button
							className='bnt bnt-primary'
							onClick={() => {
								// 로딩중 UI 띄움

								axios
									.get('https://codingapple1.github.io/shop/data2.json')
									// get 요청이 성공했을때 실행할 것
									.then((result) => {
										// 로딩중 UI 없앰
										console.log(result.data);

										shoes변경([...shoes, ...result.data]);
									})
									// get 요청이 실패했을때 실행할 것
									.catch(() => {
										// 로딩중 UI 없앰
										console.log('실패');
									});
							}}>
							더보기
						</Button>
					</div>
				</Route>

				<Route path='/detail/:id'>
					<NavBar />
					<Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
				</Route>
			</Switch>
		</div>
	);
}

function Card(props) {
	return (
		<div className='col-md-4'>
			<img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
			<h4>{props.shoes.title}</h4>
			<p>
				{props.shoes.content} & {props.shoes.price}원
			</p>
		</div>
	);
}

export default App;
