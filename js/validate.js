var inputStatus = function (data) {
    var data = data || {};
    data.row = document.getElementById(data.id);
    data.input = data.row.querySelector(".validate-input");
    var _row = data.row,
        _input = data.input;
    this.listener = false;
    this.timer = null;
    if (!this.listener) {
        _row.querySelector(".validate-status").appendChild(document.createElement("DIV"));
        data.status = _row.querySelector(".validate-status > div");
        data.point = data.status.classList;
        _input.addEventListener("keydown", function (event) {
            data.keycode = event.which || event.keyCode;
            data.event = event;
            keyEvents(data, event);
        });
        var _this = this;
        _row.querySelector(".validate-status").addEventListener("click", function (event) {
            (this.querySelector("div").className == "v-clear" || this.querySelector("div").className == "v-warning") && _this.disable();
        });
        this.listener = true;
        this.data = data;
    }
    var _this = this;

    function keyEvents(data, event) {
        if (data.keycode == 8) {
            var ival = _this.data.input.value.length;
            (ival === 1 || ival === 0) ? _this.reset(): _this.loader();
        } else {
            _this.loader();
        }
    }
}
inputStatus.prototype = {
    success: function () {
        this.reset();
        this.data.point.add("v-success");
    },
    warning: function () {
        this.reset();
        this.data.point.add("v-warning");
    },
    clear: function () {
        this.reset();
        this.data.point.add("v-clear");
    },
    loader: function () {
        this.reset();
        var _this = this;
        _this.data.point.add("v-loader");
        if (_this.timer) clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
            _this.clear();
        }, 500);
    },
    disable: function () {
        this.data.input && (this.data.input.value = "");
        this.reset();
    },
    reset: function () {
        this.data.status.className = "";
    }
}