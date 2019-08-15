import React from 'react';
import './book.less';
import {Table, Popconfirm, message, Tooltip} from 'antd';
import AxiosRequest from '../request/AxiosRequest';
import config from '../config/config';
const baseUrl = config.baseUrl;
import Search from './Search';
import EditDialog from './EditDialog';



export default class Book extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: true,
			visible: false
		};
	}

	async componentDidMount() {
		this.onSearch();
	}

	onSearch(params={}) {
		AxiosRequest.get(baseUrl + '/book/list/all', params).then(res => {
			let data = res.data || [];
			data.map(item => {
				item.key = item.id;
			});
			this.setState({
				loading: false,
				dataSource: data
			});
		});
	}

	// 编辑
	onEdit(record) {
		this.setState({
			editData: record,
			visible: true
		});
	}

	// 编辑弹框的关闭与打开
	onShowDialog() {
		this.setState({visible: !this.state.visible});
	}

	// 删除
	onConfirm(record) {
		console.log(record);
		AxiosRequest.get(baseUrl + '/book/list/delete', {id: record.id}).then(res => {
			console.log(res);
			if(res.success) {
				this.onSearch();
				return message.success('删除成功');
			}
			message.error('删除失败!');
		});
	}

	render() {
		const columns = [{
			title: '书籍ID',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: '书籍名称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '作者',
			dataIndex: 'author',
			key: 'author',
		},   {
			title: '图片',
			dataIndex: 'url',
			key: 'url',
			render:(text, record) => {
				/*eslint-disable*/
				return <a href={record.url} target="_blank">查看</a>;
			}
		}, {
			title: '所属类别',
			dataIndex: 'type',
			key: 'type',
			render: (text, record) => {
				let type = '';
				switch(Number(record.type)) {
				case 1:
					type = '外国小说';
					break;
				case 2:
					type = '中国小说';
					break;
				case 3:
					type = '文学';
					break;
				case 4:
					type = '艺术';
					break;
				case 5:
					type = '经管';
					break;
				case 6:
					type = '历史';
					break;
				case 7:
					type = '人生哲理';
					break;
				case 8:
					type = '其他';
					break;
				default :
					type = '其他';
				}
				return (
					<span>{type}</span>
				);
			}
		},  {
			title: '状态',
			dataIndex: 'borrow',
			key: 'borrow',
			render: (text, record) => {
				// o - 未借出 1- 借出
				return (
					<span>{record.borrow ? '借出': '未借出'}</span>
				);
			}
		}, {
			title: '书籍描述',
			dataIndex: 'desc',
			key: 'desc',
			render: (text, record) => {
				return <Tooltip placement="bottom" title={record.desc}>
					<span className='book_table_desc'>{record.desc}</span>
				</Tooltip>;
			}
		}, {
			title: '金额(￥)',
			dataIndex: 'price',
			key: 'price'
		},{
			title: '操作',
			dataIndex: 'edit',
			key: 'edit',
			render: (text, record) => {
				return (
					<span className='book_table_operation'>
						<a href="javascript:;" onClick={this.onEdit.bind(this, record)}>编辑</a>
						<Popconfirm placement="topLeft" title="是否确认删除?" onConfirm={this.onConfirm.bind(this, record)} okText="确认" cancelText="取消">
							<a href="javascript:;">删除</a>
						</Popconfirm>

					</span>
				);
			}
		}];
		const {dataSource, loading, visible, editData} = this.state;
		return (
			<div className='book_content_form'>
				<Search onSearch={this.onSearch.bind(this)}/>
				<div className='book_table'>
					<Table bordered loading={loading} dataSource={dataSource} columns={columns} />
				</div>
				{
					visible ?
						<EditDialog data={editData} onSearch={this.onSearch.bind(this)} onCloseDialog={this.onShowDialog.bind(this)}/>
						: null
				}
			</div>
		);
	}
}
