import React from 'react';
import { Link } from 'react-router-dom';
//antd
import { Layout, Menu, Icon, } from 'antd';
const { Content, Footer, Header } = Layout;
const { SubMenu } = Menu;

export default ({ children }) => {
	// const [collapsed, setCollapsed] = useState(false);

	// const onCollapse = collapsed => {
	// 	setCollapsed(collapsed)
	// };

	return (
		// <Layout style={{ minHeight: '100vh' }}>
		// 	<Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme='light'>
		// 		{/* <div style={{
		// 			background: 'rgba(255, 255, 255, 0.2)',
		// 			height: 32,
		// 			margin: '16px 16px 0px 16px'
		// 		}}>
		// 			Data Visualization
		// 		</div> */}
		// 		<Menu theme="light"  mode="inline">
		// 			<Menu.Item key="1">
		// 				<Link to={`/data`}>
		// 					<Icon type="database" />
		// 					<span>Data</span>
		// 				</Link>
		// 			</Menu.Item>
		// 			<Menu.Item key="2">
		// 				<Link to={`/map`}>
		// 					<Icon type="global" />
		// 					<span>Map</span>
		// 				</Link>
		// 			</Menu.Item>
		// 			<SubMenu
		// 				key="sub1"
		// 				title={
		// 					<span>
		// 						<Icon type="area-chart" />
		// 						<span>Chart</span>
		// 					</span>
		// 				}
		// 			>
		// 				<Menu.Item key="3">
		// 					<Link to={`/area-chart`}>
		// 						Area Chart
		// 					</Link>
		// 				</Menu.Item>
		// 				<Menu.Item key="4">
		// 					<Link to={`/tree-map`}>
		// 						Tree Map
		// 					</Link>
		// 				</Menu.Item>
		// 			</SubMenu>
		// 		</Menu>
		// 	</Sider>
		// 	<Layout>
		// 		<Content style={{ margin: '0 16px' }}>
		// 			<div style={{ padding: 24, background: '#fff', minHeight: 'calc(100% - 70px)' }}>{children}</div>
		// 		</Content>
		// 		<Footer style={{ textAlign: 'center' }}>Data Visualization ©2018 Created by Xuan Hien</Footer>
		// 	</Layout>
		// </Layout>
		<Layout>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'transparent', padding: 0 }}>
				<div className="logo" />
				<Menu mode="horizontal">
					<Menu.Item key="data">
						<Link to={`/data`}>
							<Icon type="database" />
							<span>Data</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="map">
						<Link to={`/map`}>
							<Icon type="global" />
							<span>Map</span>
						</Link>
					</Menu.Item>
					<SubMenu
						title={
							<span className="submenu-title-wrapper">
								<Icon type="area-chart" />
								Chart
            				</span>
						}
					>
						<Menu.Item key="area-chart">
							<Link to={`/area-chart`}>
								Area Chart
					</Link>
						</Menu.Item>
						<Menu.Item key="tree-map">
							<Link to={`/tree-map`}>
								Tree Map
					</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Header>
			<Content style={{ padding: '0px 16px', marginTop: 64 }}>
				<div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 134px)' }}>{children}</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>Data Visualization ©2019 Created by Xuan Hien</Footer>
		</Layout>
	)
}