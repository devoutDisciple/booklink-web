import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import {
	Form, Input, Select, message, Spin, Row, Col
} from 'antd';
const { TextArea } = Input;
import AxiosRequest from '../request/AxiosRequest';
import config from '../config/config';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
const baseUrl = config.baseUrl;
const { Option } = Select;
const FormItem = Form.Item;
class EditDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			loading: false
		};
	}

	componentDidMount() {
		let data = this.props.data;
		this.props.form.setFieldsValue({
			name: data.name,
			author: data.author,
			type: String(data.type),
			borrow: String(data.borrow),
			price: data.price,
			desc: data.desc
		});
	}


	handleOk()  {
		this.props.form.validateFields(async (err, values) => {
			try {
				if (err) return;
				const formData = new FormData();
				let id = this.props.data.id;
				formData.append('name', values.name);
				formData.append('price', values.price);
				formData.append('author', values.author);
				formData.append('borrow', values.borrow);
				formData.append('desc', values.desc);
				formData.append('type', values.type);
				formData.append('id', id);
				this.setState({loading: true});
				// AxiosRequest.post(baseUrl + '/book/list/edit', formData).then(res => {
				// 	this.setState({loading: false});
				// 	if(res.success) {
				// 		this.props.onCloseDialog();
				// 		this.props.onSearch();
				// 		return message.success('编辑成功');
				// 	}
				// 	message.error('编辑失败');
				// });
				if(!this.cropper) {
					AxiosRequest.post(baseUrl + '/book/list/edit', formData).then(res => {
						formData.append('modify', 1);
						this.setState({loading: false});
						if(res.success) {
							this.props.onCloseDialog();
							this.props.onSearch();
							return message.success('编辑成功');
						}
						message.error('编辑失败');
					});
				}
				this.cropper.getCroppedCanvas().toBlob(async (blob) => {
					formData.append('modify', 2);
					formData.append('file', blob);
					AxiosRequest.post(baseUrl + '/book/list/edit', formData).then(res => {
						this.setState({loading: false});
						if(res.success) {
							this.props.onCloseDialog();
							this.props.onSearch();
							return message.success('编辑成功');
						}
						message.error('编辑失败');
					});
				});
			} catch (error) {
				this.setState({loading: false});
			}
		});
	}

	handleCancel() {
		this.props.onCloseDialog();
	}

	fileChange() {
		let self = this;
		let file = document.getElementById('swiper_dialog_img').files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onprogress = function(e) {
			if (e.lengthComputable) {
				// 简单把进度信息打印到控制台吧
				console.log(e.loaded / e.total + '%');
			}
		};
		reader.onload = function(e) {
			var image = new Image();
			image.src = e.target.result;
			let dom = document.querySelector('.swiper_dialog_preview');
			dom.innerHTML = '';
			dom.appendChild(image);
			self.cropper = new Cropper(image, {
				// aspectRatio: 72 / 97,
				zoomable: false,
				resizable: true
			});
		};
		reader.onerror = function() {
			message.warning('服务端错误, 请稍后重试');
		};
	}

	render() {
		console.log(this.props.data, 8899);
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		};
		return (
			<div>
				<Modal
					title="编辑书籍"
					visible={true}
					onOk={this.handleOk.bind(this)}
					onCancel={this.handleCancel.bind(this)}>
					<Spin spinning={this.state.loading}>
						<Form className="book_search_form" {...formItemLayout} onSubmit={this.handleSubmit}>
							<FormItem
								label="书籍名称">
								{getFieldDecorator('name', {
									rules: [{
										required: true,
										message: '请输入',
									}],
								})(
									<Input placeholder="请输入书籍名称" />
								)}
							</FormItem>
							<FormItem
								label="作者">
								{getFieldDecorator('author', {
									rules: [{
										required: true,
										message: '请输入',
									}],
								})(
									<Input placeholder="请输入书籍名称" />
								)}
							</FormItem>
							<FormItem
								label="所属类别">
								{getFieldDecorator('type', {
									rules: [{
										required: true,
										message: '请选择',
									}],
								})(
									<Select placeholder="请选择">
										<Option value="1">外国小说</Option>
										<Option value="2">中国小说</Option>
										<Option value="3">文学</Option>
										<Option value="4">艺术</Option>
										<Option value="5">经管</Option>
										<Option value="6">历史</Option>
										<Option value="7">人生哲理</Option>
										<Option value="8">其他</Option>
									</Select>
								)}
							</FormItem>
							<FormItem
								label="状态">
								{getFieldDecorator('borrow', {
									rules: [{
										required: true,
										message: '请输入',
									}],
								})(
									<Select placeholder="请选择">
										<Option value="1">借出</Option>
										<Option value="0">未借出</Option>
									</Select>
								)}
							</FormItem>
							<FormItem
								label="金额">
								{getFieldDecorator('price', {
									rules: [{
										required: true,
										message: '请输入',
									}],
								})(
									<Input placeholder="请输入金额" />
								)}
							</FormItem>
							<FormItem
								label="书籍描述">
								{getFieldDecorator('desc', {
									rules: [{
										required: true,
										message: '请输入',
									}],
								})(
									<TextArea placeholder="请输入书籍描述" autosize={{ minRows: 2, maxRows: 100 }} />
								)}
							</FormItem>
							<Row className='campus_container'>
								<Col span={4} className='campus_container_label'>图片录入：</Col>
								<Col span={20}>
									<input
										type="file"
										id='swiper_dialog_img'
										accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
										onChange={this.fileChange.bind(this)}/>
								</Col>
							</Row>
							<Row className='campus_container'>
								<Col span={4} className='campus_container_label'></Col>
								<Col span={20} className='swiper_dialog_preview'>
									<img src={this.props.data.url}/>
								</Col>
							</Row>
						</Form>
					</Spin>
				</Modal>
			</div>
		);
	}
}

EditDialog.propTypes = {
	onCloseDialog: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
	getFieldDecorator: PropTypes.any,
	data: PropTypes.any,
	onSearch: PropTypes.func,
};

const EditDialogForm = Form.create()(EditDialog);
export default EditDialogForm;
