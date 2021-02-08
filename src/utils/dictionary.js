
const dateTime = {
    /**
     * 获取格式化日期
     * @param {*} fmt 
     */
    getFormatTime(fmt){
        let now = new Date();
        var o = {
            "M+" : now.getMonth()+1,                 //月份
            "d+" : now.getDate(),                    //日
            "h+" : now.getHours(),                   //小时
            "m+" : now.getMinutes(),                 //分
            "s+" : now.getSeconds(),                 //秒
            "q+" : Math.floor((now.getMonth()+3)/3), //季度
            "S"  : now.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (now.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    },
    /**
     * 获取指定日期的下个月日期
     */
    getNextMonthDate(date){
    	var arr = date.split('-');
    	var year = arr[0];//获取当前日期的年份
    	var month = arr[1];//获取当前日期的月份
    	var day = arr[2];//获取当前日期的日期
    	var month2 = parseInt(month)+1;
    	if(month2 == 13){
    		year = parseInt(year) + 1;
    		month2 = 1;
    	}
    	var days2 = new Date(year,month2,0);//获取当前日期中月的天数
    	days2 = days2.getDate();//天数
    	if(day > days2){
    		day = days2;
    	}
    	if(month2 < 10){
    		month2 = '0' + month2; 
    	}
    	
    	var newsDate = year + '-' + month2 + '-' + day;
    	return newsDate;	
    }

}

export {
    dateTime
}