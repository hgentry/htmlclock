var lightTheme = {
	hands: "#000088",
	second: "#880000",
	outline: "#000000",
	bg: "#ffffff",
	text: "#000000",
	settingsbg: "#cccccc",
}

var darkTheme = {
	hands: "#4dcad1",
	second: "#e2af73",
	outline: "#eeeeee",
	bg: "#333333",
	text: "#ffffff",
	settingsbg: "#444444",
}

var theme = document.getElementById("dark").checked ? darkTheme : lightTheme;


var clockInterval = setInterval(drawClock, 1000);
var canvas = document.getElementById("clock");
	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;

	ctx.translate(radius, radius);
	radius *= 0.95;
	

	
function drawClock() {
	ctx.fillStyle = theme.bg;
	ctx.fillRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
	var border = document.getElementById("border").checked;
	var date = document.getElementById("date").checked;
	applyTheme();
	if(border){drawBorder();}
	drawTicks();
	drawHands();
	drawDate();
}

function applyTheme() {
	document.getElementById("body").style.backgroundColor = theme.bg;
	document.getElementById("body").style.color = theme.text;
	if(mousein) {
		document.getElementById("settings").style.backgroundColor = theme.settingsbg;
	} else {
		document.getElementById("settings").style.backgroundColor = theme.bg;
	}
}

function drawBorder() {
	ctx.strokeStyle=theme.outline;
	ctx.fillStyle=theme.outline;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, radius*0.98, 0, 2*Math.PI);
	ctx.stroke();
}

function drawTicks() {
	var hourTicks = document.getElementById("hours").checked;
	var minuteTicks = document.getElementById("minutes").checked;
	ctx.strokeStyle=theme.outline;
	ctx.fillStyle=theme.outline;
	for(var i = 0; i < 60; i++)
	{
		var startPos = 0.88;
		if(i % 5 == 0) {
			ctx.lineWidth = 4;
			startPos = 0.86;
			if(!hourTicks) {
				continue;
			}
		} else {
			ctx.lineWidth = 2;
			if(!minuteTicks) {
				continue;
			}
		}
		
		ctx.beginPath();
		var x1 = 1;
		var x2 = 1;
		var y1 = 1;
		var y2 = 1;
		var angle = i*Math.PI/30;
		
		x1 = radius*startPos * Math.cos(angle);
		x2 = radius*0.95 * Math.cos(angle);
		y1 = radius*startPos * Math.sin(angle);
		y2 = radius*0.95 * Math.sin(angle);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

function drawHands() {
		var date = new Date();
		var hour = date.getHours() % 12;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		var hourPos = hour + minute/60 + second/3600;
		var minutePos = minute + second/60;
		var secondPos = second;
		
		var smooth = document.getElementById("smooth").checked;
		if(smooth) {
				var ms = date.getMilliseconds();
				hourPos += ms/3600000;
				minutePos += ms/60000;
				secondPos += ms/1000;
		}
		
		ctx.strokeStyle=theme.hands;
		ctx.fillStyle=theme.hands;
		
		//Center orb
		ctx.beginPath();
		ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
		ctx.fill();
		//Hour
		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.moveTo(0,0);
		var angle = (hourPos - 3) * Math.PI/6;
		console.log(hourPos);
		var x2 = radius*0.6 * Math.cos(angle);
		var y2 = radius*0.6 * Math.sin(angle);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		
		//Minute
		ctx.beginPath();
		ctx.lineWidth = 6;
		ctx.moveTo(0,0);
		var angle = (minutePos - 15) * Math.PI/30;
		console.log(minutePos);
		var x2 = radius*0.9 * Math.cos(angle);
		var y2 = radius*0.9 * Math.sin(angle);
		ctx.lineTo(x2, y2);
		ctx.stroke();
		
		//Second
		var seconds = document.getElementById("seconds").checked;
		ctx.beginPath();
		ctx.strokeStyle=theme.second;
		ctx.fillStyle=theme.second;
		ctx.lineWidth = 1;
		ctx.moveTo(0,0);
		var angle = (secondPos - 15) * Math.PI/30;
		var x2 = radius*0.95 * Math.cos(angle);
		var y2 = radius*0.95 * Math.sin(angle);
		ctx.lineTo(x2, y2);
		if(seconds){ctx.stroke();}
}

function drawDate() {
		var datecheck = document.getElementById("date").checked;
		var datebox = document.getElementById("datetext");
		var date = new Date();
		var murica = document.getElementById("murica").checked;
		var str = "";
		if(murica) {
			str = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() + 1900);
		} else {
			str = date.getDate() + "/" + (date.getMonth() + 1)  + "/" + (date.getYear() + 1900);
		}
		if(datecheck){datebox.innerHTML = str;} else {
				datebox.innerHTML = "";
		}
}

var mousein = false;
function visibleSettings() {
	document.getElementById('settings').style.display = "block";
	document.getElementById('settings').style.backgroundColor=theme.settingsbg;
	mousein = true;
	applyTheme();
}

function invisibleSettings() {
	document.getElementById('settings').style.display = "none";
	mousein = false;
	applyTheme();
}

function clickSettings() {
	drawClock();
	theme = document.getElementById("dark").checked ? darkTheme : lightTheme;
	var smooth = document.getElementById("smooth").checked;
	if(smooth) {
		clearInterval(clockInterval);
		clockInterval = setInterval(drawClock, 20);
	} else {
		clearInterval(clockInterval);
		clockInterval = setInterval(drawClock, 1000);
	}
}

clickSettings();
applyTheme();
drawClock();












