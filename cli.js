import Payment from './app/processes/payment';
import fs from 'fs';

 function readFile(file) {
	fs.readFileSync(file).toString().split('\n').forEach(function (line) {
        const paymentProcess = new Payment(line);
        const payslip = paymentProcess.generatePayslip();
	    fs.appendFileSync("./files/payslip.txt", payslip.toString() + "\n");
	});
 }

function app() {
	const args = process.argv.slice(2);
	let fileName = args[0];
	readFile('./files/'.concat(fileName));
}

app();