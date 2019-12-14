tileattarray = [["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","",""]];
depth = 0;
timer = 0;
attacktimer = 0;
y = 4;
x = 4;
inventory = [];
relics = [0, 0, 0, 0, 0, 0, 0] //6
events = [0, 0]
effects = 0;
gold = 0;
health = 5;                    //todo: implement token of modes, an item gotten at the end of the ice cave that turns your relics to gold and activates mode 1, where all the enemies have more health and the map gets bigger
maxhealth = 5;
enemyhealth = 0;
battle = 0;
crafting = 0;
attackitem = 0;
equippeditem = 0;
walkek = [2000, 1000, 2500, 1500]; //default to 2000
start = 0;

tilepresets = ["grassy, flat plain.", "small grassy hill.", "rocky hillside.", "gurgling creek filled with stones.", "small wood.", "hot shrubland.", "sandy and arid desert.", "rocky beach.", "strange-looking rock formation.", "thick and dark forest.", "quaint little lemonade stand.", "vending machine.", "rather sad-looking snowman.", "frigid and snowy hill.", "hole leading into an ice cave.", "mystical ice cave.", "beautiful underground pond.", "mysterious chest.", "light at the end of the cave.", ".", "towering plateau.", "pond surrounded by trees.", "humid marsh.", "vast savannah.", "calm, flowing spring.", "primitive house.", "wavy and sandy shoreline.", "grass-spotted area.", "stretch of dirt.", "pine forest."]; //29, mode 0 ends at 9, mode 1 starts at 20

musicpresets = ["Plains", "Hills", "Hillside", "Creek", "Woodlands", "Shrublands", "Desert", "Beach", "Rock", "Forest", "Shop", "Shop2", "Snow", "Snow2", "Snow3", "Ice", "Ice2", "Exit", "Chest", "Void", "Plateau", "Pond", "Marshlands", "Savannah", "Spring", "Primal", "Shoreline", "Spotted", "Dirt", "Pine"]; // 29

narrpresets = ["You find yourself near a ", "You visit a ", "You walk to a ", ["You sit on the ", "You sit in the ", "You sit by the "], ["You wait in the ", "You wait on the ", "You wait by the "], ["You are on a ", "You are in a ", "You are by a "], "You see a "];

itempresets = [" Nothing", " Stone", " Stick", " Grass Clump", " Berries", " Desert Relic*", " Spear", " Hat", " Snakeskin", " Rope", " Mystery Relic*", " Fishing Rod", " String", " Fish", " Ocean Relic*", " Bow", " Arrow", " Feather", " Lemonade Glass", " Glass", " Soda Bottle", " Spectre Fish", " Ice Core", " Snowball", " Lantern", " Hide", " Cattail", " Seashell", " Water Glass", " Seashell Lace"]; //29, Seashell Lace is 29

relicpresets = [" Mystery Relic", " Desert Relic", " Ocean Relic", " Forest Relic", " Shrubland Relic", " Creek Relic", " Token of Modes"]; //6

document.addEventListener("keypress", settime);

function setup() {
	document.getElementById("location").innerHTML =  x + "," + y;
	tseed = Math.floor(Math.random() * 10);
	tileattarray[y][x] = tseed;
	document.getElementById("att").innerHTML = "You appear near a " + tilepresets[tileattarray[y][x]];
	document.getElementById("background").background = "images\\" + tilepresets[tileattarray[y][x]] + "jpeg";
	document.getElementById("inv").innerHTML = inventory;
	document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
	document.getElementById("stat-health").innerHTML = "Health: " + health;
	document.getElementById("stat-gold").innerHTML = "Gold: " + gold;
	document.getElementById("invtext").hidden = false;
	document.getElementById("equipped").hidden = false;
	document.getElementById("fbutton").hidden = false;
	document.getElementById("xbutton").hidden = false;
	document.getElementById("sbutton").hidden = false;
	document.getElementById("dbutton").hidden = false;
	document.getElementById("craftmenu").hidden = false;
	document.getElementById("stat-health").hidden = false;
	document.getElementById("stat-gold").hidden = false;
	document.addEventListener("keypress", keykektimer);
	start = 1;
};

