const connection = require('../database')

module.exports = function(req,res,next) {
    const id = req.params.id
    const ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

     console.log(ip)
     console.log(id)

    connection.query(
        "INSERT INTO favorites SET ?",
        {ip_address: ip, post_id: id},
        function(err, result) {
            console.log(err, result)
            return res.status(201).json({message:"success"})
        }
    )
}