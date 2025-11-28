(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/concepts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONCEPTS",
    ()=>CONCEPTS,
    "convertBJJConceptToConceptPoint",
    ()=>convertBJJConceptToConceptPoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
var CONCEPTS = [
    {
        id: "empathy",
        label: "Empathy",
        x: 0.72,
        y: 0.41,
        category: "Grappling Primitives",
        description: "Understanding your opponent's position and intentions"
    },
    {
        id: "pressure",
        label: "Pressure",
        x: -0.35,
        y: -0.62,
        category: "Physical Techniques",
        description: "Applying controlled pressure to control your opponent"
    },
    {
        id: "timing",
        label: "Timing",
        x: 0.58,
        y: 0.73,
        category: "Mental Skills",
        description: "Recognizing and executing techniques at the right moment"
    },
    {
        id: "balance",
        label: "Balance",
        x: -0.12,
        y: 0.25,
        category: "Physical Techniques",
        description: "Maintaining your own balance while disrupting your opponent's"
    }
];
function convertBJJConceptToConceptPoint(concept) {
    // Convert 0-1 range to -1 to 1 range
    // X axis: axis_mental_physical (0=Mental/left, 1=Physical/right)
    // Y axis: axis_self_opponent (0=Opponent/bottom, 1=Self/top)
    // In our coordinate system: -1 to 1, where center is 0
    // SVG Y increases downward, so we invert: Self (1) should be at top (-1)
    var x = (concept.axis_mental_physical - 0.5) * 2; // 0->-1 (Mental/left), 0.5->0, 1->1 (Physical/right)
    var y = -((concept.axis_self_opponent - 0.5) * 2); // 0->1 (Opponent/bottom), 0.5->0, 1->-1 (Self/top)
    return {
        id: concept.id,
        label: concept.concept,
        x: x,
        y: y,
        category: concept.category,
        description: concept.description,
        color: concept.color
    };
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/matrix/panzoom.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePanZoom",
    ()=>usePanZoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
var MIN_ZOOM = 0.5;
var MAX_ZOOM = 5;
var ZOOM_STEP = 0.1;
var DEFAULT_ZOOM = 1;
function usePanZoom(initialState) {
    _s();
    var _initialState_zoom, _initialState_translateX, _initialState_translateY;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        zoom: (_initialState_zoom = initialState === null || initialState === void 0 ? void 0 : initialState.zoom) !== null && _initialState_zoom !== void 0 ? _initialState_zoom : DEFAULT_ZOOM,
        translateX: (_initialState_translateX = initialState === null || initialState === void 0 ? void 0 : initialState.translateX) !== null && _initialState_translateX !== void 0 ? _initialState_translateX : 0,
        translateY: (_initialState_translateY = initialState === null || initialState === void 0 ? void 0 : initialState.translateY) !== null && _initialState_translateY !== void 0 ? _initialState_translateY : 0
    }), 2), state = _useState[0], setState = _useState[1];
    var isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    var zoomBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomBy]": function(delta, centerX, centerY, width, height) {
            setState({
                "usePanZoom.useCallback[zoomBy]": function(prev) {
                    var newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + delta));
                    var zoomRatio = newZoom / prev.zoom;
                    // If center point is provided, zoom towards that point
                    // centerX/Y are in screen pixel coordinates
                    // The transform is: scale(z) translate(tx/z, ty/z)
                    // SVG applies right-to-left: translate first, then scale
                    // So: translate(tx/z, ty/z) then scale(z)
                    // A data point at (dx, dy) becomes: ((dx + tx/z) * z, (dy + ty/z) * z) = (dx*z + tx, dy*z + ty)
                    // 
                    // To keep a screen point (sx, sy) fixed:
                    // 1. Convert screen to viewBox coordinates (before transform): vx = (sx / width) * 4 - 2
                    // 2. Find what data point is currently at this viewBox position: dx = (vx - tx) / z
                    // 3. After zoom, we want the same data point at the same screen position
                    // 4. So: vx' = dx * z' + tx' = vx
                    // 5. Solving: tx' = vx - dx * z' = vx - (vx - tx) * z' / z = vx * (1 - z'/z) + tx * z'/z
                    if (centerX !== undefined && centerY !== undefined && width && height) {
                        // Convert screen pixel to data coordinate (in viewBox space -2 to 2)
                        // Current viewBox: minX, minY, size (where size = 4/zoom)
                        var currentViewBoxSize = 4 / prev.zoom;
                        var currentMinX = -2 - prev.translateX - (currentViewBoxSize - 4) / 2;
                        var currentMinY = -2 - prev.translateY - (currentViewBoxSize - 4) / 2;
                        // Screen point in viewBox coordinates (where the dot actually is)
                        var dataX = currentMinX + centerX / width * currentViewBoxSize;
                        var dataY = currentMinY + centerY / height * currentViewBoxSize;
                        // After zoom, we want this same data point to stay at the same screen position
                        // New viewBox size
                        var newViewBoxSize = 4 / newZoom;
                        // Calculate new translate to keep dataX at the same screen position
                        // dataX = newMinX + (centerX / width) * newViewBoxSize
                        // So: newMinX = dataX - (centerX / width) * newViewBoxSize
                        var newMinX = dataX - centerX / width * newViewBoxSize;
                        var newMinY = dataY - centerY / height * newViewBoxSize;
                        // Convert back to translate coordinates
                        // newMinX = -2 - newTranslateX - (newViewBoxSize - 4) / 2
                        // So: newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2
                        var newTranslateX = -2 - newMinX - (newViewBoxSize - 4) / 2;
                        var newTranslateY = -2 - newMinY - (newViewBoxSize - 4) / 2;
                        return {
                            zoom: newZoom,
                            translateX: newTranslateX,
                            translateY: newTranslateY
                        };
                    }
                    // Zoom without center point - zoom around current center
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                        zoom: newZoom
                    });
                }
            }["usePanZoom.useCallback[zoomBy]"]);
        }
    }["usePanZoom.useCallback[zoomBy]"], []);
    var panBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[panBy]": function(deltaX, deltaY) {
            // deltaX and deltaY are in viewBox units
            // When panning, we move the viewBox, which means we adjust translate
            // Since viewBox moves in the opposite direction of the pan, we subtract
            setState({
                "usePanZoom.useCallback[panBy]": function(prev) {
                    return {
                        translateX: prev.translateX - deltaX,
                        translateY: prev.translateY - deltaY,
                        zoom: prev.zoom
                    };
                }
            }["usePanZoom.useCallback[panBy]"]);
        }
    }["usePanZoom.useCallback[panBy]"], []);
    var reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[reset]": function() {
            setState({
                zoom: DEFAULT_ZOOM,
                translateX: 0,
                translateY: 0
            });
        }
    }["usePanZoom.useCallback[reset]"], []);
    var setZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[setZoom]": function(zoom) {
            setState({
                "usePanZoom.useCallback[setZoom]": function(prev) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, prev), {
                        zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom))
                    });
                }
            }["usePanZoom.useCallback[setZoom]"]);
        }
    }["usePanZoom.useCallback[setZoom]"], []);
    var zoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomIn]": function() {
            zoomBy(ZOOM_STEP);
        }
    }["usePanZoom.useCallback[zoomIn]"], [
        zoomBy
    ]);
    var zoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[zoomOut]": function() {
            zoomBy(-ZOOM_STEP);
        }
    }["usePanZoom.useCallback[zoomOut]"], [
        zoomBy
    ]);
    // Mouse pan handlers
    var handleMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseDown]": function(e) {
            if (e.button === 0) {
                isPanning.current = true;
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        }
    }["usePanZoom.useCallback[handleMouseDown]"], []);
    var handleMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseMove]": function(e, convertToViewBox) {
            if (isPanning.current) {
                var deltaX = e.clientX - lastPanPoint.current.x;
                var deltaY = e.clientY - lastPanPoint.current.y;
                // If conversion function provided, use it (for viewBox units)
                // Otherwise use screen pixels (legacy behavior)
                if (convertToViewBox) {
                    var viewBoxDelta = convertToViewBox(deltaX, deltaY);
                    panBy(viewBoxDelta.x, viewBoxDelta.y);
                } else {
                    panBy(deltaX, deltaY);
                }
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        }
    }["usePanZoom.useCallback[handleMouseMove]"], [
        panBy
    ]);
    var handleMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleMouseUp]": function() {
            isPanning.current = false;
        }
    }["usePanZoom.useCallback[handleMouseUp]"], []);
    var handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleWheel]": function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            var rect = e.currentTarget.getBoundingClientRect();
            // Get mouse position relative to the container (in screen pixels)
            var centerX = e.clientX - rect.left;
            var centerY = e.clientY - rect.top;
            // Zoom towards the mouse position
            zoomBy(delta, centerX, centerY);
        }
    }["usePanZoom.useCallback[handleWheel]"], [
        zoomBy
    ]);
    // Touch handlers
    var touchStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchStart]": function(e) {
            if (e.touches.length === 1) {
                touchStartRef.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    distance: 0
                };
            } else if (e.touches.length === 2) {
                var touch1 = e.touches[0];
                var touch2 = e.touches[1];
                var distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                touchStartRef.current = {
                    x: (touch1.clientX + touch2.clientX) / 2,
                    y: (touch1.clientY + touch2.clientY) / 2,
                    distance: distance
                };
            }
        }
    }["usePanZoom.useCallback[handleTouchStart]"], []);
    var handleTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchMove]": function(e, convertToViewBox, width, height) {
            if (!touchStartRef.current) return;
            if (e.touches.length === 1 && touchStartRef.current.distance === 0) {
                // Single finger pan
                var deltaX = e.touches[0].clientX - touchStartRef.current.x;
                var deltaY = e.touches[0].clientY - touchStartRef.current.y;
                if (convertToViewBox) {
                    var viewBoxDelta = convertToViewBox(deltaX, deltaY);
                    panBy(viewBoxDelta.x, viewBoxDelta.y);
                } else {
                    panBy(deltaX, deltaY);
                }
                touchStartRef.current.x = e.touches[0].clientX;
                touchStartRef.current.y = e.touches[0].clientY;
            } else if (e.touches.length === 2 && touchStartRef.current.distance > 0) {
                // Two finger pinch zoom
                var touch1 = e.touches[0];
                var touch2 = e.touches[1];
                var distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                var scale = distance / touchStartRef.current.distance;
                var rect = e.currentTarget.getBoundingClientRect();
                var centerX = touchStartRef.current.x - rect.left;
                var centerY = touchStartRef.current.y - rect.top;
                zoomBy((scale - 1) * ZOOM_STEP * 2, centerX, centerY, width, height);
                touchStartRef.current.distance = distance;
            }
        }
    }["usePanZoom.useCallback[handleTouchMove]"], [
        panBy,
        zoomBy
    ]);
    var handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePanZoom.useCallback[handleTouchEnd]": function() {
            touchStartRef.current = null;
        }
    }["usePanZoom.useCallback[handleTouchEnd]"], []);
    return {
        state: state,
        zoomBy: zoomBy,
        panBy: panBy,
        reset: reset,
        setZoom: setZoom,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            onWheel: handleWheel,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd
        }
    };
}
_s(usePanZoom, "MeU65zqlJV7V0wa4Ee5lcskY6pM=");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/matrix/scales.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Scale helpers for converting between normalized coordinates (-1 to 1) and screen coordinates
 */ __turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "getViewBox",
    ()=>getViewBox,
    "normalizedToScreen",
    ()=>normalizedToScreen,
    "screenToNormalized",
    ()=>screenToNormalized
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
;
function normalizedToScreen(normalized, viewport, axis) {
    var center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    var range = axis === 'x' ? viewport.width : viewport.height;
    var scale = range * viewport.zoom / 2;
    return center + normalized * scale + (axis === 'x' ? viewport.translateX : viewport.translateY);
}
function screenToNormalized(screen, viewport, axis) {
    var center = axis === 'x' ? viewport.width / 2 : viewport.height / 2;
    var range = axis === 'x' ? viewport.width : viewport.height;
    var scale = range * viewport.zoom / 2;
    return (screen - center - (axis === 'x' ? viewport.translateX : viewport.translateY)) / scale;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function getViewBox(viewport) {
    // Base viewBox is -2 to 2 (width 4, height 4)
    // Zoom: viewBox size = 4 / zoom (zoom=2 means size=2, showing 2x zoom)
    var viewBoxSize = 4 / viewport.zoom;
    // Pan: translate moves the viewBox window
    // Base center is at (0, 0) in viewBox coordinates
    // translateX/Y moves the center of what we see
    var minX = -2 - viewport.translateX - (viewBoxSize - 4) / 2;
    var minY = -2 - viewport.translateY - (viewBoxSize - 4) / 2;
    return "".concat(minX, " ").concat(minY, " ").concat(viewBoxSize, " ").concat(viewBoxSize);
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
var Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border border-border-subtle bg-bg-raised text-text-primary shadow-card", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, _this);
});
_c1 = Card;
Card.displayName = "Card";
var CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, _this);
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
var CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, _this);
});
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
var CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-text-muted", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, _this);
});
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
var CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, _this);
});
_c9 = CardContent;
CardContent.displayName = "CardContent";
var CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, _this);
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
;
var badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            "default": "border-transparent bg-accent-primary text-white",
            secondary: "border-transparent bg-bg-raised text-text-primary",
            destructive: "border-transparent bg-red-600 text-white",
            outline: "text-text-primary border-border-subtle"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(_param) {
    var className = _param.className, variant = _param.variant, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "variant"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant: variant
        }), className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatrixControls",
    ()=>MatrixControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function MatrixControls(param) {
    var onZoomIn = param.onZoomIn, onZoomOut = param.onZoomOut, onReset = param.onReset, onQuadrant = param.onQuadrant, className = param.className;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomIn,
                        className: "h-10 w-10",
                        "aria-label": "Zoom in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onZoomOut,
                        className: "h-10 w-10",
                        "aria-label": "Zoom out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "icon",
                        onClick: onReset,
                        className: "h-10 w-10",
                        "aria-label": "Reset view",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            onQuadrant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1 mt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(1);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 1",
                        children: "Q1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(2);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 2",
                        children: "Q2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(3);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 3",
                        children: "Q3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: function() {
                            return onQuadrant(4);
                        },
                        className: "h-8 text-xs",
                        "aria-label": "Quadrant 4",
                        children: "Q4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/concept-matrix/matrix-controls.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = MatrixControls;
var _c;
__turbopack_context__.k.register(_c, "MatrixControls");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/load-concepts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadConcepts",
    ()=>loadConcepts,
    "loadConceptsSync",
    ()=>loadConceptsSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-client] (ecmascript)");
