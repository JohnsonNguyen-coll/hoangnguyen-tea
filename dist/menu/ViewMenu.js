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
exports.ViewMenuItem = exports.ViewMenu = void 0;
const React = __importStar(require("react"));
const Menu_1 = require("./Menu");
const Msg_1 = require("./Msg");
const react_tea_cup_1 = require("react-tea-cup");
const common_1 = require("../common");
function ViewMenu(props) {
    const { model, dispatch, renderer } = props;
    const { menu, state, uuid, windowSize } = model;
    if (uuid.type === 'Nothing') {
        return React.createElement(React.Fragment, null);
    }
    if (windowSize.type === 'Nothing') {
        return React.createElement(React.Fragment, null);
    }
    const renderItems = () => menu.elems.map((element, index) => {
        switch (element.tag) {
            case 'item': {
                return (React.createElement(ViewMenuItem, Object.assign({ key: `item-${index}`, uuid: uuid.value, itemIndex: index, menu: menu, item: element }, props)));
            }
            case 'separator': {
                return React.createElement("div", { key: `sep-${index}`, className: "tm-separator" });
            }
        }
    });
    switch (state.tag) {
        case 'placing': {
            const { refBox } = state;
            return (React.createElement("div", { className: "tm-placer", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    overflow: 'hidden',
                }, onContextMenu: common_1.stopEvent },
                React.createElement("div", { className: "tm", id: Menu_1.menuId(uuid.value), style: {
                        position: 'absolute',
                        top: refBox.p.y,
                        left: refBox.p.x,
                        visibility: 'hidden',
                    }, onContextMenu: common_1.stopEvent }, renderItems())));
        }
        case 'open': {
            const { box } = state;
            const { p, d } = box;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "tm", id: Menu_1.menuId(uuid.value), style: {
                        position: 'absolute',
                        top: p.y,
                        left: p.x,
                        width: d.w,
                        height: d.h,
                    }, onContextMenu: common_1.stopEvent }, renderItems()),
                model.child
                    .map((child) => (React.createElement(ViewMenu, { model: child, dispatch: react_tea_cup_1.map(dispatch, Msg_1.childMsg), renderer: renderer })))
                    .withDefaultSupply(() => (React.createElement(React.Fragment, null)))));
        }
    }
}
exports.ViewMenu = ViewMenu;
function ViewMenuItem(props) {
    const { menu, item, renderer, dispatch, uuid, itemIndex } = props;
    const selected = menu.isSelected(item);
    return (React.createElement("div", { id: Menu_1.menuItemId(uuid, itemIndex), onMouseMove: () => dispatch({ tag: 'mouse-move', item, itemIndex }), onMouseLeave: () => dispatch({ tag: 'mouse-leave', item, itemIndex }), onClick: () => {
            dispatch({ tag: 'item-clicked', item });
        } }, renderer({
        data: item.userData,
        active: selected,
        hasSubMenu: item.subMenu.isJust(),
    })));
}
exports.ViewMenuItem = ViewMenuItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlld01lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVudS9WaWV3TWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDZDQUErQjtBQUMvQixpQ0FBNEQ7QUFDNUQsK0JBQXNDO0FBQ3RDLGlEQUFnRDtBQUdoRCxzQ0FBc0M7QUFRdEMsU0FBZ0IsUUFBUSxDQUFJLEtBQXVCO0lBQ2pELE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUM1QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ2hELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDM0IsT0FBTyx5Q0FBSyxDQUFDO0tBQ2Q7SUFDRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ2pDLE9BQU8seUNBQUssQ0FBQztLQUNkO0lBRUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2hDLFFBQVEsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNuQixLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUNYLE9BQU8sQ0FDTCxvQkFBQyxZQUFZLGtCQUNYLEdBQUcsRUFBRSxRQUFRLEtBQUssRUFBRSxFQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDaEIsU0FBUyxFQUFFLEtBQUssRUFDaEIsSUFBSSxFQUFFLElBQUksRUFDVixJQUFJLEVBQUUsT0FBTyxJQUNULEtBQUssRUFDVCxDQUNILENBQUM7YUFDSDtZQUNELEtBQUssV0FBVyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8s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Q3JFLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDWixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxJQUVBLFFBQVEsQ0FBQztRQUNSLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUTtRQUNuQixNQUFNLEVBQUUsUUFBUTtRQUNoQixVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7S0FDbEMsQ0FBQyxDQUNFLENBQ1AsQ0FBQztBQUNKLENBQUM7QUFyQkQsb0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIwIFLDqW1pIFZhbiBLZWlzYmVsY2tcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNZW51LCBtZW51SWQsIE1lbnVJdGVtLCBtZW51SXRlbUlkIH0gZnJvbSAnLi9NZW51JztcbmltcG9ydCB7IGNoaWxkTXNnLCBNc2cgfSBmcm9tICcuL01zZyc7XG5pbXBvcnQgeyBEaXNwYXRjaGVyLCBtYXAgfSBmcm9tICdyZWFjdC10ZWEtY3VwJztcbmltcG9ydCB7IEl0ZW1SZW5kZXJlciB9IGZyb20gJy4vSXRlbVJlbmRlcmVyJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQgeyBzdG9wRXZlbnQgfSBmcm9tICcuLi9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdNZW51UHJvcHM8VD4ge1xuICBtb2RlbDogTW9kZWw8VD47XG4gIGRpc3BhdGNoOiBEaXNwYXRjaGVyPE1zZzxUPj47XG4gIHJlbmRlcmVyOiBJdGVtUmVuZGVyZXI8VD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWaWV3TWVudTxUPihwcm9wczogVmlld01lbnVQcm9wczxUPik6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IHsgbW9kZWwsIGRpc3BhdGNoLCByZW5kZXJlciB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgbWVudSwgc3RhdGUsIHV1aWQsIHdpbmRvd1NpemUgfSA9IG1vZGVsO1xuICBpZiAodXVpZC50eXBlID09PSAnTm90aGluZycpIHtcbiAgICByZXR1cm4gPD48Lz47XG4gIH1cbiAgaWYgKHdpbmRvd1NpemUudHlwZSA9PT0gJ05vdGhpbmcnKSB7XG4gICAgcmV0dXJuIDw+PC8+O1xuICB9XG5cbiAgY29uc3QgcmVuZGVySXRlbXMgPSAoKSA9PlxuICAgIG1lbnUuZWxlbXMubWFwKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgc3dpdGNoIChlbGVtZW50LnRhZykge1xuICAgICAgICBjYXNlICdpdGVtJzoge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Vmlld01lbnVJdGVtXG4gICAgICAgICAgICAgIGtleT17YGl0ZW0tJHtpbmRleH1gfVxuICAgICAgICAgICAgICB1dWlkPXt1dWlkLnZhbHVlfVxuICAgICAgICAgICAgICBpdGVtSW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBtZW51PXttZW51fVxuICAgICAgICAgICAgICBpdGVtPXtlbGVtZW50fVxuICAgICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc2VwYXJhdG9yJzoge1xuICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17YHNlcC0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRtLXNlcGFyYXRvclwiIC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgc3dpdGNoIChzdGF0ZS50YWcpIHtcbiAgICBjYXNlICdwbGFjaW5nJzoge1xuICAgICAgY29uc3QgeyByZWZCb3ggfSA9IHN0YXRlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInRtLXBsYWNlclwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25Db250ZXh0TWVudT17c3RvcEV2ZW50fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidG1cIlxuICAgICAgICAgICAgaWQ9e21lbnVJZCh1dWlkLnZhbHVlKX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICB0b3A6IHJlZkJveC5wLnksXG4gICAgICAgICAgICAgIGxlZnQ6IHJlZkJveC5wLngsXG4gICAgICAgICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQ29udGV4dE1lbnU9e3N0b3BFdmVudH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7cmVuZGVySXRlbXMoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBjYXNlICdvcGVuJzoge1xuICAgICAgY29uc3QgeyBib3ggfSA9IHN0YXRlO1xuICAgICAgY29uc3QgeyBwLCBkIH0gPSBib3g7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRtXCJcbiAgICAgICAgICAgIGlkPXttZW51SWQodXVpZC52YWx1ZSl9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiBwLnksXG4gICAgICAgICAgICAgIGxlZnQ6IHAueCxcbiAgICAgICAgICAgICAgd2lkdGg6IGQudyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBkLmgsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Db250ZXh0TWVudT17c3RvcEV2ZW50fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtyZW5kZXJJdGVtcygpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHttb2RlbC5jaGlsZFxuICAgICAgICAgICAgLm1hcCgoY2hpbGQpID0+IChcbiAgICAgICAgICAgICAgPFZpZXdNZW51XG4gICAgICAgICAgICAgICAgbW9kZWw9e2NoaWxkfVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoPXttYXAoZGlzcGF0Y2gsIGNoaWxkTXNnKX1cbiAgICAgICAgICAgICAgICByZW5kZXJlcj17cmVuZGVyZXJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgLndpdGhEZWZhdWx0U3VwcGx5KCgpID0+IChcbiAgICAgICAgICAgICAgPD48Lz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld01lbnVJdGVtUHJvcHM8VD4ge1xuICB1dWlkOiBzdHJpbmc7XG4gIGl0ZW1JbmRleDogbnVtYmVyO1xuICBtZW51OiBNZW51PFQ+O1xuICBpdGVtOiBNZW51SXRlbTxUPjtcbiAgZGlzcGF0Y2g6IERpc3BhdGNoZXI8TXNnPFQ+PjtcbiAgcmVuZGVyZXI6IEl0ZW1SZW5kZXJlcjxUPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFZpZXdNZW51SXRlbTxUPihcbiAgcHJvcHM6IFZpZXdNZW51SXRlbVByb3BzPFQ+LFxuKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgeyBtZW51LCBpdGVtLCByZW5kZXJlciwgZGlzcGF0Y2gsIHV1aWQsIGl0ZW1JbmRleCB9ID0gcHJvcHM7XG4gIGNvbnN0IHNlbGVjdGVkID0gbWVudS5pc1NlbGVjdGVkKGl0ZW0pO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGlkPXttZW51SXRlbUlkKHV1aWQsIGl0ZW1JbmRleCl9XG4gICAgICBvbk1vdXNlTW92ZT17KCkgPT4gZGlzcGF0Y2goeyB0YWc6ICdtb3VzZS1tb3ZlJywgaXRlbSwgaXRlbUluZGV4IH0pfVxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBkaXNwYXRjaCh7IHRhZzogJ21vdXNlLWxlYXZlJywgaXRlbSwgaXRlbUluZGV4IH0pfVxuICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHRhZzogJ2l0ZW0tY2xpY2tlZCcsIGl0ZW0gfSk7XG4gICAgICB9fVxuICAgID5cbiAgICAgIHtyZW5kZXJlcih7XG4gICAgICAgIGRhdGE6IGl0ZW0udXNlckRhdGEsXG4gICAgICAgIGFjdGl2ZTogc2VsZWN0ZWQsXG4gICAgICAgIGhhc1N1Yk1lbnU6IGl0ZW0uc3ViTWVudS5pc0p1c3QoKSxcbiAgICAgIH0pfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl19