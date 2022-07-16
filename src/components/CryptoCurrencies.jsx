import React from 'react';
import { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/CryptoApi';

// this default simplied is set to true
const CryptoCurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptoListData, isFetching } = useGetCryptosQuery(count);
	const [crytos, setCrytos] = useState(cryptoListData?.data?.coins);

	console.log(crytos);

	if (isFetching) return 'Loading Page...';

	return (
		<>
			<Row gutter={[32, 32]} className="crypto-card-container">
				{crytos?.map((ele) => (
					<Col xs={24} sm={12} lg={6} className="crypto-card" key={ele.id}>
						<Link to={`/cryto/${ele.id}`}>
							<Card
								title={`${ele.rank}. ${ele.name}`}
								extra={<img className="crypto-image" src={ele.iconUrl} />}
								hoverable
							>
								<p>Price: {millify(ele.price)}</p>
								<p>Market Cap: {millify(ele.marketCap)}</p>
								<p>Daily Change: {ele.change}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default CryptoCurrencies;
