"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.responseFormat = responseFormat;
function responseFormat(data) {
  return {
    data: data,
    stateCode: 200
  };
}