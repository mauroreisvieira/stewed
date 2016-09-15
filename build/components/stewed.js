/*"use strict"

$(function () {

    /** Upload the file **/
/*    $(document).on('change', '.file-path', function () {
        var input_file = $('.file-path > input[type=text]');
        var upload_file = $('.upload').val();
        input_file.val(upload_file);
        input_file.addClass('valid')
    });

});

$(function () {
    $.fn.extend({
        showTab: function(tabID) {

            $( '.tabs' ).find( '.active' ).removeClass( 'active' );
            $( '.tabs' ).find( 'a[href$=' + tabID + ']' ).addClass( 'active' );

            $( 'body' ).find( '.tab-section' ).css({
                visibility     : 'hidden', 
                display        : 'none'
            });

            $( tabID ).css({
                visibility     : 'visible', 
                display        : 'block'
            });
        }

    });

    $.fn.extend({
        tabs: function() {

            var tabID = $(".tabs li .active").attr("href") || '#' + $(this).data('target');
            $tab = $(tabID);
            $tab.css({
                visibility     : 'visible', 
                display        : 'block'
            });

            $(document).on('keyup', function(e, tabID) {
                e.preventDefault();
                if (e.keyCode === 37 || e.keyCode === 38) { 
                    var PREV = $tab.prev().attr('id');
                    if(typeof PREV != 'undefined') {
                        $tab.showTab('#' + PREV);
                        $tab = $('#' + PREV);
                    }
                }
                if (e.keyCode === 39 || e.keyCode === 40) { 
                    var NEXT = $tab.next().attr('id');
                    if(typeof NEXT != 'undefined') {
                        $tab.showTab('#' + NEXT);
                        $tab = $('#' + NEXT);
                    }
                }
            });

            $(this).click(function(e) {
                e.preventDefault();
                var tabID = $(this).attr("href") || '#' + $(this).data('target');
                $tab = $(tabID);
                $tab.showTab(tabID);

            }); 
        }
    });

$.fn.extend({
    openModal: function(options) {

        $("body").css( "overflow", "hidden" );
        var modalID = this.selector;

        $overlay = $('.modal-overlay');
        $modal = $(modalID);

        var defaults = {
            backgroundColor : '#000',
            opacityOverlay  : 0.6, 
            transitionStyle : true,
            keyboard        : true,
            durationIn      : 0.477,
            durationOut     : 0.177
        };

        options = $.extend(defaults, options);  

        $("body").find('.modal-overlay').css({ 
            WebkitTransition    : 'all ' + options.durationIn + 's',
            MozTransition       : 'all ' + options.durationIn + 's',
            MsTransition        : 'all ' + options.durationIn + 's',
            OTransition         : 'all ' + options.durationIn + 's',
            transition          : 'all ' + options.durationIn + 's',
            background          : options.backgroundColor,
            opacity             : options.opacityOverlay 
        });

        if (options.transitionStyle) {
            $modal.css({
                WebkitTransition    : 'all ' + options.durationIn + 's',
                MozTransition       : 'all ' + options.durationIn + 's',
                MsTransition        : 'all ' + options.durationIn + 's',
                OTransition         : 'all ' + options.durationIn + 's',
                transition          : 'all ' + options.durationIn + 's',
                visibility          : 'visible',
                transform           : 'scale(1)',
                opacity             : '1',
                top                 : '10%'
            });
        } else {
            $modal.css({
                visibility          : 'visible',
                transform           : 'scale(1)',
                opacity             : '1',
                top                 : '10%'
            });
        }

        $modal.find(".modal-close").on('click', function(event) {
            event.preventDefault();
            $modal.closeModal(options);
        });

        if (options.keyboard) {
            $(document).on('keyup', function(e) {
                if (e.keyCode === 27) { 
                    $modal.closeModal(options);
                }
            });
        }
    }
});

$.fn.extend({
    closeModal: function(options) {

        $overlay.removeClass('state-show');
        $(".modal-overlay").remove();

        $("body").css( "overflow", "auto" );
        if (options.transitionStyle) {
            $modal.css( {
                WebkitTransition    : 'all ' + options.durationOut + 's',
                MozTransition       : 'all ' + options.durationOut + 's',
                MsTransition        : 'all ' + options.durationOut + 's',
                OTransition         : 'all ' + options.durationOut + 's',
                transition          : 'all ' + options.durationOut + 's',
                visibility          : 'hidden',
                transform           : 'scale(0.7)',
                opacity             : '0',
                top                 : '30%'
            });
        } else {
            $modal.css( {
                visibility          : 'hidden',
                opacity             : '0',
                top                 : '30%'
            }); 
        }
    }
});

$.fn.extend({
    callModal: function(options) {

        return this.each(function() {
            $(this).click(function(e) {
                $overlayAppend = $('<div class="modal-overlay"></div>');
                $("body").append($overlayAppend);

                var modalID = $(this).attr("href") || '#' + $(this).data('target');
                $(modalID).openModal(options);

                $('.modal-overlay').click(function(e) {
                    $(modalID).closeModal(options);
                });
            });
        }); 
    }
});

$.fn.extend({
    openDropdown: function(options) {

        var dropdownID = this.selector;
        $overlay = $('.modal-overlay');
        $drop = $(dropdownID);

        var defaults = {
            keyboard        : true,
            alignment       : 'left',
            durationIn      : 0.400,
            durationOut     : 0.300
        };

        options = $.extend(defaults, options);  
        $drop.css({
            WebkitTransition    : 'all ' + options.durationIn + 's',
            MozTransition       : 'all ' + options.durationIn + 's',
            MsTransition        : 'all ' + options.durationIn + 's',
            OTransition         : 'all ' + options.durationIn + 's',
            transition          : 'all ' + options.durationIn + 's',
            'text-align'        : options.alignment,
            visibility          : 'visible',
            opacity             : '1',
            zIndex              : '1',
            top                 : '0'
        });

        $drop.find(".modal-close").on('click', function(event) {
            event.preventDefault();
            $drop.closeModal(options);
        });

        if (options.keyboard) {
            $(document).on('keyup', function(e) {
                if (e.keyCode === 27) { 
                    $drop.closeDropDown(options);
                }
            });
        }
    }
});

$.fn.extend({
    closeDropDown: function(options) {
        $drop.css( {
            WebkitTransition    : 'all ' + options.durationOut + 's',
            MozTransition       : 'all ' + options.durationOut + 's',
            MsTransition        : 'all ' + options.durationOut + 's',
            OTransition         : 'all ' + options.durationOut + 's',
            transition          : 'all ' + options.durationOut + 's',
            visibility          : 'hidden',
            opacity             : '0',
            zIndex              : '-1',
            top                 : '40px'
        });

    }
});

$.fn.extend({
    dropdown: function(options) {
        return this.each(function() {
            $(this).click(function(e) {
                var dropdownID = $(this).attr("href") || '#' + $(this).data('target');
                if($(dropdownID).hasClass('dropdown_open')) {
                    $(dropdownID).closeDropDown(options);
                    $(dropdownID).removeClass('dropdown_open');
                } else {
                    $(dropdownID).addClass('dropdown_open');
                    $(dropdownID).openDropdown(options);
                }
            });
        }); 
    }
});
});
*/
