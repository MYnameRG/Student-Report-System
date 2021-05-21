const express = require('express');
const connection = require('../../dbserver');
const router = express.Router();

router.get('/', (req, res) => {

    try 
    {
        connection.connect((err) => {
            if (err) {
                console.error('ConnectionError: ' + err.stack);
                return;
            }
        });

        connection.query('Select name, total, percentage from students', 
        (error, results, fields) => {
            
            if (error) return res.status(400).json({ errors: error.stack });

            if (Object.entries(results).length > 0) {
                return res.status(200).json({
                    success: {
                        data: results,
                        result: "Successfully Returned The Data..."
                    }
                });
            }
            else
            {
                return res.status(200).json({
                    fail: "Record is Empty!!"
                });
            }
        });

        connection.end((err) => {
            if (err) {
                console.log("ConnectionEndError: " + err.stack);
            }
        });
    } 
    catch (error) 
    {
        return res.status(400).json({ errors: { msg: 'Server Error' } });
    }
});

module.exports = router;