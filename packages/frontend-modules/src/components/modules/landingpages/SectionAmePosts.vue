<template>
  <div class="section-ame-posts">
    <div class="card-deck mb-3">
      <template
        v-for="(article, index) in posts"
      >
        <CommunityCard
          :key="`community-${index}`"
          :article="article"
          class="mb-3"
        ></CommunityCard>

        <div v-if="((index + 1) % 3) === 0" :key="index" class="w-100"></div>
      </template>
    </div>

    <div class="text-center">
      <a v-if="$i18n.locale === 'ja'" class="btn btn-light" href="https://www.motionelements.com/blog/">{{ $t('cta.discover_more') }}</a>
      <a v-else class="btn btn-light" href="https://www.motionelements.com/blog/">{{ $t('cta.discover_more') }}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SectionAmePosts',
  components: {
    CommunityCard: () => import('@/components/modules/common/CommunityCard.vue'),
  },
  data() {
    return {
      posts: [],
      communityHighlights: [
        {
          type: 'highlight',
          title: 'Ask ME Editing',
          description: '動画クリエーターのための、動画編集に関するお悩み解決 & 知識共有を目的とした質問サイトです。',
          category: '',
          icon: ['fal', 'comments-alt'],
          url: 'https://tuts.motionelements.com/qa/ja/',
          src: '',
          published_at: '',
          background: 'gradient-community',
        },
      ],
      ameEventPost: [
        {
          title: '売れるAfterEffectsテンプレートコンペ2019',
          description: '日本のクリエイターによる、高品質でユニークなAfter Effectsの需要が急増しています！今回のコンペティションにより、AEテンプレートをモーションエレメンツで発表・販売することで、 『自分の作品を世界に広め、かつ収入を得ることができるチャンス』という新しい可能性を提供することで、日本のクリエイターを応援します！',
          image: {
            url: 'https://blog-motionelements.imgix.net/uploads/2019/06/keyframe-banner-leaderboard.74a94539545371f02724c13b74ef8fe4.png?auto=format&fit=crop&crop=top&w=286&h=160',
          },
          url: 'https://www.motionelements.com/blog/ja/keyframe',
          published_at: '2019-08-12',
        },
      ],
    };
  },
  created: function () {
    const lang = this.$store.getters['site/currentLanguage'];

    if (lang === 'ko' || lang === 'en' || lang === 'zh-hant') {
      this.$api.getChannelPosts(lang).then((data) => {
        this.posts = data;
      });
    }

    if (lang === 'ja') {
      this.$api.getChannelPosts(lang).then((data) => {
        // if date over 2019-9-30 do not show
        if (new Date().valueOf() < 1569772800000) {
          this.communityHighlights.push(...this.ameEventPost);
        }
        this.posts = this.communityHighlights.concat(data).slice(0, 6);
      });
    }
  },
};
</script>
