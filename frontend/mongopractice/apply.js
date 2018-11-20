const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('it is on.');
    res.render('apply');
});

router.post('/create', (req, res) => {

});

module.exports = router;
//module.exports = mongoose.model('User', userSchema); 이게 왜 에러를 유발?