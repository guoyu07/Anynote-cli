export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
        url:'',
        abstract: true,
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
    })
    .state('signin', {
        parent: 'login',
        url:'/signin',
        templateUrl: 'app/login/signin.html'
    })
    .state('signup', {
        parent: 'login',
        url:'/signup',
        templateUrl: 'app/login/signup.html'
    })
    .state('home', {
      url:'',
      abstract: true,
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('notes', {
        parent: 'home',
        url: '/notes',
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'notes'
        // views: {
        //     "noteEditor": {
        //         replace: true, //defalut new note
        //         template: '<note-editor>'
        //     }
        // }
    })
    .state('edit', {
        parent: 'notes',
        url: '/edit/:id',
        template: '<note-editor>',
        resolve: {
          loginRequired: loginRequired
        }
        //controller: 'NotesController',
        //controllerAs: 'notes'
    })
    .state('posts', {
        parent: 'home',
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'posts'
    });

  $urlRouterProvider.otherwise('/notes');

  function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/signin');
      }
      return deferred.promise;
    }
}
