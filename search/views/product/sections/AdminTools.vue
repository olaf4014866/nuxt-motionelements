<template>
  <div
    v-if="isAdmin"
    class="card border-danger"
  >
    <div class="card-body">
      <h5 class="card-title text-danger">Admin Tools</h5>
      <p class="card-text small">
        <button
          class="btn btn-sm btn-light btn-block mb-2"
          @click="adminClick('support-note')"
        >
          <font-awesome-icon :icon="['far','pencil']" class="mr-1"></font-awesome-icon> Support note
        </button>
        <button
          class="btn btn-sm btn-light btn-block mb-2"
          @click="adminClick('admin-download')"
        >
          <font-awesome-icon :icon="['far','me-download']" class="mr-1"></font-awesome-icon> Download Stills
        </button>
        <button
          class="btn btn-sm btn-light btn-block mb-2"
          @click="adminClick('request-release')"
        >
          <font-awesome-icon :icon="['far','file-alt']" class="mr-1"></font-awesome-icon> Request release
        </button>
        <button
          class="btn btn-sm btn-light btn-block mb-2"
          @click="adminClick('suspend-element')"
        >
          <font-awesome-icon :icon="['far','snooze']" class="mr-1"></font-awesome-icon> Suspend product
        </button>
      </p>
    </div>
  </div>
</template>
