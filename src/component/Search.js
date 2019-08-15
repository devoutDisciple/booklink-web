import React from 'react';
import './book.less';
import {
	Form, Input, Col, Button
} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
import AddDilaog from './AddDialog';

class Search extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	// static propTypes = {
	//     style: PropTypes.object.isRequired
	// }

	onShowDialog() {
		this.setState({
			visible: !this.state.visible
		});
	}

	onSearch() {
		console.log(this.props.form.getFieldsValue());
		this.props.onSearch(this.props.form.getFieldsValue());
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		};
		const { getFieldDecorator } = this.props.form;
		const {visible} = this.state;
		return (
			<div className='book_search'>
				<Form className="book_search_form" {...formItemLayout} onSubmit={this.handleSubmit}>
					<Col span={10}>
						<FormItem
							label="书籍名称">
							{getFieldDecorator('name')(
								<Input placeholder="请输入书籍名称" />
							)}
						</FormItem>
					</Col>
					<Col span={10} offset={1}>
						<Button type='primary' onClick={this.onSearch.bind(this)}>查询</Button>
						<Button type='primary' onClick={this.onShowDialog.bind(this)}>新增</Button>
					</Col>
				</Form>
				{
					visible ?
						<AddDilaog onSearch={this.onSearch.bind(this)} onCloseDialog={this.onShowDialog.bind(this)}/>
						: null
				}
			</div>
		);
	}
}

Search.propTypes = {
	form: PropTypes.object.isRequired,
	getFieldDecorator: PropTypes.any,
	onSearch: PropTypes.func.isRequired
};

const SearchForm = Form.create()(Search);
export default SearchForm;
