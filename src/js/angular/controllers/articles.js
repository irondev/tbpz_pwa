module.exports = function($scope, $rootScope, $routeParams, $timeout, $document, $window, datasSce) {

    var windowHeight = document.documentElement.clientHeight,
        documentHeight = $document.height(),
        scrollTop = $document.scrollTop(),
        categorySlug = ($routeParams.categorySlug) ? $routeParams.categorySlug : '',
        tagSlug = ($routeParams.tagSlug) ? $routeParams.tagSlug : '',
        searchQuery = ($routeParams.searchQuery) ? $routeParams.searchQuery : '';

    $scope.setNetwork();
    $rootScope.isSwitchingView = true;
    $scope.page = 1;
    $scope.order = '-date';

    var storage = localStorage.getItem('articles_' + categorySlug + '_' + tagSlug + '_' + searchQuery);
    if (storage) {
        $scope.articles = JSON.parse(storage);
        $rootScope.appReady = true;
    }

    $scope.load = function () {
        dataPromise = datasSce.getArticles(categorySlug, tagSlug, searchQuery, $scope.page).then(function(datas) {
            if (!$scope.articles || storage) {
                storage = null;
                $scope.articles = [];
            }
            $scope.articles = $scope.articles.concat(datas);
            console.log("articles:", $scope.articles);
            $rootScope.appReady = true;
            $rootScope.isSwitchingView = false;
            $scope.loadingNext = false;
        }).catch(function(error) {
            console.warn(error);
            $rootScope.appReady = true;
            $rootScope.isSwitchingView = false;
            $scope.setNetwork();
        });
    };
    $scope.load();

    var documentHeight = $document.height();
    $scope.infiniteScroll = function () {
        scrollTop = $document.scrollTop();
        if (scrollTop + 60 >= documentHeight - windowHeight && !$scope.loadingNext && $scope.page < 10 && $scope.templatePage == 'listing') {
            $scope.loadingNext = true;
            $scope.page++;
            $scope.load();
        }
    };

    angular.element(window).off('scroll', $scope.infiniteScroll);
    angular.element(window).on('scroll', $scope.infiniteScroll);

};
