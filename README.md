# Event-Calendar
HTML Calendar

Attention: Bootstrap and JQuery requied.

Body:

	<body>
		<div id='calendar'></div>
		<div class="modal fade" id="rlist" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Event List</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body" style="padding: 1rem 1rem 0 1rem;">
		    
		      </div>
		      <div class="modal-footer" style="    padding: 0 1rem 1rem 1rem; border:0;">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <!--<button type="button" class="btn btn-primary">Save changes</button>-->
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="rform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Event Form</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body" style="padding: 1rem 1rem 5px 1rem;">
		        
		      </div>
		    </div>
		  </div>
		</div>
		<script type="text/javascript" src="calendar.js"></script>
		<script type="text/javascript">

			var e =JSON.parse('[{"event":"Dinner", "date":"2019-01-04"}, {"event":"Appointment", "date":"2019-02-01"}]');
			
			var cal = new Calendar();
			document.getElementById("calendar").innerHTML= cal.calendar();
			
			cal.updateEvents(e);
			

			cal.doDayClick(dayClick);
			cal.doEventClickable(eventClick);

			function dayClick (event) {
				if(event.target.tagName.toLowerCase()=="span"){
					return;
				}
				var m = $("#rform");
				m.find("#id_date").val($(this).attr("ddate"));
				m.modal("show");
			}
			function eventClick (argument) {
				var m = $("#rlist");
				var x, t="", sdate = $(this).attr('sdate').split("-"); 
				x= cal.checkEventsPro(parseInt(sdate[0]), parseInt(sdate[1]), parseInt(sdate[2]));
				console.log(x)
				for (var i = x.length - 1; i >= 0; i--) {
					t +="<div>"
					t += "<p>Event:</p>";
					t += "<p>"+x[i].event+"</p></div><hr>";
				}
				m.find(".modal-body").html(t);
				m.modal('show');
			}

		</script>
	</body>
