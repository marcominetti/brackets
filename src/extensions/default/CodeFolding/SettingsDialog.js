/**
 * Configure and change settings for the code folding extension
 * @author Patrick Oladimeji
 * @date 8/23/14 12:32:46 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, Mustache, $ */
define(function (require, exports, module) {
    "use strict";
    var Dialogs = brackets.getModule("widgets/Dialogs"),
        DefaultSettings = require("DefaultSettings"),
        Strings = require("strings"),
        CommandManager = brackets.getModule("command/CommandManager"),
        settingsTemplate = require("text!htmlTemplates/settings-dialog.html"),
        reloadTemplate = require("text!htmlTemplates/reload-dialog.html"),
        preferences = require("Prefs");

    function setFormValues(prefs) {
        prefs.enabled = prefs.enabled === undefined ? true : prefs.enabled;
        $("#enable-code-folding").prop("checked", prefs.enabled);
        $("#min-fold-size").val(prefs.minFoldSize || 2);
        $("#max-fold-level").val(prefs.maxFoldLevel || 2);
        $("#save-fold-states").prop("checked", prefs.saveFoldStates);
        $("#always-use-indent-fold").prop("checked", prefs.alwaysUseIndentFold);
        $("#enable-region-folding").prop("checked", prefs.enableRegionFolding);
        $("#hide-until-mouseover").prop("checked", prefs.hideUntilMouseover);
    }

    function restoreDefaults() {
        setFormValues(DefaultSettings);
    }

    /**
        Shows the preferences dialog
        @param {function} cb a callback function to invoke when the dialog has been accepted or dismised
    */
    function showDialog(cb) {
        var template = Mustache.render(settingsTemplate, Strings);
        var dialog = Dialogs.showModalDialogUsingTemplate(template);
        var $dialog = dialog.getElement();
        setFormValues(preferences.getAllSettings());

        $("button[data-button-id='defaults']", $dialog).on("click", function (e) {
            e.stopPropagation();
            restoreDefaults();
        });

        $("#enable-code-folding", $dialog).change(function () {
            var enabled = $("#enable-code-folding").prop("checked");
            var settingsElements = $("#min-fold-size, #max-fold-level, #save-fold-states," +
                                     "#always-use-indent-fold, #enable-region-folding, #hide-until-mouseover");
            if (enabled) {
                settingsElements.removeAttr("disabled");
                settingsElements.removeClass("disabled");
            } else {
                settingsElements.attr("disabled", true);
                settingsElements.addClass("diabled");
            }
        });

        dialog.done(function (buttonId) {
            if (buttonId === "ok") {
                var minFoldSize = $("#min-fold-size", $dialog).val();
                var maxFoldLevel = $("#max-fold-level", $dialog).val();
                var enabled = $("#enable-code-folding", $dialog).prop("checked");

                preferences.setSetting("enabled", enabled);
                preferences.setSetting("minFoldSize", isNaN(minFoldSize) || +minFoldSize === 0 ?
                                       +preferences.getSetting("minFoldSize") : +minFoldSize);
                preferences.setSetting("saveFoldStates", $("#save-fold-states", $dialog).prop("checked"));
                preferences.setSetting("maxFoldLevel", isNaN(maxFoldLevel) || +maxFoldLevel === 0 ?
                                       +preferences.getSetting("maxFoldLevel") : +maxFoldLevel);
                preferences.setSetting("alwaysUseIndentFold", $("#always-use-indent-fold", $dialog).prop("checked"));
                preferences.setSetting("enableRegionFolding", $("#enable-region-folding", $dialog).prop("checked"));
                preferences.setSetting("hideUntilMouseover", $("#hide-until-mouseover", $dialog).prop("checked"));

                //show reload prompt
                template = Mustache.render(reloadTemplate, Strings);
                var reloadDialog = Dialogs.showModalDialogUsingTemplate(template);
                reloadDialog.done(function (buttonId) {
                    if (buttonId === "ok") {
                        CommandManager.execute("debug.refreshWindow");
                    }
                });

            }
        });
    }

    exports.show = showDialog;
});
