# Deploy a Java Application

## Prerequisites

해당 어플리케이션을 구동하기 위해서는 Java 어플리케이션을 구동하기 위한 프로그램(Java, maven 등)이 필요합니다.

- 설치

```bash
sudo apt update
sudo apt install openjdk-17-jdk
sudo apt install maven
```

- 설치 확인

```bash
java -version
mvn -version
```

- 프로젝트 구조 생성

```bash
 mvn archetype:generate \
  -DgroupId=com.example.helloworld \
  -DartifactId=hello-world \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

```bash
hello-world/
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── example
    │               └── helloworld
    │                   └── App.java
    └── test
        └── java
            └── com
                └── example
                    └── helloworld
                        └── AppTest.java
```

- 여기서 불필요한 디렉토리를 삭제합니다

```bash
cd hello-world/src/
rm -rf test
```

- App 코드 디렉토리로 이동하여 Hello World 코드를 작성합니다

```bash
cd hello-world/src/main/java/com/example/helloworld/

vi HelloWorldApplication.java
```

- HelloWorldApplication.java 코드

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

- hello-world 루트 디렉토리로 이동하여 pom.xml 코드를 작성합니다

```bash
cd ~/hello-world

vi pom.xml
```

- pom.xml 코드

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>hello-world</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>Hello World Application</name>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

- 앱 빌드

```bash
mvn clean package
```

- 앱 실행

```bash
java -jar target/hello-world-0.0.1-SNAPSHOT.jar

```

- 앱이 실행되면 터미널 창을 하나 더 열어서 curl을 통해 어플리케이션에 요청을 보낼 수 있습니다.

```bash
curl http://localhost:8080/hello
Hello, World!%

curl http://localhost:8080/hello/Tom
Hello, Tom!%
```

```bash

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)

2025-06-10T01:36:35.426Z  INFO 1110760 --- [           main] c.e.helloworld.HelloWorldApplication     : Starting HelloWorldApplication v0.0.1-SNAPSHOT using Java 17.0.15 with PID 1110760 (/home/splunk/hello-world/target/hello-world-0.0.1-SNAPSHOT.jar started by splunk in /home/splunk/hello-world)
2025-06-10T01:36:35.431Z  INFO 1110760 --- [           main] c.e.helloworld.HelloWorldApplication     : No active profile set, falling back to 1 default profile: "default"
2025-06-10T01:36:36.467Z  INFO 1110760 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-06-10T01:36:36.481Z  INFO 1110760 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-06-10T01:36:36.482Z  INFO 1110760 --- [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.20]
2025-06-10T01:36:36.526Z  INFO 1110760 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2025-06-10T01:36:36.527Z  INFO 1110760 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 970 ms
2025-06-10T01:36:36.899Z  INFO 1110760 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''
2025-06-10T01:36:36.915Z  INFO 1110760 --- [           main] c.e.helloworld.HelloWorldApplication     : Started HelloWorldApplication in 1.992 seconds (process running for 2.486)
2025-06-10T01:37:17.944Z  INFO 1110760 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2025-06-10T01:37:17.944Z  INFO 1110760 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2025-06-10T01:37:17.945Z  INFO 1110760 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2025-06-10T01:37:17.980Z  INFO 1110760 --- [nio-8080-exec-1] c.e.helloworld.HelloWorldApplication     : /hello endpoint invoked anonymously
2025-06-10T01:38:57.567Z  INFO 1110760 --- [nio-8080-exec-2] c.e.helloworld.HelloWorldApplication     : /hello endpoint invoked by Tom
```

Java 앱이 정상적으로 구동되는 것이 확인 된다면 Ctrl+C를 눌러 앱을 종료합니다
