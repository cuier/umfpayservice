/**
 * ***********************************************************************
 * <br>description : Demo，商户以此为例
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */

// var service = require('umfpayservice')
var service = require('../lib/service/umfService')
var testMer2Umf = new TestMer2Umf()
var umfService = new service()
var umfService1 = new service()

//初始化
umfService.umfService("60000100", "/Users/MYFILE/Documents/Cuilijuan/SAAS_SDK/Node.JS/60000100_key/60000100_.key.pem", true)
umfService1.umfService("60038402", "/Users/MYFILE/Documents/Cuilijuan/SAAS_SDK/Node.JS/60000100_key/60038402_.key.pem", true)

// testMer2Umf.prepareWebFrontPagePayMap()   //web收银台
// testMer2Umf.prepareH5FrontPageMap()   //h5收银台
// testMer2Umf.preparePublicPaymentMap()   //公众号支付
// testMer2Umf.prepareMobileOrderMap()    // APP支付下单
// testMer2Umf.prepareAppSign()    //APP生成签名
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
// testMer2Umf.prepareGetToken()    //获取token
testMer2Umf.prepareAddChildMerMap()     //子商户入网
// testMer2Umf.prepareUploadChildFile()    //子商户入网资质上传
// testMer2Umf.prepareChangeChildRebut()    //驳回后商户信息修改
// testMer2Umf.prepareSelectChildMerState()   //子商户审核状态查询
// testMer2Umf.prepareChildDoGet()    //子商户异步通知
// testMer2Umf.prepareSplitStateMap()   //分账-分账状态查询
// testMer2Umf.prepareSplitRefundMap()  //分账-分账退费
// testMer2Umf.prepareSplitFileDownloadMap() //分账文件下
// testMer2Umf.preparePBankDirectMap()    // 网银直连
// testMer2Umf.preparedebit()   //借记卡直连
// testMer2Umf.preparecreditDirectMap()   //信用卡直连
// testMer2Umf.prepareSplitReqMap()   //延时分账


