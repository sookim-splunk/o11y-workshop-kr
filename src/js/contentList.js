// TODO: add MENU HERE
var CONTENTS = {
  // Splunk Ninja Workshop for Korea
  ch1: [
    {
      id: '1', // required. page ID
      title: 'Splunk Ninja Workshop for Korea', // required. Bread crumbs text
      menuName: 'Splunk Ninja Workshop for Korea', // required. Side bar text
      href: '/o11y-workshop-kr/src/1-ninja-kr/1-index.html', // required. HTML file path
      prev: '',
      next: '1-0',
      sub: [
        {
          id: '1-0', // required. page ID
          title: '0. Pre-requisites', // required. Bread crumbs text
          menuName: '0. Pre-requisites', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-0-requirements/1-0-index.html', // required. HTML file path
          prev: '1',
          next: '1-1',
          sub: [],
        },
        {
          id: '1-1', // required. page ID
          title: '1. Deploy the OpenTelemetry Collector', // required. Bread crumbs text
          menuName: '1. Deploy the OpenTelemetry Collector', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-1-DeployOpenTelemetryCollector/1-1-index.html', // required. HTML file path
          prev: '1-0',
          next: '1-2',
          sub: [],
        },
        {
          id: '1-2', // required. page ID
          title: '2. Deploy the Java Application', // required. Bread crumbs text
          menuName: '2. Deploy the Java Application', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-2-DeployJavaAPP/1-2-index.html', // required. HTML file path
          prev: '1-1',
          next: '1-3',
          sub: [],
        },
        {
          id: '1-3', // required. page ID
          title: '3. Instrument a Java Application with OpenTelemetry', // required. Bread crumbs text
          menuName: '3. Instrument a Java Application with OpenTelemetry', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-3-InstrumentJavaAPPwithOpenTelemetry/1-3-index.html', // required. HTML file path
          prev: '1-2',
          next: '1-4',
          sub: [],
        },
        {
          id: '1-4', // required. page ID
          title: '4. Dockerize the Application', // required. Bread crumbs text
          menuName: '4. Dockerize the Application', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-4-DockerizeApp/1-4-index.html', // required. HTML file path
          prev: '1-3',
          next: '1-5',
          sub: [],
        },
        {
          id: '1-5', // required. page ID
          title: '5. Add Instrumentation to Dockerfile', // required. Bread crumbs text
          menuName: '5. Add Instrumentation to Dockerfile', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-5-AddInstrumentDocker/1-5-index.html', // required. HTML file path
          prev: '1-4',
          next: '1-6',
          sub: [],
        },
        {
          id: '1-6', // required. page ID
          title: '6. Install Opentelemetry in K8s', // required. Bread crumbs text
          menuName: '6. Install Opentelemetry in K8s', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-6-InstallOtelinK8s/1-6-index.html', // required. HTML file path
          prev: '1-5',
          next: '1-7',
          sub: [],
        },
        {
          id: '1-7', // required. page ID
          title: '7. Deploy app to K8s', // required. Bread crumbs text
          menuName: '7. Deploy app to K8s', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-7-DeployAPPtoK8s/1-7-index.html', // required. HTML file path
          prev: '1-6',
          next: '1-8',
          sub: [],
        },
        {
          id: '1-8', // required. page ID
          title: '8. Zero-Code Instrumentation for K8S Application', // required. Bread crumbs text
          menuName: '8. Zero-Code Instrumentation for K8S Application', // required. Side bar text
          href: '/o11y-workshop-kr/src/1-ninja-kr/1-8-ZeroCodeInstrumentation/1-8-index.html', // required. HTML file path
          prev: '1-7',
          next: '1-9',
          sub: [],
        },
      ],
    },
  ],
  // ITSI4Rookies
  ch2: [],
  // Advanced Collector Configuraiton
  ch3: [
    {
      id: '3', // required. page ID
      title: 'Advanced Collector Configuraiton', // required. Bread crumbs text
      menuName: 'Advanced Collector Configuraiton', // required. Side bar text
      href: '/o11y-workshop-kr/src/3-advancedConfig/3-index.html', // required. HTML file path
      prev: '',
      next: '3-0',
      sub: [
        {
          id: '3-0', // required. page ID
          title: 'Pre-requisites', // required. Bread crumbs text
          menuName: 'Pre-requisites', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-0-requirements/3-0-index.html', // required. HTML file path
          prev: '3',
          next: '3-1',
          sub: [],
        },
        {
          id: '3-1', // required. page ID
          title: '1. Agent Setup', // required. Bread crumbs text
          menuName: '1. Agent Setup', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-1-agentSetup/3-1-index.html', // required. HTML file path
          prev: '3',
          next: '3-1',
          sub: [],
        },
        {
          id: '3-2', // required. page ID
          title: '2. Gateway Setup', // required. Bread crumbs text
          menuName: '2. Gateway  Setup', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-2-gateway/3-2-index.html', // required. HTML file path
          prev: '3-1',
          next: '3-3',
          sub: [],
        },
        {
          id: '3-3', // required. page ID
          title: '3. Filelog Setup', // required. Bread crumbs text
          menuName: '3. Filelog  Setup', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-3-filelog/3-3-index.html', // required. HTML file path
          prev: '3-2',
          next: '3-4',
          sub: [],
        },
        {
          id: '3-4', // required. page ID
          title: '4. Building Resilience', // required. Bread crumbs text
          menuName: '4. Building Resilience', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-4-resilience/3-4-index.html', // required. HTML file path
          prev: '3-3',
          next: '3-5',
          sub: [],
        },
        {
          id: '3-5', // required. page ID
          title: '5. Dropping Spans', // required. Bread crumbs text
          menuName: '5. Dropping Spans', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-5-droppingSpan/3-5-index.html', // required. HTML file path
          prev: '3-4',
          next: '3-6',
          sub: [],
        },
        {
          id: '3-6', // required. page ID
          title: '6. Redacting Sensitive Data', // required. Bread crumbs text
          menuName: '6. Redacting Sensitive Data', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-6-sensitive/3-6-index.html', // required. HTML file path
          prev: '3-5',
          next: '3-7',
          sub: [],
        },
        {
          id: '3-7', // required. page ID
          title: '7. Transform Data', // required. Bread crumbs text
          menuName: '7. Transform Data', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-7-transform/3-7-index.html', // required. HTML file path
          prev: '3-6',
          next: '3-8',
          sub: [],
        },
        {
          id: '3-8', // required. page ID
          title: '8. Routing Data', // required. Bread crumbs text
          menuName: '8. Routing Data', // required. Side bar text
          href: '/o11y-workshop-kr/src/3-advancedConfig/3-8-routing/3-8-index.html', // required. HTML file path
          prev: '3-7',
          next: '3-9',
          sub: [],
        },
      ],
    },
  ],
};
