/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*/

/*global L*/

(function (window, document, undefined) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.AwesomeMarkers = {};

    L.AwesomeMarkers.version = '2.0.1';

    L.AwesomeMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [35, 45],
            iconAnchor:   [17, 42],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: 'awesome-marker',
            prefix: 'glyphicon',
            spinClass: 'fa-spin',
            extraClasses: '',
            icon: 'home',
            markerColor: 'blue',
            iconColor: 'white'
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('span'),
                options = this.options;
            if (options.bgPos) {
                s.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, options.markerColor);
            if (options.icon) {
                div.innerHTML += this._createInner();
            }
            return div;
        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorClass = "", iconColorStyle = "", options = this.options;
            var preIcon = options.icon.slice(0,options.prefix.length+1);
            var fontAwesomePrefixes = new Array('fa', 'fas', 'fab', 'far', 'fal');
            if(preIcon === options.prefix + "-") {
                iconClass = options.icon;
            } else {
                if(fontAwesomePrefixes.includes(options.prefix)) {
                  iconClass = 'fa-'+options.icon;
                } else {
                  iconClass = options.prefix + "-" + options.icon;
                }
            }
            
            iconClass += " fa-stack-1x"

            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                if(options.iconColor === 'white' || options.iconColor === 'black') {
                    iconColorClass = "icon-" + options.iconColor;
                } else {
                    iconColorStyle = "style='color: " + options.iconColor + "' ";
                }
            }

            return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
                anchor;

            if (name === 'shadow') {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
            } else {
                anchor = L.point(options.iconAnchor);
                img.className = 'fa fa-map-marker fa-4x '
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            if(name.includes('#')) {
              img.className += 'awesome-marker ' + options.className;
              img.style.color = name;
            } else if(name === 'shadow') {
              img.className += 'awesome-marker-' + name + ' ' + options.className;
            } else {
              img.className += 'awesome-marker-icon-' + name + ' ' + options.className;
            }

            if (anchor) {
                img.style.marginLeft = (-anchor.x) + 'px';
                img.style.marginTop  = (-anchor.y) + 'px';
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
      }
    });
        
    L.AwesomeMarkers.icon = function (options) {
        return new L.AwesomeMarkers.Icon(options);
    };

}(this, document));



