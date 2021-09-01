/* eslint-disable */
import React, { useContext, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import JumboTron from './Jumbotron';
import NavBar from './NavBar';
import Detail from './Detail';
import Data from './data';
import Cart from './Cart';
import { useHistory } from 'react-router';

import { Link, Route, Switch } from 'react-router-dom';

export let 재고context = React.createContext();

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
						<재고context.Provider value={재고}>
							<div className='row'>
								{shoes.map((a, i) => {
									return <Card shoes={a} i={i} />;
								})}
							</div>
						</재고context.Provider>

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

				<Route path='/cart'>
					<Cart />
				</Route>

				<Route path='/detail/:id'>
					<NavBar />
					<재고context.Provider value={재고}>
						<Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
					</재고context.Provider>
				</Route>
			</Switch>
		</div>
	);
}

function Card(props) {
	let 재고 = useContext(재고context);
	let history = useHistory();

	return (
		<div
			className='col-md-4'
			onClick={() => {
				history.push('/detail/' + props.shoes.id);
			}}>
			<img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='100%'></img>
			<h4>{props.shoes.title}</h4>
			<p>
				{props.shoes.content} & {props.shoes.price}원
			</p>
			{재고[props.i]}
		</div>
	);
}

export default App;