function saveGame(){
	"use strict";
	var save = {
		inventory: inventory,
		x: x,
		y: y,
		tileattarray: tileattarray,
		depth: depth,
		walkek: walkek,
		gold: gold,
		health: health,
		relics: relics,
		events: events,
		timer: timer,
		attacktimer: attacktimer,
		maxhealth: maxhealth,
		battle: battle,
		enemyhealth: enemyhealth,
		crafting: crafting,
		attackitem: attackitem,
		effects: effects,
		equippeditem: equippeditem
	};
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGameOnStartup(){
	"use strict";
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.inventory !== "undefined") inventory = savegame.inventory;
	if (typeof savegame.tileattarray !== "undefined") tileattarray = savegame.tileattarray;
	if (typeof savegame.x !== "undefined") x = savegame.x;
	if (typeof savegame.y !== "undefined") y = savegame.y;
	document.getElementById("inv").innerHTML = inventory;
	document.getElementById("att").innerHTML = "You appear near a " + tilepresets[tileattarray[y][x]];
	document.getElementById("background").background = "images\\" + tilepresets[tileattarray[y][x]] + "jpeg";
	document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
	document.getElementById("location").innerHTML =  x + "," + y;
	if (typeof savegame.depth !== "undefined") depth = savegame.depth;
	if (typeof savegame.walkek !== "undefined") walkek = savegame.walkek;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.health !== "undefined") health = savegame.health;
	document.getElementById("stat-health").innerHTML = "Health: " + health;
	document.getElementById("stat-gold").innerHTML = "Gold: " + gold;
	if (typeof savegame.timer !== "undefined") timer = savegame.timer;
	if (typeof savegame.attacktimer !== "undefined") attacktimer = savegame.attacktimer;
	if (typeof savegame.maxhealth !== "undefined") maxhealth = savegame.maxhealth;
	if (typeof savegame.battle !== "undefined") battle = savegame.battle;
	if (typeof savegame.enemyhealth !== "undefined") enemyhealth = savegame.enemyhealth;
	if (typeof savegame.crafting !== "undefined") crafting = savegame.crafting;
	if (typeof savegame.attackitem !== "undefined") attackitem = savegame.attackitem;
	if (typeof savegame.equippeditem !== "undefined") equippeditem = savegame.equippeditem;
	if (typeof savegame.events !== "undefined") events = savegame.events;
	document.getElementById("equ").innerHTML = inventory[equippeditem];
	if (typeof savegame.effects !== "undefined") effects = savegame.effects;
	if (typeof savegame.relics !== "undefined") relics = savegame.relics;
	document.getElementById("invtext").hidden = false;
	document.getElementById("equipped").hidden = false;
	document.getElementById("fbutton").hidden = false;
	document.getElementById("xbutton").hidden = false;
	document.getElementById("sbutton").hidden = false;
	document.getElementById("dbutton").hidden = false;
	document.getElementById("craftmenu").hidden = false;
	document.getElementById("stat-health").hidden = false;
	document.getElementById("stat-gold").hidden = false;
	document.addEventListener("keypress", keykektimer);
	start = 1;
	if (battle != 0) attacktimer = setTimeout(attacked, 3000);
}

function settime() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (savegame != undefined) timer = setTimeout(loadGameOnStartup, 20);
	else timer = setTimeout(setup, 20);
	document.removeEventListener("keypress", settime);
};

function keykektimer() {
	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
	}
	if (event.key == "q" || event.key == "Q") {if (equippeditem > 0) equippeditem--;}
	else if (event.key == "e" || event.key == "E") {if (equippeditem < inventory.length - 1) equippeditem++;}
	if (event.key == "f" || event.key == "F") { // good god this is such a mess
		forage();
	}
	else if (event.key == " ") {
		if (inventory[equippeditem] == " Stone") attack(1);
		else if (inventory[equippeditem] == " Stick") attack(2);
		else if (inventory[equippeditem] == " Spear") attack(6);
		else if (inventory[equippeditem] == " Bow") attack(16);
		else if (inventory[equippeditem] == " Snowball") attack(23);
		else if (inventory[equippeditem] == " Berries" || inventory[equippeditem] == " Fish" || inventory[equippeditem] == " Lemonade Glass" || inventory[equippeditem] == " Soda Bottle" || inventory[equippeditem] == " Water Glass") eat(0);
		else if (inventory[equippeditem] == " Rope") eat(1);
		else if (inventory[equippeditem] == " Fishing Rod") eat(2);
		else if (inventory[equippeditem] == " Hat") eat(4);
		else if (inventory[equippeditem] == " Lantern") eat(5);
		else if (inventory[equippeditem] == " Ice Core") eat(6);
		else if (inventory[equippeditem] == " Glass") eat(7);
		else for (var i = 0; i < relicpresets.length; i++) {
			if (inventory[equippeditem] == relicpresets[i]) {
				eat(3);
			}
		}
	}
	else if (event.key == "C" || event.key == "c") {
		craftmenu();
	}
	else if (event.key == "h" || event.key == "H") {
		saveGame();
	}
	if (battle == 0 && (event.key == "W" || event.key == "w" || event.key == "A" || event.key == "a" || event.key == "S" || event.key == "s" || event.key == "D" || event.key == "d")) {
		window.fullkey = event.key;
		clearTimeout(timer);
		document.getElementById("att").innerHTML = "Walking...";
		if (relics[4] != 1) timer = setTimeout(keykek, walkek[0]);
		else timer = setTimeout(keykek, walkek[0]/4); // set to 2000
	}
	else if (battle != 0 && event.key == "W" || event.key == "w" || event.key == "A" || event.key == "a" || event.key == "S" || event.key == "s" || event.key == "D" || event.key == "d") {
		document.getElementById("att").innerHTML = "You can't escape!";
	};
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function keykek() {
    if (window.fullkey == "d" || window.fullkey == "D") direction(0);
    else if (window.fullkey == "a" || window.fullkey == "A") direction(1);
	else if (window.fullkey == "w" || window.fullkey == "W") direction(2);
	else if (window.fullkey == "s" || window.fullkey == "S") direction(3);
};