;
;
;
;
;
function loadConcepts() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
        var response, data, seenIds, concepts, categoryMap, error;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        fetch("/data/BJJMasterList.json", {
                            cache: "force-cache"
                        })
                    ];
                case 1:
                    response = _state.sent();
                    if (!response.ok) {
                        throw new Error("Failed to load concepts: ".concat(response.status));
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 2:
                    data = _state.sent();
                    if (!data.skillsMasterList || !Array.isArray(data.skillsMasterList)) {
                        throw new Error("Invalid data format");
                    }
                    // Convert BJJConcept to ConceptPoint and handle duplicates
                    // Use a Set to track seen IDs and ensure uniqueness
                    seenIds = new Set();
                    concepts = [];
                    data.skillsMasterList.forEach(function(concept, index) {
                        // Create a base ID
                        var baseId = concept.id || "concept-".concat(index);
                        var uniqueId = baseId;
                        var duplicateCount = 0;
                        // If we've seen this ID before, append a counter to make it unique
                        while(seenIds.has(uniqueId)){
                            duplicateCount++;
                            uniqueId = "".concat(baseId, "-dup-").concat(duplicateCount);
                        }
                        seenIds.add(uniqueId);
                        concepts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertBJJConceptToConceptPoint"])({
                            id: uniqueId,
                            concept: concept.concept,
                            description: concept.description || concept.short_description,
                            category: concept.category,
                            axis_self_opponent: concept.axis_self_opponent,
                            axis_mental_physical: concept.axis_mental_physical,
                            color: concept.color
                        }));
                    });
                    // Log if we found duplicates
                    if (concepts.length !== data.skillsMasterList.length) {
                        console.warn("Found ".concat(data.skillsMasterList.length - concepts.length, " duplicate concept IDs"));
                    }
                    // Extract unique categories with colors and axis labels
                    categoryMap = new Map();
                    if (data.categories && Array.isArray(data.categories)) {
                        data.categories.forEach(function(cat) {
                            if (cat.name && cat.color) {
                                categoryMap.set(cat.name, {
                                    color: cat.color,
                                    xAxis: cat.xAxis,
                                    yAxis: cat.yAxis
                                });
                            }
                        });
                    }
                    // Add category colors to concepts
                    concepts.forEach(function(concept) {
                        if (!concept.color && categoryMap.has(concept.category)) {
                            concept.color = categoryMap.get(concept.category).color;
                        }
                    });
                    return [
                        2,
                        {
                            concepts: concepts,
                            categories: Array.from(categoryMap.entries()).map(function(param) {
                                var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), name = _param[0], data = _param[1];
                                return {
                                    name: name,
                                    color: data.color,
                                    xAxis: data.xAxis,
                                    yAxis: data.yAxis
                                };
                            })
                        }
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Failed to load concepts:", error);
                    // Return empty data on error
                    return [
                        2,
                        {
                            concepts: [],
                            categories: []
                        }
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    })();
}
function loadConceptsSync() {
    // For static builds, we'll need to import the JSON directly
    // This is a fallback - in practice, we'll use the async version
    return {
        concepts: [],
        categories: []
    };
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/concept-matrix/concept-matrix.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConceptMatrix",
    ()=>ConceptMatrix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/concepts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/panzoom.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/matrix/scales.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/concept-matrix/matrix-controls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/load-concepts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// Category color mapping - will be populated from actual data
var CATEGORY_COLORS = {
    "Grappling Primitives": "#848a94",
    Tactics: "#8A2BE2",
    Strategy: "#FF8C00",
    Training: "#00CED1",
    Coaching: "#6b6d70",
    Memes: "#8A2BE2",
    "21 Immutable Principles": "#FFD700",
    "32 Principles": "#FFD700",
    Default: "#6B7280"
};
function getCategoryColor(category, categoryMap) {
    if (categoryMap && categoryMap.has(category)) {
        return categoryMap.get(category);
    }
    return CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
}
function ConceptMatrix(param) {
    var _this = this;
    var initialConcepts = param.concepts, initialWidth = param.width, initialHeight = param.height;
    _s();
    var containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 800,
        height: 600
    }), 2), dimensions = _useState[0], setDimensions = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), selectedConcept = _useState1[0], setSelectedConcept = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), hoveredConcept = _useState2[0], setHoveredConcept = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    }), 2), tooltipPosition = _useState3[0], setTooltipPosition = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), mounted = _useState4[0], setMounted = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    }), 2), tooltipScreenPosition = _useState5[0], setTooltipScreenPosition = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialConcepts || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONCEPTS"]), 2), concepts = _useState6[0], setConcepts = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!initialConcepts), 2), loading = _useState7[0], setLoading = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), conceptData = _useState8[0], setConceptData = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), selectedCategories = _useState9[0], setSelectedCategories = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), filterExpanded = _useState10[0], setFilterExpanded = _useState10[1];
    var isPanning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var lastPanPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    var panZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePanZoom"])();
    // Build category map for colors and axis labels
    var categoryMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[categoryMap]": function() {
            var map = new Map();
            if (conceptData === null || conceptData === void 0 ? void 0 : conceptData.categories) {
                conceptData.categories.forEach({
                    "ConceptMatrix.useMemo[categoryMap]": function(cat) {
                        map.set(cat.name, cat.color);
                    }
                }["ConceptMatrix.useMemo[categoryMap]"]);
            }
            return map;
        }
    }["ConceptMatrix.useMemo[categoryMap]"], [
        conceptData
    ]);
    // Get axis labels from the first category (or selected categories)
    // Note: X axis = mental_physical, Y axis = self_opponent (matching old D3 code)
    var axisLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[axisLabels]": function() {
            if (!(conceptData === null || conceptData === void 0 ? void 0 : conceptData.categories) || conceptData.categories.length === 0) {
                return {
                    xAxis: {
                        left: "Mental",
                        right: "Physical"
                    },
                    yAxis: {
                        bottom: "Opponent",
                        top: "Self"
                    }
                };
            }
            // Use the first category's axis labels, or from selected categories
            var category = selectedCategories.size > 0 ? conceptData.categories.find({
                "ConceptMatrix.useMemo[axisLabels]": function(cat) {
                    return selectedCategories.has(cat.name);
                }
            }["ConceptMatrix.useMemo[axisLabels]"]) : conceptData.categories[0];
            // Swap the labels to match our axis mapping
            return {
                xAxis: (category === null || category === void 0 ? void 0 : category.yAxis) || {
                    left: "Mental",
                    right: "Physical"
                },
                yAxis: (category === null || category === void 0 ? void 0 : category.xAxis) || {
                    bottom: "Opponent",
                    top: "Self"
                }
            };
        }
    }["ConceptMatrix.useMemo[axisLabels]"], [
        conceptData,
        selectedCategories
    ]);
    // Filter concepts by selected categories
    var filteredConcepts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[filteredConcepts]": function() {
            if (selectedCategories.size === 0) {
                return concepts;
            }
            return concepts.filter({
                "ConceptMatrix.useMemo[filteredConcepts]": function(c) {
                    return selectedCategories.has(c.category);
                }
            }["ConceptMatrix.useMemo[filteredConcepts]"]);
        }
    }["ConceptMatrix.useMemo[filteredConcepts]"], [
        concepts,
        selectedCategories
    ]);
    // Get unique categories from concepts
    var availableCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ConceptMatrix.useMemo[availableCategories]": function() {
            var cats = new Set();
            concepts.forEach({
                "ConceptMatrix.useMemo[availableCategories]": function(c) {
                    return cats.add(c.category);
                }
            }["ConceptMatrix.useMemo[availableCategories]"]);
            return Array.from(cats).sort();
        }
    }["ConceptMatrix.useMemo[availableCategories]"], [
        concepts
    ]);
    // Load real data if no concepts provided
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConceptMatrix.useEffect": function() {
            if (!initialConcepts) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadConcepts"])().then({
                    "ConceptMatrix.useEffect": function(data) {
                        if (data.concepts.length > 0) {
                            console.log("✅ Loaded ".concat(data.concepts.length, " concepts"));
                            setConcepts(data.concepts);
                            setConceptData(data);
                        } else {
                            console.warn("⚠️ No concepts loaded");
                        }
                        setLoading(false);
                    }
                }["ConceptMatrix.useEffect"])["catch"]({
                    "ConceptMatrix.useEffect": function(error) {
                        console.error("Failed to load concepts:", error);
                        setLoading(false);
                    }
                }["ConceptMatrix.useEffect"]);
            } else {
                console.log("Using ".concat(initialConcepts.length, " provided concepts"));
            }
        }
    }["ConceptMatrix.useEffect"], [
        initialConcepts
    ]);
    // Update dimensions on mount and resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConceptMatrix.useEffect": function() {
            setMounted(true);
            var updateDimensions = {
                "ConceptMatrix.useEffect.updateDimensions": function() {
                    if (containerRef.current) {
                        var rect = containerRef.current.getBoundingClientRect();
                        setDimensions({
                            width: initialWidth || rect.width || 800,
                            height: initialHeight || Math.max(rect.height, 400) || 600
                        });
                    }
                }
            }["ConceptMatrix.useEffect.updateDimensions"];
            updateDimensions();
            window.addEventListener("resize", updateDimensions);
            return ({
                "ConceptMatrix.useEffect": function() {
                    return window.removeEventListener("resize", updateDimensions);
                }
            })["ConceptMatrix.useEffect"];
        }
    }["ConceptMatrix.useEffect"], [
        initialWidth,
        initialHeight
    ]);
    // Convert screen coordinates to viewBox coordinates (data space)
    // This gives us the point in the untransformed coordinate system
    var screenToDataSpace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[screenToDataSpace]": function(screenX, screenY) {
            // Convert screen pixel to viewBox coordinate (before transform)
            // viewBox is -2 to 2 (width 4), so: viewBoxX = (screenX / width) * 4 - 2
            var viewBoxX = screenX / dimensions.width * 4 - 2;
            var viewBoxY = screenY / dimensions.height * 4 - 2;
            // The transform is: scale(z) translate(tx/z, ty/z)
            // SVG applies right-to-left: translate first, then scale
            // So to reverse: divide by zoom, then subtract translate
            var dataX = viewBoxX / panZoom.state.zoom - panZoom.state.translateX / panZoom.state.zoom;
            var dataY = viewBoxY / panZoom.state.zoom - panZoom.state.translateY / panZoom.state.zoom;
            return {
                x: dataX,
                y: dataY
            };
        }
    }["ConceptMatrix.useCallback[screenToDataSpace]"], [
        dimensions,
        panZoom.state
    ]);
    // Convert screen pixel delta to viewBox units for panning
    var screenDeltaToViewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[screenDeltaToViewBox]": function(deltaX, deltaY) {
            // Convert screen pixel delta to current viewBox units
            // Current viewBox size = 4 / zoom
            var currentViewBoxSize = 4 / panZoom.state.zoom;
            var viewBoxDeltaX = deltaX / dimensions.width * currentViewBoxSize;
            var viewBoxDeltaY = deltaY / dimensions.height * currentViewBoxSize;
            return {
                x: viewBoxDeltaX,
                y: viewBoxDeltaY
            };
        }
    }["ConceptMatrix.useCallback[screenDeltaToViewBox]"], [
        dimensions,
        panZoom.state.zoom
    ]);
    // Handle double-click zoom
    var handleDoubleClick = function(e) {
        var rect = e.currentTarget.getBoundingClientRect();
        var screenX = e.clientX - rect.left;
        var screenY = e.clientY - rect.top;
        panZoom.zoomBy(0.5, screenX, screenY, dimensions.width, dimensions.height);
    };
    // Handle wheel zoom with proper coordinate conversion
    var handleWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ConceptMatrix.useCallback[handleWheel]": function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -0.1 : 0.1;
            var rect = e.currentTarget.getBoundingClientRect();
            var screenX = e.clientX - rect.left;
            var screenY = e.clientY - rect.top;
            panZoom.zoomBy(delta, screenX, screenY, dimensions.width, dimensions.height);
        }
    }["ConceptMatrix.useCallback[handleWheel]"], [
        panZoom,
        dimensions
    ]);
    // Handle concept click/tap
    var handleConceptClick = function(concept, e) {
        var _containerRef_current;
        e.stopPropagation();
        setSelectedConcept(concept);
        var rect = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.getBoundingClientRect();
        if (rect) {
            var clientX, clientY;
            if (e.type === "touchstart") {
                var touch = e.touches[0];
                clientX = touch.clientX;
                clientY = touch.clientY;
            } else {
                var mouse = e;
                clientX = mouse.clientX;
                clientY = mouse.clientY;
            }
            setTooltipPosition({
                x: clientX - rect.left,
                y: clientY - rect.top
            });
            setTooltipScreenPosition({
                x: clientX,
                y: clientY
            });
        }
    };
    // Update tooltip screen position on scroll/resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConceptMatrix.useEffect": function() {
            if (!selectedConcept || !containerRef.current) return;
            var updatePosition = {
                "ConceptMatrix.useEffect.updatePosition": function() {
                    var _containerRef_current;
                    var rect = (_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.getBoundingClientRect();
                    if (rect) {
                        setTooltipScreenPosition({
                            x: tooltipPosition.x + rect.left,
                            y: tooltipPosition.y + rect.top
                        });
                    }
                }
            }["ConceptMatrix.useEffect.updatePosition"];
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return ({
                "ConceptMatrix.useEffect": function() {
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                }
            })["ConceptMatrix.useEffect"];
        }
    }["ConceptMatrix.useEffect"], [
        selectedConcept,
        tooltipPosition
    ]);
    var viewport = {
        width: dimensions.width,
        height: dimensions.height,
        translateX: panZoom.state.translateX,
        translateY: panZoom.state.translateY,
        zoom: panZoom.state.zoom
    };
    var viewBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$scales$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getViewBox"])(viewport);
    // Convert normalized coordinates (-1 to 1) to SVG viewBox coordinates
    // The viewBox is -2 to 2, so we map directly: -1 maps to -2, 0 to 0, 1 to 2
    // These are FIXED coordinates - dots stay at these positions regardless of zoom/pan
    var toSVGX = function(normalized) {
        return normalized * 2;
    };
    var toSVGY = function(normalized) {
        return normalized * 2;
    };
    // Handle quadrant navigation
    var handleQuadrant = function(quadrant) {
        var centerX = dimensions.width / 2;
        var centerY = dimensions.height / 2;
        // Quadrant centers in normalized coordinates
        var quadrantCenters = {
            1: {
                x: 0.5,
                y: 0.5
            },
            2: {
                x: -0.5,
                y: 0.5
            },
            3: {
                x: -0.5,
                y: -0.5
            },
            4: {
                x: 0.5,
                y: -0.5
            }
        };
        var target = quadrantCenters[quadrant];
        // Convert to screen coordinates and center
        var screenX = centerX + target.x * (dimensions.width / 2);
        var screenY = centerY - target.y * (dimensions.height / 2);
        // Set zoom and translate to center on quadrant
        panZoom.setZoom(1.5);
        panZoom.panBy(centerX - screenX, centerY - screenY);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-text-muted",
                children: "Loading concepts..."
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 295,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
            lineNumber: 294,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full h-full min-h-[400px] bg-bg-raised rounded-lg border border-border-subtle overflow-hidden",
        onMouseDown: function(e) {
            if (e.button === 0) {
                isPanning.current = true;
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseMove: function(e) {
            if (isPanning.current) {
                var deltaX = e.clientX - lastPanPoint.current.x;
                var deltaY = e.clientY - lastPanPoint.current.y;
                var viewBoxDelta = screenDeltaToViewBox(deltaX, deltaY);
                panZoom.panBy(viewBoxDelta.x, viewBoxDelta.y);
                lastPanPoint.current = {
                    x: e.clientX,
                    y: e.clientY
                };
                e.preventDefault();
            }
        },
        onMouseUp: function() {
            isPanning.current = false;
        },
        onMouseLeave: function() {
            isPanning.current = false;
        },
        onTouchStart: panZoom.handlers.onTouchStart,
        onTouchMove: function(e) {
            return panZoom.handlers.onTouchMove(e, screenDeltaToViewBox, dimensions.width, dimensions.height);
        },
        onTouchEnd: panZoom.handlers.onTouchEnd,
        onDoubleClick: handleDoubleClick,
        onWheel: handleWheel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: dimensions.width,
                height: dimensions.height,
                viewBox: viewBox,
                className: "absolute inset-0",
                style: {
                    touchAction: "none"
                },
                preserveAspectRatio: "xMidYMid meet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                            id: "grid",
                            width: "0.5",
                            height: "0.5",
                            patternUnits: "userSpaceOnUse",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M 0.5 0 L 0 0 0 0.5",
                                fill: "none",
                                stroke: "#1C1F26",
                                strokeWidth: "0.05"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "-2",
                        y: "-2",
                        width: "4",
                        height: "4",
                        fill: "url(#grid)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "-2",
                        y1: "0",
                        x2: "2",
                        y2: "0",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "0",
                        y1: "-2",
                        x2: "0",
                        y2: "2",
                        stroke: "#1C1F26",
                        strokeWidth: "0.1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 369,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "-1.9",
                        y: "0.15",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.xAxis.left
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "1.9",
                        y: "0.15",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "end",
                        className: "pointer-events-none",
                        children: axisLabels.xAxis.right
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "0.1",
                        y: "-1.9",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.yAxis.top
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "0.1",
                        y: "1.9",
                        fill: "#6B7280",
                        fontSize: "0.3",
                        textAnchor: "start",
                        className: "pointer-events-none",
                        children: axisLabels.yAxis.bottom
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this),
                    filteredConcepts.map(function(concept, index) {
                        var isSelected = (selectedConcept === null || selectedConcept === void 0 ? void 0 : selectedConcept.id) === concept.id;
                        var isHovered = (hoveredConcept === null || hoveredConcept === void 0 ? void 0 : hoveredConcept.id) === concept.id;
                        var color = concept.color || getCategoryColor(concept.category);
                        var radius = isSelected ? 0.15 : isHovered ? 0.12 : 0.1; // Scale radius for viewBox
                        var svgX = toSVGX(concept.x);
                        var svgY = toSVGY(concept.y);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: svgX,
                                    cy: svgY,
                                    r: radius,
                                    fill: color,
                                    stroke: isSelected ? "#fff" : isHovered ? color : "transparent",
                                    strokeWidth: isSelected ? 0.05 : 0.03,
                                    opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7,
                                    className: "cursor-pointer transition-all",
                                    onClick: function(e) {
                                        return handleConceptClick(concept, e);
                                    },
                                    onMouseEnter: function() {
                                        return setHoveredConcept(concept);
                                    },
                                    onMouseLeave: function() {
                                        return setHoveredConcept(null);
                                    },
                                    onTouchStart: function(e) {
                                        return handleConceptClick(concept, e);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 435,
                                    columnNumber: 15
                                }, _this),
                                (isSelected || isHovered) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: svgX,
                                    y: svgY - radius - 0.2,
                                    textAnchor: "middle",
                                    fill: "#E5E7EB",
                                    fontSize: "".concat(0.3 / panZoom.state.zoom),
                                    fontWeight: "500",
                                    className: "pointer-events-none",
                                    children: concept.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 451,
                                    columnNumber: 17
                                }, _this)
                            ]
                        }, concept.id, true, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 434,
                            columnNumber: 13
                        }, _this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 z-20 bg-bg-raised border-b border-border-subtle",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-2 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                    className: "w-4 h-4 text-text-muted"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold",
                                    children: "Categories"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: selectedCategories.size === 0 ? "default" : "outline",
                            size: "sm",
                            onClick: function() {
                                return setSelectedCategories(new Set());
                            },
                            className: "h-7 px-3 text-xs",
                            children: "All"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 476,
                            columnNumber: 11
                        }, this),
                        filterExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-wrap gap-2 max-h-32 overflow-y-auto",
                                    children: availableCategories.map(function(category) {
                                        var isSelected = selectedCategories.has(category);
                                        var color = getCategoryColor(category, categoryMap);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: function() {
                                                var newSet = new Set(selectedCategories);
                                                if (isSelected) {
                                                    newSet["delete"](category);
                                                } else {
                                                    newSet.add(category);
                                                }
                                                setSelectedCategories(newSet);
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1 rounded text-xs font-medium transition-all", isSelected ? "bg-accent text-accent-foreground border border-accent" : "bg-bg border border-border-subtle text-text-secondary hover:border-border hover:bg-bg-hover"),
                                            style: isSelected ? {
                                                borderColor: color
                                            } : {},
                                            children: category
                                        }, category, false, {
                                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                            lineNumber: 492,
                                            columnNumber: 21
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 487,
                                    columnNumber: 15
                                }, this),
                                selectedCategories.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-text-muted whitespace-nowrap",
                                    children: [
                                        filteredConcepts.length,
                                        " of ",
                                        concepts.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 517,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: function() {
                                return setFilterExpanded(!filterExpanded);
                            },
                            className: "h-7 px-2",
                            children: filterExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 530,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 530,
                                columnNumber: 59
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$concept$2d$matrix$2f$matrix$2d$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MatrixControls"], {
                    onZoomIn: panZoom.zoomIn,
                    onZoomOut: panZoom.zoomOut,
                    onReset: panZoom.reset,
                    onQuadrant: handleQuadrant
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 537,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            selectedConcept && mounted && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed z-[9999] pointer-events-auto",
                style: {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90vw',
                    maxHeight: '90vh'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "bg-bg-raised border-border-subtle p-4 min-w-[280px] max-w-[400px] shadow-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-base",
                                        children: selectedConcept.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 560,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "border-border-subtle text-xs",
                                        children: selectedConcept.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 559,
                                columnNumber: 15
                            }, this),
                            selectedConcept.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-[60vh] overflow-y-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-text-primary whitespace-pre-wrap break-words leading-relaxed",
                                    children: selectedConcept.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 567,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 566,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pt-2 border-t border-border-subtle",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: function() {
                                        return setSelectedConcept(null);
                                    },
                                    className: "text-xs",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                    lineNumber: 573,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                                lineNumber: 572,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                        lineNumber: 558,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                    lineNumber: 557,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 547,
                columnNumber: 9
            }, this), document.body),
            selectedConcept && mounted && typeof document !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm",
                onClick: function() {
                    return setSelectedConcept(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 590,
                columnNumber: 9
            }, this), document.body),
            selectedConcept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0",
                onClick: function() {
                    return setSelectedConcept(null);
                },
                onTouchStart: function() {
                    return setSelectedConcept(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
                lineNumber: 599,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/concept-matrix/concept-matrix.tsx",
        lineNumber: 301,
        columnNumber: 5
    }, this);
}
_s(ConceptMatrix, "wg7NNsXFNTZ3vdTNwHA/7pmf77k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$matrix$2f$panzoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePanZoom"]
    ];
});
_c = ConceptMatrix;
var _c;
__turbopack_context__.k.register(_c, "ConceptMatrix");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/centroid-game.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CentroidGame",
    ()=>CentroidGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
