exports.listSysTables = function(ibmdb,connString) {
    return function(req, res) {


       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query('SELECT "Country_Code", "Short_Name", "Table_Name" FROM DASH6934.STATS FETCH FIRST 10 ROWS ONLY',
        function(err, tables, moreResultSets) {

				if ( !err ) {
					res.render('tablelist', {
						"tablelist" : tables,
						"tableName" : tables.length + " rows from the STATS table",
						"message": "Congratulations. Your connection to Db2 is successful."

					 });


				} else {
				   res.send("error occurred " + err.message);
				}

				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );

	}
	}
