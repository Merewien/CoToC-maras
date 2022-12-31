"use strict";

var dataProOtazky = [];
var pouziteSady = [];

function nactiDataZJsonSouboru() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			dataProOtazky = JSON.parse(this.responseText);
			vyber();
		}
	};
	xmlhttp.open("GET", "otazky.json", true);
	xmlhttp.send();
};

function vyberNepouzityIdentifikatorSady(data) {
	let celkovyPocetSad = data.length;
	let vybranyIdentifikatorSady = -1;
	while (vybranyIdentifikatorSady == -1 || pouziteSady.indexOf(vybranyIdentifikatorSady) > -1) {
		vybranyIdentifikatorSady = Math.floor(Math.random() * celkovyPocetSad);
	}
	return vybranyIdentifikatorSady;
};

function zresetujStylOtazek() {
    document.getElementById("cislo-1").classList.remove("posun_jednoradky");
	document.getElementById("otazka-1").classList.remove("posun_jednoradky");
    document.getElementById("cislo-2").classList.remove("posun_jednoradky");
	document.getElementById("otazka-2").classList.remove("posun_jednoradky");
    document.getElementById("cislo-3").classList.remove("posun_jednoradky");
	document.getElementById("otazka-3").classList.remove("posun_jednoradky");
}

function zobrazOtazku(odrazka, element, text) {
	document.getElementById(element).innerHTML = text;
	if (text.length < 28) {
        document.getElementById(odrazka).classList.add("posun_jednoradky");
		document.getElementById(element).classList.add("posun_jednoradky");
	}
}

function spust() {
	if (typeof dataProOtazky === 'undefined' || dataProOtazky.length == 0) {
		nactiDataZJsonSouboru();
	} else {
		vyber();
	}
};

function vyber() {
	let celkovyPocetSad = dataProOtazky.length;
	let pouzityPocetSad = pouziteSady.length;
	zresetujStylOtazek();
	if (pouzityPocetSad >= celkovyPocetSad) {
		let vsePouzitoText = "Všechny karty už byly použity.";
		document.getElementById("otazka-1").innerHTML = vsePouzitoText;
		document.getElementById("otazka-2").innerHTML = vsePouzitoText;
		document.getElementById("otazka-3").innerHTML = vsePouzitoText;
		document.getElementById("tlacitko").disabled = true;
	} else {
		let vybranyIdentifikatorSady = vyberNepouzityIdentifikatorSady(dataProOtazky);
		pouziteSady.push(vybranyIdentifikatorSady);
		let vybranaOtazka = dataProOtazky[vybranyIdentifikatorSady].otazky[1].text;
		document.getElementById("hodn1").innerHTML = pouziteSady;
		document.getElementById("hodn2").innerHTML = vybranyIdentifikatorSady;
		document.getElementById("hodn3").innerHTML = vybranaOtazka;
		zobrazOtazku("cislo-1", "otazka-1", dataProOtazky[vybranyIdentifikatorSady].otazky[0].text);
		zobrazOtazku("cislo-2", "otazka-2", dataProOtazky[vybranyIdentifikatorSady].otazky[1].text);
		zobrazOtazku("cislo-3", "otazka-3", dataProOtazky[vybranyIdentifikatorSady].otazky[2].text);
	}
};        