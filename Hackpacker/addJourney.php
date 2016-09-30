<?php include 'standardHeader.php'; ?>
<header><script src="js/app.js"></script></header>
<body ng-app="myApp" ng-controller="referenceDataController">
<div class="container fluid">
    <div class="form-group">
        <div class="row">
            <div class="col-md-4">
                In what country was your journey travelled?
            </div>
            <div class="col-md-4">
                <div class="checkbox">
                    <label><input type="checkbox" value="">Involved border crossing</label>
                </div>
            </div>
            <div class="col-md-4">
                <label for="sel1">Select country:</label>
                <select class="form-control" id="sel1">
                    <option>Mexico</option>
                    <option>Belize</option>
                    <option>Guatemala</option>
                    <option>El Salvador</option>
                </select>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>