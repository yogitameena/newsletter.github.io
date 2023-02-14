const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

//render
const PORT = process.env.PORT || 3000;

//to render local files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res)
{ 
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/3c1974c193";
    const options = {
        method: "POST",
        auth: "yogita:1f0cf310e2d557e4c1e78ef76e07be9d-us13"
    }

    const request = https.request(url, options, function(response)
    {

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
         response.on("data", function(data)
         {
            console.log(JSON.parse(data));
         })
    })
    
   // request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res)
{
    res.redirect("/");
})

app.listen(3000, function()
{
    console.log("Server is runnning on port 3000");
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });

// api key 
// 1f0cf310e2d557e4c1e78ef76e07be9d-us13

// list Id
// 3c1974c193