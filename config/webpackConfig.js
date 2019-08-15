module.exports = {
	dev: {
		port: 8002,
		publicPath: '/',
		openBrowser: false,
	},
	prod: {
		publicPath: '../dist/',
		API_SERVER: 'http://100.81.3.1:8888/'
	}
};
