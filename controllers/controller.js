const crypto = require("crypto");
const pool_config = require("../pool_config");

exports.test = (req, res) => {
    return res.status(200).json({ status: true, message:"test API" })
}

function generateShortURL() {
    return crypto.randomBytes(4).toString('hex');
}

function executedQuery(query, pool_name) {
    return new Promise((resolve, reject) => {
        const pool = pool_config[pool_name];
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            connection.query(query, (err, result) => {
                connection.destroy()
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log(result);
                    return resolve(result);
                }
            })
        })
    })

}

exports.shorten_url = (req, res) => {
    const original_url = req.body.url;
    const shorten_url = generateShortURL();

    let query = `
        INSERT INTO urls(original_url, shorten_url )
        VALUES('${original_url}', '${shorten_url}')
    `;
    executedQuery(query, "shortenUrlDB")
        .then((result) => {
            return res.status(200).json({ 
                status: true, 
                message: "Short URL created successfully", 
                short_url: `http://localhost:${process.env.PORT}/${shorten_url}`
            });
        })
        .catch((err) => {
            return res.status(400).json({ status: false, error: err});
        })
}

exports.get_original_url = (req, res) => {
    const { short_url } = req.params;
    let query = `SELECT * FROM urls WHERE shorten_url = '${short_url}'`;
    executedQuery(query, "shortenUrlDB")
        .then((result) => {
            if (result.length > 0) {
                return res.redirect(result[0].original_url)
            }
            return res.status(400).json({ status: false, message: "Cannot find short URL" });
        })
        .catch((err) => {
            return res.status(400).json({ status: false, message: "Error while find short URL", error: err});
        })
}