<template>
  <Modal
    align="center"
    size="lg"
    headerClass="d-blockx border-0 pb-0"
  >
    <template v-slot:title>
      {{ $t('favorites.share_favorites') }}
    </template>

    <div class="d-block">
      <ul class="row nav nav-tabs small" role="tablist">
        <li class="nav-item">
          <a
            :class="currentTab === 'share-link' ? 'active' : ''"
            @click="currentTab = 'share-link'"
            class="nav-link" data-toggle="tab" href="#share-link" role="tab"
          >
            <font-awesome-icon :icon="['far','link']" fixed-width/>
            {{ $t('favorites.link') }}
          </a>
        </li>

        <li class="nav-item">
          <a
            :class="currentTab === 'share-email' ? 'active' : ''"
            @click="currentTab = 'share-email'"
            class="nav-link" data-toggle="tab" href="#share-email" role="tab">
            <font-awesome-icon :icon="['far','share']" fixed-width/>
            {{ $t('favorites.share_with') }}
          </a>
        </li>
        <!--
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#share-embed" role="tab">
            <font-awesome-icon :icon="['far','code']" fixed-width></font-awesome-icon> Embed
          </a>
        </li>
        -->
      </ul>
    </div>

    <div
      :class="currentTab === 'share-link' ? 'show active' : ''"
      v-show="currentTab === 'share-link'"
      class="tab-pane fade" id="share-link" role="tabpanel" aria-labelledby="share-link-tab">
      <div class="pb-5">

        <label class="pt-5">
          {{ $t('favorites.link') }}
        </label>

        <div class="form-group d-flex align-items-start">
          <div class="flex-grow-1">
            <div class="input-group mb-3">
              <InputText
                :value="viewUrl"
                class="flex-grow-1" />
              <!-- <div class="input-group-append"> -->
                <!-- <button type="button"
                  class="input-group-text"
                  v-clipboard:copy="viewUrl"
                  v-clipboard:success="onClickCopy"
                  v-clipboard:error="onClickCopyError">
                  {{ $t('cta.copy') }}
                </button> -->
                <!-- <span class="input-group-text">
                  {{ $t('cta.copy') }}
                </span> -->
                <!-- </div> -->
              <div class="input-group-append">
                <ButtonClipboard
                  :copy="viewUrl"
                  :label="true"
                  class="btn btn-light"
                />
                <!--
                <button type="button btn-light"
                  class="input-group-text"
                  @click="onClickChangeCopyText"
                  v-clipboard:copy="viewUrl"
                  v-clipboard:success="onClickCopy"
                  v-clipboard:error="onClickCopyError">
                  <font-awesome-icon
                    :icon="['far','clipboard']"
                    class="mr-1"
                    :title="$t('cta.copy')"
                  />
                  {{ isCopied ? $t('cta.copied') : $t('cta.copy') }}
                </button>
                -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="currentTab === 'share-email' ? 'show active' : ''"
      v-show="currentTab === 'share-email'"
      class="tab-pane fade" id="share-email" role="tabpanel" aria-labelledby="share-link-tab">
      <div class="pb-5">

        <label class="pt-5">
          {{ $t('favorites.share_with') }}
        </label>

        <div class="form-group d-flex align-items-start">
          <div class="flex-grow-1">
            <input
              v-model="inputShareEmail"
              :class="showValidMessage ? 'is-invalid' : ''"
              :placeholder="$t('favorites.email_address')"
              class="form-control"
              type="email"
            >
            <small class="form-text text-danger">
              {{ showValidMessage ? $t('favorites.email_address_invalid') : '&nbsp;' }}
            </small>
          </div>

          <!--
          <div class="btn-group mx-3">
            <button
              class="btn btn-simple-secondary dropdown-toggle text-left"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="dropdown-label">
                <font-awesome-icon :icon="['far','pencil']" fixed-width></font-awesome-icon>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item active" href="#">
                <font-awesome-icon :icon="['far','pencil']" fixed-width></font-awesome-icon> Can edit
              </a>
              <a class="dropdown-item" href="#">
                <font-awesome-icon :icon="['far','eye']" fixed-width></font-awesome-icon> Can view
              </a>
            </div>
          </div>
          -->

          <a
            @click.prevent="checkMail()"
            @keyup.enter="checkMail()"
            class="btn btn-light text-nowrap ml-2"
          >
            {{ $t('cta.share') }}
          </a>
        </div>
        <!--
        <label>Link sharing:</label>
        <div class="d-flex flex-column align-items-stretch flex-lg-row align-items-lg-center">
          <div class="btn-group flex-grow-1 mb-2">
            <button class="btn btn-simple-dark dropdown-toggle text-left" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="dropdown-label">
                Only you can see this project
              </span>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item active" href="#">
                <strong>Only you</strong> can see this project
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Anyone with the link <strong>can edit</strong>
              </a>
              <a class="dropdown-item" href="#">
                Anyone with the link <strong>can view</strong>
              </a>
              <a class="dropdown-item text-wrap" href="#">
                People you have invited <strong>can edit / view</strong>
              </a>
            </div>
          </div>
          <div class="pl-lg-3 mb-2">
            <a class="btn btn-block btn-light">Copy Link</a>
          </div>
        </div>
        <div>
          <input
            type="url"
            class="form-control"
            placeholder="URL Link"
            id="shareLink"
            onclick="this.focus();this.select()"
            readonly="readonly"
            value="https://www.motionelements.com/lightbox/view/cca5c4bca8bc534ea859b3e6d8150ff7"
          >
        </div>
        -->
      </div>

      <!--
      <div class="pb-5">
        <label for="">Invited:</label>
        <ul class="list-group list-group-flush small overflow-auto" style="max-height:12.5rem">

          <li class="list-group-item px-0">
            <div class="d-flex justify-content-between">
              <div class="flex-grow-1">
                <div class="d-flex align-items-center media-member">
                  <div
                    class="media-member-avatar rounded-circle mr-3"
                    style="
                      background-image: url('https://d25thuhsbcr6yb.cloudfront.net/img/member/avatar/21245/59488954a17dc.jpg');
                      background-size:cover;"
                  ></div>
                  <div class="media-member-info" style="line-height:1.5">
                    <p class="m-0">
                      <span>username@domain.com</span><br />
                      <span class="text-muted">Owner</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="list-group-item px-0">
            <div class="d-flex justify-content-between">
              <div class="flex-grow-1">
                <div class="d-flex align-items-center media-member">
                  <div
                    class="media-member-avatar rounded-circle mr-3"
                    style="
                      background-image: url('https://d25thuhsbcr6yb.cloudfront.net/img/member/avatar/21245/59488954a17dc.jpg');
                      background-size:cover;"
                  ></div>
                  <div class="media-member-info">
                    <p class="m-0">
                      <span>colleague@domain.com</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div class="btn-group">
                  <div class="btn-group">
                    <button
                      class="btn btn-simple-secondary dropdown-toggle btn-member-share"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="dropdown-label">
                        <font-awesome-icon :icon="['far','pencil']" fixed-width></font-awesome-icon>
                      </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item active" href="#">
                        <font-awesome-icon :icon="['far','pencil']" fixed-width></font-awesome-icon> Can edit
                      </a>
                      <a class="dropdown-item" href="#">
                        <font-awesome-icon :icon="['far','eye']" fixed-width></font-awesome-icon> Can view
                      </a>
                    </div>
                  </div>
                  <a class="btn btn-simple-secondary btn-member-share"><font-awesome-icon :icon="['far','times']" fixed-width></font-awesome-icon></a>
                </div>
              </div>

            </div>
          </li>

        </ul>
      </div>
      -->

      <!--
      <div class="d-flex justify-content-between small">
        <a href="#"><font-awesome-icon :icon="['far','link']" fixed-width></font-awesome-icon> Copy project link</a>
        <a href="#">Advanced sharing settings</a>
      </div>
      -->
      <!-- For when ACL sharing is implemented -->

      <p class="mb-0">
        <i18n path="term.google_recaptcha_{privacy}_and_{terms}_text" tag="span" class="text-muted small">
          <template v-slot:privacy>
            <a href="https://policies.google.com/privacy"
               target="_blank"
               class="text-muted">
              <u>{{ $t('term.privacy_policy') }}</u>
            </a>
          </template>
          <template v-slot:terms>
            <a href="https://policies.google.com/terms"
               target="_blank"
               class="text-muted">
              <u>{{ $t('term.terms_of_service') }}</u>
            </a>
          </template>
        </i18n>
      </p>

    </div>

    <!-- embed block -->
    <!--
    <div class="tab-pane fade" id="share-embed" role="tabpanel" aria-labelledby="share-embed-tab">
      <div class="">
        <label for="shareLink">Embed code:</label>
        <div class="form-group d-flex flex-column flex-lg-row">
          <div class="mb-2">
            <div class="dropdown">
              <button class="btn btn-simple-secondary dropdown-toggle" data-toggle="dropdown">
                {{ embedSize.label }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  @click="updateEmbedSize"
                  data-size="400,300"
                >Small</a>
                <a
                  class="dropdown-item"
                  @click="updateEmbedSize"
                  data-size="600,450"
                >Large</a>
                <a
                  class="dropdown-item"
                  @click="updateEmbedSize"
                  data-size="800,600"
                >Custom</a>
              </div>
            </div>
          </div>
          <div class="flex-grow-1 px-0 px-lg-3">
            <div class="mb-2" v-if="embedSize.label == 'Custom'">
              <div class="row mb-2">
                <div class="col-5 col-md-3 pr-0">
                  <input class="form-control" type="number" v-model="embedSize.size[0]">
                </div>
                <div class="col-2 col-md-1 p-0 d-flex justify-content-center align-items-center">
                  <font-awesome-icon :icon="['far','times']" class="mx-2" fixed-width></font-awesome-icon>
                </div>
                <div class="col-5 col-md-3 pl-0">
                  <input class="form-control" type="number" v-model="embedSize.size[1]">
                </div>
              </div>
            </div>
            <div class="d-flex flex-column flex-lg-row">
              <div class="flex-grow-1 mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Embed Code"
                  id="shareEmbed"
                  onclick="this.focus();this.select()"
                  readonly="readonly"
                >
              </div>
              <div class="pl-0 pl-lg-3 mb-2">
                <a class="btn btn-block btn-light">Copy HTML</a>
              </div>

            </div>
            <div v-if="embedSize.label == 'Custom'">
              <a class="btn btn-sm btn-simple-secondary" href="">Preview Embed Box</a>
            </div>
          </div>
        </div>

        <div v-if="embedSize.label != 'Custom'" class="justify-content-center d-none d-lg-flex">
          <div>

            <iframe
              :width="`${embedSize.size[0]}`"
              :height="`${embedSize.size[1]}`"
              src="https://www.motionelements.com/embed/lightbox/9997608?ref=1125gpmug"
              frameborder="0">
            </iframe>

            <div><a href="https://www.motionelements.com" title="MotionElements: ">MotionElements Stock Footage</a></div>
          </div>
        </div>
      </div>
    </div>
    -->
  </Modal>

</template>

<script>
import { emailValidator } from '@/helpers/emailValidator.js';
import * as reCaptcha from '@/helpers/reCaptcha.js';
import ButtonClipboard from '@motionelements/core/src/components/ui/buttons/ButtonClipboard.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'favorites-modal-share',
  // mixins: [clipboardMixin],
  components: {
    Modal: () => import(
      /* webpackChunkName: "base-modal" */
      /* webpackPrefetch: true */
      '@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    InputText: () => import('@motionelements/core/src/components/ui/form/BaseInputText.vue'),
    ButtonClipboard,
    // GoogleRecaptchaDeclare: () => import('frontend-modules/shared/modules/common/GoogleRecaptchaDeclare.vue'),
  },
  data() {
    return {
      isMailValid: false,
      showValidMessage: false,
      inputShareEmail: '',
      recaptchaToken: '',
      // embedSize: {
      //   label: 'Small',
      //   size: [400, 300],
      // },
      currentTab: 'share-link',
    };
  },
  props: {
  },
  computed: {
    ...mapGetters({
      // isMember: 'user/isMember',
      // currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      // currentFolder: 'library/getCurrentFolder',
    }),
    viewUrl() {
      return this.$link(this.$route.fullPath).url().replace('/edit/', '/view/');
    },
  },
  created() {
    reCaptcha.load();
  },
  mounted() {
  },
  methods: {
    // updateEmbedSize: function (event) {
    //   this.embedSize.label = event.target.innerText;
    //   this.embedSize.size = event.target.dataset.size.split(',');
    // },
    checkMail() {
      this.isValid = emailValidator(this.inputShareEmail);

      if (!this.isValid) {
        this.showValidMessage = true;
      }

      if (this.isValid) {
        this.doShareFavoritesFolder();
      }
    },
    async doShareFavoritesFolder() {
      const currentFolderId = this.currentFolderId;
      const inputShareEmail = this.inputShareEmail;

      if (!_.size(currentFolderId) || !_.size(inputShareEmail)) {
        console.log('doShareFavoritesFolder no info');
        return;
      }

      this.recaptchaToken = await reCaptcha.getToken('favorites_share');

      const emails = [];
      emails.push(inputShareEmail);

      const info = {
        'recaptchaToken': this.recaptchaToken,
        'folderId': currentFolderId,
        'emails': emails,
      };

      console.log('doShareFavoritesFolder', info);

      this.$store.dispatch('library/doShareFavorites', info).then((response) => {
        console.log('doShareFavorites done : ', response);

        $('#favgrp-share').modal('hide');

        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'success',
          title: this.$i18n.t('favorites.folder_shared'),
          autohide: true,
          delay: 3000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group.flex-grow-1 {
  > .dropdown-toggle {
    &:after {
      position:absolute;
      right:$spacer;
      top:50%;
      transform: translateY(-50%);
    }
  }
}

.media-member-avatar {
  @include media-breakpoint-up(lg) {
    width: 3rem;
    height: 3rem;
  }

  @include media-breakpoint-down(md) {
    width: 2rem;
    height: 2rem;
  }
}

.btn-member-share {
  @include media-breakpoint-down(md) {
    @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $font-size-sm, $line-height-sm, $btn-border-radius-sm);
  }
}

//
// COLORS
//

.btn-light {

  .ui-dark & {
    background: $black;

    &:hover {
      background: map-get(map-get($theme-colors-variants,"black"),"1"),
    }
  }
}

.list-group-flush .list-group-item {
  .ui-dark & {
    background: $transparent;
  }
}
</style>
