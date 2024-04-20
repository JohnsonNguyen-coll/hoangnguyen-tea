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
exports.menuItemTask = exports.menuTask = exports.menuItemId = exports.menuId = exports.separator = exports.item = exports.menu = exports.Menu = void 0;
const react_tea_cup_1 = require("react-tea-cup");
class Menu {
    constructor(elements) {
        this.elements = elements;
    }
    selectFirstItem() {
        return new Menu(this.elements.selectIndex(0));
    }
    selectItem(item) {
        return new Menu(this.elements.select((e) => e === item));
    }
    deselectAll() {
        return new Menu(react_tea_cup_1.ListWithSelection.fromArray(this.elements.toArray()));
    }
    get elems() {
        return this.elements.toArray();
    }
    get selectedItem() {
        const selected = this.elements.getSelected();
        if (selected.type === 'Just' && selected.value.tag === 'item') {
            return react_tea_cup_1.just(selected.value);
        }
        return react_tea_cup_1.nothing;
    }
    isSelected(item) {
        return this.elements.isSelected(item);
    }
    findNextItemIndex(start) {
        const elems = this.elems;
        const s = start === elems.length - 1 ? 0 : start + 1;
        for (let i = s; i < elems.length; i++) {
            if (elems[i].tag === 'item') {
                return react_tea_cup_1.just(i);
            }
        }
        return react_tea_cup_1.nothing;
    }
    findPreviousItemIndex(start) {
        const elems = this.elems;
        const s = start === 0 ? elems.length - 1 : start - 1;
        for (let i = s; i >= 0; i--) {
            if (elems[i].tag === 'item') {
                return react_tea_cup_1.just(i);
            }
        }
        return react_tea_cup_1.nothing;
    }
    moveSelection(down) {
        return this.elements
            .getSelectedIndex()
            .map((selectedIndex) => {
            const mbNextIndex = down
                ? this.findNextItemIndex(selectedIndex)
                : this.findPreviousItemIndex(selectedIndex);
            return mbNextIndex
                .map((nextIndex) => new Menu(this.elements.selectIndex(nextIndex)))
                .withDefault(this);
        })
            .withDefaultSupply(() => {
            return new Menu(this.elements.selectIndex(down ? 0 : this.elements.length() - 1));
        });
    }
    indexOfItem(item) {
        const i = this.elements.toArray().indexOf(item);
        if (i === -1) {
            return react_tea_cup_1.nothing;
        }
        return react_tea_cup_1.just(i);
    }
}
exports.Menu = Menu;
function menu(items) {
    return new Menu(react_tea_cup_1.ListWithSelection.fromArray(items));
}
exports.menu = menu;
function item(userData, subMenu) {
    return {
        tag: 'item',
        userData,
        subMenu: react_tea_cup_1.maybeOf(subMenu),
    };
}
exports.item = item;
exports.separator = {
    tag: 'separator',
};
function menuId(uuid) {
    return `tm-${btoa(uuid)}`;
}
exports.menuId = menuId;
function menuItemId(menuId, itemIndex) {
    return `tm-item-${menuId}-${itemIndex}`;
}
exports.menuItemId = menuItemId;
function menuTask(uuid) {
    return byId(menuId(uuid));
}
exports.menuTask = menuTask;
function menuItemTask(menuId, itemIndex) {
    return byId(menuItemId(menuId, itemIndex));
}
exports.menuItemTask = menuItemTask;
function byId(id) {
    return react_tea_cup_1.Task.fromLambda(() => {
        const e = document.getElementById(id);
        if (e === null) {
            throw new Error('element not found with id:' + id);
        }
        return e;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZW51L01lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRzs7O0FBRUgsaURBT3VCO0FBRXZCLE1BQWEsSUFBSTtJQUNmLFlBQTZCLFFBQTJDO1FBQTNDLGFBQVEsR0FBUixRQUFRLENBQW1DO0lBQUcsQ0FBQztJQUU1RSxlQUFlO1FBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBaUI7UUFDMUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksSUFBSSxDQUFDLGlDQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssTUFBTSxFQUFFO1lBQzdELE9BQU8sb0JBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLHVCQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJ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ICogTUlUIExpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgUsOpbWkgVmFuIEtlaXNiZWxja1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIGp1c3QsXG4gIExpc3RXaXRoU2VsZWN0aW9uLFxuICBNYXliZSxcbiAgbWF5YmVPZixcbiAgbm90aGluZyxcbiAgVGFzayxcbn0gZnJvbSAncmVhY3QtdGVhLWN1cCc7XG5cbmV4cG9ydCBjbGFzcyBNZW51PFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtZW50czogTGlzdFdpdGhTZWxlY3Rpb248TWVudUVsZW1lbnQ8VD4+KSB7fVxuXG4gIHNlbGVjdEZpcnN0SXRlbSgpOiBNZW51PFQ+IHtcbiAgICByZXR1cm4gbmV3IE1lbnUodGhpcy5lbGVtZW50cy5zZWxlY3RJbmRleCgwKSk7XG4gIH1cblxuICBzZWxlY3RJdGVtKGl0ZW06IE1lbnVJdGVtPFQ+KTogTWVudTxUPiB7XG4gICAgcmV0dXJuIG5ldyBNZW51KHRoaXMuZWxlbWVudHMuc2VsZWN0KChlKSA9PiBlID09PSBpdGVtKSk7XG4gIH1cblxuICBkZXNlbGVjdEFsbCgpOiBNZW51PFQ+IHtcbiAgICByZXR1cm4gbmV3IE1lbnUoTGlzdFdpdGhTZWxlY3Rpb24uZnJvbUFycmF5KHRoaXMuZWxlbWVudHMudG9BcnJheSgpKSk7XG4gIH1cblxuICBnZXQgZWxlbXMoKTogUmVhZG9ubHlBcnJheTxNZW51RWxlbWVudDxUPj4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEl0ZW0oKTogTWF5YmU8TWVudUl0ZW08VD4+IHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWQoKTtcbiAgICBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gJ0p1c3QnICYmIHNlbGVjdGVkLnZhbHVlLnRhZyA9PT0gJ2l0ZW0nKSB7XG4gICAgICByZXR1cm4ganVzdChzZWxlY3RlZC52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBub3RoaW5nO1xuICB9XG5cbiAgaXNTZWxlY3RlZChpdGVtOiBNZW51SXRlbTxUPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmlzU2VsZWN0ZWQoaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmROZXh0SXRlbUluZGV4KHN0YXJ0OiBudW1iZXIpOiBNYXliZTxudW1iZXI+IHtcbiAgICBjb25zdCBlbGVtcyA9IHRoaXMuZWxlbXM7XG4gICAgY29uc3QgcyA9IHN0YXJ0ID09PSBlbGVtcy5sZW5ndGggLSAxID8gMCA6IHN0YXJ0ICsgMTtcbiAgICBmb3IgKGxldCBpID0gczsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWxlbXNbaV0udGFnID09PSAnaXRlbScpIHtcbiAgICAgICAgcmV0dXJuIGp1c3QoaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3RoaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kUHJldmlvdXNJdGVtSW5kZXgoc3RhcnQ6IG51bWJlcik6IE1heWJlPG51bWJlcj4ge1xuICAgIGNvbnN0IGVsZW1zID0gdGhpcy5lbGVtcztcbiAgICBjb25zdCBzID0gc3RhcnQgPT09IDAgPyBlbGVtcy5sZW5ndGggLSAxIDogc3RhcnQgLSAxO1xuICAgIGZvciAobGV0IGkgPSBzOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKGVsZW1zW2ldLnRhZyA9PT0gJ2l0ZW0nKSB7XG4gICAgICAgIHJldHVybiBqdXN0KGkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm90aGluZztcbiAgfVxuXG4gIG1vdmVTZWxlY3Rpb24oZG93bjogYm9vbGVhbik6IE1lbnU8VD4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzXG4gICAgICAuZ2V0U2VsZWN0ZWRJbmRleCgpXG4gICAgICAubWFwKChzZWxlY3RlZEluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IG1iTmV4dEluZGV4ID0gZG93blxuICAgICAgICAgID8gdGhpcy5maW5kTmV4dEl0ZW1JbmRleChzZWxlY3RlZEluZGV4KVxuICAgICAgICAgIDogdGhpcy5maW5kUHJldmlvdXNJdGVtSW5kZXgoc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIHJldHVybiBtYk5leHRJbmRleFxuICAgICAgICAgIC5tYXAoKG5leHRJbmRleCkgPT4gbmV3IE1lbnUodGhpcy5lbGVtZW50cy5zZWxlY3RJbmRleChuZXh0SW5kZXgpKSlcbiAgICAgICAgICAud2l0aERlZmF1bHQodGhpcyk7XG4gICAgICB9KVxuICAgICAgLndpdGhEZWZhdWx0U3VwcGx5KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBNZW51KFxuICAgICAgICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0SW5kZXgoZG93biA/IDAgOiB0aGlzLmVsZW1lbnRzLmxlbmd0aCgpIC0gMSksXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluZGV4T2ZJdGVtKGl0ZW06IE1lbnVJdGVtPFQ+KTogTWF5YmU8bnVtYmVyPiB7XG4gICAgY29uc3QgaSA9IHRoaXMuZWxlbWVudHMudG9BcnJheSgpLmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gbm90aGluZztcbiAgICB9XG4gICAgcmV0dXJuIGp1c3QoaSk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVudUVsZW1lbnQ8VD4gPSBNZW51SXRlbTxUPiB8IE1lbnVTZXBhcmF0b3I7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudUl0ZW08VD4ge1xuICB0YWc6ICdpdGVtJztcbiAgcmVhZG9ubHkgdXNlckRhdGE6IFQ7XG4gIHJlYWRvbmx5IHN1Yk1lbnU6IE1heWJlPE1lbnU8VD4+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbnVTZXBhcmF0b3Ige1xuICB0YWc6ICdzZXBhcmF0b3InO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVudTxUPihpdGVtczogUmVhZG9ubHlBcnJheTxNZW51RWxlbWVudDxUPj4pOiBNZW51PFQ+IHtcbiAgcmV0dXJuIG5ldyBNZW51KExpc3RXaXRoU2VsZWN0aW9uLmZyb21BcnJheShpdGVtcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXRlbTxUPih1c2VyRGF0YTogVCwgc3ViTWVudT86IE1lbnU8VD4pOiBNZW51SXRlbTxUPiB7XG4gIHJldHVybiB7XG4gICAgdGFnOiAnaXRlbScsXG4gICAgdXNlckRhdGEsXG4gICAgc3ViTWVudTogbWF5YmVPZihzdWJNZW51KSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHNlcGFyYXRvcjogTWVudVNlcGFyYXRvciA9IHtcbiAgdGFnOiAnc2VwYXJhdG9yJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBtZW51SWQodXVpZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB0bS0ke2J0b2EodXVpZCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lbnVJdGVtSWQobWVudUlkOiBzdHJpbmcsIGl0ZW1JbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB0bS1pdGVtLSR7bWVudUlkfS0ke2l0ZW1JbmRleH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVudVRhc2sodXVpZDogc3RyaW5nKTogVGFzazxFcnJvciwgSFRNTEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGJ5SWQobWVudUlkKHV1aWQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lbnVJdGVtVGFzayhcbiAgbWVudUlkOiBzdHJpbmcsXG4gIGl0ZW1JbmRleDogbnVtYmVyLFxuKTogVGFzazxFcnJvciwgSFRNTEVsZW1lbnQ+IHtcbiAgcmV0dXJuIGJ5SWQobWVudUl0ZW1JZChtZW51SWQsIGl0ZW1JbmRleCkpO1xufVxuXG5mdW5jdGlvbiBieUlkKGlkOiBzdHJpbmcpOiBUYXNrPEVycm9yLCBIVE1MRWxlbWVudD4ge1xuICByZXR1cm4gVGFzay5mcm9tTGFtYmRhKCgpID0+IHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGlmIChlID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VsZW1lbnQgbm90IGZvdW5kIHdpdGggaWQ6JyArIGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH0pO1xufVxuIl19