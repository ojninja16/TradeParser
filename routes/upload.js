const express=require('express')
const multer=require('multer')
const parser=require('../utils/csvParser');
const router= express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload',upload.single('file'),async(req, res)=>{
    const filePath = req.file.path;
    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not Uploaded!!');
        }
        await parser(filePath);
        res.status(200).send('CSV file successfully processed and data saved to MongoDB');
    } catch (error) {
        res.status(500).send('Error processing CSV file:', error.message);
    }
})
module.exports = router