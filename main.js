//the event of mousedown would be the beginning
//whenever the mouse is released
//then run window.getSelection
//add a mousedown eventlistener the window

window.addEventListener("mouseup", () => {
	getTime();
});

function getTime() {
	const selection = window.getSelection().toString();
	const hour = selection.slice(0, selection.indexOf(":"));
	const minutes = selection.slice(selection.indexOf(":") + 1);
	const date = new Date();
	const timeZones = ["pacific", "mountain", "central", "eastern"];
	// const obj = {};
	const offset = date.getTimezoneOffset() / 60;

	console.log("hour is", hour);
	console.log("my offset is", date.getTimezoneOffset() / 60);

	let initialOffset = offset - 7;
	timeZones.forEach((zone) => {
		const zoneDiv = document.getElementById(zone);
		const oldTime = document.getElementById(`p-${zone}`);

		if (oldTime !== null) {
			oldTime.remove();
		}

		let currentHour;
		let currentMinutes;

		if (Number(hour) + initialOffset < 1) {
			currentHour = Number(hour) + initialOffset + 12;
			if (minutes.indexOf("a") === -1 && currentHour !== 12) {
				currentMinutes = minutes.replace("p", "a");
			} else {
				currentMinutes = minutes.replace("a", "p");
			}
		} else {
			currentHour = Number(hour) + initialOffset;
			currentMinutes = minutes;
		}
		// if true, swtich all a to p and ps to as
		// obj[zone] = currentHour;
		initialOffset++;
		const timeNode = document.createElement("p");
		timeNode.setAttribute("id", `p-${zone}`);
		timeNode.innerText = `${currentHour}:${currentMinutes}`;
		zoneDiv.appendChild(timeNode);
		console.log(minutes);
	});
	//let currentZone
	//4 === eastern   -3 -2 -1 0
	//5 === central   -2
	//6 === mountain  -1
	//7 === pacific    0
	console.log(obj);
}
