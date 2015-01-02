// app/routes.js
module.exports = function(app, passport) {
    
    app.get('/', isLoggedIn, function(req, res) {
        res.render('home.html');
    });

    app.get('/signin', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signin.html', { error: req.flash('error'), success: req.flash('success') }); 
    });
    
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.html', { error: req.flash('error'), success: req.flash('success') });
    });
    
    // process the signup form
    app.post('/signup', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/signup');
        } else {
            req.flash('success', info.message);
              return res.redirect('/');
        }
      })(req, res, next);
    });    
    
    // process the signup form
    app.post('/signin', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/signin');
        } else {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                req.flash('success', info.message);
                return res.redirect('/');
            });
        }
      })(req, res, next);
    });    
    
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        console.log("404 URL: " + req.url);
        var err = new Error('Not Found: ' + req.url);
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/signin');
}
