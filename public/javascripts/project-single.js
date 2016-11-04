'use strict';

$(document).ready(function () {

//Areas

// Amount of Superivision Required / Interaction Available
var value = $("#2").text();
if (value == "Little")
{
	$("#2").text("Very little supervision; student will need to work largely independently.");
}
else if (value == "Moderate")
{
	$("#2").text("Moderate amount of supervision and interaction with others.");
}
else if (value == "Large")
{
	$("#2").text("A great deal of supervision and interaction with others.");
}

//Supervision Provided By
var value = $("#3").text();
if (value == "Faculty")
{
	$("#3").text("Supervision primarily by faculty supervisor.");
}
else if (value == "Graduate")
{
	$("#3").text("Supervision primarily by graduate students.");
}
else if (value == "Combo")
{
	$("#3").text("Supervision primarily a combination of faculty and graduate students.");
}

//Nature of Work
var value = $("#4").text();
if (value == "ComputerRelated")
{
	$("#4").text("Nature of work is primarily theoretical, most work on paper/electronic medium.");
}
else if (value == "Theoretical")
{
	$("#4").text("Nature of work is primarily experimental, requiring hands-on work in a lab.");
}
else if (value == "Experimental")
{
	$("#4").text("Nature of work is primarily field based, requiring hands-on work in the field.");
}
else if (value == "FieldBased")
{
	$("#4").text("Nature of work is primarily computer-related, involving coding/analysis.");
}
else if (value == "Combo")
{
	$("#4").text("Nature of work is a combination of several types of work.");
}
else if (value == "Other")
{
	$("#4").hide();
}

//Amount of Prior Work
var value = $("#6").text();
if (value == "None")
{
	$("#6").text("No prior work; student will be starting from basic idea.");
}
else if (value == "Some")
{
	$("#6").text("Some prior work; student will build on work of others.");
}
else if (value == "Refine")
{
	$("#6").text("Well-established body of work; student will refine/improved upon efforts of others.");
}
else if (value == "Other")
{
	$("#6").hide();
}

});