var appointments = [];
var termine = [];
var refresh;

$(document).ready(function() {
	var monate = ["Januar", "Februar" , "M&auml;rz", "April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
	var wochenTage = ["So", "Mo" , "Di", "Mi", "Do", "Fr", "Sa", "So"];

	var currentView = 0;
	var curDate = new Date();
	var dateWithSelectedMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);

	/* jQuery Selectors */
	var $monthRow = $("<div></div>");
	var $weekRow = $("<div></div>");
	var $weekTable = $('#weekTable');
	var $monthTable = $('#monthTable');
	$monthTable.append($monthRow);
	$weekTable.append($weekRow);
	var $row;

	for(var i = 1; i < wochenTage.length; i++) {
		$monthRow.append("<div class='weekdays_header'><span>" + wochenTage[i] + "</span></div>");
		$weekRow.append("<div class='weekdays_header'><span>" + wochenTage[i] + "</span></div>");
	}

	for(var i = 0; i < 6; i++) {
		$row = $("<div></div>");
		$monthTable.append($row);
		for(var j = 1; j <= 7; j++) {
			$row.append($("<div id='cal-" + ((7*i)+j) + "'></div>"));
		}
	}

	$row = $("<div id='days_of_week'></div>");
	$weekTable.append($row);
	for(var i = 0; i < 7; i++) {
		$row.append("<div id='week-"+ (i+1) +"'></div>");
	}

	$('#prev').click(loadCalendarWithPrev);
	$(document).keydown(function(e){
		if (e.keyCode == 37) loadCalendarWithPrev();
		else if (e.keyCode == 39) loadCalendarWithNext();
		else if (e.keyCode == 38 || e.keyCode == 40) changeView()
	});

	$('#appointment').click(newAppointment);
	$('#next').click(loadCalendarWithNext);
	$('#change').click(changeView);
	$('#today').click(function() {
		if (currentView == 1) {
			dateWithSelectedMonth = new Date();
		} else {
			dateWithSelectedMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
		} 
		refresh();
	});

Date.prototype.getWeek = function () {   
    var target  = new Date(this.valueOf());  
    var dayNr   = (this.getDay() + 6) % 7;   
    target.setDate(target.getDate() - dayNr + 3);   
    var firstThursday = target.valueOf();   
    target.setMonth(0, 1);  
    if (target.getDay() != 4) {  
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);  
    }  
    return 1 + Math.ceil((firstThursday - target) / 604800000); 
}  

	loadMonthCalendar();

	function loadMonthCalendar() {
		var differenceForWeekday = dateWithSelectedMonth.getDay() || 7;
		$("#header").html(monate[dateWithSelectedMonth.getMonth()] + " " + dateWithSelectedMonth.getFullYear());
		for (var z = 1; z< differenceForWeekday; z++) {
			var tid = "cal-" + z;
			var $tid = $('#'+tid);
			var lastMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), z-differenceForWeekday+1);
			//addAppointment(lastMonthLastDay,tid);
			$tid.html("<span>" + lastMonthLastDay.getDate() + "</span><div class='appointments'></div>");
			setStyle($tid, "new",'cal-');
		}

		var currentMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 0);

		for (z = differenceForWeekday; z<currentMonthLastDay.getDate()+differenceForWeekday; z++) {
			tid = "cal-" + z;
			$tid = $('#'+tid);
			curMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), differenceForWeekday-z+1);
			var nexDay = z-differenceForWeekday+1;
			$tid.html("<span>" + (nexDay)  + "</span><div class='appointments'></div>");
			addAppointment(new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(),nexDay),tid);
			if (nexDay == curDate.getDate() && currentMonthLastDay.getMonth() == curDate.getMonth() && curMonth.getFullYear() == curDate.getFullYear()) setStyle($tid, "today");
			else setStyle($tid, "reset", 'cal-');
		}

		var nextMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 1);

		while (z<=42) {
			tid = "cal-" + z;
			$tid = $('#'+tid);
			$tid.html("<span>" + (z-currentMonthLastDay.getDate()-differenceForWeekday+1)  + "</span><div class='appointments'></div>");
			setStyle($tid, "new", 'cal-');
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

	function setStyle($element, styleClass, format) {
		if($element.attr('id').replace(format, '') % 7 == 0 || ($element.attr('id').replace(format, '') % (6+Math.floor($element.attr('id').replace(format, '')/7)*7)) == 0) {
			$element.removeClass();
			if(styleClass == "new") $element.addClass('dark_weekend');
			else $element.addClass('weekend');
		} else {
			$element.removeClass().addClass(styleClass);
		}
	}

	function changeView() {
		if (!currentView) {
			$weekTable.fadeIn(300);
			$monthTable.fadeOut(300);
			currentView = 1;
			$("#changeText").html("Monatsansicht");
			dateWithSelectedMonth = new Date();
			loadWeekCalendar();
		} else {
			$weekTable.fadeOut(300);
			$monthTable.fadeIn(300);
			currentView = 0;
			$("#changeText").html("Wochenansicht");
			dateWithSelectedMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
			loadMonthCalendar();
		}
	}

	refresh = function() {
		if(!currentView) loadMonthCalendar();
		else loadWeekCalendar();
	};

	refreshWeek = function() {
		loadWeekCalendar();
	}

	function loadWeekCalendar() {
		$("#header").html(monate[dateWithSelectedMonth.getMonth()] + " " + dateWithSelectedMonth.getFullYear() + "<br /><span id='kw'>Kalenderwoche " + dateWithSelectedMonth.getWeek() + "</span>");

		for (var z = 1; z <= 7; z++) {
			var tid = "week-" + z;
			var $tid = $('#'+tid);
			var currentDay = dateWithSelectedMonth.getDay() || 7;
			var dateNeeded = dateWithSelectedMonth.getDate() - currentDay + z;
			var weekDays = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), dateNeeded);
			$tid.html("<span>" + wochenTage[weekDays.getDay()] + ", " + weekDays.getDate() + ".</span>");
			if (curDate.getDate() == weekDays.getDate() && curDate.getMonth() == weekDays.getMonth() && curDate.getFullYear() == weekDays.getFullYear()) setStyle($tid, "today", 'cal-');
			else setStyle($tid, "reset", 'week-');
		}
	}

	function newAppointment() {
		$('#monthTable').addClass('active');
		$('#appointmentform').delay(750).fadeIn(300, function() {
		});
	}

	$(document).on('click', '.appointment', function() {
		$('#monthTable').addClass('active');
		$('#dayview').delay(750).fadeIn(300, function() {
		});
	});

	$('#dayview_close').click(function() {
		$('#monthTable').removeClass('active');
		$('#dayview').fadeOut(300, function() {
		});
	});

	$('#appointment_close').click(function() {
		$('#monthTable').removeClass('active');
		$('#appointmentform').fadeOut(300, function() {
		});
	});

	$('nav').click(function() {
		$('#menu').toggleClass('activeMenu');
		$('#overlay').fadeToggle(250);
	});
	
});

