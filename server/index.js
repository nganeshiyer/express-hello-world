//require("dotenv-safe").load();
require("dotenv").config({ path: "./.env" });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
const fs = require("fs");
var debug = require("debug")("apple-pay");
const https = require("https");
var merchant = require("./merchant");
var payment = require("./payment");

var authorizedOrigins = ""; //process.env.AUTHORIZED_ORIGINS.split(",");
//"start": "forever start server/index.js && forever logs -f 0",
// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			callback(null, authorizedOrigins.indexOf(origin) !== -1);
// 		},
// 	})
// );

app.use(cors());
app.use(bodyParser.json());
app.post("/merchant-validate", merchant.validate);
app.post("/payment-authorize", payment.authorize);
app.get(
	"/.well-known/apple-developer-merchantid-domain-association.txt",
	function (req, res) {
		res.send(
			fs.readFileSync("./apple-developer-merchantid-domain-association.txt")
		);
	}
);
app.use(express.static("public"));
const httpsOptions = {
	key: fs.readFileSync("./key.pem"),
	cert: fs.readFileSync("./cert.pem"),
	requestCert: false,
	rejectUnauthorized: false,
};

// app.listen(process.env.PORT || 4000, function () {
// 	debug("Express is listening.");
// });
const server = https.createServer(httpsOptions, app).listen(4000, () => {
	console.log("server running at " + 4000);
});