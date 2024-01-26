<template>
    <span>
        <font-awesome-icon :icon="['far','clock']"/> {{ distanceToNow }}
    </span>
</template>

<script>
import { formatDistanceToNow, fromUnixTime } from 'date-fns';

import {
  enUS, ja, ko, zhTW, th, de, es, fr,
} from 'date-fns/locale';

const dateFnsLocales = {
  enUS, ja, ko, zhTW, th, de, es, fr,
};

export default {
  name: 'component-timer-distance-to-now',
  components: {
  },
  props: {
    lang: String,
    date: {
      type: [Date, Number],
    },
  },
  computed: {
    distanceToNow() {
      const currentLanguage = this.lang || _.get(this, '$i18n.locale') || 'en';
      let currentDate = this.date;

      if (!currentDate) {
        return;
      }

      if (!currentLanguage) {
        return;
      }

      if (typeof currentDate === 'number') {
        currentDate = fromUnixTime(currentDate);
      }

      let displayString = '';
      if (currentDate && currentLanguage) {
        let localeLang = dateFnsLocales[currentLanguage];
        switch (currentLanguage) {
          case 'zh-hant':
            localeLang = dateFnsLocales.zhTW;
            break;
          case 'en':
            localeLang = dateFnsLocales.enUS;
            break;
          default:
            localeLang = dateFnsLocales[currentLanguage];
            break;
        }

        displayString = formatDistanceToNow(currentDate, { addSuffix: true, locale: localeLang });
      }

      // `${createTime.getFullYear()}-${createTime.getMonth() + 1}-${createTime.getDate()}`
      return displayString;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
