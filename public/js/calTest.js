var appointments = [];
var termine = [];
$(document).ready(function() {
	//doIt();
});

function doIt() {
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
	$('#next').click(loadCalendarWithNext);
	$('#change').click(changeView);
	$('#today').click(function() {
		dateWithSelectedMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
		refresh();
	});

	Date.prototype.getWeek = function() {
		var d = new Date(this.getFullYear(),0,1);
		return Math.ceil((((this - d) / 86400000) + d.getDay()+1)/7);
	};

	loadMonthCalendar();

	function loadMonthCalendar() {
		var differenceForWeekday = dateWithSelectedMonth.getDay() || 7;
		$("#header").html(monate[dateWithSelectedMonth.getMonth()] + " " + dateWithSelectedMonth.getFullYear());
		for (var z = 1; z< differenceForWeekday; z++) {
			var tid = "cal-" + z;
			var $tid = $('#'+tid);
			var lastMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), z-differenceForWeekday+1);
			//addAppointment(lastMonthLastDay,tid);
			$tid.html("<span>" + lastMonthLastDay.getDate() + "</span>");
			setStyle($tid, "new",'cal-');
		}

		var currentMonthLastDay = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 0);

		for (z = differenceForWeekday; z<currentMonthLastDay.getDate()+differenceForWeekday; z++) {
			tid = "cal-" + z;
			$tid = $('#'+tid);
			curMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(), differenceForWeekday-z+1);
			var nexDay = z-differenceForWeekday+1;
			$tid.html("<span>" + (nexDay) + "</span>");
			addAppointment(new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth(),nexDay),tid);
			if (nexDay == curDate.getDate() && currentMonthLastDay.getMonth() == curDate.getMonth() && curMonth.getFullYear() == curDate.getFullYear()) setStyle($tid, "today");
			else setStyle($tid, "reset", 'cal-');
		}

		var nextMonth = new Date(dateWithSelectedMonth.getFullYear(), dateWithSelectedMonth.getMonth()+1, 1);

		while (z<=42) {
			tid = "cal-" + z;
			$tid = $('#'+tid);
			$tid.html("<span>" + (z-currentMonthLastDay.getDate()-differenceForWeekday+1) + "</span>");
			setStyle($tid, "new", 'cal-');
			z++;
		}

		//addAppointment();
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
			loadWeekCalendar();
		}
		else {
			$weekTable.fadeOut(300);
			$monthTable.fadeIn(300);
			currentView = 0;
			$("#changeText").html("Wochenansicht");
			loadMonthCalendar();
		}
	}

	function refresh() {
		if(!currentView) loadMonthCalendar();
		else loadWeekCalendar();
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

	$('nav').click(function() {
		$('#menu').toggleClass('activeMenu');
		$('#overlay').fadeToggle(250);
	});
	
}



function loadAppointments() {

	for (var i=0;i<termine.length;i++) {
		var appStartDate = new Date(termine[i].starty,termine[i].startm-1,termine[i].startd,termine[i].startts,termine[i].starttm,termine[i].starttse);
		var appEndDate = new Date(termine[i].endy,termine[i].endm-1,termine[i].endd,termine[i].endts,termine[i].endtm,termine[i].endtse);
		
		appointments.push({
			start:appStartDate,
        	end:appEndDate
        });		
	}
}


function addAppointment(dt,tid) {
		
	for (var i = 0;i<appointments.length;i++) {
		if ((appointments[i].start.getFullYear() == dt.getFullYear() && appointments[i].start.getMonth() == dt.getMonth() && appointments[i].start.getDate() == dt.getDate() ) ||  (appointments[i].end.getFullYear() == dt.getFullYear() && appointments[i].end.getMonth() == dt.getMonth() && appointments[i].end.getDate() == dt.getDate()) ) {
			var $tid = $('#'+tid);
			$tid.append("<div class='appointment'></div>");
		}
	}		
}

