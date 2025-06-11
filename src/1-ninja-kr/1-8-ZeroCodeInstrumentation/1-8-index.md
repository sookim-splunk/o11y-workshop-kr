# 8. Zero-Code Instrumentation for K8S Application

**Zero-Code 란? 설명 작성**

기존에 Auto-Instrumentation 이라고 명명하였으나, 현재는 Zero-Code 계측으로 이름이 변경되었고, Manual Instrumentation 의 경우 코드 기반 계측으로 용어가 변경되었습니다.

자세한 내용은 업스트림 OpenTelemetry Collector 문서를 참조하세요: https://opentelemetry.io/docs/concepts/instrumentation/zero-code/

## Zero-Code Instrumentation 🤷‍♂️❓

제로코드 계측을 사용하면 애플리케이션 소스 파일을 수정하지 않고도 애플리케이션을 계측하고 원격 측정 데이터를 내보낼 수 있습니다.
언어별 계측 에이전트는 소스 애플리케이션이 지원되는 형식으로 OTLP 수신기나 Splunk Observability Cloud 백엔드에서 OTLP 엔드포인트로 데이터를 내보내도록 구성합니다.

![Zero-Code Instrumentation](https://splunk.deploy.heretto.com/v4/deployments/lbx3FHoDR4kUISPo5g64/object/74aca22c-b595-4d71-a647-cd81959e3098?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2pvcnNlay5jb20vZXpkX29yZ2FuaXphdGlvbiI6InNwbHVuayIsImh0dHBzOi8vam9yc2VrLmNvbS9lemQvb2JqZWN0X3V1aWQiOiI3NGFjYTIyYy1iNTk1LTRkNzEtYTY0Ny1jZDgxOTU5ZTMwOTgiLCJleHAiOjE3NDk1MzYyNDAsImp0aSI6ImI1MmEwOWZkYWU4ZDQyNWJiOWEzNDU2MzdjMDA5MjhjIiwiaHR0cHM6Ly9qb3JzZWsuY29tL2V6ZF9maWxlc2V0IjoibDRZUlFCVjR5anQzbEFqV0lSTmoifQ.F8eN8VSqPMbrB90wUtHq8uzEqPKQ55j1mxz3ORXDFBE)

Java, Node.js, .NET, Go, Python, Ruby, PHP로 작성된 애플리케이션에 대해 제로코드 계측을 사용할 수 있으며, 각 언어에서 지원되는 라이브러리를 사용하여 작성된 코드에 대한 원격 측정 데이터를 자동으로 수집합니다.

자동 검색과 제로코드 계측은 유사한 기능을 제공하지만 서로 별개의 기능입니다. 자동 검색과 제로코드 계측은 모두 원격 측정 데이터를 수집하여 Splunk Observability Cloud로 전송하지만, 몇 가지 주요 세부 사항에서 차이가 있습니다.

자동 검색과 제로코드 계측의 주요 차이점은 다음 표를 참조하세요.

| Capability               | Zero-Code Instrumentation                                                                             | Automatic Discovery                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Deployment               | 언어 별 계측 에이전트 형태로 배포됩니다                                                               | Splunk OTel Collector 배포판 에이전트에 옵션 추가 기능으로 배포됩니다    |
| Application Instrumented | Python, Java, Node.JS 등 백엔드 애플리케이션에 한해서 배포가능합니다                                  | 데이터베이스 및 웹서버와 같은 타 서비스에서 원격측정 데이터를 수집합니다 |
| Languages Instrumented   | 언어 별 에이전트가 상이하며 Node.js 에이전트 배포시 Node.js에 대한 애플리케이션 계측정보만 수집합니다 | 자동 검색 자체는 언어 런타임을 계측하지 않습니다                         |

## 8-1. 기존 Application 종료하기

코드 변경 없이 Java APM 연동을 하기 위해서 JAVA Instrument 설정이 들어간 기존 Application을 종료합니다

```bash
kubectl delete -f ./k8s-deployment-manual.yaml
```

아래 명령어로 application 이 종료 되었는지 확인합ㅎ니다

```bash
kubectl get pods
```

## 8-2. K8S App 구동하기

아무 설정도 되어있지 않은 Hello World 앱을 다시 구동시킵니다

```bash
kubectl apply -f ./k8s-deployment.yaml
```

아래 명령어를 통해 Application 이 제대로 실행되고 있는지 확인합니다

```bash
kubectl get all -n hellojava
```

현재의 app pod 의 Deployment 정보를 조회해서 확인 해 봅니다

```bash
kubectl get deployment hello-java
```

```bash
deployment 정보 첨부
```

## 8-3. Zero-Code Instrumentation
