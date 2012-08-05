/**
 * ImgLoad
 * Simple image preloading with callbacks or Deferred objects
 *
 * Copyright (c) 2012 PJ Dietz
 * Version: 1.0.0
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://pjdietz.com/jquery-plugins/imgload/
 */

/*global jQuery */
/*jslint browser: true */


(function ($) {

    "use strict";

    if ($.imgload === undefined) {

        $.extend({

            imgload: function (src, callback, options) {

                var img;

                img = new Image();
                img.src = src;

                if (img.complete) {

                    // The image is done loading.

                    // Call the callback function, if one was passed.
                    if (typeof callback === "function") {
                        callback(img, options);
                    }

                } else {

                    // The image is not done loading.
                    // If there is a callback function that needs to be called,
                    // bind an event handler.

                    if (typeof callback === "function") {

                        $(img).bind("load", function () {
                            callback(img, options);
                        });

                    }

                }

            }

        });

    }

    if ($.imgloading === undefined) {

        $.extend({

            imgloading: function (src, options) {

                var loading, img;

                loading = $.Deferred();

                img = new Image();
                img.src = src;

                if (img.complete) {

                    // The image is done loading.
                    loading.resolve(img, options);

                } else {

                    // The image is not done loading.

                    // Bind an event handler to fire when the image is loaded.
                    $(img).bind("load", function () {
                        loading.resolve(img, options);
                    });

                }

                return loading.promise();

            }

        });

    }

}(jQuery));
