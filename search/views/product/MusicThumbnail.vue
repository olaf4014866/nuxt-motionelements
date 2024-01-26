<template>
  <div class="py-6">
    <div class="container">
      <h1>Music Thumbnail</h1>
    </div>
    <div class="container py-6">
      <h4>wavesurfer test</h4>
      <WaveSurfer />
      <ul class="mt-3">
          <li>
            <a href="https://github.com/katspaugh/wavesurfer.js/issues/535#issuecomment-145982732">
              Saving the waveform to a json to address avoiding loading all the audio files to generate waveform.
            </a>
          </li>
          <li>
            <a href="https://github.com/katspaugh/wavesurfer.js/issues/1316">
              Save wavesurfer state and preload on reload
            </a>
          </li>
        </ul>
    </div>
    <div class="container py-6">
      <h4>soundmanager2 test</h4>
      <!-- <SoundManager /> -->
      <!-- <div class="row">
        <div class="col-2 col-player">
          <a class="btn-sm2-play">
            <i class="fal fa-3x fa-play-circle"></i>
          </a>
          <a class="btn-sm2-stop">
            <i class="fal fa-3x fa-stop-circle"></i>
          </a>
        </div>
        <div class="col-10">
        </div>
      </div> -->
    </div>
    <div class="container-fluid py-6 mt-6 test-search-content">
      <h4>Thumbnail Layout</h4>
      <!-- <div class="card card-audio border-0 d-none d-md-flex mb-3">
        <div class="p-3 bg-white">
          <div class="row">
            <div class="col-6 pr-0">
              <WaveSurfer />
            </div>
            <div class="col-6 pl-0">
              <div class="h-100 d-flex align-items-center">
                <div class="flex-fill h-100 d-flex align-items-center">
                  <div class="col-5 col-xl-4 col-xxl-4 px-0 text-right small text-nowrap">
                    <span class="badge badge-pill badge-light ml-1">P.R.O.</span>
                    <span class="badge badge-pill badge-info ml-1"><i class="fas fa-fw mes icon-lightning"></i></span>
                  </div>
                  <div class="col pr-0">
                    <div class="list-inline mb-0 small">
                      <a href="#" class="list-inline-item small">Mysterious</a>
                      <a href="#" class="list-inline-item small">Classical</a>
                    </div>
                    <ul class="list-inline mb-0 small text-muted">
                      <li class="list-inline-item small"><i class="far fa-clock"></i> 1:59</li>
                      <li class="list-inline-item small">83 BPM</li>
                      <li class="list-inline-item small">No Loop</li>
                    </ul>
                  </div>
                </div>
                <div class="col-actionables pr-2">
                  <a href="#" class="text-secondary px-2"><i class="fal fa-lg fa-fw mel icon-heart"></i></a>
                  <a href="#" class="text-secondary px-2"><i class="fal fa-lg fa-fw mel icon-search-ai"></i></a>
                  <a href="#" class="text-secondary px-2"><i class="fal fa-lg fa-fw mel icon-download"></i></a>
                  <a href="#" class="btn btn-secondary ml-2"><i class="fas fa-lg fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <ElementCardAudioDesktop />
      <ElementCardAudioMobile />
    </div>
  </div>
</template>

<script>
// import SoundManager from '@/components/modules/SoundManager.vue';
import WaveSurfer from '@/components/modules/WaveSurfer.vue';
import ElementCardAudioMobile from '@/components/modules/common/ElementCardAudioMobile.vue';
import ElementCardAudioDesktop from '@/components/modules/common/ElementCardAudioDesktop.vue';

export default {
  components: {
    // SoundManager,
    WaveSurfer,
    ElementCardAudioMobile,
    ElementCardAudioDesktop,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "src/assets/scss/bootstrap-custom/variables";

.card-audio {
  // shadows
  > div {
    @include border-radius;
    transition: box-shadow 0.2s ease-in-out;
    @include box-shadow($box-shadow-sm);
  }
  .col-actionables {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    > div {
      @include box-shadow($box-shadow);

      .card-actionables {
        // transform: translateY(0);
        opacity: 1;
      }
    }
    .col-actionables {
      opacity: 1;
    }
  }
}

.ws-play, .sm2-play {
  border-radius: 50%;

  .fa-play {
    margin-left: .075rem;
    margin-right: -.075rem;
  }
}

// temp

.test-search-content {
  @media (min-width: 992px) {
    width:calc(100vw - 282px);
  }
}
</style>
