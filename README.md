# Splunk O11y 한국어 워크샵 자료

새로운 워크샵 내용 생성을 위해 아래 절차를 따라 파일을 생성 / 수정 해 주세요

<br>

## 폴더 생성

`~/src` 폴더 아래에 워크샵을 진행 할 폴더를 생성합니다 (예시로 1번 워크샵인 ninja-kr을 생성하겠습니다)

```bash
#예시
mkdir /o11y-workshop-kr/src/1-ninja-kr
```

성공적으로 워크샵 폴더가 생성되었다면 아래와 같은 경로로 생성이 됩니다.

```bash
.
├── .github
├── src
│   ├── 1-ninja-kr
│   ├── 2-ITSI4Rookies
│   └── 3-advancedConfig
├── js
├── layout
├── templates
├── webfornts
└── README.md

```

<br>

## 파일 생성

워크샵 내용을 작성할 마크다운 파일과, 마크다운 포맷을 HTML 형태로 자동 변환 해 줄 html 두 개를 방금 만들었던 1-ninja-kr 폴더 아래에 만들어줍니다.
<br>

> ⚠️ **Warning** <br>
> index 파일 명 앞부분에 prefix로 들어가는 id 값은 항상 자신이 위치한 폴더의 id 를 따라갑니다

<br>

```bash
#예시
touch /o11y-workshop-kr/src/1-ninja-kr/1-index.html
touch /o11y-workshop-kr/src/1-ninja-kr/1-index.md
```

<br>

성공적으로 워크샵 폴더가 생성되었다면 아래와 같은 경로로 생성이 됩니다.

```bash
.
├── .github
├── src
│   ├── 1-ninja-kr
│       ├── 1-index.html
│       └── 1-index.md
│   ├── 2-ITSI4Rookies
│   └── 3-advancedConfig
├── js
├── layout
├── templates
├── webfornts
└── README.md

```

index.html 파일에 아래와 같은 내용을 붙여넣기 하고 올바른 파일명을 참조하도록 세 군대를 수정 해 줍니다

```html
<!doctype html>
<html lang=en dir=ltr itemscope itemtype=http://schema.org/Article data-r-output-format=html>

<head>
    <meta charset=utf-8>
    <meta name=viewport content="height=device-height,width=device-width,initial-scale=1,minimum-scale=1">
    <title>Building the Spring PetClinic Application :: Splunk Observability Cloud Workshops</title>
    <style>
        :root {
            --MAIN-WIDTH-MAX: 130rem;
            --MENU-WIDTH-L: 23rem
        }
        blockquote {
            background-color: #f0fff4;
            /* 밝은 초록 배경 */
            border-left: 6px solid #38a169;
            /* 진한 초록 테두리 */
            padding: 1em;
            border-radius: 6px;
            margin: 1.5em 0;
        }
        blockquote p {
            margin: 0;
            /* 문단 간 여백 제거 (더 타이트하게) */
        }
        blockquote strong {
            color: #2f855a;
            /* 강조 텍스트 색상 */
        }
    </style>
    <script src="/o11y-workshop-kr/src/js/includes.js"></script>
    <!-- md-block -->
    <script type="module" src="https://md-block.verou.me/md-block.js"></script>
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.css"
        integrity="sha512-n5zPz6LZB0QV1eraRj4OOxRbsV7a12eAGfFcrJ4bBFxxAwwYDp542z5M0w24tKPEhKk2QzjjIpR5hpOjJtGGoA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- github-markdown-light 테마 -->
    <!-- prism code theme -->
    <script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/prismjs/themes/prism.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-bash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-javascript.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-python.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-json.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-yaml.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-go.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.30.0/themes/prism.min.css">
</head>

<!-- data-url 부분에 표현할 자기 자신의 html 파일의 경로를 수정 해 줍니다
     src 폴더가 data home으로 인식하므로 이후에 따라갈 경로를 상대경로로 작성합니다 -->
<body class="mobile-support html disableInlineCopyToClipboard" data-url="1-ninja-kr/1-index.html">
    <div id="R-body" class="default-animation">
        <div id="R-body-overlay"></div>
        <nav id="R-topbar"></nav>
        <div id="R-main-overlay"></div>
        <main id="R-body-inner" class="highlightable ninja-workshops" tabindex=-1>
            <div class="flex-block-wrapper">
                <article class="default">
                    <header class="headline"></header>
                    <div class="markdown-body">
                        <!-- html로 랜딩 할 markdown 파일을 지정합니다. html과 md는 항상 같은 경로에 있을 것이므로 ./ 이후에 인덱스 파일 이름만 좀 신경써서 적어줍니다 -->
                        <md-block src="./1-index.md">
                            <!-- README.md 로드 실패시 보이는 문구 -->
                            `README.md` was *not* found
                        </md-block>
                    </div>


                    <footer class=footline>
                        <span class="badge cstyle note badge-with-title">
                            <span class="badge-title text-muted">Authors</span><span class="badge-content">SooKyung
                                Kim</span>
                        </span>
                        <span class="badge cstyle note badge-with-title"><span class=badge-title class=text-muted>Last
                                Modified
                            </span><span class=badge-content>Apr 9, 2025</span></span>
                    </footer>

                </article>
            </div>
        </main>

    </div>
    <aside id="R-sidebar" class="default-animation showVisitedLinks">
    </aside>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 해당 html 파일의 인덱스 ID를 지정합니다. 해당 ID 값은 contentList.js 파일에도 적용되므로 유니크하게 적어줍니다
            _com.setPage('1');
        });
    </script>

</body>

</html>
```

