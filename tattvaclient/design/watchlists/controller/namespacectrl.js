angular.module("tattva")
.controller('namespacectrl',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.namespaceOption        = loadAll();
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;
    function querySearch (query) {
    var results = query ? self.namespaceOption.filter( createFilterFor(query) ) : self.namespaceOption,
    deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    if(item!=undefined)
    {
      $scope.wlstdef.namespace=item;
    }
    else {
      $scope.wlstdef.namespace=undefined;
    }
  }


  function loadAll() {
    var namespaceOption = ['Namespace1', 'Namespace2', 'Namespace3'];
    return namespaceOption;
  }
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(namespaceOption) {
      return (namespaceOption.indexOf(lowercaseQuery) === 0);
    };
  }
}]);
