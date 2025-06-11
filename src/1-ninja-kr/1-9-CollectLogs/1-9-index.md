### 여기서 잠깐! Splunk Cloud로 log 데이터를 보내고 싶다면? 🤔

- Install Configuration을 할 때 Log Collection 기능을 Enable 해 Splunk Cloud로 데이터를 보낼수도 있지만 helm 배포 후 수정을 하고 싶으면 다음과 같은 방법으로 가능합니다.

1. helm의 values를 values.yaml이란 파일로 만들기

```bash
helm show values splunk-otel-collector-chart/splunk-otel-collector > values.yaml
vi values.yaml
```

2. values.yaml 수정

```bash
splunkPlatform:
  # splunk http event collector(hec) endpoint 추가
  endpoint: "https://http-inputs-scv-shw-acb4f45a837af9.stg.splunkcloud.com/services/collector"
  # Splunk Cloud에서 발급한 hec token 기입
  token: "<token>"

  # log를 저장하고 싶은 Index 기입
  index: "main"
  # Name of the Splunk metric type index targeted. Required when ingesting metrics to Splunk Platform.
  metricsIndex: ""
  # Name of the Splunk event type index targeted. Required when ingesting traces to Splunk Platform.
  tracesIndex: ""
```

3. helm 재배포

```bash
helm upgrade splunk-otel-collector --set="splunkObservability.accessToken=<o11y access token>,clusterName=default,splunkObservability.realm=us1,gateway.enabled=false,splunkObservability.profilingEnabled=true,environment=prod,agent.discovery.enabled=true" -f values.yaml splunk-otel-collector-chart/splunk-otel-collector
```

- 혹은 기본 정보가 모두 values.yaml에 있을 경우

```bash
helm upgrade -f values.yaml splunk-otel-collector-chart/splunk-otel-collector
```
