$(document).ready(function() {
	/*When the 'submit' button is clicked, it will first see if there were
	any numbers entered in the text box. To account for the possibility of
	extra spaces, it splits the submission based on spaces and joins it back
	 together. If no data was entered, it wiill exit the function. */
	$('#numGenerator').click(function() {
		var randomNumbers = [];
		var numOfNumbers = $('#randomNumber').val();
		for (j = 0; j < numOfNumbers; j++) {
			randomNumbers.push(Math.floor(Math.random() * 25000))
		}
		$("#numbers").val(randomNumbers)
	})
	$('#submit').click(function() {
		var numbers = document.getElementById("numbers").value;
		numbers = numbers.split(" ").join("");
		if (numbers === "") {
			printToPage("No numbers entered. Please enter numbers in the text box above.");
			return;
		}

		/* If data was entered, it will then validate the data by checking
		if any letters were entered or if an extra comma was entered. Depending
		on the situation, a message will appear to explain the issue. If there
		are no issues, each index will become a floating interger (in the case 
		that decimals are entered).*/
		var sortArray = numbers.split(",");
		for (j = 0; j < sortArray.length; j++) {
			if (sortArray[j] === "") {
				printToPage("You may have added an extra comma after " + sortArray[j - 1] + ". Please enter data in the correct format.");
				return;
			} else if (isNaN(sortArray[j])) {
				printToPage("Invalid input. Please enter numbers only.");
				return;
			} else {
				sortArray[j] = parseFloat(sortArray[j]);
			}
		}
		var arrayLength = (sortArray.length - 1);
		/* Once the input has been analyzed, the function to sort the numbers
		is called using the array created. It will choose the sorting function 
		based on if the radio button, each named after the respective function, 
		is selected or not.*/
		if ($("#bubbleSort").is(":checked")) {
			var bubbleArray = sortArray;
			getTime(bubbleSort, "bubbleTime", bubbleArray, arrayLength);
		} else if ($("#hoareSort").is(":checked")) {
			var hoareArray = sortArray;
			getTime(hoareSort, "hoareTime", hoareArray, arrayLength);
		} else if ($("#lomutoSort").is(":checked")) {
			var lomutoArray = sortArray;
			getTime(lomutoSort, "lomutoTime", lomutoArray, arrayLength);
		} else {
			printToPage("No sort selection made. Please choose a sort type.");
		}
	});

	function printToPage(msg) {
		if (document.getElementById("message") !== null) {
			document.getElementById("message").innerHTML = msg;
		} else {
			var message = "<p id=\"message\">" + msg + "<\p>";
			$("#result").append(message);
		}
	}
	function getTime(sortType, sortResultId, array, length){
		var timeArray = [];
		for (var j = 0; j <= 4; j++) {
			if(sortType == bubbleSort){
				var start = performance.now();
				sortType(array,length);
				var end = performance.now();
			}
			else{
				var start = performance.now();
				sortType(array, 0, length);
				var end = performance.now();
			}
			
			var time = (end - start)
			timeArray.push(time)
		}
		timeArray.sort();
		time = timeArray[3];
		if (document.getElementById(sortResultId) !== null) {
			document.getElementById(sortResultId).innerHTML = time;
		}
		else{
		var result = "<p class=\"time\">" + time + "<\p>"
		$("#" + sortResultId).append(time)
	}
	}
	/*The function takes its input as the pivot in an array and the number you are
	currently on. Instead of switching two numbers, it removes the current number
	from the array and inserts it before the pivot.*/
	function swap(array, num1, num2) {
		var temp = array[num1];
		array[num1] = array[num2];
		array[num2] = temp;
	}
	/**/
	function hoarePartition(array, low, high) {
		var pivot = array[low];
		var j = low - 1;
		var k = high + 1;
		while (true) {
			do {
				j = j + 1;
			}
			while (array[j] < pivot)
			do {
				k = k - 1;
			}
			while (array[k] > pivot)
			if (j >= k) {
				return k
			}
			swap(array, j, k)
		}
	}
	/*This function is how the pivot points for the quick sort are made. It goes
	through the current array of numbers, set by the low array index and high array
	index, sorts the numbers as necessary. It will return where the pivot stopped at,
	becomming the boundary for the next sort.*/
	function lomutoPartition(numbersArray, lowNum, highNum) {
		var pivot = numbersArray[highNum];
		var pivotIndex = lowNum;
		for (j = lowNum; j <= highNum - 1; j++) {
			if (numbersArray[j] <= pivot) {
				swap(numbersArray, pivotIndex, j);
				pivotIndex += 1;
			}
		}
		swap(numbersArray, pivotIndex, highNum)
		return pivotIndex;
	}
	/**/
	function hoareSort(numbersArray, lowNum, highNum) {
		if (lowNum < highNum) {
			var pivotPoint = hoarePartition(numbersArray, lowNum, highNum);
			hoareSort(numbersArray, lowNum, pivotPoint);
			hoareSort(numbersArray, pivotPoint + 1, highNum);
		}
		numbersArray = numbersArray.join(", ");
		printToPage("Ordered Results:\n" + numbersArray);
	}
	/*This recursive funciton identifies the new pivot point based on the boundary
	created in the previous funciton, 'pivotAray'. It will continue to run until
	the low array index is equal to the high array index. Once finished, it will
	print the ordered results to the page.*/
	function lomutoSort(numbersArray, lowNum, highNum) {
		if (lowNum < highNum) {
			var pivotPoint = lomutoPartition(numbersArray, lowNum, highNum);
			lomutoSort(numbersArray, lowNum, pivotPoint - 1);
			lomutoSort(numbersArray, pivotPoint + 1, highNum);
		}
		numbersArray = numbersArray.join(", ");
		printToPage("Ordered Results:\n" + numbersArray);
	}
	/* This function takes the array created from the user input to sort the
	numbers in numerical order. While the sort is running, it is counting the
	number of swaps made. If there were no swaps made, then it will exit the
	loop and print the results to the page.*/
	function bubbleSort(numbersArray, length) {
		var sort = true;
		while (sort) {
			var countSwaps = 0;
			for (var j = 0; j < length; j++) {
				if (numbersArray[j] > numbersArray[j + 1]) {
					swap(numbersArray, j, j + 1);
					countSwaps++;
				}
			}
			if (countSwaps === 0) {
				sort = false;
			}
			length -= 1;
		}
		numbersArray = numbersArray.join(", ");
		printToPage("Ordered Results:\n" + numbersArray);
	}
});