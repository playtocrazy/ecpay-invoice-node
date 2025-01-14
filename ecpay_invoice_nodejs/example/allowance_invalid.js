/**
 * Created by ying.wu on 2017/6/27.
 */
 // 作廢折讓
const ecpay_invoice = require('../lib/ecpay_invoice.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
let base_param = {
	InvoiceNo:"TQ00000182", // 發票號碼，長度為10字元
	AllowanceNo:"2017032311407421", // 折讓號碼，長度為16字元
	Reason:"test" // 作廢原因，長度為20字元
};

let create = new ecpay_invoice({
	merchantInfo: {
		merchantID: "2000132",
        hashKey: "ejCk326UnaZWKisg",
        hashIV: "q9jcZX8Ib9LM8wYk"
	}
});
let res = create.invoice_client.ecpay_invoice_allowance_invalid(parameters = base_param);
res.then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});