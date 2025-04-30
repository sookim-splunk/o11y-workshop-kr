---
title: Deploy a Java Application
linkTitle: 2. Deploy a Java Application
weight: 2
time: 10 minutes
---

## Prerequisites 

해당 어플리케이션을 구동하기 위해서는 Java 어플리케이션을 구동하기 위한 프로그램(Java, maven 등)이 필요합니다. 

설치

``` bash
sudo apt update
sudo apt install openjdk-17-jdk
sudo apt install maven
```

설치 확인
```bash
java -version
mvn -version
```

프로젝트 구조 생성
```bash
hello-world/
├── pom.xml
├── Dockerfile
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── helloworld/
        │               └── HelloWorldApplication.java
        └── resources/
            └── application.properties

```
HelloWorldApplication.java 코드 
```java
package com.example.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@RestController
public class HelloWorldApplication {

    private static final Logger logger = LoggerFactory.getLogger(HelloWorldApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(HelloWorldApplication.class, args);
    }

    @GetMapping("/hello/{name}")
    public String hello(@PathVariable(required = false) String name) {
        if (name == null || name.isEmpty()) {
            logger.info("/hello endpoint invoked anonymously");
            return "Hello, World!";
        } else {
            logger.info("/hello endpoint invoked by {}", name);
            return String.format("Hello, %s!", name);
        }
    }

    @GetMapping("/hello")
    public String helloNoName() {
        return hello(null);
    }
}

```

앱 빌드
```bash
mvn clean package
```

앱 실행
```bash
java -jar target/hello-world-0.0.1-SNAPSHOT.jar

```
앱이 실행되면 curl을 통해 어플리케이션에 요청을 보낼 수 있습니다. 

```bash
curl http://localhost:8080/hello
curl http://localhost:8080/hello/Tom

```