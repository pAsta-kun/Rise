const express = require('express');
const multer = require('multer');
const fs = require('fs');
const resemble = require('resemblejs');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.get('/compare', (req, res)=> {
    res.send('Rise Server');
  })

app.post('/compare', upload.fields([{ name: 'imageA', maxCount: 1 }, { name: 'imageB', maxCount: 1 }]), (req, res) => {
    const imageAPath = req.files['imageA'][0].path;
    const imageBPath = req.files['imageB'][0].path;
    
    const fileData1 = fs.readFileSync(imageAPath);
    const fileData2 = fs.readFileSync(imageBPath);
    
    const resembleInstance = resemble(fileData1).compareTo(fileData2);
    
    resemble.outputSettings({
        ignoredBox: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        ignoredColor: {
            red: 255,
            green: 0,
            blue: 0
        }
    });
    
    resembleInstance.onComplete(function (data) {
        console.log(data.rawMisMatchPercentage);
        
        // Send the mismatch percentage as response
        res.json({
            misMatchPercentage: data.rawMisMatchPercentage
        });

        // Clean up the temporary files
        fs.unlinkSync(imageAPath);
        fs.unlinkSync(imageBPath);
    });
});
const ip = '192.168.1.77'; // for example
const port = 5000;

const server = app.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${server.address().port}`);
});
