angular.module('tattva')
.controller('orgCtrl', function($scope, $mdDialog, $http) {
    //Your controller code goes here
    $scope.loadData = function() {
      $http.get('/org_admin').then(function(response){ $scope.data = response.data; });
    }
    $scope.loadData();



    $scope.selectedUserIndex = undefined;
    $scope.selectUserIndex = function (index) {
      if ($scope.selectedUserIndex !== index) {
        $scope.selectedUserIndex = index;
      }
      else {
        $scope.selectedUserIndex = undefined;
      }
    };

    $scope.selectedUserIndex1 = undefined;
    $scope.selectUserIndex1 = function (index) {
      if ($scope.selectedUserIndex1 !== index) {
        $scope.selectedUserIndex1 = index;
      }
      else {
        $scope.selectedUserIndex1 = undefined;
      }
    };

    $scope.showAdd = function(ev) {
   $mdDialog.show({
     controller: DialogController,
     template: '<md-dialog aria-label="Mango (Fruit)">'+
     '<md-content class="md-padding"> <form name="userForm" ng-submit="saveData()">'+
     '<div layout layout-sm="column">'+
     '<md-input-container flex> <label>User Name</label> <input ng-model="uName"> </md-input-container> '+
     '</div>'+
      '<md-input-container flex> <label>Email ID</label> <input ng-model="uEmail"> </md-input-container>'+
      '<div layout layout-sm="column">'+
      '<md-input-container flex> <label>Password</label> <input ng-model="uPassword"> </md-input-container>'+
      '</form> </md-content> <div class="md-actions" layout="row"> '+
      '<span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button>'+
      ' <md-button type="submit" class="md-primary"> Save </md-button>'+
      ' </div>'+
      '</md-dialog>',
     targetEvent: ev,
   });

 }

 $scope.deleteMe = function(ev) {
    var confirm = $mdDialog.confirm()
          .title('Delete')
          .textContent('Are you surely want to delete.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');
    $mdDialog.show(confirm);
  };
});


function DialogController($scope, $mdDialog,$http) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.saveData=function(){
    var data1={};
    data1={name:$scope.uName,email:$scope.uEmail,password:$scope.uPassword};
    /*console.log(data1);*/

    $http({
      method  : 'POST',
      url     : '/login_reg1',
      data    : data1 //forms user object
      // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      if (data.errors) {
        $scope.errorName = data.errors.name;
        $scope.errorUserName = data.errors.username;
        $scope.errorEmail = data.errors.email;
      } else {
        $scope.message = data.message;
      }
    });

    $mdDialog.hide();

  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};