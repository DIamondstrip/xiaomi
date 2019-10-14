
<?php
    include "conn.php";
    $result=$conn->query("select  * from piclist");
    $taobaodata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $taobaodata[$i]=$result->fetch_assoc();
    }

    echo json_encode($taobaodata);