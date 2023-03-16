//creating and styling main pop-up div
const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "pop-up");
mainDiv.style.position = "absolute";
mainDiv.style.opacity = "0";
mainDiv.style.width = "200px";
mainDiv.style.height = "fit-content";
mainDiv.style.backgroundColor = "cadetblue";
mainDiv.style.zIndex = "-1000";
mainDiv.style.padding = "15px";
mainDiv.style.borderRadius = "5px";
mainDiv.style.transition = "opacity .5s";
//setting inner HTML of pop-up, including header for each time zone
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

//add pop-up to body with opacity of 0 and z-index of -1000
document.body.prepend(mainDiv);

//function will trigger on mouseup event
window.addEventListener("mouseup", (e) => {
	getTime(e);
});

window.addEventListener("mousedown", () => {
	mainDiv.style.opacity = "0";
	mainDiv.style.zIndex = "-1000";
});

//globally accessible setTimeout ID
let limit;

function getTime(e) {
	//capture user selection
	const selection = window.getSelection().toString();
	//only display pop-up if user selection is between 2-8 characters
	if (selection.length >= 2 && selection.length <= 8) {
		let hour;
		let minutes;
		//if there is already a setTimeout in callback queue, delete it
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
		minutes = minutes.toLowerCase();
		//capture current time
		const date = new Date();
		const timeZones = ["pacific", "mountain", "central", "eastern"];
		//determines user's current time zone from UTC in hours
		const offset = date.getTimezoneOffset() / 60;
		let initialOffset = offset - 7;
		//loop through all zones, adding offset bases on current time zone
		timeZones.forEach((zone) => {
			const zoneDiv = document.getElementById(zone);
			const oldTime = document.getElementById(`p-${zone}`);
			//removes old time if it exists
			if (oldTime !== null) {
				oldTime.remove();
			}
			let currentHour;
			let currentMinutes;
			//logic for converting am to pm
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
			//logic for converting military time to 12-hr time
			if (currentHour > 12) {
				currentHour -= 12;
			}
			initialOffset++;
			//creating new p elementing and adding to pop-up
			const timeNode = document.createElement("p");
			timeNode.setAttribute("id", `p-${zone}`);
			timeNode.innerText = `${currentHour}:${currentMinutes}`;
			timeNode.style.color = "black";
			zoneDiv.appendChild(timeNode);
		});
		//captures current position of mouse at time of mouse-up event
		const xCoord = e.pageX;
		const yCoord = e.pageY;
		const popUp = document.getElementById("pop-up");
		//changes position of pop-up to current position of mouse
		popUp.style.top = yCoord + "px";
		popUp.style.left = xCoord + "px";
		//makes pop-up visible and brings it to the front of the document
		popUp.style.opacity = ".9";
		popUp.style.zIndex = "1000";
		//hides pop-up after 4 seconds
		limit = setTimeout(() => {
			popUp.style.opacity = "0";
			popUp.style.zIndex = "-1000";
		}, 4000);
	}
}
