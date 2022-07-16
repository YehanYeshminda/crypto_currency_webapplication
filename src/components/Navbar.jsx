import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
} from '@ant-design/icons';
import Icon from '../images/cryptocurrency.png';

const Navbar = () => {
	return (
		<div className="nav-container">
			<div className="logo-container">
				<Avatar src={Icon} />
				<Typography.Title level={2} className="logo">
					<Link to="/">CryptoCurrencies</Link>
				</Typography.Title>
				{/* <Button className="menu-control-container"></Button> */}
			</div>
		</div>
	);
};

export default Navbar;
