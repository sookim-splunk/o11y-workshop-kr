# 2-2. Event Analytics

Splunk IT Service Intelligence(ITSI)의 **Event Analytics**는 KPI와 이벤트에서 발생하는 다양한 알람을 관리하고,  
관련성 있는 이벤트를 묶어 **노이즈를 줄이고 의미 있는 인시던트**로 전환할 수 있게 해줍니다.  
또한, **Metrics · Traces · Logs(MTL)**을 연계 분석하여 단순 알람을 넘어 **문제의 근본 원인과 맥락**까지 파악할 수 있습니다.

</br>

## 🔗 Metrics · Traces · Logs 연계 분석

Event Analytics는 KPI 알람을 단순 감지하는 수준을 넘어서,  
**Metrics · Traces · Logs**를 함께 연계하여 문제 상황을 입체적으로 분석합니다.

- **Metrics** → Checkout 서비스 에러율 급증 탐지
- **Traces** → 해당 시점 트랜잭션 경로에서 `payment-service` 지연 확인
- **Logs** → `NullPointerException` 오류 로그와 연결

👉 이런 데이터 삼각 분석(MTL)을 통해 장애의 맥락과 원인을 빠르게 파악하고, 근본적인 해결책을 제시할 수 있습니다.

</br>

## 🎯 Contextual Alerts (맥락 있는 알람)

- **Multi-KPI Alerts**를 통해 여러 KPI를 조합하여 서비스 단위에서 의미 있는 알람 생성
- 단일 KPI만으로 발생하는 불필요한 알람을 줄이고, 실제 서비스 영향에 집중할 수 있음

</br>

## 📦 Noise Reduction & Incident Grouping (노이즈 감소와 그룹화)

- **Aggregation Policies**를 사용해 유사하거나 관련된 이벤트를 Episode 단위로 집계
- 같은 서비스·호스트·알람 ID 기반으로 묶어, 운영자가 확인해야 할 **핵심 인시던트**만 남김

</br>

## 🧭 Root Cause Analysis with MTL (근본 원인 분석)

- 단순 알람을 넘어, **Metrics → Traces → Logs** 흐름을 연계 분석
- 예: 에러율 증가(Metric) → 특정 트랜잭션 지연(Trace) → 애플리케이션 오류(Log)
- 장애의 맥락과 원인을 파악해 대응 속도를 높이고 불필요한 추측을 줄임

</br>

## ⚡ Operational Value (운영 효율)

- 알람을 인시던트 단위로 관리해 **운영자 피로도(Alarm Fatigue) 감소**
- Episode Review 화면에서 서비스 중심으로 상태와 알람을 확인 → **비즈니스 영향 기반 대응**
- 자동화된 상태 전환 규칙으로 인시던트 라이프사이클을 간소화

</br>

---

## 📊 이번 단원에서 다룰 주요 기능

| 기능                     | 설명                                                  | 제공 Value                                    |
| ------------------------ | ----------------------------------------------------- | --------------------------------------------- |
| **Thresholds**           | KPI에 임계값을 정의하여 정상/주의/심각 상태로 전환    | • 문제 조기 감지<br>• KPI 기반 사전 경보      |
| **Multi-KPI Alerts**     | 여러 KPI 조건을 조합해 의미 있는 알람 생성            | • 맥락 있는 알람 제공<br>• 불필요한 알람 감소 |
| **Aggregation Policies** | 발생한 노터블 이벤트를 Episode 단위로 그룹화하여 관리 | • 알람 노이즈 감소<br>• 인시던트 단위 대응    |
