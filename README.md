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
* The React client is built separately and can be independently deployed.
* The frontend follows a modular component-based architecture, ensuring code reusability and maintainability.
* The UI is responsive, supporting multiple screen sizes and providing a smooth user experience.



# AWS Deployment Details  

## Overview 
This project has been successfully **migrated to AWS** to improve **scalability, performance, and security**. The entire infrastructure is hosted using **AWS services**, ensuring **high availability and fault tolerance**.  

![image](https://github.com/adijad/Vabc-Bookstore/blob/main/Cloud_Architecture.png)

### AWS Deployment Overview  
- The **public subnet** hosts a **public EC2 instance (Tomcat Server)** that handles frontend and API requests.  
- The **private subnet** hosts a **private EC2 instance (MySQL Database)** that securely communicates with the backend.  
- **AWS Route 53** is used for DNS resolution, linking the domain **`cloudbookstore.biz`** to the **Elastic IP** of the public EC2 instance.  
- A **NAT Gateway** allows the **private MySQL instance** to access the internet for security updates while remaining inaccessible from the outside world.  
- **Security Groups** restrict access between components, allowing only necessary traffic.  

---

## AWS Services Used
| **Component**      | **AWS Service Used** | **Purpose** |
|--------------------|---------------------|-------------|
| **Frontend**      | AWS S3 + CloudFront  | Hosts the **React.js frontend** with global CDN caching |
| **Backend**       | AWS EC2 (Public Subnet) | Runs **Spring Boot & Tomcat**, accessible via Internet Gateway |
| **Database**      | AWS EC2 (Private Subnet) | Hosts **MySQL**, accessible only by backend |
| **Networking**    | AWS VPC, Subnets, NAT Gateway | Segments infrastructure for **security & controlled access** |
| **Domain Name**   | AWS Route 53         | Links `cloudbookstore.biz` to **Elastic IP** of the public EC2 instance |
| **Security**      | AWS Security Groups  | Restricts access between components |

---

## AWS Network Configuration 

### Public Subnet (Frontend & API Server)
- **EC2 (Tomcat Server) is deployed in the Public Subnet.**  
- Exposed to the internet via an **Elastic IP & Internet Gateway**.  
- Allows inbound traffic on **port 80/443 (HTTP/HTTPS)** for public access.  

### ** Private Subnet (MySQL Database)**
- **EC2 (MySQL Database) is deployed in the Private Subnet** (No direct internet access).  
- Only allows traffic **from the Public EC2 instance on port 3306 (MySQL)**.  
- **NAT Gateway is configured** to allow outbound internet access (for security updates).  

### ** AWS Route 53 - Domain & DNS**
- The domain **`cloudbookstore.biz`** is linked to the **Elastic IP of the Public EC2 instance**.  
- Ensures that all API & frontend requests go through the **registered domain name** instead of a raw IP address.  

---
