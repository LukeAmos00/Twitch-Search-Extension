const checkSearchBox = () => {
    const selector = "#sideNav > div > div > div.side-nav-search-input.tw-border-t.tw-pd-1";
    const sideNavEndBox = document.querySelector(selector);

    const preExisitingBox = document.getElementById('side-nav.find-following');

    /* Inserts search box if window size is large enough */
    if (sideNavEndBox && !preExisitingBox) {
        insertSearchBox();
    }
}

const insertSearchBox = () => {

    /* Select section at bottom of sideNav */
    const selector = "#sideNav > div > div > div.side-nav-search-input.tw-border-t.tw-pd-1";
    const sideNavEndBox = document.querySelector(selector);

    /* Clone search friends box */
    const searchBoxClone = sideNavEndBox.lastChild.cloneNode(true);
    sideNavEndBox.insertBefore(searchBoxClone, sideNavEndBox.lastChild);

    /* Add spacing between two search boxes */
    const seachBox = sideNavEndBox.firstChild
    seachBox.style.marginBottom = "10px"

    /* Change text inside box */
    var searchBoxInput = seachBox.lastChild.lastChild;
    searchBoxInput.setAttribute("placeholder", "Search Following");

    searchBoxInput.setAttribute("id", "side-nav.find-following")
}

const getFollowList = () => {

    /* Expand follow list */
    let showMore = document.querySelector('button[data-test-selector="ShowMore"]');

    while (showMore != null) {
        showMore.click()
        showMore = document.querySelector('button[data-test-selector="ShowMore"]');
    }

    return document.querySelectorAll('a[data-test-selector="followed-channel"]');
}

checkSearchBox();

/* Makes box reappear when enough room, delay ensures container loads first */
window.addEventListener('resize', () => setTimeout(checkSearchBox, 1));