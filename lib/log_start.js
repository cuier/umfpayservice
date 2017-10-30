/**
 * ***********************************************************************
 * <br>description : log4js日志文件配置文件
 * @author      崔立娟
 * @date        2017-9-7
 * @version     1.0
 ************************************************************************
 */

var log4js = require('log4js')
exports.configure = log4js.configure({
    appenders: {
        "saas_sdk":

        {
            type: 'dateFile',
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            filename: './umfLog/sdk',     //商户自定义日志目录，商户请勿修改其他配置
            maxLogSize:1024*1024,
            backups:3,
            category:'normal',
            level:'debug'
        },
        "saas_sdk_console":{"type":"console",
            "category":"console"}
    },


    categories: {default: { appenders: ['saas_sdk','saas_sdk_console'], level: 'debug' } },
    "replaceConsole":true,
});


// console.log("log_start start!");
//
// var LogFile = log4js.getLogger('');
//
// LogFile.trace('This is a Log4js-Test');
// LogFile.debug('We Write Logs with log4js');
// LogFile.info('You can find logs-files in the log-dir');
// LogFile.warn('log-dir is a configuration-item in the log4js.json');
// LogFile.error('In This Test log-dir is : \'./log/\'');
//
// console.log("log_start end!");