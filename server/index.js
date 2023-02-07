//require("dotenv-safe").load();
require("dotenv").config({ path: "./.env" });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
const fs = require("fs");
var debug = require("debug")("apple-pay");
// const https = require("https");
var merchant = require("./merchant");
var payment = require("./payment");
const port = process.env.PORT || 3001;

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


//app.get("/test", (req, res) => res.type('html').send('Hello World!11111'));
app.get("/test", (req, res) => res.send(
    fs.readFileSync("./apple-developer-merchantid-domain-association.txt")
  ));
app.get("/.well-known/apple-developer-merchantid-domain-association",(req, res) => res.send(
    fs.readFileSync("./apple-developer-merchantid-domain-association.txt")
  ));
app.get("/.well-known/apple-developer-merchantid-domain-association.txt",(req, res) => res.send(
    fs.readFileSync("./apple-developer-merchantid-domain-association.txt")
  ));
app.use(express.static("public"));

app.listen(port, () => console.log(`Example appp app listening on port ${port}!`));

// const httpsOptions = {
//   key: fs.readFileSync("./key.pem"),
//   cert: fs.readFileSync("./cert.pem"),
//   requestCert: false,
//   rejectUnauthorized: false,
// };

// app.listen(process.env.PORT || 4000, function () {
// 	debug("Express is listening.");
// });
// const server = https.createServer(httpsOptions, app).listen(port, () => {
//   console.log("server running at " + port);
// });

