// Luodaan muuttujia
let city = "";
let empty = "Syötä kaupunki.";
let degrees = "";
let condition = "";
let description = "";

function startData() {
    // Piilotetaan recommendation-kenttä, jossa on ikoni ja viedään kohdistin hakukenttään valmiiksi
    document.getElementById("recommendation").style.display = "none";
    document.getElementById("city").focus();
}

// Funktio sään hakemiselle rajapinnasta
function get_weather(){
    // Luetaan muuttujaan käyttäjän syöttämä paikkakunta sekä tyhjennetään kenttä
    city = document.getElementById("city").value;
    document.getElementById("city").value = "";

    // Laitetaan kenttään syötetty paikkakunta isolla alkukirjaimella
    document.getElementById("enteredCity").innerHTML = "Sää, " + city.charAt(0).toUpperCase() + city.slice(1);

    // Laitetaan muuttujaan rajapinnan osoite ja parametrit
    let url = "http://api.openweathermap.org/data/2.5/find?q=" + city + "&units=metric&appid=6f2ca9083c4737d305a583ac6b71d6eb&lang=fi";

    // Luetaan rajapinnasta asteet ja sään kuvaus sekä tutkitaan, onko syötettyä paikkaa olemassa
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if(this.readyState === 4 && this.status === 200){
        let weather = JSON.parse(this.response);
        if (weather.count == 0) {
            document.getElementById("recommendation").style.display = "none";
            document.getElementById("enteredCity").style.fontSize = "18px";
            document.getElementById("enteredCity").innerHTML = "Syötettyä paikkakuntaa ei löydy.";
            document.getElementById("city").focus();
            return;
        }

        // Tulostetaan rajapinnan palauttamat arvot näytölle
        degrees = weather.list[0].main.temp;
        document.getElementById("degrees").innerHTML = weather.list[0].main.temp + " °C";
        description = weather.list[0].weather[0].description;
        document.getElementById("description").innerHTML = description.charAt(0).toUpperCase() + description.slice(1) + ".";

        // Kutsutaan luokittelu-funktiota
        classification();
        }
    };

    xhttp.open("GET", url, true);

    xhttp.send();
}    

// Funktio Hae-painikkeelle
function searchWeather () {
    
    // Tyhjennetään kentät
    document.getElementById("description").innerHTML = "";
    document.getElementById("whatToDo").innerHTML = "";
    document.getElementById("degrees").innerHTML = "";

    // Tutkitaan, onko paikkaa syötetty
    if (document.getElementById("city").value == "") {
        document.getElementById("description").innerHTML = "";
        document.getElementById("whatToDo").innerHTML = "";
        document.getElementById("enteredCity").innerHTML = empty;
        document.getElementById("enteredCity").style.fontSize = "18px"
        document.getElementById("city").focus();
        document.getElementById("recommendation").style.display = "none";
        document.getElementById("degrees").innerHTML = "";
        return;
    } else {
        get_weather();
        document.getElementById("recommendation").style.display = "block";
        document.getElementById("enteredCity").style.fontSize = "28px"
        document.getElementById("city").focus();
    }

}

// Funktio, jossa tulostetaan käyttäjälle viesti lämpötilan mukaisesti
function classification() {

     if (degrees >= 25) {
        document.getElementById("whatToDo").innerHTML = "Huh mikä helle! Muista nesteytys ja hattu päähän.";
     } else if (degrees >= 20 && degrees < 25) {
        document.getElementById("whatToDo").innerHTML = "Keli on lämmin. Olisiko rantapäivä tänään?";
     } else if (degrees >= 15 && degrees < 20) {
        document.getElementById("whatToDo").innerHTML = "Ei mikään rantakeli ehkä tänään. Ulkoilu silti kannattaa.";
     } else if (degrees >= 5 && degrees < 15) {
        document.getElementById("whatToDo").innerHTML = "Viileämpi sää tänään. Mainio päivä esimerkiksi shoppailemiselle.";
     } else if (degrees > -5 && degrees < 5) {
        document.getElementById("whatToDo").innerHTML = "Sää on tänään kolea. Muista pukeutua lämpimämmin.";
     } else if (degrees <= -5 && degrees > -15) {
        document.getElementById("whatToDo").innerHTML = "Mainio ulkoilukeli tänään! Pitäisikö mennä luistelemaan tai hiihtämään?";
     } else if (degrees <= -15) {
        document.getElementById("whatToDo").innerHTML = "Kovat pakkaslukemat tänään. Jos aiot ulkoilla, muista kerrospukeutua.";
     }    
}