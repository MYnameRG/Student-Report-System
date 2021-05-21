const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const connection = require('../../dbserver');

router.post('/', [
    check('fname', 'First name is required').not().isEmpty(),
    check('lname', 'Last name is required').not().isEmpty(),
    check('rollno', 'Roll Number is required').not().isEmpty(),
    check('math', 'Math Marks is required').not().isEmpty(),
    check('physics', 'Physics Marks is required').not().isEmpty(),
    check('chemistry', 'Chemistry Marks is required').not().isEmpty(),
], (req, res) => {

    //Set The CORS Policy
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        fname, lname, rollno,
        math, physics, chemistry,
        total, percent
    } = req.body;

    try {
        connection.connect((err) => {
            if (err) {
                console.error('ConnectionError: ' + err.stack);
                return;
            }
        });

        connection.query('INSERT INTO students (roll_no,name,physics_marks,chemistry_marks,math_marks,total,percentage) VALUES (?,?,?,?,?,?,?)', [
            rollno, fname + " " + lname, physics, chemistry, math, total, percent
        ],
            (error, results, fields) => {
                if (error) return res.status(400).json({ errors: error.stack });
                return res.status(200).json({ success: "Successfully sent the data.." })
            });

        connection.end((err) => {
            if (err) {
                console.log("ConnectionEndError: " + err.stack);
            }
        });
    }
    catch (error) {
        return res.status(400).json({ errors: { msg: 'Server Error' } });
    }
});

module.exports = router;