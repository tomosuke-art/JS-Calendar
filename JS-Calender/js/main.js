'use strict'
console.clear();
{

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); 
  // let にすることで後で中身を変更できる

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();　// 先月の最後の日 4/30
    const n = new Date(year, month, 1).getDay(); //今月の1日を取得 

    for (let i = 0; i < n; i++) {
      // 30
      //29,30
      //28,29,30
      dates.unshift({  // unshift = 配列の先頭に要素を追加
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates =[]; //date: 日付,day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();　//今月の末日の取得
    
    for(let i = 1; i <= lastDate; i++) { //末日までのループ文
      dates.push({  //push = 配列の末尾に要素を追加
        date: i,
        isToday: false,
        isDisabled: false, //先月・来月を薄くするかどうか
      });
    }


    if (year === today.getFullYear() && month === today.getMonth()){
      dates[today.getDate() - 1].isToday = true;

    }
    
    return dates;
  }

  function getCalendarTail() { //来月の取得
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay(); //今月の末日を取得

    for(let i = 1; i < 7 - lastDay; i ++){
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody'); //tbodyの取得

    while (tbody.firstChild) {  //該当月のカレンダーのみ表示、tbody.firstchild ＝　tbodyの一番初めの子要素
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;  //month は1を足して表示 
    // padStartで一桁の月の前に0をたす  ex.3 -> 03
    document.getElementById('title').textContent = title;
  }


  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),  // スプレッド演算子　＝　全ての要素を一つの配列にする
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i =0; i < weeksCount; i++) {
      weeks.push(dates.splice(0,7));
    }


    weeks.forEach(week => {  // forEachは関数を引数にとる
      const tr = document.createElement('tr'); //要素作成
      week.forEach(date => {  //date = 取り出した要素
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {  //isTodayがtrueの場合、cssのtodayを追加
          td.classList.add('today');

        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td); //子要素の末尾に追加
      });
      document.querySelector('tbody').appendChild(tr); //trをtbodyに追加
    });
  }


  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {  //一月戻る処理
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  })


  document.getElementById('next').addEventListener('click', () => {  //一月進む処理
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  })

  document.getElementById('today').addEventListener('click', () => {  // todayをクリックすると今日に戻れる処理
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });
  createCalendar();
  //getCalendarBody();
  //getCalendarHead();
  //getCalendarTail();
}