var GRID_SIZE = 17; // cells per axis
var CELL_SIZE = 20; // px per cell → 340px board
var BOARD_PX = GRID_SIZE * CELL_SIZE; // 340
var MAX_ROUNDS = 10;
var TIMER_PENALTY_THRESHOLD = 3; // seconds
function chebyshev(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}
function nearestInt(p) {
    return {
        x: Math.round(p.x),
        y: Math.round(p.y)
    };
}
function centroid(dots) {
    if (dots.length === 0) return {
        x: 0,
        y: 0
    };
    var sx = dots.reduce(function(s, d) {
        return s + d.x;
    }, 0);
    var sy = dots.reduce(function(s, d) {
        return s + d.y;
    }, 0);
    return {
        x: sx / dots.length,
        y: sy / dots.length
    };
}
function useInterval(callback, delayMs) {
    _s();
    var savedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(callback);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": function() {
            savedRef.current = callback;
        }
    }["useInterval.useEffect"], [
        callback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": function() {
            if (delayMs == null) return;
            var id = setInterval({
                "useInterval.useEffect.id": function() {
                    return savedRef.current();
                }
            }["useInterval.useEffect.id"], delayMs);
            return ({
                "useInterval.useEffect": function() {
                    return clearInterval(id);
                }
            })["useInterval.useEffect"];
        }
    }["useInterval.useEffect"], [
        delayMs
    ]);
}
_s(useInterval, "w5A6FRbWPY8OWfdgwNZfZKbZH74=");
var CentroidGame = function(param) {
    var onClose = param.onClose;
    _s1();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), round = _useState[0], setRound = _useState[1]; // 0..MAX_ROUNDS
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), dots = _useState1[0], setDots = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), actual = _useState2[0], setActual = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), guess = _useState3[0], setGuess = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showResult = _useState4[0], setShowResult = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), totalScore = _useState5[0], setTotalScore = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), currentRoundScore = _useState6[0], setCurrentRoundScore = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), timer = _useState7[0], setTimer = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), penalty = _useState8[0], setPenalty = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle'), 2), phase = _useState9[0], setPhase = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), pointsFlash = _useState10[0], setPointsFlash = _useState10[1];
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), roundHistory = _useState11[0], setRoundHistory = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), recapMessage = _useState12[0], setRecapMessage = _useState12[1];
    var validatedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    var timeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    var difficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[difficulty]": function() {
            if (round <= 3) return {
                name: 'EASY',
                min: 3,
                max: 8
            };
            if (round <= 7) return {
                name: 'MEDIUM',
                min: 5,
                max: 10
            };
            return {
                name: 'HARD',
                min: 7,
                max: 12
            };
        }
    }["CentroidGame.useMemo[difficulty]"], [
        round
    ]);
    var startRound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CentroidGame.useCallback[startRound]": function(nextRound) {
            // generate dots
            var n = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
            var used = new Set();
            var nd = [];
            while(nd.length < n){
                var x = Math.floor(Math.random() * GRID_SIZE);
                var y = Math.floor(Math.random() * GRID_SIZE);
                var key = "".concat(x, ",").concat(y);
                if (!used.has(key)) {
                    used.add(key);
                    nd.push({
                        x: x,
                        y: y
                    });
                }
            }
            var c = centroid(nd);
            setDots(nd);
            setActual(c);
            setGuess(null);
            setShowResult(false);
            setCurrentRoundScore(null);
            setTimer(0);
            setPenalty(0);
            setRound(nextRound);
            setPhase('playing');
            validatedRef.current = false;
        }
    }["CentroidGame.useCallback[startRound]"], [
        difficulty
    ]);
    var clearAllTimeouts = function() {
        timeoutsRef.current.forEach(function(id) {
            return clearTimeout(id);
        });
        timeoutsRef.current = [];
    };
    var schedule = function(fn, ms) {
        var id = window.setTimeout(fn, ms);
        timeoutsRef.current.push(id);
        return id;
    };
    var hardReset = function() {
        clearAllTimeouts();
        setRound(0);
        setDots([]);
        setActual(null);
        setGuess(null);
        setShowResult(false);
        setTotalScore(0);
        setCurrentRoundScore(null);
        setTimer(0);
        setPenalty(0);
        setRoundHistory([]);
        setRecapMessage(null);
        validatedRef.current = false;
    };
    var begin = function() {
        hardReset();
        setPhase('count');
        schedule(function() {
            return setPhase('go');
        }, 500);
        schedule(function() {
            return startRound(1);
        }, 1000);
    };
    // timer + penalty
    useInterval({
        "CentroidGame.useInterval": function() {
            if (phase === 'playing' && !showResult) {
                setTimer({
                    "CentroidGame.useInterval": function(t) {
                        var nt = t + 1;
                        if (nt > TIMER_PENALTY_THRESHOLD) setPenalty({
                            "CentroidGame.useInterval": function(p) {
                                return p + 1;
                            }
                        }["CentroidGame.useInterval"]);
                        return nt;
                    }
                }["CentroidGame.useInterval"]);
            }
        }
    }["CentroidGame.useInterval"], phase === 'playing' && !showResult ? 1000 : null);
    var onCellClick = function(x, y) {
        if (phase !== 'playing' || showResult) return;
        var ng = {
            x: x,
            y: y
        };
        if (guess && ng.x === guess.x && ng.y === guess.y) {
            validate();
        } else {
            setGuess(ng);
        }
    };
    var validate = function() {
        if (!guess || !actual) return;
        if (validatedRef.current) return; // guard double-submit
        validatedRef.current = true;
        var optimal = nearestInt(actual);
        var dist = chebyshev(guess, optimal);
        var score = dist + penalty;
        setCurrentRoundScore(score);
        setTotalScore(function(s) {
            return s + score;
        });
        var perfect = dist === 0;
        setRoundHistory(function(h) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(h).concat([
                {
                    round: round,
                    score: score,
                    timer: timer,
                    perfect: perfect
                }
            ]);
        });
        setShowResult(true);
        setPhase('downtime');
        // flash points for ~1s then advance
        setPointsFlash(score === 0 ? '✨0✨' : String(score));
        schedule(function() {
            setPointsFlash(null);
            var next = round + 1;
            if (next <= MAX_ROUNDS) {
                schedule(function() {
                    return startRound(next);
                }, 200); // tiny pause
            } else {
                var final = roundHistory.reduce(function(s, r) {
                    return s + r.score;
                }, 0) + score;
                var msg = getRecapMessage(final);
                setTotalScore(final);
                setRecapMessage(msg);
                setPhase('recap');
            }
        }, 1000);
    };
    // rendering helpers
    var renderGridCells = function() {
        var _loop = function(y) {
            var _loop = function(x) {
                var isDot = dots.some(function(d) {
                    return d.x === x && d.y === y;
                });
                var isGuess = guess && guess.x === x && guess.y === y;
                var isOptimal = showResult && actual && Math.round(actual.x) === x && Math.round(actual.y) === y;
                var bg = 'transparent';
                if (isGuess) bg = showResult ? 'bg-red-500' : 'bg-orange-500';
                else if (isOptimal) bg = 'bg-green-500';
                else if (isDot) bg = 'bg-blue-500';
                cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: function() {
                        return onCellClick(x, y);
                    },
                    className: "w-5 h-5 border border-white/10 ".concat(bg, " ").concat(phase === 'playing' && !showResult ? 'cursor-pointer hover:opacity-80' : '')
                }, "".concat(x, "-").concat(y), false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, _this));
            };
            for(var x = 0; x < GRID_SIZE; x++)_loop(x);
        };
        var cells = [];
        for(var y = 0; y < GRID_SIZE; y++)_loop(y);
        return cells;
    };
    var vectorsOverlay = function() {
        if (!showResult || !actual) return null;
        var optimal = nearestInt(actual);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: BOARD_PX,
            height: BOARD_PX,
            className: "absolute top-0 left-0 pointer-events-none",
            children: dots.map(function(d, i) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: d.x * CELL_SIZE + CELL_SIZE / 2,
                    y1: d.y * CELL_SIZE + CELL_SIZE / 2,
                    x2: optimal.x * CELL_SIZE + CELL_SIZE / 2,
                    y2: optimal.y * CELL_SIZE + CELL_SIZE / 2,
                    stroke: "#66bb6a",
                    strokeWidth: 2,
                    opacity: 0.6
                }, i, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, _this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, _this);
    };
    // Messages
    var messagesAbove25 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messagesAbove25]": function() {
            return [
                "Nice try, but you've got more in you! Push it!",
                "Not bad, champ—now show us your best!",
                "Solid effort, but you're just warming up! Go harder!",
                "That's a start, now crank it up a notch!",
                "Pretty good, but you're capable of greatness! Dig in!",
                "Decent move, but you've got bigger plays to make!",
                "Not too shabby, but let's see your A-game!",
                "You're getting there—now unleash the beast!",
                "Good hustle, but you're not at your peak yet!",
                "That's the spirit, now take it to the next level!"
            ];
        }
    }["CentroidGame.useMemo[messagesAbove25]"], []);
    var messages10to25 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages10to25]": function() {
            return [
                'Amazing work! You\'ve mastered the centroid challenge!',
                'Outstanding performance! Your spatial reasoning is top-notch!',
                'Brilliant! You\'ve conquered the centroid matrix!',
                'Fantastic! You\'ve aced the centroid game!',
                'Spectacular! Your geometric intuition is incredible!'
            ];
        }
    }["CentroidGame.useMemo[messages10to25]"], []);
    var messages8to9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages8to9]": function() {
            return [
                'Single digit! Impressive!',
                'So close to perfection—keep pushing!',
                'Excellent intuition.'
            ];
        }
    }["CentroidGame.useMemo[messages8to9]"], []);
    var messages7andBelow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[messages7andBelow]": function() {
            return [
                'Unreal! You beat the creator!',
                'Legendary performance!',
                'Phenomenal accuracy!'
            ];
        }
    }["CentroidGame.useMemo[messages7andBelow]"], []);
    var getRecapMessage = function(finalScore) {
        if (finalScore > 25) return messagesAbove25[Math.floor(Math.random() * messagesAbove25.length)];
        if (finalScore >= 10) return messages10to25[Math.floor(Math.random() * messages10to25.length)];
        if (finalScore >= 8) return messages8to9[Math.floor(Math.random() * messages8to9.length)];
        return messages7andBelow[Math.floor(Math.random() * messages7andBelow.length)];
    };
    var averageScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[averageScore]": function() {
            return roundHistory.length ? (roundHistory.reduce({
                "CentroidGame.useMemo[averageScore]": function(s, r) {
                    return s + r.score;
                }
            }["CentroidGame.useMemo[averageScore]"], 0) / roundHistory.length).toFixed(1) : '0.0';
        }
    }["CentroidGame.useMemo[averageScore]"], [
        roundHistory
    ]);
    var averageTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[averageTime]": function() {
            return roundHistory.length ? (roundHistory.reduce({
                "CentroidGame.useMemo[averageTime]": function(s, r) {
                    return s + r.timer;
                }
            }["CentroidGame.useMemo[averageTime]"], 0) / roundHistory.length).toFixed(1) : '0.0';
        }
    }["CentroidGame.useMemo[averageTime]"], [
        roundHistory
    ]);
    var perfectCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CentroidGame.useMemo[perfectCount]": function() {
            return roundHistory.filter({
                "CentroidGame.useMemo[perfectCount]": function(r) {
                    return r.perfect;
                }
            }["CentroidGame.useMemo[perfectCount]"]).length;
        }
    }["CentroidGame.useMemo[perfectCount]"], [
        roundHistory
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CentroidGame.useEffect": function() {
            return ({
                "CentroidGame.useEffect": function() {
                    clearAllTimeouts();
                }
            })["CentroidGame.useEffect"];
        }
    }["CentroidGame.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex flex-col items-center justify-center text-white py-4 px-4 font-mono",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-[380px]",
            children: [
                onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-0 left-0 z-50 p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                    "aria-label": "close",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mt-4 mb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold tracking-wider",
                            children: "Centroid (x̄, ȳ) – GRID FAST"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm opacity-70 tracking-wider",
                            children: "10 rounds – Lowest score wins"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, _this),
                phase !== 'idle' && phase !== 'recap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center px-1 mb-2 text-sm tracking-wider",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "R",
                                Math.min(round, MAX_ROUNDS),
                                "/",
                                MAX_ROUNDS
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: timer <= TIMER_PENALTY_THRESHOLD ? 'text-green-500' : 'text-red-500',
                                    children: "0:".concat(String(timer).padStart(2, '0'))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, _this),
                                penalty > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-500",
                                    children: [
                                        "+",
                                        penalty
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 301,
                                    columnNumber: 31
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 296,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: difficulty.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 294,
                    columnNumber: 11
                }, _this),
                phase === 'idle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto p-4 rounded-lg bg-black/35 border border-white/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg mb-2",
                            children: "How it works"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-2 opacity-85",
                            children: "Estimate the centroid (center of mass) of the blue squares. Click a cell to place your guess, then press VALIDATE (or double-click). Lower total is better. Perfect Guess = 0"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, _this),
                        function() {
                            var SAMPLE_GRID = 11;
                            var SAMPLE_CELL = 14;
                            var SAMPLE_PX = SAMPLE_GRID * SAMPLE_CELL;
                            var sampleDots = [
                                {
                                    x: 2,
                                    y: 2
                                },
                                {
                                    x: 3,
                                    y: 7
                                },
                                {
                                    x: 5,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 2
                                },
                                {
                                    x: 8,
                                    y: 8
                                },
                                {
                                    x: 2,
                                    y: 9
                                }
                            ];
                            var sActual = centroid(sampleDots);
                            var sOptimal = nearestInt(sActual);
                            var sGuess = {
                                x: Math.min(SAMPLE_GRID - 1, sOptimal.x + 1),
                                y: sOptimal.y
                            };
                            var renderSampleCells = function() {
                                var _loop = function(y) {
                                    var _loop = function(x) {
                                        var isDot = sampleDots.some(function(d) {
                                            return d.x === x && d.y === y;
                                        });
                                        var isGuess = sGuess && sGuess.x === x && sGuess.y === y;
                                        var isOptimal = Math.round(sActual.x) === x && Math.round(sActual.y) === y;
                                        var bg = 'transparent';
                                        if (isGuess) bg = 'bg-red-500';
                                        else if (isOptimal) bg = 'bg-green-500';
                                        else if (isDot) bg = 'bg-blue-500';
                                        cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-3.5 h-3.5 border border-white/10 ".concat(bg)
                                        }, "".concat(x, "-").concat(y), false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 335,
                                            columnNumber: 23
                                        }, _this));
                                    };
                                    for(var x = 0; x < SAMPLE_GRID; x++)_loop(x);
                                };
                                var cells = [];
                                for(var y = 0; y < SAMPLE_GRID; y++)_loop(y);
                                return cells;
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-[154px] h-[154px] grid grid-cols-11 grid-rows-11 bg-bg rounded overflow-hidden",
                                        children: [
                                            renderSampleCells(),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: SAMPLE_PX,
                                                height: SAMPLE_PX,
                                                className: "absolute inset-0 pointer-events-none",
                                                children: sampleDots.map(function(d, i) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: d.x * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        y1: d.y * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        x2: sOptimal.x * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        y2: sOptimal.y * SAMPLE_CELL + SAMPLE_CELL / 2,
                                                        stroke: "#66bb6a",
                                                        strokeWidth: 2,
                                                        opacity: 0.6
                                                    }, i, false, {
                                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 25
                                                    }, _this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 345,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                        lineNumber: 343,
                                        columnNumber: 19
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: "Blue = dots"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 361,
                                                columnNumber: 21
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-green-400",
                                                children: "Green = true centroid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 362,
                                                columnNumber: 21
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-red-400",
                                                children: "Red = your guess"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                lineNumber: 363,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                        lineNumber: 360,
                                        columnNumber: 19
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 342,
                                columnNumber: 17
                            }, _this);
                        }()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 309,
                    columnNumber: 11
                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[340px] h-[340px] mx-auto relative rounded-lg overflow-hidden border border-white/10",
                    children: [
                        phase === 'count' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/50 flex items-center justify-center z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl",
                                children: "Round 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 374,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 373,
                            columnNumber: 15
                        }, _this),
                        phase === 'go' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/50 flex items-center justify-center z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl",
                                children: "GO!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 379,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 378,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-bg",
                            style: {
                                display: 'grid',
                                gridTemplateColumns: "repeat(".concat(GRID_SIZE, ", ").concat(CELL_SIZE, "px)"),
                                gridTemplateRows: "repeat(".concat(GRID_SIZE, ", ").concat(CELL_SIZE, "px)")
                            },
                            children: renderGridCells()
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 384,
                            columnNumber: 13
                        }, _this),
                        vectorsOverlay(),
                        phase === 'downtime' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 388,
                            columnNumber: 38
                        }, _this),
                        pointsFlash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-1/2 -translate-x-1/2 z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-3xl text-red-500 drop-shadow-lg",
                                children: pointsFlash
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                lineNumber: 391,
                                columnNumber: 17
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 390,
                            columnNumber: 15
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 370,
                    columnNumber: 11
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-full",
                        size: "lg",
                        variant: phase === 'idle' ? 'default' : guess && !showResult ? 'default' : 'outline',
                        disabled: phase !== 'idle' && (phase !== 'playing' || showResult || !guess),
                        onClick: function() {
                            if (phase === 'idle') begin();
                            else if (phase === 'playing' && guess && !showResult) validate();
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                phase === 'idle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 35
                                }, _this) : guess && !showResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 91
                                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 410,
                                    columnNumber: 123
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tracking-wider",
                                            children: phase === 'idle' ? 'START Game' : phase === 'playing' && guess && !showResult ? 'VALIDATE' : 'PLACE'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 412,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs opacity-80 leading-none tracking-wider",
                                            children: "x̄ = (1/n) Σ xᵢ    ȳ = (1/n) Σ yᵢ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, _this),
                phase === 'recap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/55"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 426,
                            columnNumber: 13
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,420px)] max-h-[80vh] overflow-y-auto text-center bg-bg text-text-primary p-4 rounded-lg shadow-xl font-mono tracking-wider",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mb-2 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            onClick: function() {
                                                hardReset();
                                                setPhase('idle');
                                            },
                                            children: "Play Again"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: function() {
                                                setPhase('idle');
                                                onClose === null || onClose === void 0 ? void 0 : onClose();
                                            },
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-2",
                                    children: recapMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 432,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg mb-2",
                                    children: [
                                        "Final Score: ",
                                        totalScore,
                                        " points"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-left mx-auto max-w-[360px] text-xs py-1",
                                    children: roundHistory.map(function(r, idx) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between py-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Round ",
                                                        r.round,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 21
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        r.score,
                                                        " pts ",
                                                        r.perfect ? '✨' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 21
                                                }, _this)
                                            ]
                                        }, "".concat(r.round, "-").concat(idx), true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 436,
                                            columnNumber: 19
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 434,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mt-2 text-xs text-text-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Perfect rounds: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: perfectCount
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 39
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 443,
                                            columnNumber: 17
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Average score: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: averageScore
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 38
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-xs text-text-muted",
                                    children: [
                                        "Avg time per round: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                averageTime,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 446,
                                            columnNumber: 81
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 h-24 flex items-end gap-1 mx-auto max-w-[360px]",
                                    children: Array.from({
                                        length: 10
                                    }, function(_, i) {
                                        var count = roundHistory.filter(function(r) {
                                            return i < 9 ? r.score === i : r.score >= 9;
                                        }).length;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col-reverse items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 bg-accent rounded-sm",
                                                    style: {
                                                        height: count * 10
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 23
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs mt-1",
                                                    children: i === 9 ? '9+' : i
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 23
                                                }, _this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                            lineNumber: 452,
                                            columnNumber: 21
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                                    lineNumber: 448,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                            lineNumber: 427,
                            columnNumber: 13
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/centroid-game.tsx",
                    lineNumber: 425,
                    columnNumber: 11
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/games/centroid-game.tsx",
            lineNumber: 274,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/games/centroid-game.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, _this);
};
_s1(CentroidGame, "Y2rxzi9l60kiWoztMS3C5cjgwNo=", false, function() {
    return [
        useInterval
    ];
});
_c = CentroidGame;
var _c;
__turbopack_context__.k.register(_c, "CentroidGame");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFullscreen",
    ()=>useFullscreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
function useFullscreen(targetRef) {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), isFullscreen = _useState[0], setIsFullscreen = _useState[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFullscreen.useEffect": function() {
            var onChange = {
                "useFullscreen.useEffect.onChange": function() {
                    setIsFullscreen(Boolean(document.fullscreenElement));
                }
            }["useFullscreen.useEffect.onChange"];
            document.addEventListener('fullscreenchange', onChange);
            return ({
                "useFullscreen.useEffect": function() {
                    return document.removeEventListener('fullscreenchange', onChange);
                }
            })["useFullscreen.useEffect"];
        }
    }["useFullscreen.useEffect"], []);
    var enter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[enter]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[enter]": function() {
                    var _targetRef_current, el, e;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[enter]": function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        3,
                                        ,
                                        4
                                    ]);
                                    el = (_targetRef_current = targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) !== null && _targetRef_current !== void 0 ? _targetRef_current : document.documentElement;
                                    if (!(!document.fullscreenElement && (el === null || el === void 0 ? void 0 : el.requestFullscreen))) return [
                                        3,
                                        2
                                    ];
                                    return [
                                        4,
                                        el.requestFullscreen()
                                    ];
                                case 1:
                                    _state.sent();
                                    _state.label = 2;
                                case 2:
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    e = _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        }
                    }["useFullscreen.useCallback[enter]"]);
                }
            }["useFullscreen.useCallback[enter]"])();
        }
    }["useFullscreen.useCallback[enter]"], [
        targetRef
    ]);
    var exit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[exit]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[exit]": function() {
                    var e;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[exit]": function(_state) {
                            switch(_state.label){
                                case 0:
                                    _state.trys.push([
                                        0,
                                        3,
                                        ,
                                        4
                                    ]);
                                    if (!document.fullscreenElement) return [
                                        3,
                                        2
                                    ];
                                    return [
                                        4,
                                        document.exitFullscreen()
                                    ];
                                case 1:
                                    _state.sent();
                                    _state.label = 2;
                                case 2:
                                    return [
                                        3,
                                        4
                                    ];
                                case 3:
                                    e = _state.sent();
                                    return [
                                        3,
                                        4
                                    ];
                                case 4:
                                    return [
                                        2
                                    ];
                            }
                        }
                    }["useFullscreen.useCallback[exit]"]);
                }
            }["useFullscreen.useCallback[exit]"])();
        }
    }["useFullscreen.useCallback[exit]"], []);
    var toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFullscreen.useCallback[toggle]": function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                "useFullscreen.useCallback[toggle]": function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                        "useFullscreen.useCallback[toggle]": function(_state) {
                            if (document.fullscreenElement) return [
                                2,
                                exit()
                            ];
                            return [
                                2,
                                enter()
                            ];
                        }
                    }["useFullscreen.useCallback[toggle]"]);
                }
            }["useFullscreen.useCallback[toggle]"])();
        }
    }["useFullscreen.useCallback[toggle]"], [
        enter,
        exit
    ]);
    return {
        isFullscreen: isFullscreen,
        enterFullscreen: enter,
        exitFullscreen: exit,
        toggleFullscreen: toggle
    };
}
_s(useFullscreen, "endHJi3EJEY5qCIZZAEwUy1bCz4=");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/memory-game.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemoryGame",
    ()=>MemoryGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFullscreen.ts [app-client] (ecmascript)");
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Constants
var TOTAL_IMAGES = 160;
var PAIRS = 8; // fixed – 16 cards, 4x4 grid
var CARD_RATIO = 597 / 440; // height / width
// Helpers
function padId(n) {
    return n.toString().padStart(3, '0');
}
function imageUrl(id, ext) {
    return "/images/memory/".concat(ext, "/").concat(id, ".").concat(ext);
}
var BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
function shuffle(arr) {
    var a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr);
    for(var i = a.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var ref;
        ref = [
            a[j],
            a[i]
        ], a[i] = ref[0], a[j] = ref[1], ref;
    }
    return a;
}
var MemoryGame = function(param) {
    var onClose = param.onClose;
    _s();
    // Layout sizing
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(100), 2), cardWidth = _useState[0], setCardWidth = _useState[1];
    // Game state
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), deck = _useState1[0], setDeck = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), flippedUids = _useState2[0], setFlippedUids = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), matchedPairs = _useState3[0], setMatchedPairs = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), moves = _useState4[0], setMoves = _useState4[1];
    var busyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Timer state (seconds only)
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), elapsedSec = _useState5[0], setElapsedSec = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), timerRunning = _useState6[0], setTimerRunning = _useState6[1];
    var timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Reveal/shuffle phase
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('play'), 2), phase = _useState7[0], setPhase = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()), 2), revealFront = _useState8[0], setRevealFront = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showShuffle = _useState9[0], setShowShuffle = _useState9[1];
    var timeoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), showIntro = _useState10[0], setShowIntro = _useState10[1];
    // Fly overlay for shuffle animation
    var cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), flyVisible = _useState11[0], setFlyVisible = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), flyCards = _useState12[0], setFlyCards = _useState12[1];
    var containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _useFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"])(containerRef), isFullscreen = _useFullscreen.isFullscreen, toggleFullscreen = _useFullscreen.toggleFullscreen;
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            return ({
                "MemoryGame.useEffect": function() {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    timeoutsRef.current.forEach({
                        "MemoryGame.useEffect": function(id) {
                            return clearTimeout(id);
                        }
                    }["MemoryGame.useEffect"]);
                }
            })["MemoryGame.useEffect"];
        }
    }["MemoryGame.useEffect"], []);
    // Compute 4x4 cell size to avoid scrollbars
    var computeSize = function() {
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var cols = 4;
        var rows = 4;
        var gap = 10;
        var sidePad = 16;
        var topReserve = 72; // header row
        var w = Math.floor((vw - sidePad * 2 - gap * (cols - 1)) / cols);
        var h = Math.floor(w * CARD_RATIO);
        while(rows * h + gap * (rows - 1) > vh - topReserve && w > 60){
            w -= 1;
            h = Math.floor(w * CARD_RATIO);
        }
        setCardWidth(w);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            computeSize();
            window.addEventListener('resize', computeSize);
            return ({
                "MemoryGame.useEffect": function() {
                    return window.removeEventListener('resize', computeSize);
                }
            })["MemoryGame.useEffect"];
        }
    }["MemoryGame.useEffect"], []);
    // Build a new deck of 8 random pairs
    var clearAllTimeouts = function() {
        timeoutsRef.current.forEach(function(id) {
            return window.clearTimeout(id);
        });
        timeoutsRef.current = [];
    };
    var newGame = function() {
        var _loop = function(k) {
            var id = window.setTimeout(function() {
                setRevealFront(function(prev) {
                    var next = new Set(prev);
                    var c1 = revealDeck[k * 2];
                    var c2 = revealDeck[k * 2 + 1];
                    if (c1) next.add(c1.uid);
                    if (c2) next.add(c2.uid);
                    return next;
                });
            }, PER_PAIR_MS * k);
            timeoutsRef.current.push(id);
        };
        clearAllTimeouts();
        var pairs = shuffle(Array.from({
            length: TOTAL_IMAGES / 2
        }, function(_, i) {
            return i + 1;
        })).slice(0, PAIRS);
        var cards = [];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = pairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var p = _step.value;
                var a = padId(2 * p - 1), b = padId(2 * p);
                cards.push({
                    imageId: a,
                    pairId: p,
                    uid: "".concat(a, "-A")
                });
                cards.push({
                    imageId: b,
                    pairId: p,
                    uid: "".concat(b, "-B")
                });
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        // For reveal: two-by-two side-by-side order
        var revealDeck = [];
        for(var i = 0; i < cards.length; i += 2){
            revealDeck.push(cards[i], cards[i + 1]);
        }
        var finalDeck = shuffle(revealDeck);
        setDeck(revealDeck);
        setFlippedUids([]);
        setMatchedPairs(new Set());
        setMoves(0);
        busyRef.current = false;
        // Reset timer
        setElapsedSec(0);
        setTimerRunning(false);
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
        // Run reveal animation (0.75s per pair)
        busyRef.current = true;
        setPhase('reveal');
        setRevealFront(new Set());
        var PER_PAIR_MS = 750;
        for(var k = 0; k < PAIRS; k++)_loop(k);
        var holdId = window.setTimeout(function() {
            return setPhase('hold');
        }, PER_PAIR_MS * PAIRS);
        timeoutsRef.current.push(holdId);
        var shuffleStartId = window.setTimeout(function() {
            setRevealFront(new Set());
            setPhase('shuffle');
            // Step A: measure current positions
            var initialPositions = revealDeck.map(function(c) {
                var el = cardRefs.current[c.uid];
                var r = el ? el.getBoundingClientRect() : {
                    left: window.innerWidth / 2,
                    top: window.innerHeight / 2
                };
                return {
                    uid: c.uid,
                    left: r.left,
                    top: r.top
                };
            });
            setFlyCards(initialPositions);
            setFlyVisible(true);
            // Step B: move all to center
            var centerLeft = Math.round(window.innerWidth / 2 - cardWidth / 2);
            var centerTop = Math.round(window.innerHeight * 0.35 - Math.floor(cardWidth * CARD_RATIO) / 2);
            var toCenterId = window.setTimeout(function() {
                setFlyCards(function(prev) {
                    return prev.map(function(fc) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, fc), {
                            left: centerLeft,
                            top: centerTop
                        });
                    });
                });
            }, 20);
            timeoutsRef.current.push(toCenterId);
            // Step C: apply shuffled deck and measure target positions
            var applyShuffleId = window.setTimeout(function() {
                setDeck(finalDeck);
                // wait next frame for DOM
                var measureTargetsId = window.setTimeout(function() {
                    var targets = finalDeck.map(function(c) {
                        var el = cardRefs.current[c.uid];
                        var r = el ? el.getBoundingClientRect() : {
                            left: centerLeft,
                            top: centerTop
                        };
                        return {
                            uid: c.uid,
                            left: r.left,
                            top: r.top
                        };
                    });
                    // Step D: fly from center to targets
                    setFlyCards(function(prev) {
                        return prev.map(function(fc, i) {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, fc), {
                                left: targets[i].left,
                                top: targets[i].top
                            });
                        });
                    });
                    // Step E: end overlay
                    var endId = window.setTimeout(function() {
                        setFlyVisible(false);
                        setPhase('play');
                        busyRef.current = false;
                    }, 650);
                    timeoutsRef.current.push(endId);
                }, 40);
                timeoutsRef.current.push(measureTargetsId);
            }, 600);
            timeoutsRef.current.push(applyShuffleId);
        }, PER_PAIR_MS * PAIRS + 750);
        timeoutsRef.current.push(shuffleStartId);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MemoryGame.useEffect": function() {
            newGame();
        }
    }["MemoryGame.useEffect"], []);
    var onCardClick = function(c) {
        if (busyRef.current) return;
        if (matchedPairs.has(c.pairId)) return;
        if (flippedUids.includes(c.uid)) return;
        // Start timer on first interaction
        if (!timerRunning) {
            setTimerRunning(true);
            if (!timerRef.current) {
                timerRef.current = window.setInterval(function() {
                    return setElapsedSec(function(s) {
                        return s + 1;
                    });
                }, 1000);
            }
        }
        var next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(flippedUids).concat([
            c.uid
        ]);
        setFlippedUids(next);
        if (next.length === 2) {
            busyRef.current = true;
            setMoves(function(m) {
                return m + 1;
            });
            var _next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(next, 2), u1 = _next[0], u2 = _next[1];
            var c1 = deck.find(function(d) {
                return d.uid === u1;
            });
            var c2 = deck.find(function(d) {
                return d.uid === u2;
            });
            var isMatch = c1.pairId === c2.pairId;
            setTimeout(function() {
                if (isMatch) {
                    var s = new Set(matchedPairs);
                    s.add(c1.pairId);
                    setMatchedPairs(s);
                }
                setFlippedUids([]);
                busyRef.current = false;
                // Stop timer when all pairs matched
                setTimeout(function() {
                    if (matchedPairs.size + (isMatch ? 1 : 0) === PAIRS) {
                        setTimerRunning(false);
                        if (timerRef.current) {
                            window.clearInterval(timerRef.current);
                            timerRef.current = null;
                        }
                    }
                }, 0);
            }, isMatch ? 350 : 650);
        }
    };
    var cardHeight = Math.floor(cardWidth * CARD_RATIO);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full min-h-[600px] p-1 flex flex-col bg-bg text-white rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-1 min-h-[40px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleFullscreen,
                                className: "p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                                "aria-label": isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen',
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 235,
                                    columnNumber: 29
                                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 235,
                                    columnNumber: 65
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, _this),
                            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-2 bg-black/35 hover:bg-black/50 rounded text-white",
                                "aria-label": "close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-text-muted font-mono tracking-wider",
                                children: "Jiu-Jitsu Jungle Memory Game"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono tracking-wider",
                                children: [
                                    "Time: ",
                                    String(Math.floor(elapsedSec / 60)).padStart(2, '0'),
                                    ":",
                                    String(elapsedSec % 60).padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-mono tracking-wider",
                                children: [
                                    "Moves: ",
                                    moves
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                onClick: newGame,
                                className: "font-mono tracking-wider",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "w-4 h-4 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, _this),
                                    "New Game"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-4 gap-2.5 justify-items-center content-start relative",
                children: [
                    deck.map(function(card) {
                        var isFlipped = flippedUids.includes(card.uid) || matchedPairs.has(card.pairId);
                        if (phase !== 'play') isFlipped = revealFront.has(card.uid);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: function(el) {
                                cardRefs.current[card.uid] = el;
                            },
                            "data-uid": card.uid,
                            onClick: function() {
                                return onCardClick(card);
                            },
                            className: "rounded-xl overflow-hidden shadow-lg relative cursor-pointer bg-bg",
                            style: {
                                width: cardWidth,
                                height: cardHeight
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 transition-transform duration-280 ease-in-out",
                                    style: {
                                        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                                        backfaceVisibility: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                srcSet: imageUrl(card.imageId, 'avif'),
                                                type: "image/avif"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                srcSet: imageUrl(card.imageId, 'webp'),
                                                type: "image/webp"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: imageUrl(card.imageId, 'webp'),
                                                alt: card.imageId,
                                                width: 440,
                                                height: 597,
                                                loading: "lazy",
                                                className: "w-full h-full object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                                lineNumber: 280,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 transition-transform duration-280 ease-in-out",
                                    style: {
                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                        backfaceVisibility: 'hidden'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: BACK_URL,
                                        alt: "back",
                                        width: 440,
                                        height: 597,
                                        loading: "lazy",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, card.uid, true, {
                            fileName: "[project]/src/components/modules/games/memory-game.tsx",
                            lineNumber: 265,
                            columnNumber: 13
                        }, _this);
                    }),
                    phase === 'shuffle' && flyVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/85 z-30 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, _this),
                    flyVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-40 pointer-events-none",
                        children: flyCards.map(function(fc) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute rounded-xl overflow-hidden shadow-lg transition-all duration-600 ease-in-out",
                                style: {
                                    left: fc.left,
                                    top: fc.top,
                                    width: cardWidth,
                                    height: cardHeight
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: BACK_URL,
                                    alt: "back",
                                    width: 440,
                                    height: 597,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, _this)
                            }, "fly-".concat(fc.uid), false, {
                                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, _this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, _this),
            showIntro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: function() {
                    return setShowIntro(false);
                },
                className: "fixed inset-0 z-50 bg-black/65 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-[70vw] sm:w-[360px] max-w-[420px] aspect-[440/597] rounded-xl overflow-hidden shadow-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: BACK_URL,
                        alt: "back",
                        width: 440,
                        height: 597,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/memory-game.tsx",
                        lineNumber: 336,
                        columnNumber: 13
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/memory-game.tsx",
                    lineNumber: 335,
                    columnNumber: 11
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/memory-game.tsx",
                lineNumber: 331,
                columnNumber: 9
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/games/memory-game.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, _this);
};
_s(MemoryGame, "L0O24fZwZ838TC/HHwLccyXsYNY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFullscreen$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFullscreen"]
    ];
});
_c = MemoryGame;
var _c;
__turbopack_context__.k.register(_c, "MemoryGame");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/games/games-hub.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GamesHub",
    ()=>GamesHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$centroid$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/games/centroid-game.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$memory$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/games/memory-game.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
