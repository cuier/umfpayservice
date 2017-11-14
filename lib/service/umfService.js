/**
 * ***********************************************************************
 * <br>description : 商户接入接口服务类
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */
'use strict'
var querystring = require('querystring')
var log4js = require('log4js')
log4js.configure = require('../log_start')
var log = log4js.getLogger('')

var Constants = require('../common/Constants')
var netWorkUtil = require('../http/NetworkUtils')
var plainUtil = require('../utils/PlainUtil')
var umfUtil = require('../utils/UmfUtils')
var signUtil = require('../utils/SignUtil')
var ServiceMapUtils = require('../utils/ServiceMapUtil')
var umfEncrypt = require('../utils/CryptoUtil')

// var signUtil = require('../utils/SignUtil')

function umfService() {
    //对公共参数进行赋值
    this.charset = "UTF-8"
    this.sign_type = "RSA"
    this.res_format = "HTML"


    //商户调用..初始化时候传入联动公钥和商户私钥路径


    this.umfService = function (mer_id, merid_prikey_path, isLog) {
        // Constants.pkMap["log_level"] = 'debug'
        // Constants.pkMap["log_path"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/log"

        // log4js.configure = log_start.getLogInfo('debug','/Users/MYFILE/Documents/Cuilijuan/nodejs/log')

        if (isLog) {
            this.log_level = "debug"
        } else {
            this.log_level = "fatal"
        }
        log.level = this.log_level
        this.platCertPath = "-----BEGIN CERTIFICATE-----\n" +
            "MIIDNDCCAp2gAwIBAgICLVkwDQYJKoZIhvcNAQEFBQAwPTEOMAwGA1UEBhMFQ0hJ\n" +
            "TkExKzApBgNVBAMTIkNISU5BVEVMRUNPTSBDRVJUSUZJQ0FURSBBVVRIT1JJVFkw\n" +
            "HhcNMDEwMzIxMTA0NzEzWhcNMDMwMzIxMTA0NzEzWjBcMQswCQYDVQQGEwJDTjER\n" +
            "MA8GA1UEChMItPPBrLXn0MUxETAPBgNVBAgTCFNoZW55YW5nMRQwEgYDVQQDEwsx\n" +
            "OTIuMTY4LjIuMjERMA8GA1UEBxMIU2hlbnlhbmcwgZ8wDQYJKoZIhvcNAQEBBQAD\n" +
            "gY0AMIGJAoGBAMZYC7inporVKJCo0pPWdOBjADxzPRF1719G2YskDHVDEuqt6sBR\n" +
            "WX+65dXs1AVKROKmi6jdzAQSlp7z3brsB4skHMo9sqdQgPolgZvCersKJFHgTbjj\n" +
            "NyCoTyOjwOeRsfcqSJaiehQwPW4fLpNQW/lbvOuFrP8Tn0xWZvOunVPDAgMBAAGj\n" +
            "ggEiMIIBHjAJBgNVHRMEAjAAMEYGA1UdHwQ/MD0wO6A5oDeGNWxkYXA6Ly8yMDIu\n" +
            "MTAzLjY1LjE4L291PWNhLG91PXN5c3RlbSxvdT1jYTEsbz1jdCxjPUNOMC8GCCsG\n" +
            "AQUFBwEBBCMwITAfBggrBgEFBQcwAYYTLDIwMi4xMDMuNjUuMTg6OTAwMzAPBghg\n" +
            "hkgBhvhDDAQDAgEBMBIGCGCGSAGG+EMOBAYWBDI3RjkwGQYIYIZIAYb4QxAEDRYL\n" +
            "MTkyLjE2OC4yLjIwEAYIYIZIAYb4QxEEBBYCTlQwGgYIYIZIAYb4QxkEDhYMOTe9\n" +
            "ybfRt/7O8cb3MBkGCGCGSAGG+EMbBA0WCzE5Mi4xNjguMi4yMA8GCGCGSAGG+EMa\n" +
            "BAMCAQMwDQYJKoZIhvcNAQEFBQADgYEAckkH/Vem5+kXPSGgkowjPwv47XXNbD0h\n" +
            "GRMTVXm5PC2kY/wNApQh3lv7Tf5k3UQEoFBACxf6XJtuxf6S0uKBS4ySMKdpbMbO\n" +
            "Uvtwu6ycQUQTRAs1EBgoh1zyuafU2D3iyHQM8etHxaSePXZOZXFkkvBJemyPz23H\n" +
            "AyIn5SKQ2Es=\n" +
            "-----END CERTIFICATE-----"
        this.merid_prikey_path = merid_prikey_path
        this.mer_id = mer_id
        //将商户私钥和公钥地址保存起来
        Constants.pkMap["platCertPath"] = this.platCertPath
        Constants.pkMap[mer_id] = merid_prikey_path
        // Constants.pkMap["60038402"] = "/Users/MYFILE/Documents/Cuilijuan/SAAS_SDK/Node.JS/60000100_key/60038402_.key.pem"
    }


    //商户请求map加入请求公共参数
    this.prepareRequestMap = function () {
        var RequestMap = {}
        RequestMap["charset"] = this.charset
        RequestMap["sign_type"] = this.sign_type
        RequestMap["res_format"] = this.res_format
        RequestMap["version"] = "4.0"
        RequestMap["mer_id"] = this.mer_id
        // console.log(img)
        return RequestMap
    }
    /**
     * Web收银台—生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */
    this.WebFrontPagePayMap = function (RequestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "req_front_page_pay"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        var get_url = "http://pay.soopay.net/spay/pay/payservice.do?" + querystring.stringify(params)
        log.info("获得的URL为：" + get_url)

        return get_url
    }
    /**
     * H5收银台—生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */
    this.H5FrontPageMap = function (RequestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "pay_req_h5_frontpage"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        var get_url = "http://pay.soopay.net/spay/pay/payservice.do?" + querystring.stringify(params)
        log.info("获得的URL为：" + get_url)

        return get_url
    }

    /**
     * 网银直连
     */
    this.pBankDirectMap = function (requestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "pay_req_split_direct"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, requestMap)
        log.info("=====网银直连======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        var get_url = "http://pay.soopay.net/spay/pay/payservice.do?" + querystring.stringify(params)
        log.info("获得的URL为：" + get_url)

        return get_url
    }

    /**
     * 借记卡直连
     */
    this.debitDirectMap = function (requestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "debit_direct_pay"
        reqMap["amt_type"] = "RMB"
        reqMap["pay_type"] = "DEBITCARD"
        Object.assign(reqMap, requestMap)
        log.info("=====借记卡直连======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 信用卡直连
     */

    this.creditDirectMap = function (requestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "credit_direct_pay"
        reqMap["amt_type"] = "RMB"
        reqMap["pay_type"] = "CREDITCARD"
        Object.assign(reqMap, requestMap)
        log.info("=====信用卡直连======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 公众号支付–生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */
    this.PublicPaymentMap = function (RequestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "publicnumber_and_verticalcode"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        var get_url = "http://pay.soopay.net/spay/pay/payservice.do?" + querystring.stringify(params)
        log.info("获得的URL为：" + get_url)

        return get_url
    }


    /**
     * APP---聚合支付SDK商户下单方法
     */
    this.mobileOrderMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "pay_req"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        log.info("=====APP付款下单======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * APP---聚合支付SDK生成签名
     */
    this.generateSign = function (RequsetMap) {
        if (RequsetMap == null) {
            log.info("[UMF SDK] 商户请求参数为空!")
            return
        }
        try {
            var sign = signUtil.mobileGenerateSign(RequsetMap, this.merid_prikey_path)
            return sign
        } catch (e) {
            log.error(e)
        }

    }
    /**
     * 收款---快捷支付下单方法.
     */
    this.quickPayOrderMap = function (RequestMap,cb) {
        this.log = log4js.getLogger('')
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "apply_pay_shortcut"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        this.log.info("快捷支付下单方法")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 收款---扫码支付（主扫）下单方法.
     */
    this.activeScanPaymentMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "active_scancode_order"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        log.info("reqmap朱扫")
        log.info(reqMap)
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 收款---扫码支付（被扫）下单方法.
     */
    this.passiveScanPaymentMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "passive_scancode_pay"
        reqMap["amt_type"] = "RMB"
        Object.assign(reqMap, RequestMap)
        log.info("reqmap被扫")
        log.info(reqMap)
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 收款---快捷支付向平台获取短信验证码方法.
     */

    this.quickGetMessageMap = function (RequestMap,cb) {

        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "sms_req_shortcut"
        reqMap["media_type"] = "MOBILE"
        Object.assign(reqMap, RequestMap)
        log.info("=====获取短信======")

        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 收款---快捷支付确认支付方法.
     */
    this.quickPayConfirmMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "confirm_pay_shortcut"
        reqMap["media_type"] = "MOBILE"
        Object.assign(reqMap, RequestMap)
        log.info("=====确认支付======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 收款---快捷支付获取银行卡列表方法.
     */
    this.quickQuerybankSupportMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "query_mer_bank_shortcut"
        Object.assign(reqMap, RequestMap)
        log.info("=====快捷支付获取银行卡列表方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 收款---快捷支付解约方法.
     */
    this.quickCancelSurrenderMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "unbind_mercust_protocol_shortcut"
        Object.assign(reqMap, RequestMap)
        log.info("=====快捷支付解约方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }


    /**
     * 订单查询---查询历史订单方法
     */
    this.queryhistoryOrderMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "mer_order_info_query"
        Object.assign(reqMap, RequestMap)
        log.info("=====查询历史订单方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 订单查询---查询当天订单方法
     */
    this.querytodayOrderMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "query_order"
        Object.assign(reqMap, RequestMap)
        log.info("=====查询当天订单方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 撤销---撤销方法
     */
    this.cancelTradeMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "mer_cancel"
        Object.assign(reqMap, RequestMap)
        log.info("=====撤销方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 退款---普通退款方法
     */
    this.generalRefundMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "mer_refund"
        Object.assign(reqMap, RequestMap)
        log.info("=====退款======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 退款---批量转账退费方法
     */
    this.massTransferRefundMap = function (RequestMap,cb) {
        //批量转账退费
        var reqMap = this.prepareRequestMap()

        reqMap[Constants.SERVICE] = "split_refund_req"
        Object.assign(reqMap, RequestMap)
        log.info("=====批量转账退费方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 退款---退款状态查询方法
     */
    this.queryRefundStateMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "mer_refund_query"
        Object.assign(reqMap, RequestMap)
        log.info("=====退款状态查询方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 退款---退费信息补录方法
     */
    this.remedyRefundInformationMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "refund_info_replenish"
        Object.assign(reqMap, RequestMap)
        log.info("=====退费信息补录方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 付款---下单方法
     */
    this.paymentOrderMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "transfer_direct_req"
        Object.assign(reqMap, RequestMap)
        log.info("=====付款---下单方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 付款---付款状态查询方法
     */
    this.queryPaymentStatusMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "transfer_query"
        Object.assign(reqMap, RequestMap)
        log.info("=====付款状态查询方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 付款---余额查询方法
     */
    this.queryAccountBalanceMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "query_account_balance"
        Object.assign(reqMap, RequestMap)
        log.info("=====付款---余额查询方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 鉴权---借记卡实名认证方法
     */
    this.debitCardAuthenticationMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "comm_auth"
        reqMap["auth_type"] = "1"
        reqMap["auth_mode"] = "0"
        reqMap["version"] = "1.0"
        reqMap["identity_type"] = "1"
        Object.assign(reqMap, RequestMap)
        log.info("=====借记卡实名认证方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 鉴权---贷记卡实名认证方法
     */
    this.creditCardAuthenticationMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "comm_auth"
        reqMap["version"] = "1.0"
        Object.assign(reqMap, RequestMap)
        log.info("=====贷记卡实名认证方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {

            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 鉴权---身份认证方法
     */
    this.identityAuthenticationMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "comm_auth"
        reqMap["version"] = "1.0"
        reqMap["auth_type"] = "1"
        Object.assign(reqMap, RequestMap)
        log.info("=====身份认证方法======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }


    /**
     * 对账---对账文件下载方法
     * <br/>description:http_post方式请求联动后台，下载对账文件。
     * 请求下载对账文件时，无验签串返回，故此方法中无需进行签名验证。
     * @param reqmap 查询对账文件请求的参数
     * @return  返回true则表示对账文件下载成功
     * @throws Exception
     */

    this.reconciliationDownloadMap = function (RequestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "download_settle_file"
        // var settle_path = RequestMap["settle_path"]
        Object.assign(reqMap, RequestMap)

        try {
            var params = plainUtil.getPlainMap(reqMap, this.mer_id)
            netWorkUtil.submit(querystring.stringify(params))

        } catch (e) {
            //对账文件下载异常
            log.debug("[UMF SDK] 对账文件下载异常" + e);
        }
    }
    //------------------------------------------------------------
    // 异步通知
    //------------------------------------------------------------
    /**
     * @param $notifyParamsStr 联动通知商户GET请求URL所带的参数
     * @return string
     */
    this.doget = function (notifyParamString) {
        var map = this.notifyDataParserMap(notifyParamString)
        var mer2UmfPlatStr = this.responseUMFMap(map)
        return mer2UmfPlatStr
    }


    this.notifyDataParserMap = function (notifyParamString) {
        var map = umfUtil.getDataByContent(notifyParamString)
        var sign = map["sign"]
        // delete map.sign_type
        // delete map.sign
        if (signUtil.verify_signature(map, Constants.pkMap.platCertPath)) {
            log.info("[UMF SDK] 平台通知数据验签成功")
        } else {
            log.info("[UMF SDK] 平台通知数据验签发生异常")
        }
        return map
    }


    this.responseUMFMap = function (map) {
        var merMap = {}
        merMap["mer_date"] = map["mer_date"]
        merMap["mer_id"] = map["mer_id"]
        merMap["order_id"] = map["order_id"]
        merMap["ret_code"] = "0000"
        merMap["ret_msg"] = "success"
        merMap["version"] = "4.0"
        var merPlain = signUtil.jsonURLParams(merMap)
        var merSign = signUtil.sign(merPlain, this.merid_prikey_path)

        var mer2UmfPlatStr = "mer_date=" + merMap["mer_date"] + "&" +
            "mer_id=" + merMap["mer_id"] + "&" +
            "order_id=" + merMap["order_id"] + "&" +
            "ret_code=0000&ret_msg=success&sign_type=RSA&version=4.0&sign=" + merSign;
        return mer2UmfPlatStr;
    }

    /**
     *  获取token
     * @return 回调函数
     */

    this.getToken = function(cb){
        log.info("=====获取token======")
        var merMap = {}
        merMap["grant_type"] = "client_credentials"
        merMap["client_id"] = "79756098a6d291260523f6199ddfc4bc0875ccf6"//生产
        // merMap["client_id"] ="5b6d136935b89ad44142c15adf92e10df54d758a" //测试
        merMap["client_secret"] = "f642ab9bd929ab0d7f802e12dc689e416d4b8e6a"//生产
        // merMap["client_secret"] = "13ae55d1e799f2c93bf2af2d1b6529463a77ca44" // 测试
        let url = Constants.UMF_RESTPAY_AUTHORIZE//生产
        let headers =  {
            'Content-Type': 'application/json',
        }
        netWorkUtil.childMerQuest(url,JSON.stringify(merMap),headers,Constants.METHOD_POST,(res)=>{
            return typeof cb == "function" && cb(res)
        })

    }

    /**
     * 子商户入网
     * @return 回调函数
     */
    this.addChildMerInfo = function (token,RequestMap,cb) {
        log.info("=====子商户入网======")
        for (var ite in RequestMap){
            if (ServiceMapUtils.childMerEncrytId.indexOf(ite) != -1){
                let encrypted = umfEncrypt.childMerEncrypto(RequestMap[ite],this.platCertPath)
                RequestMap[ite] = encrypted
            }
        }
        var params = signUtil.addChildMerSign(RequestMap,this.merid_prikey_path)
        // let url = Constants.UMF_RESTPAY_ADDCHILDMERINFO
        let url = Constants.UMF_RESTPAY_ADDCHILDMERINFO
        let headers = {
            'Content-Type': 'application/json',
            'Charset': 'UTF-8',
            'Signature': params["sign"],
            'Authorization': 'Bearer'+token
        }
        delete params["sign"]
        netWorkUtil.childMerQuest(url,JSON.stringify(params),headers,Constants.METHOD_POST,(res)=>{
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 子商户入网-资质上传
     * @return 回调函数
     */
    this.uploadChildFile = function (token,RequestMap, cb) {
        log.info("=====子商户入网资质上传======")
        let reqMap = {}
        reqMap["licenseNo"] = RequestMap["licenseNo"]
        reqMap["merId"] = RequestMap["merId"]
        delete RequestMap.licenseNo
        delete RequestMap.merId
        let params = signUtil.addChildMerSign(reqMap,this.merid_prikey_path)

        Object.assign(params,RequestMap)
        console.log(params)
        netWorkUtil.uploadFile(token,params,(res)=>{
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 子商户入网-修改信息
     * @return 回调函数
     */
    this.changeChildRebut = function (token, RequestMap, cb) {
        log.info("=====子商户入网-修改信息======")
        for (var ite in RequestMap){
            if (ServiceMapUtils.childMerEncrytId.indexOf(ite) != -1){
                let encrypted = umfEncrypt.childMerEncrypto(RequestMap[ite],this.platCertPath)
                RequestMap[ite] = encrypted
            }
        }
        var params = signUtil.addChildMerSign(RequestMap,this.merid_prikey_path)
        let url = Constants.UMF_RESTPAY_CHANGECHILDREBUT
        let headers = {
            'Content-Type': 'application/json',
            'Charset': 'UTF-8',
            'Signature': params["sign"],
            'Authorization': 'Bearer'+token
        }
        delete params["sign"]
        netWorkUtil.childMerQuest(url,JSON.stringify(params),headers,Constants.METHOD_POST,(res)=>{
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 子商户入网- 子商户审核状态查询
     * @return 回调函数
     */
    this.selectChildMerState = function(token,reqMap,cb){
        log.info("=====子商户入网-子商户审核状态查询======")
        let url = Constants.UMF_RESTPAY_SELECTCHILDMERSTATE+"?merId="+reqMap["merId"]+ "&licenseNo="+reqMap["licenseNo"]+""
        console.log(url)
        let headers = {
            'Content-Type': 'application/json',
            'Charset': 'UTF-8',
            'Authorization': 'Bearer'+token,
            // 'Signature':params["sign"]
        }
        netWorkUtil.childMerQuest(url,"",headers,Constants.METHOD_GET,(res)=>{
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 子商户入网异步通知---联动通知商户数据，SDK解析结果
     */
    this.notifyChildParserMap = function (notifyChildParamsStr) {
        log.info("=====子商户入网异步通知-联动通知商户数据，SDK解析结果======")
        let notifyParamsArr = {}
        if(notifyChildParamsStr){
            notifyParamsArr = umfUtil.getDataByContent(notifyChildParamsStr)
        }
        console.log(notifyParamsArr)
        if (signUtil.verify_signature(notifyParamsArr, Constants.pkMap.platCertPath)) {
            log.info("[UMF SDK] 平台通知数据验签成功")
            return notifyParamsArr
        } else {
            log.info("[UMF SDK] 平台通知数据验签发生异常")
        }
    }
    /**
     * 子商户入网异步通知---商户响应联动通知SDK生成字符串
     * 该字符串拼装在HTML响应中的head中的meta标签CONTENT中
     */
    this.responseChildNotifyMap = function (array) {

        let merMap = {}
        merMap["merId"] = array["merId"]
        merMap["licenseNo"] = array["licenseNo"]
        merMap["ret_code"] = "0000"
        var withSign = signUtil.addChildMerSign(merMap,this.merid_prikey_path)
        let sign = withSign["sign"]
        let plain = signUtil.jsonURLParams(merMap)
        let returnStr = plain+"&sign="+sign
        return returnStr
    }

    //----------------------------------------
    // 分账部分
    //----------------------------------------
    /**
     * 分账—分账请求针对标准分账的延时分账
     */
    this.splitReqMap = function (RequestMap,cb) {
        let reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "split_req"
        Object.assign(reqMap, RequestMap)
        log.info("=====分账请求针对标准分账的延时分账======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }
    /**
     * 分账---分账状态查询
     */
    this.splitStateMap = function (RequestMap,cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "query_split_order"
        Object.assign(reqMap, RequestMap)
        log.info("=====分账-分账状态查询======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 分账---分账退费
     */
    this.splitRefundMap = function (RequestMap, cb) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "mer_refund"
        Object.assign(reqMap, RequestMap)
        log.info("=====分账-分账退费======")
        var params = plainUtil.getPlainMap(reqMap, this.mer_id)
        netWorkUtil.submit(querystring.stringify(params), (res) => {
            return typeof cb == "function" && cb(res)
        })
    }

    /**
     * 分账-分账文件下载
     */

    this.splitFileDownloadMap = function (RequestMap) {
        var reqMap = this.prepareRequestMap()
        reqMap[Constants.SERVICE] = "download_settle_file"
        // var settle_path = RequestMap["settle_path"]
        Object.assign(reqMap, RequestMap)

        try {
            var params = plainUtil.getPlainMap(reqMap, this.mer_id)
            netWorkUtil.submit(querystring.stringify(params))

        } catch (e) {
            //对账文件下载异常
            log.error("[UMF SDK] 对账文件下载异常" + e);
        }
    }
}

// var umfService = new umfService()
module.exports = umfService