<template>
  <div class="modal fade" id="favgrp-share" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header d-block border-0 pb-0">
          <div class="d-flex">
            <h5 class="modal-title">
              {{ $t('favorites.share_favorites') }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ul class="row nav nav-tabs small" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#share-link" role="tab">
                <font-awesome-icon :icon="['far','link']" fixed-width></font-awesome-icon>
                {{ $t('favorites.link') }}
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
        <div class="modal-body tab-content py-5">

          <div class="tab-pane fade show active" id="share-link" role="tabpanel" aria-labelledby="share-link-tab">
            <div class="pb-5">

              <label>
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
              <GoogleRecaptchaDeclare />
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

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emailValidator } from '@/helpers/emailValidator.js';
import * as reCaptcha from '@/helpers/reCaptcha.js';

import { mapGetters } from 'vuex';

export default {
  name: 'favorites-modal-share',
  components: {
    GoogleRecaptchaDeclare: () => import('frontend-modules/shared/modules/common/GoogleRecaptchaDeclare.vue'),
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
