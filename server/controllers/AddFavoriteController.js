const connection = require('../database')

module.exports = function(req,res,next) {
    const id = req.body.id || ""
    let ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

     //get only external ip
     ip = ip.split(',')[0]

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