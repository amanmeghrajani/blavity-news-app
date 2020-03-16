const connection = require('../database')

module.exports = function(req,res,next) {
    let ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

     //get only external ip
    ip = ip.split(',')[0]

    connection.query(
        "SELECT post_id FROM `favorites` WHERE ip_address = ?",
        ip,
        function(error, results, fields) {
            let dataArray = []
            results.forEach(function(result) {
                dataArray.push(result["post_id"])
            })
            return res.status(200).json({message: "success", data: dataArray})
        }
    )
}