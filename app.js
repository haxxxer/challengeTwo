const fs = require("fs")
const path = require("path")
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const path2key = path.join(__dirname, "message.txt")

app.get("/challengeTwo/:x", (req, res)=> {
    let {x} = req.params
    if (isNaN(x)) {
    
        res.json({"message": "DONT DO ME LIKE THAT :("})
    
    } else {
    
        try {
            const data = fs.readFileSync(path2key, 'utf8')
            lastPageNumber = data.length / 4
            x = +x
            let withinRange = (x <= lastPageNumber && x >= 1)
            let message = withinRange? data.slice((x-1) * 4, x*4) : String.fromCharCode(Math.abs(x) % 60 + 60).repeat(4)
            
            res.json({
                pageNumber: x,
                message,
                isPartOfMessage: withinRange
            })
    
        } catch (err) {
            res.json({errorMessage: "Ops! Something went wrong from our side! Maybe the challenge is off"})
        }
    }

});



app.post("/challengeTwo/cmds3cr37k3y", (req, res) => {
    const userAgent = req.headers['user-agent']
    const viaCurl = userAgent.slice(0, userAgent.indexOf("/")).toLowerCase() == "curl" 
    const {key} = req.body
    if (key == "fbd3f6e31a2125f479ce3e1e66bc0535"){
        if (viaCurl) {
            res.json({code: "tH3-h@rd-w4y", level:"hard", prize: "three months if you are the first to reach here"})
        } else if (userAgent.includes("python")) {
            res.json({code: "l3@rn-b@$h",level: "easy", prize: "one month if you are the first to reach here"})
        }
    }

})


app.listen(8080)