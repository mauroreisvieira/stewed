//DEBUG
console.log('Form (v)');

var form = function () {

    this.show = function () {
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];

            input.style.backgroundColor = 'red';

            input.addEventListener('input', function() {
                var bg = '';
                this.value || (bg = 'red');
                this.style.backgroundColor = bg;
            });
        }
    };

};

!function(){
    form.show();
}();