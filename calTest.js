var monate = ["Januar", "Februar" , "M&auml;rz", "April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
var wochenTage = ["So", "Mo" , "Di", "Mi","Do","Fr","Sa","So"];

var currentView = 0;
var curDate = new Date();
var dateWithSelectedMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);


function loadMonthCalendar() {
	// load Calendar for month of dateWithSelectedMonth
	var differenceForWeekday = dateWithSelectedMonth.getDay();
	if (differenceForWeekday == 0) {
		differenceForWeekday = 7;
	}
	// set H2 for Monat und Jahr anzeige
	document.getElementById("monatJahrHeader").innerHTML = monate[dateWithSelectedMonth.getMonth()] + " " + dateWithSelectedMonth.getFullYear();
	var z = 1;
	while (z< differenceForWeekday) {
		var tid = "cal-" + z;
		var lastMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), z-differenceForWeekday+1);
		document.getElementById(tid).innerHTML = lastMonthLastDay.getDate();
		setNewStyle(tid);
		z++;
	}
	z = differenceForWeekday;
	var currentMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 0);
	while (z<currentMonthLastDay.getDate()+differenceForWeekday) {
		var tid = "cal-" + z;
		curMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), differenceForWeekday-z+1);
		var nexDay = z-differenceForWeekday+1;
		document.getElementById(tid).innerHTML = nexDay;
		if (nexDay == curDate.getDate() && currentMonthLastDay.getMonth() == curDate.getMonth() && curMonth.getFullYear() == curDate.getFullYear()) {
			setTodayStyle(tid);
		}
		else {
			resetStyle(tid);
		}
		z++;
	}
	var nextMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 1);
	while (z<=42) {
		var tid = "cal-" + z;
		document.getElementById(tid).innerHTML = z-currentMonthLastDay.getDate()-differenceForWeekday+1;
		setNewStyle(tid);
		z++;
	}
}
function loadCalendarWithNext() {
	if (currentView == 0) {
		dateWithSelectedMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 1);
		loadMonthCalendar();
	}
	else if (currentView == 1) {
		dateWithSelectedMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), dateWithSelectedMonth.getDate()+7);
		loadWeekCalendar();
	}
	
}
function loadCalendarWithPrev() {
	if (currentView == 0) {
		dateWithSelectedMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()-1, 1);
		loadMonthCalendar();
	}
	else if (currentView == 1) {
		dateWithSelectedMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), dateWithSelectedMonth.getDate()-7);
		loadWeekCalendar();
	}
}
function setNewStyle(className) {
	var sheet = document.createElement('style');
	sheet.innerHTML = "#" + className + " { background-color: rgba(217, 217, 217, 0.6); }";
	document.body.appendChild(sheet);
}
function resetStyle(className) {
	var sheet = document.createElement('style');
	sheet.innerHTML = "#" + className + " { background-color: rgba(217, 217, 217, 0); }";
	document.body.appendChild(sheet);
}
function setTodayStyle(className) {
	var sheet = document.createElement('style');
	sheet.innerHTML = "#" + className + " { background-color: rgba(255, 30, 30, 0.9); }";
	document.body.appendChild(sheet);
}
function changeView() {
	var sheet = document.createElement('style');
	if (currentView == 0) {
		sheet.innerHTML = "#monthTable { visibility: hidden; } #weekTable { visibility: visible; }";
		document.body.appendChild(sheet);
		currentView = 1;
		document.getElementById("ansichtText").innerHTML = "Monate";
		document.getElementById("nextText").innerHTML = "N&auml;chste Woche";
		document.getElementById("prevText").innerHTML = "Vorige Woche";
		loadWeekCalendar();
	}
	else if (currentView == 1) {
		sheet.innerHTML = "#monthTable { visibility: visible; } #weekTable { visibility: hidden; }";
		document.body.appendChild(sheet);
		currentView = 0;
		document.getElementById("ansichtText").innerHTML = "Wochen";
		document.getElementById("nextText").innerHTML = "N&auml;chster Monat";
		document.getElementById("prevText").innerHTML = "Voriger Monat";
		loadMonthCalendar();
	}
}
function loadWeekCalendar() {
	document.getElementById("monatJahrHeader").innerHTML = monate[dateWithSelectedMonth.getMonth()] + " " + dateWithSelectedMonth.getFullYear();
	var z = 1;
	while (z <= 7) {
		var tid = "week-" + z;
		var currentDay = dateWithSelectedMonth.getDay();
		if (currentDay == 0) {
			currentDay = 7;
		}
		var dateNeeded = dateWithSelectedMonth.getDate() - currentDay + z;
		var weekDays = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), dateNeeded);
		document.getElementById(tid).innerHTML = wochenTage[weekDays.getDay()] + ", " + weekDays.getDate() + ".";
		if (weekDays.getMonth() != curDate.getMonth()) {
			setNewStyle(tid);
		}
		else if (curDate.getDate() == weekDays.getDate() && curDate.getMonth() == weekDays.getMonth() && curDate.getFullYear() == weekDays.getFullYear()) {
			setTodayStyle(tid);
		}
		else {
			resetStyle(tid);
		}
		z++;
		console.log(wochenTage[weekDays.getDay()] + ", " + weekDays.getDate() + ".");
	}
}


window.onload = loadMonthCalendar();