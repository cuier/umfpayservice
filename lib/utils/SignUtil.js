/**
 * ***********************************************************************
 * <br>description : 签名验签工具类
 * @author      崔立娟
 * @date        2017-8-24 下午04:25:30
 * @version     1.0
 ************************************************************************
 */
var log4js = require('log4js')
// log4js.configure = require('../log_start')
var log = log4js.getLogger('')
var iconv = require('iconv-lite')
var crypto = require('crypto');
var fs = require('fs');

var SignUtil = new SignUtil()
module.exports = SignUtil
function SignUtil() {

    /**
     *
     * <br>description : 商户请求平台数据签名
     * @param plain
     * @param priKeyPath
     * @return
     * @version     1.0
     * @date        2017-8-1上午09:39:50
     */

    this.sign = function (signPlain,priKeyPath) {

        log.info("【UMF SDK】签名原始数据:plain=")
        log.info(signPlain)
        try {
            var privateKey = fs.readFileSync(priKeyPath, 'utf8')
            var sign_type = signPlain.sign_type
            delete signPlain.sign_type
            var signParams = this.jsonURLParams(signPlain)
            var signature = crypto.createSign('sha1').update(signParams,'utf8')

            signPlain["sign_type"] = sign_type
            signPlain["sign"] = signature.sign(privateKey,'base64')
            var params = signPlain
            return params
        }catch (e){
            log.error(e)
        }

    }
    //聚合支付app下单签名
    this.mobileGenerateSign = function(signPlain,priKeyPath){
        log.info("【UMF SDK】签名原始数据:plain=")
        log.info(signPlain)
        try{
            var privateKey = fs.readFileSync(priKeyPath, 'utf8')
            var signParams
            if(signPlain["merId"] && signPlain["orderId"] && signPlain["orderDate"] && signPlain["amount"]){
                 signParams = signPlain["merId"] + signPlain["orderId"] + signPlain["amount"] + signPlain["orderDate"]
            }else {
                log.error('请检查mer_id,orderId,orderDate和amount是否有为空的数据')
                return
                    // throw new TypeError('请检查mer_id,orderId,orderDate和amount是否有为空的数据');
                }

            var signature = crypto.createSign('sha1').update(signParams,'gbk')
            var sign = signature.sign(privateKey,'hex').toUpperCase()
            log.info("sign ==    "+ sign)
            return sign
        }catch (e){
            log.error(e)
        }

    }

    //添加子商户签名
    this.addChildMerSign = function (signPlain,priKeyPath) {
        log.info("【UMF SDK】签名原始数据:plain=")
        log.info(signPlain)
        try {
            var privateKey = fs.readFileSync(priKeyPath, 'utf8') //生产

            var signParams = JSON.stringify(signPlain)
            console.log("signParams====")
            console.log(signParams)
            var signature = crypto.createSign('sha256').update(signParams,'utf8')
            // signPlain["sign"] = signature.sign(privateKey,'base64')
            // console.log("签名为：" + signPlain["sign"])
            var params = JSON.parse(signParams)
            params["sign"] = signature.sign(privateKey,'base64')
            return params
        }catch (e){
            log.error(e)
        }
    }
    /**
     *
     * <br>description : 验签
     * @param plain
     * @param merId
     * @return
     * @version     1.0
     * @date        2017-8-1上午09:39:50
     */

    this.verify_signature = function(responseMap,pub_key_path) {

        // log.info("responseMap === ")
        // log.info(responseMap)
        delete responseMap["sign_type"]
        var signature = responseMap["sign"]
        if(signature == null){
            log.info("后台返回签名为空")
            // throw ("后台返回签名为空")
            return
        }
        delete responseMap["sign"]
        var raw_data = this.jsonURLParams(responseMap)
        raw_data = iconv.encode(raw_data,'gbk')
        var verifier = crypto.createVerify('sha1').update(raw_data);
        var pub_key = pub_key_path
        // pub_key = pub_key.toString()
        return verifier.verify(pub_key, signature, 'base64');
    }


    // 对要签名的json数据进行排序、拼接成用=和&连接起来的URL的参数形式，参数依次是要排序的json对象、是否倒序(默认为false)
    this.jsonURLParams = function(json,reverse){
        // 创建一个空数组
        var jsonArr = [];
        // 往空数组里面导入json对象
        for(var i in json){
            var obj = {}
            obj[i] = json[i];
            jsonArr.push(obj)
        }
        // 数组长度小于2  或 不是json格式数据
        if(jsonArr.length < 2 || typeof jsonArr[0] !== "object") return jsonArr;
        // 数字类型排序
        if(typeof getKey(jsonArr[0]) === "number") {
            jsonArr.sort(function(x, y) { return getKey(x) - getKey(y)})
        }
        // 字符串类型排序
        if(typeof getKey(jsonArr[0]) === "string") {
            // 按字符编码的顺序来排序
            jsonArr.sort(function(x, y) {
                var lenX = getKey(x).length,lenY = getKey(y).length,len = (lenX <= lenY) ? lenX : lenY;
                for (var i = 0; i < len; i++) {
                    if (getKey(x).charCodeAt(i) != getKey(y).charCodeAt(i)) {
                        return getKey(x).charCodeAt(i) - getKey(y).charCodeAt(i)
                    }
                    if (i == len - 1) {
                        return getKey(x).length - getKey(y).length;
                    }
                }
            })
        }
        // 倒序
        if(reverse) {
            jsonArr.reverse();
        }
        // 创建一个空字符串
        var jsonString = "";
        for(var i in jsonArr){
            if(i < jsonArr.length - 1){
                jsonString += getKey(jsonArr[i]) + "=" + jsonArr[i][getKey(jsonArr[i])] + "&"
            }else{
                jsonString += getKey(jsonArr[i]) + "=" + jsonArr[i][getKey(jsonArr[i])]
            }
        }
        // 封装函数获取json的key
        function getKey(json){
            for(var i in json){
                return i;
            }
        }
        return jsonString;
    }

}




