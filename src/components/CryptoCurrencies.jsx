import React from 'react';
import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/CryptoApi';

// this default simplied is set to true
const CryptoCurrencies = ({ simplified }) => {
	// changing the size according to the view which means if simplified change to 12 else 100
	const count = simplified ? 10 : 100;
	const { data: cryptoListData, isFetching } = useGetCryptosQuery(count);
	const [crytos, setCrytos] = useState(cryptoListData?.data?.coins);
	const [searchName, setSearchName] = useState('');

	// use state will only work if one of the following below is true for the dependencies
	useEffect(() => {
		//
		// we do not need this line because we are already setting it below
		/* ---------------- //setCrytos(cryptoListData?.data?.coins); --------------- */

		// this line will allow us to search by filetering the data which we get
		const filteredData = cryptoListData?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchName.toLowerCase())
		);
		setCrytos(filteredData);
	}, [cryptoListData, searchName]);

	if (isFetching) return 'Loading Page...';

	return (
		<>
			{/* will only show up when on the search more page */}
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search crypto Currecy!"
						onChange={(e) => setSearchName(e.target.value)}
					/>
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{crytos?.map((ele) => (
					<Col xs={24} sm={12} lg={6} className="crypto-card" key={ele.uuid}>
						<Link key={ele.uuid} to={`/crypto/${ele.uuid}`}>
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
