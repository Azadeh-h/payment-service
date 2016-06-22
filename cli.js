import payment from './app/processes/payment';
import paymentHelper from './app/helpers/paymentHelper';
import fs from 'fs';

 function readFile(file) {
 	const helper = new paymentHelper();
	const paymentProcess = new payment();

	fs.readFileSync(file).toString().split('\n').forEach(function (line) { 
	    const data = helper.extractEmployeeDataOutofCsv(line)
 		const payslip = paymentProcess.generatePayslip(data);
	    fs.appendFileSync("./files/payslip.txt", payslip.toString() + "\n");
	});
 }

function app() {
	const args = process.argv.slice(2);
	let fileName = args[0];
	readFile('./files/'.concat(fileName));
}

app();