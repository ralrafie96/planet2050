// const express = require("express");
const http = require("http")
// const cors = require("cors");
// const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

// const app = express();
// app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());

const port = 3000
const app = http.createServer((req, res) => {
    const { headers, method, url } = req;

    console.log("The server started on port " + port)
    if (method == "POST" && url == "/sendmail") {
        // Pull out request body
        let body = [];
        req.on('error', (err) => {
            console.error(err)
        }).on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(body)

            // Send email and response
            sendMail(body, (err, info) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 400;
                    res.write(JSON.stringify({ error: "Failed to send email" }));
                } else {
                    console.log("Email has been sent");
                    res.write(JSON.stringify(info))
                }
                res.end()
            })
        })
    }
}).listen(port);

// app.listen(port, () => {
//     console.log("The server started on port " + port)
// })

// app.post("/sendmail", (req, res) => {
//     let user = req.body;
//     sendMail(user, (err, info) => {
//         if (err) {
//             console.log(err);
//             res.status(400);
//             res.send({ error: "Failed to send email" });
//         } else {
//             console.log("Email has been sent");
//             res.send(info)
//         }
//     })
// })

acc = { "user": "jaime.mcdermott@ethereal.email", "pass": "9Azg4AX75PBbNbajVc", "smtp": { "host": "smtp.ethereal.email", "port": 587, "secure": false }, "imap": { "host": "imap.ethereal.email", "port": 993, "secure": true }, "pop3": { "host": "pop3.ethereal.email", "port": 995, "secure": true }, "web": "https://ethereal.email" }

const sendMail = (body, callback) => {
    const transporter = nodeMailer.createTransport({
        name: acc.user,
        host: acc.smtp.host,
        port: acc.smtp.port,
        secure: acc.smtp.secure,
        auth: {
            user: acc.user,
            pass: acc.pass
        },
        logger: true,
        transactionLog: true,
        allowInternalNetworkInterfaces: false
    });

    let user = JSON.parse(body)
    console.log(user.email)
    let message = {
        from: `"Planet2050" "<${acc.user}>"`,
        to: `<${user.email}>`,
        subject: "Planet2050 Quiz Results",
        html: "<h1>Congrats on earning the title of Planeteer!</h1>"
    };
    transporter.sendMail(message, callback);
}

const genEmail = () => {
    nodeMailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account');
            console.error(err);
        }
        console.log('Credentials obtained:\n' + JSON.stringify(account))
    })
}

// genEmail()