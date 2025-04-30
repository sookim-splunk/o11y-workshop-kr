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
          title: 'Pre-requisites', // required. Bread crumbs text
          menuName: 'Pre-requisites', // required. Side bar text
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
  backup: [
    {
      id: '0', // required. page ID
      title: 'Splunk Observability Workshops', // required. Bread crumbs text
      menuName: 'Splunk Observability Workshops', // required. Side bar text
      href: '/o11y-workshop-kr/index.html', // required. HTML file path
      prev: '',
      next: '1',
      sub: [],
    },
    {
      id: '1', // required. page ID
      title: 'Splunk O11y Cloud A to Z', // required. Bread crumbs text
      menuName: 'Splunk O11y Cloud A to Z', // required. Side bar text
      href: '/o11y-workshop-kr/src/ITSI4Rookies/index.html', // required. HTML file path
      prev: '0',
      next: '1-1',
      sub: [
        {
          id: '1-1', // required. page ID
          title: 'Service Insights', // required. Bread crumbs text
          menuName: 'Service Insights', // required. Side bar text
          href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/index.html', // required. HTML file path
          prev: '1',
          next: '1-1-1',
          sub: [
            {
              id: '1-1-1', // required. page ID
              title: 'Services / KPIs/ Entities / SHC', // required. Bread crumbs text
              menuName: 'Services / KPIs/ Entities / SHC', // required. Side bar text
              href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/1-1-skes/index.html', // required. HTML file path
              prev: '1-1',
              next: '1-1-1-1',
              sub: [
                {
                  id: '1-1-1-1', // required. page ID
                  title: '첫번째 핸즈온', // required. Bread crumbs text
                  menuName: '첫번째 핸즈온', // required. Side bar text
                  href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/1-1-skes/index.html', // required. HTML file path
                  prev: '1-1-1',
                  next: '1-1-1-2',
                  sub: [],
                },
                {
                  id: '1-1-1-2', // required. page ID
                  title: '두번째 핸즈온', // required. Bread crumbs text
                  menuName: '두번째 핸즈온', // required. Side bar text
                  href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/1-1-skes/index.html', // required. HTML file path
                  prev: '1-1-1-1',
                  next: '1-1-1-3',
                  sub: [],
                },
                {
                  id: '1-1-1-3', // required. page ID
                  title: '세번째 핸즈온', // required. Bread crumbs text
                  menuName: '세번째 핸즈온', // required. Side bar text
                  href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/1-1-skes/index.html', // required. HTML file path
                  prev: '1-1-1-2',
                  next: '1-1-2',
                  sub: [],
                },
              ],
              // endd of Services / KPIs/ Entities / SHC
            },
            {
              id: '1-1-2', // required. page ID
              title: 'Deep Dives', // required. Bread crumbs text
              menuName: 'Deep Dives', // required. Side bar text
              href: '', // required. HTML file path
              prev: '1-1-1-3',
              next: '1-1-2-1',
              sub: [
                {
                  id: '1-1-2-1', // required. page ID
                  title: '첫번째 핸즈온', // required. Bread crumbs text
                  menuName: '첫번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-2',
                  next: '1-1-2-2',
                  sub: [],
                },
                {
                  id: '1-1-2-2', // required. page ID
                  title: '두번째 핸즈온', // required. Bread crumbs text
                  menuName: '두번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-2-1',
                  next: '1-1-2-3',
                  sub: [],
                },
                {
                  id: '1-1-2-3', // required. page ID
                  title: '두번째 핸즈온', // required. Bread crumbs text
                  menuName: '두번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-2-2',
                  next: '1-1-3',
                  sub: [],
                },
              ],
              // end of Deep Dives
            },
            {
              id: '1-1-3', // required. page ID
              title: 'Glass Tables', // required. Bread crumbs text
              menuName: 'Glass Tables', // required. Side bar text
              href: '', // required. HTML file path
              prev: '1-1-2-3',
              next: '1-1-3-1',
              sub: [
                {
                  id: '1-1-3-1', // required. page ID
                  title: '첫번째 핸즈온', // required. Bread crumbs text
                  menuName: '첫번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-3',
                  next: '1-1-3-2',
                  sub: [],
                },
                {
                  id: '1-1-3-2', // required. page ID
                  title: '두번째 핸즈온', // required. Bread crumbs text
                  menuName: '두번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-3-1',
                  next: '1-1-3-3',
                  sub: [],
                },
                {
                  id: '1-1-3-3', // required. page ID
                  title: '두번째 핸즈온', // required. Bread crumbs text
                  menuName: '두번째 핸즈온', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-1-3-2',
                  next: '1-2',
                  sub: [],
                },
              ],
            },
          ],
          // end of Service Insights
        },
        {
          id: '1-2', // required. page ID
          title: 'Event Analytics', // required. Bread crumbs text
          menuName: 'Event Analytics', // required. Side bar text
          href: '', // required. HTML file path
          prev: '1-1-3-3',
          next: '1-2-1',
          sub: [
            {
              id: '1-2-1', // required. page ID
              title: 'Tagging Workshop', // required. Bread crumbs text
              menuName: 'Tagging Workshop', // required. Side bar text
              href: '', // required. HTML file path
              prev: '1-2',
              next: '1-2-1-1',
              sub: [
                {
                  id: '1-2-1-1', // required. page ID
                  title: '1. Build the Sample Application', // required. Bread crumbs text
                  menuName: '1. Build the Sample Application', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1',
                  next: '1-2-1-2',
                  sub: [],
                },
                {
                  id: '1-2-1-2', // required. page ID
                  title: '2. What are Tags?', // required. Bread crumbs text
                  menuName: '2. What are Tags?', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-1',
                  next: '1-2-1-3',
                  sub: [],
                },
                {
                  id: '1-2-1-3', // required. page ID
                  title: '3. Capture Tags with OpenTelemetry', // required. Bread crumbs text
                  menuName: '3. Capture Tags with OpenTelemetry', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-2',
                  next: '1-2-1-3-1',
                  sub: [
                    {
                      id: '1-2-1-3-1', // required. page ID
                      title: '1. Capture Tags - Java', // required. Bread crumbs text
                      menuName: '1. Capture Tags - Java', // required. Side bar text
                      href: '', // required. HTML file path
                      prev: '1-2-1-3',
                      next: '1-2-1-3-2',
                      sub: [],
                    },
                    {
                      id: '1-2-1-3-2', // required. page ID
                      title: '2. Capture Tags - Python', // required. Bread crumbs text
                      menuName: '2. Capture Tags - Python', // required. Side bar text
                      href: '', // required. HTML file path
                      prev: '1-2-1-3-1',
                      next: '1-2-1-4',
                      sub: [],
                    },
                  ],
                  // end of 3. Capture Tags with OpenTelemetry
                },
                {
                  id: '1-2-1-4', // required. page ID
                  title: '4. Explore Trace Data', // required. Bread crumbs text
                  menuName: '4. Explore Trace Data', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-3-2',
                  next: '1-2-1-5',
                  sub: [],
                },
                {
                  id: '1-2-1-5', // required. page ID
                  title: '5. Index Tags', // required. Bread crumbs text
                  menuName: '5. Index Tags', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-4',
                  next: '1-2-1-6',
                  sub: [],
                },
                {
                  id: '1-2-1-6', // required. page ID
                  title: '6. Use Tags for Troubleshooting', // required. Bread crumbs text
                  menuName: '6. Use Tags for Troubleshooting', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-5',
                  next: '1-2-1-7',
                  sub: [],
                },
                {
                  id: '1-2-1-7', // required. page ID
                  title: '7. Use Tags for Monitoring', // required. Bread crumbs text
                  menuName: '7. Use Tags for Monitoring', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-6',
                  next: '1-2-1-7-1',
                  sub: [
                    {
                      id: '1-2-1-7-1', // required. page ID
                      title: '1. ...with Dashboards', // required. Bread crumbs text
                      menuName: '1. ...with Dashboards', // required. Side bar text
                      href: '', // required. HTML file path
                      prev: '1-2-1-7',
                      next: '1-2-1-7-2',
                      sub: [],
                    },
                    {
                      id: '1-2-1-7-2', // required. page ID
                      title: '2. ...with Alerting', // required. Bread crumbs text
                      menuName: '2. ...with Alerting', // required. Side bar text
                      href: '', // required. HTML file path
                      prev: '1-2-1-7-1',
                      next: '1-2-1-7-3',
                      sub: [],
                    },
                    {
                      id: '1-2-1-7-3', // required. page ID
                      title: '3. ...with SLOs', // required. Bread crumbs text
                      menuName: '3. ...with SLOs', // required. Side bar text
                      href: '', // required. HTML file path
                      prev: '1-2-1-7-2',
                      next: '1-2-1-8',
                      sub: [],
                    },
                  ],
                  // end of 7. Use Tags for Monitoring
                },
                {
                  id: '1-2-1-8', // required. page ID
                  title: '8. Summary', // required. Bread crumbs text
                  menuName: '8. Summary', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-1-7-3',
                  next: '1-2-2',
                  sub: [],
                },
              ],
              // end of Tagging Workshop
            },
            {
              id: '1-2-2', // required. page ID
              title: 'Profiling Workshop', // required. Bread crumbs text
              menuName: 'Profiling Workshop', // required. Side bar text
              href: '', // required. HTML file path
              prev: '1-2-1-8',
              next: '1-2-2-1',
              sub: [
                {
                  id: '1-2-2-1', // required. page ID
                  title: '1. Build the Sample Application', // required. Bread crumbs text
                  menuName: '1. Build the Sample Application', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2',
                  next: '1-2-2-2',
                  sub: [],
                },
                {
                  id: '1-2-2-2', // required. page ID
                  title: '2. Troubleshoot Game Startup', // required. Bread crumbs text
                  menuName: '2. Troubleshoot Game Startup', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2-1',
                  next: '1-2-2-3',
                  sub: [],
                },
                {
                  id: '1-2-2-3', // required. page ID
                  title: '3. Enable AlwaysOn Profiling', // required. Bread crumbs text
                  menuName: '3. Enable AlwaysOn Profiling', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2-2',
                  next: '1-2-2-4',
                  sub: [],
                },
                {
                  id: '1-2-2-4', // required. page ID
                  title: '4. Fix Application Startup Slowness', // required. Bread crumbs text
                  menuName: '4. Fix Application Startup Slowness', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2-3',
                  next: '1-2-2-5',
                  sub: [],
                },
                {
                  id: '1-2-2-5', // required. page ID
                  title: '5. Fix In Game Slowness', // required. Bread crumbs text
                  menuName: '5. Fix In Game Slowness', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2-4',
                  next: '1-2-2-6',
                  sub: [],
                },
                {
                  id: '1-2-2-6', // required. page ID
                  title: '6. Summary', // required. Bread crumbs text
                  menuName: '6. Summary', // required. Side bar text
                  href: '', // required. HTML file path
                  prev: '1-2-2-5',
                  next: '1-3',
                  sub: [],
                },
              ],
              // end of Profiling Workshop
            },
          ],
          // end of Event Analytics
        },
        {
          id: '1-3', // required. page ID
          title: 'Optimize End User Experiences', // required. Bread crumbs text
          menuName: 'Optimize End User Experiences', // required. Side bar text
          href: '/o11y-workshop-kr/src/index.html', // required. HTML file path
          prev: '1-2-2-6',
          next: '1-3-1',
          sub: [],
          // end of Optimize End User Experiences
        },
      ],
      // end of Splunk O11y Cloud A to Z
    },
    {
      id: '2', // required. page ID
      title: 'ITSI4Rookies', // required. Bread crumbs text
      menuName: 'ITSI4Rookies', // required. Side bar text
      href: '/o11y-workshop-kr/src/index2.html', // required. HTML file path
      prev: '1-3',
      next: '3',
      sub: [],
    },
    {
      id: '3', // required. page ID
      title: 'Advanced Collector Configuraiton', // required. Bread crumbs text
      menuName: 'Advanced Collector Configuraiton', // required. Side bar text
      href: '/o11y-workshop-kr/src/3-advancedConfig/3-index.html', // required. HTML file path
      prev: '2',
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
      ],
    },
  ],
};
