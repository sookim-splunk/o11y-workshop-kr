# Instrument a Java application with OpenTelemetry

## Instrument a Java pplication with OpenTelemetry

### 현재 작동중인 Java Application의 Trace 정보를 Splunk Observability 에 수신하기
1. Install new Java(Opentelemetry) Instance
    - Data Management > APM > Java(Opentelemetry)
2. Configure Integration
    - 다음과 같이 설정
    
      ![](../../images/1-ninja-kr/1-3-configuration1.png)
3. Install Integration
    - 다음과 같이 설정
    
      ![](../../images/1-ninja-kr/1-3-configuration2.png)

4. Java Application을 재가동
    - Before
        ```bash
        java -jar target/hello-world-0.0.1-SNAPSHOT.jar
         ```
    - After 
        ```bash
        java -javaagent:./splunk-otel-javaagent.jar -jar target/hello-world-0.0.1-SNAPSHOT.jar
         ```