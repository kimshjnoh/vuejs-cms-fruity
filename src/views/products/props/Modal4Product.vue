<template>
    <vs-popup :title="isNew ? 'New Product' : 'Edit Product'" :active.sync="active">
        <v-form>
            <v-row>
                <v-col cols="12" md="3">
                    <label for="name">Name</label>
                </v-col>

                <v-col cols="12" md="9">
                    <v-text-field id="name" v-model="product.name" outlined dense placeholder="Name" hide-details>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <label for="price">Price</label>
                </v-col>

                <v-col cols="12" md="9">
                    <v-text-field id="price" v-model="product.price" type="number" outlined dense placeholder="Price" hide-details>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <label for="image_url">Image URL</label>
                </v-col>

                <v-col cols="12" md="9">
                    <v-text-field id="image_url" v-model="product.image_url" outlined dense placeholder="Image URL"
                        hide-details></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <label for="description">Description</label>
                </v-col>

                <v-col cols="12" md="9">
                    <v-text-field id="description" v-model="product.description" outlined dense
                        placeholder="Description" hide-details></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <label for="unit">Unit</label>
                </v-col>

                <v-col cols="12" md="9">
                    <v-text-field id="unit" v-model="product.unit" outlined dense placeholder="Unit" hide-details>
                    </v-text-field>
                </v-col>

                <v-col offset-md="3" cols="12" class="text-center">
                    <v-btn class="mx-2 " outlined @click="submit()">
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </vs-popup>
</template>
<script>
import productService from '@/service/product.service';
export default {
    name: "Modal4Product",
    props: {
        data: {
            type: Object,
            required: false,
        },
        active: {
            type: Boolean,
            required: true,
        },
        isNew: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        product() {
            return this.data ? this.data : {};
        },
    },
    methods: {
        submit() {
            if (this.isNew) {
                productService.createProduct(this.product).then(res => {
                    this.active = false;
                    this.$emit('reload');
                    this.$vs.notify({
                        title: 'Success created',
                        text: `Product ${this.data.name} has been created`,
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
            } else {
                productService.updateProduct(this.product).then(res => {
                    this.active = false;
                    this.$emit('reload');
                    this.$vs.notify({
                        title: 'Success updated',
                        text: `Product ${this.data.name} has been updated`,
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
}
</script>