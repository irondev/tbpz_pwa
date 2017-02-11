module.exports = function($scope) {

    $scope.share = function(provider) {
        var shareUrl,
            popupWidth = screen.availWidth,
            popupHeight = screen.availHeight,
            canonicalUrl = angular.element("meta[property='og:url']").attr("content"),
            title = angular.element("meta[property='og:title']").attr("content"),
            description = angular.element("meta[property='og:description']").attr("content"),
            image = angular.element("meta[property='og:image']").attr("content");

        switch (provider) {
            case 'facebook':
                shareUrl = "http://www.facebook.com/sharer.php?s=100&p[title]="+ encodeURIComponent(title) +"&p[url]=" + encodeURIComponent(canonicalUrl) +"&p[images][0]="+ image +"&p[summary]=" + encodeURIComponent(description);
            break;
            case 'twitter':
                shareUrl = "https://twitter.com/share?url=" + encodeURIComponent(canonicalUrl) + "&text=" + encodeURIComponent(title) + "&via=thebackpackerz";
            break;
            case 'google':
                shareUrl = "https://plus.google.com/share?url=" + encodeURIComponent(canonicalUrl);
            break;
        }
        window.open(shareUrl, provider, "width="+ popupWidth +",height="+ popupHeight +",left=0,top=0");
    };

};