function direction(button) {
	if (depth == 0) {
		if (button == 0) {
			if (x < 9) x += 1;
			else if (x < 19 && events[1] == 1) x += 1;
		}
		else if (button == 1) {
			if (x > 0) x -= 1;
		}
		else if (button == 3) {
			if (y < 9) y += 1;
		}
		else if (button == 2) {
			if (y > 0) y -= 1;
		}
		document.getElementById("location").innerHTML = x + "," + y;
		tileatt();
	}
	else {
		fseed = Math.floor(Math.random() * 3); // set to 3?
		if (fseed == 0) {
			if (button == 0) {
				if (x < 9) {
					x += 1;
					tileatt();
				}
				else cave();
			}
			else if (button == 1) {
				if (x > 0) {
					x -= 1;
					tileatt();
				}
				else cave();
			}
			document.getElementById("location").innerHTML = x + "," + y;
		}
		else {
			if (button == 0) {
				document.getElementById("att").innerHTML = "You're getting attacked by an ice golem!";
				document.getElementById("inv").innerHTML = inventory;
				battle = 8;
				enemyhealth = 1;
				document.getElementById("music").src = "music\\" + "Attack3" + ".wav";
				clearTimeout(timer);
				attacktimer = setTimeout(attacked, 2000);
			}
			else if (button == 1) {
				if (x > 0) x -= 1;
				else cave();
				document.getElementById("location").innerHTML = x + "," + y;
				tileatt();
			}
		}
	}
	if (walkek[0] != 2000) walkek[0] += 250;
};

function tileatt() {
	if (depth == 0) {
		if (tileattarray[y][x] == "") {
			if (x == 1 && y == 8) tseed = 10;
			else if (x == 8 && y == 1) tseed = 11;
			else if (x == 1 && y == 1) tseed = 12;
			else if (x == 8 && y == 8) tseed = 13;
			else if (x == 14 && y == 4) tseed = 14;
			else if (x < 10) tseed = Math.floor(Math.random() * 10);
			else tseed = 20 + Math.floor(Math.random() * 10);
			tileattarray[y][x] = tseed;
		}
		narrative = narrpresets[Math.floor(Math.random() * 3)]
		document.getElementById("att").innerHTML = narrative + tilepresets[tileattarray[y][x]];
		document.getElementById("background").background = "images\\" + tilepresets[tileattarray[y][x]] + "jpeg";
		document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
	}
	else if (depth == 1) {
		if (tileattarray[y][x] == "") {
			if (x == 8 && y == 10) tseed = 17;
			else if (x == 9 && y == 10) tseed = 18;
			else tseed = Math.floor(15 + Math.random() * 2);
			tileattarray[y][x] = tseed;
		}
		if (x == 9 && y == 10) narrative = narrpresets[6]
		else narrative = narrpresets[Math.floor(Math.random() * 3)]
		document.getElementById("att").innerHTML = narrative + tilepresets[tileattarray[y][x]];
		document.getElementById("background").background = "images\\" + tilepresets[tileattarray[y][x]] + "jpeg";
		document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
	}
};

function forage() {
	if (battle == 0) {
		document.getElementById("att").innerHTML = "Foraging...";
		clearTimeout(timer);
		timer = setTimeout(find, walkek[1]);
	}
	else {
		document.getElementById("att").innerHTML = "You may not forage now, there are enemies nearby.";
		clearTimeout(timer);
	}
};

