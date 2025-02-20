/**
 * Created by ying.wu on 2017/6/27.
 */
 // 觸發開立發票
const ecpay_invoice = require('../lib/ecpay_invoice.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
let base_param = {
	Tsr:"PLEASE MODIFY", // 交易單號，為invoice_delay時所填入的，請帶30碼uid, ex: f0a0d7e9fae1bb72fbc93jg3495234
	PayType:"2" // 交易類別，請固定帶'2'
};

let create = new ecpay_invoice({
	merchantInfo: {
		merchantID: "2000132",
        hashKey: "ejCk326UnaZWKisg",
        hashIV: "q9jcZX8Ib9LM8wYk"
	}
});
let res = create.invoice_client.ecpay_invoice_trigger(parameters = base_param);
res.then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});