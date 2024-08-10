## Overview

**Netflix Clone Application**

Welcome to the Netflix Clone application! This project showcases how to build, deploy, and manage a full-fledged React JS application with Kubernetes on AWS EKS, seamlessly integrated with GitLab CI/CD.

## Application Code
The `Application-Code` directory contains the source code for the Netflix-Clone Application. Dive into this directory to explore the application implementations which is desingned through React JS.

## Gitlab Pipeline Code
In the `Gitlab-Pipeline-Code` directory, you'll find Gitlab pipeline scripts. These scripts automate the CI/CD process, ensuring smooth integration and deployment of your application.

## Kubernetes Manifests Files
The `Kubernetes-Manifests-Files` directory includes all the necessary Kubernetes manifests required to deploy the Netflix Clone application on AWS EKS. These manifests define the deployment, services, and other Kubernetes resources.

## Project Details
🛠️ **Tools Explored:**
- **AWS CLI & ECR:** For managing AWS infrastructure and secure image storage.
**GitLab:** To set up a robust CI/CD pipeline.
**Kubectl & EKS:** For deploying and managing Kubernetes clusters on AWS.

🚢 **High-Level Overview:**
- IAM User setup & Terraform magic on AWS
- Gitlab deployment with AWS integration
- EKS Cluster creation & Load Balancer configuration
- Private ECR repositories for secure image management


### Step 1: IAM Configuration Setup
- Create a user `eks-admin` with `AdministratorAccess`.
- Generate Security Credentials: Access Key and Secret Access Key.

### Step 2: EC2 Setup OR EKS cluster setup through locally

### Note
### To create EKS cluster through EC2 setup, follow from Step3 to Step6 
### To create EKS cluster manually through terminal , follow directly from Step7 if prerequise are already installed

- Launch an Ubuntu instance in your favourite region (eg. region `ap-south-1`).
- SSH into the instance from your local machine.

### Step 3: Install AWS CLI v2
``` shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
aws configure
```

### Step 4: Install Docker
``` shell
sudo apt-get update
sudo apt install docker.io
docker ps
sudo chown $USER /var/run/docker.sock
```

### Step 5: Install kubectl
``` shell
curl -o kubectl https://amazon-eks.s3.ap-south-1.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client
```

### Step 6: Install eksctl
``` shell
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

### Step 7: Setup EKS Cluster
``` shell
eksctl create cluster --name app-cluster --region ap-south-1 --node-type t2.medium --nodes-min 2 --nodes-max 2
aws eks update-kubeconfig --region ap-south-1 --name app-cluster
kubectl get nodes
```

### Step 8: Run Manifests
``` shell
kubectl apply -f .
kubectl delete -f .
```

# Install ALB Ingress Controller on AWS

## Step 9: Download an IAM policy for the AWS Load Balancer Controller

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
```

## Step10: Create an IAM policy (service account) for the AWS Load Balancer Controller

```bash
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```

```bash
eksctl utils associate-iam-oidc-provider --region=ap-south-1 --cluster=my_cluster --approve
```

## Step11: Create an IAM Role to attach the permission using eksctl
```bash
eksctl create iamserviceaccount --cluster=my_cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::111122223333:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=ap-south-1
```

## Step12: Install the AWS Load Balancer Controller using Helm V3

```bash
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=my_cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
```

### Cleanup
- To delete the EKS cluster:
``` shell
eksctl delete cluster --name app-cluster --region ap-south-1
```