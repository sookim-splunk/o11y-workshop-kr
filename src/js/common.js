var _com = (function() {
  console.debug('load common.js');

  let VALID_MENU;
  let FLATTERNED_MENU;

  const flattern = list => {
    return list.reduce((acc, {
      id, 
      title,
      href,
      prev,
      next,
      sub = [] 
    }) => {
      let parentId = '';
      if ( id.indexOf('-') > -1 ) {
        parentId = id.substring(0, id.lastIndexOf('-'));
      }

      acc.push({ id, title, href, prev, next, parentId: parentId && parentId });
      if ( sub.length > 0 ) {
        acc = acc.concat(flattern(sub));
      }
      return acc;
    }, []);
  }

  // const menu = flattern(CONTENTS);

  const getCurrentURL = () => document.querySelector('body').dataset.url;

  const setPage = pageId => {
    const url = getCurrentURL();
    const visited = JSON.parse(sessionStorage.getItem('workshop-visited')) || {};
    visited[`${url}`] = 1;
    sessionStorage.setItem('workshop-visited', JSON.stringify(visited));

    const homeId = pageId.substring(0, 1);
    VALID_MENU = CONTENTS[`ch${ homeId }`];
    FLATTERNED_MENU = flattern(VALID_MENU);

    document.querySelector('#logo').href = FLATTERNED_MENU.find(el => el.id === homeId)?.href || '';

    loadTopBar(pageId);
    loadSideBar(pageId);
  };

  const loadTopBar = pageId => {
    fetch("/o11y-workshop-kr/src/layout/topbar.html")
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-topbar').innerHTML = html;
        
        const topBar = createTopBarElements(pageId);
        document.querySelector('#breadcrumbs').innerHTML = topBar.path;
        document.querySelector('#topbar-control-prev').href = topBar.prev;
        document.querySelector('#topbar-control-next').href = topBar.next;
        
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const createTopBarElements = pageId => {
    const result = {
      path: '',
      next: '',
      prev: '',
    };

    const pathArr = [];

    const curPage = getTargetMenu(pageId, FLATTERNED_MENU);
    if ( curPage ) {
      if ( curPage.prev ) {
        const prev = getTargetMenu(curPage.prev, FLATTERNED_MENU);
        result.prev = prev?.href || '';
      } else {

      }

      if ( curPage.next ) {
        const next = getTargetMenu(curPage.next, FLATTERNED_MENU);
        result.next = next?.href || '';
      }

      setPathArr(curPage, pathArr, FLATTERNED_MENU);
    }
    
    // if ( pageId !== '0' )  {
    //   const home = menu.find(el => el.id === '0');
    //   pathArr.unshift(home);
    // }

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

  const openMenuOnPath = curPageObj => {
    const target = document.querySelector(`#R-shortcutmenu-home #R-section-${ curPageObj.id }`);
    if ( target ) {
      target.checked = true;
    }
    // document.querySelector(`#R-shortcutmenu-home #R-section-${ curPageObj.id }`)?.checked = true;

    const li = document.querySelector(`#R-shortcutmenu-home li[data-nav-id="${ curPageObj.href }"`);
    if ( li ) {
      li.classList.add('parent');
    }
    // document.querySelector(`#R-shortcutmenu-home li[data-nav-id="${ curPageObj.href }"`)?.classList.add('parent');
    
    if ( curPageObj?.parentId ) {
      const parentPageObj = FLATTERNED_MENU.find(el => el.id === curPageObj.parentId);
      if ( parentPageObj ) {
        openMenuOnPath(parentPageObj);
      }
    }
  };

  const loadSideBar = pageId => {
    fetch("/o11y-workshop-kr/src/layout/sidebar.html")
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-sidebar').innerHTML = html;
        
        let sideHTML = '';
        sideHTML = createMenuHTML('', VALID_MENU);
        document.querySelector('#R-shortcutmenu-home').innerHTML = sideHTML;

        const url = getCurrentURL();
        const curPageObj = FLATTERNED_MENU.find(el => el.href === `/o11y-workshop-kr/src/${ url }`);
        if ( curPageObj ) {
          const target = document.querySelector(`#R-shortcutmenu-home li[data-nav-id="${ curPageObj.href }"`);
          if ( target ) {
            target.classList.add('active');
          }
          openMenuOnPath(curPageObj);
        }

        psm = new PerfectScrollbar('#R-content-wrapper', { scrollingThreshold: 2000, swipeEasing: false, wheelPropagation: false });

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

  const createMenuHTML = (parentId, list) => {
    let htmlStr = '';
    if ( !parentId ) {
      htmlStr += `<ul class="enlarge morespace collapsible-menu">`;
    } else {
      htmlStr += `<ul id="R-subsections-${ parentId }" class="collapsible-menu">`;
    }
    
    list.forEach(({
      id,
      menuName,
      href,
      sub = [],
    }) => {
      htmlStr += `
        <li data-nav-id="${ href }">
          ${ sub.length > 0 ? `
            <input type="checkbox" id="R-section-${ id }" aria-controls="R-subsections-${ id }">
            <label for="R-section-${ id }">
              <i class="fa-fw fas fa-chevron-right"></i>
              <span class="a11y-only">Submenu ${ menuName }</span>
            </label>
            ` : ''}
          <a class="padding" href="${ href }">
            ${ menuName }
            <i class="fa-fw fas fa-check read-icon"></i>
          </a>
          ${ sub.length > 0 ? createMenuHTML(id, sub) : '' }
        </li>
      `;
    });

    htmlStr += '</ul>';

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