var GamesHub = function(param) {
    var onExit = param.onExit, _param_initial = param.initial, initial = _param_initial === void 0 ? 'none' : _param_initial;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial), 2), selected = _useState[0], setSelected = _useState[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GamesHub.useEffect": function() {
            setSelected(initial);
        }
    }["GamesHub.useEffect"], [
        initial
    ]);
    if (selected === 'centroid') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$centroid$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CentroidGame"], {
                onClose: function() {
                    return setSelected('none');
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, _this);
    }
    if (selected === 'memory') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$games$2f$memory$2d$game$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryGame"], {
                onClose: function() {
                    return setSelected('none');
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, _this);
    }
    var renderCentroidPreview = function() {
        var _loop = function(y) {
            var _loop = function(x) {
                var isDot = sampleDots.some(function(d) {
                    return d.x === x && d.y === y;
                });
                var isGuess = guess.x === x && guess.y === y;
                var isOptimal = Math.round(actual.x) === x && Math.round(actual.y) === y;
                var bg = 'transparent';
                if (isGuess) bg = 'bg-red-500';
                else if (isOptimal) bg = 'bg-green-500';
                else if (isDot) bg = 'bg-blue-500';
                cells.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-white/10 ".concat(bg)
                }, "".concat(x, "-").concat(y), false, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 62,
                    columnNumber: 11
                }, _this));
            };
            for(var x = 0; x < GRID; x++)_loop(x);
        };
        var GRID = 11;
        var sampleDots = [
            {
                x: 2,
                y: 2
            },
            {
                x: 3,
                y: 7
            },
            {
                x: 5,
                y: 4
            },
            {
                x: 7,
                y: 2
            },
            {
                x: 8,
                y: 8
            },
            {
                x: 2,
                y: 9
            }
        ];
        var centroid = function(pts) {
            var sx = pts.reduce(function(s, p) {
                return s + p.x;
            }, 0);
            var sy = pts.reduce(function(s, p) {
                return s + p.y;
            }, 0);
            return {
                x: sx / pts.length,
                y: sy / pts.length
            };
        };
        var nearest = function(p) {
            return {
                x: Math.round(p.x),
                y: Math.round(p.y)
            };
        };
        var actual = centroid(sampleDots);
        var optimal = nearest(actual);
        var guess = {
            x: Math.min(GRID - 1, optimal.x + 1),
            y: optimal.y
        };
        var cells = [];
        for(var y = 0; y < GRID; y++)_loop(y);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full aspect-square grid bg-bg rounded overflow-hidden",
                    style: {
                        gridTemplateColumns: "repeat(".concat(GRID, ", 1fr)"),
                        gridTemplateRows: "repeat(".concat(GRID, ", 1fr)")
                    },
                    children: [
                        cells,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            viewBox: "0 0 ".concat(GRID, " ").concat(GRID),
                            preserveAspectRatio: "none",
                            className: "absolute inset-0 pointer-events-none w-full h-full",
                            children: sampleDots.map(function(d, i) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: d.x + 0.5,
                                    y1: d.y + 0.5,
                                    x2: optimal.x + 0.5,
                                    y2: optimal.y + 0.5,
                                    stroke: "#66bb6a",
                                    strokeWidth: 0.15,
                                    opacity: 0.6
                                }, i, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, _this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: "Blue = dots"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-green-400",
                            children: "Green = true centroid"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-400",
                            children: "Red = your guess"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, _this);
    };
    var renderMemoryPreview = function() {
        var COLS = 4, ROWS = 4, GAP = 6;
        var BACK_URL = '/images/memory/Memory_JJJ_Back_440x.webp';
        var frontSrc = function(id, ext) {
            return "/images/memory/".concat(ext, "/").concat(id, ".").concat(ext);
        };
        var faceMap = {
            5: '001',
            6: '002'
        };
        var grid = [];
        for(var i = 0; i < COLS * ROWS; i++){
            var faceId = faceMap[i];
            grid.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg overflow-hidden shadow-md bg-bg aspect-[440/597]",
                children: faceId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            srcSet: frontSrc(faceId, 'avif'),
                            type: "image/avif"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 113,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                            srcSet: frontSrc(faceId, 'webp'),
                            type: "image/webp"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: frontSrc(faceId, 'webp'),
                            alt: "front-".concat(faceId),
                            width: 440,
                            height: 597,
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 112,
                    columnNumber: 13
                }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: BACK_URL,
                    alt: "back",
                    width: 440,
                    height: 597,
                    className: "w-full h-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                    lineNumber: 124,
                    columnNumber: 13
                }, _this)
            }, i, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, _this));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1.5 w-full",
                style: {
                    gridTemplateColumns: "repeat(".concat(COLS, ", 1fr)")
                },
                children: grid
            }, void 0, false, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/games/games-hub.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, _this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl sm:text-3xl font-semibold",
                                children: "Games Hub"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, _this),
                            onExit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: onExit,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4 mr-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, _this),
                                    "Back"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-text-muted",
                        children: "Interactive training games to improve spatial reasoning, memory, and pattern recognition."
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-xl overflow-hidden border-border-subtle hover:border-accent-primary/50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                return setSelected('centroid');
                            },
                            className: "flex flex-col h-full w-full text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg font-semibold",
                                            children: "Centroid"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Estimate the center of mass of scattered points. Improves spatial reasoning and pattern recognition."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "flex-1 flex items-center justify-center p-4 pt-0",
                                    children: renderCentroidPreview()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-xl overflow-hidden border-border-subtle hover:border-accent-primary/50 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: function() {
                                return setSelected('memory');
                            },
                            className: "flex flex-col h-full w-full text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg font-semibold",
                                            children: "JJJ Memory"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Match pairs of technique cards. Enhances visual memory and technique recognition."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "flex-1 flex items-center justify-center p-4 pt-0",
                                    children: renderMemoryPreview()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/games/games-hub.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/games/games-hub.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/games/games-hub.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/games/games-hub.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/games/games-hub.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, _this);
};
_s(GamesHub, "ocbnAlAHKI4/651zLVdwRqPZpkg=");
_c = GamesHub;
var _c;
__turbopack_context__.k.register(_c, "GamesHub");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/timer/timer-tool.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimerTool",
    ()=>TimerTool,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}
function toSeconds(t) {
    return t.m * 60 + t.s;
}
function fmt(seconds) {
    var m = Math.floor(seconds / 60).toString().padStart(2, "0");
    var s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return "".concat(m, ":").concat(s);
}
function beep() {
    var freq = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 880, dur = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 120;
    try {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        var ctx = new Ctx();
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.frequency.value = freq;
        o.type = "square";
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(function() {
            o.stop();
            ctx.close();
        }, dur);
    } catch (e) {
    // ignore audio errors (e.g. unsupported environment)
    }
}
var TimerTool = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        m: 5,
        s: 0
    }), 2), roundLen = _useState[0], setRoundLen = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        m: 0,
        s: 20
    }), 2), restLen = _useState1[0], setRestLen = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5), 2), totalRounds = _useState2[0], setTotalRounds = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("paused"), 2), phase = _useState3[0], setPhase = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1), 2), currentRound = _useState4[0], setCurrentRound = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), remaining = _useState5[0], setRemaining = _useState5[1];
    var intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load persisted settings on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                var roundRaw = window.localStorage.getItem("coach_timer_round");
                var restRaw = window.localStorage.getItem("coach_timer_rest");
                var roundsRaw = window.localStorage.getItem("coach_timer_rounds");
                if (roundRaw) setRoundLen(JSON.parse(roundRaw));
                if (restRaw) setRestLen(JSON.parse(restRaw));
                if (roundsRaw) setTotalRounds(Number(roundsRaw) || 5);
            } catch (e) {
            // ignore
            }
        }
    }["TimerTool.useEffect"], []);
    // Persist settings
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_round", JSON.stringify(roundLen));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        roundLen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_rest", JSON.stringify(restLen));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        restLen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            try {
                window.localStorage.setItem("coach_timer_rounds", String(totalRounds));
            } catch (e) {
            //
            }
        }
    }["TimerTool.useEffect"], [
        totalRounds
    ]);
    var roundSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[roundSeconds]": function() {
            return toSeconds(roundLen);
        }
    }["TimerTool.useMemo[roundSeconds]"], [
        roundLen
    ]);
    var restSeconds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[restSeconds]": function() {
            return toSeconds(restLen);
        }
    }["TimerTool.useMemo[restSeconds]"], [
        restLen
    ]);
    var clearTick = function() {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerTool.useEffect": function() {
            return ({
                "TimerTool.useEffect": function() {
                    return clearTick();
                }
            })["TimerTool.useEffect"];
        }
    }["TimerTool.useEffect"], []);
    var runRound = function() {
        clearTick();
        setPhase("round");
        setRemaining(roundSeconds);
        beep(1200, 400); // start beep
        intervalRef.current = window.setInterval(function() {
            setRemaining(function(prev) {
                var next = prev - 1;
                if (next <= 0) {
                    clearTick();
                    beep(500, 800); // end of round
                    if (currentRound >= totalRounds) {
                        setPhase("finished");
                        return 0;
                    }
                    runRest();
                    return 0;
                }
                return next;
            });
        }, 1000);
    };
    var startCountdown = function(onDone) {
        clearTick();
        setPhase("countdown");
        var count = 3;
        setRemaining(count);
        beep(900, 120); // "3"
        intervalRef.current = window.setInterval(function() {
            count -= 1;
            setRemaining(count);
            if (count > 0) {
                var dur = count === 2 ? 240 : 360;
                beep(900, dur);
            } else {
                beep(1200, 500);
                clearTick();
                onDone();
            }
        }, 1000);
    };
    var runRest = function() {
        clearTick();
        setPhase("rest");
        setRemaining(restSeconds);
        intervalRef.current = window.setInterval(function() {
            setRemaining(function(prev) {
                var next = prev - 1;
                if (next <= 0) {
                    clearTick();
                    setCurrentRound(function(r) {
                        return r + 1;
                    });
                    startCountdown(runRound);
                    return 0;
                }
                return next;
            });
        }, 1000);
    };
    var start = function() {
        setCurrentRound(1);
        startCountdown(runRound);
    };
    var pause = function() {
        setPhase("paused");
        clearTick();
    };
    var reset = function() {
        clearTick();
        setPhase("paused");
        setCurrentRound(1);
        setRemaining(0);
    };
    var bigText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimerTool.useMemo[bigText]": function() {
            return fmt(Math.max(remaining, 0));
        }
    }["TimerTool.useMemo[bigText]"], [
        remaining
    ]);
    var title = phase === "round" ? "Round ".concat(currentRound, "/").concat(totalRounds) : phase === "rest" ? "Rest" : phase === "countdown" ? "Get Ready" : phase === "finished" ? "Finished" : "Paused";
    var color = phase === "round" ? "text-green-400" : phase === "rest" || phase === "countdown" ? "text-amber-400" : "text-white";
    var adjust = function(setter, key, delta) {
        return setter(function(v) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, v), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, key, clamp(v[key] + delta, 0, key === "m" ? 99 : 59)));
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-text-muted font-medium",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, _this),
                    phase === "paused" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-text-subtle max-w-md mx-auto",
                        children: "Configure round duration, rest period, and number of rounds below. Settings are saved automatically."
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center my-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono tabular-nums tracking-[0.25em] text-[18vw] sm:text-[12vw] leading-none font-bold ".concat(color),
                    children: bigText
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-lg bg-bg-raised border border-border-subtle px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-muted text-xs font-medium",
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return adjust(setRoundLen, "m", -1);
                                },
                                "aria-label": "Decrease duration",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono tabular-nums font-semibold text-text-primary min-w-[3.5rem] text-center",
                                children: [
                                    roundLen.m.toString().padStart(2, "0"),
                                    ":",
                                    roundLen.s.toString().padStart(2, "0")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return adjust(setRoundLen, "m", +1);
                                },
                                "aria-label": "Increase duration",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-lg bg-bg-raised border border-border-subtle px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-muted text-xs font-medium",
                                children: "Rest"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return adjust(setRestLen, "s", -5);
                                },
                                "aria-label": "Decrease rest",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono tabular-nums font-semibold text-text-primary min-w-[3.5rem] text-center",
                                children: [
                                    restLen.m.toString().padStart(2, "0"),
                                    ":",
                                    restLen.s.toString().padStart(2, "0")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return adjust(setRestLen, "s", +5);
                                },
                                "aria-label": "Increase rest",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-lg bg-bg-raised border border-border-subtle px-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-muted text-xs font-medium",
                                children: "Rounds"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return setTotalRounds(function(r) {
                                        return Math.max(1, Math.min(99, r - 1));
                                    });
                                },
                                "aria-label": "Decrease rounds",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono tabular-nums font-semibold text-text-primary min-w-[2rem] text-center",
                                children: totalRounds
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "p-1.5 rounded-md hover:bg-bg transition-colors",
                                onClick: function() {
                                    return setTotalRounds(function(r) {
                                        return Math.max(1, Math.min(99, r + 1));
                                    });
                                },
                                "aria-label": "Increase rounds",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-3 pt-2",
                children: [
                    phase === "paused" || phase === "countdown" || phase === "finished" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        onClick: start,
                        className: "min-w-[120px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, _this),
                            "Start"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        variant: "outline",
                        onClick: pause,
                        className: "min-w-[120px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 333,
                                columnNumber: 13
                            }, _this),
                            "Pause"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        variant: "ghost",
                        onClick: reset,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, _this),
                            "Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
                lineNumber: 316,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/timer/timer-tool.tsx",
        lineNumber: 221,
        columnNumber: 5
    }, _this);
};
_s(TimerTool, "136jU77vNUjcAOGKD6y3qXtnDAw=");
_c = TimerTool;
const __TURBOPACK__default__export__ = TimerTool;
var _c;
__turbopack_context__.k.register(_c, "TimerTool");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/coach-tools/coach-tools-hub.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoachToolsHub",
    ()=>CoachToolsHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$timer$2f$timer$2d$tool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/timer/timer-tool.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
