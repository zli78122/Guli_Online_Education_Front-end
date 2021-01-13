# Online Education and Course Recommendation System

*Video: https://youtu.be/t-wol7UFu_s*  

*Backend Source Code: https://github.com/zli78122/Guli_Online_Education*  
*Frontend Source Code: https://github.com/zli78122/Guli_Online_Education_Front-end*  

## Introduction
* Developed a **B2C** online education website using the development model of separation of frontend and backend, the backend is a **microservice** architecture built by the **MVC design pattern** based on **Spring Boot** and **Spring Cloud**, and the frontend is based on **Vue.js**.
* Combined **content-based recommendation** and **item-based collaborative filtering recommendation** algorithms to train course recommendation models written in **PySpark**, which can match **98.24%** of similar item pairs in the ground truth.
* Predicted users’ ratings for courses based on the generated models using Pearson Correlation Coefficient and calculated **RMSE** equal to **0.899**.
* Integrated **Amazon S3** saving image objects and **Alibaba Cloud VoD** uploading and watching course videos for durability and availability.
* Created MySQL database on **Amazon RDS** and deployed the application to **Amazon EC2** for better performance.

## Recommendation System
### 1. Content-based Recommendation System
**Model Training - Build Item Profile**  
* **Step 1**. Concatenate all the review texts for the course as the document and parsing the document, such as removing the punctuations, numbers, and stopwords.
* **Step 2**. Remove extremely rare words in order to reduce the vocabulary size. Extremely rare word means that the count of a word is less than 0.0001% of the total words for all records. The remaining words can be regarded as frequent words.
* **Step 3**. Compute TF-IDF of every frequent word. (TF-IDF : Term frequency * Inverse Document Frequency)
* **Step 4**. For each course, use top 200 words with highest TF-IDF scores to describe the document.
* **Step 5**. Create item profile for every course, i.e. every course profile consists of 200 words with highest TF-IDF scores.

**Model Training - Build User Profile**  
* Every user profile consists of all the frequent words occurring in course profiles that the user reviewed.

**Model Prediction**  
* During the predicting process, you will estimate if a user would prefer to review a course by computing the Cosine Distance between the profile vectors. The (user, course) pair will be considered as a valid pair if their Cosine Similarity is >= 0.01.

## Tech Stacks
IntelliJ IDEA，Visual Studio Code  
MySQL, Redis  
Spring, Spring MVC, MyBatis/MyBatis-Plus, Spring Security, Spring Boot, Spring Cloud  
Swagger2, Nginx, EasyExcel, Tinymce, JWT, HttpClient, Cron, Canal  
HTML, CSS, JavaScript, JSON  
ES6, Axios, element-ui, Node.js, Webpack, Vue.js, Nuxt.js, ECharts  
SLF4J, logback  
Maven, Git/GitHub  
Social Login, WeChat Pay  
