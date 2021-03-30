Webcam.set({
    width : 300,
    height : 300,
    image_format : 'png',
    png_quality : 900
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture" src="'+data_uri+'">';
    })
}

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cWWnpC0BJ/model.json',modelLoaded);

function modelLoaded()
{
    console.log("MODEL LOADED !");
}

function check()
{
    img = document.getElementById("capture");
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}