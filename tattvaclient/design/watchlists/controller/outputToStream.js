angular.module("tattva")
.controller("outputToStreams",["loadExprData","$scope","$mdDialog","data","publisherData",'streamFactory', function(loadExprData,$scope,$mdDialog,data,publisherData,streamFactory){
  $scope.publisherData = data;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.streams=[];
  streamFactory.sendStream(publisherData.namespace).then(function(data)
  {
    console.log(data);
    for(i in data)
    {
      console.log(data[i])
      $scope.streams.push(data[i].streamname);
    }
  });

  $scope.updateBackPublisher = function(Data) {
    $mdDialog.hide($scope.publisherData);
  }
}])
