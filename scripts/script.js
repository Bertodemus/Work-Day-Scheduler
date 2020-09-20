var timeZone = moment.tz.guess(true);
var time = new Date();
var timeZoneOffset = time.getTimezoneOffset();
var aaGlance = false;
var hourlyPlans = new Object ();
var buttClicked;


//App startup
//checking for current time and determining which background to apply to the time blocks
$("textarea").each(function() {
    var currentHour = parseInt(moment().format("H"));
    if (parseInt($(this).attr("id")) < currentHour) {
        $(this).removeClass("present future").addClass("past");
        this.setAttribute("placeholder", "");
        this.disabled = true;
    } else if (parseInt($(this).attr("id")) === currentHour){
        $(this).removeClass("past future").addClass("present");
        $("#collapse" + currentHour).addClass("show");
        $("#eye" + currentHour).removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
        buttClicked = "#eye" + currentHour;
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

$(".expand").click(eyes);

function eyes() {
    var eyeToPoke = $(this).data("slot");

    if (aaGlance === true) {
        $(".collapse").removeClass("show");
        $(".txtAuxEye").each(function() {
            $(this).removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
        });
        $("#eye"+eyeToPoke).removeClass("fa-eye-slash").addClass("fa-eye");
        aaGlance = false;
        buttClicked = "#eye" + eyeToPoke;
        return;
    } else if ($("#eye"+eyeToPoke).hasClass("fa-eye") === true) {
        $("#eye"+eyeToPoke).removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
        $("#eye"+eyeToPoke).removeClass("fa-eye-slash").addClass("fa-eye");
        $(buttClicked).removeClass("fa-eye").addClass("fa-eye-slash");
    }
    buttClicked = "#eye" + eyeToPoke;
}


//Clock Updating
$("#time").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + moment.tz.zone(timeZone).abbr(timeZoneOffset));

setInterval(function() {
    $("#time").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + " " + moment.tz.zone(timeZone).abbr(timeZoneOffset));
}, 1000);


//data handling
$(".btnSave").click(function (){
    var log = "log" + $(this).val();
    var hourQaulif = "#" + $(this).val();
    var blank = "";
    if ($("textarea"+hourQaulif).val() !== blank) {
    $("#clock"+$(this).val()).append("&nbsp;<i class='fas fa-comment-alt'></i>");
    hourlyPlans[log] = $("textarea"+hourQaulif).val();
    localStorage.setItem('hourlyPlans', JSON.stringify(hourlyPlans));
    }
});

$(".btnDel").click(function (){
    var log = "log" + $(this).val();
    // var hourQaulif = "#" + $(this).val();
    // var blank = "";
    // if ($("textarea"+hourQaulif).val() !== blank) {
    delete hourlyPlans[log];
    $("#clock"+$(this).val()).empty();
    localStorage.setItem('hourlyPlans', JSON.stringify(hourlyPlans));
    // }
});


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
    
    function filterLogs(accepted) {
        var result = {};
        for (var logged in hourlyPlans) {
            if (accepted.indexOf(logged) > -1) {
                result[logged] = hourlyPlans[logged];
            }
        }
        return result;
    }

    // $("textarea").each(function() {
        // var empty = "";
        // if (filterLogs(["log" + $(this).attr("id")])) {
        //     $("#clock"+$(this).attr("id")).append("&nbsp;<i class='fas fa-comment-alt'></i>");
            // $(this).text(hourlyPlans["log" + $(this).attr("id")]);
            // console.log(hourlyPlans["log" + $(this).attr("id")]);
        // }
    // });
    
    $("textarea").each(function() {
        if (hourlyPlans["log" + $(this).attr("id")]) {
            $("#clock"+$(this).attr("id")).append("&nbsp;<i class='fas fa-comment-alt'></i>");
            $(this).text(hourlyPlans["log" + $(this).attr("id")]);
            console.log(hourlyPlans["log" + $(this).attr("id")]);
        }
    });

}