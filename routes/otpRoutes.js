const OTP = require("../model/otpModel");
const router = require("express").Router();

// register
router.post("/register", async (req, res) => {
    try {
        let user = await OTP.findOne({ phoneNumber: req.body.phoneNumber });
        if (user) {
            return res.status(409).json({ message: "you have already register" });
        }
        user = new OTP({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
        let result = await user.save();
        console.log(result);
        res.status(201).json({ message: "you have register successfully", result });

    } catch (err) {
        res.status(409).send(err);
    }
})

// send otp
router.post("/sendOTP", async (req, res) => {
    const { phoneNumber } = req.body;
    let otp = Number(Math.floor(1000 + Math.random() * 9000).toString())
    try {
        let payload = {
            ...req.body,
            otp
        }
        let data = await OTP.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, { $set: { ...payload } }, { new: true })
        res.status(201).json({ "otp": data.otp });

    }
    catch (err) {
        res.status(404).json({ message: "Wrong phoneNumber", err });

    }
})

// verify OTP
// router.post("/verifyOTP", async (req, res) => {
//     try {
//         let user = await OTP.findOne({
//             phoneNumber: req.body.phoneNumber,
//         });

//         if (req.body.otp === user.otp) {
//             return res.status(200).json({ message: "OTP is verified successfully" })
//         } else {
//             return res.status(409).json({ message: "INVALID OTP" })
//         }
//     }
//     catch (err) {
//         res.status(404).json({ message: "phoneNumber is wrong", err });
//     }
// });

router.get("/verifyOTP", async (req, res) => {
    try {

        console.log(req.query.phoneNumber, "ppppppppppppp");
    

        if (req.query.phoneNumber == undefined || req.query.otp == undefined) {
            res.json({"message":"bad request"})
        }
        
        let user = await OTP.findOne({
            phoneNumber: req.query.phoneNumber,
        });

        if (req.query.otp === user.otp) {
            return res.status(200).json({ message: "OTP is verified successfully" })
        } else {
            return res.status(409).json({ message: "INVALID OTP" })
        }
    }
    catch (err) {
        res.status(404).json({ message: "phoneNumber is wrong", err });
    }
});


module.exports = router;

