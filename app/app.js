/* global angular */

angular.module("app", ["templates", "ngDialog"])
.controller("AppController", ["$scope", "ngDialog", function($scope, ngDialog) {

  $scope.toDo = [
    {
      "name": "Get A Job",
      "where": "Your Company",
      "job": true,
      "draggable": true
    }
  ];

  $scope.inProgress = [
    {
      "name": "IT Engineer",
      "where": "TrackInsight",
      "job": true,
      "avatar": true
    }
  ];

  $scope.done = [
    {
      "name": "Web Developer",
      "where": "Amadeus IT Group",
      "job": true
    },
    {
      "name": "Certified ScrumMaster",
      "where": "ScrumAlliance",
      "certification": true
    },
    {
      "name": "Certified Java SE 7 Programmer",
      "where": "Oracle",
      "certification": true
    },
    {
      "name": "Web Developer",
      "where": "Freelance",
      "job": true
    },
    {
      "name": "Software Engineering Intern",
      "where": "Thales Alenia Space",
      "job": true
    },
    {
      "name": "Web Developer Intern",
      "where": "Koris International",
      "job": true
    },
    {
      "name": "Tutor Of Mathematics",
      "where": "Complétude",
      "job": true
    },
    {
      "name": "Engineer's Degree, Computer Science",
      "where": "Polytech Nice-Sophia",
      "school": true
    },
    {
      "name": "1-year Exchange, Computer Science",
      "where": "Western University",
      "school": true
    }
  ];

  $scope.onDrop = function(task) {
    $scope.toDo = [];
    $scope.inProgress.unshift(task);
    $scope.$apply();
    ngDialog.openConfirm({
      templateUrl: "modal.html",
      className: "ngdialog-theme-plain"
    });
  };

}])
.directive("background", ["$window", "$document", function($window, $document) {
  return {
    restrict: "E",
    link: function(scope, element) {
      angular.element($window).bind("scroll", function() {
        var percentage = Math.floor(Math.min(($window.pageYOffset/($document[0].body.clientHeight - $window.innerHeight)) * 100, 100));
        element.css("transform", "scale(1.45) translateY(" + -percentage + "px)");
      });
    }
  };
}])
.directive("postit", ["$document", function($document) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "task.html",
    scope: {
      task: "=",
      avatar: "="
    },
    link: function(scope, el) {
      if(scope.task.draggable) {

        var getTaskType = function(task) {
          if(task.job) return "job";
          if(task.school) return "school";
          if(task.certification) return "certification";
        };

        var inprogress = angular.element($document[0].querySelector(".inprogress"));

        el.attr("draggable", true);

        el.bind("dragstart", function(e) {
          var task = {
            "name": scope.task.name,
            "where": scope.task.where
          };
          task[getTaskType(scope.task)] = true;
          e.dataTransfer.setData("text", JSON.stringify(task));
          inprogress.addClass("dragInProgress");
        });

        el.bind("dragend", function() {
          inprogress.removeClass("dragInProgress");
        });
      }
    }
  };
}])
.directive("onDrop", function() {
  return {
    restrict: "A",
    scope: {
      onDrop: "&"
    },
    link: function(scope, el) {

      var dropElement = angular.element(el[0].querySelector("#dropTarget"));
      dropElement.bind("dragover", function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      dropElement.bind("dragenter", function(e) {
        angular.element(e.target).addClass("over");
      });

      dropElement.bind("dragleave", function(e) {
        angular.element(e.target).removeClass("over");
      });

      dropElement.bind("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        el.removeClass("dragInProgress");
        var task = JSON.parse(e.dataTransfer.getData("text"));
        task.avatar = true;
        scope.onDrop({"task": task});
      });
    }
  };
});
