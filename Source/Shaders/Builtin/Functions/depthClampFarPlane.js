//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "varying float v_WindowZ;\n\
vec4 czm_depthClampFarPlane(vec4 coords)\n\
{\n\
v_WindowZ = (0.5 * (coords.z / coords.w) + 0.5) * coords.w;\n\
coords.z = min(coords.z, coords.w);\n\
return coords;\n\
}\n\
";
});