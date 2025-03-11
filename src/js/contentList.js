// TODO: add MENU HERE
var CONTENTS = [
  {
    id: '0',                                  // required. page ID
    title: 'Splunk Observability Workshops',  // required. Bread crumbs text
    href: './src/index.html',         // required. HTML file path
    prev: '',
    next: '1',
    children: [
      {
        id: '1',
        parentId: '0',
        title: 'ITSI4Rookies🐥',
        href: './src/ITSI4Rookies/index.html',
        prev: '1',
        next: '1-1',
        children: [
          {
            id: '1-1',
            parentId: '1',
            title: 'Optimize Cloud Monitoring',
            href: './src/ITSI4Rookies/optimize-cloud-monitoring/test.html',
            children: [
              {
                id: '1-1-1',
                parentId: '1-1',
                menuName: '1. Getting Started',
                title: 'Getting Started',
                href: './src/ITSI4Rookies/optimize-cloud-monitoring/1-getting-started/test2.html',
              }
            ],
          },
        ],
      },
      {
        id: '2',
        parentId: '0',
        title: `Ninja Workshops`,
        href: './src/ninja-workshop/index.html',
      }
    ],
  },
];
