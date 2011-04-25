<!-- 
This page gets username and password, saves it to the session, and 
-->

<HTML><HEAD><TITLE>login</TITLE></HEAD><BODY>
<form action="process.php" method="post">
	<input type="username" name="usr"><br>
	<input type="password" name="pwd"><br>
	<input type="submit" value="Submit">
</form>

<?php
	if (isset($_POST['usr'])) {
		session_start();
		$_SESSION['usr'] = $_POST['usr'];
		$_SESSION['pwd'] = $_POST['pwd'];
	}
?>