import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import './style/common.css';
import './style/main.less';
import Router from './router/router';

const render = () => {
	ReactDOM.render(
		<LocaleProvider locale={zhCN}>
			<Router/>
		</LocaleProvider>,
		document.getElementById('root')
	);
};
render();

