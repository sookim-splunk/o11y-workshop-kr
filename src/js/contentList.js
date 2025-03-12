// TODO: add MENU HERE
var CONTENTS = [
  {
    id: '0', // required. page ID
    title: 'Splunk Observability Workshops', // required. Bread crumbs text
    href: '/o11y-workshop-kr/src/index.html', // required. HTML file path
    prev: '',
    next: '1',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'ITSI4Rookies🐥',
        href: '/o11y-workshop-kr/src/ITSI4Rookies/index.html',
        prev: '1',
        next: '1-1',
        children: [
          {
            id: '1-1',
            parentId: '1',
            title: 'Service Insights',
            href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/index.html',
            prev: '1-1',
            next: '1-1-1',
            children: [
              {
                id: '1-1-1',
                parentId: '1-1',
                menuName: 'Services/KPIs/Entities/SHS',
                title: 'Getting Started',
                href: '/o11y-workshop-kr/src/ITSI4Rookies/1-service-insights/1-1-skes/index.html',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        parentId: '0',
        title: `Ninja Workshops`,
        href: '/o11y-workshop-kr/src/ninja-workshop/index.html',
      },
    ],
  },
];
