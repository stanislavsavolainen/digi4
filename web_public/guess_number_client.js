
function client_get_number() {

	console.log('**3423**');

	//read number from text-field
	var c_number = document.getElementById('textfield_index').value;

	//  document.getElementById("answer_field").innerHTML = '654321';

	//send number to server via JavaScript Fetch function using GET-method

	var send_request = true;

	if (send_request) {
		var host = 'http://127.0.0.1:5658';
		// var link = "/calculate_numbers"+"?data1="+c_number;
		var link = '/guess' + '?data1=' + c_number;


		//GET header    

		// fetch(host + link, { method: 'get', headers: { "Content-Type": "x-www-form-urlencoded"}})
		fetch(host + link, { method: 'get', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })


			.then((resp) => {
				console.log('---------------------- 4832940');
				//return resp.json(); 
				return resp.text();

			})

			.then((response) => {
				/* server http-response  */
				//var n_answer = JSON.parse(response);
				//document.getEleneById("answer_field").innerHTML = n_answer; 
				document.getElementById('answer_field').innerHTML = response;

				console.log('Fetch response happen !');



			})

			.catch(function (error_msg) {
				/* error if connection problem happens */
				console.log('Fetch error : ' + error_msg);
				document.getElementById('answer_field').innerHTML = '<div align=\'center\'><font color=\'red\'><h1>Node Server is down ! </h1></font></div>';
			});

	} else {

		console.log('Number guess function, value : ' + c_number);
	}


}


//generator endpoint not used
function generator() {

	var host = 'http://127.0.0.1:5658';
	var link = '/new';
	fetch(host + link, { method: 'get', credentials: 'same-origin', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

}