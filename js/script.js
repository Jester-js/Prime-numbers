//===================
//VALIDATE TEXT FIELD
//===================

var rangeField = document.getElementById('range'),
	btnGet = document.getElementById('get'),
	lb = document.getElementById('label-form');

var avf = ['positive', 'negative', 'neutral'],
	avl = ['positive-lb', 'negative-lb', 'neutral-lb'];

var rg = false;

rangeField.oninput = function() {

	range = this.innerHTML;

	if (range.length) {

		if (checkForNotNumber(range)) {

			addOnCl(btnGet, avf, avf[0]);

			addOnCl(lb, avl, avl[0]);
			lb.innerHTML = 'Looks good!'

			rg = true;

		} else {

			addOnCl(btnGet, avf, avf[1]);

			addOnCl(lb, avl, avl[1]);
			lb.innerHTML = 'Something wrong!'

			rg = false;


		};
	} else {

		addOnCl(btnGet, avf, avf[2]);

		addOnCl(lb, avl, avl[2]);
		lb.innerHTML = 'Enter your range:'

		rg = false;

	}
}


//==============================
//additional function
//===============================

//validate
function checkForNotNumber(str) {
	var reg = /[^0-9.]/g;
	if (reg.test(str) || !str.length) {
		return false;
	} else {
		var c = 0, r;
		for (var j = 0; j < str.length; j++) {
			if (str[j] == '.') c++
		}
		(c > 1) ?  (r = false) : (r = true)
		return r
	}
}

//add class to element
function addClass(el, c) {
	el.className = (el.className + ' ' + c);
}
//remove class from element
function removeClass(el, c) {
	el.className = el.className.replace(c, '');
}

//add class to element and remove other class
function addOnCl(elem, arr, c){
	arr.forEach(function(item, i, arr) {
		removeClass(elem, item);
	});
	addClass(elem, c);
}

//make correct format of number
function corrNumber(number) {
	var p1 = '', p2 = '';
	var q = 0;
	while (q < number.length && number[q] != '.') {
		p1 += number[q];
		q++;
	}
	q++;
	while (q < number.length) {
		p2 += number[q];
		q++;
	}
	for (var g = 0; g < p1.length; g++) {
		if (p1[g] != '0') {
			break;
		} else {
			p1 = deleteSymb(p1, p1[g]);
			g--;
		};
	}
	return p1;
}

//delete first find symb
function deleteSymb(str, symb) {
	var i = 0, p1 = '', p2 = '';
	while (str[i] != symb) {
		p1 += str[i];
		i++;
	};
	i++;
	while(i < str.length) {
		p2 += str[i];
		i++;
	}
	return (p1 + p2);
}