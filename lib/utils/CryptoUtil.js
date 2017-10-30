var log4js = require('log4js')
// log4js.configure = require('../log_start')
var log = log4js.getLogger('')

/**
 * ***********************************************************************
 * <br>description : 加密工具
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */
var crypto = require('crypto')
var iconv = require('iconv-lite')

exports.umfEncrypto = function (plain,pubkeyPath) {
    try{
        var key = pubkeyPath
        ///< 公钥加密
        plain = iconv.encode(plain,'gbk')
        var buf = new Buffer(plain)
        var endata = crypto.publicEncrypt({key:key,padding:crypto.constants.RSA_PKCS1_PADDING },buf);
        return endata.toString('base64')
    }catch (e){
        log.error(e)
    }

}

exports.childMerEncrypto = function (plain, pubkeyPath) {
    try{
        var key = pubkeyPath
        ///< 公钥加密
        plain = iconv.encode(plain,'utf8')
        var buf = new Buffer(plain)
        var endata = crypto.publicEncrypt({key:key,padding:crypto.constants.RSA_PKCS1_PADDING },buf);
        return endata.toString('base64')
    }catch (e){
        log.error(e)
    }
}

// Buffer.prototype.toByteArray = function () {
//   return Array.prototype.slice.call(this, 0)
// }
// fs.writeFileSync('endata.txt',endata,{encoding:'binary'}); ///< 生成文件用于c++服务程序解密

///< 私钥解密
// var priv_key = fs.readFileSync('yoopa_3.key');
// var pkey = priv_key.toString('ascii');
// var dedata = crypto.privateDecrypt({key:pkey,passphrase:'123456',padding:crypto.RSA_PKCS1_PADDING},endata);
// console.log('decrypted data='+dedata);