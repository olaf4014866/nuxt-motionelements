<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <OrderSummary :order="order"/>
      </div>
    </div>
    <div class="card mb-3">
      <h3 class="h5 card-header">
        コンビニ決済
      </h3>
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-4 col-lg-2">お支払い期限</dt>
          <dd class="col-sm-8 col-lg-10">{{ expiryDate }}</dd>
          <dt class="col-sm-4 col-lg-2">お振込先</dt>
          <dd class="col-sm-8 col-lg-10">
            <div class="list-group">
              <div class="list-group-item">

                <dl class="row mb-0">
                  <dt class="col-12 col-md-4 col-lg-3">コンビニ</dt>
                  <dd class="col-12 col-md-8 col-lg-9">
                    <div class="d-flex">
                      <div class="d-inline-block">
                        <object
                          class="svg-inline--fa fa-2x icon-cc-colored mr-2"
                          :key="`konbini-icon-${storeIcon}`"
                          :data="`https://static.moele.me/img/logo/konbini/${storeIcon}.svg`"
                          type="image/svg+xml"
                        ></object>
                      </div>
                      <span>
                        {{ storeName }}
                      </span>
                    </div>
                    <!-- ADD IMAGE
                    <img src="" class="svg-payment-icon" style="width:80px">
                    <div>
                      {{ storeName }}
                    </div> -->
                  </dd>
                </dl>
                <dl class="row mb-0">
                  <dt class="col-12 col-md-4 col-lg-3">お客様番号</dt>
                  <dd class="col-12 col-md-8 col-lg-9">
                    <strong class="text-black">{{ receiptNumber }}</strong>
                  </dd>
                </dl>
                <dl v-if="confirmationCode" class="row mb-0">
                  <dt class="col-12 col-md-4 col-lg-3">確認番号</dt>
                  <dd class="col-12 col-md-8 col-lg-9">
                    <strong class="text-black">{{ confirmationCode }}</strong>
                  </dd>
                </dl>
                <dl class="row mb-0">
                  <dt class="col-12 col-md-4 col-lg-3"></dt>
                  <dd class="col-12 col-md-8 col-lg-9">
                    <a :href="instructionsUrl" target="_blank" class="btn btn-primary">お支払い方法</a>
                  </dd>
                </dl>
              </div>
            </div>
          </dd>
        </dl>

        <div class="alert alert-light small" role="alert">
          <p>ご注意点:</p>
          <ul>
            <li>
              お振込確認完了後、ご購入いただいたクレジットをお客様のアカウントに追加し、その旨をメールでお知らせ致します。
              <!-- <?=sprintf($this->translate("Once the transaction is cleared, we will add the purchased %1\$s into your account and notify you via email."),
              ($order->isCreditsPurchase() ? $this->translate('credits') : $this->translate('items')))?>
              </li>-->
            </li>
            <li>上記のお支払い期限を経過すると「無効」となります。お振込み頂いても完了出来ませんのでご注意ください。</li>
            <li>「お客様控」であるレシートの払込先名は「KOMOJU」となっております。あらかじめご了承くださいませ。</li>
            <li>コンビニエンスストアで支払いを完了された際に発行される領収書や払込控えは必ず原本を保管されますようお願いします。（お支払いの証明が確認できませんと、購入後のサポートをお受けいただけない場合がございます。）</li>
          </ul>

          <p class="mb-0">ご不明の点がおありの際には、support@motionelements.com までご返信いただきますようお願いいたします。</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { format as formatDate } from 'date-fns';
import OrderSummary from '@/views/credits/OrderSummary.vue';

export default {
  name: 'bank-transfer-authorized',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  components: {
    OrderSummary,
  },
  data() {
    return {
    };
  },
  computed: {
    expiryDate() {
      const time = _.get(this.order, 'paymentDetails.expireAt');
      return time > 0 ? formatDate(time * 1000, 'yyyy-MM-dd') : '';
    },
    storeName() {
      // return _.get(this.order, 'paymentDetails.store');
      const store = _.get(this.order, 'paymentDetails.store');
      switch (store) {
        case 'daily-yamazaki':
          return 'デイリーヤマザキ';
        case 'family-mart':
          return 'ファミリーマート';
        case 'lawson':
          return 'ローソン';
        case 'ministop':
          return 'ミニストップ';
        case 'seicomart':
          return 'セイコーマート';
        case 'seven-eleven':
          return 'セブンイレブン';
        default:
          return '';
      }
    },
    storeIcon() {
      const store = _.get(this.order, 'paymentDetails.store');
      switch (store) {
        case 'daily-yamazaki':
        case 'family-mart':
        case 'lawson':
        case 'ministop':
        case 'seicomart':
        case 'seven-eleven':
          return store;
        default:
          return '';
      }
    },
    receiptNumber() {
      return _.get(this.order, 'paymentDetails.receipt');
    },
    confirmationCode() {
      return _.get(this.order, 'paymentDetails.confirmationCode');
    },
    instructionsUrl() {
      return _.get(this.order, 'paymentDetails.instructionsUrl');
    },
  },
};
</script>
