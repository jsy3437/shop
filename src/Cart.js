import React from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';

import { Navbar, Table } from 'react-bootstrap';

function Cart(props) {
	return (
		<div>
			<Table responsive='sm'>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경</th>
					</tr>
				</thead>
				<tbody>
					{props.state.map((a, i) => {
						return (
							<tr key={i}>
								<td>{a.id}</td>
								<td>{a.name}</td>
								<td>{a.quan}</td>
								<td>
									<button
										onClick={() => {
											// 리듀서로 수정요청을 한다
											props.dispatch({ type: '수량증가' });
										}}>
										+
									</button>
									<button
										onClick={() => {
											props.dispatch({ type: '수량감소' });
										}}>
										-
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			{props.alert열렸니 === true ? (
				<div className='my-alert2'>
					<p>지금 구매하시면 신규할인 20%</p>
					<button
						onClick={() => {
							props.dispatch({ type: '창닫기' });
						}}>
						닫기
					</button>
				</div>
			) : null}
		</div>
	);
}

function state를props화(state) {
	return {
		state: state.reducer,
		alert열렸니: state.reducer2,
	};
}

export default connect(state를props화)(Cart);
