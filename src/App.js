import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';

// imports of the pages
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import CrytoDetails from './components/CrytoDetails';
import News from './components/News';
import CryptoCurrencies from './components/CryptoCurrencies';

function App() {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="routes">
						{/* routing done with 5.2 */}
						<Switch>
							<Route exact path="/">
								<Homepage />
							</Route>
							<Route exact path="/exchanges">
								<Exchanges />
							</Route>
							<Route exact path="/crytoCurrencies">
								<CryptoCurrencies />
							</Route>
							<Route exact path="/cryto/:coinid">
								<CrytoDetails />
							</Route>
							<Route exact path="/news">
								<News />
							</Route>
						</Switch>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: 'white', textAlign: 'center' }}
					>
						Crypto Website <br />
						All rights reserved : Yehan Yeshminda
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/exchanges">Exchanges</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}

export default App;
