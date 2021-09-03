import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import './Detail.scss';
import { 재고context } from './App';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

let 박스 = styled.div`
	padding: 20px;
`;

let 제목 = styled.h4`
	font-size: 25px;
`;

function Detail(props) {
	useEffect(() => {
		let 타이머 = setTimeout(() => {
			setAlert(false);
		}, 2000);
		return () => {
			// 사라지기 전에 페이지를 떠나면 문제가 생길 수 있으니
			// 페이지를 나가기 전에 타이머를 제거 해 준다
			clearTimeout(타이머);
		};
	});

	// 방문했던 페이지 로직

	let 내가본상품 = [];
	let [local, setLocal] = useState([]);
	let history = useHistory();
	let { id } = useParams();
	let 찾은상품 = props.shoes.find((x) => x.id == id);
	let [alert, setAlert] = useState(true);
	let [누른탭, 누른탭변경] = useState(0);
	let [스위치, 스위치변경] = useState(false);

	let [inputData, setInputData] = useState('');

	let 재고 = useContext(재고context);

	useEffect(() => {
		if ('/detail.id') {
			// 로컬 스토리지에서 watched가 key인 값을 가지고 온다
			let arr = localStorage.getItem('watched');
			// 가지고 온 값을 JSON에서 데이터로 변환해주는데
			// arr가 null이면 push가 안되니깐 빈arr를 만들어준다
			if (arr == null) {
				arr = [];
			} else {
				// null이 아니면 arr값 변환해준다
				arr = JSON.parse(arr);
			}

			// useParams의 id값을 arr에 추가 해주는데
			arr.push(id);
			// 중복이 있으면 안되니까 제거해준다
			arr = new Set(arr);

			// 다시 배열 형태로 만들어 준다
			arr = [...arr];

			setLocal([...arr]);
			// 로컬로 받아온 arr에 해당하는 id를 가진 상품 띄우기

			localStorage.setItem('watched', JSON.stringify(arr));

			// local.map((a, i) => {
			// 	console.log('aa');
			// 	return (
			// 		<div className='watched_content'>
			// 			<div className='watched_content_img'>ㅇㅇㅇㅇ</div>
			// 			<div className='watched_content_name'>상품명</div>
			// 		</div>
			// 	);
			// });
		}
	}, []);

	for (var i = 0; i < local.length; i++) {
		// 로컬의 i 번째 값과 동일한 id를 가진 상품의 타이틀을 가져와야함
		let localShoes = parseInt(local[i]);
		let findShoes = props.shoes[localShoes];
		console.log(findShoes);

		내가본상품.push(
			<div className='watched_content'>
				<div className='watched_content_name'>{findShoes.title}</div>
				<div className='watched_content_img'>
					<img src={'https://codingapple1.github.io/shop/shoes' + (localShoes + 1) + '.jpg'} />
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<박스>
				<제목 className='red'>Detail</제목>
			</박스>

			<input onChange={(e) => setInputData(e.target.value)} />

			{alert === true ? (
				<div className='my-alert'>
					<p>재고가 얼마 남지 않았습니다</p>
				</div>
			) : null}

			<div className='row'>
				<div className='col-md-6'>
					<img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} width='100%' />
				</div>
				<div className='col-md-6 mt-4'>
					<h4 className='pt-5'>{찾은상품.title}</h4>
					<p>{찾은상품.content}</p>
					<p>{찾은상품.price}원</p>

					<Info 재고={props.재고}></Info>

					<button
						className='btn btn-danger'
						onClick={() => {
							// let 재고 = props.재고;
							let 재고사본 = [...props.재고];
							재고사본[0] -= 1;

							{
								props.재고변경(재고사본);
								props.dispatch({
									type: '항목추가',
									데이터: { id: 찾은상품.id, name: 찾은상품.title, quan: props.재고[0] },
								});
								history.push('/cart');
							}
						}}>
						주문하기
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							history.goBack();
						}}>
						뒤로가기
					</button>
				</div>
			</div>
			<div className='watched'>
				<div className='watched_title'>내가 본 상품</div>

				{내가본상품}
			</div>

			{/* mt-5->마진탑 5px  defaultActiveKey-> 처음에 기본으로 띄울이벤트키 */}
			<Nav className='mt-5' variant='tabs' defaultActiveKey='link-0'>
				<Nav.Item>
					<Nav.Link
						eventKey='link-0'
						onClick={() => {
							스위치변경(false);
							누른탭변경(0);
						}}>
						Active
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey='link-1'
						onClick={() => {
							스위치변경(false);
							누른탭변경(1);
						}}>
						Option 2
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						eventKey='link-2'
						onClick={() => {
							스위치변경(false);
							누른탭변경(2);
						}}>
						Option 3
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<CSSTransition in={스위치} classNames='wow' timeout={500}>
				<TapContent 누른탭={누른탭} 스위치변경={스위치변경} />
			</CSSTransition>
		</div>
	);
}

function TapContent(props) {
	useEffect(() => {
		props.스위치변경(true);
	});

	if (props.누른탭 === 0) {
		return <div>0번째 내용</div>;
	} else if (props.누른탭 === 1) {
		return <div>1번째 내용</div>;
	} else if (props.누른탭 === 2) {
		return <div>2번째 내용</div>;
	}
}

function Info(props) {
	return <p>재고 : {props.재고[0]}</p>;
}

function state를props화(state) {
	return {
		state: state.reducer,
		alert열렸니: state.reducer2,
	};
}

export default connect(state를props화)(Detail);
