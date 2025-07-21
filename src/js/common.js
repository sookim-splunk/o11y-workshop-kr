var _com = (function() {
  console.debug('load common.js');

  // 메뉴 처리를 위한 변수 선언
  let VALID_MENU;       // 화면 진입에 맞춰 side bar에 렌더해야 하는 메뉴 목록
  let FLATTERNED_MENU;  // top bar 구성 등을 위해 메뉴 목록 트리구조 평탄화

  /**
   * 메뉴 트리 구조 평탄화
   * 
   * @param       list - 트리 구조 메뉴 목록
   * @return      메뉴 목록
   * @description top bar 렌더를 위해 트리 구조로 되어 있는 메뉴 목록을 평탄화
   */
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
      } else if ( id !== '0' ) {
        // 각 챕터의 최상위 페이지일 경우
        parentId = '0';
      }

      acc.push({ id, title, href, prev, next, parentId: parentId && parentId });
      if ( sub.length > 0 ) {
        acc = acc.concat(flattern(sub));
      }
      return acc;
    }, []);
  };


  /**
   * 최상단 화면 ID 반환
   * 
   * @param       pageId - 현재 페이지 id
   * @return      최상단 화면 ID
   * @description 
   *  - 현재 페이지의 최상단 화면 ID를 반환
   *  - 메뉴 트리 구조 처리의 용이를 위해 contentList.js에 화면 id 정의 시 최상단 화면 ID로 시작하는 값을 입력한다고 가정
   */
  const getHomeId = pageId => pageId.substring(0, 1);

  
  /**
   * 화면별 필수 요소 세팅
   * 
   * @param       pageId - 대상 화면의 page id (contentList.js 에서 정의한 id와 동일한 값 전달)
   * @description 
   *  - 화면 렌더용 HTML 진입 시 필요한 컴포넌트를 동적으로 세팅 & 렌더
   *  - 모든 HTML 페이지의 DOMContentLoaded 이벤트에서 반드시 실행하도록 선언
   * @example
   *    document.addEventListener('DOMContentLoaded', () => _com.setPage('1')); 
   */
  const setPage = pageId => {
    VALID_MENU = [ ...CONTENTS ];
    FLATTERNED_MENU = flattern(VALID_MENU);

    // 사이드바에 최상단 루트 메뉴를 제거한 나머지 메뉴를 렌더하기 위해 추가 가공
    VALID_MENU = [ ...VALID_MENU[0].sub ];
    
    // 현재 진입하려는 화면의 HTML 경로 탐색
    const url = FLATTERNED_MENU.find(el => el.id === pageId)?.href;

    // 방문한 페이지 목록에 현재 진입하려는 화면 추가
    const visited = JSON.parse(sessionStorage.getItem('workshop-visited')) || {};
    visited[`${url}`] = 1;
    sessionStorage.setItem('workshop-visited', JSON.stringify(visited));

    // top bar & side bar 렌더
    loadTopBar(pageId);
    loadSideBar(pageId);
  };


  /**
   * top bar 컴포넌트 렌더
   * 
   * @param       pageId - 현재 페이지 id
   * @description 
   *  - bread crumbs를 포함한 tob bar 컴포넌트 렌더
   *  - top bar 컴포넌트만을 활용하여 페이지 이동을 원활하게 하려면 contentList.js에서 prev & next 값을 정확하게 정의해야 함
   */
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


  /**
   * top bar bread crumbs HTML 태그 생성
   * 
   * @param       pageId - 현재 페이지 id
   * @return      top bar HTML 태그 object  
   */
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


  /**
   * 메뉴 목록에서 현재 화면 정보 탐색 및 반환
   * 
   * @param       pageId - 현재 페이지 id
   * @param       list - 평탄화된 메뉴 목록
   * @return      현재 페이지 데이터
   */
  const getTargetMenu = (id, list) => {
    const matched = list.find(el => el.id === id);
    return matched;
  };
  

  /**
   * 메뉴 목록에서 현재 화면을 포함하여 bread crumbs에 표시할 메뉴 탐색 & 반환
   * 
   * @param       curPage - 현재 페이지 id
   * @param       pathArr - bread crumbs에 표시할 메뉴 목록
   * @param       list - 평탄화된 메뉴 목록
   * @return      표시 대상 메뉴 목록
   */
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


  /**
   * side bar 컴포넌트 내 css 적용
   * 
   * @param       curPageObj - 현재 페이지 id
   * @description 현재 화면의 상위 메뉴들은 모두 펼쳐진 상태로 렌더되도록 css 적용
   */
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


  /**
   * Root 메뉴로 이동
   * 
   * @param       homeId - 최상위 메뉴 ID
   */
  const goHome = homeId => {
    location.href = FLATTERNED_MENU.find(el => el.id === homeId)?.href || '';
  };


  /**
   * side bar 컴포넌트 렌더
   * 
   * @param       pageId - 현재 페이지 id
   * @description 
   *  - 로고, 방문 메뉴 표시 등을 포함한 side bar 컴포넌트 렌더
   *  - 메뉴 트리 구조 표현을 위해서는 contentList.js에서 sub 값을 정확하게 정의해야 함 
   */
  const loadSideBar = pageId => {
    fetch("/o11y-workshop-kr/src/layout/sidebar.html")
      .then(res => res.text())
      .then(html => {
        document.querySelector('#R-sidebar').innerHTML = html;
        
        let sideHTML = '';
        // sideHTML = createMenuHTML('', VALID_MENU); // 챕터별로 진입 시 다른 메뉴 제거하려면 pageId 미지정
        // 
        sideHTML = createMenuHTML(pageId, VALID_MENU);
        document.querySelector('#R-shortcutmenu-home').innerHTML = sideHTML;

        // const url = getCurrentURL();
        const curPageObj = FLATTERNED_MENU.find(el => el.id === pageId);
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

        // const homeId = getHomeId(pageId);
        const homeId = '0';
        document.querySelector('#logo').addEventListener('click', () => goHome(homeId));
        document.querySelector('#homeIcon').addEventListener('click', () => goHome(homeId));
      })
      .catch(error => console.error('Failed to fetch page: ', error));
  };

  
  /**
   * side bar HTML 태그 생성
   * 
   * @param       pageId - 현재 페이지 id
   * @param       list - 트리 구조 적용된 메뉴 목록
   * @return      side bar HTML 태그 object  
   */
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
        <li data-nav-id="${ href }" data-page-id="${ id }">
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

  // 전역에서 호출 가능한 함수 정의
  return {
    setPage: pageId => setPage(pageId),
  };
})();

// 사용자 메시지 처리를 위한 전역 변수 선언
window.T_Copied_to_clipboard = `Copied to clipboard!`; 
window.T_Copy_link_to_clipboard = `Copy link to clipboard`;
window.T_Link_copied_to_clipboard = `Copied link to clipboard!`; 
window.T_Reset_view = `Reset view`; 
window.T_View_reset = `View reset!`; 
window.T_No_results_found = `No results found for "{0}"`; 
window.T_N_results_found = `{1} results found for "{0}"`;