var CoachToolsHub = function(param) {
    var onExit = param.onExit, _param_initial = param.initial, initial = _param_initial === void 0 ? 'none' : _param_initial;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial), 2), selected = _useState[0], setSelected = _useState[1];
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CoachToolsHub.useEffect": function() {
            setSelected(initial);
        }
    }["CoachToolsHub.useEffect"], [
        initial
    ]);
    if (selected === 'timer') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        onClick: function() {
                            return setSelected('none');
                        },
                        className: "text-sm",
                        children: "← Back to Tools"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$timer$2f$timer$2d$tool$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimerTool"], {}, void 0, false, {
                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, _this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl sm:text-3xl font-semibold",
                        children: "Coach Tools"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-text-muted",
                        children: "Essential tools for planning classes, managing training sessions, and tracking progress."
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-xl overflow-hidden border-border-subtle hover:border-accent-primary/50 transition-colors cursor-pointer",
                        onClick: function() {
                            return setSelected('timer');
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 rounded-lg bg-accent-primary/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "w-5 h-5 text-accent-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 17
                                                }, _this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg font-semibold",
                                                children: "Round Timer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: "Simple round timer with rest periods and auditory beeps. Perfect for structuring grappling sessions."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-xs text-text-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-accent-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Customizable round duration"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-accent-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Rest period management"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-accent-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Audio beeps for transitions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-xl overflow-hidden border-border-subtle opacity-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 rounded-lg bg-bg-raised",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                                    className: "w-5 h-5 text-text-muted"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, _this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                lineNumber: 82,
                                                columnNumber: 15
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-lg font-semibold text-text-muted",
                                                children: "Class Planner"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        className: "text-xs",
                                        children: "Plan and structure your training sessions with technique sequences and progress tracking."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-text-subtle",
                                    children: "Coming Soon"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/coach-tools/coach-tools-hub.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, _this);
};
_s(CoachToolsHub, "ocbnAlAHKI4/651zLVdwRqPZpkg=");
_c = CoachToolsHub;
var _c;
__turbopack_context__.k.register(_c, "CoachToolsHub");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
var Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, type = _param.type, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "type"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-border-subtle bg-bg-raised px-3 py-2 text-sm text-text-primary", "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium", "placeholder:text-text-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, _this);
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
;
;
var Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
var DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
var DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
var DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
var DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, _this);
});
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
var DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = function(_param, ref) {
    var className = _param.className, children = _param.children, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "children"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-subtle bg-bg-raised p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl", className)
            }, props), {
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 45,
                                columnNumber: 9
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 44,
                        columnNumber: 7
                    }, _this)
                ]
            }), void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 33,
        columnNumber: 3
    }, _this);
});
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
var DialogHeader = function(_param) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 57,
        columnNumber: 3
    }, _this);
};
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
var DialogFooter = function(_param) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, _this);
};
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
var DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight text-text-primary", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 3
    }, _this);
});
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
var DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-text-muted", className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, _this);
});
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/cards/category-filter-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryFilterModal",
    ()=>CategoryFilterModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
;
;
;
var CategoryFilterModal = function(param) {
    var open = param.open, onOpenChange = param.onOpenChange, categories = param.categories, selectedCategories = param.selectedCategories, onToggleCategory = param.onToggleCategory, onClear = param.onClear;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-2xl max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: "Filter by Category"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-text-muted",
                                    children: selectedCategories.length > 0 ? "".concat(selectedCategories.length, " categor").concat(selectedCategories.length === 1 ? 'y' : 'ies', " selected") : 'Select categories to filter concepts'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, _this),
                                selectedCategories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: onClear,
                                    children: "Clear All"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: categories.map(function(category) {
                                var isSelected = selectedCategories.includes(category);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: isSelected ? "default" : "outline",
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("cursor-pointer transition-all", isSelected && "ring-2 ring-accent-primary"),
                                    onClick: function() {
                                        return onToggleCategory(category);
                                    },
                                    children: [
                                        category,
                                        isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3 ml-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                                            lineNumber: 65,
                                            columnNumber: 34
                                        }, _this)
                                    ]
                                }, category, true, {
                                    fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, _this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/cards/category-filter-modal.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, _this);
};
_c = CategoryFilterModal;
var _c;
__turbopack_context__.k.register(_c, "CategoryFilterModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/cards/anki-study-mode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnkiStudyMode",
    ()=>AnkiStudyMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Self-assessment ratings: Again, Hard, Good, Easy
var RATINGS = [
    {
        value: 1,
        label: 'Again',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
        color: 'text-red-400'
    },
    {
        value: 2,
        label: 'Hard',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"],
        color: 'text-orange-400'
    },
    {
        value: 3,
        label: 'Good',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        color: 'text-green-400'
    },
    {
        value: 4,
        label: 'Easy',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        color: 'text-blue-400'
    }
];
var AnkiStudyMode = function(param) {
    var concepts = param.concepts, onExit = param.onExit, onRate = param.onRate;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), shuffledConcepts = _useState[0], setShuffledConcepts = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), currentIndex = _useState1[0], setCurrentIndex = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('question'), 2), phase = _useState2[0], setPhase = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), flipped = _useState3[0], setFlipped = _useState3[1];
    // Shuffle concepts on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnkiStudyMode.useEffect": function() {
            var shuffled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(concepts).sort({
                "AnkiStudyMode.useEffect.shuffled": function() {
                    return Math.random() - 0.5;
                }
            }["AnkiStudyMode.useEffect.shuffled"]);
            setShuffledConcepts(shuffled);
        }
    }["AnkiStudyMode.useEffect"], [
        concepts
    ]);
    // Reset card state when moving to a new card
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnkiStudyMode.useEffect": function() {
            setFlipped(false);
            setPhase('question');
        }
    }["AnkiStudyMode.useEffect"], [
        currentIndex
    ]);
    var current = shuffledConcepts[currentIndex];
    var progress = shuffledConcepts.length > 0 ? (currentIndex + (phase === 'answer' ? 1 : 0)) / shuffledConcepts.length * 100 : 0;
    var isLast = currentIndex >= shuffledConcepts.length - 1 && phase === 'answer';
    var handleFlip = function() {
        if (phase === 'question') {
            setFlipped(true);
            setPhase('answer');
        }
    };
    var handleRating = function(rating) {
        if (current) {
            onRate(current.id, rating);
        }
        if (isLast) {
            // Finished all cards
            onExit();
        } else {
            // Move to next card - useEffect will reset the state
            setCurrentIndex(function(prev) {
                return prev + 1;
            });
        }
    };
    if (shuffledConcepts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 text-center text-text-muted",
            children: [
                "No concepts to study.",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onExit,
                    className: "mt-4",
                    children: "Back"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, _this);
    }
    if (!current) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-semibold mb-4",
                    children: "Study session complete!"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onExit,
                    children: "Return to Cards"
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, _this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm text-text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Card ",
                                    currentIndex + 1,
                                    " of ",
                                    shuffledConcepts.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    Math.round(progress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-2 bg-bg-raised rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-accent-primary transition-all duration-300",
                            style: {
                                width: "".concat(progress, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative min-h-[400px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-full",
                    style: {
                        perspective: '1000px'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full h-full transition-transform duration-500", "transform-style-preserve-3d"),
                        style: {
                            transformStyle: 'preserve-3d',
                            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 cursor-pointer", phase === 'question' && "hover:border-accent-primary"),
                                onClick: phase === 'question' ? handleFlip : undefined,
                                style: {
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-8 h-full flex items-center justify-center min-h-[400px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full flex flex-col items-center justify-center text-center space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full inline-block mr-2",
                                                        style: {
                                                            backgroundColor: current.color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-text-muted",
                                                        children: current.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl sm:text-4xl font-bold px-4 break-words",
                                                children: current.concept
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-text-muted text-sm",
                                                children: "Click to reveal answer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "absolute inset-0",
                                style: {
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-8 h-full flex items-center justify-center min-h-[400px] overflow-y-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full flex flex-col items-center justify-center text-center space-y-4 max-w-3xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full inline-block mr-2",
                                                        style: {
                                                            backgroundColor: current.color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-text-muted",
                                                        children: current.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl sm:text-3xl font-bold px-4 break-words",
                                                children: current.concept
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full px-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-base sm:text-lg text-text-primary whitespace-pre-wrap break-words overflow-wrap-anywhere",
                                                    children: current.description || current.short_description || 'No description available.'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 21
                                                }, _this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                                lineNumber: 173,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, _this),
            phase === 'answer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-sm text-text-muted mb-4",
                        children: "How well did you know this?"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                        children: RATINGS.map(function(param) {
                            var value = param.value, label = param.label, Icon = param.icon, color = param.color;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center gap-2 h-auto py-4", "hover:border-accent-primary hover:bg-accent-primary/10"),
                                onClick: function() {
                                    return handleRating(value);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6", color)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, _this)
                                ]
                            }, value, true, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, _this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center pt-4 border-t border-border-subtle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        onClick: onExit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, _this),
                            "Exit Study"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, _this),
                    phase === 'answer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: function() {
                            setFlipped(false);
                            setPhase('question');
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, _this),
                            "Back to Question"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/cards/anki-study-mode.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, _this);
};
_s(AnkiStudyMode, "NJB+NDLXlXj0gDx3qK0VAvMCDLQ=");
_c = AnkiStudyMode;
var _c;
__turbopack_context__.k.register(_c, "AnkiStudyMode");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/cards/cards-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardsView",
    ()=>CardsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/load-concepts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$cards$2f$category$2d$filter$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/cards/category-filter-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$cards$2f$anki$2d$study$2d$mode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/modules/cards/anki-study-mode.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
var CardsView = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), concepts = _useState[0], setConcepts = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), loading = _useState1[0], setLoading = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), query = _useState2[0], setQuery = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), selectedCategories = _useState3[0], setSelectedCategories = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showCategoryModal = _useState4[0], setShowCategoryModal = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), studyMode = _useState5[0], setStudyMode = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CardsView._useState.useState": function() {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                var saved = window.localStorage.getItem('cardRatings');
                return saved ? JSON.parse(saved) : {};
            } catch (e) {
                return {};
            }
        }
    }["CardsView._useState.useState"]), 2), ratings = _useState6[0], setRatings = _useState6[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardsView.useEffect": function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$load$2d$concepts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadConcepts"])().then({
                "CardsView.useEffect": function(data) {
                    // Convert ConceptPoint back to BJJConcept format for cards
                    var bjjConcepts = data.concepts.map({
                        "CardsView.useEffect.bjjConcepts": function(cp) {
                            // Reverse the coordinate conversion to get back to 0-1 range
                            var axis_mental_physical = (cp.x + 1) / 2;
                            var axis_self_opponent = (-cp.y + 1) / 2;
                            return {
                                id: cp.id,
                                concept: cp.label,
                                description: cp.description || '',
                                short_description: cp.description || '',
                                category: cp.category,
                                color: cp.color || '#6B7280',
                                axis_self_opponent: axis_self_opponent,
                                axis_mental_physical: axis_mental_physical,
                                brightness: 0.5,
                                size: 1
                            };
                        }
                    }["CardsView.useEffect.bjjConcepts"]);
                    setConcepts(bjjConcepts);
                    setLoading(false);
                }
            }["CardsView.useEffect"])["catch"]({
                "CardsView.useEffect": function(error) {
                    console.error('Failed to load concepts:', error);
                    setLoading(false);
                }
            }["CardsView.useEffect"]);
        }
    }["CardsView.useEffect"], []);
    var filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CardsView.useMemo[filtered]": function() {
            var q = query.trim().toLowerCase();
            var list = concepts.filter({
                "CardsView.useMemo[filtered].list": function(c) {
                    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
                    if (!q) return true;
                    return c.concept.toLowerCase().includes(q) || c.short_description.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
                }
            }["CardsView.useMemo[filtered].list"]);
            // Return filtered list - will be shuffled in AnkiStudyMode
            return list;
        }
    }["CardsView.useMemo[filtered]"], [
        concepts,
        query,
        selectedCategories
    ]);
    var availableCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CardsView.useMemo[availableCategories]": function() {
            var cats = new Set();
            concepts.forEach({
                "CardsView.useMemo[availableCategories]": function(c) {
                    return cats.add(c.category);
                }
            }["CardsView.useMemo[availableCategories]"]);
            return Array.from(cats).sort();
        }
    }["CardsView.useMemo[availableCategories]"], [
        concepts
    ]);
    var toggleCategory = function(name) {
        setSelectedCategories(function(prev) {
            return prev.includes(name) ? prev.filter(function(c) {
                return c !== name;
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(prev).concat([
                name
            ]);
        });
    };
    var handleRate = function(id, rating) {
        var newRatings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, ratings), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, id, rating));
        setRatings(newRatings);
        if ("TURBOPACK compile-time truthy", 1) {
            window.localStorage.setItem('cardRatings', JSON.stringify(newRatings));
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full p-8 text-center text-text-muted",
            children: "Loading concepts..."
        }, void 0, false, {
            fileName: "[project]/src/components/modules/cards/cards-view.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, _this);
    }
    if (studyMode && filtered.length > 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$cards$2f$anki$2d$study$2d$mode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnkiStudyMode"], {
            concepts: filtered,
            onExit: function() {
                return setStudyMode(false);
            },
            onRate: handleRate
        }, void 0, false, {
            fileName: "[project]/src/components/modules/cards/cards-view.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, _this);
    }
    var hasFilters = query.trim().length > 0 || selectedCategories.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        placeholder: "Search concepts...",
                                        value: query,
                                        onChange: function(e) {
                                            return setQuery(e.target.value);
                                        },
                                        className: "pl-10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: function() {
                                    return setShowCategoryModal(true);
                                },
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, _this),
                                    "Categories",
                                    selectedCategories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 px-1.5 py-0.5 text-xs bg-accent-primary text-white rounded-full",
                                        children: selectedCategories.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, _this),
                    selectedCategories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-text-muted font-medium",
                                children: "Active filters:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, _this),
                            selectedCategories.map(function(category) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "default",
                                    className: "cursor-pointer",
                                    onClick: function() {
                                        return toggleCategory(category);
                                    },
                                    children: category
                                }, category, false, {
                                    fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, _this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, _this),
            hasFilters ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-text-muted",
                                children: [
                                    filtered.length,
                                    " concept",
                                    filtered.length !== 1 ? 's' : '',
                                    " found"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, _this),
                            filtered.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: function() {
                                    return setStudyMode(true);
                                },
                                size: "lg",
                                className: "gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, _this),
                                    "Study ",
                                    filtered.length,
                                    " Cards"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, _this),
                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-text-muted py-12",
                        children: "No concepts found. Try adjusting your search or filters."
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-text-muted py-12 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Search for concepts or select categories to get started."
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: 'Then click "Study Cards" to begin an ANKI-style study session.'
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                lineNumber: 189,
                columnNumber: 9
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$modules$2f$cards$2f$category$2d$filter$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryFilterModal"], {
                open: showCategoryModal,
                onOpenChange: setShowCategoryModal,
                categories: availableCategories,
                selectedCategories: selectedCategories,
                onToggleCategory: toggleCategory,
                onClear: function() {
                    return setSelectedCategories([]);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/modules/cards/cards-view.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/cards/cards-view.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, _this);
};
_s(CardsView, "gY0i56XUaVZd1ATGinZBszASRLs=");
_c = CardsView;
var _c;
__turbopack_context__.k.register(_c, "CardsView");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/breathing/breathing-cycles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BreathingCycles",
    ()=>BreathingCycles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
