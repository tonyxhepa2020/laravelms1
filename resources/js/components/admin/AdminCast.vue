<template>
    <main class="mt-2">
        <div class="bg-white py-4 px-4 sm:px-6 lg:col-span-3 xl:pl-12 shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <div class="max-w-lg mx-auto lg:max-w-none">
                <form class="flex">
                    <div class="p-1">
                        <label for="tmdb_id_g" class="sr-only">Tmdb Id</label>
                        <div class="relative rounded-md shadow-sm">
                            <input
                                v-model="tmdb_id_g"
                                id="tmdb_id_g"
                                name="tmdb_id_g"
                                class="form-input block w-full py-2 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                                placeholder="Tag Name">
                        </div>
                        <p v-if="errorMessage" class="text-red-500 mt-1">{{ errorMessage }}</p>
                    </div>
                    <div class="p-1">
                        <span class="inline-flex rounded-md shadow-sm">
                            <button
                                type="submit"
                                @click.prevent="generateCast"
                                class="inline-flex items-center justify-center py-2 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50">
                                <svg v-if="isGLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>Generate</span>
                            </button>
                            <button @click.prevent="clear" class="p-2 bg-red-300 hover:bg-red-500 text-white ml-3 rounded-lg">Cancel</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="isShowingForm" class="bg-white py-4 px-4 sm:px-6 mt-2 lg:col-span-3 xl:pl-12 shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <div class="max-w-lg mx-auto lg:max-w-none">
                <form class="grid grid-cols-1 row-gap-6 mt-2">
                    <div>
                        <label for="tmdb_id" class="sr-only">Tmdb Id</label>
                        <div class="relative rounded-md shadow-sm">
                            <input
                                v-model="cast.tmdb_id"
                                id="tmdb_id"
                                name="tmdb_id"
                                class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                                placeholder="Tmdb Id">
                        </div>
                        <p v-if="errorMessage" class="text-red-500 mt-1">{{ errorMessage }}</p>
                    </div>
                    <div>
                        <label for="name" class="sr-only">Name</label>
                        <div class="relative rounded-md shadow-sm">
                            <input
                                v-model="cast.name"
                                id="name"
                                name="name"
                                class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                                placeholder="Name">
                        </div>
                        <p v-if="errorMessage" class="text-red-500 mt-1">{{ errorMessage }}</p>
                    </div>
                    <div>
                        <label for="poster_path" class="sr-only">Poster</label>
                        <div class="relative rounded-md shadow-sm">
                            <input
                                v-model="cast.poster_path"
                                id="poster_path"
                                name="poster_path"
                                class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
                                placeholder="Poster">
                        </div>
                        <p v-if="errorMessage" class="text-red-500 mt-1">{{ errorMessage }}</p>
                    </div>
                    <div class="">
                        <span class="inline-flex rounded-md shadow-sm">
                            <button
                                type="submit"
                                v-if="!isEdit"
                                @click.prevent="createCast"
                                class="inline-flex items-center justify-center py-2 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50">
                                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>Save</span>
                            </button>
                             <button
                                 type="submit"
                                 v-if="isEdit"
                                 @click.prevent="updateCast(cast)"
                                 class="inline-flex items-center justify-center py-2 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50">
                                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span>Update</span>
                            </button>
                            <button @click.prevent="closeForm" class="p-2 bg-red-300 hover:bg-red-500 text-white ml-3 rounded-lg">Cancel</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <div class="flex flex-col mt-8">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between">
                        <div class="max-w-lg w-full lg:max-w-xs">
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input
                                    v-model.lazy="search"
                                    v-debounce="delay"
                                    id="search"
                                    class="block w-1/2 md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                                    placeholder="Search"
                                    type="search">
                            </div>
                        </div>
                        <div class="relative">
                            <select
                                v-model="perPage"
                                class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state">
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>25</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">

                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-left">
                                    <div class="flex items-center">
                                        <button class="bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cast Name</button>
                                    </div>
                                </th>
                                <th
                                    class="px-6 py-3 text-left">
                                    <div class="flex items-center">
                                        <button class="bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Tmdb Id</button>
                                    </div>
                                </th>
                                <th class="px-6 py-3 bg-gray-50">
                                    <div class="flex justify-center">Action</div>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="cast in casts" :key="cast.id" >
                                <td class="w-4/12 px-6 py-4 whitespace-no-wrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            <div class="text-sm leading-5 font-medium text-gray-900">
                                                {{ cast.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="w-4/12 px-6 py-4 whitespace-no-wrap">
                                    <div class="text-sm leading-5 text-gray-900">{{ cast.tmdb_id}}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <div class="flex justify-around">
                                        <button @click.prevent="editCast(cast)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button @click.prevent="destroyCast(cast)" class="text-red-600 hover:text-red-900 ml-3">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4">
                        <pagination
                            :pagination="pagination"
                            @prev="getCasts(pagination.prevPageUrl)"
                            @next="getCasts(pagination.nextPageUrl)"
                        ></pagination>
                    </div>
                </div>
            </div>
            <div class="h-96"></div>
        </div>
        <div class="font-bold text-lg">
            <notifications group="foo" />
        </div>
    </main>
</template>

<script>
import debounce from "v-debounce";
import Pagination from "./Pagination";

export default {
    name: "AdminCast",
    components: {Pagination},
    data() {
        return {
            isLoading: false,
            isGLoading: false,
            isShowingForm: false,
            delay: 1000,
            search: '',
            perPage: 5,
            casts: [],
            cast: {
                tmdb_id: '',
                name: '',
                poster_path: '',
                updated_at: ''
            },
            poster_url: null,
            tmdb_id_g: '',
            errorMessage: '',
            isEdit: false,
            pagination: {
                lastPage: '',
                currentPage: '',
                total: '',
                lastPageUrl: '',
                nextPageUrl: '',
                prevPageUrl: '',
                from: '',
                to: ''
            },
        }
    },
    watch: {
        search(){
            this.getCasts()
        },
        perPage(){
            this.getCasts();
        }
    },
    async created() {
        await this.getCasts();
    },
    methods: {
        getCasts(url =  '/api/admin/admin-casts'){
            const _this = this;
            axios.get(url, {params: {
                    search: _this.search,
                    per_page: _this.perPage
                }})
                .then(res => {
                    _this.casts = res.data.data;
                    _this.configPagination(res.data);
                    this.$notify({
                        group: 'foo',
                        type: 'info',
                        title: 'Important message',
                        text: 'Al casts are hire',
                        duration: 5000,
                    });
                }).catch(error => {
                    _this.isLoading = false;
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Important message',
                    text: error,
                    duration: 5000,
                });

            })
        },

        createCast(){
            const _this = this;
            if (!this.cast.poster_path){
                this.poster_url = null
            }else if (this.cast.poster_path){
                this.poster_url = 'https://image.tmdb.org/t/p/w185'+_this.cast.poster_path;
            }
            axios.post('/api/admin/admin-casts', {
                'tmdb_id': _this.cast.tmdb_id,
                'name': _this.cast.name,
                'poster_path': _this.poster_url
            })
                .then(res => {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Success message',
                        text: res.data,
                        duration: 5000,
                    });
                    _this.getCasts();
                    _this.clear();
                }).catch(error => {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error message',
                    text: error.data,
                    duration: 5000,
                });
                if (error.response.status == 422){
                    const key = Object.keys(error.response.data.errors)[0];
                    _this.errorMessage = error.response.data.errors[key][0];
                }
            })
        },
        editCast(cast){
            this.isShowingForm = true;
            this.isEdit = true;
            this.cast = cast
        },
        updateCast(cast){
            this.isLoading = true;
            const _this = this;
            if (!this.cast.poster_path){
                this.poster_url = null
            }else if (this.cast.poster_path){
                this.poster_url = 'https://image.tmdb.org/t/p/w185'+_this.cast.poster_path;
            }
            axios.post('/api/admin/admin-casts/'+ cast.slug, {
                'tmdb_id': cast.tmdb_id,
                'name': cast.name,
                'poster_path': _this.poster_url,
                _method: "PUT"
            })
                .then(res => {
                    _this.getCasts();
                    _this.isLoading = false;
                    _this.clear();
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Success message',
                        text: res.data,
                        duration: 5000,
                    });
                    _this.isEdit = false;
                }).catch(error => {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error message',
                    text: error.data,
                    duration: 5000,
                });
                if (error.response.status == 422){
                    const key = Object.keys(error.response.data.errors)[0];
                    _this.errorMessage = error.response.data.errors[key][0];
                }
            })

        },
        destroyCast(cast){
            const  _this = this
            axios.delete('/api/admin/admin-casts/'+ cast.slug)
                .then(res => {
                    _this.getCasts();
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Success message',
                        text: res.data,
                        duration: 5000,
                    });
                }).catch(error => {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error message',
                    text: error.data,
                    duration: 5000,
                });
            })
        },
        generateCast(){
            this.isGLoading = true;
            this.isShowingForm = true;
            this.isEdit = false;
            const _this = this;
            const url = `https://api.themoviedb.org/3/person/${this.tmdb_id_g}?api_key=8a11aac3fb4ef5f1f9607ee7e0329793&language=en-US`;
            axios.get(url, {withCredentials: false})
                .then(res => {
                    _this.isGLoading = false;
                    _this.cast.tmdb_id = res.data.id;
                    _this.cast.name = res.data.name;
                    _this.cast.poster_path = res.data.profile_path;
                }).catch(error => {
            })
        },
        clear(){
            this.cast.name = '';
            this.cast.tmdb_id = '';
            this.cast.poster_path = '';
            this.tmdb_id_g = '';
            this.isShowingForm = false;
        },
        configPagination(data) {
            this.pagination.lastPage = data.meta.last_page;
            this.pagination.currentPage = data.meta.current_page;
            this.pagination.total = data.meta.total;
            this.pagination.nextPageUrl = data.links.next;
            this.pagination.prevPageUrl = data.links.prev;
            this.pagination.from = data.meta.from;
            this.pagination.to = data.meta.to;
        },
        closeForm(){
            this.isShowingForm = false
            this.cast = {}
        }
    },
    directives: {
        debounce
    }
}
</script>

<style scoped>

</style>
