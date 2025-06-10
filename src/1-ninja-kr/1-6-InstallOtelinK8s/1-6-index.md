# Install Opentelemetry in K8s

## Key Terms

### Kubernetes란 무엇일까요? 

_"Kubernetes is a portable, extensible, open source platform for managing containerized
workloads and services, that facilitates both declarative configuration and automation."_

Source:  https://kubernetes.io/docs/concepts/overview/

We'll deploy the Docker image we built earlier for our application into our Kubernetes cluster, after making
a small modification to the Dockerfile. 

### Helm이란 무엇일까요? 

Helm is a package manager for Kubernetes.

_“It helps you define, install, and upgrade even the most complex Kubernetes application.”_

Source:  https://helm.sh/

We'll use Helm to deploy the OpenTelemetry collector in our K8s cluster.

### Benefits of Helm

* 복잡성 관리
  * deal with a single values.yaml file rather than dozens of manifest files 
* Easy Updates
  * in-place upgrades
* Rollback support
  * Just use helm rollback to roll back to an older version of a release

## Uninstall the Host Collector 

기존의 host collector 삭제( K8s 용으로 재설치 예정) 

``` bash
curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
sudo sh /tmp/splunk-otel-collector.sh --uninstall
```

## Helm을 사용하여 Collector 설치

1. Install new Opentelemetry Collector
    - Data Management > Deploy Splunk OpenTelemetry Collector for other Environments
2. Configure Integration
    - 다음과 같이 설정
      ![](../../images/1-ninja-kr/1-6-configuration1.png)
3. 안내되는 커맨드에 따라 helm을 통해 환경에 Otel 설치
4. collector가 잘 작동되는지 확인
    ``` bash
    kubectl get pods
    ```
5. Olly Cloud의 IM에서 클러스터 확인 
    - Infrastructure -> Kubernetes -> Kubernetes Clusters 에서 클러스터 이름(_$INSTANCE-cluster_) 검색 
    ![](../../images/1-ninja-kr/1-6-configuration2.png)

### 여기서 잠깐! Splunk Cloud로 log 데이터를 보내고 싶다면? 🤔
- Install Configuration을 할 때 Log Collection 기능을 Enable 해 Splunk Cloud로 데이터를 보낼수도 있지만 helm 배포 후 수정을 하고 싶으면 다음과 같은 방법으로 가능합니다. 
1. helm의 values를 values.yaml이란 파일로 만들기 
``` bash
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