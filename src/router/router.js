import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Book from '../component/Book';
import { Menu, Icon } from 'antd';
import { Layout } from 'antd';
const {
	Header, Sider, Content,
} = Layout;


export default class MyRouter extends React.Component{
	constructor(props) {
		super(props);
	}

	handleClick() {

	}

	render() {
		return (
			<div className='book'>
				<Layout className='book_layout'>
					<Sider className='book_side'>
						<div className='book_side_logo'>
							<img src='https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png'/>
							<span>书游</span>
						</div>
						<Menu
							onClick={this.handleClick.bind(this)}
							style={{ width: 256 }}
							theme="dark"
							defaultSelectedKeys={['1']}
							mode="inline">
							<Menu.Item key="1">
								<Icon type="pie-chart" />
								<span>书籍管理</span>
							</Menu.Item>
							<Menu.Item key="2" disabled>
								<Icon type="pie-chart" />
								<span>借书人员登记</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Header className='book_header'>书游后台管理系统</Header>
						<Content className='book_content'>
							<Router>
								<Route exact path="/" component={Book} />
								<Route exact path="/book" component={Book} />
							</Router>
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}
