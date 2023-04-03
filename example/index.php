<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exemplo de Uso do Pacote</title>
    <link rel="stylesheet" href="css/style.css">

    <meta id="react-base" content="http://diretriz.net/apis/service"/>
    <meta id="csrf-token" name="csrf-token" content="xxx">
    <meta id="auth" name="auth" content="1">
</head>
<body>
<div class="container d-flex flex-wrap p-3">
    <?php
    require "view/button.php";
    require "view/form.php";
    require "view/box.php";
    require "view/table.php";
    ?>
    <script src="../dist/bundle.js"></script>
</div>
</body>
</html>
