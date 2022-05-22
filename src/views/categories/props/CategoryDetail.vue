<template>
  <v-form>
    <v-row :v-if="categories">
      <v-col cols="12" md="3">
        <label for="name">Name</label>
      </v-col>

      <v-col cols="12" md="7">
        <p class="subtitle-1 text-truncate mb-0">{{ newName || data.name }}</p>
      </v-col>
      <v-col cols="12" md="2">
        <vs-button @click="activePrompt1 = true" color="primary" type="border"><i class="fa fa-edit"></i></vs-button>
      </v-col>
      <v-col cols="12" md="3">
        <label for="price">Image URL</label>
      </v-col>

      <v-col cols="12" md="7">
        <p class="subtitle-1 text-truncate mb-0">{{ newImageURL || data.image_url }}</p>
      </v-col>
      <v-col cols="12" md="2">
        <vs-button @click="activePrompt2 = true" color="primary" type="border"><i class="fa fa-edit"></i></vs-button>
      </v-col>
      <v-col cols="12" md="3">
        <vs-popup title="New Category" :active.sync="active">
          <modal-category v-if="active"></modal-category>
        </vs-popup>
        <label for="price">Children </label>
        <i class="fa fa-plus" v-on:click="active = true"></i>
      </v-col>
      <v-col cols="12" md="9">
        <vs-table stripe :data="categories">
          <template slot="thead">
            <vs-th>
              #
            </vs-th>
            <vs-th>
              Name
            </vs-th>
            <vs-th>
              Image URL
            </vs-th>
            <vs-th>
              Action
            </vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                {{ indextr + 1 }}
              </vs-td>

              <vs-td>
                {{ data[indextr].name }}
              </vs-td>

              <vs-td>
                <render-image :data="tr"></render-image>
              </vs-td>

              <vs-td>
                <button class="btn btn-outline-primary" @click="handleAction('edit')">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-outline-dark" @click="handleAction('delete')">
                  <i class="fa fa-trash"></i>
                </button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </v-col>
    </v-row>

    <vs-prompt @cancel="newName = ''" @accept="updateInfo" :active.sync="activePrompt1">
      <div class="con-exemple-prompt">
        Enter Value
        <vs-input placeholder="Value" v-model="newName" />
      </div>
    </vs-prompt>
    <vs-prompt @cancel="newImageURL = ''" @accept="updateInfo" :active.sync="activePrompt2">
      <div class="con-exemple-prompt">
        Enter Value
        <vs-input placeholder="Value" v-model="newImageURL" />
      </div>
    </vs-prompt>
  </v-form>
</template>
<script>
import CategoryService from '@/service/category.service'
import ModalCategory from './ModalCategory.vue'
import RenderImage from './RenderImage.vue'
export default {
  name: 'CategoryDetailModal',
  components: {
    ModalCategory,
    RenderImage,
  },
  data() {
    return {
      isLoading: true,
      categories: null,
      newName: null,
      newImageURL: null,
      activePrompt1: false,
      activePrompt2: false,
      active: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  beforeMount() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.isLoading = true
      const res = await CategoryService.getChildCategory(this.data.id)
      this.categories = res.data.categories
      this.isLoading = false
    },
    handleAction(actionName) {
      switch (actionName) {
        case 'edit':
          this.$emit('edit', this.data)
          break
        case 'delete':
          this.$emit('delete', this.data)
          break
        default:
          break
      }
    },
    updateInfo() {
      CategoryService.updateCategory(this.data.id, {
        name: this.newName || this.data.name,
        image_url: this.newImageURL || this.data.image_url,
      })
    },
  },
}
</script>