var modes = {
    vagus: {
        name: 'Vagus Nerve',
        info: 'Activating the vagus nerve helps reduce stress and promotes relaxation. Breathe deeply with your diaphragm.',
        phases: [
            {
                name: 'inhale',
                duration: 4,
                text: 'Breathe In'
            },
            {
                name: 'exhale',
                duration: 8,
                text: 'Breathe Out'
            }
        ]
    },
    box: {
        name: 'Box Breathing',
        info: 'Box breathing is used by Navy SEALs and helps improve focus and reduce anxiety.',
        phases: [
            {
                name: 'inhale',
                duration: 4,
                text: 'Breathe In'
            },
            {
                name: 'hold1',
                duration: 4,
                text: 'Hold'
            },
            {
                name: 'exhale',
                duration: 4,
                text: 'Breathe Out'
            },
            {
                name: 'hold2',
                duration: 4,
                text: 'Hold'
            }
        ]
    },
    calf: {
        name: 'Calf Raises',
        info: 'Calf raises improve circulation and strengthen your lower legs. Rise slowly, hold, then lower with control.',
        phases: [
            {
                name: 'up',
                duration: 3,
                text: 'Rise Up'
            },
            {
                name: 'down',
                duration: 3,
                text: 'Lower Down'
            }
        ]
    }
};
var BreathingCycles = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('vagus'), 2), currentMode = _useState[0], setCurrentMode = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), isActive = _useState1[0], setIsActive = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('inhale'), 2), phase = _useState2[0], setPhase = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4), 2), timeLeft = _useState3[0], setTimeLeft = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), cycles = _useState4[0], setCycles = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showInfo = _useState5[0], setShowInfo = _useState5[1];
    var intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var infoTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var currentModeConfig = modes[currentMode];
    var currentPhaseIndex = currentModeConfig.phases.findIndex(function(p) {
        return p.name === phase;
    });
    var currentPhaseConfig = currentModeConfig.phases[currentPhaseIndex];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BreathingCycles.useEffect": function() {
            if (isActive && timeLeft > 0) {
                intervalRef.current = window.setTimeout({
                    "BreathingCycles.useEffect": function() {
                        setTimeLeft(timeLeft - 1);
                    }
                }["BreathingCycles.useEffect"], 1000);
            } else if (isActive && timeLeft === 0) {
                var nextPhaseIndex = (currentPhaseIndex + 1) % currentModeConfig.phases.length;
                var nextPhase = currentModeConfig.phases[nextPhaseIndex];
                setPhase(nextPhase.name);
                setTimeLeft(nextPhase.duration);
                if (nextPhaseIndex === 0) {
                    setCycles({
                        "BreathingCycles.useEffect": function(prev) {
                            return prev + 1;
                        }
                    }["BreathingCycles.useEffect"]);
                }
            }
            return ({
                "BreathingCycles.useEffect": function() {
                    if (intervalRef.current) {
                        window.clearTimeout(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            })["BreathingCycles.useEffect"];
        }
    }["BreathingCycles.useEffect"], [
        isActive,
        timeLeft,
        currentPhaseIndex,
        currentModeConfig.phases
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BreathingCycles.useEffect": function() {
            return ({
                "BreathingCycles.useEffect": function() {
                    if (infoTimeoutRef.current) {
                        window.clearTimeout(infoTimeoutRef.current);
                    }
                }
            })["BreathingCycles.useEffect"];
        }
    }["BreathingCycles.useEffect"], []);
    var handleStart = function() {
        setIsActive(!isActive);
        if (!isActive) {
            setPhase(currentModeConfig.phases[0].name);
            setTimeLeft(currentModeConfig.phases[0].duration);
        }
    };
    var handleReset = function() {
        setIsActive(false);
        setPhase(currentModeConfig.phases[0].name);
        setTimeLeft(currentModeConfig.phases[0].duration);
        setCycles(0);
    };
    var handleModeChange = function(mode) {
        setCurrentMode(mode);
        setIsActive(false);
        setPhase(modes[mode].phases[0].name);
        setTimeLeft(modes[mode].phases[0].duration);
        setCycles(0);
        setShowInfo(true);
        if (infoTimeoutRef.current) {
            window.clearTimeout(infoTimeoutRef.current);
        }
        infoTimeoutRef.current = window.setTimeout(function() {
            return setShowInfo(false);
        }, 4000);
    };
    var getCircleScale = function() {
        var progress = (currentPhaseConfig.duration - timeLeft) / currentPhaseConfig.duration;
        if (phase === 'inhale' || phase === 'up') {
            return 0.6 + 0.4 * progress;
        } else if (phase === 'exhale' || phase === 'down') {
            return 1 - 0.4 * progress;
        }
        return 1; // for hold phases
    };
    var getCircleColor = function() {
        if (currentMode === 'calf') return '#10b981'; // green for exercise
        switch(phase){
            case 'inhale':
                return '#3b82f6';
            case 'exhale':
                return '#8b5cf6';
            case 'hold1':
            case 'hold2':
                return '#f59e0b';
            case 'up':
                return '#10b981';
            case 'down':
                return '#ef4444';
            default:
                return '#3b82f6';
        }
    };
    var circleScale = getCircleScale();
    var circleColor = getCircleColor();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6 py-4 min-h-[600px] flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: Object.entries(modes).map(function(param) {
                    var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), key = _param[0], mode = _param[1];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: function() {
                            return handleModeChange(key);
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2 rounded-full text-sm font-medium transition-all", "backdrop-blur-sm", currentMode === key ? "bg-white text-purple-600 shadow-lg" : "bg-white/20 text-white hover:bg-white/30"),
                        children: mode.name
                    }, key, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, _this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, _this),
            showInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto text-center text-white text-sm leading-relaxed",
                children: [
                    currentModeConfig.info,
                    currentMode === 'calf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-white/80",
                        children: "Goal: 10 reps"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-white/80 text-lg font-mono",
                children: [
                    currentMode === 'calf' ? 'Reps' : 'Cycles',
                    ": ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-white",
                        children: cycles
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 183,
                        columnNumber: 55
                    }, _this),
                    currentMode === 'calf' && cycles < 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-white/60 ml-2",
                        children: "/ 10"
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center justify-center my-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 rounded-full border-2 border-white/20", isActive && "animate-pulse")
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-4 rounded-full border border-white/10"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full flex items-center justify-center text-white font-mono transition-all duration-1000 ease-in-out", isActive && "animate-pulse"),
                            style: {
                                width: "".concat(circleScale * 200, "px"),
                                height: "".concat(circleScale * 200, "px"),
                                backgroundColor: circleColor,
                                boxShadow: "0 0 60px ".concat(circleColor, "60, inset 0 0 20px rgba(255, 255, 255, 0.1)")
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-medium mb-1",
                                        children: (currentPhaseConfig === null || currentPhaseConfig === void 0 ? void 0 : currentPhaseConfig.text) || 'Ready'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl font-bold",
                                        children: timeLeft
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        onClick: handleStart,
                        className: "bg-white text-purple-600 hover:bg-white/90 shadow-lg min-w-[120px]",
                        children: isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, _this),
                                "Pause"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, _this),
                                "Start"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        variant: "outline",
                        onClick: handleReset,
                        className: "bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, _this),
                            "Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, _this),
            currentMode === 'calf' && cycles < 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 max-w-xs mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/20 rounded-lg h-2 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-lg transition-all duration-300",
                        style: {
                            width: "".concat(cycles / 10 * 100, "%")
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                        lineNumber: 261,
                        columnNumber: 13
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                    lineNumber: 260,
                    columnNumber: 11
                }, _this)
            }, void 0, false, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 259,
                columnNumber: 9
            }, _this),
            currentMode === 'calf' && cycles >= 10 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 text-center text-green-400 font-medium text-lg",
                children: "Great job! You've completed 10 reps! 🎉"
            }, void 0, false, {
                fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
                lineNumber: 271,
                columnNumber: 9
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/modules/breathing/breathing-cycles.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, _this);
};
_s(BreathingCycles, "qRPD4NsdfPV1STEcUAhoByrfhQs=");
_c = BreathingCycles;
var _c;
__turbopack_context__.k.register(_c, "BreathingCycles");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
;
var Progress = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, value = _param.value, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "value"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative h-4 w-full overflow-hidden rounded-full bg-bg-raised", className)
    }, props), {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            className: "h-full w-full flex-1 bg-accent-primary transition-all",
            style: {
                transform: "translateX(-".concat(100 - (value || 0), "%)")
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/progress.tsx",
            lineNumber: 20,
            columnNumber: 5
        }, _this)
    }), void 0, false, {
        fileName: "[project]/src/components/ui/progress.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, _this);
});
_c1 = Progress;
Progress.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Progress$React.forwardRef");
__turbopack_context__.k.register(_c1, "Progress");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/grappling_assessment_126q.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"assessment\":{\"title\":\"Complete Grappling Skills Self-Assessment\",\"version\":\"1.0\",\"description\":\"Comprehensive self-assessment tool for all major grappling positions and techniques\",\"scoring\":{\"scale\":{\"min\":1,\"max\":10,\"type\":\"confidence\"},\"weights\":{\"basic\":1.0,\"intermediate\":1.5,\"advanced\":2.0}},\"categories\":[{\"id\":\"takedowns\",\"name\":\"Takedowns & Wrestling\",\"description\":\"Standing grappling, throws, and takedown techniques\",\"weight\":1.0,\"questions\":[{\"id\":\"td_001\",\"text\":\"I can name more than 5 takedowns\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"takedowns\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"td_002\",\"text\":\"I can take down white belts reliably (70%+ success rate)\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"takedowns\",\"subcategory\":\"execution\",\"required\":true},{\"id\":\"td_003\",\"text\":\"I can take down a bigger, less-trained opponent\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"execution\"},{\"id\":\"td_004\",\"text\":\"From a failed Uchimata, I can think of at least 3 follow-ups\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"takedowns\",\"subcategory\":\"combinations\"},{\"id\":\"td_005\",\"text\":\"I enjoy training takedowns\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"takedowns\",\"subcategory\":\"motivation\"},{\"id\":\"td_006\",\"text\":\"I have several favorite ways to initiate kuzushi from standing\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"takedowns\",\"subcategory\":\"setups\"},{\"id\":\"td_007\",\"text\":\"In my last 10 training sessions, I successfully took down white belts 80% of the time\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"consistency\"},{\"id\":\"td_008\",\"text\":\"I'm confident I can initiate weight transfer in my opponent\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"fundamentals\"},{\"id\":\"td_009\",\"text\":\"I can execute a double-leg with proper technique against a non-resisting partner\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"takedowns\",\"subcategory\":\"execution\"},{\"id\":\"td_010\",\"text\":\"I can hit double-legs in live rolling against similar-skilled opponents\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"execution\"},{\"id\":\"td_011\",\"text\":\"I can defend/counter common takedown attempts\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"defense\"},{\"id\":\"td_012\",\"text\":\"I can create takedown opportunities from clinch positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"takedowns\",\"subcategory\":\"setups\"},{\"id\":\"td_013\",\"text\":\"I understand how my takedown game connects to my ground game\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"takedowns\",\"subcategory\":\"transitions\"}]},{\"id\":\"guard_top\",\"name\":\"Guard Passing (Top)\",\"description\":\"Passing opponent's guard from top position\",\"weight\":1.0,\"questions\":[{\"id\":\"gt_001\",\"text\":\"I can name 5+ guard passing principles\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"guard_top\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"gt_002\",\"text\":\"I can pass white belt guards consistently (70%+ success rate)\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"guard_top\",\"subcategory\":\"execution\",\"required\":true},{\"id\":\"gt_003\",\"text\":\"I enjoy working on guard passing\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"guard_top\",\"subcategory\":\"motivation\"},{\"id\":\"gt_004\",\"text\":\"I can execute knee-slice passes with proper technique\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"execution\"},{\"id\":\"gt_005\",\"text\":\"I can pass guard against bigger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"execution\"},{\"id\":\"gt_006\",\"text\":\"From failed knee-slice attempts, I know multiple backup options\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"guard_top\",\"subcategory\":\"combinations\"},{\"id\":\"gt_007\",\"text\":\"I understand how to deal with different guard styles (open, closed, butterfly)\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"adaptability\"},{\"id\":\"gt_008\",\"text\":\"I can maintain pressure while passing without getting swept\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"fundamentals\"},{\"id\":\"gt_009\",\"text\":\"I have multiple ways to establish initial grips for passing\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"setups\"},{\"id\":\"gt_010\",\"text\":\"I can chain 3+ different guard passes in sequence\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"guard_top\",\"subcategory\":\"combinations\"},{\"id\":\"gt_011\",\"text\":\"I understand timing for when to abandon a pass and reset\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"guard_top\",\"subcategory\":\"decision_making\"},{\"id\":\"gt_012\",\"text\":\"I can pass guard while avoiding leg entanglements\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"guard_top\",\"subcategory\":\"safety\"}]},{\"id\":\"guard_bottom\",\"name\":\"Guard Retention (Bottom)\",\"description\":\"Maintaining and recovering guard from bottom position\",\"weight\":1.0,\"questions\":[{\"id\":\"gb_001\",\"text\":\"I can name 5+ guard retention principles\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"guard_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"gb_002\",\"text\":\"When my guard gets broken, I have 3+ immediate reactions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"guard_bottom\",\"subcategory\":\"recovery\",\"required\":true},{\"id\":\"gb_003\",\"text\":\"I can maintain my guard against bigger opponents for entire rounds\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"guard_bottom\",\"subcategory\":\"durability\"},{\"id\":\"gb_004\",\"text\":\"I enjoy playing guard\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"guard_bottom\",\"subcategory\":\"motivation\"},{\"id\":\"gb_005\",\"text\":\"I understand how to use my legs as frames and barriers\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"guard_bottom\",\"subcategory\":\"fundamentals\"},{\"id\":\"gb_006\",\"text\":\"I can recover guard from bad positions (almost passed)\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"guard_bottom\",\"subcategory\":\"recovery\"},{\"id\":\"gb_007\",\"text\":\"I can create angles and off-balance my opponent while on bottom\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"guard_bottom\",\"subcategory\":\"disruption\"},{\"id\":\"gb_008\",\"text\":\"I understand when to be offensive vs defensive from guard\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"guard_bottom\",\"subcategory\":\"decision_making\"},{\"id\":\"gb_009\",\"text\":\"I can transition between different guard types fluidly\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"guard_bottom\",\"subcategory\":\"transitions\"},{\"id\":\"gb_010\",\"text\":\"I have multiple ways to break my opponent's posture\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"guard_bottom\",\"subcategory\":\"control\"},{\"id\":\"gb_011\",\"text\":\"I can sweep from guard retention scenarios\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"guard_bottom\",\"subcategory\":\"offense\"},{\"id\":\"gb_012\",\"text\":\"I rarely get my guard passed by similar-skilled opponents\",\"type\":\"performance\",\"level\":\"advanced\",\"category_id\":\"guard_bottom\",\"subcategory\":\"consistency\"}]},{\"id\":\"closed_guard_top\",\"name\":\"Closed Guard (Top)\",\"description\":\"Breaking and passing closed guard\",\"weight\":1.0,\"questions\":[{\"id\":\"cgt_001\",\"text\":\"I can name 3+ ways to break closed guard\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"cgt_002\",\"text\":\"I can break closed guard consistently against white belts\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"execution\",\"required\":true},{\"id\":\"cgt_003\",\"text\":\"I understand proper posture in closed guard\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"fundamentals\"},{\"id\":\"cgt_004\",\"text\":\"I can avoid most submission attempts from closed guard\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"safety\"},{\"id\":\"cgt_005\",\"text\":\"I have multiple hand placement strategies for breaking guard\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"setups\"},{\"id\":\"cgt_006\",\"text\":\"I can break guard against bigger, stronger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"technique_over_strength\"},{\"id\":\"cgt_007\",\"text\":\"I understand when to stand vs stay kneeling to break guard\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"decision_making\"},{\"id\":\"cgt_008\",\"text\":\"Once I break guard, I can immediately begin passing\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"transitions\"},{\"id\":\"cgt_009\",\"text\":\"I can deal with different closed guard grips (collar, sleeve, etc.)\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"adaptability\"},{\"id\":\"cgt_010\",\"text\":\"I rarely get swept from inside closed guard\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"stability\"},{\"id\":\"cgt_011\",\"text\":\"I can pressure fight effectively in closed guard\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"closed_guard_top\",\"subcategory\":\"pressure\"}]},{\"id\":\"closed_guard_bottom\",\"name\":\"Closed Guard (Bottom)\",\"description\":\"Attacking and controlling from closed guard\",\"weight\":1.0,\"questions\":[{\"id\":\"cgb_001\",\"text\":\"I can break posture consistently from closed guard\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"cgb_002\",\"text\":\"I have 3+ high-percentage submissions from closed guard\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"offense\",\"required\":true},{\"id\":\"cgb_003\",\"text\":\"I enjoy playing closed guard\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"motivation\"},{\"id\":\"cgb_004\",\"text\":\"I can transition smoothly between attack systems (armbar to triangle to omoplata)\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"combinations\"},{\"id\":\"cgb_005\",\"text\":\"I understand how to use my hips effectively in closed guard\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"fundamentals\"},{\"id\":\"cgb_006\",\"text\":\"I can sweep from closed guard when submissions aren't available\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"sweeps\"},{\"id\":\"cgb_007\",\"text\":\"I can maintain closed guard against opponents trying to break it\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"retention\"},{\"id\":\"cgb_008\",\"text\":\"I understand different grip strategies in closed guard (collar, sleeve, wrist)\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"grips\"},{\"id\":\"cgb_009\",\"text\":\"I can attack effectively even against postured opponents\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"advanced_attacks\"},{\"id\":\"cgb_010\",\"text\":\"I can create angles for attacks from closed guard\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"positioning\"},{\"id\":\"cgb_011\",\"text\":\"I have multiple ways to re-break posture once opponent stands\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"adaptability\"},{\"id\":\"cgb_012\",\"text\":\"I can finish submissions from closed guard against similar-skilled opponents\",\"type\":\"performance\",\"level\":\"advanced\",\"category_id\":\"closed_guard_bottom\",\"subcategory\":\"finishing\"}]},{\"id\":\"open_guard_top\",\"name\":\"Open Guard Passing (Top)\",\"description\":\"Passing various open guard styles\",\"weight\":1.0,\"questions\":[{\"id\":\"ogt_001\",\"text\":\"I can identify 5+ different open guard styles\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"open_guard_top\",\"subcategory\":\"recognition\",\"required\":true},{\"id\":\"ogt_002\",\"text\":\"I can pass butterfly guard consistently\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"open_guard_top\",\"subcategory\":\"execution\",\"required\":true},{\"id\":\"ogt_003\",\"text\":\"I understand the key principles for passing each open guard type\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"open_guard_top\",\"subcategory\":\"strategy\"},{\"id\":\"ogt_004\",\"text\":\"I can deal with De La Riva guard effectively\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"open_guard_top\",\"subcategory\":\"specific_guards\"},{\"id\":\"ogt_005\",\"text\":\"I can pass spider guard without getting swept\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"open_guard_top\",\"subcategory\":\"specific_guards\"},{\"id\":\"ogt_006\",\"text\":\"I understand how to control distance against open guard players\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"open_guard_top\",\"subcategory\":\"distance_management\"},{\"id\":\"ogt_007\",\"text\":\"I can adapt my passing style based on opponent's open guard preference\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"open_guard_top\",\"subcategory\":\"adaptability\"},{\"id\":\"ogt_008\",\"text\":\"I can deal with inverted guard attacks\",\"type\":\"defensive\",\"level\":\"advanced\",\"category_id\":\"open_guard_top\",\"subcategory\":\"modern_guards\"},{\"id\":\"ogt_009\",\"text\":\"I have specific strategies for dealing with berimbolo attempts\",\"type\":\"defensive\",\"level\":\"advanced\",\"category_id\":\"open_guard_top\",\"subcategory\":\"modern_guards\"},{\"id\":\"ogt_010\",\"text\":\"I can pressure pass against technical open guard players\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"open_guard_top\",\"subcategory\":\"pressure_passing\"},{\"id\":\"ogt_011\",\"text\":\"I understand when to disengage and reset against complex open guards\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"open_guard_top\",\"subcategory\":\"decision_making\"}]},{\"id\":\"open_guard_bottom\",\"name\":\"Open Guard (Bottom)\",\"description\":\"Playing various open guard styles\",\"weight\":1.0,\"questions\":[{\"id\":\"ogb_001\",\"text\":\"I can play at least 3 different open guard styles\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"variety\",\"required\":true},{\"id\":\"ogb_002\",\"text\":\"I can sweep from butterfly guard consistently\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"sweeps\",\"required\":true},{\"id\":\"ogb_003\",\"text\":\"I enjoy playing open guard\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"motivation\"},{\"id\":\"ogb_004\",\"text\":\"I can create angles and off-balance from open guard\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"fundamentals\"},{\"id\":\"ogb_005\",\"text\":\"I have a go-to open guard style that works against most opponents\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"specialization\"},{\"id\":\"ogb_006\",\"text\":\"I can transition between different open guard styles fluidly\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"transitions\"},{\"id\":\"ogb_007\",\"text\":\"I understand how to use grips effectively in each open guard type\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"grips\"},{\"id\":\"ogb_008\",\"text\":\"I can attack submissions from multiple open guard positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"submissions\"},{\"id\":\"ogb_009\",\"text\":\"I can play inverted guard effectively\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"modern_guards\"},{\"id\":\"ogb_010\",\"text\":\"I can recover open guard when opponent starts to pass\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"retention\"},{\"id\":\"ogb_011\",\"text\":\"I understand timing for when to be offensive vs defensive in open guard\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"decision_making\"},{\"id\":\"ogb_012\",\"text\":\"I can execute berimbolo or back-take sequences from open guard\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"open_guard_bottom\",\"subcategory\":\"modern_attacks\"}]},{\"id\":\"half_guard_top\",\"name\":\"Half Guard (Top)\",\"description\":\"Passing and controlling from half guard top\",\"weight\":1.0,\"questions\":[{\"id\":\"hgt_001\",\"text\":\"I can name 3+ ways to pass half guard\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"half_guard_top\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"hgt_002\",\"text\":\"I can pass half guard consistently against white belts\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"half_guard_top\",\"subcategory\":\"execution\",\"required\":true},{\"id\":\"hgt_003\",\"text\":\"I understand proper weight distribution in half guard top\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"half_guard_top\",\"subcategory\":\"fundamentals\"},{\"id\":\"hgt_004\",\"text\":\"I can avoid getting swept from half guard top\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"half_guard_top\",\"subcategory\":\"stability\"},{\"id\":\"hgt_005\",\"text\":\"I can deal with underhooks from half guard bottom\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_top\",\"subcategory\":\"control\"},{\"id\":\"hgt_006\",\"text\":\"I can pass half guard against larger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"half_guard_top\",\"subcategory\":\"technique_over_strength\"},{\"id\":\"hgt_007\",\"text\":\"I understand when to go for knee-slide vs other half guard passes\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"half_guard_top\",\"subcategory\":\"decision_making\"},{\"id\":\"hgt_008\",\"text\":\"I can submit from half guard top position\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"half_guard_top\",\"subcategory\":\"submissions\"},{\"id\":\"hgt_009\",\"text\":\"I can deal with deep half guard effectively\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"half_guard_top\",\"subcategory\":\"specialized_positions\"},{\"id\":\"hgt_010\",\"text\":\"I can chain multiple half guard passing attempts together\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"half_guard_top\",\"subcategory\":\"combinations\"},{\"id\":\"hgt_011\",\"text\":\"I understand how to use crossface effectively in half guard\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_top\",\"subcategory\":\"control\"}]},{\"id\":\"half_guard_bottom\",\"name\":\"Half Guard (Bottom)\",\"description\":\"Playing and attacking from half guard bottom\",\"weight\":1.0,\"questions\":[{\"id\":\"hgb_001\",\"text\":\"I can name 3+ sweeps from half guard bottom\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"hgb_002\",\"text\":\"I can get to half guard from various positions\",\"type\":\"tactical\",\"level\":\"basic\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"entries\",\"required\":true},{\"id\":\"hgb_003\",\"text\":\"I enjoy playing half guard bottom\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"motivation\"},{\"id\":\"hgb_004\",\"text\":\"I understand how to get underhooks effectively from half guard\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"fundamentals\"},{\"id\":\"hgb_005\",\"text\":\"I can sweep from half guard consistently\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"sweeps\"},{\"id\":\"hgb_006\",\"text\":\"I can prevent my guard from being passed when in half guard\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"retention\"},{\"id\":\"hgb_007\",\"text\":\"I understand how to create space and recover full guard from half guard\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"recovery\"},{\"id\":\"hgb_008\",\"text\":\"I can attack submissions from half guard bottom\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"submissions\"},{\"id\":\"hgb_009\",\"text\":\"I can play deep half guard effectively\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"specialized_positions\"},{\"id\":\"hgb_010\",\"text\":\"I can transition from half guard to other guard positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"transitions\"},{\"id\":\"hgb_011\",\"text\":\"I understand timing for when to attack vs when to recover in half guard\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"decision_making\"},{\"id\":\"hgb_012\",\"text\":\"I can deal with crossface pressure effectively\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"half_guard_bottom\",\"subcategory\":\"defense\"}]},{\"id\":\"mount_top\",\"name\":\"Mount (Top)\",\"description\":\"Controlling and attacking from mount\",\"weight\":1.0,\"questions\":[{\"id\":\"mt_001\",\"text\":\"I can maintain mount against white belts for 30+ seconds\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"mount_top\",\"subcategory\":\"control\",\"required\":true},{\"id\":\"mt_002\",\"text\":\"I can name 3+ submissions from mount\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"mount_top\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"mt_003\",\"text\":\"I understand proper weight distribution in mount\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"mount_top\",\"subcategory\":\"fundamentals\"},{\"id\":\"mt_004\",\"text\":\"I can finish submissions from mount against similar-skilled opponents\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"finishing\"},{\"id\":\"mt_005\",\"text\":\"I can maintain mount against bigger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"control\"},{\"id\":\"mt_006\",\"text\":\"I can transition to high mount when needed\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"positioning\"},{\"id\":\"mt_007\",\"text\":\"I understand when to stay heavy vs when to be mobile in mount\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"decision_making\"},{\"id\":\"mt_008\",\"text\":\"I can chain different mount attacks together\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"mount_top\",\"subcategory\":\"combinations\"},{\"id\":\"mt_009\",\"text\":\"I can deal with opponent's mount escapes effectively\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"counter_defense\"},{\"id\":\"mt_010\",\"text\":\"I can transition from mount to other dominant positions\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"mount_top\",\"subcategory\":\"transitions\"},{\"id\":\"mt_011\",\"text\":\"I enjoy fighting from mount position\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"mount_top\",\"subcategory\":\"motivation\"},{\"id\":\"mt_012\",\"text\":\"I can attack the back from mount when opponent turns away\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"mount_top\",\"subcategory\":\"transitions\"}]},{\"id\":\"mount_bottom\",\"name\":\"Mount (Bottom)\",\"description\":\"Escaping and defending from mount bottom\",\"weight\":1.0,\"questions\":[{\"id\":\"mb_001\",\"text\":\"I can name 3+ mount escapes\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"mount_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"mb_002\",\"text\":\"I can escape mount from white belts consistently\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"mount_bottom\",\"subcategory\":\"escapes\",\"required\":true},{\"id\":\"mb_003\",\"text\":\"I understand proper defensive posture under mount\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"mount_bottom\",\"subcategory\":\"fundamentals\"},{\"id\":\"mb_004\",\"text\":\"I can prevent most submission attempts from mount bottom\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"mount_bottom\",\"subcategory\":\"submission_defense\"},{\"id\":\"mb_005\",\"text\":\"I can create enough space to begin escape sequences\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"mount_bottom\",\"subcategory\":\"space_creation\"},{\"id\":\"mb_006\",\"text\":\"I can escape mount from bigger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"mount_bottom\",\"subcategory\":\"technique_over_strength\"},{\"id\":\"mb_007\",\"text\":\"I understand when to bridge vs when to shrimp for escapes\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"mount_bottom\",\"subcategory\":\"decision_making\"},{\"id\":\"mb_008\",\"text\":\"I can defend against high mount attacks\",\"type\":\"defensive\",\"level\":\"advanced\",\"category_id\":\"mount_bottom\",\"subcategory\":\"specialized_defense\"},{\"id\":\"mb_009\",\"text\":\"I rarely get mounted and stay mounted by similar-skilled opponents\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"mount_bottom\",\"subcategory\":\"prevention\"},{\"id\":\"mb_010\",\"text\":\"I can sweep from mount bottom when escape isn't available\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"mount_bottom\",\"subcategory\":\"sweeps\"},{\"id\":\"mb_011\",\"text\":\"I stay calm and don't panic when mounted\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"mount_bottom\",\"subcategory\":\"composure\"}]},{\"id\":\"back_mount_top\",\"name\":\"Back Mount (Top)\",\"description\":\"Controlling and attacking from back mount\",\"weight\":1.0,\"questions\":[{\"id\":\"bmt_001\",\"text\":\"I can maintain back control for 30+ seconds against white belts\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"back_mount_top\",\"subcategory\":\"control\",\"required\":true},{\"id\":\"bmt_002\",\"text\":\"I understand proper hook placement for back control\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"back_mount_top\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"bmt_003\",\"text\":\"I can finish rear naked chokes consistently\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"back_mount_top\",\"subcategory\":\"submissions\"},{\"id\":\"bmt_004\",\"text\":\"I can maintain back control against bigger opponents\",\"type\":\"application\",\"level\":\"intermediate\",\"category_id\":\"back_mount_top\",\"subcategory\":\"control\"},{\"id\":\"bmt_005\",\"text\":\"I have multiple finishing sequences beyond RNC from back mount\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"back_mount_top\",\"subcategory\":\"submissions\"},{\"id\":\"bmt_006\",\"text\":\"I understand how to use my legs/hooks to control different body types\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"back_mount_top\",\"subcategory\":\"adaptability\"},{\"id\":\"bmt_007\",\"text\":\"I can deal with opponent's hand fighting effectively\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"back_mount_top\",\"subcategory\":\"control\"},{\"id\":\"bmt_008\",\"text\":\"I can transition between different back attack systems\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"back_mount_top\",\"subcategory\":\"combinations\"},{\"id\":\"bmt_009\",\"text\":\"I understand when to stay on the back vs transition to mount\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"back_mount_top\",\"subcategory\":\"decision_making\"},{\"id\":\"bmt_010\",\"text\":\"I can get to back control from various positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"back_mount_top\",\"subcategory\":\"entries\"},{\"id\":\"bmt_011\",\"text\":\"I enjoy fighting from back control position\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"back_mount_top\",\"subcategory\":\"motivation\"}]},{\"id\":\"back_mount_bottom\",\"name\":\"Back Mount (Bottom)\",\"description\":\"Escaping and defending from back mount bottom\",\"weight\":1.0,\"questions\":[{\"id\":\"bmb_001\",\"text\":\"I can name 3+ back escape techniques\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"bmb_002\",\"text\":\"I understand proper hand placement to defend chokes\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"bmb_003\",\"text\":\"I can escape back control from white belts consistently\",\"type\":\"performance\",\"level\":\"basic\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"escapes\"},{\"id\":\"bmb_004\",\"text\":\"I rarely get submitted from back control by similar-skilled opponents\",\"type\":\"performance\",\"level\":\"intermediate\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"survival\"},{\"id\":\"bmb_005\",\"text\":\"I can prevent hooks from being established\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"prevention\"},{\"id\":\"bmb_006\",\"text\":\"I can create enough movement to begin escape sequences\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"movement\"},{\"id\":\"bmb_007\",\"text\":\"I understand when to focus on removing hooks vs hand fighting\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"decision_making\"},{\"id\":\"bmb_008\",\"text\":\"I can escape back control from larger opponents\",\"type\":\"application\",\"level\":\"advanced\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"technique_over_strength\"},{\"id\":\"bmb_009\",\"text\":\"I stay calm and don't panic when back is taken\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"composure\"},{\"id\":\"bmb_010\",\"text\":\"I can counter-attack when opponent makes mistakes from back control\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"counter_attack\"},{\"id\":\"bmb_011\",\"text\":\"I understand different escape routes based on opponent's grip configuration\",\"type\":\"strategic\",\"level\":\"advanced\",\"category_id\":\"back_mount_bottom\",\"subcategory\":\"adaptability\"}]},{\"id\":\"leg_locks\",\"name\":\"Leg Locks (Attack/Defense)\",\"description\":\"Attacking with and defending against leg locks\",\"weight\":1.0,\"questions\":[{\"id\":\"ll_001\",\"text\":\"I can name 5+ different leg lock submissions\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"leg_locks\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"ll_002\",\"text\":\"I understand basic leg lock defense principles\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"leg_locks\",\"subcategory\":\"defense\",\"required\":true},{\"id\":\"ll_003\",\"text\":\"I can execute straight ankle locks with proper technique\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"leg_locks\",\"subcategory\":\"execution\"},{\"id\":\"ll_004\",\"text\":\"I can escape from basic leg lock attacks\",\"type\":\"defensive\",\"level\":\"intermediate\",\"category_id\":\"leg_locks\",\"subcategory\":\"escapes\"},{\"id\":\"ll_005\",\"text\":\"I understand ashi garami and basic leg entanglement positions\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"leg_locks\",\"subcategory\":\"positions\"},{\"id\":\"ll_006\",\"text\":\"I can attack heel hooks safely in training\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"leg_locks\",\"subcategory\":\"advanced_attacks\"},{\"id\":\"ll_007\",\"text\":\"I enjoy training leg locks\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"leg_locks\",\"subcategory\":\"motivation\"},{\"id\":\"ll_008\",\"text\":\"I can transition between different leg lock positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"leg_locks\",\"subcategory\":\"transitions\"},{\"id\":\"ll_009\",\"text\":\"I understand leg lock entries from various positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"leg_locks\",\"subcategory\":\"entries\"},{\"id\":\"ll_010\",\"text\":\"I can defend against heel hooks effectively\",\"type\":\"defensive\",\"level\":\"advanced\",\"category_id\":\"leg_locks\",\"subcategory\":\"advanced_defense\"},{\"id\":\"ll_011\",\"text\":\"I understand the mechanics of knee line attacks\",\"type\":\"technical\",\"level\":\"advanced\",\"category_id\":\"leg_locks\",\"subcategory\":\"advanced_attacks\"},{\"id\":\"ll_012\",\"text\":\"I can use leg locks as a complement to my overall game\",\"type\":\"strategic\",\"level\":\"intermediate\",\"category_id\":\"leg_locks\",\"subcategory\":\"integration\"}]},{\"id\":\"wrist_locks\",\"name\":\"Wrist Locks\",\"description\":\"Attacking with and defending against wrist locks\",\"weight\":0.5,\"questions\":[{\"id\":\"wl_001\",\"text\":\"I can name 3+ different wrist lock variations\",\"type\":\"knowledge\",\"level\":\"basic\",\"category_id\":\"wrist_locks\",\"subcategory\":\"fundamentals\",\"required\":true},{\"id\":\"wl_002\",\"text\":\"I understand when wrist lock opportunities present themselves\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"wrist_locks\",\"subcategory\":\"recognition\",\"required\":true},{\"id\":\"wl_003\",\"text\":\"I can execute basic wrist locks with proper technique\",\"type\":\"technical\",\"level\":\"basic\",\"category_id\":\"wrist_locks\",\"subcategory\":\"execution\"},{\"id\":\"wl_004\",\"text\":\"I can defend against wrist lock attacks\",\"type\":\"defensive\",\"level\":\"basic\",\"category_id\":\"wrist_locks\",\"subcategory\":\"defense\"},{\"id\":\"wl_005\",\"text\":\"I can set up wrist locks from guard positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"wrist_locks\",\"subcategory\":\"setups\"},{\"id\":\"wl_006\",\"text\":\"I understand wrist lock entries from standing positions\",\"type\":\"tactical\",\"level\":\"intermediate\",\"category_id\":\"wrist_locks\",\"subcategory\":\"standing\"},{\"id\":\"wl_007\",\"text\":\"I can use wrist locks as transitions to other submissions\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"wrist_locks\",\"subcategory\":\"combinations\"},{\"id\":\"wl_008\",\"text\":\"I understand the mechanics of different wrist lock angles\",\"type\":\"technical\",\"level\":\"intermediate\",\"category_id\":\"wrist_locks\",\"subcategory\":\"mechanics\"},{\"id\":\"wl_009\",\"text\":\"I can catch wrist locks opportunistically during scrambles\",\"type\":\"tactical\",\"level\":\"advanced\",\"category_id\":\"wrist_locks\",\"subcategory\":\"opportunistic\"},{\"id\":\"wl_010\",\"text\":\"I enjoy training wrist locks\",\"type\":\"psychological\",\"level\":\"basic\",\"category_id\":\"wrist_locks\",\"subcategory\":\"motivation\"}]}]},\"metadata\":{\"created_date\":\"2025-01-01\",\"last_modified\":\"2025-01-01\",\"author\":\"Assessment Designer\",\"target_audience\":\"BJJ/Grappling practitioners\",\"estimated_time\":\"25-35 minutes\",\"total_questions\":126,\"total_categories\":11}}"));}),
"[project]/src/components/modules/skill-check/skill-check.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkillCheck",
    ()=>SkillCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/RadarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Radar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarAngleAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/PolarRadiusAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grappling_assessment_126q$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/grappling_assessment_126q.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