function loadAppointments() {

	for (var i=0;i<termine.length;i++) {
		var appStartDate = new Date(termine[i].starty,termine[i].startm-1,termine[i].startd,termine[i].startts,termine[i].starttm,termine[i].starttse);
		var appEndDate = new Date(termine[i].endy,termine[i].endm-1,termine[i].endd,termine[i].endts,termine[i].endtm,termine[i].endtse);
		appointments.push({
			title:termine[i].title,
			place:termine[i].place,
			start:appStartDate,
        	end:appEndDate
        });		
	}
}


function addAppointment(dt,tid) {
		
	for (var i = 0;i<appointments.length;i++) {
		var compDateS = new Date(appointments[i].start.getFullYear(),appointments[i].start.getMonth(),appointments[i].start.getDate());
		var compDateE = new Date(appointments[i].end.getFullYear(),appointments[i].end.getMonth(),appointments[i].end.getDate());
		if (compDateS<=dt && compDateE>=dt) {
			var $tid = $('#'+tid + ' .appointments');
			$tid.append("<div class='appointment'><span class='time'>"+ timeFormatter(compDateS, compDateE, dt, i) +"</span>" + appointments[i].title +  "</div>");
		}
	}		
}

String.prototype.formatTime = function() {
	return ("0" + this).slice(-2);
};

function timeFormatter(compDateS, compDateE, dt, appId) {

	if (+compDateS != +compDateE) {
		if (+dt === +compDateS) {
			var hours = ""+appointments[appId].start.getHours();
			var minutes = ""+appointments[appId].start.getMinutes();
			hours = hours.formatTime();
			minutes = minutes.formatTime();
			return  hours + ":" + minutes + " -";
		}
		else if (+dt === +compDateE) {
			var hours = ""+appointments[appId].end.getHours();
			var minutes = ""+appointments[appId].end.getMinutes();
			hours = hours.formatTime();
			minutes = minutes.formatTime();
			return  "- " + hours+":" + minutes;
		}
		else {
			return "ganztägig";
		}	
	}
	else {
		var hoursS = ""+appointments[appId].start.getHours();
		var minutesS = ""+appointments[appId].start.getMinutes();
		hoursS = hoursS.formatTime();
		minutesS = minutesS.formatTime();
		var hoursE = ""+appointments[appId].end.getHours();
		var minutesE = ""+appointments[appId].end.getMinutes();
		hoursE = hoursE.formatTime();
		minutesE = minutesE.formatTime();
		
		return  hoursS + ":" + minutesS + " - " + hoursE + ":" + minutesE;
	} 
}




