module.exports = {

    user: (app, req, res) => {

        req.assert("name", "The name is invalid.").notEmpty()
        req.assert("password", "The password is invalid.").notEmpty()
        req.assert("email", "The email is invalid.").notEmpty()

        const errors = req.validationErrors()

        if(errors) {

            app.utils.error.send(errors, req, res)

            return false

        } else {

            return true

        }

    }

}