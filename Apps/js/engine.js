define('Engine',['cesium'],function(cesium) {
        'use strict';
        var viewer = new Cesium.Viewer('cesiumContainer', {
            infoBox: true,
            selectionIndicator: true,
            shadows: true,
            terrainShadows: Cesium.ShadowMode.ENABLED
        });
        // function Engine()
        // {

        // }
        // Engine.prototype.Load=function()
        // {
        //     var viewer = new Cesium.Viewer('cesiumContainer', {
        //         infoBox: true,
        //         selectionIndicator: true,
        //         shadows: true,
        //         terrainShadows: Cesium.ShadowMode.ENABLED
        //     });
        // };
        // return Engine;
   }
);