function find() {
	if (x == 4 && y == 4) fseed = Math.floor(Math.random() * 8);
	else fseed = Math.floor(Math.random() * 10);
	item = 0;
	
	if (tileattarray[y][x] == 0) { //plain items, 9/10
		if (fseed < 8) { //reverse symbols on these
			item = itempresets[3];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some grass.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) { // reverse symbols on these
			document.getElementById("att").innerHTML = "You're getting attacked by a prarie dog!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 1;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 1) { //hill items, 5/10
		if (fseed < 5) {
			item = itempresets[3];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some grass.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 2) { //hillside items, 7/10
		if (fseed < 7) {
			item = itempresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stone.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed == 9) {
			document.getElementById("att").innerHTML = "You're getting attacked by a golem!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 2;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 3) { //creek items, 5/10
		if (fseed < 5) {
			item = itempresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stone.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {
			document.getElementById("att").innerHTML = "You're getting attacked by a canary!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 6;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 4) { //wood, 5/10, 3/10
		if (fseed < 5) {
			item = itempresets[2];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stick.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed < 8) {
			item = itempresets[4];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some berries.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 5) { //shrubland items, 2/10
		if (fseed < 2) {
			item = itempresets[2];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stick.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {
			document.getElementById("att").innerHTML = "You're getting attacked by a quail!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 7;
			document.getElementById("music").src = "music\\" + "Attack2" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 6) { //desert items, 1/10
		if (fseed < 1) {
			item = relicpresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a relic!";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed == 9) {
			document.getElementById("att").innerHTML = "You're getting attacked by a snake!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 4;
			document.getElementById("music").src = "music\\" + "Attack2" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 7) { //beach items, 8/10
		if (fseed < 8) {
			item = itempresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stone.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 8) { //rock items, 0/10
		if (fseed < 0) {
			item = itempresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a relic!";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {
			document.getElementById("att").innerHTML = "You're getting attacked by a golem!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 2;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 9 || tileattarray[y][x] == 29) { //thicc forest and also pine forest items, 9/10
			if (fseed < 8) {
			item = itempresets[2];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stick.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {
			document.getElementById("att").innerHTML = "You're getting attacked by a treant!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 3;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 10) { //stand items, 9/10
		if (gold > 4) {
			gold = gold - 5;
			item = itempresets[18];
			inventory.push(item); 
			document.getElementById("stat-gold").innerHTML = "Gold: " + gold;
			document.getElementById("att").innerHTML = "You take a glass of lemonade and leave 5 coins.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You don't have enough gold to get anything.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	if (tileattarray[y][x] == 11) { //vending items, 9/10
		if (gold > 4) {
			gold = gold - 5;
			item = itempresets[20];
			inventory.push(item); 
			document.getElementById("stat-gold").innerHTML = "Gold: " + gold;
			document.getElementById("att").innerHTML = "The machine spits out a glass bottle with orange liquid inside.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You don't have enough gold to get anything.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}

	if (tileattarray[y][x] == 12 || tileattarray[y][x] == 13 || tileattarray[y][x] == 14) { //theres snothing to find here
		if (fseed < 7) {
			item = itempresets[23];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a snowball.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 15 || tileattarray[y][x] == 16 || tileattarray[y][x] == 18) { //there really is snothing to see here.
		if (fseed < 8) {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 17) { //chest items, 0/10
		if (!inventory.includes(" Token of Modes")) {
			item = relicpresets[6];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You pry open the chest, revealing the Token of Modes.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "The chest is empty.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 20) { //plateau items, 1/10
		if (fseed < 1) {
			item = itempresets[1];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stone.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {// these on symbols reverse
			document.getElementById("att").innerHTML = "You're getting attacked by a mountain lion!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 9;
			document.getElementById("music").src = "music\\" + "Attack4" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
			enemyhealth = 1;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 21) { //pond items, 3/10
		if (fseed < 3) {
			item = itempresets[2];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a stick.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 22) { //marsh items, 7/10
		if (fseed < 7) {
			item = itempresets[26];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a cattail.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {// these on symbols reverse
			document.getElementById("att").innerHTML = "You're getting attacked by an alligator!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 11;
			document.getElementById("music").src = "music\\" + "Attack4" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
			enemyhealth = 1;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 23) { //savannah items, 7/10
		if (fseed < 7) {
			item = itempresets[3];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some grass.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else if (fseed >= 8) {// these on symbols reverse
			document.getElementById("att").innerHTML = "You're getting attacked by a lion!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 9;
			document.getElementById("music").src = "music\\" + "Attack4" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
			enemyhealth = 1;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 24) { //spring items, 0/10
		if (fseed < 0) {
			item = itempresets[3];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some grass.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 25) { //house items, 0/10
		if (fseed >= 8) {// these on symbols reverse
			document.getElementById("att").innerHTML = "You're getting attacked by a pygmy!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 10;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
			enemyhealth = 1;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 26) { //shore items, 5/10
		if (fseed < 5) {
			item = itempresets[27];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found a seashell.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 27) { //patch items, 5/10
		if (fseed < 7) {
			item = itempresets[3];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You found some grass.";
			document.getElementById("inv").innerHTML = inventory;
		}
		else {
			document.getElementById("att").innerHTML = "You found nothing.";
			document.getElementById("inv").innerHTML = inventory;
		}
	}
	
	if (tileattarray[y][x] == 28) { //dirt items, 0/10
		document.getElementById("att").innerHTML = "You found nothing.";
		document.getElementById("inv").innerHTML = inventory;
	}
	
	if (relics[3] == 1 && item != 0 && item != relicpresets[6]) {
		inventory.push(item);
		document.getElementById("inv").innerHTML = inventory;
	}
	
	if (battle == 0) timer = setTimeout(reset, 2000)
};

function reset() {
	narrative = narrpresets[3 + Math.floor(Math.random() * 3)];
	if (tileattarray[y][x] < 3) document.getElementById("att").innerHTML = narrative[0] + tilepresets[tileattarray[y][x]];
	else if (tileattarray[y][x] > 10 || tileattarray[y][x] == 3 || tileattarray[y][x] == 9) document.getElementById("att").innerHTML = narrative[2] + tilepresets[tileattarray[y][x]];
	else document.getElementById("att").innerHTML = narrative[1] + tilepresets[tileattarray[y][x]]; //grammar is hard
};

function cave() {
	if (depth == 0) {
		depth = 1;
		x = 0
		y = 10
		tileatt();
	}
	else if (depth == 1 && x == 0) {
		depth = 0;
		x = 8
		y = 8
		tileatt();
	}
	else if (depth == 1 && x == 9) {
		if (events[1] == 1) {
			depth = 0;
			x = 14
			y = 4
			tileatt();
		}
		else {
			document.getElementById("att").innerHTML = "The light feels almost unreachable.";
			timer = setTimeout(reset, 4000)
		}
	}
	document.getElementById("location").innerHTML = x + "," + y;
};

function eat(use) {
	if (use == 0) {
		document.getElementById("att").innerHTML = "Eating...";
		clearTimeout(timer);
		timer = setTimeout(boost, 250);
	}
	if (use == 1) {
		if (tileattarray[y][x] == 2 || tileattarray[y][x] == 8 || tileattarray[y][x] == 14) {
			document.getElementById("att").innerHTML = "Climbing...";
			clearTimeout(timer);
			timer = setTimeout(rope, 750);
		}
	}
	if (use == 2) {
		if (inventory.includes(" Fishing Rod")) {
			if (tileattarray[y][x] == 3 || tileattarray[y][x] == 7 || tileattarray[y][x] == 16) {
				document.getElementById("att").innerHTML = "Fishing...";
				clearTimeout(timer);
				timer = setTimeout(fish, walkek[2]);
			}
			else {
				document.getElementById("att").innerHTML = "You can't fish here!";
				clearTimeout(timer);
				timer = setTimeout(reset, 2000);
			}
		}
		else {
			document.getElementById("att").innerHTML = "You don't have this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (use == 3) {
		for (var i = 0; i < relicpresets.length; i++) { 
		   if (inventory.includes(relicpresets[i]) && relics[i] == 0) {
				document.getElementById("att").innerHTML = "The relic is powering up...";
				clearTimeout(timer);
				timer = setTimeout(relic, 200);
			   	break;
		   }
			else if (inventory.includes(relicpresets[i])) {
				document.getElementById("att").innerHTML = "You've already used this relic!";
				clearTimeout(timer);
				timer = setTimeout(reset, 2000);
			}
			else {
				document.getElementById("att").innerHTML = "You don't have this!";
				clearTimeout(timer);
				timer = setTimeout(reset, 2000);
			}
		}
	}
	if (use == 4) {
		if (tileattarray[y][x] == 12) {
			document.getElementById("att").innerHTML = "Dressing...";
			clearTimeout(timer);
			timer = setTimeout(hat, 50);
		}
	}
	if (use == 5) {
		if (tileattarray[y][x] == 9) {
			document.getElementById("att").innerHTML = "Lighting...";
			clearTimeout(timer);
			timer = setTimeout(lantern, 50);
		}
	}
	if (use == 6) {
		if (inventory.includes(" Ice Core") && battle != 0) {
			document.getElementById("att").innerHTML = "Freezing...";
			clearTimeout(timer);
			timer = setTimeout(freeze, 50);
		}
		else if (inventory.includes(" Ice Core") && battle == 0) {
			document.getElementById("att").innerHTML = "The ice core feels so cold that it could freeze time itself.";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
		else {
			document.getElementById("att").innerHTML = "You don't have this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (use == 7) {
		if (tileattarray[y][x] == 24) {
			document.getElementById("att").innerHTML = "Filling...";
			clearTimeout(timer);
			timer = setTimeout(glass, 250);
		}
	}
};

function boost() {
	if (inventory[equippeditem] === " Berries") {
		inventory.splice(equippeditem, 1); 
		itemused = "berries";
	}
	else if (inventory[equippeditem] === " Fish") {
		inventory.splice(equippeditem, 1);
		itemused = "fish";
	}
	else if (inventory[equippeditem] === " Lemonade Glass") {
		inventory.splice(equippeditem, 1);
		itemused = "lemonade";
	}
	else if (inventory[equippeditem] === " Soda Bottle") {
		inventory.splice(equippeditem, 1);
		itemused = "soda";
	}
	else if (inventory[equippeditem] === " Water Glass") {
		inventory.splice(equippeditem, 1);
		itemused = "water";
	}
	if (itemused == "lemonade" || itemused == "soda") {
		inventory.push(itempresets[19])
		document.getElementById("att").innerHTML = "You get a boost of energy, and move faster.";
		walkek[0] = 250;
	}
	else document.getElementById("att").innerHTML = "You feel much better.";
	if (health < maxhealth) health++;
	document.getElementById("stat-health").innerHTML = "Health: " + health;
	document.getElementById("inv").innerHTML = inventory;
	timer = setTimeout(reset, 4000)
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function rope() {
	for( var i = 0; i < inventory.length; i++){ 
	   if (inventory[i] === " Rope") {
		 inventory.splice(i, 1); 
		   break;
	   }
	}
	if (tileattarray[y][x] == 2) {
		document.getElementById("att").innerHTML = "At the top of the hill awaits a golem!";
		document.getElementById("inv").innerHTML = inventory;
		battle = 2;
		enemyhealth = 2;
		document.getElementById("music").src = "music\\" + "Attack" + ".wav";
		clearTimeout(timer);
		attacktimer = setTimeout(attacked, 2000);
	}
	if (tileattarray[y][x] == 8) {
			item = relicpresets[0];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You notice a relic on top!";
			document.getElementById("inv").innerHTML = inventory;
			timer = setTimeout(reset, 2000)
	}
	if (tileattarray[y][x] == 14) {
		document.getElementById("att").innerHTML = "Going down...";
		setTimeout(cave, 4000)
		document.getElementById("inv").innerHTML = inventory;
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function fish() {
	aseed = Math.floor(Math.random() * 6);
	if (tileattarray[y][x] == 3) {
		if (aseed < 5) {
			item = itempresets[13];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You caught a fish!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else if (aseed == 5) {
			item = relicpresets[5];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You fished up a relic!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (tileattarray[y][x] == 7) {
		if (aseed == 4) {
			document.getElementById("att").innerHTML = "You fished up a killer whale!";
			document.getElementById("inv").innerHTML = inventory;
			battle = 5;
			document.getElementById("music").src = "music\\" + "Attack" + ".wav";
			clearTimeout(timer);
			attacktimer = setTimeout(attacked, 2000);
			enemyhealth = 2;
		}
		else if (aseed < 3 || relics[2] == 1) {
			item = itempresets[13];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You caught a fish!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (tileattarray[y][x] == 16) {
		if (aseed < 1) {
			item = itempresets[21];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You caught a spectre fish!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (tileattarray[y][x] == 21) {
		if (aseed < 2) {
			item = itempresets[13];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You caught a fish!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (tileattarray[y][x] == 24) {
		if (aseed < 0) {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (tileattarray[y][x] == 26) {
		if (aseed < 4 || relics[2] == 1) {
			item = itempresets[13];
			inventory.push(item); 
			document.getElementById("att").innerHTML = "You caught a fish!";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
		else {
			document.getElementById("att").innerHTML = "You caught nothing.";
			document.getElementById("inv").innerHTML = inventory;
			if (battle == 0) timer = setTimeout(reset, 2000)
		}
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};
	
function relic() {
	for( var i = 0; i < inventory.length; i++){
		if (inventory[i] === " Token of Modes" && relics[6] == 0) {
			inventory.splice(i, 1); 
			itemused = "Token of Modes";
			relics[6] = 1;
			break;
		}
		else if (inventory[i] === " Desert Relic" && relics[0] == 0) {
			inventory.splice(i, 1); 
			itemused = "Desert Relic";
			relics[0] = 1;
			break;
		}
		else if (inventory[i] === " Mystery Relic" && relics[1] == 0) {
			inventory.splice(i, 1); 
			itemused = "Mystery Relic";
			relics[1] = 1;
			break;
		}
		else if (inventory[i] === " Ocean Relic" && relics[2] == 0) {
			inventory.splice(i, 1); 
			itemused = "Ocean Relic";
			relics[2] = 1;
			break;
		}
		else if (inventory[i] === " Forest Relic" && relics[3] == 0) {
			inventory.splice(i, 1); 
			itemused = "Forest Relic";
			relics[3] = 1;
			break;
		}
		else if (inventory[i] === " Shrubland Relic" && relics[4] == 0) {
			inventory.splice(i, 1); 
			itemused = "Shrubland Relic";
			relics[4] = 1;
			break;
		}
		else if (inventory[i] === " Creek Relic" && relics[5] == 0) {
			inventory.splice(i, 1); 
			itemused = "Creek Relic";
			relics[5] = 1;
			break;
		}
	}
	if (itemused == "Desert Relic") {
		document.getElementById("att").innerHTML = "A keen sense is unleashed inside you. Attacks miss less often!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Mystery Relic") {
		maxhealth++;
		health = maxhealth;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "A powerful force is unleashed inside you. Your health has increased by 1!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Ocean Relic") {
		document.getElementById("att").innerHTML = "A waxing feeling washes over you. Fishing has a 100% outcome on beaches!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Forest Relic") {
		document.getElementById("att").innerHTML = "An insightful thought passes over you. Foraging now yields double items!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Shrubland Relic") {
		walkek[0] = 500
		document.getElementById("att").innerHTML = "An energetic mood burns inside you. You now walk faster!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Creek Relic") {
		walkek[2] = 1250
		document.getElementById("att").innerHTML = "An tranquil swell flows inside you. Fishing takes less time!";
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (itemused == "Token of Modes") {
		events[1] = 1;
		document.getElementById("att").innerHTML = "The token disappears into a shower of sparks and you feel the cave shake. Mode 1 has been activated!";
		timer = setTimeout(reset, 4000)
		document.getElementById("inv").innerHTML = inventory;
		document.getElementById("stat-gold").innerHTML = "Gold: " + gold; //man, i really wanted to turn relics to gold...
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function hat() {
	for( var i = 0; i < inventory.length; i++){ 
	   if (inventory[i] === " Hat") {
		 inventory.splice(i, 1); 
		   break;
	   }
	}
	if (tileattarray[y][x] == 12) {
		document.getElementById("att").innerHTML = "As you put the hat on the snowman, you hear a thundering crack in the distance.";
		document.getElementById("inv").innerHTML = inventory;
		tileattarray[8][8] = 14;
		events[0] = 1;
		timer = setTimeout(reset, 4000)
	}
	if (inventory[equippeditem] == undefined) equippeditem--;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function lantern() {
	if (tileattarray[y][x] == 9) {
		document.getElementById("att").innerHTML = "You notice something glimmering in the light. You got a Forest Relic!";
		item = relicpresets[3];
		inventory.push(item);
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function freeze() {
	for( var i = 0; i < inventory.length; i++){ 
		if (inventory[i] === " Ice Core") {
			inventory.splice(i, 1); 
			break;
		}
	}
	if (tileattarray[y][x] == 5) {
		document.getElementById("att").innerHTML = "The ice core melts in your hand, showing a Shrubland Relic inside!";
		battle = 0;
		clearTimeout(attacktimer);
		document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
		item = relicpresets[4];
		inventory.push(item);
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	else {
		document.getElementById("att").innerHTML = "Time has been frozen for 10 seconds!";
		document.getElementById("inv").innerHTML = inventory;
		clearTimeout(attacktimer);
		attacktimer = setTimeout(attacked, 11000);
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function glass() {
	if (tileattarray[y][x] == 24) {
		for( var i = 0; i < inventory.length; i++){ 
			if (inventory[i] === " Glass") {
				inventory.splice(i, 1); 
				break;
			}
		}
		document.getElementById("att").innerHTML = "You filled your glass with water.";
		item = itempresets[28];
		inventory.push(item);
		document.getElementById("inv").innerHTML = inventory;
		timer = setTimeout(reset, 4000)
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function attacked() {
	if (battle == 1) { //prarie dog
		health--;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 1 damage! Next hit in 4 seconds.";
		attacktimer = setTimeout(attacked, 4000);
	}
	if (battle == 2) { //golem
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 2 damage! Next hit in 8 seconds.";
		attacktimer = setTimeout(attacked, 8000);
	}
	if (battle == 3) { //treant
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 2 damage! Next hit in 6 seconds.";
		attacktimer = setTimeout(attacked, 6000);
	}
	if (battle == 4) { //snake
		health = health - 1;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 1 damage! Next hit in 3 seconds.";
		attacktimer = setTimeout(attacked, 3000);
	}
	if (battle == 5) { //orca
		health = health - 3;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 3 damage! Next hit in 6 seconds.";
		attacktimer = setTimeout(attacked, 6000);
	}
	if (battle == 6) { //can aray?
		health = health - 1;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 1 damage! Next hit in 3 seconds.";
		attacktimer = setTimeout(attacked, 3000);
	}
	if (battle == 7) { //quail
		health = health - 1;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 1 damage! Next hit in 5 seconds.";
		attacktimer = setTimeout(attacked, 5000);
	}
	if (battle == 8) { //oo scary ice man
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 2 damage! Next hit in 5 seconds.";
		attacktimer = setTimeout(attacked, 5000);
	}
	if (battle == 9) { //mountain lion
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 2 damage! Next hit in 5 seconds.";
		attacktimer = setTimeout(attacked, 5000);
	}
	if (battle == 10) { //pygmy
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 2 damage! Next hit in 4 seconds.";
		attacktimer = setTimeout(attacked, 4000);
	}
	if (battle == 11) { //alliglatotr
		health = health - 2;
		document.getElementById("stat-health").innerHTML = "Health: " + health;
		document.getElementById("att").innerHTML = "You were hit for 3 damage! Next hit in 5 seconds.";
		attacktimer = setTimeout(attacked, 5000);
	}
	if (health < 1) {
		document.getElementById("att").innerHTML = "You have died...";
		setTimeout(dead, 2000);
	};
};

function attack(use) {
	if (battle != 0) {
		if (inventory.includes(itempresets[use]) || use == 200) {
			if (use == 16 && inventory.includes(" Bow")) {
				attackitem = 16;
				document.getElementById("att").innerHTML = "Attacking...";
				clearTimeout(timer);
				timer = setTimeout(attacking, walkek[3]/3);
			}
			else if (use == 16 && !inventory.includes(" Bow")) {
				document.getElementById("att").innerHTML = "You don't have any arrows!";
				clearTimeout(timer);
				if (battle == 0) timer = setTimeout(reset, 2000);
			}
			else if (use == 200) {
				if (inventory.includes(" Arrow") && inventory.includes(" Bow")) attackitem = 16;
				else if (inventory.includes(" Spear")) attackitem = 6;
				else if (inventory.includes(" Stick")) attackitem = 2;
				else if (inventory.includes(" Stone")) attackitem = 1;
				if (inventory.includes(" Stick") || inventory.includes(" Stone") || inventory.includes(" Snowball") || inventory.includes(" Spear") || inventory.includes(" Arrow")) {
					document.getElementById("att").innerHTML = "Attacking...";
					clearTimeout(timer);
					if (attackitem == 16) timer = setTimeout(attacking, walkek[3]/3);
					else timer = setTimeout(attacking, walkek[3]);
				}
				else {
					document.getElementById("att").innerHTML = "You don't have anything to attack with!";
					clearTimeout(timer);
					if (battle == 0) timer = setTimeout(reset, 2000);
				}
			}
			else {
				attackitem = use;
				document.getElementById("att").innerHTML = "Attacking...";
				clearTimeout(timer);
				timer = setTimeout(attacking, walkek[3]);
			}
		}
		else {
			document.getElementById("att").innerHTML = "You don't have that!";
			clearTimeout(timer);
			if (battle == 0) timer = setTimeout(reset, 2000);
		}
	}
	else {
		document.getElementById("att").innerHTML = "There is nothing to attack!";
		clearTimeout(timer);
		if (battle == 0) timer = setTimeout(reset, 2000);
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function attacking() {
	for(var i = 0; i < inventory.length; i++){ 
		if (inventory[i] === itempresets[attackitem]) {
		 	inventory.splice(i, 1);
			if (attackitem == 1) itemused = "stone";
			if (attackitem == 2) itemused = "stick"; //atick lmao
			if (attackitem == 6) itemused = "spear";
			if (attackitem == 16) itemused = "arrow";
			if (attackitem == 23) itemused = "snowball";
			break;
		}
	}
	document.getElementById("inv").innerHTML = inventory;
	if (battle == 1 || battle == 4) misschance = 1;                 //i think im missing something...
	else if (battle == 2 || battle == 3 || battle == 8) misschance = 2;
	else if (battle == 6 || battle == 7) misschance = 3;
	else misschance = 0;
	aseed = Math.floor(Math.random() * (6 + misschance));
	if (aseed < 5 + (relics[0])) {
		if (enemyhealth == 0) {
			if (itemused == "stick" || itemused == "stone" || itemused == "snowball") {
				document.getElementById("att").innerHTML = "You threw a " + itemused + " at the enemy, making it flee!";
				battle = 0;
				clearTimeout(attacktimer);
				document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
			}
			else {
				if (battle == 1) {
					lootitem = "hide"
					item = itempresets[25];
					inventory.push(item); //doot table
				}
				if (battle == 2)  {
					lootitem = "stone"
					item = itempresets[1];
					inventory.push(item);
					gold++;
				}
				if (battle == 3)  {
					lootitem = "berries"
					item = itempresets[4];
					inventory.push(item); 
				}
				if (battle == 4)  {
					lootitem = "snakeskin"
					item = itempresets[8];
					inventory.push(item); 
				}
				if (battle == 5)  {
					lootitem = "an Ocean Relic"
					item = relicpresets[2];
					inventory.push(item); 
					gold++; gold++;
				}
				if (battle == 6)  {
					lootitem = "feathers"
					item = itempresets[17];
					inventory.push(item); 
				}
				if (battle == 7)  {
					lootitem = "feathers"
					item = itempresets[17];
					inventory.push(item); 
				}
				if (battle == 8)  {
					lootitem = "an ice core"
					item = itempresets[22];
					inventory.push(item);
					gold++;
					if (x < 9) x += 1;
				}
				if (battle == 9)  {
					lootitem = "hide"
					item = itempresets[25];
					inventory.push(item);
				}
				if (battle == 10)  {
					lootitem = "spear"
					item = itempresets[6];
					inventory.push(item);
				}
				if (battle == 11)  {
					lootitem = "stone"
					item = itempresets[1];
					inventory.push(item);
				}
				gold++;
				document.getElementById("stat-gold").innerHTML = "Gold: " + gold;
				if (inventory.includes(" Seashell Lace")) {
					specialtext = " Your lace heals you for 1 health.";
					health++
					document.getElementById("stat-health").innerHTML = "Health: " + health;
				}
				else specialtext = "";
				if (itemused == "arrow") document.getElementById("att").innerHTML = "You shot an " + itemused + " at the enemy, killing it and leaving behind " + lootitem + "!";
				else document.getElementById("att").innerHTML = "You threw a " + itemused + " at the enemy, killing it and leaving behind " + lootitem + "!" + specialtext;
				document.getElementById("inv").innerHTML = inventory;
				battle = 0;
				clearTimeout(attacktimer);
				document.getElementById("music").src = "music\\" + musicpresets[tileattarray[y][x]] + ".wav";
			}
		}
		else {
			document.getElementById("att").innerHTML = "The enemy sustained a blow from your " + itemused + ", but is now hurt.";
			enemyhealth--;
		}
	}
	else if (aseed > 4) {
		if (itemused == "arrow") document.getElementById("att").innerHTML = "You missed your " + itemused + " shot!";
		else document.getElementById("att").innerHTML = "You missed your " + itemused + " throw!";
	}
	if (inventory[equippeditem] == undefined) equippeditem = 0;
	if (inventory[equippeditem] == undefined) document.getElementById("equ").innerHTML = "";
	else document.getElementById("equ").innerHTML = inventory[equippeditem];
};

function resetgame() {
	localStorage.removeItem("save");
	document.location.reload()
};

function dead() {
	document.location.reload()
};

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

function craft(output) {
	if (output == 1) { // Spear
		if (inventory.includes(" Stick") && inventory.includes(" Stone")) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stone") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 6;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 2) { // Hat
		if (inventory.includes(" Grass Clump") && (inventory.includes(" Snakeskin") || inventory.includes(" Hide"))) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Grass Clump") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Snakeskin" || inventory[i] === " Hide" ) {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 7;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 3) { // Rope
		if (countInArray(inventory," String") >= 2) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 9;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 4) { // String
		if (countInArray(inventory," Grass Clump") >= 2) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Grass Clump") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Grass Clump") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 12;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 5) { // Bow
		if (countInArray(inventory," Stick") >= 2 && inventory.includes(" String")) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 11;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 6) { // Bow
		if (countInArray(inventory," Stick") >= 2 && countInArray(inventory," String") >= 2) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 15;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 7) { // Arrow
		if (inventory.includes(" Stick") && inventory.includes(" Stone") && inventory.includes(" Feather")) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stick") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Stone") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Feather") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 16;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 8) { // Lantern
		if (inventory.includes(" Glass") && inventory.includes(" Spectre Fish")) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Glass") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Spectre Fish") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 24;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 9) { // Grass c l u m p
		if (countInArray(inventory," Cattail") >= 2) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Cattail") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Cattail") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 3;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
	if (output == 10) { // Seashell Lace
		if (inventory.includes(" Seashell") && inventory.includes(" String")) {
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " Seashell") {
					inventory.splice(i, 1); 
					break;
				}
			}
			for( var i = 0; i < inventory.length; i++){ 
				if (inventory[i] === " String") {
					inventory.splice(i, 1); 
					break;
				}
			}
			document.getElementById("att").innerHTML = "Crafting...";
			crafting = 29;
			clearTimeout(timer);
			timer = setTimeout(product, 1000);
		}
		else {
			document.getElementById("att").innerHTML = "You can't craft this!";
			clearTimeout(timer);
			timer = setTimeout(reset, 2000);
		}
	}
};

function product() {
	item = itempresets[crafting];
	inventory.push(item);
	document.getElementById("att").innerHTML = "You have crafted:" + itempresets[crafting];
	document.getElementById("inv").innerHTML = inventory;
	crafting = 0;
	timer = setTimeout(reset, 4000)
};

//quarantine zone

function craftmenu() {
	document.getElementById("craftdr").classList.toggle("show");
}

window.onclick = function thingy(event) {
	if (!event.target.matches(document.getElementsByClassName("dropdown-content")) && !event.target.matches('dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function attackmenu() {
	event.key = " ";
	keykektimer();
}

function eatmenu() {
	if (inventory[equippeditem] == " Berries" || inventory[equippeditem] == " Fish" || inventory[equippeditem] == " Lemonade Glass" || inventory[equippeditem] == " Soda Bottle") eat(0);
	else if (inventory[equippeditem] == " Rope") eat(1);
	else if (inventory[equippeditem] == " Fishing Rod") eat(2);
	else if (inventory[equippeditem] == " Hat") eat(4);
	else if (inventory[equippeditem] == " Lantern") eat(5);
	else if (inventory[equippeditem] == " Ice Core") eat(6);
	else for (var i = 0; i < relicpresets.length; i++) {
		if (inventory[equippeditem] == relicpresets[i]) {
			eat(3);
		}
	}
}

//quarantine zone