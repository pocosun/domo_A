var requiresLogin = function(req, res, next){

	if(!req.session.account){
		return res.redirect('/');
	}

	next();
};

var requiresLogout = function(req, res, next){

	if(req.session.account){
		return res.redirect('/maker');
	}

	next();
};

var requiresSecure = function(req, res, next){

	if(req.headers['x-forwarded-photo'] != 'https'){
		return res.redirect('https://' + req.hosname + req.url);
	}

	next();
};

var bypasseSecure = function(req, res, next){
	next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if(process.env.NODE_ENV === "production"){
	module.exports.requiresSecure = requiresSecure;
}
else{
	module.exports.requiresSecure = bypasseSecure;
}