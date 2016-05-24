var bp = require("bonaparte-core");

///////////////////////////////////////////////////////////////////////////////
// Public

module.exports = bp.tag.create("toolbar", [ require("bonaparte-sidebar/bonaparte.js") ], {
  0 : {
    role :"toolbar",
    children: {
      "1n+0" : "button-group"
    }
  },
  1 : "content"
});
