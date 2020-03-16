const connection = require('../database')

module.exports = function(req,res,next) {
    const id = req.body.id || ""
    let ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    //get only external ip
    ip = ip.split(',')[0]
    
    connection.query(
        "DELETE FROM `favorites` WHERE ip_address = ? AND post_id = ?",
        [ip, id],
        function(error, results, fields) {
            return res.status(200).json({message:"success"})
        }

    )

}