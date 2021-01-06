/**
 * Created by ying.wu on 2017/6/27.
 */
 // 愛心碼碼驗證
const ecpay_invoice = require('../lib/ecpay_invoice.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
let base_param = {
	LoveCode:"329580" // 愛心碼，長度為7字元
};

let create = new ecpay_invoice({
	merchantInfo: {
		merchantID: "2000132",
        hashKey: "ejCk326UnaZWKisg",
        hashIV: "q9jcZX8Ib9LM8wYk"
	}
});
let res = create.query_client.ecpay_query_check_love_code(parameters = base_param);
res.then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});