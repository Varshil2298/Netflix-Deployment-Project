# Install ALB Ingress Controller on AWS

## Step 1: Download an IAM policy for the AWS Load Balancer Controller

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
```

## Step2: Create an IAM policy (service account) for the AWS Load Balancer Controller

```bash
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```

```bash
eksctl utils associate-iam-oidc-provider --region=ap-south-1 --cluster=my_cluster --approve
```

## Step3: Create an IAM Role to attach the permission using eksctl
```bash
eksctl create iamserviceaccount --cluster=my_cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::111122223333:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=ap-south-1
```

## Step4: Install the AWS Load Balancer Controller using Helm V3

```bash
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=my_cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
```

