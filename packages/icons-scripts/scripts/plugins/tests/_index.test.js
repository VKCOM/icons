"use strict";

const fs = require("fs");
const path = require("path");
const EOL = require("os").EOL;
const regEOL = new RegExp(EOL, "g");
const regFilename = /^(.*)\.(\d+)\.svg$/;
const { optimize } = require("svgo");

describe("plugins tests", function () {
  fs.readdirSync(__dirname).forEach(function (file) {
    var match = file.match(regFilename),
      index,
      name;

    if (match) {
      name = match[1];
      index = match[2];

      file = path.resolve(__dirname, file);

      it(name + "." + index, function () {
        return readFile(file).then(function (data) {
          // remove description
          const items = normalize(data).split(/\s*===\s*/);
          const test = items.length === 2 ? items[1] : items[0];
          
          // extract test case
          const [original, should, params] = test.split(/\s*@@@\s*/);
          const plugin = {
            params: params ? JSON.parse(params) : {},
            ...require("../" + name),
          };

          const result = optimize(original, {
            path: file,
            plugins: [plugin],
            js2svg: { pretty: true },
          });

          expect(result.error).not.toEqual(expect.anything());
          expect(normalize(result.data)).toEqual(should);
        });
      });
    }
  });
});

function normalize(file) {
  return file.trim().replace(regEOL, "\n");
}

function readFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, "utf8", function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
