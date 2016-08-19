<?php 
$page = !empty($_GET['page']) ? $_GET['page'] : "home";
$lang = isset($_GET['lang']) ? $_GET['lang'] : "en";

switch ($lang) :
    case 'pt':
        include'languages/pt.php';
    break;  
    case 'en':
        include'languages/en.php';
    break;
    default:
        include'languages/en.php';
    break;
endswitch;
?>

<!doctype html>
<html lang="en">
    <head>
      <!-- head -->
      <?php include 'views/layout/head.php' ?>
    </head>
    <body>
        <!-- header -->
        <?php include 'views/layout/header.php' ?>
        <!-- <?= $page ?> -->
        <section id="main">
            <div class="content">
                <?php switch ($page) :
                    case $page:
                    include ("views/$page.php"); 
                        break;
                    default:
                        include ("views/404.php"); 
                    break;
                endswitch; ?>
            </div>
        </section>
        <!-- footer -->
        <?php include 'views/layout/footer.php' ?>
        <!-- scripts -->
        <?php include 'views/layout/scripts.php' ?>
    </body>
</html>
