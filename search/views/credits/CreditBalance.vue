<template>
  <div class="border px-5 py-3 rounded h-100 d-flex align-items-center">
    <div>
      <font-awesome-icon
        :icon="['fas','coins']"
        size="3x"
        class="mr-5 text-muted"
      />
    </div>
    <div class="flex-grow-1">
      <p class="mb-0">
        {{ $t('credits.remaining_credits') }}
      </p>
      <p class="h1">
        {{ userCredits }}
        <font-awesome-icon :icon="['fal','me-credits-circle']" title="credits"/>
      </p>
    </div>
  </div>
</template>

<script>
// order by order in page
import { mapState } from 'vuex';

export default {
  name: 'credit-balance',
  computed: {
    ...mapState({
      userCredits: state => state.user.member.credits,
    }),
  },
};
</script>
