//the event of mousedown would be the beginning
//whenever the mouse is released
//then run window.getSelection
//add a mousedown eventlistener the window

const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "pop-up");
mainDiv.style.position = "absolute";
mainDiv.style.opacity = "0";
mainDiv.style.width = "200px";
mainDiv.style.height = "fit-content";
mainDiv.style.backgroundColor = "cadetblue";
mainDiv.style.zIndex = "-1000";
mainDiv.style.paddingTop = "15px";
mainDiv.style.paddingLeft = "15px";
mainDiv.style.paddingRight = "15px";
mainDiv.style.borderRadius = "5px";
mainDiv.style.transition = "opacity .5s";
mainDiv.innerHTML = `
<div class="tz" id="pacific" style="color:black">
      <h3><img src='https://cdn-icons-png.flaticon.com/512/2311/2311489.png' style='margin-right: 10px' alt="some file"  height='20'
      width='20'/>Pacific</h3>
      
</div>
<div class="tz" id="mountain" style="color:black">

      <h3><img src='https://cdn-icons-png.flaticon.com/512/281/281517.png' style='margin-right: 10px' alt="some file"  height='20'
      width='20'/>Mountain</h3>
      
      
</div>
<div class="tz" id="central" style="color:black">
      <h3> <img src='https://cdn-icons-png.flaticon.com/512/1470/1470590.png' style='margin-right: 10px' alt="some file"  height='20'
      width='20'/>Central</h3>
	 
</div>
<div class="tz" id="eastern" style="color:black">
      <h3><img src='https://cdn-icons-png.flaticon.com/512/166/166032.png' style='margin-right: 10px' alt="some file"  height='20'
      width='20'/>Eastern</h3>
	  
</div>`;
document.body.prepend(mainDiv);

window.addEventListener("mouseup", (e) => {
	getTime(e);
});

let limit;

function getTime(e) {
	//capture user selection
	const selection = window.getSelection().toString();
	//only display pop-up if user selection is between 2-8 characters
	if (selection.length >= 2 && selection.length <= 8) {
		let hour;
		let minutes;
		if (limit !== undefined) {
			clearTimeout(limit);
		}

		//if selection has no colon
		if (selection.indexOf(":") === -1) {
			//if selection has no space and no colon
			if (selection.indexOf(" ") === -1) {
				//finding value of 1st letter in selection, will be either 'a', 'p', or not exist
				const letter = /[a-z]/i;
				const found = selection.match(letter);
				console.log(`found`, found[0]);
				hour = selection.slice(0, selection.indexOf(found[0]));
				//if selection has no colon but has a space
			} else {
				hour = selection.slice(0, selection.indexOf(" "));
			}
			//if has no colon and is in am
			if (selection.indexOf("p") === -1) {
				minutes = "00 am";
				//if has no colon and is in pm
			} else {
				minutes = "00 pm";
			}
			//has colon
		} else {
			hour = selection.slice(0, selection.indexOf(":"));
			minutes = selection.slice(selection.indexOf(":") + 1);
		}
		console.log(hour);
		console.log(minutes);
		//capture current time
		const date = new Date();
		const timeZones = ["pacific", "mountain", "central", "eastern"];
		//determines user's current time zone
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
			if (currentHour > 12) {
				currentHour -= 12;
			}
			// if true, swtich all a to p and ps to as
			// obj[zone] = currentHour;
			initialOffset++;
			const timeNode = document.createElement("p");
			timeNode.setAttribute("id", `p-${zone}`);
			timeNode.innerText = `${currentHour}:${currentMinutes}`;
			timeNode.style.color = "black";
			zoneDiv.appendChild(timeNode);
		});
		console.log(e);
		const xCoord = e.pageX;
		const yCoord = e.pageY;
		const popUp = document.getElementById("pop-up");
		popUp.style.top = yCoord + "px";
		popUp.style.left = xCoord + "px";
		popUp.style.opacity = ".9";
		popUp.style.zIndex = "1000";
		limit = setTimeout(() => {
			popUp.style.opacity = "0";
			popUp.style.zIndex = "-1000";
		}, 4000);
	}
}
