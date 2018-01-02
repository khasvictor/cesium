require.config({
    baseUrl: '../../../Source',
    paths: {
        'Engine': '../../Apps/js/lib/engine',
        'BaseObj': '../../Apps/js/lib/baseObj',
        'LocationPickTool': '../../Apps/js/lib/tools/locationPickTool/locationPickTool',
        'DrawTool': '../../Apps/js/lib/tools/drawTool/drawTool',
        'jquery': '../../Apps/js/lib/third_party/jquery-3.2.1.slim.min',
        'ko':'./ThirdParty/knockout-3.4.2'
    }
});

require(['Engine','Cesium','jquery'], function(Engine,Cesium,$) {
    'use strict';

    var engine =new Engine('cesiumContainer');

    var viewer=engine.getViewer();

    //viewer.scene.debugShowFramesPerSecond=true;

    var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        // maximumScreenSpaceError:16,
        // dynamicScreenSpaceError:true,
        // loadSiblings:true,
        url : 'http://192.168.199.183/3dtiles/osgb/Production_3/scene/Production_3.json'//'http://localhost/Production_4/Scene/Production_4.json'
    }));

    tileset.readyPromise.then(function() {
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.flyToBoundingSphere(boundingSphere);
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);


    }).otherwise(function(error) {
        throw(error);
    });

    // var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url : 'http://localhost/MasterPlant_1c/tileset.json'
    // }));

    // tileset.readyPromise.then(function() {
    //     var boundingSphere = tileset.boundingSphere;
    //     viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.5, -0.2, boundingSphere.radius * 4.0));
    //     viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    // }).otherwise(function(error) {
    //     throw(error);
    // });

    // var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    //     url: 'http://localhost/tileset/tileset.json'
    // }));

    // tileset.readyPromise.then(function() {
    //     var boundingSphere = tileset.boundingSphere;
    //     viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.3, 0.0));
    //     viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    // });

    // var blueBox = viewer.entities.add({
    //     name: 'Blue box',
    //     position: Cesium.Cartesian3.fromDegrees(110.0, 40.0, 0.0),
    //     box: {
    //         dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
    //         material: Cesium.Color.BLUE
    //     }
    // });
});
