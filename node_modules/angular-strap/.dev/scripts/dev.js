'use strict';

angular.module('mgcrea.ngStrapDocs', [
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.timepicker',
  'mgcrea.ngStrap.datepicker',
  'mgcrea.ngPlunkr',
  // 'ngSanitize',
  'ngRoute',
  'ngAnimate'
])

.constant('version', 'v2.0.0-dev')

.config(function($plunkrProvider, $sceProvider, version) {

  $sceProvider.enabled(false);

  angular.extend($plunkrProvider.defaults, {
    plunkrTitle: 'AngularStrap Example Plunkr',
    plunkrTags: ['angular', 'angular-strap'],
    plunkrPrivate: false,
    contentHtmlUrlPrefix: 'https://rawgithub.com/mgcrea/angular-strap/' + version + '/src/',
    contentJsUrlPrefix: 'https://rawgithub.com/mgcrea/angular-strap/' + version + '/src/'
  });

})

.directive('ngModel', function() {

  function lcfirst(s) {
    return s.charAt(0).toLowerCase() + s.substring(1);
  }

  function camelCase(s) {
    s = (s + '').split('.');
    s.forEach(function(v, k) {
      s[k] = v.charAt(0).toUpperCase() + v.substr(1);
    });
    return s.join('');
  }

  return {
    restrict: 'A',
    compile: function(element, attr) {
      if(attr.name || attr.id) return;
      var nodeName = element[0].nodeName.toLowerCase();
      var id = lcfirst(camelCase(nodeName + '.' + attr.ngModel));
      element.attr('id', id).attr('name', attr.ngModel);
      // if(element.attr('for')) {
      //   return;
      // }
      // var inputEl = element.parent().hasClass('checkbox') ? element.children('input, select, textarea') : element.next().children('input, select, textarea');
      // if(inputEl.length) {
      //   inputEl = angular.element(inputEl[0]);
      //   var ngModel = inputEl.attr('ng-model');
      //   if(ngModel) {
      //     var nodeName = inputEl[0].nodeName.toLowerCase();
      //     var id = lcfirst(camelCase(nodeName + '.' + ngModel));
      //     inputEl.attr('id', id).attr('name', ngModel);
      //     element.attr('for', id);
      //   }
      // }
    }
  };

})

// .directive('label', function() {

//   function lcfirst(s) {
//     return s.charAt(0).toLowerCase() + s.substring(1);
//   }

//   function camelCase(s) {
//     s = (s + '').split('.');
//     s.forEach(function(v, k) {
//       s[k] = v.charAt(0).toUpperCase() + v.substr(1);
//     });
//     return s.join('');
//   }

//   return {
//     restrict: 'E',
//     compile: function(element, attr) {
//       if(element.attr('for')) {
//         return;
//       }
//       var inputEl = element.parent().hasClass('checkbox') ? element.children('input, select, textarea') : element.next().children('input, select, textarea');
//       if(inputEl.length) {
//         inputEl = angular.element(inputEl[0]);
//         var ngModel = inputEl.attr('ng-model');
//         if(ngModel) {
//           var nodeName = inputEl[0].nodeName.toLowerCase();
//           var id = lcfirst(camelCase(nodeName + '.' + ngModel));
//           inputEl.attr('id', id).attr('name', ngModel);
//           element.attr('for', id);
//         }
//       }
//     }
//   };

// })

