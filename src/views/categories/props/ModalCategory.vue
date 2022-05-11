<template>
    <v-form>
        <v-row>
            <v-col cols="12" md="3">
                <label for="name">Name</label>
            </v-col>

            <v-col cols="12" md="9">
                <v-text-field id="name" v-model="category.name" outlined dense placeholder="Name" hide-details>
                </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                <label for="price">Image URL</label>
            </v-col>
            <v-col cols="12" md="9">
                <v-text-field id="name" v-model="category.name" outlined dense placeholder="Image URL" hide-details>
                </v-text-field>
            </v-col>
            <v-col offset-md="3" cols="12" class="text-center">
                <v-btn class="mx-2 " outlined >
                    Submit
                </v-btn>
            </v-col>
        </v-row>
    </v-form>

</template>
<script>
import CategoryService from '@/service/category.service';
export default {
    name: "ModalCategory",
    data() {
        return {
            category: {
                name: '',
                image_url: '',
            }
        }
    },

    methods: {
        submit() {
            CategoryService.createCategory(this.category).then(res => {
                this.active = false;
                this.$emit('reload');
                this.$vs.notify({
                    title: 'Success created',
                    text: `Category ${this.data.name} has been created`,
                    color: 'success',
                    icon: 'check'
                })
            }).catch(err => {
                this.$vs.notify({
                    title: 'Error',
                    text: err.response.data.message,
                    color: 'danger',
                    icon: 'error'
                })
            })

        }
    }
}
</script>