import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/CryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
	'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory: 'Cryptocurrency',

		// if in the home page the count will be 10 else 100
		count: simplified ? 6 : 12,
	});

	if (!cryptoNews?.value) return 'Loading Data...';

	console.log(cryptoNews);
	return (
		<Row gutter={[24, 24]}>
			{cryptoNews.value.map((news, index) => (
				<Col xs={24} sm={12} lg={8} key={index}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									style={{ maxWidth: '200px', maxHeight: '100px' }}
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt="cryto Image"
									srcset=""
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
										alt="provider img"
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									&nbsp; {moment(news.dataPublished).startOf('ss').fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
