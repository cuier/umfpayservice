/**
 * ***********************************************************************
 * <br>description : 商户请求明文及签名工具类
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */

var Constants = require('../common/Constants')
var regexUtils = require('../utils/RegexUtils')
var ServiceMapUtils = require('./ServiceMapUtil')
var SignUtil = require('./SignUtil')
var umfEncrypt = require('./CryptoUtil')
var log4js = require('log4js')
// log4js.configure = require('../log_start')
var log = log4js.getLogger('')
/**
 *
 * <br>description : 计算商户签名串，异步通知返回的
 * @param obj 商户请求数据
 * @return 明文串和加密串Map
 * @throws ParameterCheckException
 * @version     1.0
 * @date        2017-7-25下午01:36:05
 */
exports.getPlainMap = function (reqMap, mer_id) {
    var returnMap = {}
    // log.info("PlainUtil里的初始map:")
    // log.info(reqMap)
    if (validate(reqMap)){
        log.info("[UMF SDK] 商户请求数据必填字段校验通过")
        returnMap =  getPlainAndCheckRule(reqMap,mer_id);
        if(!returnMap){
            return
        }
        log.info("[UMF SDK] 商户请求校验规则正确");
        log.info("[UMF SDK] 商户请求返回的map为:" );
        log.info(returnMap)
    }else {
        log.error("[UMF SDK] 商户请求信息" + reqMap + "在进行必填字段校验发生异常")
        console.log("[UMF SDK] 商户请求信息" + reqMap + "在进行必填字段校验发生异常")
        // throw new Error("[UMF SDK] 商户请求信息" + reqMap + "在进行必填字段校验发生异常")
        return
    }
    return returnMap
}
/**
 *
 * @param 调用SDK得到sign签名，并且做字段校验
 * @return
 * @throws ParameterCheckException
 */
function getPlainAndCheckRule(map,mer_id) {

    // log.info("[UMF SDK] 商户请求map:" )
    // log.info(map)
    let regexArr = []
    for (var item in map){
        if (ServiceMapUtils.regexId.indexOf(item) != -1  ){
            regexArr.push([map[item],item])
        }
    }
    let errorMsg = regexUtils.regexTypesWithMsg(regexArr)
    if (errorMsg){
        // console.log(errorMsg)
        log.debug(errorMsg)
        // throw ("正则校验没通过：  " + errorMsg)
        return
    }
    for (var ite in map){
        if (ServiceMapUtils.encrytId.indexOf(ite) != -1){
            var encrypted = umfEncrypt.umfEncrypto(map[ite],Constants.pkMap["platCertPath"])
            map[ite] = encrypted
        }
    }
    var returnMap = SignUtil.sign(map,Constants.pkMap[mer_id])


    return returnMap

}

//此方法针对商户传的参数进行必填的校验
function validate(map) {


    let service = map[Constants.SERVICE]
    var object = ServiceMapUtils.serviceRule[service]
    if (object == null){
        log.info("[UMF SDK]商户请求的服务字段不做字段校验！")
        return true
    }
    let rule = object
    var str = rule.split(",")
    var key = null
    var value = null
    for (let i = 0;i<str.length;i++){
        key = str[i]
        value = map[key]
        if (value == null || value == ""){
            let message = "service=" + map[Constants.SERVICE] + "[UMF SDK]商户请求中" + key + "字段必传"
            log.error(message)
            // throw new Error(message)
            return false
        }
    }
    return true

}

