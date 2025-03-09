var _com = (function() {
  console.debug('load common.js');

  const setPage = pageId => {
    loadTopBar(pageId);
    loadSideBar(pageId);
  };

  const loadTopBar = pageId => {
    fetch('/workshop/src/layout/topbar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-topbar').innerHTML = html;
        document.querySelector('#breadcrumbs').innerHTML = `
          <li itemscope="" itemtype="https://schema.org/ListItem" itemprop="itemListElement">
            <a itemprop="item" href=c>
              <span itemprop="name">Splunk Observability Workshops</span>
            </a>
            <meta itemprop="position" content="1">&nbsp;&gt;&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement>
            <a itemprop="item" href=/observability-workshop/v5.83/en/ninja-workshops/index.html>
              <span itemprop="name">Ninja Workshops</span>
            </a>
            <meta itemprop=position content="2">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement>
            <a itemprop="item" href=/observability-workshop/v5.83/en/ninja-workshops/1-automatic-discovery/index.html>
              <span itemprop="name">Automatic Discovery Workshops</span>
            </a>
            <meta itemprop=position content="3">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><a itemprop=item
              href=/observability-workshop/v5.83/en/ninja-workshops/1-automatic-discovery/1-petclinic-monolith/index.html><span
                itemprop=name>PetClinic Monolith Workshop</span></a>
            <meta itemprop=position content="4">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><span itemprop=name>2. Building
              PetClinic</span>
            <meta itemprop=position content="5">
          </li><li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><a itemprop=item
              href=/observability-workshop/v5.83/en/ninja-workshops/index.html><span itemprop=name>Ninja
                Workshops</span></a>
            <meta itemprop=position content="2">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><a itemprop=item
              href=/observability-workshop/v5.83/en/ninja-workshops/1-automatic-discovery/index.html><span
                itemprop=name>Automatic Discovery Workshops</span></a>
            <meta itemprop=position content="3">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><a itemprop=item
              href=/observability-workshop/v5.83/en/ninja-workshops/1-automatic-discovery/1-petclinic-monolith/index.html><span
                itemprop=name>PetClinic Monolith Workshop</span></a>
            <meta itemprop=position content="4">&nbsp;>&nbsp;
          </li>
          <li itemscope itemtype=https://schema.org/ListItem itemprop=itemListElement><span itemprop=name>2. Building
              PetClinic</span>
            <meta itemprop=position content="5">
          </li>
        `;
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const loadSideBar =  pageId => {
    fetch('/workshop/src/layout/sidebar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-sidebar').innerHTML = html;
        // document.querySelector('#menu-list')
        let sideHTML = '';
        sideHTML = createMenuHTML('', sideHTML, CONTENTS);
        console.log('2342');
        document.querySelector('#menu-list').innerHTML = sideHTML;
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const createMenuHTML = (parentId = '', htmlStr, list) => {
    if ( parentId ) {
      htmlStr += `<ul id="side-section-${ parentId }" class="collapsible-menu">`;
    }
    
    list.forEach(({
      id,
      depth,
      menuName,
      href,
      sub = [],
    }) => {
      htmlStr += `
        <li data-nav-id="/workshop/src${ href }">
          <input
            type="checkbox"
            id="side-section-${ id }"
            aria-controls="side${ sub.length > 0 ? `-subsections-${ sub[0].id }0` : `-` }"
          >
          <label for=side-section-${ id }">
            <i class="fa-fw fas fa-chevron-right"></i>
            <span class="a11y-only">Submenu ${ menuName }</span>
          </label>
          <a class="padding" href="/workshop/src${ href }">
            ${ menuName }
            <i class="fa-fw fas fa-check read-icon"></i>
          </a>
      `;

      if ( sub.length > 0 ) {
        htmlStr += createMenuHTML(id, htmlStr, sub);
      }

      htmlStr += '</li>';
    });
    
    if ( parentId ) {
      htmlStr += `</ul>`;
    }

    return htmlStr;
  };

  return {
    setPage: pageId => setPage(pageId),

  };
})();

window.T_Copied_to_clipboard = `Copied to clipboard!`; 
window.T_Copy_link_to_clipboard = `Copy link to clipboard`;
window.T_Link_copied_to_clipboard = `Copied link to clipboard!`; 
window.T_Reset_view = `Reset view`; 
window.T_View_reset = `View reset!`; 
window.T_No_results_found = `No results found for "{0}"`; 
window.T_N_results_found = `{1} results found for "{0}"`;