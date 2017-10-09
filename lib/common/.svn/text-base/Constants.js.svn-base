/**
 * ***********************************************************************
 * <br>description : 常量
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */



module.exports = {
    /**商户公钥和私钥存放obj*/
    pkMap: {},
    /**u付请求地址*/
    UMPAYSTIE_SERVICE: "/pay/payservice.do",
    /**merId*/
    MERID: "merId",
    MER_ID: "mer_id",
    /**goodsId*/
    GOODSID: "goodsId",
    GOODS_ID: "goods_id",
    /**goodsInf*/
    GOODSINF: "goodsInf",
    GOODS_INF: "goods_inf",
    /**mobileId*/
    MOBILEID: "mobileId",
    /**orderId*/
    ORDERID: "orderId",
    ORDER_ID: "order_id",
    /**merDate*/
    MERDATE: "merDate",
    MER_DATE: "mer_date",
    /**payDate*/
    PAYDATE: "payDate",
    PAY_DATE: "pay_date",
    /**settleDate*/
    SETTLEDATE: "settleDate",
    SETTLE_DATE: "settle_date",
    /**amount*/
    AMOUNT: "amount",
    /**amtType*/
    AMTTYPE: "amtType",
    AMT_TYPE: "amt_type",
    /**bankType*/
    BANKTYPE: "bankType",
    BANK_TYPE: "bank_type",
    /**gateId*/
    GATEID: "gateId",
    GATE_ID: "gate_id",
    /**refundNo*/
    REFUNDNO: "refundNo",
    REFUND_NO: "refund_no",
    /**payAmount*/
    PAYAMOUNT: "payAmount",
    PAY_AMOUNT: "pay_amount",
    /**retUrl*/
    RETURL: "retUrl",
    RET_URL: "ret_url",
    /**notifyUrl*/
    NOTIFYURL: "notifyUrl",
    NOTIFY_URL: "notify_url",
    /**merPriv*/
    MERPRIV: "merPriv",
    MER_PRIV: "mer_priv",
    /**expand*/
    EXPAND: "expand",
    /**version*/
    VERSION: "version",
    /**version*/
    CARDINFO: "cardInfo",
    /**sign*/
    SIGN: "sign",
    /**plain*/
    PLAIN: "plain",
    /**retCode*/
    RETCODE: "retCode",
    RET_CODE: "ret_code",
    /**retMsg*/
    RETMSG: "retMsg",
    RET_MSG: "ret_msg",
    /**transType*/
    TRANSTYPE: "transType",
    TRANS_TYPE: "trans_type",


    /**统一支付平台应用名*/
    PLAT_APP_NAME_PAY: "spay",

    METHOD_GET: "get",
    METHOD_POST: "post",

    SUCCESS: "0000",
    SERVICE: "service",
    PAYSERVICE: "payservice",
    SIGN_TYPE: "sign_type",
    CHARSET: "charset",
    USERIP: "userIp",

    PLAT_URL: "pay.soopay.net",
    /**需要进行RSA加密的参数，无需修改*/
    Encrypt_Paramters: "card_id,valid_date,cvv2,pass_wd,identity_code,card_holder,recv_account,recv_user_name,identity_holder,identityCode,cardHolder,mer_cust_name,account_name,bank_account,endDate",


    /**订单查询数据字段*/
    PLATTOMER_QUERYTRANS_FIELD: "merId,goodsId,orderId,merDate,payDate,amount,amtType,bankType,mobileId,gateId,transType,transState,settleDate,bankCheck,merPriv,retCode,version,sign",
    /**商户撤销交易数据字段*/
    PLATTOMER_REVOKE_FIELD: "merId,amount,retCode,retMsg,version,sign",
    /**商户退费交易数据字段*/
    PLATTOMER_REFUND_FIELD: "merId,refundNo,amount,retCode,retMsg,version,sign",
    /**后台直连数据字段*/
    PLATTOMER_DIRECTREQPAY_FIELD: "merId,goodsId,orderId,merDate,retCode,retMsg,version,sign",
    /**2011-10-14 add by xiajiajia*/
    /** 一般支付请求*/
    PAY_REQ_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** IVR支付方式下单*/
    PAY_REQ_IVR_CALL_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** IVR转呼方式下单*/
    PAY_REQ_IVR_TCALL_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** 商户查询订单状态*/
    QUERY_ORDER_RULE: "service,charset,sign_type,mer_id,version,order_id,mer_date",
    /** 商户撤销交易*/
    MER_CANCEL_RULE: "service,charset,sign_type,mer_id,version,order_id,mer_date,amount",
    /** 商户退费*/
    MER_REFUND_RULE: "service,charset,sign_type,mer_id,version,refund_no,order_id,mer_date,org_amount",
    /** 下载对账文件*/
    DOWNLOAD_SETTLE_FILE_RULE: "service,sign_type,mer_id,version,settle_date",
    /** 分账前端支付请求*/
    PAY_REQ_SPLIT_FRONT_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** 分账后端支付请求*/
    PAY_REQ_SPLIT_BACK_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** 分账退费*/
    SPLIT_REFUND_REQ_RULE: "service,charset,mer_id,sign_type,version,refund_no,order_id,mer_date,refund_amount,org_amount,sub_mer_id,sub_order_id",
    /** 直连网银*/
    PAY_REQ_SPLIT_DIRECT_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /** 交易结果通知*/
    PAY_RESULT_NOTIFY_RULE: "service,mer_id,sign_type,version,trade_no,order_id,mer_date,pay_date,amount,amt_type,pay_type,settle_date,trade_state",
    /** 分账结果通知*/
    SPLIT_REQ_RESULT_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,is_success",
    /** 分账退费结果通知*/
    SPLIT_REFUND_RESULT_RULE: "service,charset,sign_type,mer_id,version,refund_no,order_id,mer_date,refund_amount,org_amount,refund_amt,sub_mer_id,sub_order_id,sub_refund_amt,is_success",
    /** 信用卡直连*/
    CREDIT_DIRECT_PAY_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type,pay_type,card_id,valid_date,cvv2",
    /** 借记卡直连*/
    DEBIT_DIRECT_PAY_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type,pay_type,card_id",
    /**预授权直连申请*/
    PRE_AUTH_DIRECT_REQ: "service,charset,mer_id,sign_type,version,order_id,mer_date,media_id,media_type,amount,amt_type,pay_type,card_id,valid_date,cvv2",
    /**预授权完成*/
    PRE_AUTH_DIRECT_PAY: "service,charset,mer_id,sign_type,version,order_id,trade_no,mer_date,amount,amt_type,pay_type",
    /**预授权撤销*/
    PRE_AUTH_DIRECT_CANCEL: "service,charset,mer_id,sign_type,version,order_id,trade_no,mer_date",
    /**银行卡转账注册*/
    PAY_TRANSFER_REGISTER: "service,charset,mer_id,res_format,version,sign_type,req_date,req_time,media_type,media_id,identity_type,identity_code,cust_name",
    /**银行卡转账申请*/
    PAY_TRANSFER_REQ: "service,charset,mer_id,ret_url,notify_url,res_format,version,sign_type,order_id,mer_date,req_time,media_id,media_type,amount,fee_amount,recv_account_type,recv_bank_acc_pro,recv_account,recv_user_name,recv_gate_id,recv_type,purpose",
    /**银行卡转账订单查询*/
    PAY_TRANSFER_ORDER_QUERY: "service,charset,mer_id,res_format,version,sign_type,order_id,mer_date",
    /**银行卡转账退费*/
    PAY_TRANSFER_MER_REFUND: "service,charset,mer_id,res_format,version,sign_type,refund_no,order_id,mer_date",
    /**预授权查询*/
    PRE_AUTH_DIRECT_QUERY: "service,charset,mer_id,sign_type,version,order_id,mer_date",
    /**预授权退费*/
    PRE_AUTH_DIRECT_REFUND: "service,charset,sign_type,mer_id,version,order_id,mer_date,refund_no,refund_amount,org_amount",
    /**预授权下载对账文件*/
    PRE_AUTH_DIRECT_SETTLE: "service,sign_type,mer_id,version,settle_date",
    /**实名认证*/
    CARD_AUTH: "service,charset,mer_id,sign_type,version,mer_date,card_id",
    /**信用卡API快捷---获取短信验证码*/
    REQ_SMS_VERIFYCODE: "service,mer_id,charset,sign_type,version,trade_no,media_id,media_type",
    /**信用卡API快捷---确认支付*/
    PAY_CONFIRM: "service,mer_id,charset,sign_type,version,trade_no,pay_category,card_id",
    /**一键快捷--前端请求*/
    PAY_REQ_SHORTCUT_FRONT: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type,pay_type,gate_id",
    /**一键快捷--API下单*/
    PAY_REQ_SHORTCUT: "service,charset,mer_id,sign_type,version,order_id,mer_date,amount,amt_type",
    /**一键快捷--(首次支付)确认支付*/
    FIRST_PAY_CONFIRM_SHORTCUT: "service,mer_id,charset,sign_type,version,trade_no,media_id,media_type,card_id",
    /**一键快捷--（协议支付)确认支付*/
    AGREEMENT_PAY_CONFIRM_SHORTCUT: "service,mer_id,charset,sign_type,version,trade_no,usr_pay_agreement_id",
    /**一键快捷--获取短信验证码*/
    REQ_SMSVERIFY_SHORTCUT: "service,mer_id,sign_type,version,trade_no",
    /**一键快捷--查询商户支持的银行列表*/
    QUERY_MER_BANK_SHORTCUT: "service,sign_type,charset,mer_id,version,pay_type",
    /**一键快捷--查询用户签约的银行列表*/
    QUERY_MERCUST_BANK_SHORTCUT: "service,sign_type,charset,mer_id,version,pay_type",
    /**一键快捷--商户解除用户关联*/
    UNBIND_MERCUST_PROTOCOL_SHORTCUT: "service,sign_type,charset,mer_id,version",
    /**分账项目--分账指令*/
    SPLIT_REQ_RULE: "service,charset,mer_id,sign_type,version,order_id,mer_date",
    /**分账项目--分账状态查询*/
    QUERY_SPLIT_ORDER_RULE: "service,sign_type,charset,mer_id,version,order_id,mer_date",
    /**付款API直连--付款请求*/
    TRANSFER_DIRECT_REQ_RULE: "service,charset,mer_id,version,sign_type,order_id,mer_date,amount,recv_account_type,recv_bank_acc_pro,recv_account,recv_user_name,recv_gate_id,purpose",
    /**付款API直连--付款查询*/
    TRANSFER_QUERY_RULE: "service,charset,mer_id,version,sign_type,order_id,mer_date",
    /**历史订单查询*/
    MER_ORDER_INFO_QUERY: "service,sign_type,charset,mer_id,version,order_id,mer_date",
    /**退费订单状态查询*/
    MER_REFUND_QUERY: "service,sign_type,charset,mer_id,version,refund_no",
    /**聚合支付--微信、支付宝扫码支付*/
    ACTIVE_SCANCODE_ORDER: "service,charset,mer_id,sign_type,notify_url,version,goods_inf,order_id,mer_date,amount,amt_type,scancode_type",
    /**聚合支付--微信、支付宝被扫*/
    PASSIVE_SCANCODE_PAY: "service,charset,mer_id,sign_type,notify_url,version,goods_inf,order_id,mer_date,amount,amt_type,auth_code,use_desc,scancode_type",
    /**付款--查询结算账户余额*/
    QUERY_ACCOUNT_BALANCE: "service,charset,mer_id,version,sign_type",
    /**公共验证产品*/
    COMM_AUTH: "service,charset,mer_id,sign_type,version,auth_type,order_id",

    /**快捷支付2.2产品-下单*/
    QUICK_PAY: "service,charset,mer_id,sign_type,version,order_id,notify_url,order_id,mer_date,amount,amt_type,pay_type,gate_id",
    /**商户向平台请求获取短信验证码*/
    GET_MESSAGE: "service,charset,mer_id,sign_type,version,trade_no,media_id,media_type",
    /**快捷支付中的确认支付*/
    QUICK_PAY_FIRST: "service,charset,mer_id,sign_type,version,trade_no,trade_no,verify_code,media_type,media_id",
    /**获取商户支持的银行列表*/
    GET_BANK_MER: "service,charset,mer_id,sign_type,version,pay_type",
    /**快捷支付解约列表*/
    CANCEL_SURRENDER: "service,charset,mer_id,sign_type,version",


    /**退费消息补录*/
    REFUND_INFO_REPLENISH: "service,charset,mer_id,sign_type,version,refund_no,card_holder,card_id",
    /**一键快捷API绑定申请*/
    REQ_BIND_VERIFY_SHORCUT: "service,mer_id,sign_type,version,media_type,media_id,card_id",
    /**一键快捷API绑定确认*/
    REQ_BIND_CONFIRM_SHORCUT: "service,mer_id,sign_type,charset,version,media_type,media_id,card_id",
    /**一键快捷绑定结果通知*/
    BIND_AGREEMENT_NOTIFY_SHORCUT: "service,mer_id,sign_type,version,error_code,media_type,media_id,usr_busi_agreement_id,usr_pay_agreement_id,gate_id,last_four_cardid,bank_card_type",
    /**一键快捷前台绑定请求*/
    BIND_REQ_SHORTCUT_FRONT: "service,mer_id,sign_type,charset,version,pay_type,gate_id,mer_cust_id",
}