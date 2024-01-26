<template>
  <div class="table-comparison">

    <div class="row m-0 row-header sticky-top">
      <div class="col d-none d-md-block">&nbsp;</div>
      <div class="col col-md-3 text-center bg-light">オンデマンド</div>
      <div class="col col-md-3 text-center bg-success border-success">クレジットパッケージ</div>
      <div class="col col-md-3 text-center bg-info border-info">定額制プラン</div>
    </div>

    <div class="row m-0 border-bottom">
      <div class="col col-12 col-md row-label">なぜこれを選ぶのですか？</div>
      <div class="col col-md-3 text-center">必要な時に購入</div>
      <div class="col col-md-3 text-center">チェックアウトも速くなります！</div>
      <div class="col col-md-3 text-center">定額制プランでよりお得な割引</div>
    </div>

    <div class="row m-0 border-bottom">
      <div class="col col-12 col-md row-label">割引</div>
      <div class="col col-md-3 text-center">-</div>
      <div class="col col-md-3 text-center">-</div>
      <div class="col col-md-3 text-center"><strong class="text-black">70%</strong>以上</div>
    </div>

    <div class="row m-0 border-bottom">
      <div class="col col-12 col-md row-label">おすすめ</div>
      <div class="col col-md-3 text-center">年間5ダウンロード以下なら、<br />オンデマンドがおすすめ</div>
      <div class="col col-md-3 text-center">年間5ダウンロード以上なら、<br />クレジットパッケージがおすすめ</div>
      <div class="col col-md-3 text-center">月間3ダウンロード以上なら、<br />定額制プランがおすすめ</div>
    </div>

    <div class="row m-0 border-bottom">
      <div class="col col-12 col-md row-label">最低額</div>
      <div class="col col-md-3 text-center">いいえ</div>
      <div class="col col-md-3 text-center">いいえ</div>
      <div class="col col-md-3 text-center">
        <strong>フォト + ベクター + GIF + Lottie</strong><br />
        ￥980 / 月<br />
        <strong>音楽 + AE + Premiere</strong><br />
        ￥2,980 / 月<br />
        <strong>動画 + Apple Motion</strong><br />
        ￥7,580 / 月<br />
      </div>
    </div>

    <div class="row m-0">
      <div class="col col-12 col-md row-label d-none d-md-block"></div>
      <div class="col col-md-3 text-center"></div>
      <div class="col col-md-3 text-center">
        <a class="btn btn-success" href="#">
          詳細
        </a>
      </div>
      <div class="col col-md-3 text-center">
        <a class="btn btn-info" href="#">
          詳細
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.table-comparison {
  .col {
    padding: $table-cell-padding;
  }

  .row-header, .row-label {
    color: $headings-color;
  }

  .row-header {
    .col:not(:first-child) {
      border-bottom: .25rem solid map-get($theme-text-colors,'secondary');
      background: $white;
    }
  }

  .row:not(.row-header) {
    .col:not(.row-label) {
      font-size: $font-size-sm;
    }
  }

  @include media-breakpoint-down(sm) {
    .col:not(.row-label) {
      font-size: $font-size-sm;
      text-align: center;

      padding: $table-cell-padding-sm;
    }

    .row-label {
      text-align: center;
      border-bottom: $border-width solid $border-color;
    }
  }
}
</style>
