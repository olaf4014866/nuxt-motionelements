<template>
  <div>
    <div>
      <p class="lead text-black mb-0">
        Available with unlimited subscription
      </p>
      <p class="text-black">
        This Element is available in our Unlimited Subscription Plan.
      </p>
    </div>
    <a
      :href="$link('/subscribe').url()"
      class="btn btn-white-secondary text-nowrap"
    >
      Learn More
    </a>
  </div>
</template>
