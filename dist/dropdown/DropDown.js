"use strict";
/*
 * MIT License
 *
 * Copyright (c) 2020 Rémi Van Keisbelck
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptions = exports.update = exports.ViewDropDown = exports.open = void 0;
const React = __importStar(require("react"));
const common_1 = require("../common");
const react_tea_cup_1 = require("react-tea-cup");
function errorModel(e) {
    return {
        tag: 'error',
        e,
    };
}
function gotRenderedBox(r) {
    return {
        tag: 'got-rendered-box',
        r,
    };
}
function gotInitData(r) {
    return {
        tag: 'got-init-data',
        r,
    };
}
const noop = {
    tag: 'noop',
};
const requestClose = {
    tag: 'request-close',
};
function open(getRefBox) {
    const model = {
        tag: 'fresh',
    };
    const getInitData = getRefBox.andThen((refBox) => common_1.getWindowDimensions.andThen((windowDimensions) => react_tea_cup_1.uuid().map((uuid) => ({ refBox, windowDimensions, uuid }))));
    const cmd = react_tea_cup_1.Task.attempt(getInitData, gotInitData);
    return [model, cmd];
}
exports.open = open;
function ViewDropDown(props) {
    const { renderer, model } = props;
    switch (model.tag) {
        case 'fresh': {
            return (React.createElement("div", { className: "tm-drop-down tm-placing", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    visibility: 'hidden',
                } }, renderer()));
        }
        case 'error': {
            return React.createElement(React.Fragment, null); // TODO ?
        }
        case 'ready': {
            return model.placed
                .map((placedBox) => {
                const { p, d } = placedBox;
                return (React.createElement("div", { id: model.initData.uuid, className: "tm-drop-down tm-placed", style: {
                        position: 'absolute',
                        top: p.y,
                        left: p.x,
                        width: d.w,
                        height: d.h,
                    } }, renderer()));
            })
                .withDefaultSupply(() => {
                return (React.createElement("div", { id: model.initData.uuid, className: "tm-drop-down tm-placing", style: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        visibility: 'hidden',
                    } }, renderer()));
            });
        }
    }
}
exports.ViewDropDown = ViewDropDown;
function handleError(error) {
    console.error(error);
    return withOut(react_tea_cup_1.noCmd(errorModel(error)));
}
function withOut(mac, requestClose = false) {
    return [mac[0], mac[1], requestClose];
}
function update(msg, model) {
    switch (msg.tag) {
        case 'got-init-data': {
            if (model.tag !== 'fresh') {
                return withOut(react_tea_cup_1.noCmd(model));
            }
            return msg.r.match((initData) => {
                const newModel = {
                    tag: 'ready',
                    initData,
                    placed: react_tea_cup_1.nothing,
                };
                const cmd = react_tea_cup_1.Task.attempt(getRenderedBox(initData.uuid), gotRenderedBox);
                return [newModel, cmd, false];
            }, handleError);
        }
        case 'got-rendered-box': {
            return msg.r.match((renderedBox) => {
                if (model.tag !== 'ready') {
                    return withOut(react_tea_cup_1.noCmd(model));
                }
                const { initData } = model;
                const { windowDimensions, refBox } = initData;
                const placedBox = common_1.placeCombo(windowDimensions, refBox, renderedBox.d);
                return withOut(react_tea_cup_1.noCmd(Object.assign(Object.assign({}, model), { placed: react_tea_cup_1.just(placedBox) })));
            }, handleError);
        }
        case 'request-close': {
            return withOut([model, react_tea_cup_1.Cmd.none()], true);
        }
        case 'noop': {
            return withOut(react_tea_cup_1.noCmd(model));
        }
    }
}
exports.update = update;
function getRenderedBox(uuid) {
    return byId(uuid).map((elem) => common_1.Box.fromDomRect(elem.getBoundingClientRect()));
}
function byId(id) {
    return react_tea_cup_1.Task.fromLambda(() => {
        const e = document.getElementById(id);
        if (!e) {
            throw new Error('element not found ' + id);
        }
        return e;
    });
}
const documentEvents = new react_tea_cup_1.DocumentEvents();
function subscriptions() {
    return react_tea_cup_1.Sub.batch([
        documentEvents.on('keydown', (e) => e.key === 'Escape' ? requestClose : noop),
        documentEvents.on('mousedown', (evt) => {
            let t = evt.target;
            while (t) {
                // move up and try to find if we are inside a tea-pop DD !
                if (t.classList.contains('tm-drop-down')) {
                    return noop;
                }
                t = t.parentElement;
            }
            return requestClose;
        }),
    ]);
}
exports.subscriptions = subscriptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcERvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZHJvcGRvd24vRHJvcERvd24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCw2Q0FBK0I7QUFDL0Isc0NBQXNFO0FBQ3RFLGlEQVd1QjtBQVd2QixTQUFTLFVBQVUsQ0FBQyxDQUFRO0lBQzFCLE9BQU87UUFDTCxHQUFHLEVBQUUsT0FBTztRQUNaLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQWNELFNBQVMsY0FBYyxDQUFDLENBQXFCO0lBQzNDLE9BQU87UUFDTCxHQUFHLEVBQUUsa0JBQWtCO1FBQ3ZCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLENBQTBCO0lBQzdDLE9BQU87UUFDTCxHQUFHLEVBQUUsZUFBZTtRQUNwQixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLElBQUksR0FBUTtJQUNoQixHQUFHLEVBQUUsTUFBTTtDQUNaLENBQUM7QUFFRixNQUFNLFlBQVksR0FBUTtJQUN4QixHQUFHLEVBQUUsZUFBZTtDQUNyQixDQUFDO0FBSUYsU0FBZ0IsSUFBSSxDQUFDLFNBQTJCO0lBQzlDLE1BQU0sS0FBSyxHQUFVO1FBQ25CLEdBQUcsRUFBRSxPQUFPO0tBQ2IsQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUEwQixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDdEUsNEJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUMvQyxvQkFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDM0QsQ0FDRixDQUFDO0lBRUYs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SSxDQUFDO2lCQUNiO2dCQUNELENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpCRCxzQ0FpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUsOpbWkgVmFuIEtlaXNiZWxja1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgRGltLCBnZXRXaW5kb3dEaW1lbnNpb25zLCBwbGFjZUNvbWJvIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7XG4gIENtZCxcbiAgRG9jdW1lbnRFdmVudHMsXG4gIGp1c3QsXG4gIE1heWJlLFxuICBub0NtZCxcbiAgbm90aGluZyxcbiAgUmVzdWx0LFxuICBTdWIsXG4gIFRhc2ssXG4gIHV1aWQsXG59IGZyb20gJ3JlYWN0LXRlYS1jdXAnO1xuXG5leHBvcnQgdHlwZSBNb2RlbCA9XG4gIHwgeyB0YWc6ICdmcmVzaCcgfVxuICB8IHtcbiAgICAgIHRhZzogJ3JlYWR5JztcbiAgICAgIGluaXREYXRhOiBJbml0RGF0YTtcbiAgICAgIHBsYWNlZDogTWF5YmU8Qm94PjtcbiAgICB9XG4gIHwgeyB0YWc6ICdlcnJvcic7IGU6IEVycm9yIH07XG5cbmZ1bmN0aW9uIGVycm9yTW9kZWwoZTogRXJyb3IpOiBNb2RlbCB7XG4gIHJldHVybiB7XG4gICAgdGFnOiAnZXJyb3InLFxuICAgIGUsXG4gIH07XG59XG5cbmludGVyZmFjZSBJbml0RGF0YSB7XG4gIHJlYWRvbmx5IHJlZkJveDogQm94O1xuICByZWFkb25seSB3aW5kb3dEaW1lbnNpb25zOiBEaW07XG4gIHJlYWRvbmx5IHV1aWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXNnID1cbiAgfCB7IHRhZzogJ2dvdC1pbml0LWRhdGEnOyByOiBSZXN1bHQ8RXJyb3IsIEluaXREYXRhPiB9XG4gIHwgeyB0YWc6ICdnb3QtcmVuZGVyZWQtYm94JzsgcjogUmVzdWx0PEVycm9yLCBCb3g+IH1cbiAgfCB7IHRhZzogJ3JlcXVlc3QtY2xvc2UnIH1cbiAgfCB7IHRhZzogJ25vb3AnIH07XG5cbmZ1bmN0aW9uIGdvdFJlbmRlcmVkQm94KHI6IFJlc3VsdDxFcnJvciwgQm94Pik6IE1zZyB7XG4gIHJldHVybiB7XG4gICAgdGFnOiAnZ290LXJlbmRlcmVkLWJveCcsXG4gICAgcixcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ290SW5pdERhdGEocjogUmVzdWx0PEVycm9yLCBJbml0RGF0YT4pOiBNc2cge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2dvdC1pbml0LWRhdGEnLFxuICAgIHIsXG4gIH07XG59XG5cbmNvbnN0IG5vb3A6IE1zZyA9IHtcbiAgdGFnOiAnbm9vcCcsXG59O1xuXG5jb25zdCByZXF1ZXN0Q2xvc2U6IE1zZyA9IHtcbiAgdGFnOiAncmVxdWVzdC1jbG9zZScsXG59O1xuXG5leHBvcnQgdHlwZSBSZW5kZXJlciA9ICgpID0+IFJlYWN0LlJlYWN0Tm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW4oZ2V0UmVmQm94OiBUYXNrPEVycm9yLCBCb3g+KTogW01vZGVsLCBDbWQ8TXNnPl0ge1xuICBjb25zdCBtb2RlbDogTW9kZWwgPSB7XG4gICAgdGFnOiAnZnJlc2gnLFxuICB9O1xuICBjb25zdCBnZXRJbml0RGF0YTogVGFzazxFcnJvciwgSW5pdERhdGE+ID0gZ2V0UmVmQm94LmFuZFRoZW4oKHJlZkJveCkgPT5cbiAgICBnZXRXaW5kb3dEaW1lbnNpb25zLmFuZFRoZW4oKHdpbmRvd0RpbWVuc2lvbnMpID0+XG4gICAgICB1dWlkKCkubWFwKCh1dWlkKSA9PiAoeyByZWZCb3gsIHdpbmRvd0RpbWVuc2lvbnMsIHV1aWQgfSkpLFxuICAgICksXG4gICk7XG5cbiAgY29uc3QgY21kOiBDbWQ8TXNnPiA9IFRhc2suYXR0ZW1wdChnZXRJbml0RGF0YSwgZ290SW5pdERhdGEpO1xuICByZXR1cm4gW21vZGVsLCBjbWRdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdEcm9wRG93blByb3BzIHtcbiAgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyO1xuICByZWFkb25seSBtb2RlbDogTW9kZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWaWV3RHJvcERvd24ocHJvcHM6IFZpZXdEcm9wRG93blByb3BzKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgeyByZW5kZXJlciwgbW9kZWwgfSA9IHByb3BzO1xuICBzd2l0Y2ggKG1vZGVsLnRhZykge1xuICAgIGNhc2UgJ2ZyZXNoJzoge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInRtLWRyb3AtZG93biB0bS1wbGFjaW5nXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtyZW5kZXJlcigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgcmV0dXJuIDw+PC8+OyAvLyBUT0RPID9cbiAgICB9XG4gICAgY2FzZSAncmVhZHknOiB7XG4gICAgICByZXR1cm4gbW9kZWwucGxhY2VkXG4gICAgICAgIC5tYXAoKHBsYWNlZEJveCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgcCwgZCB9ID0gcGxhY2VkQm94O1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGlkPXttb2RlbC5pbml0RGF0YS51dWlkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0bS1kcm9wLWRvd24gdG0tcGxhY2VkXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICB0b3A6IHAueSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBwLngsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGQudyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGQuaCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3JlbmRlcmVyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAud2l0aERlZmF1bHRTdXBwbHkoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGlkPXttb2RlbC5pbml0RGF0YS51dWlkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0bS1kcm9wLWRvd24gdG0tcGxhY2luZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtyZW5kZXJlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBFcnJvcik6IFtNb2RlbCwgQ21kPE1zZz4sIFJlcXVlc3RDbG9zZV0ge1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgcmV0dXJuIHdpdGhPdXQobm9DbWQoZXJyb3JNb2RlbChlcnJvcikpKTtcbn1cblxuZXhwb3J0IHR5cGUgUmVxdWVzdENsb3NlID0gYm9vbGVhbjtcblxuZnVuY3Rpb24gd2l0aE91dChcbiAgbWFjOiBbTW9kZWwsIENtZDxNc2c+XSxcbiAgcmVxdWVzdENsb3NlOiBSZXF1ZXN0Q2xvc2UgPSBmYWxzZSxcbik6IFtNb2RlbCwgQ21kPE1zZz4sIFJlcXVlc3RDbG9zZV0ge1xuICByZXR1cm4gW21hY1swXSwgbWFjWzFdLCByZXF1ZXN0Q2xvc2VdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKFxuICBtc2c6IE1zZyxcbiAgbW9kZWw6IE1vZGVsLFxuKTogW01vZGVsLCBDbWQ8TXNnPiwgUmVxdWVzdENsb3NlXSB7XG4gIHN3aXRjaCAobXNnLnRhZykge1xuICAgIGNhc2UgJ2dvdC1pbml0LWRhdGEnOiB7XG4gICAgICBpZiAobW9kZWwudGFnICE9PSAnZnJlc2gnKSB7XG4gICAgICAgIHJldHVybiB3aXRoT3V0KG5vQ21kKG1vZGVsKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnLnIubWF0Y2goKGluaXREYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld01vZGVsOiBNb2RlbCA9IHtcbiAgICAgICAgICB0YWc6ICdyZWFkeScsXG4gICAgICAgICAgaW5pdERhdGEsXG4gICAgICAgICAgcGxhY2VkOiBub3RoaW5nLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbWQ6IENtZDxNc2c+ID0gVGFzay5hdHRlbXB0KFxuICAgICAgICAgIGdldFJlbmRlcmVkQm94KGluaXREYXRhLnV1aWQpLFxuICAgICAgICAgIGdvdFJlbmRlcmVkQm94LFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gW25ld01vZGVsLCBjbWQsIGZhbHNlXTtcbiAgICAgIH0sIGhhbmRsZUVycm9yKTtcbiAgICB9XG4gICAgY2FzZSAnZ290LXJlbmRlcmVkLWJveCc6IHtcbiAgICAgIHJldHVybiBtc2cuci5tYXRjaCgocmVuZGVyZWRCb3gpID0+IHtcbiAgICAgICAgaWYgKG1vZGVsLnRhZyAhPT0gJ3JlYWR5Jykge1xuICAgICAgICAgIHJldHVybiB3aXRoT3V0KG5vQ21kKG1vZGVsKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBpbml0RGF0YSB9ID0gbW9kZWw7XG4gICAgICAgIGNvbnN0IHsgd2luZG93RGltZW5zaW9ucywgcmVmQm94IH0gPSBpbml0RGF0YTtcbiAgICAgICAgY29uc3QgcGxhY2VkQm94ID0gcGxhY2VDb21ibyh3aW5kb3dEaW1lbnNpb25zLCByZWZCb3gsIHJlbmRlcmVkQm94LmQpO1xuICAgICAgICByZXR1cm4gd2l0aE91dChcbiAgICAgICAgICBub0NtZCh7XG4gICAgICAgICAgICAuLi5tb2RlbCxcbiAgICAgICAgICAgIHBsYWNlZDoganVzdChwbGFjZWRCb3gpLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfSwgaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgICBjYXNlICdyZXF1ZXN0LWNsb3NlJzoge1xuICAgICAgcmV0dXJuIHdpdGhPdXQoW21vZGVsLCBDbWQubm9uZSgpXSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhc2UgJ25vb3AnOiB7XG4gICAgICByZXR1cm4gd2l0aE91dChub0NtZChtb2RlbCkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSZW5kZXJlZEJveCh1dWlkOiBzdHJpbmcpOiBUYXNrPEVycm9yLCBCb3g+IHtcbiAgcmV0dXJuIGJ5SWQodXVpZCkubWFwKChlbGVtKSA9PlxuICAgIEJveC5mcm9tRG9tUmVjdChlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gYnlJZChpZDogc3RyaW5nKTogVGFzazxFcnJvciwgSFRNTEVsZW1lbnQ+IHtcbiAgcmV0dXJuIFRhc2suZnJvbUxhbWJkYSgoKSA9PiB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBpZiAoIWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudCBub3QgZm91bmQgJyArIGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH0pO1xufVxuXG5jb25zdCBkb2N1bWVudEV2ZW50cyA9IG5ldyBEb2N1bWVudEV2ZW50cygpO1xuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaXB0aW9ucygpOiBTdWI8TXNnPiB7XG4gIHJldHVybiBTdWIuYmF0Y2goW1xuICAgIGRvY3VtZW50RXZlbnRzLm9uKCdrZXlkb3duJywgKGUpID0+XG4gICAgICBlLmtleSA9PT0gJ0VzY2FwZScgPyByZXF1ZXN0Q2xvc2UgOiBub29wLFxuICAgICksXG4gICAgZG9jdW1lbnRFdmVudHMub24oJ21vdXNlZG93bicsIChldnQpID0+IHtcbiAgICAgIGxldCB0OiBIVE1MRWxlbWVudCB8IG51bGwgPSBldnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgd2hpbGUgKHQpIHtcbiAgICAgICAgLy8gbW92ZSB1cCBhbmQgdHJ5IHRvIGZpbmQgaWYgd2UgYXJlIGluc2lkZSBhIHRlYS1wb3AgREQgIVxuICAgICAgICBpZiAodC5jbGFzc0xpc3QuY29udGFpbnMoJ3RtLWRyb3AtZG93bicpKSB7XG4gICAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgdCA9IHQucGFyZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXF1ZXN0Q2xvc2U7XG4gICAgfSksXG4gIF0pO1xufVxuIl19