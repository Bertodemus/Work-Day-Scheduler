var timeZone = moment.tz.guess(true);
var time = new Date();
var timeZoneOffset = time.getTimezoneOffset();
var aaGlance = false;
var hourlyPlans = new Object ();
var log;

//for testing
// var currentHour = 10;
// console.log(parseInt(moment().format("H")));

// console.log(hourlyPlans);

//App startup
//checking for current time and determining which background to apply to the time blocks
$("textarea").each(function() {
    var currentHour = parseInt(moment().format("H"));
    // console.log(parseInt($(this).attr("id")));
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

    // var tareaValue = $("textarea"+hourQaulif).val();
    // console.log(tareaValue);

    // console.log(hourQaulif);
    // console.log(log);
    // hourlyPlans[log] = $("textarea"+hourQaulif).val();
    // console.log(hourlyPlans);


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
    console.log(hourlyPlans)

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
    console.log(filterTypes(["log" + $(this).attr("id")]));
        if (filterTypes(["log" + $(this).attr("id")]) !==  null) {
            $(this).text(hourlyPlans["log" + $(this).attr("id")]);
        }
    });
    

}














// SCRAP -----------------------------------------------------------------------------------------

//     if ($(this).attr("id") === "text" + item) {

//     }
// });

// function initView() {
//     if ($("textarea").attr("id") === "text" + 10) {
//         console.log($("textarea").attr("id"));
//     }
//      console.log($("textarea").attr("id"));
    // var currentHour = moment().format("H");
    // if (currentHour < 9 || currentHour > 17 ){

    // }
// }


// console.log($("#collapse"+9))
// $("#collapse"+9).addClass("show");
// $(".collapse").addClass("show");
// var hours = [9,10,11,12,13,14,15,16,17];
// console.log($("textarea").attr("id"));

// hours.forEach(initView);




// $(".headBtn").click(glanceEye);
    // function () {
    // if (!aaGlance) {
    //     $(".collapse").addClass("show");
    //     $(".txtAuxEye").each(function() {
    //         $(this).removeClass("fa-eye fa-eye-slash").addClass("fa-eye");
    //     });
    //     aaGlance = true;
    // } else {
    //     $(".collapse").removeClass("show");
    //     $(".txtAuxEye").each(function() {
    //         $(this).removeClass("fa-eye fa-eye-slash").addClass("fa-eye-slash");
    //     });
    //     aaGlance = false;
    // }
// });

    // $("textarea").each(function() {
        // hourlyPlans.some(function(log){ return log});
        // console.log(hourlyPlans.some(function(log){ return log}));



        // var logCheck = "log" + $(this).attr("id");
        // console.log(logCheck);
        // if (logCheck === hourlyPlans.filter(function (log){ return log.[logCheck]}))





        // $(this).text(function (plan){
        //     hourlyPlans.filter(function (log){ return })
        // });
    // });

    // var types = {
    //     'integer':   'int', 
    //     'character': 'char',
    //     'float':     'float',
    //     'double':    'double',
    //     'string':    'str', 
    //     'boolean':   'bool'
    // };
    
    // function filterPlans(accepted) {
    //     var result = {};
    //     for (var plans in hourlyPlans)
    //         if (accepted.indexOf(plans) > -1) 
    //             result[plans] = types[plans];
    //     return result;
    // }
    // console.log(hourlyPlans);
    // console.log(filterPlans(['log10']));
 
    // var types = hourlyPlans;