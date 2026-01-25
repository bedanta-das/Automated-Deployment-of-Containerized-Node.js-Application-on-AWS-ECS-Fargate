# 🚀 AWS ECS + ECR Project (Node.js Application Deployment)

📌 Project Overview
This project demonstrates end-to-end deployment of a Node.js application using AWS container services with a project-based DevOps approach.
* You will learn how to:
* Build a Docker image from a Node.js app
* Push the Docker image to Amazon ECR (Elastic Container Registry)
* Deploy and run the container on Amazon ECS using AWS Fargate (Serverless)
* View application logs in Amazon CloudWatch
* Secure access using IAM roles and policies
This project is designed for Cloud Engineers, DevOps Engineers, and AWS beginners who want real-world hands-on experience.

## 🏗️ Architecture Diagram (Conceptual)

            GitHub 
               |
               |
               V
         EC2 (Docker Build)
                |
                |
                V
         ECR (Docker Image Registry)
               |
               |
               V
      ECS (Fargate - Serverless Containers)
               |
               |
               V
      CloudWatch (Logs & Monitoring)

## 🧩 AWS Services Used
      Services	                                 Purpose
      GitHub	                                   Source code repository
      EC2	                                        Build Docker image & push to ECR
      Docker	                                  Containerize Node.js application
      ECR	                                        Store Docker images
      ECS (Fargate)	                               Run containers without managing servers
      IAM	                                        Secure access & permissions
      CloudWatch	                               Logs & monitoring

## 📂 Application Details

* Application Type: Node.js (Todo App)
* Port: 3000
* Container Runtime: Docker
* Deployment Type: Serverless (AWS Fargate)

## ⚙️ Prerequisites

* AWS Account
* Basic understanding of:
  * Linux
  * Docker
  * AWS IAM
* AWS CLI installed
* Docker installed
* Git installed

🛠️ Step-by-Step Implementation
1️⃣ Clone the GitHub Repository

            git clone https://github.com/bedanta-das/AWS-ECS-ECR-Project.git
            
2️⃣ Launch EC2 Instance (Build Server)
* AMI: Ubuntu
* Instance Type: t2.micro (Free Tier)
* Purpose: Build Docker image and push to ECR

Install required tools:
  
            sudo apt update
            sudo apt install docker.io unzip -y

Add user to Docker group:

            sudo usermod -aG docker $USER
            reboot

3️⃣ Install AWS CLI

            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            sudo apt install unzip
            unzip awscliv2.zip
            sudo ./aws/install
            aws --version

Configure AWS credentials:

aws configure

4️⃣ Create ECR Repository

Repository Type: Public

Repository Name: node-app

Architecture: x86_64 / ARM64

5️⃣ Authenticate Docker to ECR

            aws ecr-public get-login-password --region us-east-1 \
            | docker login --username AWS --password-stdin public.ecr.aws
            
6️⃣ Build Docker Image

            docker build -t node-app .

7️⃣ Tag and Push Image to ECR

            docker tag node-app:latest public.ecr.aws/<repo-id>/node-app:latest
            docker push public.ecr.aws/<repo-id>/node-app:latest

🚢 Deploy Using Amazon ECS (Fargate)
8️⃣ Create ECS Cluster
* Cluster Name: node-app-cluster
* Infrastructure: AWS Fargate
* Monitoring: CloudWatch Enabled

9️⃣ Create Task Definition
* Launch Type: Fargate
* OS: Linux
* CPU: 1 vCPU
* Memory: 3 GB
* Container Name: node-container
* Image URI: ECR image URL
* Port Mapping: 8000 → 8000
* IAM Role: ecsTaskExecutionRole
* Log Driver: CloudWatch

🔟 Run Task
* Select cluster: node-app-cluster
* Launch task using the created task definition
* Use default VPC & subnets

🌐 Access Application
* Copy Public IP of the ECS task
* Open browser:

            http://<PUBLIC-IP>:8000

🎉 Your Node.js Todo App is now live on AWS ECS!

📊 Monitoring & Logs
CloudWatch Logs
Path:

            CloudWatch → Log Groups → /ecs/node-app

You can view:
* Application logs
* Container start/stop logs
* Errors & debugging info

🔐 Security Notes
* IAM User used only for:
* ECR push access
* ECS uses Task Execution Role
* Port 8000 must be allowed in Security Group

🧠 Common Issues & Fixes
❌ App Not Accessible

            ✔️ Ensure port 8000 is allowed in ECS task security group.

❌ Docker Push Failed

            ✔️ Verify IAM permissions:
            AmazonEC2ContainerRegistryPublicFullAccess
