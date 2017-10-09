/**
 * ***********************************************************************
 * <br>description : 项目中使用的其他工具
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */
var log4js = require('log4js')
log4js.configure = require('../log_start')
var log = log4js.getLogger('')
var fs = require('fs')
var iconv = require('iconv-lite')

  exports.Format = function (fmt) { //author: meizz
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

/**
 * 将对象数据转换为String，并去除首尾空格
 * @param obj
 * @return
 */
exports.trim =  function(obj) {
    if (null == obj ){
        return ""
    }else{
        return obj.toString().trim()
    }
}

/**
 * <br>description : 对以&符分隔,数据以键值对形式出现的商户通知数据进行解析,并生成对应的键值数据
 * @param meta 待解析通知数据例:merId=9996&amtType=1&retCode=1001&retMsg=zOG9u8r9vt1bP13R6dakyqew3A==&versin=3.0
 * @return
 * @version     1.0
 * @date        2017-8-25上午10:26:14
 */

  exports.getDataByContent = function(meta) {
    var map = {}
    var arr = meta.toString().split("&")

    for(var i=0;i<arr.length;i++){
        let value = arr[i]
        let temp = value.split("=")
        //split不支持只将字符串完整分割成两部分
        if (temp.length >= 2){
            map[temp[0]] = value.substr(value.indexOf("=")+1,value.length)
        }else if(temp.length==1){
            map[temp[0]] = ""
        }
    }
    return map
}
/**
 * ***********************************************************************
 * <br>description : 对账文件写入
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */

exports.writeSettle = function(content,settle_path,fileName){
    if (content == "" || content == null){
        log.error("对账文件内容为空")
        return false
    }
    if(settle_path == "" || settle_path == null){
        log.error("下载对账文件的路径为空")
        return false
    }
    var contents = iconv.encode(content,'gbk')
    var filePath = settle_path + fileName + ".txt"
    fs.writeFile(filePath,contents,function (err) {
        if(err) {
            throw  err
        }
        log.info("对账文件写入成功")
    })
}