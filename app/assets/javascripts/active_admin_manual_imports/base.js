(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("jquery"), require("jquery-ui/ui/widgets/datepicker"), require("jquery-ui/ui/widgets/dialog"), require("jquery-ui/ui/widgets/sortable"), require("jquery-ui/ui/widgets/tabs"), require("jquery-ui/ui/widget"), require("jquery-ujs")) : typeof define === "function" && define.amd ? define([ "exports", "jquery", "jquery-ui/ui/widgets/datepicker", "jquery-ui/ui/widgets/dialog", "jquery-ui/ui/widgets/sortable", "jquery-ui/ui/widgets/tabs", "jquery-ui/ui/widget"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self,
    factory(global.ActiveAdmin = {}));
})(this, function(exports) {
  "use strict";
  $.fn.serializeObject = function() {
    return this.serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  };
  $.ui.dialog.prototype._focusTabbable = function() {
    this.uiDialog.focus();
  };
  function ModalDialog(message, inputs, callback) {
    let html = '<form id="dialog_confirm" title="' + message + '"><ul>';
    for (let name in inputs) {
      let opts, wrapper;
      let type = inputs[name];
      if (/^(datepicker|checkbox|text|number)$/.test(type)) {
        wrapper = "input";
      } else if (type === "textarea") {
        wrapper = "textarea";
      } else if ($.isArray(type)) {
        const _ref = ["select", type, ""];
        wrapper = _ref[0];
        opts = _ref[1];
        type = _ref[2];
      } else {
        throw new Error("Unsupported input type: {" + name + ": " + type + "}");
      }
      let klass = type === "datepicker" ? type : "";
      html += "<li>\n      <label>" + (name.charAt(0).toUpperCase() + name.slice(1)) + "</label>\n      <" + wrapper + ' name="' + name + '" class="' + klass + '" type="' + type + '">' + (opts ? function() {
        const result = [];
        opts.forEach(function(v) {
          const $elem = $("<option></option>");
          if ($.isArray(v)) {
            $elem.text(v[0]).val(v[1]);
          } else {
            $elem.text(v);
          }
          result.push($elem.wrap("<div></div>").parent().html());
        });
        return result;
      }().join("") : "") + ("</" + wrapper + ">") + "</li>";
      const _ref2 = [];
      wrapper = _ref2[0];
      opts = _ref2[1];
      type = _ref2[2];
      klass = _ref2[3];
    }
    html += "</ul></form>";
    const form = $(html).appendTo("body");
    $("body").trigger("modal_dialog:before_open", [ form ]);
    form.dialog({
      modal: true,
      open: function open(_event, _ui) {
        $("body").trigger("modal_dialog:after_open", [ form ]);
      },
      dialogClass: "active_admin_dialog",
      buttons: {
        OK: function OK() {
          callback($(this).serializeObject());
          $(this).dialog("close");
        },
        Cancel: function Cancel() {
          $(this).dialog("close").remove();
        }
      }
    });
  }

  const onDOMReady$2 = function onDOMReady() {
    $(".batch_actions_selector li a").off("click confirm:complete");
    $(".batch_actions_selector li a").on("click", function (event) {
      const _this = this;
      let message;
      event.stopPropagation();
      event.preventDefault();
      if (message = $(this).data("confirm")) {
        ModalDialog(message, $(this).data("inputs"), function (inputs) {
          $(_this).trigger("confirm:complete", inputs);
        });
      } else {
        $(this).trigger("confirm:complete");
      }
    });
    $(".batch_actions_selector li a").on("confirm:complete", function (event, inputs) {
      let val;
      if (val = JSON.stringify(inputs)) {
        $("#batch_action_inputs").removeAttr("disabled").val(val);
      } else {
        $("#batch_action_inputs").attr("disabled", "disabled");
      }
      $("#batch_action").val($(this).data("action"));
      $("#collection_selection").submit();
    });
    if ($(".batch_actions_selector").length && $(":checkbox.toggle_all").length) {
      if ($(".paginated_collection table.index_table").length) {
        $(".paginated_collection table.index_table").tableCheckboxToggler();
      } else {
        $(".paginated_collection").checkboxToggler();
      }
      $(document).on("change", ".paginated_collection :checkbox", function () {
        if ($(".paginated_collection :checkbox:checked").length && $(".dropdown_menu_list").children().length) {
          $(".batch_actions_selector").each(function () {
            $(this).aaDropdownMenu("enable");
          });
        } else {
          $(".batch_actions_selector").each(function () {
            $(this).aaDropdownMenu("disable");
          });
        }
      });
    }
  };
  $(document).ready(onDOMReady$2).on("page:load turbolinks:load", onDOMReady$2);
  const CheckboxToggler = function () {
    function CheckboxToggler(options, container) {
      this.options = options;
      this.container = container;
      this._init();
      this._bind();
    }

    const _proto = CheckboxToggler.prototype;
    _proto.option = function option(_key, _value) {
    };
    _proto._init = function _init() {
      if (!this.container) {
        throw new Error("Container element not found");
      } else {
        this.$container = $(this.container);
      }
      if (!this.$container.find(".toggle_all").length) {
        throw new Error('"toggle all" checkbox not found');
      } else {
        this.toggle_all_checkbox = this.$container.find(".toggle_all");
      }
      this.checkboxes = this.$container.find(":checkbox").not(this.toggle_all_checkbox);
    };
    _proto._bind = function _bind() {
      const _this = this;
      this.checkboxes.change(function (event) {
        return _this._didChangeCheckbox(event.target);
      });
      this.toggle_all_checkbox.change(function () {
        return _this._didChangeToggleAllCheckbox();
      });
    };
    _proto._didChangeCheckbox = function _didChangeCheckbox(_checkbox) {
      const numChecked = this.checkboxes.filter(":checked").length;
      const allChecked = numChecked === this.checkboxes.length;
      const someChecked = numChecked > 0 && numChecked < this.checkboxes.length;
      this.toggle_all_checkbox.prop({
        checked: allChecked,
        indeterminate: someChecked
      });
    };
    _proto._didChangeToggleAllCheckbox = function _didChangeToggleAllCheckbox() {
      const setting = this.toggle_all_checkbox.prop("checked");
      this.checkboxes.prop({
        checked: setting
      });
      return setting;
    };
    return CheckboxToggler;
  }();
  $.widget.bridge("checkboxToggler", CheckboxToggler);
  (function($) {
    $(document).on("focus", "input.datepicker:not(.hasDatepicker)", function() {
      const input = $(this);
      if (input[0].type === "date") {
        return;
      }
      const defaults = {
        dateFormat: "yy-mm-dd"
      };
      const options = input.data("datepicker-options");
      input.datepicker($.extend(defaults, options));
    });
  })(jQuery);
  const DropdownMenu = function () {
    function DropdownMenu(options, element) {
      this.options = options;
      this.element = element;
      this.$element = $(this.element);
      const defaults = {
        fadeInDuration: 20,
        fadeOutDuration: 100,
        onClickActionItemCallback: null
      };
      this.options = $.extend(defaults, this.options);
      this.isOpen = false;
      this.$menuButton = this.$element.find(".dropdown_menu_button");
      this.$menuList = this.$element.find(".dropdown_menu_list_wrapper");
      this._buildMenuList();
      this._bind();
    }

    const _proto = DropdownMenu.prototype;
    _proto.open = function open() {
      this.isOpen = true;
      this.$menuList.fadeIn(this.options.fadeInDuration);
      this._position();
      return this;
    };
    _proto.close = function close() {
      this.isOpen = false;
      this.$menuList.fadeOut(this.options.fadeOutDuration);
      return this;
    };
    _proto.destroy = function destroy() {
      this.$element = null;
      return this;
    };
    _proto.isDisabled = function isDisabled() {
      return this.$menuButton.hasClass("disabled");
    };
    _proto.disable = function disable() {
      this.$menuButton.addClass("disabled");
    };
    _proto.enable = function enable() {
      this.$menuButton.removeClass("disabled");
    };
    _proto.option = function option(key, value) {
      if ($.isPlainObject(key)) {
        return this.options = $.extend(true, this.options, key);
      } else if (key != null) {
        return this.options[key];
      } else {
        return this.options[key] = value;
      }
    };
    _proto._buildMenuList = function _buildMenuList() {
      this.$nipple = $('<div class="dropdown_menu_nipple"></div>');
      this.$menuList.prepend(this.$nipple);
      this.$menuList.hide();
    };
    _proto._bind = function _bind() {
      const _this = this;
      $("body").click(function () {
        if (_this.isOpen) {
          _this.close();
        }
      });
      this.$menuButton.click(function () {
        if (!_this.isDisabled()) {
          if (_this.isOpen) {
            _this.close();
          } else {
            _this.open();
          }
        }
        return false;
      });
    };
    _proto._position = function _position() {
      this.$menuList.css("top", this.$menuButton.position().top + this.$menuButton.outerHeight() + 10);
      const button_left = this.$menuButton.position().left;
      const button_center = this.$menuButton.outerWidth() / 2;
      const button_right = button_left + button_center * 2;
      const menu_center = this.$menuList.outerWidth() / 2;
      const nipple_center = this.$nipple.outerWidth() / 2;
      const window_right = $(window).width();
      const centered_menu_left = button_left + button_center - menu_center;
      const centered_menu_right = button_left + button_center + menu_center;
      if (centered_menu_left < 0) {
        this.$menuList.css("left", button_left);
        this.$nipple.css("left", button_center - nipple_center);
      } else if (centered_menu_right > window_right) {
        this.$menuList.css("right", window_right - button_right);
        this.$nipple.css("right", button_center - nipple_center);
      } else {
        this.$menuList.css("left", centered_menu_left);
        this.$nipple.css("left", menu_center - nipple_center);
      }
    };
    return DropdownMenu;
  }();
  $.widget.bridge("aaDropdownMenu", DropdownMenu);
  const onDOMReady$1 = function onDOMReady() {
    return $(".dropdown_menu").aaDropdownMenu();
  };
  $(document).ready(onDOMReady$1).on("page:load turbolinks:load", onDOMReady$1);
  function hasTurbolinks() {
    return typeof Turbolinks !== "undefined" && Turbolinks.supported;
  }
  function turbolinksVisit(params) {
    const path = [window.location.pathname, "?", toQueryString(params)].join("");
    Turbolinks.visit(path);
  }
  function queryString() {
    return (window.location.search || "").replace(/^\?/, "");
  }
  function queryStringToParams() {
    const decode = function decode(value) {
      return decodeURIComponent((value || "").replace(/\+/g, "%20"));
    };
    return queryString().split("&").map(function(pair) {
      return pair.split("=");
    }).map(function(_ref) {
      const key = _ref[0], value = _ref[1];
      return {
        name: decode(key),
        value: decode(value)
      };
    });
  }
  function toQueryString(params) {
    const encode = function encode(value) {
      return encodeURIComponent(value || "");
    };
    return params.map(function(_ref2) {
      const name = _ref2.name, value = _ref2.value;
      return [ encode(name), encode(value) ];
    }).map(function(pair) {
      return pair.join("=");
    }).join("&");
  }

  const Filters = function () {
    function Filters() {
    }

    Filters._clearForm = function _clearForm(event) {
      const regex = /^(q\[|q%5B|q%5b|page|utf8|commit)/;
      const params = queryStringToParams().filter(function (_ref) {
        const name = _ref.name;
        return !name.match(regex);
      });
      event.preventDefault();
      if (hasTurbolinks()) {
        turbolinksVisit(params);
      } else {
        window.location.search = toQueryString(params);
      }
    };
    Filters._disableEmptyInputFields = function _disableEmptyInputFields(event) {
      const params = $(this).find(":input").filter(function (i, input) {
        return input.value === "";
      }).prop({
        disabled: true
      }).end().serializeArray();
      if (hasTurbolinks()) {
        event.preventDefault();
        turbolinksVisit(params);
      }
    };
    Filters._setSearchType = function _setSearchType() {
      $(this).siblings("input").prop({
        name: "q[" + this.value + "]"
      });
    };
    return Filters;
  }();
  (function($) {
    $(document).on("click", ".clear_filters_btn", Filters._clearForm).on("submit", ".filter_form", Filters._disableEmptyInputFields).on("change", ".filter_form_field.select_and_search select", Filters._setSearchType);
  })(jQuery);
  $(function() {
    $(document).on("click", "a.button.has_many_remove", function(event) {
      event.preventDefault();
      const parent = $(this).closest(".has_many_container");
      const to_remove = $(this).closest("fieldset");
      recompute_positions(parent);
      parent.trigger("has_many_remove:before", [ to_remove, parent ]);
      to_remove.remove();
      return parent.trigger("has_many_remove:after", [ to_remove, parent ]);
    });
    $(document).on("click", "a.button.has_many_add", function(event) {
      let before_add;
      event.preventDefault();
      const parent = $(this).closest(".has_many_container");
      parent.trigger(before_add = $.Event("has_many_add:before"), [ parent ]);
      if (!before_add.isDefaultPrevented()) {
        let index = parent.data("has_many_index") || parent.children("fieldset").length - 1;
        parent.data({
          has_many_index: ++index
        });
        const regex = new RegExp($(this).data("placeholder"), "g");
        const html = $(this).data("html").replace(regex, index);
        const fieldset = $(html).insertBefore(this);
        recompute_positions(parent);
        return parent.trigger("has_many_add:after", [ fieldset, parent ]);
      }
    });
    $(document).on("change", '.has_many_container[data-sortable] :input[name$="[_destroy]"]', function() {
      recompute_positions($(this).closest(".has_many"));
    });
    init_sortable();
    $(document).on("has_many_add:after", ".has_many_container", init_sortable);
  });
  var init_sortable = function init_sortable() {
    const elems = $(".has_many_container[data-sortable]:not(.ui-sortable)");
    elems.sortable({
      items: "> fieldset",
      handle: "> ol > .handle",
      start: function start(ev, ui) {
        ui.item.css({
          opacity: .3
        });
      },
      stop: function stop(ev, ui) {
        ui.item.css({
          opacity: 1
        });
        recompute_positions($(this));
      }
    });
    elems.each(recompute_positions);
  };
  var recompute_positions = function recompute_positions(parent) {
    parent = parent instanceof jQuery ? parent : $(this);
    const input_name = parent.data("sortable");
    let position = parseInt(parent.data("sortable-start") || 0, 10);
    parent.children("fieldset").each(function() {
      const destroy_input = $(this).find("> ol > .input > :input[name$='[_destroy]']");
      const sortable_input = $(this).find("> ol > .input > :input[name$='[" + input_name + "]']");
      if (sortable_input.length) {
        sortable_input.val(destroy_input.is(":checked") ? "" : position++);
      }
    });
  };
  const PerPage = function () {
    function PerPage(element) {
      this.element = element;
    }

    const _proto = PerPage.prototype;
    _proto.update = function update() {
      const params = queryStringToParams().filter(function (_ref) {
        const name = _ref.name;
        return name != "per_page" || name != "page";
      });
      params.push({
        name: "per_page",
        value: this.element.value
      });
      if (hasTurbolinks()) {
        turbolinksVisit(params);
      } else {
        window.location.search = toQueryString(params);
      }
    };
    PerPage._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        const $this = $(this);
        let data = $this.data("perPage");
        if (!data) {
          data = new PerPage(this);
          $this.data("perPage", data);
        }
        if (config === "update") {
          data[config]();
        }
      });
    };
    return PerPage;
  }();
  (function($) {
    $(document).on("change", ".pagination_per_page > select", function(_event) {
      PerPage._jQueryInterface.call($(this), "update");
    });
    $.fn["perPage"] = PerPage._jQueryInterface;
    $.fn["perPage"].Constructor = PerPage;
  })(jQuery);
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  const TableCheckboxToggler = function (_CheckboxToggler) {
    _inheritsLoose(TableCheckboxToggler, _CheckboxToggler);

    function TableCheckboxToggler() {
      return _CheckboxToggler.apply(this, arguments) || this;
    }

    const _proto = TableCheckboxToggler.prototype;
    _proto._bind = function _bind() {
      const _this = this;
      _CheckboxToggler.prototype._bind.apply(this, arguments);
      this.$container.find("tbody td").click(function (event) {
        if (event.target.type !== "checkbox") {
          _this._didClickCell(event.target);
        }
      });
    };
    _proto._didChangeCheckbox = function _didChangeCheckbox(checkbox) {
      _CheckboxToggler.prototype._didChangeCheckbox.apply(this, arguments);
      $(checkbox).parents("tr").toggleClass("selected", checkbox.checked);
    };
    _proto._didChangeToggleAllCheckbox = function _didChangeToggleAllCheckbox() {
      this.$container.find("tbody tr").toggleClass("selected", _CheckboxToggler.prototype._didChangeToggleAllCheckbox.apply(this, arguments));
    };
    _proto._didClickCell = function _didClickCell(cell) {
      $(cell).parent("tr").find(":checkbox").click();
    };
    return TableCheckboxToggler;
  }(CheckboxToggler);
  $.widget.bridge("tableCheckboxToggler", TableCheckboxToggler);
  const onDOMReady = function onDOMReady() {
    return $("#active_admin_content .tabs").tabs();
  };
  $(document).ready(onDOMReady).on("page:load turbolinks:load", onDOMReady);
  function modal_dialog(message, inputs, callback) {
    console.warn("ActiveAdmin.modal_dialog is deprecated in favor of ActiveAdmin.ModalDialog, please update usage.");
    return ModalDialog(message, inputs, callback);
  }
  exports.ModalDialog = ModalDialog;
  exports.modal_dialog = modal_dialog;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
});
