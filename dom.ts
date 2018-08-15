/*
* 是否存在class
* */

function hasClass(element: any, className: string): boolean {
    if (element.classList)
        return element.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
}


/*
* 添加一个class
* classList: http://www.runoob.com/jsref/prop-element-classlist.html
* */
function addClass(element: any, className: string): void {
    if (element.classList)
        element.classList.add(className);
    else
        element.className += ' ' + className;
}


/*
* 添加多个class
* className为要添加的class, 多个class以空格分隔
* */
function addMultipleClasses(element: any, className: string): void {
    let styles: string[] = className.split(' ');
    if (element.classList) {
        for (let i = 0; i < styles.length; i++) {
            element.classList.add(styles[i]);
        }
    }
    else {
        for (let i = 0; i < styles.length; i++) {
            element.className += ' ' + styles[i];
        }
    }
}


/*
* 移除class
* */

function removeClass(element: any, className: string): void {
    if (element.classList)
        element.classList.remove(className);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}


/*
* 寻找所有element的兄弟节点
* */

function siblings(element: any): any {
    // element.parentNode.children.filter(child => child !== element);
    return Array.prototype.filter.call(element.parentNode.children, child => child !== element);
}


/*
* 查找一个元素
* */

function  findSingle(element: any, selector: string): any {
    return element.querySelector(selector);
}


/*
 * 查找多个个元素
 * */

function  find(element: any, selector: string): any[] {
    // element.querySelectorAll(selector)
    return Array.from(element.querySelectorAll(selector));
}


/*
* 获取element的索引
* */

function index(element: any): number {
    let children = element.parentNode.childNodes;
    let num = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i] == element) return num;

        // 如果是元素节点
        if (children[i].nodeType == 1) num++;
    }
    return -1;
}

/*
 * 获取element的索引(精确匹配)
 * */
function indexWithinGroup(element: any, attributeName: string): number {
    let children = element.parentNode.childNodes;
    let num = 0;
    for (var i = 0; i < children.length; i++) {
        if (children[i] == element) return num;

        // attributesd属性列表
        if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1) num++;
    }
    return -1;
}


/*
*设置element的相对定位(如果有已定位的父级)
* element：需要相对target（触发调色板的input）定位的元素（调色板）
* */
function relativePosition(element: any, target: any): void {
    // offsetParent：与当前元素最近的经过定位的父级元素

    // 获取元素尺寸
    let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : getHiddenElementDimensions(element);
    let targetOffset = target.getBoundingClientRect();
    let targetHeight = targetOffset.height;
    let targetWidth = target.width;
    let viewport = getViewport();
    let top, left;


    if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {   // 如果纵向超出屏幕
        top = -1 * (elementDimensions.height);
        if(targetOffset.top + top < 0) {
            top = 0;
        }
    } else {
        top = targetHeight;
    }


    if ((targetOffset.left + elementDimensions.width) > viewport.width)
        left = targetWidth - elementDimensions.width;
    else
        left = 0;

    element.style.top = top + 'px';
    element.style.left = left + 'px';
}



/*
 *设置element的相对定位(没有已定位的父级)
 * */
function absolutePosition(element: any, target: any): void {
    let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : getHiddenElementDimensions(element);
    let elementOuterHeight = elementDimensions.height;
    let elementOuterWidth = elementDimensions.width;
    let targetOffset = target.getBoundingClientRect();
    let targetOuterHeight = targetOffset.height;
    let targetOuterWidth = target.width;
    let windowScrollTop = this.getWindowScrollTop();
    let windowScrollLeft = this.getWindowScrollLeft();
    let viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        if(top < 0) {
            top = windowScrollTop;
        }
    } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
    }

    if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width)
        left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
    else
        left = targetOffset.left + windowScrollLeft;

    element.style.top = top + 'px';
    element.style.left = left + 'px';
}


/*
* 获取隐藏元素的尺寸
* */
function getHiddenElementDimensions(element: any): any {
    let dimensions: any = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';
    return dimensions;
}

/*
 * 获取隐藏元素的height
 * */
function  getHiddenElementOuterHeight(element: any): number {
    return getHiddenElementDimensions(element).height;
}

/*
 * 获取隐藏元素的width
 * */
function  getHiddenElementOuterWidth(element: any): number {
    return getHiddenElementDimensions(element).width;
}


/*
* 设置容器滚动到item位置
* */
function scrollInView(container, item) {
    // getComputedStyle获取元素样式，只读

    // 上边框width
    let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
    let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;

    // padding-top
    let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
    let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;


    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();


    let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = getOuterHeight(item);

    if (offset < 0) {
        container.scrollTop = scroll + offset;
    }
    else if ((offset + itemHeight) > elementHeight) {
        container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
}



function  fadeIn(element, duration: number): void {
    element.style.opacity = 0;

let last = +new Date();
let opacity = 0;
let tick = function () {
    opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
    element.style.opacity = opacity;
    last = +new Date();

    if (+opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
};

tick();
}

function  fadeOut(element, ms) {
    var opacity = 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;

    let fading = setInterval(() => {
        opacity = opacity - gap;

        if (opacity <= 0) {
            opacity = 0;
            clearInterval(fading);
        }

        element.style.opacity = opacity;
    }, interval);
}

/*
* 获取滚动条信息
* */
function  getWindowScrollTop(): number {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

function  getWindowScrollLeft(): number {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
}


/*
* 获取元素宽度
* */
function getOuterWidth(el, margin?) {
    let width = el.offsetWidth;

    if (margin) {
        let style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
}


/*
* 获取元素高度
* */

function  getOuterHeight(el, margin?) {
    let height = el.offsetHeight;

    if (margin) {
        let style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
}




/*
* 获取浏览器窗口大小
* */

function  getViewport(): any {
    let win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;
    return { width: w, height: h };
}



/*
* 获取元素的offset值
* */

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };
}


/*
* 替换节点
* 返回被替换的节点
* */

function replaceElementWith(element: any, replacementElement: any): any {
    const parentNode = element.parentNode;
    if(!parentNode)
        throw `Can't replace element`;
    return parentNode.replaceChild(replacementElement, element);
}



/*
* 是否是个节点
* */

function isElement(obj: any) {
    return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    );
}



function appendChild(element: any, target: any) {
    if(this.isElement(target))
        target.appendChild(element);
    else if(target.el && target.el.nativeElement)
        target.el.nativeElement.appendChild(element);
    else
        throw 'Cannot append ' + target + ' to ' + element;
}

function removeChild(element: any, target: any) {
    if(this.isElement(target))
        target.removeChild(element);
    else if(target.el && target.el.nativeElement)
        target.el.nativeElement.removeChild(element);
    else
        throw 'Cannot remove ' + element + ' from ' + target;
}