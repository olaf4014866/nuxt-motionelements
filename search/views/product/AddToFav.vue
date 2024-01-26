<template>
  <div class="py-6">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <button type="button" class="btn btn-lg btn-white-secondary" data-toggle="modal" data-target="#addToFav">
            <i class="far mer icon-heart"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="addToFav" tabindex="-1" role="dialog" aria-labelledby="addToFav" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Save To Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <a href="#" id="createNewProjectBtn" class="btn btn-white-primary ml-n3 collapse multi-collapse show" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="createNewProject createNewProjectBtn">
                  Create New Project
                </a>
                <div id="createNewProject" class="collapse multi-collapse">
                  <form>
                    <div class="form-group">
                      <label class="col-form-label col-form-label-sm" for="newProjectName">Name</label>
                      <input type="text" class="form-control form-control-sm" id="newProjectName" placeholder="Name your project">
                    </div>
                    <!-- <div class="form-group">
                      <label class="col-form-label col-form-label-sm" for="newProjectResolution">
                        Resolution <span class="text-muted small">(Optional)</span>
                      </label>
                      <select class="custom-select custom-select-sm">
                        <option selected>Select resolution</option>
                        <option value="hd">HD</option>
                        <option value="4k">4K</option>
                      </select>
                    </div> -->
                    <div class="d-flex justify-content-end pb-3">
                      <button type="submit" class="btn btn-sm btn-white-gray" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="createNewProject createNewProjectBtn">Cancel</button>&nbsp;
                      <button type="submit" class="btn btn-sm btn-primary">Create</button>
                    </div>
                  </form>
                </div>
              </li>
              <AddToFavListItem
                v-for="favList in favLists"
                :key="favList.id"
                :favList="favList"
              ></AddToFavListItem>
              <!-- <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="small">List Name 1</div>
                  <button class="btn btn-lg btn-favorite btn-bounce-icon p-0"><i class="far mer icon-heart"></i></button>
                </div>
              </li> -->
            </ul>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToFavListItem from '@/components/modules/common/AddToFavListItem.vue';

export default {
  components: {
    AddToFavListItem,
  },
  data() {
    return {
      favLists: [
        {
          id: '121',
          name: 'VideoCEO Templates',
          resolution: 'HD',
        },
        {
          id: '122',
          name: 'GDN Animation V1710',
        },
        {
          id: '123',
          name: 'Corporate Landing Page Background',
        },
        {
          id: '124',
          name: '分享會DEMO模板',
        },
        {
          id: '125',
          name: 'VR 360° Animated Background Selections',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-favorite {
  &:hover {
    color: $primary;
  }
}
</style>
