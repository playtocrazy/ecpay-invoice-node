/**
 * Created by ying.wu on 2017/6/21.
 */
const helper = require('./helper.js');
const verify = require('./verification.js');
const ECpayError = require('./error.js');
const iconv =require('iconv-lite');
const crypto = require('crypto');
const url = require('url');
const querystring = require('querystring');
const http = require('http');
const https = require('https');

class ECpayQueryClient{
    constructor(options){
        this.helper = new helper(options);
        // this.verify_query_api = new verify.QueryParamVerify();
    }

    ecpay_query_invoice_issue(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        let res = this._query_pos_proc(parameters, 'QueryIssue');
        return res;
    }

    ecpay_query_invoice_allowance(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        let res = this._query_pos_proc(parameters, 'QueryAllowance');
        return res;
    }

    ecpay_query_invoice_issue_invalid(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        let res = this._query_pos_proc(parameters, 'QueryIssueInvalid');
        return res;
    }

    ecpay_query_invoice_allowance_invalid(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        let res = this._query_pos_proc(parameters, 'QueryAllowanceInvalid');
        return res;
    }

    ecpay_query_check_mob_barcode(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        parameters['BarCode'] = parameters['BarCode'].replace(/\+/g," ");
        let res = this._query_pos_proc(parameters, 'CheckMobileBarCode');
        return res;
    }

    ecpay_query_check_love_code(parameters){
        this._query_base_proc(parameters);
        parameters['TimeStamp'] = (parseInt(this._get_curr_unix_time()) + 120).toString();
        let res = this._query_pos_proc(parameters, 'CheckLoveCode');
        return res;
    }

    _get_curr_unix_time(){
        return this.helper.get_curr_unixtime();
    }

    _query_base_proc(params){
        if (params.constructor === Object){
            params['MerchantID'] = this.helper.get_mercid();
        } else {
            throw new ECpayError.ECpayInvalidParam(`Received parameter object must be a Object.`);
        }
    }

    _query_pos_proc(params, apiname , big5_trans=false){
        let verify_query_api = new verify.QueryParamVerify(apiname);
        verify_query_api.verify_query_param(params);
        // encode special param
        // Insert chkmacval
        console.log(params);
        let chkmac = this.helper.gen_chk_mac_value(params, 0);
        params['CheckMacValue'] = chkmac;
        console.log(params);

        // gen post html
        let api_url = verify_query_api.get_svc_url(apiname, this.helper.get_op_mode());
        // post from server
        let resp = this.helper.http_request('POST', api_url, params);
        const _helper = this.helper
        return new Promise((resolve, reject) => {
            resp.then(function (result) {
                    if (big5_trans) {
                        return resolve(_helper.getJsonResult(result, 'big5'));
                    } else {
                        return resolve(_helper.getJsonResult(result));
                    }

            }).catch(function (err) {
                reject(err);
            });
        });
    }
}
module.exports = ECpayQueryClient;