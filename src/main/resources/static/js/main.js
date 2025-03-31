document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendarBody");
    const currentMonth = document.getElementById("currentMonth");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();
    let dateCount = 0;

    // 거래 내역 샘플 데이터 (서버에서 가져올 수도 있음)
    const transactions = [
        { date: "2025-03-14", amount: 50000, category: "쇼핑", type: "expense"},
        { date: "2025-03-03", amount: 120000, category: "쇼핑", type: "expense"},
        { date: "2025-03-18", amount: 80000, category: "교통비", type: "expense"},
        { date: "2025-03-26", amount: 300000, category: "기타", type: "income"},
        { date: "2025-03-14", amount: 5000000, category: "월급", type: "income"},
        { date: "2025-02-14", amount: 5000000, category: "월급", type: "income"},
        { date: "2025-04-14", amount: 5000000, category: "월급", type: "income"},

        { date: "2025-02-25", amount: 50000, category: "쇼핑", type: "expense"},
        { date: "2025-02-03", amount: 120000, category: "교통비", type: "expense"},
        { date: "2025-04-17", amount: 85000, category: "쇼핑", type: "expense"},
        { date: "2025-04-26", amount: 30000, category: "교통비", type: "expense"}
    ];

    function generateCalendar(year, month) {
        dateCount = 0;
        calendarBody.innerHTML = ""; // 기존 내용 초기화
        currentMonth.textContent = year + "년" + (month+1)+ "월";

        let firstDay = new Date(year, month, 1).getDay(); // 해당 달의 첫 번째 요일(일 - 토 : 0 - 6)
        let lastDate = new Date(year, month + 1, 0).getDate(); // 해당 달의 마지막 날짜

        // 공백 채우기 (첫 번째 요일 이전 빈칸)
        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");

            // 지난달 날짜채우기
            let lastMonthDate = new Date(year, month, 0).getDate();
            let lastDay = lastMonthDate-(firstDay-i)+1;


            emptyDiv.classList.add("day");
            emptyDiv.classList.add("lastDay");
            emptyDiv.textContent = lastDay;

            dateCount++;
            calendarBody.appendChild(emptyDiv);
        }

        // 날짜 채우기
        for (let day = 1; day <= lastDate; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = day;

            // 오늘 날짜 강조
            let dateString = year+"-"+String(month+1).padStart(2,"0")+"-"+String(day).padStart(2,"0");
            // let dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (dateString === today.toISOString().split("T")[0]) {
                dayDiv.classList.add("today");
            }

            if(new Date(dateString).getDay() === 0) {
                dayDiv.classList.add("sunday");
            }

            // 해당 날짜의 거래 내역 추가
            transactions.forEach(transaction => {

                let transactionDiv = document.createElement("div");
                transactionDiv.classList.add("transaction");

                if (transaction.date === dateString) {
                    if(transaction.type === "expense") { //지출
                        transactionDiv.classList.add("expense");
                        transactionDiv.textContent = "-" + transaction.amount.toLocaleString()
                    }else { //수입
                        transactionDiv.classList.add("income");
                        transactionDiv.textContent = "+" + transaction.amount.toLocaleString()
                    }

                    // transactionDiv.textContent = "+" + transaction.amount.toLocaleString() +"원 ("+transaction.category+transaction.type+")"
                    // transactionDiv.textContent = `${transaction.amount.toLocaleString()}원 (${transaction.category})`;
                    dayDiv.appendChild(transactionDiv);
                }
            });

            dateCount++;
            calendarBody.appendChild(dayDiv);
        }

        //다음달 날짜 채우기(전체 42칸)
        for (let nextDay = 1; nextDay < (43-dateCount); nextDay++) {
            let nextDayDiv = document.createElement("div");
            nextDayDiv.classList.add("day");
            nextDayDiv.classList.add("nextDay");
            nextDayDiv.textContent = nextDay;

            calendarBody.appendChild(nextDayDiv);
        }

    }

    // 달 변경 이벤트
    prevMonthBtn.addEventListener("click", function () {
        if (currentMonthIndex === 0) {
            currentMonthIndex = 11;
            currentYear--;
        } else {
            currentMonthIndex--;
        }
        generateCalendar(currentYear, currentMonthIndex);
    });

    nextMonthBtn.addEventListener("click", function () {
        if (currentMonthIndex === 11) {
            currentMonthIndex = 0;
            currentYear++;
        } else {
            currentMonthIndex++;
        }
        generateCalendar(currentYear, currentMonthIndex);
    });

    generateCalendar(currentYear, currentMonthIndex);
});