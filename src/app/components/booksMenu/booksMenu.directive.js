export function BooksMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/booksMenu/booksMenu.html',
        scope: {
            homeTxt: '@',
            homeLink: '&',
            favors: '=',
            books: '=',
            tags: '=',
            getTags: '&'
        },
        controller: BooksMenuController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class BooksMenuController {
    constructor () {
        'ngInject';

        // "this.creation" is available by directive option "bindToController: true"

    }
}
