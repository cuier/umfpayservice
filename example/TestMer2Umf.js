/**
 * ***********************************************************************
 * <br>description : Demo，商户以此为例
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */

var service = require('umfpayservice')

var testMer2Umf = new TestMer2Umf()
var umfService = new service()
var umfService1 = new service()

//初始化
umfService.umfService("60000100", "/Users/MYFILE/Documents/Cuilijuan/SAAS_SDK/Node.JS/60000100_key/60000100_.key.pem",true)
umfService1.umfService("60000100", "/Users/MYFILE/Documents/Cuilijuan/SAAS_SDK/Node.JS/60000100_key/60000100_.key.pem",true)

// testMer2Umf.prepareWebFrontPagePayMap()   //web收银台
// testMer2Umf.prepareH5FrontPageMap()   //h5收银台
// testMer2Umf.preparePublicPaymentMap()   //公众号支付
// testMer2Umf.prepareMobileOrderMap()    // APP支付下单
testMer2Umf.prepareAppSign()    //APP生成签名
// testMer2Umf.prepareShortcut()       //快捷下单
// testMer2Umf.prepareScanMap("WECHAT")   //主扫下单
// testMer2Umf.preparePassiveScanMap("WECHAT")  // 被扫下单
// testMer2Umf.prepareGetMessageMap()   //获取短信
// testMer2Umf.preparePayFirstMap()   //确认支付
// testMer2Umf.prepareQuerybankSupport()   // 银行卡列表
// testMer2Umf.prepareCancelSurrender()   //解约
// testMer2Umf.prepareQueryhistoryOrder()  //查询历史订单
// testMer2Umf.prepareQueryTodayOrder() //查询当天订单
// testMer2Umf.prepareCancelTrade()  //撤销
// testMer2Umf.prepareRefund()  //退款
// testMer2Umf.test_queryRefundStateMap()   //退款状态查询
// testMer2Umf.test_remedyRefundInformationMap()  //退费信息补录
// testMer2Umf.prepareTransferDirect()   //付款下单
// testMer2Umf.prepareTransferQuery()  //付款状态查询
// testMer2Umf.prepareQueryAccountBalance()  //余额查询
// testMer2Umf.prepareidentityBankIDD()  //借记卡实名认证
// testMer2Umf.prepareidentityBankID() //贷记卡实名认证
// testMer2Umf.prepareidentityAuthentication() //身份认证
// testMer2Umf.prepareDownloadSettle()   //对账文件下载
// testMer2Umf.prepareResponsePlatformMap()   //异步通知

