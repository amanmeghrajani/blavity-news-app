const connection = require('../database')

module.exports = function(req,res,next) {
    const id = req.params.id
    const ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    connection.query(
        "DELETE FROM `favorites` WHERE ip_address = ? AND post_id = ?",
        [ip, id],
        function(error, results, fields) {
            return res.status(200).json({message:"success"})
        }

    )

}