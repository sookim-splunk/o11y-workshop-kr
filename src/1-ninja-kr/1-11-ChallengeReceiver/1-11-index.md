# 1-11. Challenge : MySQL Reveiver 추가하기

> **receiver**는 데이터를 수집(받아오는) 역할을 하는 OpenTelemetry Collector의 구성 요소입니다.

- 외부 시스템(예: MySQL, Apache, 로그 파일 등)으로부터  
  **메트릭 / 로그 / 트레이스**를 수집하는 모듈
- Collector가 어떤 데이터를 수집할지 정의하는 **입력 포인트**

### Collector는 모듈형 구조

```
[receiver] → [processor] → [exporter]
```

- 데이터를 **어디서 수집하고 (receiver)**
- **어떻게 가공하고 (processor)**
- **어디로 보낼지 (exporter)** 설정

> receiver가 없으면 Collector는 아무 것도 수집하지 않음

</br>

### 예시

| Receiver 이름 | 설명                                             |
| ------------- | ------------------------------------------------ |
| `hostmetrics` | CPU, 메모리, 디스크 등 시스템 자원 메트릭 수집   |
| `mysql`       | MySQL DB 성능 메트릭 수집                        |
| `apache`      | Apache Web Server 메트릭 수집 (`/server-status`) |
| `filelog`     | 로그 파일 수집                                   |
| `prometheus`  | Prometheus endpoint에서 메트릭 스크랩            |

---

</br>

## 왜 `receiver`를 추가해야 할까?

### 1. 수집 대상별로 receiver가 다르기 때문

- Collector는 기본적으로 **호스트 메트릭** 정도만 수집
- 추가적인 시스템이나 애플리케이션 메트릭을 보려면  
  해당 대상에 맞는 **receiver를 명시적으로 추가**해야 함

---

</br>

### 2. 자동 수집 안 되는 대상이 많음

- Prometheus exporter, Apache, Redis, JVM, Kafka 등은  
  **기본 수집 대상이 아님 → 수동으로 receiver 추가 필요**

</br>

## 📝 참고

Splunk Otel Collector의 Helm 설치 시 `values.yaml` 파일에  
receiver 설정을 아래와 같이 추가해야 합니다:

```yaml
agent:
  config:
    receivers:
      mysql:
        endpoint: mysql.hellojava.svc.cluster.local:3306
        username: otel
        password: Splunk123
        database: otel
        collection_interval: 10s

    service:
      pipelines:
        metrics:
          receivers: [mysql]
```

---

## 1. MySQL 파드 구동시키기

## 2. MySQL Receiver 구성하기

## 3. MySQL 메트릭 수집 확인하기
