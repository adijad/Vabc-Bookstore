## An E-Comic Bookstore in React and Rest API
Vabc-Bookstore is a project that involves building a Bookstore web application using a React client app and a Tomcat server with a MySQL database. This project focuses on  a web application architecture that provides accessibility and performance considerations, and focuses on scalability. The project aims to create a scalable and reliable web application that can handle a large number of users and transactions. This prototype has single page architecture at frontend with monolith server at backend. Overall, the project is focused on building a high-quality web application that can handle a large amount of traffic and provide a good user experience.

Currently, the application is deployed locally, but in future phases, it will be migrated to the cloud using AWS services like EC2, RDS, API Gateway, and AWS Lambda to ensure scalability, reliability, and fault tolerance.

## Architecture
![image](https://github.com/sm5190/PaperTown-Book-store/assets/53345331/f9300e75-1607-4f82-9740-14ca90cb6307)
### About server:
* The REST API allows the application to serve multiple clients, including mobile devices.
* The business logic is decoupled from the API layer, making it reusable across different applications.
* The Data Access Layer (DAL) abstracts database interactions, making it easier to migrate to AWS RDS in later phases.
* Currently deployed locally, with plans for cloud deployment using AWS EC2, RDS, API Gateway, and Lambda for scalability.
## About Client:
![image](https://github.com/sm5190/PaperTown-Book-store/assets/53345331/7b1661dd-39fc-414a-b504-06ffdfee7259)
•The React client is separately build-able, and deployed separately
•Web developers can work independently via the API
•React Components are reusable
•React Components are responsive
