import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/CryptoApi';

const { Title, Text } = Typography;
const Option = Select;

const CryptoDetails = () => {
	// takes the id in the url and allows us to use inside of this form
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState('7d');

	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

	const cryptoDetailsGet = data?.data?.coin;
	const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

	const stats = [
		{
			title: 'Price to USD',
			value: `$ ${cryptoDetailsGet?.price && millify(cryptoDetailsGet?.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: 'Rank', value: cryptoDetailsGet?.rank, icon: <NumberOutlined /> },
		{
			title: '24h Volume',
			value: `$ ${
				cryptoDetailsGet?.volume && millify(cryptoDetailsGet?.volume)
			}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: 'Market Cap',
			value: `$ ${
				cryptoDetailsGet?.marketCap && millify(cryptoDetailsGet?.marketCap)
			}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: 'All-time-high(daily avg.)',
			value: `$ ${
				cryptoDetailsGet?.allTimeHigh?.price &&
				millify(cryptoDetailsGet?.allTimeHigh?.price)
			}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats = [
		{
			title: 'Number Of Markets',
			value: cryptoDetailsGet?.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: 'Number Of Exchanges',
			value: cryptoDetailsGet?.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: 'Aprroved Supply',
			value: cryptoDetailsGet?.supply?.confirmed ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: 'Total Supply',
			value: `$ ${
				cryptoDetailsGet?.supply?.total &&
				millify(cryptoDetailsGet?.supply?.total)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: 'Circulating Supply',
			value: `$ ${
				cryptoDetailsGet?.supply?.circulating &&
				millify(cryptoDetailsGet?.supply?.circulating)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<div>
			<Col className="coin-detail-container">
				<Col className="coin-heading-container">
					<Title level={2} className="coin-name">
						{/* slug means an alt name*/}
						{cryptoDetailsGet.name}
					</Title>
					<p>
						{cryptoDetailsGet.name} Live price in US Dollars. View value
						statistics, Market cap and Supply
					</p>
				</Col>
				<Select
					defaultValue="7d"
					className="select-timeperiod"
					placeholder="Select time period"
					onChange={(value) => setTimePeriod(value)}
				>
					{time.map((dateSet) => (
						<Option key={dateSet}>{dateSet}</Option>
					))}
				</Select>

				{/* LINE CHART RENDER */}

				<Col className="stats-container">
					<Col className="coin-value-statistics">
						<Col className="coin-value-statistics-heading">
							<Title level={3} className="coin-details-heading">
								{cryptoDetailsGet.name} Value Statistics
							</Title>
							<p>
								An overview showing the statistics of {cryptoDetailsGet.name},
								such as the base and quote currency, the rank, and trading
								volume.
							</p>
						</Col>
						{stats.map(({ icon, title, value }) => (
							<Col className="coin-stats">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))}
					</Col>
				</Col>
			</Col>
		</div>
	);
};

export default CryptoDetails;
