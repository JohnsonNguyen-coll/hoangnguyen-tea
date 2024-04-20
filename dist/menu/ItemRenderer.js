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
exports.defaultItemRenderer = void 0;
const React = __importStar(require("react"));
function defaultItemRenderer(contentRenderer) {
    return (input) => {
        const { data, active, hasSubMenu } = input;
        const activeClass = active ? ' tm-active' : '';
        return (React.createElement("div", { className: `tm-item${activeClass}` },
            React.createElement("div", { className: "tm-item__content" }, contentRenderer(data)),
            hasSubMenu ? React.createElement("div", { className: "tm-item__submenu" }, "\u203A") : React.createElement(React.Fragment, null)));
    };
}
exports.defaultItemRenderer = defaultItemRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lbnUvSXRlbVJlbmRlcmVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsNkNBQStCO0FBVS9CLFNBQWdCLG1CQUFtQixDQUNqQyxlQUEwQztJQUUxQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDZixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDM0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQ0wsNkJBQUssU0FBUyxFQUFFLFVBQVUsV0FBVyxFQUFFO1lBQ3JDLDZCQUFLLFNBQVMsRUFBQyxrQkFBa0IsSUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQU87WUFDOUQsVUFBVSxDQUFDLENBQUMsQ0FBQyw2QkFBSyxTQUFTLEVBQUMsa0JBQWtCLGFBQVEsQ0FBQyxDQUFDLENBQUMseUNBQUssQ0FDM0QsQ0FDUCxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELGtEQWFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIwIFLDqW1pIFZhbiBLZWlzYmVsY2tcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyZXJJbnB1dDxUPiB7XG4gIHJlYWRvbmx5IGRhdGE6IFQ7XG4gIHJlYWRvbmx5IGFjdGl2ZTogYm9vbGVhbjtcbiAgcmVhZG9ubHkgaGFzU3ViTWVudTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgSXRlbVJlbmRlcmVyPFQ+ID0gKGlucHV0OiBSZW5kZXJlcklucHV0PFQ+KSA9PiBSZWFjdC5SZWFjdE5vZGU7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0SXRlbVJlbmRlcmVyPFQ+KFxuICBjb250ZW50UmVuZGVyZXI6ICh0OiBUKSA9PiBSZWFjdC5SZWFjdE5vZGUsXG4pOiBJdGVtUmVuZGVyZXI8VD4ge1xuICByZXR1cm4gKGlucHV0KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBhY3RpdmUsIGhhc1N1Yk1lbnUgfSA9IGlucHV0O1xuICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gYWN0aXZlID8gJyB0bS1hY3RpdmUnIDogJyc7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdG0taXRlbSR7YWN0aXZlQ2xhc3N9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG0taXRlbV9fY29udGVudFwiPntjb250ZW50UmVuZGVyZXIoZGF0YSl9PC9kaXY+XG4gICAgICAgIHtoYXNTdWJNZW51ID8gPGRpdiBjbGFzc05hbWU9XCJ0bS1pdGVtX19zdWJtZW51XCI+4oC6PC9kaXY+IDogPD48Lz59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xufVxuIl19