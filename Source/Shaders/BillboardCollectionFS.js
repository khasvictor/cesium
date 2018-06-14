//This file is automatically rebuilt by the Cesium build process.
define(function() {
    'use strict';
    return "uniform sampler2D u_atlas;\n\
#ifdef VECTOR_TILE\n\
uniform vec4 u_highlightColor;\n\
#endif\n\
varying vec2 v_textureCoordinates;\n\
varying vec4 v_pickColor;\n\
varying vec4 v_color;\n\
void main()\n\
{\n\
vec4 color = texture2D(u_atlas, v_textureCoordinates) * v_color;\n\
#if !defined(OPAQUE) && !defined(TRANSLUCENT)\n\
if (color.a < 0.005)\n\
{\n\
discard;\n\
}\n\
#else\n\
#ifdef OPAQUE\n\
if (color.a < 0.995)\n\
{\n\
discard;\n\
}\n\
#else\n\
if (color.a >= 0.995)\n\
{\n\
discard;\n\
}\n\
#endif\n\
#endif\n\
#ifdef VECTOR_TILE\n\
color *= u_highlightColor;\n\
#endif\n\
gl_FragColor = color;\n\
czm_writeLogDepth();\n\
}\n\
";
});