var weights = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grappling_assessment_126q$2e$json__$28$json$29$__["default"].assessment.scoring.weights;
var allCategories = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grappling_assessment_126q$2e$json__$28$json$29$__["default"].assessment.categories;
// Normalize category names
var categories = allCategories.map(function(c) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, c), {
        name: c.name === 'Takedowns & Wrestling' ? 'Takedowns' : c.name
    });
});
var ratingColor = function(v) {
    if (v <= 1) return '#bdbdbd';
    if (v === 2) return '#c9c9c9';
    if (v === 3) return '#d6d6d6';
    if (v === 4) return '#d6c74a';
    if (v === 5) return '#e4d24a';
    if (v === 6) return '#f0db4a';
    if (v === 7) return '#81c784';
    if (v === 8) return '#66bb6a';
    if (v === 9) return '#43a047';
    return '#2e7d32';
};
var containedTextColor = function(v) {
    return v <= 6 ? '#000' : '#fff';
};
var SkillCheck = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('setup'), 2), mode = _useState[0], setMode = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('sample'), 2), assessmentType = _useState1[0], setAssessmentType = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), questions = _useState2[0], setQuestions = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SkillCheck._useState.useState": function() {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                return JSON.parse(localStorage.getItem('skillcheck_answers') || '{}');
            } catch (e) {
                return {};
            }
        }
    }["SkillCheck._useState.useState"]), 2), answers = _useState3[0], setAnswers = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0), 2), idx = _useState4[0], setIdx = _useState4[1];
    var current = questions[idx];
    var buildQuestions = function(type) {
        var list = [];
        categories.forEach(function(cat, catIdx) {
            var allQs = Array.isArray(cat.questions) ? cat.questions : [];
            if (allQs.length === 0) return;
            if (type === 'all') {
                var _list;
                (_list = list).push.apply(_list, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(allQs.map(function(q) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, q), {
                        categoryIndex: catIdx,
                        categoryName: cat.name
                    });
                })));
            } else {
                var _list1;
                var requiredQs = allQs.filter(function(q) {
                    return q.required;
                });
                var optionalQs = allQs.filter(function(q) {
                    return !q.required;
                });
                var pick = function(arr, n) {
                    var a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr);
                    for(var i = a.length - 1; i > 0; i--){
                        var j = Math.floor(Math.random() * (i + 1));
                        var ref;
                        ref = [
                            a[j],
                            a[i]
                        ], a[i] = ref[0], a[j] = ref[1], ref;
                    }
                    return a.slice(0, n);
                };
                var chosen = [];
                var target = Math.min(5, allQs.length);
                if (requiredQs.length >= target) {
                    chosen = pick(requiredQs, target);
                } else {
                    var need = target - requiredQs.length;
                    chosen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(requiredQs).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(pick(optionalQs, need)));
                }
                (_list1 = list).push.apply(_list1, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(chosen.map(function(q) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, q), {
                        categoryIndex: catIdx,
                        categoryName: cat.name
                    });
                })));
            }
        });
        return list;
    };
    var start = function(type) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('skillcheck_answers');
        }
        setAnswers({});
        setAssessmentType(type);
        var qs = buildQuestions(type);
        if (qs.length === 0) return;
        setQuestions(qs);
        setIdx(0);
        setMode('assessment');
    };
    var handleAnswer = function(id, v) {
        var next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, answers), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({}, id, v));
        setAnswers(next);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('skillcheck_answers', JSON.stringify(next));
        }
        if (idx < questions.length - 1) {
            setIdx(function(i) {
                return i + 1;
            });
        } else {
            setMode('results');
        }
    };
    var results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillCheck.useMemo[results]": function() {
            if (mode !== 'results') return null;
            var catScores = {};
            var total = 0, max = 0;
            categories.forEach({
                "SkillCheck.useMemo[results]": function(cat, catIdx) {
                    var qs = questions.filter({
                        "SkillCheck.useMemo[results].qs": function(q) {
                            return q.categoryIndex === catIdx;
                        }
                    }["SkillCheck.useMemo[results].qs"]);
                    var s = 0, m = 0;
                    qs.forEach({
                        "SkillCheck.useMemo[results]": function(q) {
                            var a = answers[q.id] || 1;
                            var w = weights[q.level];
                            s += a * w;
                            m += 10 * w;
                        }
                    }["SkillCheck.useMemo[results]"]);
                    var pct = m ? s / m * 100 : 0;
                    catScores[cat.id] = {
                        name: cat.name,
                        score: pct
                    };
                    total += s;
                    max += m;
                }
            }["SkillCheck.useMemo[results]"]);
            return {
                overall: max ? total / max * 100 : 0,
                cats: catScores
            };
        }
    }["SkillCheck.useMemo[results]"], [
        mode,
        answers,
        questions
    ]);
    var catDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillCheck.useMemo[catDone]": function() {
            var status = new Array(categories.length).fill(false);
            categories.forEach({
                "SkillCheck.useMemo[catDone]": function(_, catIdx) {
                    var qs = questions.filter({
                        "SkillCheck.useMemo[catDone].qs": function(q) {
                            return q.categoryIndex === catIdx;
                        }
                    }["SkillCheck.useMemo[catDone].qs"]);
                    status[catIdx] = qs.length > 0 && qs.every({
                        "SkillCheck.useMemo[catDone]": function(q) {
                            return answers[q.id] != null;
                        }
                    }["SkillCheck.useMemo[catDone]"]);
                }
            }["SkillCheck.useMemo[catDone]"]);
            return status;
        }
    }["SkillCheck.useMemo[catDone]"], [
        answers,
        questions
    ]);
    // Landing metrics
    var shortTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillCheck.useMemo[shortTotal]": function() {
            return categories.length * 5;
        }
    }["SkillCheck.useMemo[shortTotal]"], []);
    var longTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillCheck.useMemo[longTotal]": function() {
            return categories.reduce({
                "SkillCheck.useMemo[longTotal]": function(sum, c) {
                    return sum + (Array.isArray(c.questions) ? c.questions.length : 0);
                }
            }["SkillCheck.useMemo[longTotal]"], 0);
        }
    }["SkillCheck.useMemo[longTotal]"], []);
    var previewData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkillCheck.useMemo[previewData]": function() {
            return categories.slice(0, 10).map({
                "SkillCheck.useMemo[previewData]": function(c) {
                    return {
                        subject: c.name,
                        score: Math.floor(40 + Math.random() * 60),
                        fullMark: 100
                    };
                }
            }["SkillCheck.useMemo[previewData]"]);
        }
    }["SkillCheck.useMemo[previewData]"], []);
    // Setup Mode
    if (mode === 'setup') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl sm:text-3xl font-bold",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grappling_assessment_126q$2e$json__$28$json$29$__["default"].assessment.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-text-muted text-sm sm:text-base",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$grappling_assessment_126q$2e$json__$28$json$29$__["default"].assessment.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-6 sm:gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Short Assessment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: function() {
                                                return start('sample');
                                            },
                                            size: "lg",
                                            className: "w-full",
                                            children: "START SHORT"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-text-muted space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "5 questions per category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "(",
                                                        shortTotal,
                                                        " total)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "approx. 3–5 min"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Complete Assessment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: function() {
                                                return start('all');
                                            },
                                            variant: "outline",
                                            size: "lg",
                                            className: "w-full",
                                            children: "START LONG"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-text-muted space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "10+ questions per category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        longTotal,
                                                        " questions"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "approx. 7–10 min"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                children: "Assessment Categories"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: categories.map(function(c, i) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-text-primary",
                                                children: [
                                                    i + 1,
                                                    ". ",
                                                    c.name
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, _this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[300px] w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                                data: previewData,
                                                outerRadius: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? '70%' : '80%',
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                        dataKey: "subject",
                                                        tick: {
                                                            fontSize: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? 10 : 12
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                                        angle: 90,
                                                        domain: [
                                                            0,
                                                            100
                                                        ],
                                                        tick: {
                                                            fontSize: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? 8 : 10
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                        lineNumber: 269,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                        name: "Preview",
                                                        dataKey: "score",
                                                        stroke: "#8884d8",
                                                        fill: "#8884d8",
                                                        fillOpacity: 0.3
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, _this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, _this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                children: "How to Use This Assessment"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2 text-sm text-text-muted list-disc list-inside",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Rate your confidence from 1 (no confidence) to 10 (complete confidence)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Advanced questions carry more weight in your final score"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Be honest — this is for your personal development"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Focus on your current abilities, not future goals"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Results will highlight strengths and areas for improvement"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 292,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, _this);
    }
    // Assessment Mode
    if (mode === 'assessment' && current) {
        var currentAnswer = answers[current.id] || 0;
        var total = questions.length;
        var answered = questions.filter(function(q) {
            return answers[q.id] != null;
        }).length;
        var inCatTotal = questions.filter(function(q) {
            return q.categoryIndex === current.categoryIndex;
        }).length;
        var inCatAnswered = questions.slice(0, idx + 1).filter(function(q) {
            return q.categoryIndex === current.categoryIndex;
        }).length;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-text-muted",
                                    children: [
                                        "Category ",
                                        (current.categoryIndex || 0) + 1,
                                        " of ",
                                        categories.length,
                                        " · ",
                                        current.categoryName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-text-muted",
                                    children: [
                                        "Question ",
                                        inCatAnswered,
                                        " of ",
                                        inCatTotal
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                    value: answered / total * 100,
                                    className: "h-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 328,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-text-muted text-right",
                                    children: [
                                        answered,
                                        "/",
                                        total
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-10 gap-1 mt-2",
                                    children: categories.map(function(cat, i) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center h-4",
                                            children: catDone[i] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-4 h-4 text-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 339,
                                                columnNumber: 21
                                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-3 h-3', i === (current.categoryIndex || 0) ? 'text-accent-primary fill-accent-primary' : 'text-border-subtle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 341,
                                                columnNumber: 21
                                            }, _this)
                                        }, cat.id, false, {
                                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, _this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 332,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: function() {
                                        if ("TURBOPACK compile-time truthy", 1) {
                                            localStorage.removeItem('skillcheck_answers');
                                        }
                                        setAnswers({});
                                        setIdx(0);
                                        var qs = buildQuestions(assessmentType);
                                        setQuestions(qs);
                                        setMode('assessment');
                                    },
                                    children: "Reset"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: function() {
                                        return setMode('results');
                                    },
                                    children: "Finish"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 370,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-5 sm:grid-cols-10 gap-2",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10
                                ].map(function(v) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: currentAnswer === v ? 'default' : 'outline',
                                        onClick: function() {
                                            return handleAnswer(current.id, v);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-mono tabular-nums text-base sm:text-lg md:text-xl', 'min-w-[40px] sm:min-w-[48px] md:min-w-[52px]', currentAnswer === v ? 'text-white' : 'text-text-primary'),
                                        style: currentAnswer === v ? {
                                            backgroundColor: ratingColor(v),
                                            borderColor: ratingColor(v)
                                        } : {
                                            borderColor: ratingColor(v),
                                            color: ratingColor(v)
                                        },
                                        children: v
                                    }, v, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 378,
                                        columnNumber: 17
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        disabled: idx === 0,
                                        onClick: function() {
                                            return setIdx(function(i) {
                                                return Math.max(0, i - 1);
                                            });
                                        },
                                        children: "Previous"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: function() {
                                            if (idx < questions.length - 1) {
                                                setIdx(function(i) {
                                                    return i + 1;
                                                });
                                            } else {
                                                setMode('results');
                                            }
                                        },
                                        children: "Next"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg sm:text-xl font-semibold min-h-[4.2em] leading-relaxed break-words",
                                children: current.text
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "text-base",
                                children: "Categories"
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: categories.map(function(cat, i) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-text-primary flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 text-right text-text-muted",
                                                        children: [
                                                            i + 1,
                                                            "."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 21
                                                    }, _this),
                                                    cat.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 438,
                                                columnNumber: 19
                                            }, _this),
                                            catDone[i] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-4 h-4 text-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 443,
                                                columnNumber: 21
                                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-3 h-3', i === (current.categoryIndex || 0) ? 'text-accent-primary fill-accent-primary' : 'text-border-subtle')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 445,
                                                columnNumber: 21
                                            }, _this)
                                        ]
                                    }, cat.id, true, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, _this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                    lineNumber: 427,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
            lineNumber: 319,
            columnNumber: 7
        }, _this);
    }
    // Results Mode
    if (mode === 'results' && results) {
        var radar = Object.values(results.cats).map(function(c) {
            return {
                subject: c.name,
                score: Math.round(c.score),
                fullMark: 100
            };
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-center text-2xl sm:text-3xl",
                            children: [
                                "Overall: ",
                                Math.round(results.overall),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                            lineNumber: 475,
                            columnNumber: 13
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                        lineNumber: 474,
                        columnNumber: 11
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[320px] sm:h-[420px] md:h-[70vh] w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$RadarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadarChart"], {
                                        data: radar,
                                        outerRadius: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? '70%' : '85%',
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarGrid"], {}, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 488,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarAngleAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarAngleAxis"], {
                                                dataKey: "subject",
                                                tick: {
                                                    fontSize: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? 10 : 14
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 489,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$PolarRadiusAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PolarRadiusAxis"], {
                                                angle: 90,
                                                domain: [
                                                    0,
                                                    100
                                                ],
                                                tick: {
                                                    fontSize: ("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth < 600 ? 9 : 12
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Radar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                                name: "Score",
                                                dataKey: "score",
                                                stroke: "#2563eb",
                                                fill: "#3b82f6",
                                                fillOpacity: 0.3,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                                lineNumber: 502,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                        lineNumber: 482,
                                        columnNumber: 17
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 481,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: function() {
                                        return setMode('setup');
                                    },
                                    children: "New Assessment"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                    lineNumber: 514,
                                    columnNumber: 15
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                        lineNumber: 479,
                        columnNumber: 11
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
                lineNumber: 473,
                columnNumber: 9
            }, _this)
        }, void 0, false, {
            fileName: "[project]/src/components/modules/skill-check/skill-check.tsx",
            lineNumber: 472,
            columnNumber: 7
        }, _this);
    }
    return null;
};
_s(SkillCheck, "3UJaGHMJe9SGqpYC8Y/dgwPAiGI=");
_c = SkillCheck;
var _c;
__turbopack_context__.k.register(_c, "SkillCheck");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
var Slider = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, _param_value = _param.value, value = _param_value === void 0 ? [
        0
    ] : _param_value, onValueChange = _param.onValueChange, _param_min = _param.min, min = _param_min === void 0 ? 0 : _param_min, _param_max = _param.max, max = _param_max === void 0 ? 100 : _param_max, _param_step = _param.step, step = _param_step === void 0 ? 1 : _param_step, disabled = _param.disabled, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className",
        "value",
        "onValueChange",
        "min",
        "max",
        "step",
        "disabled"
    ]);
    var handleChange = function(e) {
        var newValue = parseFloat(e.target.value);
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange([
            newValue
        ]);
    };
    var percentage = (value[0] - Number(min)) / (Number(max) - Number(min)) * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none select-none items-center", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
            ref: ref,
            type: "range",
            min: min,
            max: max,
            step: step,
            value: value[0],
            onChange: handleChange,
            disabled: disabled,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full h-2 rounded-full appearance-none cursor-pointer", "bg-bg-raised", "disabled:cursor-not-allowed disabled:opacity-50", "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5", "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bg-raised", "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent-primary", "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110", "[&::-webkit-slider-thumb]:focus-visible:outline-2 [&::-webkit-slider-thumb]:focus-visible:outline-accent-primary [&::-webkit-slider-thumb]:focus-visible:outline-offset-2", "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full", "[&::-moz-range-thumb]:bg-bg-raised [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent-primary", "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-110", "[&::-moz-range-thumb]:focus-visible:outline-2 [&::-moz-range-thumb]:focus-visible:outline-accent-primary [&::-moz-range-thumb]:focus-visible:outline-offset-2"),
            style: {
                background: "linear-gradient(to right, #4C8DFF 0%, #4C8DFF ".concat(percentage, "%, #0E1014 ").concat(percentage, "%, #0E1014 100%)")
            }
        }, props), void 0, false, {
            fileName: "[project]/src/components/ui/slider.tsx",
            lineNumber: 23,
            columnNumber: 9
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/slider.tsx",
        lineNumber: 22,
        columnNumber: 7
    }, _this);
});
_c1 = Slider;
Slider.displayName = "Slider";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Slider$React.forwardRef");
__turbopack_context__.k.register(_c1, "Slider");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_without_properties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
;
;
;
var labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = function(_param, ref) {
    var className = _param.className, props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_without_properties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])({
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className)
    }, props), void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, _this);
});
_c1 = Label;
Label.displayName = "Label";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/modules/weight-class/weight-class-tool.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WeightClassTool",
    ()=>WeightClassTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// IBJJF Weight Classes Data (verified against official rules)
