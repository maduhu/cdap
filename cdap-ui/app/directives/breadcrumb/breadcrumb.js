/*
 * Copyright © 2015 Cask Data, Inc.
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

angular.module(PKG.name+'.commons')
.directive('myBreadcrumb', function () {
  return {
    restrict: 'E',
    templateUrl: 'breadcrumb/breadcrumb.html',
    scope: {
      params: '='
    },
    replace: true,
    controller: function($location, $scope) {
      var listener = $scope.$on('$stateChangeSuccess', function () {
        $location.search('sourceId', null);
        $location.search('sourceRunId', null);

        listener(); // removing listener, to make sure that this event only gets triggered once
      });
    }
  };

});