.config(function($routeProvider, $locationProvider) {

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);

  // $routeProvider
    // .when('/', {
    //   id: 'home',
    //   templateUrl: 'views/home/main.html',
    //   footerUrl: 'views/home/footer.html'
    // })
    // .when('/directives', {
    //   id: 'getting-started',
    //   templateUrl: 'views/getting-started/main.html',
    //   headerUrl: 'views/common/header.html',
    //   headerTitle: 'Getting started',
    //   headerBody: 'An overview of Bootstrap, how to download and use, basic templates and examples, and more.',
    //   footerUrl: 'views/common/footer.html',
    //   reloadOnSearch: false
    // })
    // .when('/styles', {
    //   id: 'styles',
    //   controller: 'ComponentsCtrl',
    //   templateUrl: 'views/styles/main.html',
    //   headerUrl: 'views/common/header.html',
    //   headerTitle: 'Styles',
    //   headerBody: 'Fundamental HTML elements styled and enhanced with extensible classes.',
    //   footerUrl: 'views/common/footer.html',
    //   reloadOnSearch: false
    // })
    // .when('/javascript', {
    //   controller: 'JavascriptCtrl',
    //   templateUrl: 'views/javascript.html',
    //   headerUrl: 'views/layout/header.html',
    //   headerTitle: 'Javascript',
    //   headerBody: 'Bring components to life with over a dozen custom AngularJS plugins.',
    //   reloadOnSearch: false
    // })
    // .otherwise({
    //   redirectTo: '/directives'
    // });

})

.controller('MainCtrl', function ($scope, $rootScope, $location, $anchorScroll, $window, $plunkr) {

  $scope.selectedIcon = '';
  $scope.selectedIcons = ['Globe', 'Heart'];
  $scope.icons = [
    {value: 'Gear', label: '<i class="fa fa-gear"></i> Gear'},
    {value: 'Globe', label: '<i class="fa fa-globe"></i> Globe'},
    {value: 'Heart', label: '<i class="fa fa-heart"></i> Heart'},
    {value: 'Camera', label: '<i class="fa fa-camera"></i> Camera'}
  ];


  $scope.$location = $location;

  $scope.$scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };

  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    // $location.hash($routeParams.scrollTo);
    // $anchorScroll();
  });

  $scope.createPlunkr = function() {
    var myPlunkr = $plunkr();
  };

  $scope.alert = function() {
    return $window.alert.apply($window, arguments);
  };

  // DEBUG

  var forEachScope = function(scope, fn, depth) {
    var childScope;
    depth = depth != null ? depth : 0;
    fn(scope, depth);
    childScope = scope.$$childHead;
    while (childScope != null) {
      forEachScope(childScope, fn, depth + 1);
      childScope = childScope.$$nextSibling;
    }
  };

  $scope.printScopes = function(scope) {
    var ret;
    ret = '';
    forEachScope(scope || $rootScope, function(_scope, depth) {
      var prefix, watchers;
      watchers = _scope.$$watchers !== null ? _scope.$$watchers.length : 0;
      prefix = new Array(depth).join('  ');
      ret += "" + prefix + _scope.$id + " (" + watchers + " watchers)\n";
    });
    return ret;
  };


  $scope.countWatchers = function(scope) {
    var ret;
    ret = 0;
    forEachScope(scope || $rootScope, function(_scope, depth) {
      var prefix, watchers;
      watchers = _scope.$$watchers !== null ? _scope.$$watchers.length : 0;
      ret += watchers;
    });
    return ret;
  };
  $scope.countScopes = function(scope) {
    var ret;
    ret = 0;
    forEachScope(scope || $rootScope, function() {
      return ret += 1;
    });
    return ret;
  };


})