const key =`MIIQngYJKoZIhvcNAQcCoIIQjzCCEIsCAQExCzAJBgUrDgMCGgUAMIGsBgkqhkiG9w0BBwGggZ4E
gZt7InRlYW1JZCI6IlNaRzY5UDIyTlkiLCJkb21haW4iOiJuZ2FuZXNoaXllci1saXRlcmF0ZS13
YWZmbGUteHFyNTY5cnd2cHBocDR2ai0zMDAxLnByZXZpZXcuYXBwLmdpdGh1Yi5kZXYiLCJkYXRl
Q3JlYXRlZCI6IjIwMjMtMDItMDEsMjE6MTY6MTEiLCJ2ZXJzaW9uIjoxfaCCDT8wggQ0MIIDHKAD
AgECAghj5xwhnRqTJzANBgkqhkiG9w0BAQsFADBzMS0wKwYDVQQDDCRBcHBsZSBpUGhvbmUgQ2Vy
dGlmaWNhdGlvbiBBdXRob3JpdHkxIDAeBgNVBAsMF0NlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMw
EQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yMjAzMTcyMTI5MThaFw0yNzAzMTYy
MTI5MTdaMFkxNTAzBgNVBAMMLEFwcGxlIGlQaG9uZSBPUyBQcm92aXNpb25pbmcgUHJvZmlsZSBT
aWduaW5nMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBAL545kd0HzXjUSi4mFuR-2-zoKUoYFeReTUKbBSiadlp5IMZ6rPRgaOR
CH63HtCpqJj3MUQPnZePc8hBaO9qBVH8enPgGXzWsuHaJ-q3yyyP4hh7ZZjSYVo8MCQ7fglx6Tx-
v2nUw2IYWcMxint35iK1EeNHmLfnnY65qmGBs5DxOE3IT6wEJdJHnKnm6FSDYABau0AjPyARbbzj
LeGjYTyPP-CwQt-_70AYeNSWhHn_BHLHUpzYe4ftPJwECNsQiXtdLiCZu6vy_VUBaPAutG1Cd890
BGIudFazmzkDsCIx3Qq-Qmxh3fKp04XqXlImpfvKTJHBZw6KD4tU8johTu0CAwEAAaOB5TCB4jAM
BgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFG_xlRhiXODI8cXtbBjJ4NNkUpggMEAGCCsGAQUFBwEB
BDQwMjAwBggrBgEFBQcwAYYkaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwMy1haXBjYTA3MC8G
A1UdHwQoMCYwJKAioCCGHmh0dHA6Ly9jcmwuYXBwbGUuY29tL2FpcGNhLmNybDAdBgNVHQ4EFgQU
bqjytSk5OS_X9o-GqtSGtw5i1zwwDgYDVR0PAQH_BAQDAgeAMA8GCSqGSIb3Y2QGOgQCBQAwDQYJ
KoZIhvcNAQELBQADggEBAK2ghD81nPsGJ0hinyiqpmCDYoMdL1xHaScS2m1I0q-L34AXmg6kzLYK
UjDl2igpKvsvRiewTr-bKb2CbN_ppeW_O50YzMQAKtV4xhnxgodz_lC-B1Q0AiuLZ0DvRVlGT9rE
xi1Ih0xVCHSzcMEGLCa1T66dCj85wla_95cF_Tn1krEMsMLixdRJszQ0dqGrfKQE8kuFOQNfd1rc
cizZKQTkppHydxvbBREH4SUnwDRn3nosa0y8wRfsfSdvbSolMYGj2-MZWCyhT0dgJd0hAv4W1cfU
eGRKjC-FMWhXPDr13Vua6AJ7geunFp6jF32mBs48RqwRREqpq2ikpEg8OJMwggREMIIDLKADAgEC
AghcY8rkSjdTyTANBgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUg
SW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFw
cGxlIFJvb3QgQ0EwHhcNMTcwNTEwMjEyNzMwWhcNMzAxMjMxMDAwMDAwWjBzMS0wKwYDVQQDDCRB
cHBsZSBpUGhvbmUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxIDAeBgNVBAsMF0NlcnRpZmljYXRp
b24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMlFagEPPoMEhsf8v9xe8B6B7hcwc2MmLt49eiTNkz5POUe6
db7zwNLxWaKrH_4KhjzZLZoH8g5ruSmRGl8iCovxclgFrkxLRMV5p4A8sIjgjAwnhF0Z5YcZNsvj
xXa3sPRBclH0BVyDS6JtplG48Sbfe16tZQzGsphRjLt9G0zBTsgIx9LtZAu03RuNT0B9G49IlpJb
89CYftm8pBkOmWG7QV0BzFt3en0k0NzTU__D3MWULLZaTY4YIzm92cZSPtHy9CWKoSqH_dgMRilR
_-0XbIkla4e_imkUn3efwxW3aLOIRb2E5gYCQWQPrSoouBXJ4KynirpyBDSyeIz4soUCAwEAAaOB
7DCB6TAPBgNVHRMBAf8EBTADAQH_MB8GA1UdIwQYMBaAFCvQaUeUdgn-9GuNLkCm90dNfwheMEQG
CCsGAQUFBwEBBDgwNjA0BggrBgEFBQcwAYYoaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwMy1h
cHBsZXJvb3RjYTAuBgNVHR8EJzAlMCOgIaAfhh1odHRwOi8vY3JsLmFwcGxlLmNvbS9yb290LmNy
bDAdBgNVHQ4EFgQUb_GVGGJc4Mjxxe1sGMng02RSmCAwDgYDVR0PAQH_BAQDAgEGMBAGCiqGSIb3
Y2QGAhIEAgUAMA0GCSqGSIb3DQEBCwUAA4IBAQA6z6yYjb6SICEJrZXzsVwh-jYtVyBEdHNkkgiz
lqz3bZf6WzQ4J88SRtM8EfAHyZmQsdHoEQml46VrbGMIP54l-tWZnEzm5c6Osk1o7Iuro6JPihEV
PtwUKxzGRLZvZ8VbT5UpLYdcP9yDHndP7dpUpy3nE4HBY8RUCxtLCmooIgjUN5J8f2coX689P7es
WR04NGRa7jNKGUJEKcTKGGvhwVMtLfRNwhX2MzIYePEmb4pN65RMo-j_D7MDi2Xa6y7YZVCf3J-K
3zGohFTcUlJB0rITHTFGR4hfPu7D8owjBJXrrIo-gmwGny7ji0OaYls0DfSZzyzuunKGGSOl_I61
MIIEuzCCA6OgAwIBAgIBAjANBgkqhkiG9w0BAQUFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMK
QXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNV
BAMTDUFwcGxlIFJvb3QgQ0EwHhcNMDYwNDI1MjE0MDM2WhcNMzUwMjA5MjE0MDM2WjBiMQswCQYD
VQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlv
biBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDkkakJH5HbHkdQ6wXtXnmELes2oldMVeyLGYne-Uts9QerIjAC6Bg--FAJ039B
qJj50cpmnCRrEdCju-QbKsMflZ56DKRHi1vUFjczy8QPTc4UadHJGXL1XQ7Vf1-b8iUDulWPTV0N
8WQ1IxVLFVkds5T39pyez1C6wVhQZ48ItCD3y6wsIG9wtj8BMIy3Q88PnT3zK0koGsj-zrW5Dtle
HNbLPbU6rfQPDgCSC7EhFi501TwN22IWq6NxkkdTVcGvL0Gz-PvjcM3mo0xFfh9Ma1CWQYnEdGIL
EINBhzOKgbEwWOxaBDKMaLOPHd5lc_9nXmW8Sdh2nzMUZaF3lMktAgMBAAGjggF6MIIBdjAOBgNV
HQ8BAf8EBAMCAQYwDwYDVR0TAQH_BAUwAwEB_zAdBgNVHQ4EFgQUK9BpR5R2Cf70a40uQKb3R01_
CF4wHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01_CF4wggERBgNVHSAEggEIMIIBBDCCAQAG
CSqGSIb3Y2QFATCB8jAqBggrBgEFBQcCARYeaHR0cHM6Ly93d3cuYXBwbGUuY29tL2FwcGxlY2Ev
MIHDBggrBgEFBQcCAjCBthqBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBh
cnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRl
cm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZp
Y2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMA0GCSqGSIb3DQEBBQUAA4IBAQBcNplMLXi37Yyb
3PN3m_J20ncwT8EfhYOFG5k9RzfyqZtAjizUsZAS2L70c5vu0mQPy3lPNNiiPvl4_2vIB-x9OYOL
UyDTOMSxv5pPCmv_K_xZpwUJfBdAVhEedNO3iyM7R6PVbyTi69G3cN8PReEnyvFteO3ntRcXqNx-
IjXKJdXZD9Zr1KIkIxH3oayPc4FgxhtbCS-SsvhESPBgOJ4V9T0mZyCKM2r3DYLP3uujL_lTaltk
wGMzd_c6ByxW69oPIQ7aunMZT7XZNn_Bh1XZp5m5MkL72NVxnn6hUrcbvZNCJBIqxw8dtk2cXmPI
S4AXUKqK1drk_NAJBzewdXUhMYIChTCCAoECAQEwfzBzMS0wKwYDVQQDDCRBcHBsZSBpUGhvbmUg
Q2VydGlmaWNhdGlvbiBBdXRob3JpdHkxIDAeBgNVBAsMF0NlcnRpZmljYXRpb24gQXV0aG9yaXR5
MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUwIIY-ccIZ0akycwCQYFKw4DAhoFAKCB
3DAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0yMzAyMDEyMTE2MTFa
MCMGCSqGSIb3DQEJBDEWBBTfhcyPpao5yb-dxLFGrLa6H_3hcjApBgkqhkiG9w0BCTQxHDAaMAkG
BSsOAwIaBQChDQYJKoZIhvcNAQEBBQAwUgYJKoZIhvcNAQkPMUUwQzAKBggqhkiG9w0DBzAOBggq
hkiG9w0DAgICAIAwDQYIKoZIhvcNAwICAUAwBwYFKw4DAgcwDQYIKoZIhvcNAwICASgwDQYJKoZI
hvcNAQEBBQAEggEAqq1YdiaNRsJZsghHepPGwGnd9kOsaO4bQ2C5H4FYn-XVmKWymnrg6g78TEes
D_NwH0hVkM9wD_cC9RmxYQsXLWohbqidDw3j8Ms8jzaIOY0ZIJomdBqzKFVVVEDpK89WazeI8hBM
o2UJzCnJByO98R01w1DGnyO23l8NHSr9DUVvpaHQXPdydONiiWJ2LiHSmBKZNNeNb1lQMMmEt-5d
1tRtIn6Ab5MIb3LrNmvqFmK4S5SEYLgaKqjKWdfitDA7FvhlUcxDe4ZDZFsG1o0tTXUO63FAW4Nr
8kN8eb9jI4CkNsuLGg9fhK8XxXr1Ad8m2xP4_YuljZDcRsWHkp99cw`