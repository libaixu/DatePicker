(function () {
  var pickerData = window.pickerData;
  var util = window.util;
  var $wrapper;
  var monthData;

  pickerData.renderUI = function(year, month) {
    monthData = pickerData.getMonthData(year, month);
    var _html =`<div class="ui-datePicker-header">
                  <a href="#" class="ui-datePicker-btn ui-datePicker-prev">&lt;</a>
                  <a href="#" class="ui-datePicker-btn ui-datePicker-next">&gt;</a>
                  <span class="ui-datePicker-current-month">${monthData.year}-${monthData.month}</span>
                </div>
                <div class="ui-datePicker-body">
                  <table>
                    <thead>
                      <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                      </tr>
                    </thead>
                    <tbody>`;
                    for (var i=0, monthDays=monthData.days; i<monthDays.length; i++) {
                      var date = monthData.days[i];
                      if (i % 7 === 0) {
                        _html += `<tr>`;
                      }
                      _html += `<td data-date="${date.date}">${_pad(date.showDate)}</td>`;
                      if (i % 7 === 6) {
                        _html += `</tr>`;
                      }
                    }
                    _html += `</tbody>
                  </table>
                </div>`;

    return _html;
  }

  // 渲染日历html
  pickerData.renderHtml = function(direction) {
    var year, month;

    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }

    if (direction === 'prev') {
      month--;
      if (month === 0) {
        month = 12;
        year--;
      }
    } else if (direction === 'next') {
      month++;
    }
    var _html = pickerData.renderUI(year, month);

    $wrapper = document.querySelector('.ui-datePicker-wrapper');

    if (!$wrapper) {
      $wrapper = document.createElement('div');
      $wrapper.className = 'ui-datePicker-wrapper';
      document.body.appendChild($wrapper);
    }
    $wrapper.innerHTML = _html;
  }

  pickerData.init = function(targetClassName) {
    pickerData.renderHtml();

    var isOpen = false;
    var $dateInput = document.querySelector(targetClassName);

    $dateInput.addEventListener('click', function(e) {
      var input = e.target;
      if (!isOpen) {
        util.addClass($wrapper, 'ui-datePicker-wrapper-show');
        isOpen = true;
      } else {
        util.removeClass($wrapper, 'ui-datePicker-wrapper-show');
        isOpen = false;
      }
      var left = input.getBoundingClientRect().left;
      var top = input.getBoundingClientRect().top;
      var inputHeight = input.getBoundingClientRect().height;
      $wrapper.style.top = top + inputHeight + 2 + 'px';
      $wrapper.style.left = left;
    }, false);

    $wrapper.addEventListener('click', function(e) {
      var $target = e.target;
      if (!$target.classList.contains('ui-datePicker-btn')) {
        return;
      }
      console.log('123');
      if ($target.classList.contains('ui-datePicker-prev')) {
        // 上一个月
        pickerData.renderHtml('prev');
      } else if ($target.classList.contains('ui-datePicker-next')) {
        // 下一个月
        pickerData.renderHtml('next');
      }
    }, false);

    $wrapper.addEventListener('click', function(e) {
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== 'td') {
        return;
      }
      $dateInput.value = _format(new Date(monthData.year, monthData.month - 1, $target.dataset.date));
      
      util.removeClass($wrapper, 'ui-datePicker-wrapper-show');
      isOpen = false;
    }, false)
  }

  function _format(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  function _pad(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }
})();