$(function () {

    /** Upload the file **/
    $(document).on('change', '.file-path', function () {
        var input_file = $('.file-path > input[type=text]');
        var upload_file = $('.upload').val();
        input_file.val(upload_file);
        input_file.addClass('valid')
    });

});

$(function () {
    /** Modal **/
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
       });
    }); 
   }
});
});

