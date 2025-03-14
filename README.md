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



# **☁️ AWS Deployment Details**  

## **🔹 Overview**  
This project has been successfully **migrated to AWS** to improve **scalability, performance, and security**. The entire infrastructure is hosted using **AWS services**, ensuring **high availability and fault tolerance**.  

![image](https://github.com/adijad/Vabc-Bookstore/blob/main/Cloud_Architecture.png)

### **🌐 AWS Services Used**  

| **Component**     | **AWS Service** | **Purpose** |
|-------------------|-----------------|-------------|
| **Frontend** | AWS S3 + CloudFront | Hosts the **React.js frontend** with **global CDN caching** |
| **Backend** | AWS EC2 (Ubuntu, Tomcat) | Hosts the **Spring Boot backend** with **auto-scaling** |
| **Database** | AWS RDS (MySQL) | Stores user data in a **secure private subnet** |
| **API Gateway** | AWS API Gateway | Routes **frontend requests to backend APIs** |
| **Security** | AWS IAM, Security Groups, VPC | Manages **access control & network segmentation** |
| **Networking** | AWS VPC | Segments the infrastructure into **public/private subnets** |
| **Storage** | AWS S3 | Stores **frontend assets & logs** |
| **Monitoring** | AWS CloudWatch & CloudTrail | Logs and monitors **API calls, errors, and scaling events** |

---

## **🏗️ Deployment Architecture**  

The deployment follows a **segmented AWS network** to **enhance security and performance**:  

✔ **Public Subnet** → Contains the **EC2 backend instance** (Spring Boot).  
✔ **Private Subnet** → Contains the **RDS MySQL database**, accessible only by the backend.  
✔ **NAT Gateway** → Allows **outbound traffic** from private subnets for updates and maintenance.  
✔ **Security Groups & IAM Roles** → Restrict access between frontend, backend, and database for **secure communication**.  

---

## **🚀 Backend Deployment (Spring Boot on EC2)**  
### **Steps Taken to Deploy Backend on AWS EC2:**  
1️⃣ **Launched an EC2 instance** (Ubuntu) and installed **Java, Tomcat, and MySQL client**.  
2️⃣ **Configured security groups** to allow **HTTP(S) traffic on port 8080** and **MySQL access on port 3306 (private only)**.  
3️⃣ **Transferred the Spring Boot `.war` file** to the EC2 instance using SCP.  
4️⃣ **Configured Tomcat to deploy the application** automatically on startup.  
5️⃣ **Set up an IAM Role for EC2** to securely communicate with **RDS and S3**.  

---

## **📂 Database (AWS RDS - MySQL)**  
### **Steps Taken to Deploy MySQL on AWS RDS:**  
1️⃣ **Created an RDS MySQL instance** in a **private subnet** for security.  
2️⃣ **Enabled Multi-AZ replication** to ensure **database redundancy & failover protection**.  
3️⃣ **Configured Security Groups** to allow **only EC2 instances** to access the database.  
4️⃣ **Optimized query performance** by enabling **read replicas**.  
5️⃣ **Automated database backups** using AWS Backup.  

---

## **🖥️ Frontend Deployment (React on AWS S3 & CloudFront)**  
### **Steps Taken to Deploy Frontend on AWS:**  
1️⃣ **Built the React frontend** using `npm run build`.  
2️⃣ **Uploaded the build folder to an AWS S3 bucket** configured for **static website hosting**.  
3️⃣ **Set up AWS CloudFront** to serve the frontend globally with **low-latency caching**.  
4️⃣ **Configured HTTPS with an SSL certificate** using AWS Certificate Manager.  
5️⃣ **Updated CORS policies & CloudFront behaviors** for optimal content delivery.  

---

## **🔄 API Gateway - Connecting Frontend to Backend**  
### **Steps Taken to Set Up AWS API Gateway:**  
1️⃣ **Created a new REST API** in AWS API Gateway.  
2️⃣ **Configured routes to forward requests** to the **EC2 backend**.  
3️⃣ **Enabled CORS** to allow cross-origin requests from the frontend.  
4️⃣ **Added request validation & logging** using AWS CloudWatch.  
5️⃣ **Secured API endpoints** with IAM Roles & AWS Lambda authorizers (future phase).  

---

## **🚀 Future Enhancements**  
✅ **Migrate Backend to AWS Fargate (ECS) for Auto-Scaling**.  
✅ **Implement CI/CD Pipelines (GitHub Actions) for Automated Deployment**.  
✅ **Add AWS Lambda for Background Processing (Order Management, Notifications)**.  
✅ **Introduce Redis Caching (ElastiCache) for Faster Database Queries**.  
