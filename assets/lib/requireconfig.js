var app = {};
app.path = '/';
app.staticServer = '/aixueniao/';
app.baseUrl = app.staticServer;
app.picUrl='/images/';

require.config({
	baseUrl:app.staticServer,
	waitSeconds: 3000,
	urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
		'understore': 'assets/lib/understore',
		'class': 'assets/lib/class',
        'text': 'assets/lib/text',
		'jquery': 'assets/lib/jquery-1.9.1.min',
		'message':'assets/js/message',
        'vue':'assets/lib/vue.min',
        'fanUtils':'assets/lib/fanUtils0.1',
	},
	shim: {
        
		'underscore':{
			exports: '_'
		},
        'message': {
            deps: ['jquery']
        },
	    
        'fanUtils': {
            deps: ['jquery']
        },
        
	}
});
