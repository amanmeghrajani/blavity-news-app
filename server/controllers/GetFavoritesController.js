const connection = require('../database')

module.exports = function(req,res,next) {
    const ip = req.connection.remoteAddress ||
    req.headers['x-forwarded-for'] || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    connection.query(
        "SELECT post_id FROM `favorites` WHERE ip_address = ?",
        ip,
        function(error, results, fields) {
            return res.status(200).json({message: "success", data: results})
        }
    )
}