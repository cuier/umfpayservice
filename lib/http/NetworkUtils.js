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
var log = log4js.getLogger('')
var Constants = require('../common/Constants')
var umfUtil = require('../utils/UmfUtils')
var https = require('https')
var signUtil = require('../utils/SignUtil')
var query = require('querystring')
var iconv = require('iconv-lite')


exports.submit = function (params, cb) {
    if(!params){
        return
    }
    var responseMap = {}
    //发送 http Post 请求
    log.info("网络请求的参数为：")
    log.info(params)
    var options = {
        hostname: Constants.PLAT_URL,
        port: 443,
        path: '/' + Constants.PLAT_APP_NAME_PAY + Constants.UMPAYSTIE_SERVICE,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Encoding': 'UTF-8',
            'User-Agent': 'Rich Powered/1.0'
        }
    }
    var _req = https.request(options, (_res) => {
        // return typeof cb == "function"&&cb(_res.on('data',function (chun) {
        // }))
        log.info('Status:', _res.statusCode);
        log.info('headers:', JSON.stringify(_res.headers));
        if (params.indexOf("download_settle_file") < 0) {
            _res.setEncoding('utf8')
        }
        _res.on('data', (chun) => {
            if (params.indexOf("download_settle_file") >= 0) {
                chun = iconv.decode(chun, 'gbk')
                let settle_path = query.parse(params).settle_path
                let mer_id = query.parse(params).mer_id
                let settle_date = query.parse(params).settle_date
                let fileName = mer_id + '_' + settle_date
                umfUtil.writeSettle(chun, settle_path, fileName)
                return
            }
            var meta = chun.substring(chun.indexOf("CONTENT") + 9, chun.indexOf("</head"))
            meta = meta.substring(0, meta.indexOf("\">"))
            responseMap = umfUtil.getDataByContent(meta)
            if (signUtil.verify_signature(responseMap, Constants.pkMap.platCertPath)) {
                log.info("验签通过")
            } else {
                log.info("验签失败")
            }
            return typeof cb == "function" && cb(responseMap)
        })
        _res.on('end', () => {
        });
    });
    _req.on('error', (err) => {
        log.error(err);
        return typeof cb == "function" && cb(err)
    });
    _req.write(params);
    _req.end();

}



