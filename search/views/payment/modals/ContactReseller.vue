<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ _.get(reseller, 'name') }}
    </template>

    <div>
      <p v-if="_.get(reseller, 'legalName')">
        {{ reseller.legalName }}
      </p>
      <p v-if="_.get(reseller, 'phone')">
        {{ $t('member.phone') }}:
        <a :href="'tel:' + reseller.phone">
          {{ reseller.phone }}
        </a>
      </p>

      <p v-if="_.get(reseller, 'email')">
        {{ $t('member.email') }}:
        <a :href="'mailto:' + reseller.email">
          {{ reseller.email }}
        </a>
      </p>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'subscription-contact-reseller-modal',
  props: {
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    // LoaderSpin: () => import('frontend-modules/shared/modules/common/LoaderSpin.vue'),
  },
  // data() {
  //   return {
  //   };
  // },
  computed: {
    ...mapState({
      reseller: state => state.user.member.resellerDetails,
    }),
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
