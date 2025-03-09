var CONTENTS = [
  {
    id: '',
    title: 'Splunk Observability Workshops',
    href: '/workshop/src/index.html',
    prev: '',
    next: '1',
    children: [
      {
        id: '1',
        depth: 0,
        menuName: 'ITSI4Rookies🐥',
        title: 'ITSI4Rookies🐥',
        href: '/workshop/src/ITSI4Rookies/index.html',
        prev: '1',
        next: '1-1',
        children: [
          {
            id: '1-1',
            depth: 1,
            parentId: '1',
            menuName: 'Optimize Cloud Monitoring',
            title: 'Optimize Cloud Monitoring',
            href: '/workshop/src/ITSI4Rookies/optimize-cloud-monitoring/test.html',
            children: [
              {
                id: '1-1-1',
                depth: 2,
                parentId: '1-1',
                menuName: '1. Getting Started',
                title: 'Getting Started',
                href: '/workshop/src/ITSI4Rookies/optimize-cloud-monitoring/1-getting-started/test2.html',
              }
            ],
          },
        ],
      },
      {
        id: '2',
        depth: 0, 
        menuName: `
          Ninja Workshops
          <i class="fa fa-user-ninja"></i>
          <i class="fa-fw fas fa-check read-icon"></i>
        `,
        title: `Ninja Workshops`,
        href: '/workshop/src/ninja-workshop/index.html',
      }
    ],
  },
];