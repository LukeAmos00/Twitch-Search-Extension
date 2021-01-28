const checkSearchBox = () => {
    const selector = "#sideNav > div > div > \
    div.side-nav-search-input.tw-border-t.tw-pd-1";
    const sideNavEndBox = document.querySelector(selector);

    const preExisitingBox = document.getElementById(
        'side-nav.find-following');

    /* Inserts search box if window size is large enough */
    if (sideNavEndBox && !preExisitingBox) {
        insertSearchBox();
        filterUsers();
    }
};

const insertSearchBox = () => {

    /* Select section at bottom of sideNav */
    const selector = "#sideNav > div > div > \
    div.side-nav-search-input.tw-border-t.tw-pd-1";
    const sideNavEndBox = document.querySelector(selector);

    /* Clone search friends box */
    const searchBoxClone = sideNavEndBox.lastChild.cloneNode(true);
    sideNavEndBox.insertBefore(
        searchBoxClone,
        sideNavEndBox.lastChild);

    /* Add spacing between two search boxes */
    const seachBox = sideNavEndBox.firstChild;
    seachBox.style.marginBottom = "10px";

    seachBox.firstChild.setAttribute(
        "for",
        "side-nav.find-following");

    /* Change text inside box */
    const searchBoxInput = seachBox.lastChild.lastChild;
    searchBoxInput.setAttribute("placeholder", "Search Following");

    searchBoxInput.setAttribute("id", "side-nav.find-following");
};

const getFollowList = () => {

    /* Expand follow list */
    let showMore = document.querySelector(
        'button[data-test-selector="ShowMore"]');

    while (showMore != null) {
        showMore.click();
        showMore = document.querySelector(
            'button[data-test-selector="ShowMore"]');
    }

    return document.querySelectorAll(
        'a[data-test-selector="followed-channel"]');
};

const filterUsers = () => {

    /* Case of following no one */
    if (!document.getElementById('side-nav.find-following')) return;

    const input = document.getElementById('side-nav.find-following');
    input.addEventListener('input', () => {

        /* Needs updating on each input as list may not have been fully extended. */
        const followingListNodes = getFollowList();

        if (input.value === "") {
            sortFollowing();
            return;
        }

        Array.from(followingListNodes).map(node => {
            const searchQuery = input.value.toLowerCase();
            const channel = node.getAttribute('href').toLowerCase();

            if (channel.includes(searchQuery)) pushTop(node);
        });
    });
};

const sortFollowing = () => {
    const followingList = document.querySelectorAll(
        'a[data-test-selector="followed-channel"]');

    const sortedNodes = Array.from(followingList).sort((a, b) => {
        const aNum = parseInt(
            a.getAttribute('data-a-id').match(/[0-9]+/)[0]);
        const bNum = parseInt(
            b.getAttribute('data-a-id').match(/[0-9]+/)[0]);
        return aNum - bNum;
    });

    sortedNodes.reverse().map(pushTop);
};

const pushTop = node => {
    const followingList = document.querySelector(
        'div[aria-label="Followed Channels"]').children[1];
    
    const root = node.parentElement.parentElement
        .parentElement;

    followingList.removeChild(root);
    followingList.insertBefore(
        root,
        followingList.firstChild
    );
};

window.addEventListener("load", checkSearchBox);

/* Makes box reappear when enough room, delay ensures container loads first */
window.addEventListener('resize', () => setTimeout(checkSearchBox, 1));
