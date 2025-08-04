# Task Planner - Kubernetes And Devops Assignment (NAGP 2025)  
  
This project demonstrates a multi-tier architecture on Kubernetes using:  
- Java Spring Boot Microservice (Task Planner)  
- MySQL Database  
- Exposed via Ingress  
- Config and Secrets managed via Kubernetes best practices  
  
---  
  
## 📂 Repository  
[GitHub Repo Link](https://github.com/shivamsharma01/task-planner)  
  
## 🐳 Docker Image  
Docker Hub: [shivamshivam01/task-planner](https://hub.docker.com/r/shivamshivam01/task-planner)  
  
## 🌐 API Endpoint (Ingress) to view the records from backend tier  
**NOTE**: As instructed, the Kubernetes cluster was deleted after recording the demo to avoid costs. The Ingress endpoint is shown in the screen recording.
but the format is   
External-IP.nip.io/api/todos  
  
## 📂 Source Code Link  
[Google Drive Link](https://drive.google.com/file/d/1x5VEY_mg0QCo_6xOMIPFTxwZ9P8g1LkG/view?usp=sharing)  
  
## 📂 Demo recording Link  
[Google Drive Link](https://drive.google.com/file/d/1TgdLXKTVgpXVmPDcupvnIWwbgjHi3LVM/view)  
  
  
##Steps to run on GKE  
###1. Create a GKE Cluster  
   gcloud container clusters create task-planner-cluster \  
   --zone us-central1-a \  
   --num-nodes=3  
  
   Authenticate to the cluster:  
   gcloud container clusters get-credentials task-planner-cluster --zone us-central1-a  

###2. Apply Configs  
   kubectl apply -f task-planner-secret.yaml  
   kubectl apply -f task-planner-configmap.yaml  
   kubectl apply -f mysql-statefulset.yaml  
  
   kubectl get pods -w  
   --Wait for mysql-0 to be ready:  
  
   then run init jobs  
   kubectl apply -f mysql-init-job.yaml  
   kubectl logs job/mysql-init-job  
  
  
Now deploy the app  
kubectl apply -f task-planner-deployment.yaml  
  
kubectl get pods  
kubectl get svc  
  
kubectl describe svc task-planner-service  
  
  
###3.  
kubectl create namespace ingress-nginx  
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml  
  
kubectl get pods -n ingress-nginx  
kubectl get svc -n ingress-nginx  
copy the external ip and  
vi task-planner-ingress.yaml update host <ip>.nip.io  
kubectl apply -f task-planner-ingress.yaml  
  
kubectl get ingress  
  
kubectl describe ingress task-planner-ingress  
  
  
###4. Auto Restart  
Application POD kill  
kubectl get pods -l app=task-planner  
kubectl delete pod <any-task-planner-pod-name>  
kubectl get pods -l app=task-planner -w  
  
Rolling Update  
kubectl set image deployment task-planner-deployment task-planner=shivamshivam01/task-planner:v2  
kubectl rollout status deployment task-planner-deployment  
kubectl get pods -l app=task-planner -w  
  
DB POD Kill  
kubectl get pod -l app=mysql  
kubectl delete pod mysql-0  
kubectl get pods -l app=mysql -w  