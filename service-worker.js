/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","fa6d76afb1897e574e3454d34d9f360e"],["bower_components/app-layout/app-drawer/app-drawer.html","da6092daa0f0d2b8769c65527e705292"],["bower_components/app-layout/app-header-layout/app-header-layout.html","69d2e94dce2e8cd5aecfc50131f071f4"],["bower_components/app-layout/app-header/app-header.html","611b00b75388e2a548c3656087e9b4ec"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","354cc13dae18b154ae055036e959e2ae"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","387b0a58c54afa617265a50ab25c792c"],["bower_components/app-layout/app-toolbar/app-toolbar.html","40628b2aaf9a599891097923c5de5a10"],["bower_components/app-layout/helpers/helpers.html","33fa00d106b9bc07ab162dbe88d1b664"],["bower_components/app-route/app-location.html","0b9bf992c84f9e6b593e53e2fb90ce94"],["bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["bower_components/app-route/app-route.html","fa50c38d15affd0702bbb8959ae69d4b"],["bower_components/font-roboto/roboto.html","31c2e28f3f926e78961662fcfc98bd44"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","032ddccbe04fadf233db599b63b171b9"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","e416e843a80e32d5ac1cf3d99f92a290"],["bower_components/iron-ajax/iron-ajax.html","cdb34647662aa97819437b199ca0dc3e"],["bower_components/iron-ajax/iron-request.html","2cd86cb426f03e5ac050e5b9534ca01e"],["bower_components/iron-behaviors/iron-button-state.html","9fb410eb4dd2cf074011b4d7565fe520"],["bower_components/iron-behaviors/iron-control-state.html","26408b231f3184ed4c861a77090782d0"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","4941bb1f98c18a580867935163391b6c"],["bower_components/iron-dropdown/iron-dropdown.html","69de7cbbb5154bc46a1faf232c0826e2"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","fc0c50a581a28e9269400ddd3e98f802"],["bower_components/iron-flex-layout/iron-flex-layout.html","ff9477722c978e3fdd3fbf292cc3f2fc"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8ea5b57ab9067df1c61dc124c496120b"],["bower_components/iron-icon/iron-icon.html","d4b7a82c9ccbbeca2b0c89f4e53ffb05"],["bower_components/iron-icons/av-icons.html","6618d2777ecdb09a97a1ecab9995d1fb"],["bower_components/iron-icons/iron-icons.html","b06b48bbd24e44ce5f592c008e254376"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","6a33098c3ca83ce1f0e6f32997b8aaf3"],["bower_components/iron-input/iron-input.html","c534697639484286f9cd62bf3bb6929d"],["bower_components/iron-location/iron-location.html","f86d3ca26fc6e8448598c34bca44be61"],["bower_components/iron-location/iron-query-params.html","202ab9d2102acc73b019107ceb09d6c3"],["bower_components/iron-media-query/iron-media-query.html","5fb17283155ca3ad912dafebc9f06a74"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","796284c1be88a7a993720082f161ce21"],["bower_components/iron-meta/iron-meta.html","048f486e348206798370e3e2a61f27ee"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","b935952337df172121dae50aa75d0ff6"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","a70e5917cb2f5bb64e53e44b2f0cd764"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7227fe9e747518edb9676d3d5bce48ff"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","dfcf04b2b9b17dceb9176c5d4a1233b8"],["bower_components/iron-pages/iron-pages.html","6eb057080296abef128e6fac44d202f3"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","26731b518fc39146a6ef617bf2446cab"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","33c023f229cd353ec7d21b5a3b9e137b"],["bower_components/iron-selector/iron-multi-selectable.html","d4765be6d51eb9e5e170b7191b222aec"],["bower_components/iron-selector/iron-selectable.html","033c526023ee6429bb66dab8407497f5"],["bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","3fb306c07a03ea899a4a29b582e75567"],["bower_components/neon-animation/animations/fade-in-animation.html","32e6403f666f0a23bf0a12d9d13ac7e0"],["bower_components/neon-animation/animations/fade-out-animation.html","0b7783df10a3455dd3079d5dabfc1882"],["bower_components/neon-animation/neon-animatable-behavior.html","ff071e084f0046cb0d74204891f95fc5"],["bower_components/neon-animation/neon-animation-behavior.html","7bea601b65a14b9d7389d806db6cbfec"],["bower_components/neon-animation/neon-animation-runner-behavior.html","0d0e9eeccf315df7c0c6330049c2cd45"],["bower_components/paper-behaviors/paper-button-behavior.html","1e6e9794c87cb389d4191911ec554890"],["bower_components/paper-behaviors/paper-ripple-behavior.html","ed51cc379e55570173529cd58ca00b59"],["bower_components/paper-button/paper-button.html","75b7eeb8537f75878109d678fd6fd47a"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","4c48b1e338ed304011fb2070a299b12d"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","5937bb21d75c1f6a3b6a3b71cb310580"],["bower_components/paper-dropdown-menu/paper-dropdown-menu.html","076470166920533b45921878d4d40025"],["bower_components/paper-input/paper-input-addon-behavior.html","9f7c79f09b3e662a7a0a0ec2210c5331"],["bower_components/paper-input/paper-input-behavior.html","331835b778a46441f5266916bcf58efa"],["bower_components/paper-input/paper-input-char-counter.html","3afc53a558e36ccdbb0718b8da52b33a"],["bower_components/paper-input/paper-input-container.html","d90f28b41fbe59cfaae6433e4998716d"],["bower_components/paper-input/paper-input-error.html","270d241c108123335bf6dbe30d9e768f"],["bower_components/paper-input/paper-input.html","66a89eddb35c26f75fa78e894b0773af"],["bower_components/paper-listbox/paper-listbox.html","6fc75e3aca5cc2ae63a88f9f5f4689d0"],["bower_components/paper-menu-button/paper-menu-button-animations.html","494ce3a3d3cd95ed5dd66feff0235150"],["bower_components/paper-menu-button/paper-menu-button.html","b7d8a4ae6d0d18bb81214a9c7742b87c"],["bower_components/paper-ripple/paper-ripple.html","2dd5636235492ffa1865097755a07c7a"],["bower_components/paper-styles/color.html","2b6b926e5bd4005bdbdcd15a34a50b95"],["bower_components/paper-styles/default-theme.html","9480969fcd665e90201b506a4737fa1a"],["bower_components/paper-styles/element-styles/paper-material-styles.html","b0a38bd2eb6f4c4844d4903a46268c92"],["bower_components/paper-styles/shadow.html","2fbe595f966eebe419b9b91611d6392a"],["bower_components/paper-styles/typography.html","772d86cecdd75864b7d5f6760255665c"],["bower_components/polymer-redux/dist/polymer-redux.html","9ddb192efcc9f8b241928a926e279ad4"],["bower_components/polymer-redux/polymer-redux.html","6bc7c0bb5868d81d2a545d4e8cb3c223"],["bower_components/polymer/lib/elements/array-selector.html","9ae9bcc7fe5e256238675eb842b9cfb6"],["bower_components/polymer/lib/elements/custom-style.html","d968919ce88620bba7378b4ea8c4b0c3"],["bower_components/polymer/lib/elements/dom-bind.html","9bb2a5bf62f0b75e779d565e878ef798"],["bower_components/polymer/lib/elements/dom-if.html","0577704b7147fb8fd9b9bb52301ea167"],["bower_components/polymer/lib/elements/dom-module.html","e780c0d0338f3946e0b3f127f28130b0"],["bower_components/polymer/lib/elements/dom-repeat.html","4644973602c21dd56079419a365fbcfb"],["bower_components/polymer/lib/legacy/class.html","2c2bbab65129b0f9d3dd4140ebf3dcc8"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","e0fabe05a80a2842edb9b7b5a163f3dc"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","e89ca5e9c1421be4d784ab41dcc6f0a0"],["bower_components/polymer/lib/legacy/polymer-fn.html","586629197d105f270e1e366ea4cbddb6"],["bower_components/polymer/lib/legacy/polymer.dom.html","cb01670bdf9352728da463243f39e21f"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","4e4e7daa069703e1ba95758389c7d4a2"],["bower_components/polymer/lib/mixins/element-mixin.html","82617886c6826bcf7f7eeef4202d7ae8"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","7f35f61e57ea510704ed3fc90a654627"],["bower_components/polymer/lib/mixins/mutable-data.html","6d79ae84fab84b02860b84c1e4dee7ac"],["bower_components/polymer/lib/mixins/property-accessors.html","e1ec15317f0f386d6a794f00a22842fc"],["bower_components/polymer/lib/mixins/property-effects.html","5e8dabffe931032de8c128dab36e6c32"],["bower_components/polymer/lib/mixins/template-stamp.html","86934301e699a293d2898f920468e884"],["bower_components/polymer/lib/utils/array-splice.html","432cc693e0d2c7e7bcb978f135e3a79b"],["bower_components/polymer/lib/utils/async.html","91c36acd52a46ab7eaaa641f99c61202"],["bower_components/polymer/lib/utils/boot.html","949dbdfda05719804d009b4e584af51c"],["bower_components/polymer/lib/utils/case-map.html","61c3f85b8314adf2d309fdf3e97fddba"],["bower_components/polymer/lib/utils/debounce.html","c697c74f0aee7f7604a3c3f9f64e9c0f"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","6ad9230280900543a8c863499ef1fe23"],["bower_components/polymer/lib/utils/flush.html","2b4324e1cab5c4388ea129e7b17c11c9"],["bower_components/polymer/lib/utils/gestures.html","e951f770d03535bf4fb18de0531cd05f"],["bower_components/polymer/lib/utils/import-href.html","815682f29a28a4ab4ee4e2eeff56f414"],["bower_components/polymer/lib/utils/mixin.html","a9da57f0dc1038c7944c692c3b7e4457"],["bower_components/polymer/lib/utils/path.html","112b4c58b4832d42d5bafed8cb5c512d"],["bower_components/polymer/lib/utils/render-status.html","9a929f20dbe0cb11548c404f1d1a6f55"],["bower_components/polymer/lib/utils/resolve-url.html","0ca3297a6a00175f976ae84425368f9b"],["bower_components/polymer/lib/utils/settings.html","dfd3fa141e4c2f9fd6c21a044c9d1a14"],["bower_components/polymer/lib/utils/style-gather.html","822630aec48921d1ad551396bf7324ad"],["bower_components/polymer/lib/utils/templatize.html","ab78dcd9bc59ca750fa4ceda9b18383c"],["bower_components/polymer/lib/utils/unresolved.html","a1ede4a050418cf897d096dcc8b3bc01"],["bower_components/polymer/polymer-element.html","b2e7dd936aaf08f01c67236ac6f96c33"],["bower_components/polymer/polymer.html","b20eb4dd015d93b8153cc6c3d79662c4"],["bower_components/shadycss/apply-shim.html","f220299c2be1b5040111843d640b70a5"],["bower_components/shadycss/apply-shim.min.js","9cfbbf627603a5a3073f4fc9b97712d1"],["bower_components/shadycss/custom-style-interface.html","0a68ea0f3af7bcb1ca6617e512f720cb"],["bower_components/shadycss/custom-style-interface.min.js","9d7ccbd58300a6ef52a9108de2b6cb7f"],["index.html","52ddbeaad8283b8ef554918f1ec4cbfb"],["src/admin-songs/admin-songs-view.html","60e0905fc7a052b1c371e2c9d1a92964"],["src/customer-app/customer-app.html","920b420b7e431425f670d0bed9216464"],["src/customer-app/select-song-2-sing.html","2ae0d761a810002c217b5e57f1192050"],["src/player/player.html","ae4e0e20ad11787448d15ee9f25076eb"],["src/principal-view.html","913262b8b86b688e3f6b196e996cedaf"],["src/redux-mixin/redux-mixin.html","9e3ac050f08b72a582c9e77e8942c582"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







