export class PostService {

    constructor($http, $q, APIURL) {
        'ngInject';

        Object.assign(this, {
            $http, $q, APIURL
        });

        this.url = this.APIURL + '/posts/';
    }

    getPost(id) {
        return this.$http.get(this.url + id);
    }

    getPosts() {
        return this.$http.get(this.url);
    }

    newPost(post) {
        return this.$http.post(this.url, post);
    }

    updatePost(id, post) {
        return this.$http.put(this.url + id, post);
    }

    deletePost(id) {
        return this.$http.delete(this.url + id);
    }
}
