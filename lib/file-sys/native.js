"use strict";

var fs          = require("fs"),
    ncp         = require("ncp"),
    mkdirp      = require("mkdirp"),
    rimraf      = require("rimraf"),
    pathUtil    = require("path"),
    suppRoot    = "/support/",
    projRoot    = "/root/";

function resolvePathSync(reqPath, context) {
    var extRoot = context.httpRoot + "/extensions/",
        userExt = context.httpRoot + "/extensions/user",
        nlsRoot = context.httpRoot + "/nls",
        root,
        err,
        res;

    if (reqPath.startsWith(projRoot)) {
        root = context.projectsDir;
        res = pathUtil.join(root, reqPath.substr(projRoot.length));
    } else if (reqPath.startsWith(nlsRoot)) {
        root = context.defaultNls;
        res = pathUtil.join(context.defaultNls, reqPath.substr(nlsRoot.length));
    } else if (reqPath.startsWith(userExt)) {
        root = context.supportDir + "/extensions/user";
        res = pathUtil.join(root, reqPath.substr(userExt.length));
    } else if (reqPath.startsWith(extRoot)) {
        root = context.defaultExtensions;
        res = pathUtil.join(context.defaultExtensions, reqPath.substr(extRoot.length));
    } else if (reqPath.startsWith(suppRoot)) {
        root = context.supportDir;
        res = pathUtil.join(context.supportDir, reqPath.substr(suppRoot.length));
    } else {
        err = new Error("No such file or directory.");
        err.code = "ENOENT";
        throw err;
    }

    if (res.substr(0, root.length) !== root) {
        err = new Error("Permission denied.");
        err.code = "EACCES";
        throw err;
    } else {
        return res;
    }
}

function resolvePath(reqPath, context, callback) {
    try {
        var res = resolvePathSync(reqPath, context);
        callback(null, res);
    } catch(err) {
        callback(err);
    }
}

function stat(path, callback) {
    fs.stat(path, function (err, stats) {
        if (err) {
            return callback(err);
        }

        callback(null, {
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            mtime: stats.mtime,
            size: stats.size,
            realPath: null, // TODO: Set real path if symbolic link.
            hash: stats.mtime.getTime()
        });
    });
}

function statSync(path) {
    var stats = fs.statSync(path);
    return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        mtime: stats.mtime,
        size: stats.size,
        realPath: null, // TODO: Set real path if symbolic link.
        hash: stats.mtime.getTime()
    };
}

function readdir(path, callback) {
    fs.readdir(path, callback);
}

function mkdir(path, mode, callback) {
    mkdirp(path, { mode: mode }, callback);
}

function rename(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, callback);
}

function readFile(path, encoding, callback) {
    fs.readFile(path, { encoding: encoding }, callback);
}

function readFileSync(path, encoding) {
    return fs.readFileSync(path, { encoding: encoding });
}

function writeFile(path, data, encoding, callback) {
    fs.writeFile(path, data, { encoding: encoding }, callback);
}

function unlink(path, callback) {
    rimraf(path, callback);
}

function moveToTrash(path, callback) {
    rimraf(path, callback);
}

function watchPath(req, callback) {
    callback();
}

function unwatchPath(req, callback) {
    callback();
}

function unwatchAll(req, callback) {
    callback();
}

function copyFile(src, dest, callback) {
    ncp(src, dest, callback);
}

exports.resolvePathSync = resolvePathSync;
exports.resolvePath = resolvePath;
exports.stat = stat;
exports.statSync = statSync;
exports.readdir = readdir;
exports.mkdir = mkdir;
exports.rename = rename;
exports.readFile = readFile;
exports.readFileSync = readFileSync;
exports.writeFile = writeFile;
exports.unlink = unlink;
exports.moveToTrash = moveToTrash;
exports.watchPath = watchPath;
exports.unwatchPath = unwatchPath;
exports.unwatchAll = unwatchAll;
exports.copyFile = copyFile;