// Note: Weights are in pounds (lbs)
var weightClasses = {
    male: {
        juvenile: {
            gi: [
                {
                    name: 'Super Feather',
                    min: 0,
                    max: 120,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 120.1,
                    max: 135,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 135.1,
                    max: 150,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 150.1,
                    max: 165,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 165.1,
                    max: 180,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 180.1,
                    max: 195,
                    portuguese: 'Pesado'
                },
                {
                    name: 'Super Heavy',
                    min: 195.1,
                    max: 999,
                    portuguese: 'Super Pesado'
                }
            ],
            nogi: [
                {
                    name: 'Super Feather',
                    min: 0,
                    max: 116,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 116.1,
                    max: 131,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 131.1,
                    max: 146,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 146.1,
                    max: 161,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 161.1,
                    max: 176,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 176.1,
                    max: 191,
                    portuguese: 'Pesado'
                },
                {
                    name: 'Super Heavy',
                    min: 191.1,
                    max: 999,
                    portuguese: 'Super Pesado'
                }
            ]
        },
        adult: {
            gi: [
                {
                    name: 'Rooster',
                    min: 0,
                    max: 127.5,
                    portuguese: 'Galo'
                },
                {
                    name: 'Super Feather',
                    min: 127.6,
                    max: 141,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 141.1,
                    max: 154,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 154.1,
                    max: 167.5,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 167.6,
                    max: 181,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 181.1,
                    max: 194.5,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 194.6,
                    max: 207.5,
                    portuguese: 'Pesado'
                },
                {
                    name: 'Super Heavy',
                    min: 207.6,
                    max: 221,
                    portuguese: 'Super Pesado'
                },
                {
                    name: 'Ultra Heavy',
                    min: 221.1,
                    max: 999,
                    portuguese: 'Pesadíssimo'
                }
            ],
            nogi: [
                {
                    name: 'Rooster',
                    min: 0,
                    max: 123.5,
                    portuguese: 'Galo'
                },
                {
                    name: 'Super Feather',
                    min: 123.6,
                    max: 137,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 137.1,
                    max: 150,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 150.1,
                    max: 163.5,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 163.6,
                    max: 177,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 177.1,
                    max: 190.5,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 190.6,
                    max: 203.5,
                    portuguese: 'Pesado'
                },
                {
                    name: 'Super Heavy',
                    min: 203.6,
                    max: 217,
                    portuguese: 'Super Pesado'
                },
                {
                    name: 'Ultra Heavy',
                    min: 217.1,
                    max: 999,
                    portuguese: 'Pesadíssimo'
                }
            ]
        }
    },
    female: {
        juvenile: {
            gi: [
                {
                    name: 'Super Feather',
                    min: 0,
                    max: 115,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 115.1,
                    max: 130,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 130.1,
                    max: 145,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 145.1,
                    max: 160,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 160.1,
                    max: 999,
                    portuguese: 'Meio-Pesado'
                }
            ],
            nogi: [
                {
                    name: 'Super Feather',
                    min: 0,
                    max: 111,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 111.1,
                    max: 126,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 126.1,
                    max: 141,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 141.1,
                    max: 156,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 156.1,
                    max: 999,
                    portuguese: 'Meio-Pesado'
                }
            ]
        },
        adult: {
            gi: [
                {
                    name: 'Rooster',
                    min: 0,
                    max: 107,
                    portuguese: 'Galo'
                },
                {
                    name: 'Super Feather',
                    min: 107.1,
                    max: 120,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 120.1,
                    max: 135,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 135.1,
                    max: 150,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 150.1,
                    max: 165,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 165.1,
                    max: 180,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 180.1,
                    max: 999,
                    portuguese: 'Pesado'
                }
            ],
            nogi: [
                {
                    name: 'Rooster',
                    min: 0,
                    max: 103,
                    portuguese: 'Galo'
                },
                {
                    name: 'Super Feather',
                    min: 103.1,
                    max: 116,
                    portuguese: 'Pluma'
                },
                {
                    name: 'Feather',
                    min: 116.1,
                    max: 131,
                    portuguese: 'Pena'
                },
                {
                    name: 'Light',
                    min: 131.1,
                    max: 146,
                    portuguese: 'Leve'
                },
                {
                    name: 'Middle',
                    min: 146.1,
                    max: 161,
                    portuguese: 'Médio'
                },
                {
                    name: 'Medium Heavy',
                    min: 161.1,
                    max: 177,
                    portuguese: 'Meio-Pesado'
                },
                {
                    name: 'Heavy',
                    min: 177.1,
                    max: 999,
                    portuguese: 'Pesado'
                }
            ]
        }
    }
};
// Gi sizing matrix based on standard IBJJF/AJP sizing charts
// Note: Heights in cm, weights in kg
var giSizes = {
    A0: {
        heightMin: 147,
        heightMax: 154,
        weightMin: 43,
        weightMax: 49
    },
    A1: {
        heightMin: 157,
        heightMax: 165,
        weightMin: 49,
        weightMax: 63
    },
    A2: {
        heightMin: 165,
        heightMax: 175,
        weightMin: 63,
        weightMax: 77
    },
    A2L: {
        heightMin: 177,
        heightMax: 183,
        weightMin: 63,
        weightMax: 77
    },
    A2H: {
        heightMin: 165,
        heightMax: 175,
        weightMin: 77,
        weightMax: 86
    },
    A3: {
        heightMin: 175,
        heightMax: 185,
        weightMin: 86,
        weightMax: 90
    },
    A3L: {
        heightMin: 187,
        heightMax: 193,
        weightMin: 86,
        weightMax: 90
    },
    A3H: {
        heightMin: 175,
        heightMax: 185,
        weightMin: 90,
        weightMax: 99
    },
    A4: {
        heightMin: 183,
        heightMax: 193,
        weightMin: 90,
        weightMax: 113
    },
    A5: {
        heightMin: 183,
        heightMax: 193,
        weightMin: 102,
        weightMax: 124
    },
    A6: {
        heightMin: 187,
        heightMax: 198,
        weightMin: 113,
        weightMax: 136
    }
};
var WeightClassTool = function() {
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(170), 2), weight = _useState[0], setWeight = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(175), 2), height = _useState1[0], setHeight = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('male'), 2), gender = _useState2[0], setGender = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('adult'), 2), ageCategory = _useState3[0], setAgeCategory = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('lbs'), 2), units = _useState4[0], setUnits = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cm'), 2), heightUnits = _useState5[0], setHeightUnits = _useState5[1];
    // Convert units
    var convertWeight = function(value, fromUnit) {
        if (fromUnit === 'lbs') return value * 0.453592; // to kg
        return value / 0.453592; // to lbs
    };
    var convertHeight = function(value, fromUnit) {
        if (fromUnit === 'ft') return value * 30.48; // to cm
        return value / 30.48; // to ft
    };
    // Get weight in consistent units (lbs for calculations)
    var getWeightInLbs = function() {
        return units === 'lbs' ? weight : convertWeight(weight, 'kg');
    };
    var getHeightInCm = function() {
        return heightUnits === 'cm' ? height : convertHeight(height, 'ft');
    };
    // Find weight class
    var findWeightClass = function(type) {
        var weightInLbs = getWeightInLbs();
        var classes = weightClasses[gender][ageCategory][type];
        return classes.find(function(cls) {
            return weightInLbs >= cls.min && weightInLbs <= cls.max;
        }) || classes[classes.length - 1]; // default to heaviest if over
    };
    // Find possible gi sizes
    var findGiSizes = function() {
        var heightInCm = getHeightInCm();
        var weightInKg = units === 'kg' ? weight : convertWeight(weight, 'lbs');
        var possibleSizes = [];
        Object.entries(giSizes).forEach(function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), size = _param[0], range = _param[1];
            var heightFits = heightInCm >= range.heightMin && heightInCm <= range.heightMax;
            var weightFits = weightInKg >= range.weightMin && weightInKg <= range.weightMax;
            if (heightFits && weightFits) {
                possibleSizes.push({
                    size: size,
                    perfect: true
                });
            } else if (heightFits || weightFits) {
                possibleSizes.push({
                    size: size,
                    perfect: false
                });
            }
        });
        return possibleSizes.sort(function(a, b) {
            if (a.perfect && !b.perfect) return -1;
            if (!a.perfect && b.perfect) return 1;
            return a.size.localeCompare(b.size);
        });
    };
    var giClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WeightClassTool.useMemo[giClass]": function() {
            return findWeightClass('gi');
        }
    }["WeightClassTool.useMemo[giClass]"], [
        weight,
        units,
        gender,
        ageCategory
    ]);
    var nogiClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WeightClassTool.useMemo[nogiClass]": function() {
            return findWeightClass('nogi');
        }
    }["WeightClassTool.useMemo[nogiClass]"], [
        weight,
        units,
        gender,
        ageCategory
    ]);
    var possibleGiSizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WeightClassTool.useMemo[possibleGiSizes]": function() {
            return findGiSizes();
        }
    }["WeightClassTool.useMemo[possibleGiSizes]"], [
        weight,
        height,
        units,
        heightUnits
    ]);
    var weightMin = units === 'lbs' ? 100 : 45;
    var weightMax = units === 'lbs' ? 300 : 136;
    var heightMin = heightUnits === 'cm' ? 140 : 4.6;
    var heightMax = heightUnits === 'cm' ? 210 : 6.9;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto space-y-6 p-4 sm:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, _this),
                                "BJJ Weight Class & Gi Size Calculator"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-text-muted",
                            children: "Find your IBJJF division and recommended gi sizes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-lg font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, _this),
                                        "Your Information"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Gender"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 p-1 bg-bg-raised rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: gender === 'male' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                return setGender('male');
                                                            },
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Male"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 21
                                                                }, _this),
                                                                gender === 'male' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-4 h-4 ml-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 232,
                                                                    columnNumber: 43
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: gender === 'female' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                return setGender('female');
                                                            },
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Female"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 21
                                                                }, _this),
                                                                gender === 'female' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-4 h-4 ml-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 45
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 234,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Age Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 p-1 bg-bg-raised rounded-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: ageCategory === 'juvenile' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                return setAgeCategory('juvenile');
                                                            },
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Juvenile"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 21
                                                                }, _this),
                                                                ageCategory === 'juvenile' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-4 h-4 ml-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 52
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: ageCategory === 'adult' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                return setAgeCategory('adult');
                                                            },
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Adult/Masters"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 263,
                                                                    columnNumber: 21
                                                                }, _this),
                                                                ageCategory === 'adult' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                    className: "w-4 h-4 ml-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 49
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Weight"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1 p-1 bg-bg-raised rounded-md",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: units === 'lbs' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                if (units === 'kg') {
                                                                    setWeight(Math.round(weight * 2.20462));
                                                                    setUnits('lbs');
                                                                }
                                                            },
                                                            className: "h-7 px-2 text-xs",
                                                            children: "lbs"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: units === 'kg' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                if (units === 'lbs') {
                                                                    setWeight(Math.round(weight / 2.20462));
                                                                    setUnits('kg');
                                                                }
                                                            },
                                                            className: "h-7 px-2 text-xs",
                                                            children: "kg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 272,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        weight
                                                    ],
                                                    onValueChange: function(value) {
                                                        return setWeight(value[0]);
                                                    },
                                                    min: weightMin,
                                                    max: weightMax,
                                                    step: units === 'lbs' ? 1 : 0.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center text-xs text-text-muted",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                weightMin,
                                                                " ",
                                                                units
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-bold text-text-primary",
                                                            children: [
                                                                weight,
                                                                " ",
                                                                units,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-normal text-text-muted ml-1",
                                                                    children: [
                                                                        "(",
                                                                        units === 'lbs' ? Math.round(weight * 0.453592) : Math.round(weight / 0.453592),
                                                                        " ",
                                                                        units === 'lbs' ? 'kg' : 'lbs',
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                    lineNumber: 315,
                                                                    columnNumber: 21
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                weightMax,
                                                                " ",
                                                                units
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 303,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Height (for gi sizing)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-1 p-1 bg-bg-raised rounded-md",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: heightUnits === 'cm' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                if (heightUnits === 'ft') {
                                                                    setHeight(Math.round(height * 30.48));
                                                                    setHeightUnits('cm');
                                                                }
                                                            },
                                                            className: "h-7 px-2 text-xs",
                                                            children: "cm"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 331,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: heightUnits === 'ft' ? 'default' : 'ghost',
                                                            size: "sm",
                                                            onClick: function() {
                                                                if (heightUnits === 'cm') {
                                                                    setHeight(Math.round(height / 30.48 * 10) / 10);
                                                                    setHeightUnits('ft');
                                                                }
                                                            },
                                                            className: "h-7 px-2 text-xs",
                                                            children: "ft"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 328,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                    value: [
                                                        height
                                                    ],
                                                    onValueChange: function(value) {
                                                        return setHeight(value[0]);
                                                    },
                                                    min: heightMin,
                                                    max: heightMax,
                                                    step: heightUnits === 'cm' ? 1 : 0.1
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center text-xs text-text-muted",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                heightMin,
                                                                " ",
                                                                heightUnits
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-bold text-text-primary",
                                                            children: [
                                                                height,
                                                                " ",
                                                                heightUnits
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 19
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                heightMax,
                                                                " ",
                                                                heightUnits
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 19
                                                        }, _this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 17
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, _this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6 pt-6 border-t border-border-subtle",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-lg font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 381,
                                            columnNumber: 15
                                        }, _this),
                                        "Your Classifications"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "bg-blue-500/10 border-blue-500/30",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "pt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-semibold text-blue-400 mb-2",
                                                        children: "Gi Division"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-2xl font-bold text-blue-300 mb-1",
                                                        children: giClass.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-blue-400/80 mb-2",
                                                        children: [
                                                            "(",
                                                            giClass.portuguese,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-blue-400/70",
                                                        children: [
                                                            giClass.min,
                                                            "-",
                                                            giClass.max === 999 ? '∞' : giClass.max,
                                                            " lbs",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-400/50 ml-1",
                                                                children: [
                                                                    "(",
                                                                    Math.round(giClass.min * 0.453592 * 10) / 10,
                                                                    "-",
                                                                    giClass.max === 999 ? '∞' : Math.round(giClass.max * 0.453592 * 10) / 10,
                                                                    " kg)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 394,
                                                                columnNumber: 21
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-400/50 ml-1",
                                                                children: "(Gi weight included)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 21
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 19
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, _this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 387,
                                            columnNumber: 15
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "bg-purple-500/10 border-purple-500/30",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "pt-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-semibold text-purple-400 mb-2",
                                                        children: "No-Gi Division"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-2xl font-bold text-purple-300 mb-1",
                                                        children: nogiClass.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-purple-400/80 mb-2",
                                                        children: [
                                                            "(",
                                                            nogiClass.portuguese,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-purple-400/70",
                                                        children: [
                                                            nogiClass.min,
                                                            "-",
                                                            nogiClass.max === 999 ? '∞' : nogiClass.max,
                                                            " lbs",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-purple-400/50 ml-1",
                                                                children: [
                                                                    "(",
                                                                    Math.round(nogiClass.min * 0.453592 * 10) / 10,
                                                                    "-",
                                                                    nogiClass.max === 999 ? '∞' : Math.round(nogiClass.max * 0.453592 * 10) / 10,
                                                                    " kg)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 21
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 406,
                                                        columnNumber: 19
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, _this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                            lineNumber: 401,
                                            columnNumber: 15
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-green-500/10 border-green-500/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "pt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 font-semibold text-green-400 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 19
                                                    }, _this),
                                                    "Recommended Gi Sizes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, _this),
                                            possibleGiSizes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: possibleGiSizes.map(function(param) {
                                                            var size = param.size, perfect = param.perfect;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-1.5 rounded-full text-sm font-bold", perfect ? "bg-green-500 text-white" : "bg-green-500/20 text-green-400 border border-green-500/30"),
                                                                children: size
                                                            }, size, false, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 427,
                                                                columnNumber: 25
                                                            }, _this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 425,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 text-xs text-green-400/80",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 rounded-full bg-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                        lineNumber: 442,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Perfect fit based on height and weight"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                        lineNumber: 443,
                                                                        columnNumber: 25
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 441,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 rounded-full bg-green-500/20 border border-green-500/30"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                        lineNumber: 446,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Possible fit (matches height or weight)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                        lineNumber: 447,
                                                                        columnNumber: 25
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 424,
                                                columnNumber: 19
                                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-green-400/80",
                                                children: "No standard sizes match your measurements. Consider custom sizing or consult size charts."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 452,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 417,
                                    columnNumber: 13
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "bg-bg-raised",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "pt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-bold text-text-primary mb-3 text-sm",
                                                children: "Important Notes:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 462,
                                                columnNumber: 17
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-1 text-xs text-text-muted list-disc list-inside",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "These are IBJJF standard divisions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Other competitions may have different weight classes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Gi sizes can vary between manufacturers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 466,
                                                        columnNumber: 19
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: "Consider pre-shrunk vs regular gi options"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                        lineNumber: 467,
                                                        columnNumber: 19
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                                lineNumber: 463,
                                                columnNumber: 17
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, _this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, _this)
    }, void 0, false, {
        fileName: "[project]/src/components/modules/weight-class/weight-class-tool.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, _this);
};
_s(WeightClassTool, "h2vy+RFvUas2LPkbb8OO/6jcojI=");
_c = WeightClassTool;
var _c;
__turbopack_context__.k.register(_c, "WeightClassTool");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f646179e._.js.map