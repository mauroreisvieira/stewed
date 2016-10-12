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