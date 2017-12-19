define('engine',['Cesium','ThirdParty/when'],function(Cesium,when) {
        'use strict';
        function Engine(container)
        {
            this._viewer = new Cesium.Viewer(container, {
                infoBox: true,
                selectionIndicator: true,
                shadows: false,
                terrainShadows: Cesium.ShadowMode.ENABLED
            });

        }

        Engine.prototype.getViewer=function()
        {
            return this._viewer;
        };

        return Engine;
   }
);
