/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import {Subject} from 'rxjs/Subject';

const MyAppApi = {
  __app: {
    programs: []
  },
  __batchStatusStats: []
};
MyAppApi.__setApp = function(app) {
  this.__app = app;
};
MyAppApi.get = function() {
  let subject = new Subject();
  setTimeout(() => {
    subject.next(this.__app);
  });
  return subject;
};

MyAppApi.batchStatus = function() {
  let subject = new Subject();
  setTimeout(() => {
    subject.next(this.__batchStatusStats);
  });
  return subject;
};
export {MyAppApi};
