"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    /**
     * A workaround for sticky or fixed header overlapping targeted element
     **/
    const siteHeader = document.querySelector(".site-banner");

    const syncHeight = (height) => {
        document.querySelector("html").style.setProperty("--header-h", height+"px");
        // console.log("Setting value of <html>'s \"--header-h\" CSS property to "+height+"px");
    };

    const resizeObserver = new ResizeObserver((entries) => {
        // modified from https://usefulangle.com/post/319/javascript-detect-element-resize
        // Notice that this uses the entries[0].borderBoxSize[0].blockSize; instead of entries[0].contentRect.height; as mentioned in the tutorial
        // because we need its height as it is rendered by inspector.
        // Run this `console.log(entries[0])` to see the details.
        // console.log(entries[0]);
        let height = entries[0].borderBoxSize[0].blockSize;
        // console.log('Current height: ' + height+"px");
        syncHeight(height);
    });
    
    resizeObserver.observe(siteHeader); // Start observing for resize.
});

document.addEventListener("DOMContentLoaded", function(event) {
    /**
     * Auto-Hide Sticky Header
     * 
     * By Osvaldas Valutis, www.osvaldas.info/auto-hide-sticky-header
     * Available for use under the MIT License
     * 
     **/
    ;( function ( document, window, index )
    {
        'use strict';

        var elSelector  = '.site-banner',
            element     = document.querySelector( elSelector );

        if( !element ) return true;

        var elHeight        = 0,
            elTop           = 0,
            dHeight         = 0,
            wHeight         = 0,
            wScrollCurrent  = 0,
            wScrollBefore   = 0,
            wScrollDiff     = 0;

        window.addEventListener( 'scroll', function()
        {
            elHeight        = element.offsetHeight;
            dHeight         = document.body.offsetHeight;
            wHeight         = window.innerHeight;
            wScrollCurrent  = window.pageYOffset;
            wScrollDiff     = wScrollBefore - wScrollCurrent;
            elTop           = parseInt( window.getComputedStyle( element ).getPropertyValue( 'top' ) ) + wScrollDiff;

            if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
                element.style.top = '0px';

            else if( wScrollDiff > 0 ) // scrolled up; element slides in
                element.style.top = ( elTop > 0 ? 0 : elTop ) + 'px';

            else if( wScrollDiff < 0 ) // scrolled down
            {
                if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
                    element.style.top = ( ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';

                else // scrolled down; element slides out
                    element.style.top = ( Math.abs( elTop ) > elHeight ? -elHeight : elTop ) + 'px';
            }

            wScrollBefore = wScrollCurrent;
        });
    }( document, window, 0 ));
});
