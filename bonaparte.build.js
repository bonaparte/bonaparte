require("./src/wsj-fonts.css");

require("./src/less/variables.less");

// SUI ////////////////////////////////////////////////////////////////////////

// require("./SUI/definitions/globals/reset.less");
require("./src/less/normalize.less");
require("./SUI/definitions/globals/site.less");

/* Elements */
// require("./SUI/definitions/elements/button.less");
require("./src/less/button.less");
require("./SUI/definitions/elements/container.less");
require("./SUI/definitions/elements/divider.less");
require("./SUI/definitions/elements/flag.less");
require("./SUI/definitions/elements/header.less");
require("./SUI/definitions/elements/icon.less");
// require("./SUI/definitions/elements/image.less");
require("./SUI/definitions/elements/input.less");
require("./SUI/definitions/elements/label.less");
// require("./SUI/definitions/elements/list.less");
// require("./SUI/definitions/elements/loader.less");
// require("./SUI/definitions/elements/rail.less");
// require("./SUI/definitions/elements/reveal.less");
require("./SUI/definitions/elements/segment.less");
// require("./SUI/definitions/elements/step.less");

/* Collections */
// require("./SUI/definitions/collections/breadcrumb.less");
require("./SUI/definitions/collections/form.less");
require("./SUI/definitions/collections/grid.less");
// require("./SUI/definitions/collections/menu.less");
// require("./SUI/definitions/collections/message.less");
require("./SUI/definitions/collections/table.less");


/* Views */
// require("./SUI/definitions/views/ad.less");
// require("./SUI/definitions/views/card.less");
// require("./SUI/definitions/views/comment.less");
// require("./SUI/definitions/views/feed.less");
// require("./SUI/definitions/views/item.less");
// require("./SUI/definitions/views/statistic.less");

/* Modules */
// require("./SUI/definitions/modules/accordion.less");
require("./src/less/form.less");
// require("./SUI/definitions/modules/checkbox.less");
// require("./SUI/definitions/modules/dimmer.less");
// require("./SUI/definitions/modules/dropdown.less");
// require("./SUI/definitions/modules/embed.less");
// require("./SUI/definitions/modules/modal.less");
// require("./SUI/definitions/modules/nag.less");
// require("./SUI/definitions/modules/popup.less");
// require("./SUI/definitions/modules/progress.less");
// require("./SUI/definitions/modules/rating.less");
// require("./SUI/definitions/modules/search.less");
// require("./SUI/definitions/modules/shape.less");
// require("./SUI/definitions/modules/sidebar.less");
// require("./SUI/definitions/modules/sticky.less");
// require("./SUI/definitions/modules/tab.less");
// require("./SUI/definitions/modules/transition.less");


// Bonaparte //////////////////////////////////////////////////////////////////

require("bonaparte-panel").register();

require("./src/less/bonaparte-panel.less");

require("bonaparte-scroll").register();
require("./src/less/bonaparte-scroll.less");

require("bonaparte-button").register();
require("./src/less/bonaparte-button.less");

require("bonaparte-sidebar").register();
require("./src/less/bonaparte-sidebar.less");

require("bonaparte-toolbar").register();
require("./src/less/bonaparte-toolbar.less");

require("bonaparte-draggable/bonaparte.build");

require("./src/less/bonaparte-content.less");

require("bonaparte-dropdown/bonaparte.build");

