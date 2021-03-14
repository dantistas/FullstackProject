# FullstackProject for Full Stack open 2020

Fullstack application for Accounting company.
User will be able to contact company via contact form, fill aplication forms with personal details, which will be saved into MongoDB database. 
Interface for company will allow to see and manage all aplications.
Users can check status of their application when logged in.

website for potential clients ---> https://mastiscoukdemo.herokuapp.com/

Potential clients can fill in a contact form as a query and upload documents, which are being uploaded to dropbox via dropbox API, or if a user is a client, can check his application status with ID which in the real world is being provided. In the demo, there is only one client with an 
ID : 604e6476023a75001525ace1 (objectID from mongoDB) ansd with this id is possible to check application status.


website for company administrators --->> https://mastis-admin-dash-demo.herokuapp.com/

On the company's internal website, you must log in as an administrator. In the demo, the username is admin and the password is admin.  It is possible, to see all new queries. After inspecting the query administrator can decide if he wants to save it as a client if he wishes so the form going to be preloaded with information from the query, saved as a client into MongoDB, the client folder in dropbox going to be created, if files were uploaded in the initial query they will be transferred to the folder of the client and initial query going to be deleted. Also, the administrator can create clients himself. If he chooses so after the client is created dropbox folder will be created. Also can delete queries and clients if the administrator wishes so.



For this project, I used React as the front end, and express for the back end, MongoDB for database, and DropBox API to manage files.
In total spent 177Hours



