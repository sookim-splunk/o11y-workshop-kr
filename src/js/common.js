var _com = (function() {
  console.debug('load common.js');

  const setPage = pageId => {
    loadTopBar(pageId);
    loadSideBar();
  };

  const loadTopBar = (pageId = '') => {
    fetch('/workshop/src/layout/topbar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-topbar').innerHTML = html;
        // document.querySelector('#breadcrumbs').innerHTML = `
          
        // `;
        
        const tobBar = createTobBarElements(pageId, CONTENTS);
        document.querySelector('#topbar-control-prev').href = tobBar.prev;
        document.querySelector('#topbar-control-next').href = tobBar.next;
        
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  const createTobBarElements = (pageId, list) => {
    const result = {
      next: '',
      prev: '',
    };

    let path = '';

    const matched = getTargetMenu(pageId);
    if ( matched ) {
      if ( matched.prev ) {
        const prev = getTargetMenu(matched.prev);

        if ( prev ) {
          result.prev = prev.href;
        }
      } 

      if ( matched.next ) {
        const next = getTargetMenu(matched.next);

        if ( next ) {
          result.next = next.href;
        }
      }
    }
   
    return result;
  };

  const getTargetMenu = id => {
    const matched = CONTENTS.flat().find(el => el.id === id);
    return matched;
  };

  // const getBreadCrumbs = (str, id) => {
  //   const matched = getTargetMenu(id);
  //   if ( matched ) {
  //     if ( matched.next ) {

  //     }
  //     if ( !matched.next ) {
        
  //     }
  //   } 
    
  // };

  const loadSideBar =  pageId => {
    fetch('/workshop/src/layout/sidebar.html')
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-sidebar').innerHTML = html;
        // let sideHTML = '';
        // sideHTML = createMenuHTML('', sideHTML, CONTENTS);
        // document.querySelector('#menu-list').innerHTML = sideHTML;
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