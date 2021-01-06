/**
 * Created by ying.wu on 2017/7/10.
 */
const version = require('./ecpay_invoice/version.js');
const invoice_client = require('./ecpay_invoice/invoice_client.js');
const query_client = require('./ecpay_invoice/query_client.js');
const notify_client = require('./ecpay_invoice/notify_client.js');

class ECPayInvoice{
    constructor(options){
        this.version = new version();
        this.invoice_client = new invoice_client(options);
        this.query_client = new query_client(options);
        this.notify_client = new notify_client(options);
    }
}
module.exports = ECPayInvoice;