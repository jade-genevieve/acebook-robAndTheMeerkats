var User = require('../models/user');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var UserController  = {
    Create: function (req, res) {
        var form = req.body;
        var passwordHash = bcrypt.hashSync(form.password, salt);
        // User.find({email: form.email}), function (err, docs) {
        //     if (err) { throw err; }
        //     if (docs.length){
        //         res.send("Error. User already exists")
        //     } else{
                var user = new User({
                    firstName: form.firstName,
                    surname: form.surname,
                    email: form.email,
                    dob: form.dob,
                    password: passwordHash
                });
                user.save(function(err) {
                    if (err) {throw err; }
                    res.send("success")
                });
            },
        // } 
    // }
    Index: function(req, res) {
        var form = req.body;
        User.findOne({email: form.email }, function(err, user) {
          if (err) { throw err; }
          if(user) {
            if(bcrypt.compareSync(form.password, user.password)) {
                res.redirect("/posts");
            } else {
                res.redirect("/");
            }
          }
        });
    },
}

module.exports = UserController;