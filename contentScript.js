const insertSearchBox = () => {

    /* Select section at bottom of sideNav */
    const sideNavEndBox = document.querySelector("#sideNav > div > div > div.side-nav-search-input.tw-border-t.tw-pd-1");

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

    return searchBoxInput;
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