- body 태그 첫 째 줄에 data-url 을 자기 자신의 html 로 변경합니다
- main 태그 내에 md-block에 해당 페이지제 표현할 markdown 파일을 지정합니다
- html 가장 마지막 파트 script 내에 Page ID를 지정합니다

<br>

## contentList.js 에 경로 추가

src/js/contentList.js 파일을 수정하여 내가 생성한 페이지가 왼쪽 사이드바에 올바르게 표현되도록 합니다.

<br>

```bash
vi /o11y-workshop-kr/src/js/contentList.js
```

<br>

아래와 같이 내가 생성한 워크샵의 html 페이지를 올바른 page id와 함께 지정 해 줍니다

```js
var CONTENTS = {
  // Splunk Ninja Workshop for Korea
  ch1: [
    {
      id: '1', // required. page ID - 앞전 단계에서 html 최하단에 지정했던 ID를 적어줍니다
      title: 'Splunk Ninja Workshop for Korea', // required. Bread crumbs text
      menuName: 'Splunk Ninja Workshop for Korea', // required. Side bar text
      href: '/o11y-workshop-kr/src/1-ninja-kr/1-index.html', // required. HTML file path. 사이드바 메뉴를 눌렀을때 표현될 html 파일 경로입니다.
      prev: '', // 직전 페이지 - 현재 1번 콘텐츠는 최상위이므로 직전 페이지가 없습니다
      next: '1-0', // 다음페이지의 ID
      sub: [], // 하위 페이지 - 하위 메뉴를 만들게 된다면 해당 array 안에 동일한 페이지 설정을 넣어줍니다
    },
  ],
  // ITSI4Rookies
  ch2: [],
  // Advanced Collector Configuraiton
  ch3: []
```

저장 후 github 에 푸시합니다

<br>

## 워크샵 홈 URL 찾기

각 워크샵마다 콘텐츠 내용이 다르고, 워크샵을 주최 할 때 다른 워크샵의 가이드가 참석자에게 노출되지 않게 하기 위해서 우리는 github pages의 home url을 사용하지 않으려고 합니다.
이 URL은 내부에만 공유됩니다.

[Splunk Workshop for Korea](https://sookim-splunk.github.io/o11y-workshop-kr)

그럼 내가 진행하는 워크샵의 콘텐츠만 표시되도록 하려면 어떤 경로로 들어가야 될까요?
https://sookim-splunk.github.io/o11y-workshop-kr 의 주소가 github 홈 디렉토리 이므로 내 워크샵 폴더의 최상위 html 파일 경로가 워크샵 홈이 됩니다

예: https://sookim-splunk.github.io/o11y-workshop-kr/src/1-ninja-kr/1-index.html

위 예시와 같이 github 홈 url 뒷부분에 내가 만든 워크샵 폴더의 html을 지정 해 주세요

<br>

## Optional

위 단계에서 만든 워크샵 홈 URL을 bitly나 Google url shortener 를 통해 짧은 URL과 QR 코드로 만들어 워크샵에 활용 해 보세요
