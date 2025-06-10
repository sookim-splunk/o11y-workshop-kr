# Deploy Applications to K8s

## Dockerfile 재작성
``` bash 
vi hello-world/Dockerfile 
```

```Dockerfile
FROM openjdk:17-jdk-slim

# 작업 디렉터리 설정
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY ./target/hello-world-0.0.1-SNAPSHOT.jar app.jar

# Splunk Java Agent
ADD https://github.com/signalfx/splunk-otel-java/releases/latest/download/splunk-otel-javaagent.jar /splunk-otel-javaagent.jar
RUN chmod -R go+r /splunk-otel-javaagent.jar

# Modifies the entry point
ENTRYPOINT ["java","-jar","./app.jar"]

# 8080 포트 오픈
EXPOSE 8080
```

### Dockerfile build
```bash
docker build -t hello-world-java-splunk-k8s .
```

### Dockerfile push 
- docker login 해서 이미지 레지스트리에 배포 (없으면 chaehee/hello-world-java-splunk-k8s:1.0 사용)
  ``` bash
  docker login -u chaehee
  docker tag hello-world-java-splunk-k8s chaehee/hello-world-java-splunk-k8s:1.0
  docker push chaehee/hello-world-java-splunk-k8s:1.0
  ```


## K8s deployment 작성
### k8s-deployment.yaml 파일 
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: hellojava
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-java
  namespace: hellojava
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-java
  template:
    metadata:
      labels:
        app: hello-java
    spec:
      containers:
      - name: hello-java
        image: chaehee/hello-world-java-splunk-k8s:1.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: hello-java-service
  namespace: hellojava
spec:
  selector:
    app: hello-java
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer

```
### Application 실행
```bash 
$ kubectl apply -f ./k8s-deployment.yaml 
namespace/hellojava created
deployment.apps/hello-java created
service/hello-java-service created

$ kubectl get all -n hellojava

NAME                              READY   STATUS    RESTARTS   AGE
pod/hello-java-85c54f595d-rcclx   1/1     Running   0          107s

NAME                         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/hello-java-service   LoadBalancer   10.43.78.116   <pending>     80:31996/TCP   107s

NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/hello-java   1/1     1            1           107s

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/hello-java-85c54f595d   1         1         1       107s
```

### Troubleshooting
- 어플리케이션은 잘 실행되고 있어도 curl 하면 connection error 발생
```bash
$ curl localhost:8080/hello/Tom
curl: (7) Failed to connect to localhost port 8080 after 0 ms: Connection refused
```
- 왜? port-forwarding이 안되고 있기 때문 
  - 다음과 같이 port-forward를 해줘야함  
  ``` bash
  $ kubectl port-forward -n hellojava svc/hello-java-service 8080:80
  $ curl localhost:8080/hello/Tom
  Hello, Tom!%  
  ```

## Trace 정보를 위해 ENV 설정
- 기존의 K8s 리소스 삭제
``` bash
kubectl delete -f ./k8s-deployment.yaml
```
- Configure Integration 에서 확인했던 내용을 바탕으로 yaml 파일 업데이트
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: hellojava
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-java
  namespace: hellojava
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-java
  template:
    metadata:
      labels:
        app: hello-java
    spec:
      containers:
      - name: hello-java
        image: chaehee/hello-world-java-splunk-k8s:1.0
        ports:
        - containerPort: 8080
        env: 
          - name: SPLUNK_OTEL_AGENT
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
          - name: OTEL_EXPORTER_OTLP_ENDPOINT
            value: "http://$(SPLUNK_OTEL_AGENT):4318"
          - name: OTEL_SERVICE_NAME
            value: "hello-java"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "deployment.environment=prod,service.version=1.0"
        command:
          - java
          - -javaagent:/splunk-otel-javaagent.jar
          - -jar 
          - ./app.jar
        
---
apiVersion: v1
kind: Service
metadata:
  name: hello-java-service
  namespace: hellojava
spec:
  selector:
    app: hello-java
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer

```
### K8s 어플리케이션 재배포
- K8s application에 APM에 필요한 정보들(env,command)을 넣어줬기에 APM에서도 K8s application 모니터링이 가능합니다. 
```bash 
$ kubectl apply -f ./k8s-deployment.yaml 
$ kubectl port-forward -n hellojava svc/hello-java-service 8080:80
$ curl localhost:8080/hello/Tom
Hello, Tom!%  
``` 