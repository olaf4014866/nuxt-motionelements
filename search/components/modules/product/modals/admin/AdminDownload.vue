<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            Admin Download
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs">
            <li
              v-for="tab in tabs"
              :key="`admin-tab-${tab.id}`"
              class="nav-item"
            >
              <a
                class="nav-link"
                :class="isActive === tab.id ? 'active' : ''"
                @click="switchTab(tab.id)"
              >
                {{ tab.label }}
              </a>
            </li>
          </ul>
          <div class="tab-content py-3">

            <div
              v-if="isActive === 'poster'"
            >
              <p class="text-center small">
                Right-click and select "Save As..." to download.
              </p>
              <img
                class="img-fluid"
                src="https://media-us-west-motionelements.s3.amazonaws.com/m/s/12284/12274689/u-5be410f708f2e.jpg"
              />
            </div>

            <div
              v-if="isActive === 'stills'"
            >
              <p class="lead">
                Download Preview Source<br />
                <small>Auto Stills</small>
              </p>

              <div class="row">
                <div class="col-6 col-sm-4 col-lg-3">
                  <div class="card mb-3">
                    <img src="https://d1o2pwfline4gu.cloudfront.net/m/t/12142/12132669/a-0120.jpg" class="card-img-top">
                    <div class="card-body">
                      <a href="#" class="btn btn-sm btn-primary">a-0005.jpg</a>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-4 col-lg-3">
                  <div class="card mb-3">
                    <img src="https://d1o2pwfline4gu.cloudfront.net/m/t/12142/12132669/a-0120.jpg" class="card-img-top">
                    <div class="card-body">
                      <a href="#" class="btn btn-sm btn-primary">a-0005.jpg</a>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-4 col-lg-3">
                  <div class="card mb-3">
                    <img src="https://d1o2pwfline4gu.cloudfront.net/m/t/12142/12132669/a-0120.jpg" class="card-img-top">
                    <div class="card-body">
                      <a href="#" class="btn btn-sm btn-primary">a-0005.jpg</a>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-4 col-lg-3">
                  <div class="card mb-3">
                    <img src="https://d1o2pwfline4gu.cloudfront.net/m/t/12142/12132669/a-0120.jpg" class="card-img-top">
                    <div class="card-body">
                      <a href="#" class="btn btn-sm btn-primary">a-0005.jpg</a>
                    </div>
                  </div>
                </div>

                <div class="col-6 col-sm-4 col-lg-3">
                  <div class="card mb-3">
                    <img src="https://d1o2pwfline4gu.cloudfront.net/m/t/12142/12132669/a-0120.jpg" class="card-img-top">
                    <div class="card-body">
                      <a href="#" class="btn btn-sm btn-primary">a-0005.jpg</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="isActive === 'gif'"
            >
              <p class="lead">
                Animated GIF
              </p>

              <form>
                <div class="form-group">
                  <label for="resolution" class="optional">Resolution</label>
                  <select
                    name="resolution"
                    id="resolution"
                    class="form-control"
                  >
                    <option value="1200x675">1200 x 675</option>
                    <option value="320x180">320 x 180</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="duration" class="optional">Duration</label>
                  <div class="input-group">
                    <input type="number" class="form-control" id="duration" value="6" required>
                    <div class="input-group-append">
                      <span class="input-group-text">seconds</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div
              v-if="isActive === 'asset'"
            >
              <div class="list-group">

                <div class="list-group-item list-group-item-action">
                  <p class="small text-dark border-bottom">
                    12132669-4339630
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="mb-0 small">
                        HD
                        <span class="badge badge-success">Proxy</span>
                        <br />
                        22.6 MB
                      </p>
                    </div>
                    <a
                      href="#"
                      class="btn btn-primary"
                    >
                      <font-awesome-icon
                        :icon="['far','me-download']"
                      ></font-awesome-icon>
                      Proxy
                    </a>
                  </div>
                </div>

                <div class="list-group-item list-group-item-action">
                  <p class="small text-dark border-bottom">
                    12132669-4339630
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <p class="mb-0 small">
                        HD
                        <span class="badge badge-secondary">master</span>
                        <span class="badge badge-danger">COLD (Cost $$$)</span>
                        <br />
                        31.0 MB
                      </p>
                    </div>
                    <a
                      href="#"
                      class="btn btn-secondary"
                    >
                      <font-awesome-icon
                        :icon="['far','me-download']"
                      ></font-awesome-icon>
                      Prepare Download
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <div
              v-if="isActive === 'preview'"
            >
              <PlayerVideo
                :previews="{
                  'mp4': {
                    'url': 'https://d3auje5car4oak.cloudfront.net/v/13700/13690928_a-01.mp4',
                  },
                }"
              ></PlayerVideo>
              <a
                href="#"
                class="btn btn-block btn-primary"
              >
                Download this preview video
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-admin-download',
  data() {
    return {
      isActive: 'poster',
      tabs: [
        {
          id: 'poster',
          label: 'Poster',
        },
        {
          id: 'stills',
          label: 'Stills',
        },
        {
          id: 'gif',
          label: 'Gif',
        },
        {
          id: 'asset',
          label: 'Asset',
        },
        {
          id: 'preview',
          label: 'Uploaded Preview',
        },
      ],
    };
  },
  components: {
    PlayerVideo: () => import('@/components/modules/product/preview/players/PlayerVideo.vue'),
  },
  methods: {
    switchTab(str) {
      this.isActive = str;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
