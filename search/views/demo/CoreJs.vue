<template>
  <section>
    <div class="container py-5">
      <h1>URL, URLSearchParams</h1>
      <p>Test core js polyfill for IE11</p>
      <p>Environment: {{ env }}</p>
      <p>https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams</p>

      <dt>URL</dt>
      <dd>{{ urlParts }}</dd>

      <dt>URL.pathname</dt>
      <dd>{{ urlParts.pathname }}</dd>

      <dt>URL.searchParams</dt>
      <dd>{{ urlParts.searchParams }}</dd>

      <dt>URLSearchParams.get()</dt>
      <dd>{{ params.get('foo') }}</dd>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      terms: [],
    };
  },
  computed: {
    urlParts() {
      const url = 'https://www.motionelements.com/test?foo=bar';
      return new URL(url);
    },
    params() {
      return new URLSearchParams('q=URLUtils.searchParams&foo=bar');
    },
    env() {
      return process.env.NODE_ENV;
    },
  },
  methods: {
    // setFontLoaded() {
    //   this.$emit('font-loaded');
    // },
  },
};
</script>
