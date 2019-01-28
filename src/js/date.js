(function() {
  var pickerData = {};

  pickerData.getMonthData = function(year, month) {
    var ret = [];

    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDate = new Date(year, month - 1, 1);
    var firstDateNumber = firstDate.getDate();
    var firstDateWeekDay = firstDate.getDay();

    var lastDate = new Date(year, month, 0);
    var lastDateNumber = lastDate.getDate();

    var lastDateOfLastMonth = new Date(year, month - 1, 0);
    var lastDateNumberOfLastMonth = lastDateOfLastMonth.getDate();

    var preLastMonthDayCount = firstDateWeekDay;

    for (var i=1; i<=7 * 6; i++) {
      var date = i - preLastMonthDayCount;
      var showDate = date;
      var currentMonth = month;

      // date日期超出界限，小于0为上一个月，大于月底最后一天为下一个月
      if (date <= 0) {
        currentMonth = month - 1;
        showDate = lastDateNumberOfLastMonth + date;
      }
      if (date > lastDateNumber) {
        currentMonth = month + 1;
        showDate = showDate - lastDateNumber;
      }

      // 当前月份小于0或者大于12，重置月份
      if (currentMonth === 0) {
        currentMonth = 12;
      }
      if (currentMonth === 13) {
        currentMonth = 1;
      }

      ret.push({
        month: currentMonth,
        showDate: showDate,
        date: date
      });
    }

    return ret;
  }

  window.pickerData = pickerData;
})();