/*
.provide('$localeSwitcher', function($localeProvider) {

  this.locales = ['af-na', 'af-za', 'af', 'am-et', 'am', 'ar-001', 'ar-ae', 'ar-bh', 'ar-dz', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'ar-om', 'ar-qa', 'ar-sa', 'ar-sd', 'ar-sy', 'ar-tn', 'ar-ye', 'ar', 'bg-bg', 'bg', 'bn-bd', 'bn-in', 'bn', 'ca-ad', 'ca-es', 'ca', 'cs-cz', 'cs', 'da-dk', 'da', 'de-at', 'de-be', 'de-ch', 'de-de', 'de-li', 'de-lu', 'de', 'el-cy', 'el-gr', 'el', 'en-as', 'en-au', 'en-bb', 'en-be', 'en-bm', 'en-bw', 'en-bz', 'en-ca', 'en-dsrt-us', 'en-dsrt', 'en-fm', 'en-gb', 'en-gu', 'en-gy', 'en-hk', 'en-ie', 'en-in', 'en-iso', 'en-jm', 'en-mh', 'en-mp', 'en-mt', 'en-mu', 'en-na', 'en-nz', 'en-ph', 'en-pk', 'en-pr', 'en-pw', 'en-sg', 'en-tc', 'en-tt', 'en-um', 'en-us', 'en-vg', 'en-vi', 'en-za', 'en-zw', 'en', 'es-419', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ea', 'es-ec', 'es-es', 'es-gq', 'es-gt', 'es-hn', 'es-ic', 'es-mx', 'es-ni', 'es-pa', 'es-pe', 'es-pr', 'es-py', 'es-sv', 'es-us', 'es-uy', 'es-ve', 'es', 'et-ee', 'et', 'eu-es', 'eu', 'fa-af', 'fa-ir', 'fa', 'fi-fi', 'fi', 'fil-ph', 'fil', 'fr-be', 'fr-bf', 'fr-bi', 'fr-bj', 'fr-bl', 'fr-ca', 'fr-cd', 'fr-cf', 'fr-cg', 'fr-ch', 'fr-ci', 'fr-cm', 'fr-dj', 'fr-fr', 'fr-ga', 'fr-gf', 'fr-gn', 'fr-gp', 'fr-gq', 'fr-km', 'fr-lu', 'fr-mc', 'fr-mf', 'fr-mg', 'fr-ml', 'fr-mq', 'fr-ne', 'fr-re', 'fr-yt', 'fr', 'gl-es', 'gl', 'gsw-ch', 'gsw', 'gu-in', 'gu', 'he-il', 'he', 'hi-in', 'hi', 'hr-hr', 'hr', 'hu-hu', 'hu', 'id-id', 'id', 'in', 'is-is', 'is', 'it-it', 'it-sm', 'it', 'iw', 'ja-jp', 'ja', 'kn-in', 'kn', 'ko-kr', 'ko', 'ln-cd', 'ln', 'lt-lt', 'lt', 'lv-lv', 'lv', 'ml-in', 'ml', 'mr-in', 'mr', 'ms-my', 'ms', 'mt-mt', 'mt', 'nl-cw', 'nl-nl', 'nl-sx', 'nl', 'no', 'or-in', 'or', 'pl-pl', 'pl', 'pt-br', 'pt-pt', 'pt', 'ro-ro', 'ro', 'ru-ru', 'ru', 'sk-sk', 'sk', 'sl-si', 'sl', 'sq-al', 'sq', 'sr-cyrl-rs', 'sr-latn-rs', 'sr', 'sv-se', 'sv', 'sw-tz', 'sw', 'ta-in', 'ta', 'te-in', 'te', 'th-th', 'th', 'tl', 'tr-tr', 'tr', 'uk-ua', 'uk', 'ur-pk', 'ur', 'vi-vn', 'vi', 'zh-cn', 'zh-hans-cn', 'zh-hk', 'zh-tw', 'zh', 'zu-za', 'zu'];

  this.$get = function($window, $locale) {

    var $script = $window.$script;
    var $localeSwitcher = {};

    $localeSwitcher.set = function(locale) {
      loadLocal(locale, function() {
        $locale =
      });
    };

    function loadLocale(locale, callback) {
      window.$script('bower_components/angular-i18n/angular-locale_' + locale + '.js', callback);
    }

  }
})*/

/*
.config(function($localeProvider, $injector) {
  window.$script('bower_components/angular-i18n/angular-locale_fr.js', function() {
    console.warn('loaded', arguments);
    // var $injector = angular.injector();
    console.warn($injector.get('$localeProvider').$get());
  });
})
*/

