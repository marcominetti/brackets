/**
 * JSON values for default settings
 * @author Patrick Oladimeji
 * @date 8/23/14 15:45:35 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define*/
define(function (require, exports, module) {
    "use strict";

    module.exports = {
        enabled: true,
        minFoldSize: 2,
        saveFoldStates: true,
        alwaysUseIndentFold: true,
        enableRegionFolding: true,
        hideUntilMouseover: false,
        maxFoldLevel: 2 // this value is only used when fold all is called
    };
});
