angular.module("app", ["templates"])
.controller("ToDoController", ["$scope", function($scope) {

  $scope.tasks = [
    {
      "name": "Get A Job",
      "where": "Your Company",
      "job": true
    }
  ];

}])
.controller("InProgressController", ["$scope", function($scope) {

  $scope.tasks = [
    {
      "name": "Web Developer",
      "where": "Amadeus IT Group",
      "job": true,
      "avatar": true
    }
  ];

}])
.controller("DoneController", ["$scope", function($scope) {

  $scope.tasks = [
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
.directive("postit", function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "task.html",
    scope: {
      task: "=",
      "avatar": "="
    }
  };
});
