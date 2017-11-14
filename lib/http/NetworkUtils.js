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
var http = require('http')
var https = require('https')
var signUtil = require('../utils/SignUtil')
var query = require('querystring')
var iconv = require('iconv-lite')
var fs = require('fs')
var request = require('request')


exports.submit = function (params, cb) {
    if (!params) {
        return
    }
    var responseMap = {}
    //发送 http Post 请求
    log.info("网络请求的参数为：")
    log.info(params)
    var options = {
        hostname: Constants.PLAT_URL,
        // port: 443,
        path: '/' + Constants.PLAT_APP_NAME_PAY + Constants.UMPAYSTIE_SERVICE,
        method: Constants.METHOD_POST,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Encoding': 'UTF-8',
            'User-Agent': 'Rich Powered/1.0'
        }
    }
    let _req = https.request(options, (_res) => {
        log.info('Status:', _res.statusCode);
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

//子商户入网部分网络请求
exports.childMerQuest = function (url, params, headers, method,cb) {

    //发送 http Post 请求
    log.info("网络请求的参数为：")
    log.info(params)
    var options = {
        hostname: Constants.PLAT_URL,
        path: url,
        method: method,
        headers: headers
    }
    let _req = http.request(options, (_res) => {
        log.info('Status:', _res.statusCode);
        _res.setEncoding('utf8')
        _res.on('data', (chun) => {
            log.info("网络请求返回" + chun)
            return typeof cb == "function" && cb(chun)
        })
        _res.on('end', () => {
        })
    })
    _req.on('error', (err) => {
        log.error(err);
        return typeof cb == "function" && cb(err)
    });
    _req.write(params);
    _req.end();
}

// //添加子商户
// exports.addChildMer = function (params,cb) {
//     //发送 http Post 请求
//     log.info("添加子商户网络请求的参数为：")
//     log.info(params)
//     let Signature = params["sign"]
//     let token = params["token"]
//     delete params["sign"]
//     delete params["token"]
//     log.info("添加子商户网络请求的参数为：")
//     log.info(params)
//     var options = {
//         hostname: "pay.soopay.net",
//         path:"/spay_restPay/addChildMerInfo",
//         method: 'POST',
//         // token: "Bearer"+token,
//         headers: {
//             'Content-Type': 'application/json',
//             'Charset': 'UTF-8',
//             'Signature': Signature,
//             'Authorization': 'Bearer'+token
//         }
//     }
//     let _req = http.request(options,(_res)=>{
//         log.info('Status:', _res.statusCode);
//         _res.setEncoding('utf8')
//         _res.on('data',(chun)=>{
//             log.info("网络请求返回" + chun)
//             return typeof cb == "function" && cb(chun)
//         })
//         _res.on('end',()=>{})
//     })
//     _req.on('error', (err) => {
//         log.error(err);
//         return typeof cb == "function" && cb(err)
//     });
//     _req.write(JSON.stringify(params));
//     _req.end();
// }


//上传资质
exports.uploadFile = function (token, params, cb) {

    var _headers = {
        'Content-Type': "multipart/form-data",
        'Signature': params["sign"],
        'Authorization': 'Bearer' + token
    }
    var urlencodePa = '{"licenseNo":"' + params["licenseNo"] + '","merId":"' + params["merId"] + '"}'
    urlencodePa = encodeURIComponent(urlencodePa)
    var _formData = {
        file: [
            fs.createReadStream(params["file5"]),
            fs.createReadStream(params["file1"]),
            fs.createReadStream(params["file2"]),
            fs.createReadStream(params["file3"]),
            fs.createReadStream(params["file4"]),
        ],
    };
    var _url = 'http://pay.soopay.net/spay_restPay/uploadChildFile?data='+urlencodePa

    request.post({
        url: _url, headers: _headers, formData: _formData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return log.error('upload failed:', err);
        }
        log.info('Status:',httpResponse.statusCode)
        log.info('Upload successful!  Server responded with:', body);
        return typeof cb == "function" && cb(body)
    });
}

