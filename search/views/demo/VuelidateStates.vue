<template>
  <code>
    <p>invalid: {{ object.$invalid }}</p>
    <p>error: {{ object.$error }}</p>
    <p>anyError: {{ object.$anyError }}</p>
    <p>dirty: {{ object.$dirty }}</p>
  </code>
</template>

<script>
export default {
  name: 'test',
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
  data() {
  },
};
</script>
