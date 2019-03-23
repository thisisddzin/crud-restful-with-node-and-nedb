const NeDB = require('nedb')

const db = new NeDB({
    filename: "database/users.db",
    autoload: true
})

module.exports = app => {

    const route = app.route("/users")
    const routeAdm = app.route("/users/admins")
    const routeId = app.route("/users/:id")

    //USERS

    route.get((req, res) => {

        db.find({}).sort({ name: 1 }).exec((err, users) => {

            if(err) {

                app.utils.error.send(err, req, res)

            } else {

                res.status(200).json({ users })

            }

        })
    
    })

    //BY ID
    routeId.get((req, res) => {

        db.findOne({ _id: req.params.id }).exec((err, user) => {

            if(err) {

                app.utils.error.send(err, req, res)

            } else {

                res.status(200).json({ user })

            }

        })
    
    })

    route.post((req, res) => {

        if(!app.utils.validator.user(app, req, res)) {
            return false
        }

        db.insert(req.body, (err, user) => {

            if (err) {
            
                app.utils.error.send(err, req, res)
            
            } else {

                res.status(200).json(user)

            }

        })  
        
    })
    
    routeId.put((req, res) => {

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {
            
                app.utils.error.send(err, req, res)
            
            } else {

                res.status(200).json(Object.assign({}, req.param.id, req.body))

            }

        })  
        
    })

    routeId.delete((req, res) => {

        db.remove({ _id: req.params.id }, {}, err => {

            if(err) {

                app.utils.error.send(err, req, res)

            } else {

                res.json({
                    success: {
                        msg: "User deleted successfully",
                        user: req.params.id
                    }
                })

            }

        })

    })
    
    //ADMINS

    routeAdm.get((req, res) => {
    
        res.json([])
    
    })

}