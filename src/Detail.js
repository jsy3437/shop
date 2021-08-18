import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

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

	let history = useHistory();
	let { id } = useParams();
	let 찾은상품 = props.shoes.find((x) => x.id == id);
	let [alert, setAlert] = useState(true);

	let [inputData, setInputData] = useState('');

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
					<img src='https://codingapple1.github.io/shop/shoes1.jpg' width='100%' />
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
		</div>
	);
}

function Info(props) {
	return <p>재고 : {props.재고[0]}</p>;
}

export default Detail;
