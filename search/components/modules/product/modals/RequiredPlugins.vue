<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Required Plugins</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="row mb-3 align-items-center">
            <div class="col text-left text-sm-center">
              <font-awesome-icon
                :icon="['fal','plug']"
                size="3x"
                class="text-info"
              ></font-awesome-icon>
            </div>
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <h4 class="h5">こちらのテンプレートは外部プラグインが必要です</h4>
            </div>
          </div>

          <div class="row justify-content-end">
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <div class="list-group">
                <div href="#" class="list-group-item list-group-item-action">
                  Magic Bullet Looks
                </div>
                <a href="#" class="list-group-item list-group-item-action">
                  Video Copilot Optical Flares
                  <font-awesome-icon
                    :icon="['far','external-link']"
                  ></font-awesome-icon>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  Video Copilot Element 3D
                  <font-awesome-icon
                    :icon="['far','external-link']"
                  ></font-awesome-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-required-version',
  data() {
    return {
      aeVer: [
        'CS6',
        'CC',
        'CC 2014',
        'CC 2015',
        'CC 2015.3',
        'CC 2017',
        'CC 2018',
        'CC 2018.1',
        'CC 2019',
        'CC 2019.1',
      ],
      motionVer: [
        '3',
        '4',
        '5',
        '5.1',
        '5.1.2',
        '5.2',
        '5.3',
        '5.4',
      ],
    };
  },
  props: {
    element: Object,
  },
  computed: {
    templateType() {
      switch (this.element.mediaType) {
        case 'motion-template':
          return 'motion';
        case 'pr-template':
        case 'pr-preset':
        case 'mg-template':
          return 'pr';
        default:
          return 'ae';
      }
    },
    mediatypeIcon() {
      switch (this.templateType) {
        case 'motion':
          return 'apple-motion';
        case 'pr':
          return 'adobe-premiere-pro';
        default:
          return 'after-effects-square';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
