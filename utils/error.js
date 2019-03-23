module.exports = {
    send: (err, req, res, code = 400) => {

        console.error("Error to get all users of db: ", err)

        res.status(code).json({
            error: err
        })

    }
}