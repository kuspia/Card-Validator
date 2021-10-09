function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function fn() {
  var popup = document.getElementById("fnn");
  popup.classList.toggle("show");
}

function checkLuhn(input) { // returns 0 or 1 , 1 means luhn satisfied else 0
	var sum = 0;
	var numdigits = input.length;
	var parity = numdigits % 2;
	for(var i=0; i < numdigits; i++) {
		var digit = parseInt(input.charAt(i))
		if(i % 2 == parity) digit *= 2;
		if(digit > 9) digit -= 9;
		sum += digit;
	}
	return (sum % 10) == 0;
};
function detectCard(input) {
	var typeTest = 'undefined',
		ltest1 = 16,
		ltest2 = 16;
	if(/^4/.test(input)){
		typeTest = 'visa';
		ltest1 = 13;
	} else if (/^5[1-5]/.test(input)){
		typeTest = 'mastercard';
	} else if (/^3[4-7]/.test(input)){
		typeTest = 'amex';
		ltest1 = 15;
    ltest2 = 15;
  } else if(/^6(011|4[4-9]|5)/.test(input)){
		typeTest = 'discover';
	}
	return [typeTest,ltest1,ltest2];
}


$('input.cc').keydown(function(){ // as soon as key is up this will execute
	var val = this.value, // var will contain value in the box field
      val = val.replace(/[^0-9]/g, ''), // replace all non numeric charactyer with nothing
		detected = detectCard(val),
		errorClass = '',
    	luhnCheck = checkLuhn(val), // 1 - valid  0 - not valid
		valueCheck = (val.length == detected[1] || val.length == detected[2]); // checking the length of the cc number
  console.log(valueCheck);
	if(luhnCheck && valueCheck) {
		errorClass = 'verified';
      console.log(status);
      
	} else if(valueCheck || val.length > detected[2])
	{
		errorClass = 'error';
  }
  
	$(this).attr('class', 'cc ' + detected[0] + ' ' + errorClass);
});
