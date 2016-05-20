var email;
var sub;
var content;
function AppCtrl($scope,$http){
console.log("Hello world from controller");

var refresh = function(){
$http.get('/crud').success(function(response){
console.log("I got the data I requested");
$scope.crud = response;
$scope.cruds = "";
});
};
refresh();
$scope.addcontact = function(){
console.log($scope.cruds);
email=$scope.cruds.email;
console.log(email);
sub="send Email";
content="Welcome to gaddielTechnologies";
$http.post('/crud', $scope.cruds).success(function(response){
console.log(response);
refresh();
	$.ajax({
  type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'SpJjFuDpZEzajL9zpU6Ivg',
    'message': {
      'from_email': 'arun.gaddiel@gmail.com',
      'to': [
          {
            'email': email,
            'name': 'arun',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': sub,
      'html': content
    }
  }
 }).done(function(response) {
   console.log(response); // if you're into that sorta thing
   
 });
 
setTimeout(function () {
	window.location="/index.html";
	},2000); // 3 seconds
});
};

$scope.login = function(){	
console.log($scope.cruds.email,$scope.cruds.password);
var email=$scope.cruds.email;
var pass=$scope.cruds.password;
$http.put('/crud/'+email, $scope.cruds).success(function(response){
	var val;
	val=response;
	console.log(val);	
if(response!=""){
	window.localStorage.setItem("val", JSON.stringify(val));	
	window.location="/update.html";
}
else{
	alert('Login incorrect');
}
});
};

$scope.deselect = function(){
	$scope.cruds = "";
};
}

function AppCtrll($scope,$http){
console.log("Hello world from AppCtrll controller");
var val=JSON.parse(window.localStorage.getItem("val"));
var role=val.role;
console.log(val);
$scope.cruds = val;
 document.getElementById("gridView").style.display='none';
if(role=="admin"){
 document.getElementById("gridView").style.display='block';
}
$scope.update = function(){
 console.log($scope.cruds._id);
 $http.post('/crud/' + $scope.cruds._id, $scope.cruds).success(function(response){
	
});
};
$scope.search = function(){
window.location="/search.html";
};

$scope.remove = function(id){
 console.log(id);
 $http.delete('/crud/' + id).success(function(response){
window.location="/index.html";
});
};
}

function SearchCtrl($scope,$http, $filter){
//console.log("Hello world from SearchCtrl controller");
$http.get('/crud').success(function(response){
$scope.contactlist = response;
$scope.contact = "";
 $scope.contactlist2 = $scope.contactlist;
});
 $scope.$watch('searchEmail', function(val)
    { 
        $scope.contactlist = $filter('filter')($scope.contactlist2, val);
    });

	$scope.deselect = function(){
		console.log("deselect");
	$scope.searchEmail = "";
};
$scope.edit = function(id){	
 console.log(id);
 $http.get('/crud/' + id).success(function(response){
	console.log(response); 
	window.localStorage.setItem("val", JSON.stringify(response));
	window.location="/userUpdate.html";
});
};

}

function useCtrl($scope,$http, $filter){
console.log("Hello world from useCtrl controller");
var val=JSON.parse(window.localStorage.getItem("val"));
console.log(val);
$scope.cruds = val;

$scope.update = function(){
 console.log($scope.cruds._id);
 $http.post('/crud/' + $scope.cruds._id, $scope.cruds).success(function(response){
 window.location="/search.html";	
});
};

$scope.remove = function(id){
 console.log(id);
 $http.delete('/crud/' + id).success(function(response){
window.location="/search.html";
});
};
}