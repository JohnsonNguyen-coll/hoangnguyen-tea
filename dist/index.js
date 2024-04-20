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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./common"), exports);
var menu_1 = require("./menu");
Object.defineProperty(exports, "menuUpdate", { enumerable: true, get: function () { return menu_1.update; } });
Object.defineProperty(exports, "ViewMenu", { enumerable: true, get: function () { return menu_1.ViewMenu; } });
Object.defineProperty(exports, "defaultItemRenderer", { enumerable: true, get: function () { return menu_1.defaultItemRenderer; } });
Object.defineProperty(exports, "separator", { enumerable: true, get: function () { return menu_1.separator; } });
Object.defineProperty(exports, "item", { enumerable: true, get: function () { return menu_1.item; } });
Object.defineProperty(exports, "Menu", { enumerable: true, get: function () { return menu_1.Menu; } });
Object.defineProperty(exports, "menu", { enumerable: true, get: function () { return menu_1.menu; } });
Object.defineProperty(exports, "menuSubscriptions", { enumerable: true, get: function () { return menu_1.subscriptions; } });
Object.defineProperty(exports, "menuOpen", { enumerable: true, get: function () { return menu_1.open; } });
var DropDown_1 = require("./dropdown/DropDown");
Object.defineProperty(exports, "dropDownOpen", { enumerable: true, get: function () { return DropDown_1.open; } });
Object.defineProperty(exports, "dropDownUpdate", { enumerable: true, get: function () { return DropDown_1.update; } });
Object.defineProperty(exports, "dropDownSubscriptions", { enumerable: true, get: function () { return DropDown_1.subscriptions; } });
Object.defineProperty(exports, "ViewDropDown", { enumerable: true, get: function () { return DropDown_1.ViewDropDown; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRzs7Ozs7Ozs7Ozs7O0FBRUgsMkNBQXlCO0FBRXpCLCtCQWdCZ0I7QUFaZCxrR0FBQSxNQUFNLE9BQWM7QUFDcEIsZ0dBQUEsUUFBUSxPQUFBO0FBQ1IsMkdBQUEsbUJBQW1CLE9BQUE7QUFFbkIsaUdBQUEsU0FBUyxPQUFBO0FBQ1QsNEZBQUEsSUFBSSxPQUFBO0FBQ0osNEZBQUEsSUFBSSxPQUFBO0FBQ0osNEZBQUEsSUFBSSxPQUFBO0FBQ0oseUdBQUEsYUFBYSxPQUFxQjtBQUNsQyxnR0FBQSxJQUFJLE9BQVk7QUFLbEIsZ0RBUTZCO0FBTDNCLHdHQUFBLElBQUksT0FBZ0I7QUFDcEIsMEdBQUEsTUFBTSxPQUFrQjtBQUN4QixpSEFBQSxhQUFhLE9BQXlCO0FBQ3RDLHdHQUFBLFlBQVksT0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAyMCBSw6ltaSBWYW4gS2Vpc2JlbGNrXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQge1xuICBNb2RlbCBhcyBNZW51TW9kZWwsXG4gIE1zZyBhcyBNZW51TXNnLFxuICBPdXRNc2cgYXMgTWVudU91dE1zZyxcbiAgdXBkYXRlIGFzIG1lbnVVcGRhdGUsXG4gIFZpZXdNZW51LFxuICBkZWZhdWx0SXRlbVJlbmRlcmVyLFxuICBJdGVtUmVuZGVyZXIsXG4gIHNlcGFyYXRvcixcbiAgaXRlbSxcbiAgTWVudSxcbiAgbWVudSxcbiAgc3Vic2NyaXB0aW9ucyBhcyBtZW51U3Vic2NyaXB0aW9ucyxcbiAgb3BlbiBhcyBtZW51T3BlbixcbiAgTWVudUVsZW1lbnQsXG4gIE1lbnVJdGVtLFxufSBmcm9tICcuL21lbnUnO1xuXG5leHBvcnQge1xuICBNb2RlbCBhcyBEcm9wRG93bk1vZGVsLFxuICBNc2cgYXMgRHJvcERvd25Nc2csXG4gIG9wZW4gYXMgZHJvcERvd25PcGVuLFxuICB1cGRhdGUgYXMgZHJvcERvd25VcGRhdGUsXG4gIHN1YnNjcmlwdGlvbnMgYXMgZHJvcERvd25TdWJzY3JpcHRpb25zLFxuICBWaWV3RHJvcERvd24sXG4gIFJlcXVlc3RDbG9zZSBhcyBEcm9wRG93blJlcXVlc3RDbG9zZSxcbn0gZnJvbSAnLi9kcm9wZG93bi9Ecm9wRG93bic7XG4iXX0=