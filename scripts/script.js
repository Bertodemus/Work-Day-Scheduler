var timeZone = moment.tz.guess(true);
var time = new Date();
var timeZoneOffset = time.getTimezoneOffset();
var aaGlance = false;
var hourlyPlans = new Object ();
var log;


//App startup
//checking for current time and determining which background to apply to the time blocks
$("textarea").each(function() {
    var currentHour = parseInt(moment().format("H"));
    if (parseInt($(this).attr("id")) < currentHour) {
        $(this).removeClass("present future").addClass("past");
        this.disabled = true;
    } else if (parseInt($(this).attr("id")) === currentHour){
        $(this).removeClass("past future").addClass("present");
        $("#collapse" + currentHour).addClass("show");
        $("#btn" + currentHour).html("<i class='fas fa-eye txtAuxEye'></i>");
    } else {
        $(this).removeClass("past present").addClass("future");
    }
});


//At a glance button functionality
$(".btnEye").click(glance);

function glance() {
    if (!aaGlance) {
        $(".collapse").addClass("show");
        $(".txtAuxEye").each(function() {
            $(this).removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
        });
        aaGlance = true;
    } else {
        $(".collapse").removeClass("show");
        $(".txtAuxEye").each(function() {
            $(this).removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
        });
        aaGlance = false;
    }
}


//Clock Updating
$("#time").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + moment.tz.zone(timeZone).abbr(timeZoneOffset));

setInterval(function() {
    $("#time").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + moment.tz.zone(timeZone).abbr(timeZoneOffset));
}, 1000);


//data handling
$(".btnSave").click(function (){
    log = "log" + $(this).val();
    var hourQaulif = "#" + $(this).val();
    hourlyPlans[log] = $("textarea"+hourQaulif).val();
    localStorage.setItem('hourlyPlans', JSON.stringify(hourlyPlans));
})


//planner presentation and data management
    // Function for initializing the "plans" data
    initPlans();

    // EventListener for clearing the locally stored plans
// clearScore.addEventListener("click", function(){
//     localStorage.clear();
//     scoreModalList.innerHTML = "";
// });



    // Initialization function
function initPlans() {
    var storedPlans = JSON.parse(localStorage.getItem("hourlyPlans"));
    
    if (storedPlans !== null) {
      hourlyPlans = storedPlans;
    }

    renderPlans();
}


  // Function for rendering the data to the planner
  function renderPlans() {
    
    function filterTypes(accepted) {
        var result = {};
        for (var logged in hourlyPlans)
            if (accepted.indexOf(logged) > -1) 
                result[logged] = hourlyPlans[logged];
        return result;
    }

    $("textarea").each(function() {
        if (filterTypes(["log" + $(this).attr("id")]) !==  null) {
            $(this).text(hourlyPlans["log" + $(this).attr("id")]);
        }
    });
    

}