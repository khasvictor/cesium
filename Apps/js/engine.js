define('Engine',['when'],function(when) {
        'use strict';

        function Engine(container)
        {
            this._viewer = new Cesium.Viewer(container, {
                infoBox: true,
                selectionIndicator: true,
                shadows: false,
                terrainShadows: Cesium.ShadowMode.ENABLED
            });
            this._readyPromise = when.defer();
        }

        Engine.prototype.getViewer=function()
        {
            return this._viewer;
        };

        return Engine;
   }
);