function TestMer2Umf() {

    // umfService.umfService("60000100","../60000100_key/cert_2d59.cert.pem", "../60000100_key/60000100_.key.pem")

    //准备一些测试必需的参数值
    this.date = new Date()
    this.orderid = Format("yyyyMMddhhmm")
    this.merdate = Format("yyyyMMdd")

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
        reqMap["amount"] = "2"
        reqMap["goods_inf"] = "商品描述"
        reqMap["interface_type"] = "01"
        // reqMap["comamt_type"] = "1"
        // reqMap["split_category"] = "2"
        // reqMap["split_type"] = "21"
        // reqMap["split_data"] = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        //     "<split_data><split><split_mer_id>60038400</split_mer_id>" +
        //     "<split_order_id>17092012</split_order_id><split_amount>1</split_amount>" +
        //     "</split><split><split_mer_id>20000000</split_mer_id><split_order_id>17092013</split_order_id>" +
        //     "<split_amount>1</split_amount></split></split_data>"

        var web_pay_get_url = umfService1.WebFrontPagePayMap(reqMap)
        console.log("url为：" + web_pay_get_url)
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
        console.log("url为：" + web_pay_get_url)
        return web_pay_get_url
    }

    /**
     * 网银直连
     */
    this.preparePBankDirectMap = function () {
        var reqMap = {}
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["pay_type"] = "B2BBANK"
        reqMap["gate_id"] = "CCB"
        let bank_get_url = umfService.pBankDirectMap(reqMap)
        return bank_get_url
    }
    /**
     * 借记卡直连
     */
    this.preparedebit = function () {
        var reqMap = {}
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["card_id"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["identity_type"] = "1"
        reqMap["identity_code"] = "xxxxxxxxxxxxxxxxx"
        reqMap["card_holder"] = "张三"
        umfService.debitDirectMap(reqMap,(res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 信用卡直连
     */
    this.preparecreditDirectMap = function () {
        var reqMap = {}
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["card_id"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["valid_date"] = "mmyy"
        reqMap["cvv2"] = "xxx"
        umfService.creditDirectMap(reqMap,(res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

     /**
     * 公众号支付–生成get后的请求参数，商户只需要拼接URL进行get请求即可
     */

    this.preparePublicPaymentMap = function () {
        var reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["is_public_number"] = "Y"
        reqMap["goods_inf"] = "商品描述"
        var web_pay_get_url = umfService.PublicPaymentMap(reqMap)
        console.log("url为：" + web_pay_get_url)
        return web_pay_get_url
    }
    /**
     * APP支付下单
     */
    this.prepareMobileOrderMap = function () {
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

        umfService.mobileOrderMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    /**
     * APP生成签名
     */
    this.prepareAppSign = function () {
        var reqMap = {}
        reqMap["merId"] = "60000100"
        reqMap["orderId"] = "201709271656"
        reqMap["orderDate"] = "20170927"
        reqMap["amount"] = "1"
        var sign = umfService.generateSign(reqMap)
        console.log("App生成签名为：" + sign)
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
        umfService.quickPayOrderMap(reqMap, (res) => {
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
        umfService.activeScanPaymentMap(reqMap, (res) => {
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
        umfService.passiveScanPaymentMap(reqMap, (res) => {
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

        umfService.quickGetMessageMap(reqMap, (res) => {
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
        umfService.quickPayConfirmMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    //查询商户支持的银行列表参数
    this.prepareQuerybankSupport = function () {
        let reqMap = {}
        reqMap["pay_type"] = "DEBITCARD"
        umfService.quickQuerybankSupportMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //快捷解约参数
    this.prepareCancelSurrender = function () {
        let reqMap = {}
        reqMap["mer_cust_id"] = "200000000020"
        umfService.quickCancelSurrenderMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

//查询历史订单
    this.prepareQueryhistoryOrder = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170920"
        reqMap["order_id"] = "201709201439"
        umfService.queryhistoryOrderMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //查询当天订单
    this.prepareQueryTodayOrder = function () {
        let reqMap = {}
        reqMap["mer_date"] = "20170930"
        reqMap["order_id"] = "201709301427"
        umfService.querytodayOrderMap(reqMap, (res) => {
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
        umfService.generalRefundMap(reqMap, (res) => {
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
        umfService.massTransferRefundMap(reqMap, (res) => {
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
        umfService.queryRefundStateMap(reqMap, (res) => {
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
        umfService.remedyRefundInformationMap(reqMap, (res) => {
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
        umfService.cancelTradeMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 付款---下单
     */
    this.prepareTransferDirect = function () {
        let reqMap = {}
        reqMap["notify_url"] = "http://xxx.xxx.com"
        reqMap["order_id"] = this.orderid
        reqMap["mer_date"] = this.merdate
        reqMap["amount"] = "1"
        reqMap["recv_account_type"] = "00"
        reqMap["recv_bank_acc_pro"] = "0"
        reqMap["recv_account"] = "xxxxxxxxxxxxxxxxxxx"
        reqMap["recv_user_name"] = "张三"
        reqMap["recv_gate_id"] = "ICBC"
        reqMap["purpose"] = "测试"
        reqMap["bank_brhname"] = "中信银行"
        umfService.paymentOrderMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    //准备付款接口查询订单请求参数
    this.prepareTransferQuery = function () {
        let reqMap = {}
        reqMap["order_id"] = "201709201721"
        reqMap["mer_date"] = "20170920"
        umfService.queryPaymentStatusMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }

    //准备付款接口查询结算账户余额请求参数
    this.prepareQueryAccountBalance = function () {
        let reqMap = {}
        umfService.queryAccountBalanceMap(reqMap, (res) => {
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
        umfService.debitCardAuthenticationMap(reqMap, (res) => {
            console.log("网络请求返回的数据是：")
            console.log(res)
        })
    }

    //准备贷记卡实名认证  --暂时不用
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
        umfService.creditCardAuthenticationMap(reqMap, (res) => {
            log.info("网络请求返回的数据：")
            log.info(res)
        })
    }
    //准备贷记卡实名认证
    this.prepareidentityBankID = function () {
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

        umfService.creditCardAuthenticationMap(reqMap, (res) => {
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

        umfService.identityAuthenticationMap(reqMap, (res) => {
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
    this.prepareResponsePlatformMap = function () {
        var notifyParamsStr = "amount=1&amt_type=RMB&charset=UTF-8&error_code=0000" +
            "&gate_id=BOC&goods_id=123&last_four_cardid=9112&media_id=18519105446&media_type=MOBILE" +
            "&mer_date=20170321&mer_id=60000100&order_id=20170321333781&pay_date=20170321&pay_seq=D170321044815412782" +
            "&pay_type=DEBITCARD&service=pay_result_notify&settle_date=20170321&trade_no=3703211703772982&trade_state=TRADE_SUCCESS" +
            "&usr_busi_agreement_id=UB201703211650520000000013656539&usr_pay_agreement_id=P2017011014175200000000023372710&version=4.0" +
            "&sign=YgZqiVdBALgIFcu6bXQRfSSew4Pg2t1AK25fwMfb%2FukBeRlklTdrPNw3RGbdFGSzbp7WxnV7TD20PuVs1FQbrtFZMvo2DTgB1uxJN1HwciBO30EfmpEuFSfx4m%2BoaxFNwezHdf35EHqhptRR%2BOmEe7uaGpV1EOa%2Fe%2BQPSrYRRP4%3D&sign_type=RSA"

        var notifyNews = umfService.doget(notifyParamsStr)
    }

    //获取token
    this.prepareGetToken = function () {
        umfService.getToken((res) => {
            let resMessage = JSON.parse(res)
            let token = resMessage["access_token"]
            console.log("token==" + token)
            // this.prepareAddChildMerMap(token)
        })
    }
    /**增加商户*/
    this.prepareAddChildMerMap = function () {
        let token = "e690415fc314f037ac63e4d71a742cc7fbf78a0d319f7b8f0c380bc7a0e4da2"
        let reqMap = {}
        reqMap["bankAccount"] = "4638792345247569"  //银行卡号
        reqMap["merId"] = "60038402"
        // reqMap["merId"] = "60144402"
        reqMap["merName"] = "杜甫"
        reqMap["merType"] = "1"
        reqMap["contActsName"] = "白居易"
        reqMap["mobileNo"] = "13911698741"
        reqMap["licenseType"] = "1"
        // reqMap["licenseNo"] = "91140106643546792F"
        reqMap["licenseNo"] = "92140106643546792C"
        reqMap["organizationId"] = ""//组织机构代码证号
        reqMap["taxPayerNum"] = ""    //税务登记证号
        reqMap["lawyer"] = "李白"
        reqMap["cardNo"] = "143624199210050537" //身份证号
        reqMap["bankName"] = "招商银行"
        reqMap["province"] = "010"
        reqMap["areaCode"] = "010"
        reqMap["pubPriFlag"] = "1"
        reqMap["bankBrhName"] = "中国工商银行股份有限公司张家界官黎坪支行"
        reqMap["merNotifyUrl"] = "http://xxx.xxx.com"
        umfService1.addChildMerInfo(token, reqMap, (res) => {
            console.log(res)
        })
    }
    /**上传资质*/
    this.prepareUploadChildFile = function () {
        let token = "100ef981afa94d6d54741446bcc206802e787da20e71f4ece4f89ea2ce209c63"

        let reqMap = {}
        reqMap["licenseNo"] = "91140106643546792F"//生产
        // reqMap["licenseNo"] = "91140100743546701z"// 测试
        // reqMap["licenseNo"] = "91140100743546792S"// 开发
        reqMap["merId"] = "60038402" //生产
        // reqMap["merId"] = "60144402" // 测试
        // reqMap["merId"] = "60188102" // 开发
        reqMap["file1"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/testImg/BANK_ACCOUNT_LICENCE.jpg"
        reqMap["file2"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/testImg/BUSSINESS_LICENSE.jpg"
        reqMap["file3"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/testImg/ID_CARD_BACK.jpg"
        reqMap["file4"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/testImg/ID_CARD_FRONT.jpg"
        reqMap["file5"] = "/Users/MYFILE/Documents/Cuilijuan/nodejs/testImg/APPLY_TABLE.jpg"
        umfService.uploadChildFile(token,reqMap,(res)=>{
            console.log(res)
        })
    }

    /**驳回状态下商户信息修改（修改后需重新上传资质）*/
    this.prepareChangeChildRebut = function () {
        let token = "8e2f4217534b92c377886ffcee12f4f4a8df613264a58f9c31dd3cef6be7ec51"
        let reqMap = {}
        reqMap["bankAccount"] = "4638792345247569"  //银行卡号
        reqMap["merId"] = "60038402"
        reqMap["merName"] = "杜甫"
        reqMap["merType"] = "1"
        reqMap["contActsName"] = "白居易"
        reqMap["mobileNo"] = "13911698741"
        reqMap["licenseType"] = "1"
        reqMap["licenseNo"] = "91140106643546792F"
        reqMap["organizationId"] = ""//组织机构代码证号
        reqMap["taxPayerNum"] = ""    //税务登记证号
        reqMap["lawyer"] = "李白"
        reqMap["cardNo"] = "143624199210050537" //身份证号
        reqMap["bankName"] = "招商银行"
        reqMap["province"] = "010"
        reqMap["areaCode"] = "010"
        reqMap["pubPriFlag"] = "1"
        reqMap["bankBrhName"] = "中国工商银行股份有限公司张家界官黎坪支行"
        reqMap["merNotifyUrl"] = "http://xxx.xxx.com"

        umfService.changeChildRebut(token,reqMap,(res)=>{
            console.log(res)
        })
    }
    /**子商户审核状态查询*/
    this.prepareSelectChildMerState = function () {
        let token = "adfba6d0b6514a6b9e1cae15c0ddc23716d8fe47b974a1f48ee1adf0112322c6"
        let reqMap = {}
        reqMap["merId"] = "60038402"
        // reqMap["merId"] = "60144402"
        reqMap["licenseNo"] = "91140106643546792F"
        // reqMap["licenseNo"] = "91140100074354601z"

        umfService.selectChildMerState(token,reqMap,(res)=>{
            console.log(res)
        })
    }
    /**
     * 子商户入网--异步通知
     */
    this.prepareChildDoGet = function () {
        let notifyChildParamsStr = "checkState=3&licenseNo=91140100743546792Z&" +
            "merId=60188102&noPassInfo=lawyer:111&" +
            "sign=ZQs/bzZ6ozPBdCgctU84M8kSmrk6U8n3M07/Ha2EDj29O99k7MJmM7N/IpglogpB7X0fXY8JD6D287DF+BSyUfhaktiHsFnXXpGBfcIP4z6eoj267T/Wi8Z+fg2Pwi1kEPPSSe/Ry3uGOS7OYIttMBsT2uMLUn9JrM5OLlOeu3A="
        let array = umfService.notifyChildParserMap(notifyChildParamsStr)
        let mer2UmfPlatStr = umfService.responseChildNotifyMap(array)
        console.log("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
        console.log("<HTML>");
        console.log(" <HEAD><META NAME=\"MobilePayPlatform\" CONTENT=" + mer2UmfPlatStr + " /></HEAD>");
        console.log(" <BODY>");
        console.log("</BODY>");
        console.log("</HTML>");
    }

    //----------------------------------------
    // 分账部分
    //----------------------------------------
    /**
     * 分账—分账请求针对标准分账的延时分账
     */
    this.prepareSplitReqMap = function () {
        let reqMap = {}
        reqMap["order_id"] = "201711131944"
        reqMap["mer_date"] = "20171113"
        umfService1.splitReqMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 分账---分账状态查询
     */
    this.prepareSplitStateMap = function () {
        let reqMap = {}
        reqMap["order_id"] = "201711131944"
        reqMap["mer_date"] = "20171113"
        umfService1.splitStateMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 分账---分账退费
     */
    this.prepareSplitRefundMap = function () {
        let reqMap = {}
        reqMap["refund_no"] = "171114100238" + Math.floor(Math.random() * 9999)  //“YYMMDDHHMMSS+4位序列数”
        reqMap["order_id"] = "201711131944"
        reqMap["mer_date"] = "20171113"
        reqMap["org_amount"] = "2"
        umfService1.splitRefundMap(reqMap, (res) => {
            console.log("网络请求返回的数据：")
            console.log(res)
        })
    }
    /**
     * 分账---分账文件下载
     */
    this.prepareSplitFileDownloadMap = function () {
        let reqMap = {}
        // reqMap["mer_id"] = "60038402"
        reqMap["settle_date"] = "20171024"
        reqMap["settle_path"] = "/Users/MYFILE/Desktop/"
        reqMap["settle_type"] = "SPLITDETAIL"

        umfService1.splitFileDownloadMap(reqMap)
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










