function Calendar(){
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.today = new Date().getDate();
    this.dayClickable = false;
    this.dayClickFunction = null;
    this.eventClickable = true;
    this.eventClickFunction = null;
    //this.format = "YYYY.M.D"

    this.getMonthName = function (month){
        var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    };


    this.calendarHead='<div class="month"><ul><li id="nav-prev" class="prev navigation" onclick="cal.onPrev();">&#10094;</li><li id="nav-nex" class="next navigation" onclick="cal.onNext();">&#10095;</li><li>'
        + this.getMonthName(this.month) +'<br>\
        <span style="font-size:18px">'+ this.year +'</span></li></ul></div><table class="table table-bordered"><thead>\
        <tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th>\
        <th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr></thead><tbody>';

    this.cal = "";

        
    this.getMonthLastDay = function (year, month){
        var lastDay, i;
        for(i = 27 ; i<=32; i++){
            
            if(new Date(year, month, i).getMonth() != month){return --i;}
        }
    };

    this.getPrevMonthLastDay = function(year, month){
        
        return this.getMonthLastDay(year, month-1);
    };

    this.getMonthDays = function(){
        
        var days = [], weekday, prevLast=0, i, d= new Date(), lastDay = this.getMonthLastDay(this.year, this.month);
        weekday= new Date(this.year, this.month, 1).getDay();
        
        
        if (weekday != 0) {
            prevLast = this.getPrevMonthLastDay(this.year, this.month)- weekday +2;
            
            for (i = 1; i < weekday; i++) {days.push(prevLast++);}
        }
        else{
            prevLast =this.getPrevMonthLastDay(this.year, this.month)-5;
            for (i = 0; i < 6; i++){days.push(prevLast++);}
        }
    
        for (i = 1; i <= lastDay; i++) {days.push(i);}

        if(days.length % 7 != 0 ){
            var c = 7 - days.length % 7;

            for(i=1; i <= c; i++){days.push(i); }
        }
        
        return days;
    };


    this.getToday =function(){
        var c = new Date();
        return [c.getDate(), c.getMonth(), c.getFullYear()];
    };

    this.checkEvents = function(year, month, day){
        var date = this.getDateStr(year, month, day), i, events = [];
        for(i=0; i<this.events.length; i++){
            if(date == this.events[i].date){
                events.push(this.events[i]);
            }
        }

        return events;
    };

    this.getDateStr = function (year, month, day) {
        
        return new Date(year, month-1, day+1).toISOString().split("T")[0]
    }

    this.getCalendar = function(){
        var t = "", row, i, j, days=this.getMonthDays(), today= this.getToday();
        for(i=0; i<=days.length; i += 7){
            row = days.slice(i, i+7);
            t += "<tr>";

            for(j=0; j<row.length; j++){
                var date = this.getDateStr(this.year, this.month + 1, row[j]);
                
                if(row[j] == today[0] && this.month == today[1] && this.year == today[2]){
                    var events = this.checkEvents(this.year, this.month +1, row[j]);
                    t += events.length ? "<td class='active'  ddate="+ date +"><p>"+row[j]+"</p> <span class='event-span' sdate="
                        + date +">"+events.length+" Event(s)</span></td>": "<td class='active'  ddate="+ date +"><p>"+row[j]+"</p></td>";
                }
                else{
                    if(i < 7 && row[j]>8){
                        var date = this.getDateStr(this.year, this.month, row[j]);
                        t += "<td class='prev-month' ddate="+ date +"><p>"+row[j]+"</p></td>";
                    }
                    else if(i >21 && row[j]<8){
                        var date = this.getDateStr(this.year, this.month + 2, row[j]);
                        var events = this.checkEvents(this.year, this.month +2, row[j]);
                        console.log(events)
                        t += events.length? "<td class='next-month' ddate="+ date +"><p>"+row[j]+"</p> <span class='event-span' sdate="
                        + date +">"+ events.length +" Event(s)</span></td>" : "<td class='next-month' ddate="+ date +"><p>"+row[j]+"</p></td>";
                    }
                    else {
                        var events = this.checkEvents(this.year, this.month +1, row[j]);
                        t += events.length? "<td ddate="+ date +"><p>"+row[j]+"</p> <span class='event-span' sdate="
                        + date +">"+ events.length +" Event(s)</span></td>" : "<td ddate="+ date +"><p>"+row[j]+"</p></td>";
                    }
                } 
            }
            t += "</tr>";
        }
        t +="</tbody></table></div>";
         return this.cal= this.calendarHead + t;
    };

    this.updateHeader= function(){
        this.calendarHead='<div class="month"><ul><li id="nav-prev" class="prev navigation" onclick="cal.onPrev();">&#10094;</li>\
        <li id="nav-nex" class="next navigation" onclick="cal.onNext();">&#10095;</li><li>'
        + this.getMonthName(this.month) +'<br>\
        <span style="font-size:18px">'+ this.year +'</span></li></ul></div><table class="table table-bordered"><thead>\
        <tr><th scope="col">Monday</th><th scope="col">Tuesday</th><th scope="col">Wednesday</th><th scope="col">Thursday</th>\
        <th scope="col">Friday</th><th scope="col">Saturday</th><th scope="col">Sunday</th></tr></thead><tbody>';
    };

    this.nextMonth = function(){
        this.month +=1;
        if(this.month>11){
            this.month = 0;
            this.year += 1;
        }
        this.updateHeader()

        return this.getCalendar();
    };

    this.prevMonth = function(){
        this.month -=1;
        if(this.month < 0){
            this.month =11;
            this.year -= 1;
        }
        this.updateHeader();

        return this.getCalendar();
    };
}


Calendar.prototype.calendar = function(argument){
    return this.getCalendar(); 
};

Calendar.prototype.checkEventsPro = function(year, month, day){
    return this.checkEvents(year, month, day);
};

Calendar.prototype.onNext = function(){
    document.getElementById("calendar").innerHTML=this.nextMonth();
    if(this.dayClickable){
        this.doDayClick(this.dayClickFunction);
    }
    if(this.eventClickable){
        this.doEventClickable(this.eventClickFunction);
    }
};

Calendar.prototype.onPrev = function(){
    
    document.getElementById("calendar").innerHTML=this.prevMonth();
    if(this.dayClickable){
        this.doDayClick(this.dayClickFunction);
    }
    if(this.eventClickable){
        this.doEventClickable(this.eventClickFunction);
    }
};

Calendar.prototype.addCalendarEvent = function(args){
    this.events.concat(args);
    return this.calendar();
};


Calendar.prototype.doDayClick = function(func){
    this.dayClickable = true;
    this.dayClickFunction = func;
    var i,  days = document.getElementsByTagName("td");
    for(i=0; i<days.length; i++){
                days[i].onclick = func;
    }
};

Calendar.prototype.doEventClickable = function(func){
    this.eventClickable = true;
    this.eventClickFunction =func;
    var i, events = document.getElementsByClassName("event-span");

    for (var i = events.length - 1; i >= 0; i--) {
        events[i].onclick = func;
    }
     
};

Calendar.prototype.updateEvents = function(newEvents){
    cal.events = cal.events.concat(newEvents)
    document.getElementById("calendar").innerHTML=this.getCalendar();
    if(this.dayClickable){
        this.doDayClick(this.dayClickFunction);
    }
    if(this.eventClickable){
        this.doEventClickable(this.eventClickFunction);
    }
};

Calendar.prototype.events=[
        /*****************************
        {
            "Event" : "Dinner",
            "date" : "2018-8-4"
        },
        {
            "Event" : "Appointment",
            "date" : "2018-8-4"
        },
        ******************************/
];