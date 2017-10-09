/**
 * ***********************************************************************
 * <br>description : 网络请求
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */
"use strict";

var log4js = require('log4js')
log4js.configure = require('../log_start')
var log = log4js.getLogger('')
var Constants = require('../common/Constants')
var umfUtil = require('../utils/UmfUtils')
var https = require('https')
var signUtil = require('../utils/SignUtil')
var query = require('querystring')
var iconv = require('iconv-lite')

function NetworkUtils() {

    this.submit = function (params) {

        //发送 http Post 请求

        log.debug("网络请求的参数为：")
        log.debug(params)
        var options = {
            hostname: Constants.PLAT_URL,
            port: 443,
            path: '/'+Constants.PLAT_APP_NAME_PAY+Constants.UMPAYSTIE_SERVICE,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Encoding':'UTF-8',
                'User-Agent': 'Rich Powered/1.0'
            }
        }

        var req = https.request(options, function (res) {
            log.info('Status:', res.statusCode);
            log.info('headers:', JSON.stringify(res.headers));
            if(params.indexOf("download_settle_file") < 0) {
                res.setEncoding('utf8')
            }
            res.on('data', function (chun) {
                log.info("网络请求返回的数据："+chun)
                if(params.indexOf("download_settle_file") >= 0){
                    chun = iconv.decode(chun,'gbk')
                    let settle_path = query.parse(params).settle_path
                    let mer_id = query.parse(params).mer_id
                    let settle_date = query.parse(params).settle_date
                    let fileName = mer_id+'_'+settle_date
                    umfUtil.writeSettle(chun,settle_path,fileName)
                    return
                }

                // chun.toString()
                var meta = chun.substring(chun.indexOf("CONTENT")+9,chun.indexOf("</head"))
                meta = meta.substring(0,meta.indexOf("\">"))
                // log.info("meta====")
                // log.info(meta)
                var responseMap = umfUtil.getDataByContent(meta)
                if(signUtil.verify_signature(responseMap,Constants.pkMap.platCertPath)){
                    log.info("验签通过")
                }else {
                    log.info("验签失败")
                }
            });
            res.on('end', function () {
                // log.info('No more data in response.********');
            });
        });
        req.on('error', function (err) {
            console.error(err);
        });
        req.write(params);
        req.end();

    }


}

var dNetWorkUtils = new NetworkUtils()
module.exports = dNetWorkUtils



