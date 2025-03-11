var _com = (function() {
  console.debug('load common.js');

  const flattern = list => {
    return list.reduce((acc, {
      id, 
      title,
      href,
      prev = '',
      next,
      parentId,
      children = [] 
    }) => {
      
      acc.push({ id, title, href, prev, next, parentId: parentId && parentId });
      if ( children.length > 0 ) {
        acc = acc.concat(flattern(children));
      }
      return acc;
    }, []);
  }

  const menu = flattern(CONTENTS);

  const getCurrentURL = () => document.querySelector('body').dataset.url;

  const setPage = pageId => {
    const url = getCurrentURL();
    const visited = JSON.parse(sessionStorage.getItem('workshop-visited')) || {};
    visited[`${url}`] = 1;
    sessionStorage.setItem('workshop-visited', JSON.stringify(visited));

    loadTopBar(pageId);
    loadSideBar(pageId);
  };

  const loadTopBar = pageId => {
    fetch('./src/layout/topbar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-topbar').innerHTML = html;
        
        const tobBar = createTobBarElements(pageId);
        document.querySelector('#breadcrumbs').innerHTML = tobBar.path;
        document.querySelector('#topbar-control-prev').href = tobBar.prev;
        document.querySelector('#topbar-control-next').href = tobBar.next;
        
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const createTobBarElements = pageId => {
    const result = {
      path: '',
      next: '',
      prev: '',
    };

    const pathArr = [];

    const curPage = getTargetMenu(pageId, menu);
    if ( curPage ) {
      if ( curPage.prev ) {
        const prev = getTargetMenu(curPage.prev, menu);
        result.prev = prev.href || '';
      } 

      if ( curPage.next ) {
        const next = getTargetMenu(curPage.next, menu);
        result.next = next.href || '';
      }

      setPathArr(curPage, pathArr, menu);
    }
    
    let pathStr = '';
    pathArr.forEach((el, idx) => {
      pathStr += `
        <li 
          itemscope="" 
          itemtype="https://schema.org/ListItem"
          itemprop="itemListElement"
        >
      `;

      if ( el.id !== pageId ) {
        pathStr += `<a itemprop="item" href="${ el.href }">`;
      }

      pathStr += `<span itemprop="name">${ el.title }</span>`;

      if ( el.id !== pageId ) {
        pathStr += `</a>`;
      }

      pathStr += `<meta itemprop="position" content="${ idx + 1 }">`;

      if ( idx + 1 < pathArr.length ) {
        pathStr += `&nbsp;&gt;&nbsp`;
      }

      pathStr += '</li>';
    });

    result.path = pathStr;
    return result;
  };

  const getTargetMenu = (id, list) => {
    const matched = list.find(el => el.id === id);
    return matched;
  };
  
  const setPathArr = (curPage, pathArr, list) => {
    if ( curPage ) {
      pathArr.unshift(curPage);
    }

    if ( !curPage || !curPage.parentId ) {
      return pathArr;
    }

    const parent = getTargetMenu(curPage.parentId, list);
    return setPathArr(parent, pathArr, list);
  }

  const loadSideBar = pageId => {
    fetch('./src/layout/sidebar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-sidebar').innerHTML = html;
        // let sideHTML = '';
        // sideHTML = createMenuHTML('', sideHTML, CONTENTS);
        // document.querySelector('#menu-list').innerHTML = sideHTML;

        const url = getCurrentURL();
        const curPageObj = menu.find(el => el.href === url);
        if ( curPageObj ) {
          const target = document.querySelector(`li[data-nav-id="${ url }"`);
          if ( target ) {
            target.classList.add('active');
          }
        }

        const visited = JSON.parse(sessionStorage.getItem('workshop-visited')) || {};
        Object.keys(visited).forEach(url => {
          const target = document.querySelector(`li[data-nav-id="${ url }"`);
          if ( target ) {
            target.classList.add('visited');
          }
        });
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const createMenuHTML = (parentId = '', htmlStr, list) => {
    if ( parentId ) {
      htmlStr += `<ul id="R-subsections-${ parentId }" class="collapsible-menu">`;
    }
    
    list.forEach(({
      id,
      depth,
      menuName,
      href,
      sub = [],
    }) => {
      htmlStr += `
        <li data-nav-id="/src${ href }">
          <input
            type="checkbox"
            id="side-section-${ id }"
            aria-controls="side${ sub.length > 0 ? `-subsections-${ sub[0].id }0` : `-` }"
          >
          <label for=side-section-${ id }">
            <i class="fa-fw fas fa-chevron-right"></i>
            <span class="a11y-only">Submenu ${ menuName }</span>
          </label>
          <a class="padding" href="/src${ href }">
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
