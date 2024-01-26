<template>
  <div>
    <div class="card mb-3">
      <div class="card-body">
        <OrderSummary :order="order"/>
      </div>
    </div>
    <div class="card mb-3">
      <h3 class="h5 card-header">
        {{ $t('payment.bank_transfer') }}
      </h3>
      <div class="card-body">
        <dl class="row" v-if="currencyCode === 'JPY'">
          <dt class="col-sm-3 col-lg-2">
            {{ $t('payment.payment_due_date') }}
          </dt>
          <dd class="col-sm-9 col-lg-10">{{ expiryDate }}</dd>
          <dt class="col-sm-3 col-lg-2">
            お振込先
          </dt>
          <dd class="col-sm-9 col-lg-10">
            <div class="list-group">
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{ $t('payment.bank') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankName }} {{ bankAccountBranchName }}
                    <span v-if="bankAccountHolderType">({{ bankAccountHolderType }})</span>
                    <strong>{{ bankAccountNumber }}</strong>
                    <div
                      class="alert alert-light small p-2" role="alert">
                      口座番号は注文ごとに異なります。以前ご利用いただいた方も改めてご確認ください。
                    </div>
                  </dd>
                </dl>
              </div>
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{ $t('payment.bank_account_holder') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankAccountHolderName }}
                    <div
                      class="alert alert-light small p-2" role="alert">
                      モーションエレメンツの代行として株式会社KOMOJUより銀行振込が行われます。
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </dd>
        </dl>
        <dl class="row" v-else-if="currencyCode === 'KRW'">
          <dt class="col-sm-3 col-lg-2">
            {{ $t('payment.payment_due_date') }}
          </dt>
          <dd class="col-sm-9 col-lg-10">{{ expiryDate }}</dd>
          <dt class="col-sm-3 col-lg-2">
            {{ $t('payment.payment_information') }}
          </dt>
          <dd class="col-sm-9 col-lg-10">
            <div class="list-group">
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{ $t('payment.bank') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankName }} {{ bankAccountBranchName }}
                    <span v-if="bankAccountHolderType">({{ bankAccountHolderType }})</span>
                    <strong>{{ bankAccountNumber }}</strong>
                  </dd>
                </dl>
              </div>
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{  $t('payment.bank_account_holder') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankAccountHolderName }}
                    <div
                      class="alert alert-light small p-2" role="alert">
                      모션엘리먼츠는 고객 여러분이 신용카드로 간단히 구매하실 수 있는 결제 시스템을 운영해오고 있습니다. 이와 더불어 정부기관 및 교육기관과 같이 신용카드 결제가 어려운 고객분들을 위해 한국 공식 리셀러 ND커뮤니케이션과 함께 <strong>계좌이체 및 세금계산서 발행</strong>이 가능하게 되었습니다.
                    </div>
                  </dd>
                </dl>
              </div>
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    담당자 연락처
                  </dt>
                  <dd class="col-9">
                    02-325-1993<br>
                    (주)앤디커뮤니케이션 강병길 과장
                  </dd>
                </dl>
              </div>
            </div>
          </dd>
        </dl>
        <dl class="row" v-else>
          <dt class="col-sm-3 col-lg-2">
            {{ $t('payment.payment_due_date') }}
          </dt>
          <dd class="col-sm-9 col-lg-10">{{ expiryDate }}</dd>
          <dt class="col-sm-3 col-lg-2">
            {{ $t('payment.payment_information') }}
          </dt>
          <dd class="col-sm-9 col-lg-10">
            <div class="list-group">
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{ $t('payment.bank') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankName }} {{ bankAccountBranchName }}
                    <span v-if="bankAccountHolderType">({{ bankAccountHolderType }})</span>
                    <strong>{{ bankAccountNumber }}</strong>
                  </dd>
                </dl>
              </div>
              <div class="list-group-item">
                <dl class="row mb-0">
                  <dt class="col-3">
                    {{  $t('payment.bank_account_holder') }}
                  </dt>
                  <dd class="col-9">
                    {{ bankAccountHolderName }}
                  </dd>
                </dl>
              </div>
            </div>
          </dd>
        </dl>

        <div class="alert alert-light small" role="alert" v-if="currencyCode === 'JPY'">
          <p>ご注意点:</p>
          <ul>
            <li>振込料がかかる場合はご負担ください。</li>
            <li>必ずご請求額を正しくお振り込み下さい。過払い分のご返金はできませんのでご注意ください。</li>
            <li>上記のお支払い期限を経過すると「無効」となります。お振込み頂いても完了出来ませんのでご注意ください。</li>
            <li>支払いを完了された際に発行される領収書や払込控え、ネットバンキングの場合はお問い合わせ番号等を保管されますようお願いします。（お支払いの証明が確認できませんと、購入後のサポートをお受けいただけない場合がございます。）</li>
          </ul>

          <p class="mb-0">ご不明の点がおありの際には、support@motionelements.com までご返信いただきますようお願いいたします。</p>
        </div>

        <hr class="my-5"/>

        <h5 class="card-title" v-if="currencyCode === 'JPY'">
          銀行振込は、おおよそ1-3 営業日に反映されます
        </h5>
        <h5 class="card-title" v-else>
          {{ $t('payment.bank_transfer_is_processed_within_{days}_working_days', { days: '1-3' }) }}
        </h5>

        <p>
          {{ $t('payment.once_the_transaction_is_cleared_we_will_add_the_purchased_{product}_into_your_account_and_notify_you_via_email', {product: $t('product.credits')}) }}
        </p>

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
    // Price,
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
    currencyCode() {
      return _.get(this.order, 'netTotal.currency');
    },
    bankName() {
      return _.get(this.order, 'paymentDetails.bankName');
    },
    bankAccountBranchName() {
      return _.get(this.order, 'paymentDetails.accountBranchName');
    },
    bankAccountNumber() {
      return _.get(this.order, 'paymentDetails.accountNumber');
    },
    bankAccountHolderName() {
      return _.get(this.order, 'paymentDetails.accountHolderName');
    },
    bankAccountHolderType() {
      return _.get(this.order, 'paymentDetails.accountHolderType');
    },
  },
};
</script>
