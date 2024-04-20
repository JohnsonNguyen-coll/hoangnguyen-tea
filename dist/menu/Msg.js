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
Object.defineProperty(exports, "__esModule", { value: true });
exports.docMouseDown = exports.gotItemBox = exports.childMsg = exports.gotKeyDown = exports.gotMenuBox = exports.gotUuid = exports.gotWindowDimensions = exports.noop = void 0;
function noop() {
    return { tag: 'noop' };
}
exports.noop = noop;
function gotWindowDimensions(d) {
    return {
        tag: 'got-window-dimensions',
        d,
    };
}
exports.gotWindowDimensions = gotWindowDimensions;
function gotUuid(uuid) {
    return {
        tag: 'got-uuid',
        uuid,
    };
}
exports.gotUuid = gotUuid;
function gotMenuBox(r) {
    return {
        tag: 'got-menu-box',
        r,
    };
}
exports.gotMenuBox = gotMenuBox;
function gotKeyDown(key) {
    return {
        tag: 'key-down',
        key,
    };
}
exports.gotKeyDown = gotKeyDown;
function childMsg(m) {
    return {
        tag: 'child-msg',
        m,
    };
}
exports.childMsg = childMsg;
function gotItemBox(item, r, subMenuCounter, selectFirst) {
    return {
        tag: 'got-item-box',
        item,
        selectFirst,
        r,
        subMenuCounter,
    };
}
exports.gotItemBox = gotItemBox;
function docMouseDown() {
    return {
        tag: 'doc-mouse-down',
    };
}
exports.docMouseDown = docMouseDown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXNnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lbnUvTXNnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7OztBQXlCSCxTQUFnQixJQUFJO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUZELG9CQUVDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUksQ0FBTTtJQUMzQyxPQUFPO1FBQ0wsR0FBRyxFQUFFLHVCQUF1QjtRQUM1QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFMRCxrREFLQztBQUVELFNBQWdCLE9BQU8sQ0FBSSxJQUFZO0lBQ3JDLE9BQU87UUFDTCxHQUFHLEVBQUUsVUFBVTtRQUNmLElBQUk7S0FDTCxDQUFDO0FBQ0osQ0FBQztBQUxELDBCQUtDO0FBRUQsU0FBZ0IsVUFBVSxDQUFJLENBQXFCO0lBQ2pELE9BQU87UUFDTCxHQUFHLEVBQUUsY0FBYztRQUNuQixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLFVBQVUsQ0FBSSxHQUFXO0lBQ3ZDLE9BQU87UUFDTCxHQUFHLEVBQUUsVUFBVTtRQUNmLEdBQUc7S0FDSixDQUFDO0FBQ0osQ0FBQztBQUxELGdDQUtDO0FBRUQsU0FBZ0IsUUFBUSxDQUFJLENBQVM7SUFDbkMsT0FBTztRQUNMLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUxELDRCQUtDO0FBRUQsU0FBZ0IsVUFBVSxDQUN4QixJQUFpQixFQUNqQixDQUFxQixFQUNyQixjQUFzQixFQUN0QixXQUFvQjtJQUVwQixPQUFPO1FBQ0wsR0FBRyxFQUFFLGNBQWM7UUFDbkIsSUFBSTtRQUNKLFdBQVc7UUFDWCxDQUFDO1FBQ0QsY0FBYztLQUNmLENBQUM7QUFDSixDQUFDO0FBYkQsZ0NBYUM7QUFFRCxTQUFnQixZQUFZO0lBQzFCLE9BQU87UUFDTCxHQUFHLEVBQUUsZ0JBQWdCO0tBQ3RCLENBQUM7QUFDSixDQUFDO0FBSkQsb0NBSUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUsOpbWkgVmFuIEtlaXNiZWxja1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCB7IERpbSwgQm94IH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ3JlYWN0LXRlYS1jdXAnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuL01lbnUnO1xuXG5leHBvcnQgdHlwZSBNc2c8VD4gPVxuICB8IHsgdGFnOiAnZ290LXdpbmRvdy1kaW1lbnNpb25zJzsgZDogRGltIH1cbiAgfCB7IHRhZzogJ2dvdC11dWlkJzsgdXVpZDogc3RyaW5nIH1cbiAgfCB7IHRhZzogJ2dvdC1tZW51LWJveCc7IHI6IFJlc3VsdDxFcnJvciwgQm94PiB9XG4gIHwgeyB0YWc6ICdrZXktZG93bic7IGtleTogc3RyaW5nIH1cbiAgfCB7IHRhZzogJ21vdXNlLW1vdmUnOyBpdGVtOiBNZW51SXRlbTxUPjsgaXRlbUluZGV4OiBudW1iZXIgfVxuICB8IHsgdGFnOiAnbW91c2UtbGVhdmUnOyBpdGVtOiBNZW51SXRlbTxUPjsgaXRlbUluZGV4OiBudW1iZXIgfVxuICB8IHtcbiAgICAgIHRhZzogJ2dvdC1pdGVtLWJveCc7XG4gICAgICBpdGVtOiBNZW51SXRlbTxUPjtcbiAgICAgIHI6IFJlc3VsdDxFcnJvciwgQm94PjtcbiAgICAgIHNlbGVjdEZpcnN0OiBib29sZWFuO1xuICAgICAgc3ViTWVudUNvdW50ZXI6IG51bWJlcjtcbiAgICB9XG4gIHwgeyB0YWc6ICdpdGVtLWNsaWNrZWQnOyBpdGVtOiBNZW51SXRlbTxUPiB9XG4gIHwgeyB0YWc6ICdjaGlsZC1tc2cnOyBtOiBNc2c8VD4gfVxuICB8IHsgdGFnOiAnZG9jLW1vdXNlLWRvd24nIH1cbiAgfCB7IHRhZzogJ25vb3AnIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wPFQ+KCk6IE1zZzxUPiB7XG4gIHJldHVybiB7IHRhZzogJ25vb3AnIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnb3RXaW5kb3dEaW1lbnNpb25zPFQ+KGQ6IERpbSk6IE1zZzxUPiB7XG4gIHJldHVybiB7XG4gICAgdGFnOiAnZ290LXdpbmRvdy1kaW1lbnNpb25zJyxcbiAgICBkLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ290VXVpZDxUPih1dWlkOiBzdHJpbmcpOiBNc2c8VD4ge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2dvdC11dWlkJyxcbiAgICB1dWlkLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ290TWVudUJveDxUPihyOiBSZXN1bHQ8RXJyb3IsIEJveD4pOiBNc2c8VD4ge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2dvdC1tZW51LWJveCcsXG4gICAgcixcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdvdEtleURvd248VD4oa2V5OiBzdHJpbmcpOiBNc2c8VD4ge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2tleS1kb3duJyxcbiAgICBrZXksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE1zZzxUPihtOiBNc2c8VD4pOiBNc2c8VD4ge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2NoaWxkLW1zZycsXG4gICAgbSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdvdEl0ZW1Cb3g8VD4oXG4gIGl0ZW06IE1lbnVJdGVtPFQ+LFxuICByOiBSZXN1bHQ8RXJyb3IsIEJveD4sXG4gIHN1Yk1lbnVDb3VudGVyOiBudW1iZXIsXG4gIHNlbGVjdEZpcnN0OiBib29sZWFuLFxuKTogTXNnPFQ+IHtcbiAgcmV0dXJuIHtcbiAgICB0YWc6ICdnb3QtaXRlbS1ib3gnLFxuICAgIGl0ZW0sXG4gICAgc2VsZWN0Rmlyc3QsXG4gICAgcixcbiAgICBzdWJNZW51Q291bnRlcixcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvY01vdXNlRG93bjxUPigpOiBNc2c8VD4ge1xuICByZXR1cm4ge1xuICAgIHRhZzogJ2RvYy1tb3VzZS1kb3duJyxcbiAgfTtcbn1cbiJdfQ==