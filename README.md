# payment-service
how to run locally:
The app is using ES6, node -v 6.2
- clone the repository
- run gitbash from payment-service directory
- run 
	npm install
- to run tests run
	npm run test
- to run the app with a text file, create a folder called "files" in the app directory and place the txt file in "files" folder then run 
	node index.js employee.txt [name of the file]
	the result will be in "files" folder and is called payslip.txt


Assumptions:
- the input file is existed in "files" directory
- the order of the fields are correct in the input file 
- if the app runs more than once the result will be appended to the output "payslip.txt" file 
