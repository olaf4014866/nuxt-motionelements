<template>
  <div class="py-6">
    <div class="container">
      <h1>Font Test</h1>
      <button class="btn" type="button" @click="callGifCreator">callGifCreator</button>
      <div class="row">
        <div class="col-12 mb-5">
          <h2>Multi-Language Typeface Mix Test</h2>
          <div class="card shadow-sm" role="alert">
            <div class="card-body text-center">
              <h3 lang="en">After Effects Templates</h3>
              <p
                class="lead"
                lang="en"
              >After Effects templates, video templates and motion graphics templates to unleash your creativity</p>
              <h3 lang="ja">After Effects テンプレート</h3>
              <p class="lead" lang="ja">After Effects テンプレート、AE素材、モーショングラフィックスやビデオテンプレートで創造力に自由を</p>
              <h3 lang="ko">에프터 이펙트 소스</h3>
              <p class="lead" lang="ko">애프터 이펙트 프로젝트과 비디오 템플릿, 모션그래픽 템플릿을 사용하여 창의성을 최대화 하십시오.</p>
              <h3 lang="zh-hant">AE模版</h3>
              <p class="lead" lang="zh-hant">After Effects專案、影片素材、動畫圖像模板讓你盡情的發揮想像力</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container body-font-weight-400 heading-font-weight-500">
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                class="nav-link active"
                href="#typo-en"
              >English</a>
            </li>
            <li class="nav-item">
              <a
                data-toggle="tab"
                role="tab"
                aria-selected="false"
                class="nav-link"
                href="#typo-ja"
              >日本語</a>
            </li>
            <li class="nav-item">
              <a
                data-toggle="tab"
                role="tab"
                aria-selected="false"
                class="nav-link"
                href="#typo-ko"
              >한국어</a>
            </li>
            <li class="nav-item">
              <a
                data-toggle="tab"
                role="tab"
                aria-selected="false"
                class="nav-link"
                href="#typo-zh-hant"
              >中文(繁體)</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container body-font-weight-400 heading-font-weight-500">
      <div class="tab-content" id="myTabContent">
        <div
          lang="en"
          class="tab-pane fade show active py-6"
          id="typo-en"
          role="tabpanel"
          aria-labelledby="typo-en"
        >
          <div class="row">
            <div class="col-12 mb-5">
              <div class="page-header">
                <h2>English Typography</h2>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
              <h3>
                Heading
                <small class="text-muted">with muted text</small>
              </h3>
              <p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            </div>
            <div class="col-lg-4">
              <h2>Example body text</h2>
              <p>
                Nullam quis risus eget
                <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
              </p>
              <p>
                <small>This line of text is meant to be treated as fine print.</small>
              </p>
              <p>
                The following is
                <strong>rendered as bold text</strong>.
              </p>
              <p>
                The following is
                <em>rendered as italicized text</em>.
              </p>
              <p>
                An abbreviation of the word attribute is
                <abbr title="attribute">attr</abbr>.
              </p>
            </div>
            <div class="col-lg-4">
              <h2>Emphasis classes</h2>
              <p class="text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
              <p class="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p class="text-secondary">Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
              <p class="text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
              <p class="text-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>
              <p
                class="text-success"
              >Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              <p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
            </div>
          </div>
        </div>
        <div
          lang="ja"
          class="tab-pane fade py-6"
          id="typo-ja"
          role="tabpanel"
          aria-labelledby="typo-ja"
        >
          <div class="row">
            <div class="col-12 mb-5">
              <div class="page-header">
                <h2>日本語タイポグラフィー</h2>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <h1>見出し 1</h1>
              <h2>見出し 2</h2>
              <h3>見出し 3</h3>
              <h4>見出し 4</h4>
              <h5>見出し 5</h5>
              <h6>見出し 6</h6>
              <h4>
                <small class="text-muted">ミュートされたテキストの</small>見出し
              </h4>
              <p class="lead">しずかは孔のかっこうセロ団を楽譜へ直し先生たた。</p>
            </div>
            <div class="col-lg-4">
              <h2>本文の例</h2>
              <p>
                楽まいだものたはでしそれから塩の
                <a href="#">ばかあたり</a>のうちがもじつに愉快でしまして、それじゃ大がしれへんたませ。
                ひい過ぎ何はむのくらいしかないのでが悪いたから前のゴーシュの頭家から弾い第一楽長曲のおねがいに云いていたしなだ。
              </p>
              <p>
                <small>このテキスト行は細かい印刷物として扱われます。</small>
              </p>
              <p>
                以下は
                <strong>太字で表示されます</strong>.
              </p>
              <p>
                以下は、
                <em>強調されたテキストとしてレンダリングされます。</em>.
              </p>
              <p>
                単語属性の省略形は
                <abbr title="attribute">attr</abbr>です。
              </p>
            </div>
            <div class="col-lg-4">
              <h2>強調クラス</h2>
              <p class="text-muted">「いまの前のかっこうに。思っ。」</p>
              <p class="text-primary">椅子ははじめふるえが出しまし。</p>
              <p class="text-secondary">晩は二鳴っ甘藍のようがしときござい。</p>
              <p class="text-warning">楽長も孔ぶんやそれでもってやるまし。</p>
              <p class="text-danger">もうどうしてもガラスを外国にあわてたた。</p>
              <p class="text-success">それ間もなくに楽長にしていっしょをひましょでし。</p>
              <p class="text-info">枝もはいって譜をやめございます。</p>
            </div>
          </div>
        </div>
        <div
          lang="ko"
          class="tab-pane fade py-6"
          id="typo-ko"
          role="tabpanel"
          aria-labelledby="typo-ko"
        >
          <div class="row">
            <div class="col-12 mb-5">
              <div class="page-header">
                <h2>한국어 타이포그래피</h2>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <h1>제목 1</h1>
              <h2>제목 2</h2>
              <h3>제목 3</h3>
              <h4>제목 4</h4>
              <h5>제목 5</h5>
              <h6>제목 6</h6>
              <h4>
                <small class="text-muted">음소거 된 텍스트로</small> 제목
                <small class="text-muted">지정하기</small>
              </h4>
              <p class="lead">모든 국민은 신체의 자유를 가진다.</p>
            </div>
            <div class="col-lg-4">
              <h2>예제 본문 텍스트</h2>
              <p>
                모든 국민은 신체의 자유를 가진다,
                <a href="#">대한민국의</a> 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 다만. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다.
              </p>
              <p>
                <small>이 텍스트 줄은 작은 글자로 취급됩니다.</small>
              </p>
              <p>
                다음은
                <strong>굵은 글씨로 표시됩니다</strong>.
              </p>
              <p>
                다음은
                <em>기울임 꼴 텍스트로 렌더링됩니다</em>.
              </p>
              <p>
                단어 속성의 약어는
                <abbr title="attribute">attr</abbr>입니다.
              </p>
            </div>
            <div class="col-lg-4">
              <h2>강조 수업</h2>
              <p class="text-muted">모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다.</p>
              <p class="text-primary">감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다.</p>
              <p class="text-secondary">국방상 또는 국민경제상 긴절한 필요로 인하여 법률이 정하는 경우를 제외하고는.</p>
              <p class="text-warning">자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.</p>
              <p class="text-danger">대한민국은 민주공화국이다.</p>
              <p class="text-success">모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다.</p>
              <p class="text-info">이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.</p>
            </div>
          </div>
        </div>
        <div
          lang="zh-hant"
          class="tab-pane fade py-6"
          id="typo-zh-hant"
          role="tabpanel"
          aria-labelledby="typo-zh-hant"
        >
          <div class="row">
            <div class="col-12 mb-5">
              <div class="page-header">
                <h2>中文版式</h2>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4">
              <h1>標題1</h1>
              <h2>標題2</h2>
              <h3>標題3</h3>
              <h4>標題4</h4>
              <h5>標題5</h5>
              <h6>標題6</h6>
              <h3>
                <small class="text-muted">用柔和的文字</small>標題
              </h3>
              <p class="lead">基年活安棋探訳優卓通山読送輪。國氣澀。</p>
            </div>
            <div class="col-lg-4">
              <h2>示例正文</h2>
              <p>
                入然申破帯光期車倶暮街北隆調。送常予中
                <a href="#">宿津局門十井</a>整能碁供。与然緊売難遅止紙表写況登月沖港客服欺。化球発禁遺王画高突任東去要葉再。実様意知転位読沸決輝大強府材妹。
              </p>
              <p>
                <small>這行文本意味著被視為小文本。</small>
              </p>
              <p>
                以下內容
                <strong>呈現為粗體文本</strong>。
              </p>
              <p>
                以下內容
                <em>呈現為斜體文本</em>。
              </p>
              <p>
                單詞屬性的縮寫是
                <abbr title="attribute">attr</abbr>。
              </p>
            </div>
            <div class="col-lg-4">
              <h2>重點classes</h2>
              <p class="text-muted">社要晃後域田氏択温対外育愛動話個真。</p>
              <p class="text-primary">地稿観球事連指長発腎際裕掲内之水語。</p>
              <p class="text-secondary">領載情政対横問士次意池控案効。</p>
              <p class="text-warning">審辞情加意板係掲晋禁江生。</p>
              <p class="text-danger">備休全入健能主出膨問政集謙都。</p>
              <p class="text-success">指高元際更変更連際在鳥競真系阪。</p>
              <p class="text-info">愛得読再足要称後境紹会自残築表権悪。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
</style>
