<template>
  <section>
    <div class="container py-5">
      <h1>Components Demo</h1>

      <ButtonLadda
        :click="clickEvent1"
        :showIcon="false"
        :buttonClass="'btn btn-primary'"
        :throttleInterval="1000"
        @handle-click="handleClick"
      >
      test button ladda function (promise)
      </ButtonLadda>

      <p></p>

      <ButtonLadda
        :click="clickEvent2"
        :showIcon="true"
        :icon="['fas', 'me-download']"
        :throttleInterval="0"
        @handle-click="handleClick"
      >
      notification alert, (no promise has icon, no loading)
      </ButtonLadda>

      <p></p>

      <ButtonLadda
        :click="clickEvent3"
        :showIcon="true"
        :icon="['fas', 'me-download']"
        :throttleInterval="0"
        @handle-click="handleClick"
      >
      notification flash
      </ButtonLadda>

      <ul>
        <li>
          <a href="/demo/lerna-import">Lerna Import</a>
        </li>
        <li>
          <a href="/demo/core-js">CoreJS</a>
        </li>
        <li>
          <a href="/demo/input-mask">Input Mask</a>
        </li>
        <li>
          <a href="/demo/vuelidate">Vuelidate</a>
        </li>
        <li>
          <a href="/demo/modal">New Modal</a>
        </li>
      </ul>
      <p>Money lib: {{ testMoney.toFormat() }}</p>
      <p>Money lib: {{ testMoney.getCurrency() }}</p>
      <p>Money lib: {{ testMoney.toUnit() }}</p>
      <p>Money lib: {{ testMoney.getSymbol() }}</p>
      <p>siteUrl: {{ testSiteUrl }}</p>
      <p>site: {{ testSite }}</p>
      <!-- <p>link: {{ testLink }}</p> -->
      <p>Term: {{ testTerm }}</p>
    </div>
</section>
</template>

<script>
import {
  required, minLength, numeric, alpha,
} from 'vuelidate/lib/validators';

import { searchElements } from '@/services/search.service.js';
import notificationService from '@motionelements/core/src/services/notification.service.js';

import Money from '@motionelements/money';
import meHelper from '@motionelements/helper';
import siteUrl from '@motionelements/helper/siteUrl';
import site from '@motionelements/helper/site';
import term from '@motionelements/helper/term';
// import link from '@motionelements/helper/link';

export default {
  name: 'test',
  components: {
    ButtonLadda: () => import('@motionelements/core/src/components/ui/BaseButtonLadda.vue'),
  },
  data() {
    return {
      name: {
        isValid: null,
      },
      phone: {
        isValid: null,
      },
      submitButton: {
        isLoading: false,
      },
      modal: {
        title: 'Modal title',
        content: 'Hello world!',
      },
      formData: {
        name: '',
        phone: '',
      },
      formData2: {
        name: '',
        phone: '',
      },
      showFooter: false,
    };
  },
  computed: {
    testMoney() {
      return Money({ amount: 11.00, currency: 'USD' });
    },
    testSiteUrl() {
      return siteUrl('/account/purchase-history').www().url();
    },
    testSite() {
      return site('https://help.motionelements.com/hc/articles/206279362').url();
    },
    // testLink() {
    //   return link('https://help.motionelements.com/hc/articles/206279362').url();
    // },
    testTerm() {
      return term('mediaType', 'ae_template').text();
    },
  },
  validations: {
    formData: {
      name: {
        required,
        alpha,
        minLength: minLength(4),
      },
      phone: {
        required,
      },
    },
    formData2: {
      name: {
        required,
        alpha,
        minLength: minLength(4),
      },
      phone: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    console.log('mehelper', meHelper.siteUrl());
  },
  methods: {
    clickEvent1() {
      return searchElements('ae', {
        sort: 'latest',
        page: 1,
        per_page: 8,
      });
    },
    clickEvent2() {
      notificationService.alert({
        level: 'success',
        title: this.$i18n.t('favorites.element_added_to_your_cart'),
      });
    },
    clickEvent3() {
      notificationService.flash({
        level: 'success',
        title: this.$i18n.t('favorites.element_added_to_your_cart'),
      });
    },
    handleUploadedFile(e) {
      console.log(e);
    },
    handleClick: function (data) {
      console.log(data);
    },
    checkNameMask: function (field) {
      console.log(field);
      this.name.isValid = field.target.inputmask.isComplete();
    },
    checkPhoneMask: function (field) {
      this.phone.isValid = field.target.inputmask.isComplete();
    },
    onButtonClick() {
      console.log('clicked');
      if (!this.$v.formData.name.$invalid && !this.$v.formData.phone.$invalid) {
        this.submitForm();
      }
    },
    onSubmit() {
      this.submitForm();
    },
    submitForm() {
      console.log('form submit');
      this.submitButton.isLoading = true;
      setTimeout(this.onComplete, 2000);
    },
    onComplete() {
      this.modal.content = 'Completed.';
      $('#modal-test').modal('show');
      this.submitButton.isLoading = false;
    },
  },
  metaInfo() {
    return {
      meta: [
        { vmid: 'robots', name: 'robots', content: 'noindex nofollow' },
      ],
    };
  },
};
</script>
