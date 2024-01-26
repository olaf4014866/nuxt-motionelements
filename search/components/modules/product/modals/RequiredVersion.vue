<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('product_details.compitable_with') }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="row mb-3 align-items-center">
            <div class="col text-left text-sm-center">
              <font-awesome-icon
                :icon="['fas',`me-${mediatypeIcon}`]"
                size="3x"
                class="text-info"
              ></font-awesome-icon>
            </div>
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <h4 class="h5">{{ $t('product_details.compitable_with') }}</h4>
            </div>
          </div>

          <div class="row justify-content-end">
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <div>
                <template v-if="templateType === 'ae'">
                  <p>
                    <span class="font-weight-bold">Adobe After Effects</span><br />
                    CS6、CC、CC 2014、CC 2015、CC 2015.3、CC 2017、CC 2018、CC 2018.1、CC 2019、CC 2019.1
                    以上
                  </p>
                  <ul class="small border py-3 pr-3 rounded mb-0">
                    <li>
                        What is <a href="#">After Effects</a>?
                    </li>
                    <li>
                        If you do not have the required version, get the latest <a href="#">After Effects CC</a>.<br />
                        <small class="text-muted">After Effects CC is compatible with all templates.</small>
                    </li>
                  </ul>
                </template>

                <template v-if="templateType === 'pr'">
                  <p>
                    <span class="font-weight-bold">Adobe Premiere Pro</span><br />
                    CS6、CC、CC 2014、CC 2015、CC 2015.3、CC 2017、CC 2018、CC 2018.1、CC 2019、CC 2019.1以上
                  </p>
                  <ul class="small border py-3 pr-3 rounded mb-0">
                    <li>
                        What is <a href="#">Premiere Pro</a>?
                    </li>
                    <li>
                        If you do not have the required version, get the latest <a href="#">Premiere Pro CC</a>.<br />
                        <small class="text-muted">Premiere Pro CC is compatible with all templates.</small>
                    </li>
                  </ul>
                </template>

                <template v-if="templateType === 'motion'">
                  <p>
                    <span class="font-weight-bold">Apple Motion</span><br />
                    3、4、5、5.1、5.1.2、5.2、5.3、5.4
                    以上
                  </p>
                  <ul class="small border py-3 pr-3 rounded mb-0">
                    <li>
                        What is <a href="#">Apple Motion</a>?
                    </li>
                    <li>
                        If you do not have the required version, get the latest <a href="#">Apple Motion</a>.
                    </li>
                  </ul>
                </template>
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