.run(function($window, $rootScope, $location, $anchorScroll, $locale, $http) {

  // Locale
  // <input type="text" class="form-control" ng-model="localeId" ng-options="locale for locale in locales" bs-typeahead></input>
  $rootScope.locales = ['af-na', 'af-za', 'af', 'am-et', 'am', 'ar-001', 'ar-ae', 'ar-bh', 'ar-dz', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'ar-om', 'ar-qa', 'ar-sa', 'ar-sd', 'ar-sy', 'ar-tn', 'ar-ye', 'ar', 'bg-bg', 'bg', 'bn-bd', 'bn-in', 'bn', 'ca-ad', 'ca-es', 'ca', 'cs-cz', 'cs', 'da-dk', 'da', 'de-at', 'de-be', 'de-ch', 'de-de', 'de-li', 'de-lu', 'de', 'el-cy', 'el-gr', 'el', 'en-as', 'en-au', 'en-bb', 'en-be', 'en-bm', 'en-bw', 'en-bz', 'en-ca', 'en-dsrt-us', 'en-dsrt', 'en-fm', 'en-gb', 'en-gu', 'en-gy', 'en-hk', 'en-ie', 'en-in', 'en-iso', 'en-jm', 'en-mh', 'en-mp', 'en-mt', 'en-mu', 'en-na', 'en-nz', 'en-ph', 'en-pk', 'en-pr', 'en-pw', 'en-sg', 'en-tc', 'en-tt', 'en-um', 'en-us', 'en-vg', 'en-vi', 'en-za', 'en-zw', 'en', 'es-419', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ea', 'es-ec', 'es-es', 'es-gq', 'es-gt', 'es-hn', 'es-ic', 'es-mx', 'es-ni', 'es-pa', 'es-pe', 'es-pr', 'es-py', 'es-sv', 'es-us', 'es-uy', 'es-ve', 'es', 'et-ee', 'et', 'eu-es', 'eu', 'fa-af', 'fa-ir', 'fa', 'fi-fi', 'fi', 'fil-ph', 'fil', 'fr-be', 'fr-bf', 'fr-bi', 'fr-bj', 'fr-bl', 'fr-ca', 'fr-cd', 'fr-cf', 'fr-cg', 'fr-ch', 'fr-ci', 'fr-cm', 'fr-dj', 'fr-fr', 'fr-ga', 'fr-gf', 'fr-gn', 'fr-gp', 'fr-gq', 'fr-km', 'fr-lu', 'fr-mc', 'fr-mf', 'fr-mg', 'fr-ml', 'fr-mq', 'fr-ne', 'fr-re', 'fr-yt', 'fr', 'gl-es', 'gl', 'gsw-ch', 'gsw', 'gu-in', 'gu', 'he-il', 'he', 'hi-in', 'hi', 'hr-hr', 'hr', 'hu-hu', 'hu', 'id-id', 'id', 'in', 'is-is', 'is', 'it-it', 'it-sm', 'it', 'iw', 'ja-jp', 'ja', 'kn-in', 'kn', 'ko-kr', 'ko', 'ln-cd', 'ln', 'lt-lt', 'lt', 'lv-lv', 'lv', 'ml-in', 'ml', 'mr-in', 'mr', 'ms-my', 'ms', 'mt-mt', 'mt', 'nl-cw', 'nl-nl', 'nl-sx', 'nl', 'no', 'or-in', 'or', 'pl-pl', 'pl', 'pt-br', 'pt-pt', 'pt', 'ro-ro', 'ro', 'ru-ru', 'ru', 'sk-sk', 'sk', 'sl-si', 'sl', 'sq-al', 'sq', 'sr-cyrl-rs', 'sr-latn-rs', 'sr', 'sv-se', 'sv', 'sw-tz', 'sw', 'ta-in', 'ta', 'te-in', 'te', 'th-th', 'th', 'tl', 'tr-tr', 'tr', 'uk-ua', 'uk', 'ur-pk', 'ur', 'vi-vn', 'vi', 'zh-cn', 'zh-hans-cn', 'zh-hk', 'zh-tw', 'zh', 'zu-za', 'zu'];
  $rootScope.localeId = $locale.id;
  // $http.get('bower_components/angular-i18n/angular-locale_fr.js').then(function(res) {
  //   console.warn('r', res.data);
  // });


  // FastClick
  $window.FastClick && $window.FastClick.attach($window.document.body);

  var bodyElement = angular.element($window.document.body);
  var targetElement = angular.element(document.querySelector('body > .bs-docs-container'));
  targetElement.on('click', function(evt) {
    var el = angular.element(evt.target);
    var hash = el.attr('href');
    if(!hash || hash[0] !== '#') return;
    if(hash.length > 1 && hash[1] === '/') return;
    if(evt.which !== 1) return;
    evt.preventDefault();
    console.warn('$location.hash', hash);
    $location.hash(hash.substr(1));
    // $location.path('/' + hash.substr(1));
    // $location.search('id', hash.substr(1));
    $anchorScroll();
    $rootScope.$digest();
  });

  // Initial $anchorScroll()
  setTimeout(function() {
    $anchorScroll();
  }, 0);

})

.directive('code', function() {
  return {restrict: 'E', terminal: true};
})

.directive('appendSource', function($window, $compile, indent) {

  return {
    compile: function(element, attr) {

      // Directive options
      var options = {placement: 'after'};
      angular.forEach(['placement', 'hlClass'], function(key) {
        if(angular.isDefined(attr[key])) options[key] = attr[key];
      });

      var hlElement = angular.element('<div class="highlight" ng-non-bindable><pre><code class="html" style="margin:0"></code></pre></div>');
      var codeElement = hlElement.children('pre').children('code');
      var elementHtml = indent(element.html());
      codeElement.text(elementHtml);
      if(options.hlClass) codeElement.addClass(options.hlClass);
      element[options.placement](hlElement);
      $window.hljs.highlightBlock(codeElement[0]);

    }
  };

})

.directive('highlightBlock', function($window, indent) {

  return {
    compile: function(element, attr) {
      element.html(indent(element.html()));
      return function postLink(scope, element, attr) {
        $window.hljs.highlightBlock(element[0]);
      };
    }
  };


})

.value('indent', function(text, spaces) {

  if(!text) return text;
  var lines = text.split(/\r?\n/);
  var prefix = '      '.substr(0, spaces || 0);
  var i;

  // Remove any leading blank lines
  while(lines.length && lines[0].match(/^\s*$/)) lines.shift();
  // Remove any trailing blank lines
  while(lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
  // Calculate proper indent
  var minIndent = 999;
  for(i = 0; i < lines.length; i++) {
    var line = lines[0];
    var indent = line.match(/^\s*/)[0];
    if(indent !== line && indent.length < minIndent) {
      minIndent = indent.length;
    }
  }

  for(i = 0; i < lines.length; i++) {
    lines[i] = prefix + lines[i].substring(minIndent).replace(/=""/g, '');
  }
  lines.push('');
  return lines.join('\n');

});

// function normalizeHtml(html) {
//   var lines = html.split('\n');
//   var splitString = lines.filter(String);
//   if(!splitString.length) return '';

//   // Remove any leading blank lines
//   while(lines.length && lines[0].match(/^\s*$/)) lines.shift();
//   // Remove any trailing blank lines
//   while(lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
//   // Calculate proper indent
//   var indent = 0;
//   for(; indent < splitString[0].length && splitString[0][indent] === ' '; indent++) {}
//   for(; indent < splitString[0].length && splitString[0][indent] === '\t'; indent+=2) {}
//   var re = new RegExp('^' + Array.apply(null, new Array(indent)).map(String.prototype.valueOf, '\\s').join(''), ['g']);

//   lines = lines.map(function(line) {
//     return line.replace(re, '').replace(/=""/g, '');
//   });

//   lines = lines.filter(function(line, num) {
//     if((!num || num === lines.length) && !line.trim()) return false;
//     return true;
//   });
//   return lines.join('\n');
// }