function TestMer2Umf() {

    // umfService.umfService("60000100","../60000100_key/cert_2d59.cert.pem", "../60000100_key/60000100_.key.pem")

    //准备一些测试必需的参数值
    this.date = new Date()
    this.orderid = this.Format("yyyyMMddhhmm")
    this.merdate = this.Format("yyyyMMdd")

    this.res_format = "HTML"


    /**
     * Web收银台—生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */
    this.prepareWebFrontPagePayMap = function () {
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["goods_inf"] = "商品描述"
        reqMap["interface_type"] = "01"
        var web_pay_get_url = umfService.WebFrontPagePayMap(reqMap)
        console.log("url为："+web_pay_get_url)
        return web_pay_get_url
    }

    /**
     * H5收银台—生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */

    this.prepareH5FrontPageMap = function () {
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["goods_inf"] = "商品描述"
        var web_pay_get_url = umfService.H5FrontPageMap(reqMap)
        console.log("url为："+web_pay_get_url)
        return web_pay_get_url
    }

    /**
     * 公众号支付–生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */

    this.preparePublicPaymentMap = function(){
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["is_public_number"] = "Y"
        reqMap["goods_inf"] = "商品描述"
        var web_pay_get_url = umfService.PublicPaymentMap(reqMap)
        console.log("url为："+web_pay_get_url)
        return web_pay_get_url
    }
    /**
     * APP支付下单
     */
    this.prepareMobileOrderMap = function(){
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["goods_inf"] = "商品描述"
        // reqMap["media_id"] = ""
        // reqMap["media_type"] = ""
        // reqMap["mer_priv"] = ""
        // reqMap["expand"] = ""
        // reqMap["user_ip"] = ""
        // reqMap["expire_time"] = ""

        umfService.mobileOrderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    /**
     * APP生成签名
     */
    this.prepareAppSign = function () {
        var reqMap = {}
        reqMap[ "merId"] = "60000100"
        reqMap[ "orderId"] ="201709271656"
        reqMap[ "orderDate"] = "20170927"
        reqMap["amount"] ="1"
        var sign = umfService.generateSign(reqMap)
        console.log("App生成签名为："+sign)
    }

//快捷下单
    this.prepareShortcut = function () {
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        // reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        // reqMap["mer_cust_id"] = ""//"200000000020"
        reqMap["gate_id"] = "ABC"
        reqMap["pay_type"] = "CREDITCARD"
        // reqMap[  "goods_id"] = ""
        // reqMap[  "goods_inf"] =  "测试商品"
        // reqMap[ "media_id"] = ""
        // reqMap["user_ip"] = ""
        // reqMap[ "expand"] = ""
            // "expire_time": "",
        // reqMap["risk_expand"] = ""

        // reqMap["media_type"] = "MOBILE"//""
        umfService.quickPayOrderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备扫码支付（主扫）下单请求参数
    this.prepareScanMap = function (scancode_type) {
        let reqMap = {}
        reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["res_format"] = this.res_format
        reqMap["goods_inf"] = "测试商品"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["scancode_type"] = scancode_type
        umfService.activeScanPaymentMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备扫码支付（被扫）下单请求参数
    this.preparePassiveScanMap = function (scancode_type) {
        let reqMap = {}
        reqMap["ret_url"] = "http://xxx.xxx.com"
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["goods_inf"] = "测试商品"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["auth_code"] = "283050710648432598" //填写真实的授权码
        reqMap["use_desc"] = "cesih"
        reqMap["scancode_type"] = scancode_type
        // reqMap["user_ip"] = ""
        umfService.passiveScanPaymentMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //快捷支付向平台获取短信验证码请求参数
    this.prepareGetMessageMap = function () {
        let reqMap = {}
        reqMap["trade_no"] = "3709301427435896"   //真实的U付订单号
        reqMap["media_id"] = "1xxxxxxxxxx"
        //个人信用卡信息
        // reqMap["valid_date"] = "xxxx"
        // reqMap["cvv2"] = "xxx"
        reqMap["card_id"] = "xxxxxxxxxxxxxxxxxxx"   
        reqMap["card_holder"] = "张三"
        reqMap["identity_type"] = "IDENTITY_CARD"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxxx"

        umfService.quickGetMessageMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //快捷支付中的确认支付参数
    this.preparePayFirstMap = function () {
        let reqMap = {}
        reqMap["trade_no"] = "3709301417364126"   //真实的U付订单号
        reqMap["verify_code"] = "964780"
        reqMap["media_id"] = "1xxxxxxxxx"   //
        reqMap["media_type"] = "MOBILE"
        reqMap["valid_date"] = "yymm"
        reqMap["cvv2"] = "xxx"
        reqMap["card_id"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["card_holder"] = "张三"
        reqMap["identity_type"] = "IDENTITY_CARD"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxxx"
        umfService.quickPayConfirmMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    //查询商户支持的银行列表参数
    this.prepareQuerybankSupport = function () {
        let reqMap = {}
        reqMap["pay_type"] = "DEBITCARD"
        umfService.quickQuerybankSupportMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //快捷解约参数
    this.prepareCancelSurrender = function () {
        let reqMap = {}
        reqMap["mer_cust_id"] = "200000000020"
        umfService.quickCancelSurrenderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

//查询历史订单
    this.prepareQueryhistoryOrder = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170920"
        reqMap["order_id"] = "201709201439"
        umfService.queryhistoryOrderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //查询当天订单
    this.prepareQueryTodayOrder = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170930"
        reqMap["order_id"] = "201709301427"
        umfService.querytodayOrderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    // //快捷支付中的协议支付
    //  this.prepareProtocolPayMap= function() {
    //      let reqMap = {}
    //     reqMap["service"] = "confirm_pay_shortcut"
    //     reqMap["charset"] = this.charset
    //     reqMap["mer_id"] = this.mer_id
    //     reqMap["sign_type"] = this.sign_type
    //     reqMap["res_format"] = this.res_format
    //     reqMap["version"] = "4.0"
    //     reqMap["trade_no"] = "1309171426588482"//真实的U付订单号
    //     reqMap["verify_code"]= "1234"
    //     reqMap["media_id"]= "13621396362"
    //     reqMap["media_type"] = "MOBILE"
    //     reqMap["usr_busi_agreement_id"] = ""
    //     reqMap["usr_pay_agreement_id"] = ""
    //     umfService.
    // }

    //退款交易
    this.prepareRefund = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170930"
        reqMap["order_id"] = "201709301417"
        reqMap["refund_no"] = "1"
        reqMap["refund_amount"] = "1"
        reqMap["org_amount"] = "1"
        umfService.generalRefundMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    /**
     * 退款---批量转账退费请求
     */
    this.prepareMassTransferRefundMap = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170930"
        reqMap["order_id"] = "3709301417364126"
        reqMap["refund_no"] = "1709131750281234"
        reqMap["refund_amount"] = "1"
        reqMap["org_amount"] = "1"
        reqMap["notify_url"] = "http://www.xxx.com/xxxx.php"
        reqMap["sub_mer_id"] = "2000"
        reqMap["sub_order_id"] = "20144546131213"
        umfService.massTransferRefundMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    /**
     * 退款---退款状态查询方法
     * api reference : http://m_dev.soopay.net/umfAPI/?java#4-3-1
     */
    this.test_queryRefundStateMap = function () {
        let reqMap = {}
        reqMap["refund_no"] = "1709011807010000"
        umfService.queryRefundStateMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    /**
     * 退款---退费信息补录方法
     * api reference : http://m_dev.soopay.net/umfAPI/?java#4-4-1
     */
    this.test_remedyRefundInformationMap = function () {
        let reqMap = {}
        reqMap["refund_no"] = "1709011807010000"
        reqMap["card_holder"] = "张三"
        reqMap["card_id"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["gate_id"] = "ICBC"
        reqMap["card_branch_name"] = "ZGC"
        umfService.remedyRefundInformationMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }


    //撤销交易
    this.prepareCancelTrade = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170920"
        reqMap["order_id"] = "201709201439" //trade_no: '3709201439318553',
        reqMap["amount"] = "1"
        umfService.cancelTradeMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 付款---下单
     */
    this.prepareTransferDirect = function(){
        let reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["recv_account_type"] = "00"
        reqMap["recv_bank_acc_pro"] = "0"
        reqMap[ "recv_account"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["recv_user_name"] = "张三"
        reqMap["recv_gate_id"] = "ICBC"
        reqMap["purpose"] = "测试"
        reqMap["bank_brhname"] = "中信银行"
        umfService.paymentOrderMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    //准备付款接口查询订单请求参数
    this.prepareTransferQuery = function(){
        let reqMap = {}
        reqMap["order_id"] = "201709201721"
        reqMap["mer_date"] = "20170920"
        umfService.queryPaymentStatusMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备付款接口查询结算账户余额请求参数
    this.prepareQueryAccountBalance = function () {
        let reqMap = {}
        umfService.queryAccountBalanceMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备借记卡实名认证
    this.prepareidentityBankIDD = function () {
        let reqMap = {}
        // reqMap["mer_id"] = this.mer_id
        reqMap["order_id"] = this.orderid
        reqMap["bank_account"] = "xxxxxxxxxxxxxx"
        reqMap["account_name"] = "张三"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxx"
        reqMap["identity_type"] = "1"
        reqMap["mobile_id"] = "1xxxxxxxxxx"
        umfService.debitCardAuthenticationMap(reqMap,(res)=>{
            console.log("网络请求返回的数据是：")
            console.log(res)
        })
    }

    //准备贷记卡实名认证  --无用
    this.prepareCreditCardAuthentication = function () {
        let reqMap = {}
        reqMap["order_id"] = this.orderid
        reqMap["auth_type"] = "1"
        reqMap["auth_mode"] = "0"
        reqMap["bank_account"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["account_name"] = "张三"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxxxxxx"
        reqMap["identity_type"] = "1"
        reqMap["mobile_id"] = "1xxxxxxxxx"
        reqMap["endDate"] = "yymm"
        reqMap["cvv2"] = "xxx"
        // reqMap["version"] = "1.0"
        umfService.creditCardAuthenticationMap(reqMap,(res)=>{
            log.info("网络请求返回的数据：")
            log.info(res)
        })
    }
    //准备贷记卡实名认证
    this.prepareidentityBankID =function(){
        let reqMap = {}
        reqMap["order_id"] = this.orderid
        reqMap["auth_type"] = "1"
        reqMap["auth_mode"] = "0"
        //reqMap["cvv2","707");
        reqMap["order_id"] = "20170817774227952"
        reqMap["bank_account"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["account_name"] = "张三"

        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["identity_type"] = "1"
        reqMap["mobile_id"] = "1xxxxxxxxx"

        umfService.creditCardAuthenticationMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    //准备身份认证请求参数----
    this.prepareidentityAuthentication = function () {
        let reqMap = {}
        reqMap["auth_type"] = "1"
        reqMap["order_id"] = this.orderid
        reqMap["auth_mode"] = "3"
        reqMap["account_name"] = "张三"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxxx"

        umfService.identityAuthenticationMap(reqMap,(res)=>{
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备对账文件下载请求参数
    this.prepareDownloadSettle = function () {
        let reqMap = {}
        reqMap["settle_date"] = "20170908"//对账日期
        reqMap["settle_path"] = "/Users/MYFILE/Desktop/"     //ENPAY:付款文件,SETTLE:结算文件

        umfService.reconciliationDownloadMap(reqMap)
    }








    //异步通知商户响应后台参数拼接
     this.prepareResponsePlatformMap = function(){
        var notifyParamsStr = "amount=1&amt_type=RMB&charset=UTF-8&error_code=0000"+
        "&gate_id=BOC&goods_id=123&last_four_cardid=9112&media_id=18519105446&media_type=MOBILE"+
        "&mer_date=20170321&mer_id=60000100&order_id=20170321333781&pay_date=20170321&pay_seq=D170321044815412782"+
        "&pay_type=DEBITCARD&service=pay_result_notify&settle_date=20170321&trade_no=3703211703772982&trade_state=TRADE_SUCCESS"+
        "&usr_busi_agreement_id=UB201703211650520000000013656539&usr_pay_agreement_id=P2017011014175200000000023372710&version=4.0"+
        "&sign=YgZqiVdBALgIFcu6bXQRfSSew4Pg2t1AK25fwMfb%2FukBeRlklTdrPNw3RGbdFGSzbp7WxnV7TD20PuVs1FQbrtFZMvo2DTgB1uxJN1HwciBO30EfmpEuFSfx4m%2BoaxFNwezHdf35EHqhptRR%2BOmEe7uaGpV1EOa%2Fe%2BQPSrYRRP4%3D&sign_type=RSA"

        var notifyNews = umfService.doget(notifyParamsStr)
    }

}
/*
* 格式化日期方法，用于order_id和mer_date生成
* 用户可以根据自己的需求子定义order_id和获取mer_date
* */
function Format(fmt) { //author: meizz
    var that = new Date()
    var o = {
        "M+": that.getMonth() + 1, //月份
        "d+": that.getDate(), //日
        "h+": that.getHours(), //小时
        "m+": that.getMinutes(), //分
        "s+": that.getSeconds(), //秒
        "q+": Math.floor((that.getMonth() + 3) / 3), //季度
        "S": that.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}










