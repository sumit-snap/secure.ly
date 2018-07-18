// Start Point
function checkEmail(){
    var email = document.querySelector("#id_email").value;
    if (!email || email === ""){
        alert("Please enter some value");
        return;
    }

var queryURL = "http://localhost:3000/" + email ;

//fetching the data using API
fetch(queryURL)
    .then(function (response){
        //data is fetched 
        return response.json();      
    })
    .then(function (result) {
        //displaying the data
        displayEmailResult(result);
    })
    .catch(function (error){
        console.log(error.message);
    })
    
function displayEmailResult(result){
    //Model is hiding
    $('#myModal').modal('hide')
    var infodiv = document.querySelector("#info");
    var msgDiv = document.querySelector("#message");
    var div = document.querySelector("#result");
    infodiv.innerHTML = "";

    if(result.message) {
        // clearing the content of div
        div.innerHTML = "";
        //change the background color
        console.log(document.body.style.background = "#d6e9c6");
        //change the navbar color
        $(".navbar").css({"background-color":"#5eff61"});
        //change the box border color
        $(".box").css({"border":"5px solid #5eff61"});
        //change some text
        $("#result11").text("Your Account is not Hacked");
        $("#resultsolution11").text("Now Smile :)");
        $("#checker11").text("Click to check another Account");

        //if email is not hacked
        msgDiv.innerHTML = '<div class="alert alert-success alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>Good News!</strong> Your email address is Safe :) \
                            </div>';
    }
        //if email is hacked
    else{
        //change the background color
        console.log(document.body.style.background = "#ff7777");
        //change the navbar color
        $(".navbar").css({"background-color":"red"});
        //change the box border color
        $(".box").css({"border":"5px solid red"});
        $("#result11").text("Your Account is Hacked!!");
        //change some text
        $("#resultsolution11").text("Now what will you do :(");
        $("#checker11").text("Click to check another Account");
        msgDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>Hacked!!</strong> Your Account details has been leaked!!.. <strong id="thesolution">Change your password now </strong> . \
                            </div>'
                            
        // clearing the contents of div
        div.innerHTML = "";
        
        //counter 
        var i=0;
        // loop to show every breach
        result.forEach(function(currentResult){
            var hackedHTMLDiv = `<div class="jumbotron box2" id="id_${i}"> \
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-4">
                                            <strong><h5 id="breachdata">${currentResult.Title}: </strong><small id="breachinfo"><a target="_blank" href="${currentResult.Domain}">Website Name</h5>
                                            <strong><h5 id="breachdata">Breach Date: </strong><small id="breachinfo">${currentResult.BreachDate}</small></h5>
                                            <strong><h5 id="breachdata">Added: </strong><small id="breachinfo">${currentResult.AddedDate}</small></h5>
                                            <strong><h5 id="breachdata">Modified: </strong><small id="breachinfo">${currentResult.ModifiedDate}</small></h5>
                                        </div>
                                        <div class="col-xs-12 col-sm-8">
                                            <h5 id="websitename" class="btn btn-primary">${currentResult.Name}</h5></br></br>
                                            <p id="resultdescription">${currentResult.Description}</p>
                                        </div>
                                    </div>
                                </div>`;

            // adding the data in the result empty div
            $('#result').append(hackedHTMLDiv);

            currentResult.DataClasses.forEach(function(currentDataClass){
                //get and append to compromise data div
                $(`#data_id_${i}`).append(`<span class="label label-danger danger-label">${currentDataClass}</span>`);
            });

            // incrementing the container 
            i++;
        })
        console.log(result);
    }  
  }
}
// End
