'use strict';

import crud from './crud/index.js';
import Buffer from 'buffer';
window.Buffer = Buffer;

export default {
  count: crud.count,
  copyTo: crud.copyTo,

  find: crud.find,
  findOne: crud.findOne,

  deleteOne: crud.deleteOne,
  deleteMany: crud.deleteMany,
  remove: crud.remove,

  insertOne: crud.insertOne,
  insertMany: crud.insertMany,
  insert: crud.insert,

  _crud: crud,
};
