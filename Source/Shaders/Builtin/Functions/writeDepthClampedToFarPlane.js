//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "varying float v_WindowZ;\n\
void czm_writeDepthClampedToFarPlane()\n\
{\n\
#ifdef GL_EXT_frag_depth\n\
gl_FragDepthEXT = min(v_WindowZ * gl_FragCoord.w, 1.0);\n\
#endif\n\
}\n\
";
});