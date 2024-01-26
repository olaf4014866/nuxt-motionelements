<template>
  <div class="card flex-grow-1 rounded overflow-hidden">
    <div class="card-body p-5 position-relative d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center">
      <div>
        <font-awesome-icon
          :icon="['fal','check-circle']"
          size="10x"
          class="text-success"
        />
      </div>
      <div>
        <h2>
          You have used up your free downloads this week.
        </h2>
        <p class="lead font-weight-bold">
          Come back later or invite your friends to join MotionElements to increase your weekly quota.
        </p>
      </div>
    </div>
  </div>
</template>
